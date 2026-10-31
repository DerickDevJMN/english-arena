/**
 * Master Application Controller for Kahoot English Pro
 * Orchestrates views, state, real-time sync, audio, live quiz loop, and podium.
 */

const App = {
  state: {
    currentView: 'study', // 'study' | 'dashboard' | 'lobby' | 'arena-host' | 'arena-player' | 'podium' | 'gradebook'
    theme: 'dark',
    room: null,
    player: null,
    questionTimer: null,
    timeLeft: 0,
    timeTotal: 20,
    isHost: false,
    confettiAnimId: null,
    demoMode: false // Split screen demo
  },

  init() {
    this.initTheme();
    this.initAudioControls();
    this.setupURLParams();
    this.bindEvents();
    StudyHub.init();
    this.setupSyncListeners();
  },

  // --- THEME MANAGEMENT ---
  initTheme() {
    const saved = localStorage.getItem('kahoot_theme') || 'dark';
    this.setTheme(saved);
  },

  setTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kahoot_theme', theme);
    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    }
  },

  toggleTheme() {
    this.setTheme(this.state.theme === 'dark' ? 'light' : 'dark');
  },

  // --- AUDIO CONTROLS ---
  initAudioControls() {
    const muteBtn = document.getElementById('btn-toggle-mute');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = soundEngine.toggleMute();
        muteBtn.innerHTML = isMuted ? '🔇 Silenciado' : '🔊 Sonido';
      });
    }
  },

  // --- URL PARAMS FOR QUICK JOIN ---
  setupURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const pin = urlParams.get('pin');
    const role = urlParams.get('role');

    if (pin) {
      this.navigateTo('player-join');
      const pinInput = document.getElementById('player-pin-input');
      if (pinInput) pinInput.value = pin;
    } else if (role === 'teacher') {
      this.navigateTo('dashboard');
    }
  },

  // --- NAVIGATION ---
  navigateTo(viewId) {
    this.state.currentView = viewId;
    document.querySelectorAll('.view-screen').forEach(el => el.classList.remove('active'));

    // Deactivate music if leaving arena
    if (viewId !== 'arena-host' && viewId !== 'arena-player') {
      soundEngine.stopTimerMusic();
    }

    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.classList.add('active');
      window.scrollTo(0, 0);
    }

    // Update navigation active states
    document.querySelectorAll('.nav-link').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewId);
    });

    if (viewId === 'study') {
      StudyHub.renderTopics();
    }
  },

  // --- TEACHER DASHBOARD LOGIC ---
  onDashboardLevelChange() {
    const levelSelect = document.getElementById('quiz-level-select');
    const topicSelect = document.getElementById('quiz-topic-select');
    if (!levelSelect || !topicSelect) return;

    const level = levelSelect.value;
    topicSelect.innerHTML = `<option value="ALL">✨ Examen General / Parcial Pro (Mezcla de todos los temas)</option>`;

    if (CEFR_CONTENT[level]) {
      CEFR_CONTENT[level].topics.forEach(t => {
        topicSelect.innerHTML += `<option value="${t.id}">${t.icon} ${t.title} (${t.subtitle})</option>`;
      });
    }
  },

  createQuizRoom(e) {
    if (e) e.preventDefault();
    soundEngine.playPop();

    const level = document.getElementById('quiz-level-select').value;
    const topicId = document.getElementById('quiz-topic-select').value;
    const activityType = document.getElementById('quiz-activity-type').value;
    const timePerQuestion = parseInt(document.getElementById('quiz-time-select').value, 10);
    const gradeWeight = document.getElementById('quiz-weight-input').value;

    // Filter questions
    let availableQuestions = QUESTION_BANK.filter(q => q.level === level);
    if (topicId !== 'ALL') {
      const topicFiltered = availableQuestions.filter(q => q.topicId === topicId);
      if (topicFiltered.length > 0) {
        availableQuestions = topicFiltered;
      }
    }

    // Shuffle questions
    availableQuestions = [...availableQuestions].sort(() => 0.5 - Math.random());

    // Number of questions based on activity type
    let qCount = 5;
    if (activityType === 'Taller Interactivo') qCount = 10;
    else if (activityType === 'Parcial Final Pro') qCount = 15;
    else if (activityType === 'Quiz Corto') qCount = 5;

    const selectedQuestions = availableQuestions.slice(0, Math.min(qCount, availableQuestions.length));

    // Generate unique 6-digit PIN
    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    // Find topic display title
    let topicTitle = "Examen Parcial Completo";
    if (topicId !== 'ALL' && CEFR_CONTENT[level]) {
      const foundTopic = CEFR_CONTENT[level].topics.find(t => t.id === topicId);
      if (foundTopic) topicTitle = foundTopic.title;
    }

    this.state.isHost = true;
    this.state.room = {
      pin,
      level,
      topicId,
      topicTitle,
      activityType,
      timePerQuestion,
      gradeWeight,
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      students: [],
      currentAnswers: [],
      state: 'LOBBY'
    };

    // Render Waiting Lobby
    this.renderLobby();
    this.navigateTo('lobby');

    // Broadcast room creation
    syncEngine.broadcast('ROOM_CREATED', {
      pin,
      level,
      topicTitle,
      totalQuestions: selectedQuestions.length
    });
  },

  // --- LOBBY LOGIC ---
  renderLobby() {
    const room = this.state.room;
    if (!room) return;

    document.getElementById('lobby-pin-display').innerText = room.pin;
    document.getElementById('lobby-level-badge').innerText = `${room.level} • CEFR`;
    document.getElementById('lobby-level-badge').className = `topic-level-badge level-${room.level}`;
    document.getElementById('lobby-topic-badge').innerText = room.topicTitle;
    document.getElementById('lobby-qcount-badge').innerText = `${room.questions.length} Preguntas (${room.timePerQuestion}s c/u)`;

    // Generate clean QR Code
    const joinUrl = `${window.location.origin}${window.location.pathname}?pin=${room.pin}`;
    const qrSvg = QRCodeGenerator.generateSVG(joinUrl, { size: 180, color: '#1e1b4b' });
    document.getElementById('lobby-qr-container').innerHTML = qrSvg;
    document.getElementById('lobby-join-url').innerText = joinUrl;

    this.updateLobbyStudents();
  },

  updateLobbyStudents() {
    const room = this.state.room;
    if (!room) return;

    const list = document.getElementById('lobby-students-grid');
    const counter = document.getElementById('lobby-student-count');
    if (!list || !counter) return;

    counter.innerText = room.students.length;

    if (room.students.length === 0) {
      list.innerHTML = `
        <div class="lobby-waiting-hint">
          <div class="pulse-radar">📡</div>
          <p>Esperando a que los estudiantes ingresen con el PIN...</p>
          <small>O haz clic en "Añadir Alumnos Simulados" para probar de inmediato.</small>
        </div>
      `;
      return;
    }

    list.innerHTML = room.students.map(s => `
      <div class="lobby-student-tag" id="student-tag-${s.id}">
        <span class="tag-avatar">${s.avatar || '🎓'}</span>
        <span class="tag-name">${s.name}</span>
        ${s.isBot ? '<span class="tag-bot">Bot</span>' : ''}
        <button class="btn-kick" onclick="App.kickStudent('${s.id}')" title="Expulsar">✕</button>
      </div>
    `).join('');

    this.renderSplitPlayer();
  },

  addSimulatedStudents(count = 5) {
    if (!this.state.room) return;
    soundEngine.playPop();

    syncEngine.addSimulatedBots(count, this.state.room.pin, (bot) => {
      // Check duplicate
      if (!this.state.room.students.some(s => s.id === bot.id)) {
        this.state.room.students.push(bot);
        this.updateLobbyStudents();
        soundEngine.playPop();
      }
    });
  },

  kickStudent(studentId) {
    if (!this.state.room) return;
    this.state.room.students = this.state.room.students.filter(s => s.id !== studentId);
    this.updateLobbyStudents();
    syncEngine.broadcast('PLAYER_KICKED', { studentId });
  },

  // --- START QUIZ COUNTDOWN ---
  startQuizCountdown() {
    const room = this.state.room;
    if (!room || room.students.length === 0) {
      alert("Debes tener al menos 1 estudiante en la sala (o añade estudiantes simulados con un clic).");
      return;
    }

    soundEngine.playStartQuiz();

    // Countdown Overlay: 3, 2, 1, ¡GO!
    const overlay = document.getElementById('countdown-overlay');
    const countNumber = document.getElementById('countdown-number');
    overlay.classList.add('active');

    let count = 3;
    countNumber.innerText = count;

    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        countNumber.innerText = count;
        soundEngine.playCountdownTick();
      } else if (count === 0) {
        countNumber.innerText = "¡GO!";
        soundEngine.playCountdownTick(true);
      } else {
        clearInterval(timer);
        overlay.classList.remove('active');
        this.launchQuestion(0);
      }
    }, 1000);

    syncEngine.broadcast('QUIZ_STARTING', {
      pin: room.pin,
      totalQuestions: room.questions.length
    });
  },

  // --- QUESTION DISPLAY (HOST) ---
  launchQuestion(index) {
    const room = this.state.room;
    if (!room || index >= room.questions.length) {
      this.finishQuiz();
      return;
    }

    room.currentQuestionIndex = index;
    room.currentAnswers = [];
    room.state = 'QUESTION';

    const q = room.questions[index];
    this.state.timeLeft = room.timePerQuestion;
    this.state.timeTotal = room.timePerQuestion;

    this.renderHostArena(q);
    this.navigateTo('arena-host');
    this.renderSplitPlayer();

    // Notify all players (real & bots)
    syncEngine.broadcast('QUESTION_START', {
      pin: room.pin,
      questionIndex: index,
      totalQuestions: room.questions.length,
      question: {
        id: q.id,
        level: q.level,
        topicName: q.topicName,
        type: q.type,
        question: q.question,
        options: q.options,
        timeLimit: room.timePerQuestion
      }
    });

    // Start Question Background Sound
    soundEngine.startTimerMusic();

    // Start Countdown Timer
    this.startQuestionTimer();

    // Trigger simulated bot answers
    syncEngine.simulateBotAnswers(q, room.timePerQuestion, (answerData) => {
      this.handleIncomingAnswer(answerData);
    });
  },

  renderHostArena(q) {
    const room = this.state.room;
    document.getElementById('arena-progress-badge').innerText = `Pregunta ${room.currentQuestionIndex + 1} de ${room.questions.length}`;
    document.getElementById('arena-level-badge').innerText = `${q.level} • ${q.topicName}`;
    document.getElementById('arena-question-text').innerText = q.question;

    document.getElementById('arena-answers-count').innerText = `0 / ${room.students.length}`;
    document.getElementById('arena-timer-number').innerText = this.state.timeLeft;

    // Reset feedback & leaderboard panels
    document.getElementById('arena-explanation-card').classList.add('hidden');
    document.getElementById('arena-leaderboard-modal').classList.remove('open');
    document.getElementById('btn-next-question').classList.add('hidden');
    document.getElementById('btn-show-leaderboard').classList.add('hidden');

    const optionsContainer = document.getElementById('arena-options-grid');

    if (q.type === 'multiple_choice') {
      const symbols = ['▲', '◆', '●', '■'];
      const colors = ['btn-kahoot-red', 'btn-kahoot-blue', 'btn-kahoot-yellow', 'btn-kahoot-green'];
      optionsContainer.className = 'options-grid kahoot-4-grid';
      optionsContainer.innerHTML = q.options.map((opt, i) => `
        <div class="kahoot-option-card ${colors[i]}" id="host-opt-${i}">
          <div class="opt-symbol">${symbols[i]}</div>
          <div class="opt-text">${opt}</div>
          <div class="opt-bar-container">
            <div class="opt-bar-fill" id="opt-bar-${i}" style="width: 0%"></div>
            <span class="opt-count" id="opt-count-${i}">0</span>
          </div>
        </div>
      `).join('');
    } else {
      // Fill blank
      optionsContainer.className = 'options-grid fill-blank-grid';
      optionsContainer.innerHTML = `
        <div class="fill-blank-card">
          <div class="fill-blank-icon">✏️</div>
          <h3>Completa el espacio en blanco (*Fill in the blanks*)</h3>
          <p class="fill-blank-instruction">Los estudiantes están escribiendo su respuesta desde sus dispositivos...</p>
          <div class="fill-blank-revealed hidden" id="fill-blank-revealed">
            Respuesta Correcta: <strong>${q.correctAnswer}</strong>
          </div>
        </div>
      `;
    }
  },

  startQuestionTimer() {
    clearInterval(this.state.questionTimer);
    const timerCircle = document.getElementById('arena-timer-svg-circle');
    const timerNumber = document.getElementById('arena-timer-number');
    const circumference = 2 * Math.PI * 45; // r=45

    this.state.questionTimer = setInterval(() => {
      this.state.timeLeft--;
      if (timerNumber) timerNumber.innerText = this.state.timeLeft;

      // Update circular SVG progress
      if (timerCircle) {
        const offset = circumference - (this.state.timeLeft / this.state.timeTotal) * circumference;
        timerCircle.style.strokeDashoffset = offset;
        if (this.state.timeLeft <= 5) {
          timerCircle.style.stroke = '#ef4444'; // Red alert
          soundEngine.playCountdownTick(this.state.timeLeft === 1);
        } else {
          timerCircle.style.stroke = '#6366f1';
        }
      }

      if (this.state.timeLeft <= 0) {
        clearInterval(this.state.questionTimer);
        this.timeUpQuestion();
      }
    }, 1000);
  },

  handleIncomingAnswer(data) {
    const room = this.state.room;
    if (!room || room.state !== 'QUESTION') return;

    // Check if already answered
    if (room.currentAnswers.some(a => a.studentId === data.studentId)) return;

    room.currentAnswers.push(data);

    // Update student's total score & records
    const student = room.students.find(s => s.id === data.studentId);
    if (student) {
      if (data.isCorrect) {
        student.score += data.points;
        student.streak = (student.streak || 0) + 1;
        student.correctCount = (student.correctCount || 0) + 1;
      } else {
        student.streak = 0;
      }
      if (!student.answers) student.answers = [];
      student.answers.push({
        questionId: room.questions[room.currentQuestionIndex].id,
        isCorrect: data.isCorrect,
        points: data.points
      });
    }

    // Update Host Arena Counter
    const counter = document.getElementById('arena-answers-count');
    if (counter) counter.innerText = `${room.currentAnswers.length} / ${room.students.length}`;

    this.renderSplitPlayer();

    // If all students answered, stop early
    if (room.currentAnswers.length >= room.students.length) {
      clearInterval(this.state.questionTimer);
      setTimeout(() => this.timeUpQuestion(), 500);
    }
  },

  timeUpQuestion() {
    const room = this.state.room;
    if (!room || room.state !== 'QUESTION') return;

    room.state = 'FEEDBACK';
    soundEngine.stopTimerMusic();

    const q = room.questions[room.currentQuestionIndex];

    // Reveal correct answer on Host screen
    if (q.type === 'multiple_choice') {
      [0, 1, 2, 3].forEach(i => {
        const card = document.getElementById(`host-opt-${i}`);
        if (card) {
          if (i === q.correctIndex) {
            card.classList.add('is-correct');
          } else {
            card.classList.add('is-dimmed');
          }
        }
      });

      // Calculate response distribution
      const counts = [0, 0, 0, 0];
      room.currentAnswers.forEach(a => {
        if (a.chosenIndex >= 0 && a.chosenIndex < 4) {
          counts[a.chosenIndex]++;
        }
      });

      const maxCount = Math.max(...counts, 1);
      counts.forEach((c, i) => {
        const bar = document.getElementById(`opt-bar-${i}`);
        const countSpan = document.getElementById(`opt-count-${i}`);
        if (bar && countSpan) {
          bar.style.width = `${(c / maxCount) * 100}%`;
          countSpan.innerText = c;
        }
      });
    } else {
      const revealed = document.getElementById('fill-blank-revealed');
      if (revealed) revealed.classList.remove('hidden');
    }

    // Show pedagogical explanation
    const explCard = document.getElementById('arena-explanation-card');
    const explText = document.getElementById('arena-explanation-text');
    if (explCard && explText) {
      explText.innerHTML = `<strong>¿Por qué es correcto?</strong> ${q.explanation}`;
      explCard.classList.remove('hidden');
    }

    // Show Leaderboard button
    const btnLeaderboard = document.getElementById('btn-show-leaderboard');
    if (btnLeaderboard) btnLeaderboard.classList.remove('hidden');

    this.renderSplitPlayer();

    // Broadcast Question End to all players
    syncEngine.broadcast('QUESTION_END', {
      pin: room.pin,
      correctIndex: q.correctIndex,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation
    });
  },

  // --- LEADERBOARD INTERMEDIATE ---
  showLeaderboardModal() {
    const room = this.state.room;
    if (!room) return;

    soundEngine.playPop();

    // Sort students by score descending
    const sorted = [...room.students].sort((a, b) => b.score - a.score);

    const list = document.getElementById('leaderboard-students-list');
    list.innerHTML = sorted.slice(0, 5).map((s, idx) => `
      <div class="leaderboard-row rank-${idx + 1}">
        <div class="row-rank">#${idx + 1}</div>
        <div class="row-avatar">${s.avatar || '🎓'}</div>
        <div class="row-name">
          <strong>${s.name}</strong>
          ${s.streak >= 2 ? `<span class="streak-pill">🔥 ${s.streak} Seguidas!</span>` : ''}
        </div>
        <div class="row-score">${s.score.toLocaleString()} pts</div>
      </div>
    `).join('');

    const modal = document.getElementById('arena-leaderboard-modal');
    modal.classList.add('open');

    // Button Next Question or Finish
    const isLast = room.currentQuestionIndex + 1 >= room.questions.length;
    const btnNext = document.getElementById('btn-next-step');
    btnNext.innerText = isLast ? "🏆 Ver Podio Final" : "Siguiente Pregunta →";
  },

  advanceFromLeaderboard() {
    const modal = document.getElementById('arena-leaderboard-modal');
    modal.classList.remove('open');

    const room = this.state.room;
    if (room.currentQuestionIndex + 1 >= room.questions.length) {
      this.finishQuiz();
    } else {
      this.launchQuestion(room.currentQuestionIndex + 1);
    }
  },

  // --- PODIUM & RESULTS ---
  finishQuiz() {
    const room = this.state.room;
    if (!room) return;

    soundEngine.playFanfare();

    // Sort students by score
    const sorted = [...room.students].sort((a, b) => b.score - a.score);

    // Build Gradebook Report
    const report = Gradebook.generateReport({
      students: room.students,
      questions: room.questions,
      config: {
        roomPin: room.pin,
        level: room.level,
        topicTitle: room.topicTitle,
        activityType: room.activityType,
        gradeWeight: room.gradeWeight
      }
    });

    room.state = 'FINISHED';
    room.report = report;
    this.renderPodium(sorted);
    this.navigateTo('podium');
    this.startConfetti();
    this.renderSplitPlayer();

    syncEngine.broadcast('QUIZ_FINISHED', {
      pin: room.pin,
      top3: sorted.slice(0, 3)
    });
  },

  renderPodium(sorted) {
    const p1 = sorted[0] || { name: "N/A", score: 0, avatar: "🥇" };
    const p2 = sorted[1] || { name: "N/A", score: 0, avatar: "🥈" };
    const p3 = sorted[2] || { name: "N/A", score: 0, avatar: "🥉" };

    document.getElementById('podium-1st-name').innerText = p1.name;
    document.getElementById('podium-1st-score').innerText = `${p1.score.toLocaleString()} pts`;
    document.getElementById('podium-1st-avatar').innerText = p1.avatar || '🥇';

    document.getElementById('podium-2nd-name').innerText = p2.name;
    document.getElementById('podium-2nd-score').innerText = `${p2.score.toLocaleString()} pts`;
    document.getElementById('podium-2nd-avatar').innerText = p2.avatar || '🥈';

    document.getElementById('podium-3rd-name').innerText = p3.name;
    document.getElementById('podium-3rd-score').innerText = `${p3.score.toLocaleString()} pts`;
    document.getElementById('podium-3rd-avatar').innerText = p3.avatar || '🥉';

    // Full rankings list below podium
    const fullList = document.getElementById('podium-full-rankings');
    fullList.innerHTML = sorted.map((s, idx) => `
      <div class="podium-rank-item">
        <span class="rank-pos">#${idx + 1}</span>
        <span class="rank-av">${s.avatar || '🎓'}</span>
        <span class="rank-name">${s.name}</span>
        <span class="rank-pts">${s.score.toLocaleString()} pts</span>
      </div>
    `).join('');
  },

  openGradebookFromPodium() {
    if (this.state.room && this.state.room.report) {
      Gradebook.renderView(this.state.room.report);
      this.navigateTo('gradebook');
    }
  },

  // --- CONFETTI CANVAS ---
  startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 10 + 6,
      color: ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 6)],
      velX: (Math.random() - 0.5) * 3,
      velY: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.velX;
        p.y += p.velY;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      this.state.confettiAnimId = requestAnimationFrame(render);
    };

    if (this.state.confettiAnimId) cancelAnimationFrame(this.state.confettiAnimId);
    render();

    // Auto stop confetti after 12 seconds
    setTimeout(() => {
      if (this.state.confettiAnimId) {
        cancelAnimationFrame(this.state.confettiAnimId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }, 12000);
  },

  // ==========================================
  // STUDENT / PLAYER LOGIC
  // ==========================================
  joinRoomAsPlayer(e) {
    if (e) e.preventDefault();
    const pin = document.getElementById('player-pin-input').value.trim();
    const name = document.getElementById('player-name-input').value.trim();
    const code = document.getElementById('player-code-input').value.trim();
    const avatar = document.getElementById('player-avatar-select').value;

    if (!pin || !name) {
      alert("Por favor ingresa el PIN de la sala y tu Nombre.");
      return;
    }

    soundEngine.playPop();

    const student = {
      id: 'student_' + Math.random().toString(36).substr(2, 9),
      name,
      code: code || 'ENG-' + Math.floor(1000 + Math.random() * 9000),
      avatar,
      isBot: false,
      score: 0,
      streak: 0,
      answers: [],
      correctCount: 0
    };

    this.state.player = student;

    // Broadcast join to Host
    syncEngine.broadcast('PLAYER_JOINED', {
      roomPin: pin,
      student
    });

    // If we are in the same tab / demo mode, add directly
    if (this.state.room && this.state.room.pin === pin) {
      if (!this.state.room.students.some(s => s.id === student.id)) {
        this.state.room.students.push(student);
        this.updateLobbyStudents();
      }
    }

    // Switch to Player Waiting screen
    document.getElementById('player-wait-name').innerText = name;
    document.getElementById('player-wait-avatar').innerText = avatar;
    document.getElementById('player-wait-pin').innerText = pin;
    this.navigateTo('player-arena');
    this.showPlayerScreen('waiting');
  },

  showPlayerScreen(screenId) {
    document.querySelectorAll('.player-screen-sub').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(`player-screen-${screenId}`);
    if (target) target.classList.add('active');
  },

  playerAnswer(choiceIndex, textAnswer = null) {
    if (!this.state.player || !this.state.currentActiveQuestion) return;

    soundEngine.playPop();
    const q = this.state.currentActiveQuestion;
    const timeRemaining = this.state.playerTimeRemaining || 10;
    const totalTime = q.timeLimit || 20;

    let isCorrect = false;
    let chosenAnswer = "";

    if (q.type === 'multiple_choice') {
      isCorrect = choiceIndex === q.correctIndex;
      chosenAnswer = q.options[choiceIndex];
    } else {
      chosenAnswer = textAnswer || document.getElementById('player-text-answer').value.trim();
      const cleanAnswer = chosenAnswer.toLowerCase().trim();
      const targetAnswer = (q.correctAnswer || '').toLowerCase().trim();
      isCorrect = cleanAnswer === targetAnswer;
    }

    const speedBonus = Math.round((timeRemaining / totalTime) * 500);
    const points = isCorrect ? (500 + speedBonus) : 0;

    // Send answer to Host
    syncEngine.broadcast('PLAYER_ANSWERED', {
      studentId: this.state.player.id,
      studentName: this.state.player.name,
      isCorrect,
      chosenIndex: choiceIndex,
      chosenAnswer,
      timeRemaining,
      points
    });

    // Show Student Submitted screen
    this.showPlayerScreen('submitted');
    this.renderSplitPlayer();
  },

  // --- REAL-TIME SYNC EVENT DISPATCHER ---
  setupSyncListeners() {
    syncEngine.on((event) => {
      const { type, payload } = event;

      // When Host receives a new student
      if (type === 'PLAYER_JOINED') {
        if (this.state.room && this.state.room.pin === payload.roomPin) {
          if (!this.state.room.students.some(s => s.id === payload.student.id)) {
            this.state.room.students.push(payload.student);
            this.updateLobbyStudents();
            soundEngine.playPop();
          }
        }
      }

      // When Host receives an answer
      if (type === 'PLAYER_ANSWERED') {
        if (this.state.isHost) {
          this.handleIncomingAnswer(payload);
        }
      }

      // When Player receives QUESTION_START
      if (type === 'QUESTION_START') {
        if (this.state.player) {
          this.state.currentActiveQuestion = payload.question;
          this.state.playerTimeRemaining = payload.question.timeLimit;
          this.renderPlayerQuestion(payload.question, payload.questionIndex, payload.totalQuestions);
        }
      }

      // When Player receives QUESTION_END
      if (type === 'QUESTION_END') {
        if (this.state.player) {
          this.renderPlayerFeedback(payload);
        }
      }

      // When Player receives QUIZ_FINISHED
      if (type === 'QUIZ_FINISHED') {
        if (this.state.player) {
          this.showPlayerScreen('finished');
        }
      }
    });
  },

  renderPlayerQuestion(q, idx, total) {
    document.getElementById('player-q-counter').innerText = `Pregunta ${idx + 1} de ${total}`;
    document.getElementById('player-q-prompt').innerText = q.question;

    const mcContainer = document.getElementById('player-mc-controls');
    const fbContainer = document.getElementById('player-fb-controls');

    if (q.type === 'multiple_choice') {
      mcContainer.classList.remove('hidden');
      fbContainer.classList.add('hidden');
    } else {
      mcContainer.classList.add('hidden');
      fbContainer.classList.remove('hidden');
      document.getElementById('player-text-answer').value = '';
    }

    this.showPlayerScreen('answering');
  },

  renderPlayerFeedback(payload) {
    const lastAns = (this.state.player.answers && this.state.player.answers[this.state.player.answers.length - 1]);
    const isCorrect = lastAns ? lastAns.isCorrect : false;

    const screen = document.getElementById('player-screen-feedback');
    const icon = document.getElementById('player-feedback-icon');
    const title = document.getElementById('player-feedback-title');
    const subtitle = document.getElementById('player-feedback-subtitle');

    if (isCorrect) {
      soundEngine.playCorrect();
      screen.className = 'player-screen-sub feedback-correct active';
      icon.innerText = '✅';
      title.innerText = '¡RESPUESTA CORRECTA!';
      subtitle.innerText = `+${lastAns.points} puntos ganados • ¡Gran velocidad!`;
    } else {
      soundEngine.playWrong();
      screen.className = 'player-screen-sub feedback-wrong active';
      icon.innerText = '❌';
      title.innerText = '¡UPS! INCORRECTO';
      subtitle.innerText = `La respuesta correcta era: "${payload.correctAnswer}"`;
    }
  },

  // --- DEMO PREVIEW (SPLIT SCREEN) ---
  toggleDemoMode() {
    this.state.demoMode = !this.state.demoMode;
    const body = document.body;
    body.classList.toggle('demo-split-screen', this.state.demoMode);
    
    const demoBtn = document.getElementById('btn-demo-mode');
    if (demoBtn) {
      demoBtn.innerHTML = this.state.demoMode ? '🪟 Cerrar Vista Dividida' : '🪟 Vista Dividida (Demo Pro)';
    }

    const container = document.getElementById('split-player-container');
    if (this.state.demoMode) {
      container.classList.remove('hidden');
      this.renderSplitPlayer();
    } else {
      container.classList.add('hidden');
    }
  },

  createDemoQuickRoom() {
    // Quick room setup for instant demonstration
    document.getElementById('quiz-level-select').value = 'B1';
    this.onDashboardLevelChange();
    document.getElementById('quiz-activity-type').value = 'Quiz Corto';
    document.getElementById('quiz-time-select').value = '20';
    this.createQuizRoom();

    // Auto-add 4 bots and 1 real player
    setTimeout(() => {
      this.addSimulatedStudents(4);
      this.autoJoinDemoPlayer();
    }, 400);
  },

  autoJoinDemoPlayer() {
    if (!this.state.room) return;
    const student = {
      id: 'demo_player_' + Math.random().toString(36).substr(2, 7),
      name: 'Sofía Albarracín',
      code: 'ENG-2024-001',
      avatar: '🦊',
      isBot: false,
      score: 0,
      streak: 0,
      answers: [],
      correctCount: 0
    };
    this.state.player = student;
    if (!this.state.room.students.some(s => s.id === student.id)) {
      this.state.room.students.push(student);
      this.updateLobbyStudents();
      soundEngine.playPop();
    }
    this.renderSplitPlayer();
  },

  renderSplitPlayer() {
    const container = document.getElementById('split-player-content');
    if (!container || !this.state.demoMode) return;

    // 1. If no room is active
    if (!this.state.room) {
      container.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 0;">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">👩‍🏫</div>
          <p style="font-size: 0.95rem; margin-bottom: 1rem; color: var(--text-secondary);">Aún no has creado una sala de parcial.</p>
          <button class="btn btn-kahoot-action" onclick="App.createDemoQuickRoom()" style="width: 100%;">
            ⚡ Crear Sala Rápida Demo (B1)
          </button>
        </div>
      `;
      return;
    }

    // 2. If room exists but student hasn't joined
    if (!this.state.player) {
      container.innerHTML = `
        <div style="background: var(--bg-card); padding: 1.2rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); text-align: center;">
          <p style="font-size: 0.9rem; margin-bottom: 0.8rem;">Sala Activa: <strong>PIN ${this.state.room.pin}</strong></p>
          <button class="btn btn-kahoot-action" onclick="App.autoJoinDemoPlayer()" style="width: 100%;">
            🚀 Unirse como Sofía Albarracín (🦊)
          </button>
        </div>
      `;
      return;
    }

    // 3. In Lobby waiting
    if (this.state.room.state === 'LOBBY') {
      container.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 0; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="font-size: 3.5rem; animation: floatEmoji 2.5s infinite ease-in-out;">${this.state.player.avatar}</div>
          <h3 style="margin: 0.5rem 0;">${this.state.player.name}</h3>
          <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1rem;">Código: <code>${this.state.player.code}</code></p>
          <div class="lobby-waiting-hint">
            <div class="pulse-radar" style="font-size: 1.5rem;">📡</div>
            <p style="font-size: 0.82rem;">Esperando a que la profesora inicie el parcial en la pantalla izquierda...</p>
          </div>
        </div>
      `;
      return;
    }

    // 4. Question is in progress
    if (this.state.room.state === 'QUESTION') {
      const q = this.state.room.questions[this.state.room.currentQuestionIndex];
      const alreadyAnswered = this.state.room.currentAnswers.some(a => a.studentId === this.state.player.id);

      if (alreadyAnswered) {
        container.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">⏳</div>
            <h3>¡Respuesta Enviada!</h3>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.4rem;">Esperando a que termine el tiempo en la pantalla principal...</p>
          </div>
        `;
        return;
      }

      if (q.type === 'multiple_choice') {
        container.innerHTML = `
          <div style="margin-bottom: 0.8rem; font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">
            Mando del Estudiante • Elige una opción:
          </div>
          <div class="player-4-buttons-grid" style="gap: 0.75rem;">
            <button class="btn-player-kahoot btn-player-red" style="height: 90px; font-size: 2.2rem;" onclick="App.playerAnswer(0)">▲</button>
            <button class="btn-player-kahoot btn-player-blue" style="height: 90px; font-size: 2.2rem;" onclick="App.playerAnswer(1)">◆</button>
            <button class="btn-player-kahoot btn-player-yellow" style="height: 90px; font-size: 2.2rem;" onclick="App.playerAnswer(2)">●</button>
            <button class="btn-player-kahoot btn-player-green" style="height: 90px; font-size: 2.2rem;" onclick="App.playerAnswer(3)">■</button>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div style="margin-bottom: 0.8rem; font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">
            Completa el espacio en blanco:
          </div>
          <input type="text" id="split-text-answer" class="form-control" placeholder="Escribe tu respuesta..." style="margin-bottom: 0.8rem;">
          <button class="btn btn-kahoot-action" style="width: 100%;" onclick="App.playerAnswer(-1, document.getElementById('split-text-answer').value)">
            Enviar Respuesta
          </button>
        `;
      }
      return;
    }

    // 5. Question feedback
    if (this.state.room.state === 'FEEDBACK') {
      const lastAns = (this.state.player.answers && this.state.player.answers[this.state.player.answers.length - 1]);
      const isCorrect = lastAns ? lastAns.isCorrect : false;
      container.innerHTML = `
        <div style="text-align: center; padding: 1.8rem 1rem; border-radius: var(--radius-md); ${isCorrect ? 'background: #14532d; color: #86efac; border: 1px solid #22c55e;' : 'background: #7f1d1d; color: #fca5a5; border: 1px solid #ef4444;'}">
          <div style="font-size: 3rem;">${isCorrect ? '✅' : '❌'}</div>
          <h3 style="margin: 0.5rem 0;">${isCorrect ? '¡CORRECTO!' : 'INCORRECTO'}</h3>
          <p style="font-size: 0.95rem; font-weight: 700;">${isCorrect ? `+${lastAns.points} pts • Racha 🔥 ${this.state.player.streak}` : 'Respuesta errónea'}</p>
          <p style="font-size: 0.85rem; margin-top: 0.6rem; opacity: 0.9;">Puntaje acumulado: <strong>${this.state.player.score.toLocaleString()} pts</strong></p>
        </div>
      `;
      return;
    }

    // 6. Finished
    if (this.state.room.state === 'FINISHED') {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🏆</div>
          <h3>¡Parcial Terminado!</h3>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin: 0.5rem 0 1rem;">Tu puntaje final:</p>
          <div style="font-size: 2rem; font-weight: 900; color: #38bdf8; font-family: monospace;">
            ${this.state.player.score.toLocaleString()} pts
          </div>
        </div>
      `;
    }
  },

  bindEvents() {
    // Level change on teacher dashboard
    const lvlSelect = document.getElementById('quiz-level-select');
    if (lvlSelect) {
      lvlSelect.addEventListener('change', () => this.onDashboardLevelChange());
      this.onDashboardLevelChange();
    }

    // Search bar on Study Hub
    const searchInput = document.getElementById('study-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        StudyHub.renderTopics(e.target.value);
      });
    }
  }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
