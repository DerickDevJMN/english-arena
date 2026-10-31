/**
 * Real-time Cross-Tab & Multi-device Sync Engine
 * Uses BroadcastChannel with LocalStorage fallback, plus intelligent Simulated Student Bot engine.
 */

class SyncEngine {
  constructor() {
    this.channelName = 'kahoot_english_pro_channel';
    this.channel = null;
    this.listeners = [];
    this.bots = [];
    this.botTimers = [];

    this.initChannel();
  }

  initChannel() {
    if ('BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel(this.channelName);
        this.channel.onmessage = (event) => {
          this.notifyListeners(event.data);
        };
      } catch (e) {
        console.warn('BroadcastChannel error, falling back to LocalStorage:', e);
      }
    }

    // Storage fallback for cross-tab or when BroadcastChannel is restricted
    window.addEventListener('storage', (e) => {
      if (e.key === 'kahoot_sync_event' && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          this.notifyListeners(data);
        } catch (err) {}
      }
    });
  }

  broadcast(type, payload = {}) {
    const message = {
      type,
      payload,
      timestamp: Date.now()
    };

    if (this.channel) {
      this.channel.postMessage(message);
    }

    try {
      localStorage.setItem('kahoot_sync_event', JSON.stringify(message));
    } catch (e) {}

    // Also notify local listeners in the same window
    this.notifyListeners(message);
  }

  on(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners(message) {
    this.listeners.forEach(cb => {
      try {
        cb(message);
      } catch (err) {
        console.error('Error in sync listener:', err);
      }
    });
  }

  // --- BOT SIMULATION ENGINE ---
  generateBotNames(count = 5) {
    const botPool = [
      { name: "Valentina Castro", code: "ENG-2024-012", avatar: "🦊", accuracy: 0.88 },
      { name: "Mateo Gómez", code: "ENG-2024-034", avatar: "🦁", accuracy: 0.82 },
      { name: "Camila Restrepo", code: "ENG-2024-055", avatar: "🦉", accuracy: 0.94 },
      { name: "Santiago Ríos", code: "ENG-2024-078", avatar: "🐼", accuracy: 0.76 },
      { name: "Isabella Navarro", code: "ENG-2024-091", avatar: "🦄", accuracy: 0.90 },
      { name: "Andrés Morales", code: "ENG-2024-104", avatar: "🚀", accuracy: 0.70 },
      { name: "Mariana Silva", code: "ENG-2024-118", avatar: "⚡", accuracy: 0.85 },
      { name: "Daniel Herrera", code: "ENG-2024-132", avatar: "🐯", accuracy: 0.65 },
      { name: "Lucía Paredes", code: "ENG-2024-149", avatar: "🌸", accuracy: 0.92 },
      { name: "Nicolás Vargas", code: "ENG-2024-167", avatar: "🦅", accuracy: 0.78 }
    ];

    // Pick unique bots
    const shuffled = [...botPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  addSimulatedBots(count = 5, roomPin, onBotJoined) {
    const newBots = this.generateBotNames(count);
    newBots.forEach((bot, index) => {
      setTimeout(() => {
        const student = {
          id: 'bot_' + Math.random().toString(36).substr(2, 9),
          name: bot.name,
          code: bot.code,
          avatar: bot.avatar,
          isBot: true,
          accuracy: bot.accuracy,
          score: 0,
          streak: 0,
          answers: [],
          correctCount: 0
        };
        this.bots.push(student);
        if (onBotJoined) onBotJoined(student);

        this.broadcast('PLAYER_JOINED', {
          roomPin,
          student
        });
      }, index * 250); // slight realistic stagger
    });
  }

  clearBots() {
    this.bots = [];
    this.botTimers.forEach(t => clearTimeout(t));
    this.botTimers = [];
  }

  simulateBotAnswers(currentQuestion, timeLimitSeconds, onAnswer) {
    this.botTimers.forEach(t => clearTimeout(t));
    this.botTimers = [];

    this.bots.forEach(bot => {
      // Random reaction time between 1.5s and 80% of total time
      const delayMs = 1500 + Math.random() * (timeLimitSeconds * 1000 * 0.7);
      
      const timer = setTimeout(() => {
        const isCorrect = Math.random() < bot.accuracy;
        let chosenAnswer = "";
        let chosenIndex = -1;

        if (currentQuestion.type === 'multiple_choice') {
          if (isCorrect) {
            chosenIndex = currentQuestion.correctIndex;
            chosenAnswer = currentQuestion.options[chosenIndex];
          } else {
            // Pick a wrong option
            const wrongIndices = [0, 1, 2, 3].filter(i => i !== currentQuestion.correctIndex);
            chosenIndex = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
            chosenAnswer = currentQuestion.options[chosenIndex];
          }
        } else {
          // Fill blank
          chosenAnswer = isCorrect ? currentQuestion.correctAnswer : "incorrect word";
        }

        const elapsedSeconds = delayMs / 1000;
        const timeRemaining = Math.max(0, timeLimitSeconds - elapsedSeconds);
        // Kahoot scoring: (1 - (response_time / (time_limit * 2))) * 1000 points
        const speedBonus = Math.round((timeRemaining / timeLimitSeconds) * 500);
        const points = isCorrect ? (500 + speedBonus) : 0;

        if (onAnswer) {
          onAnswer({
            studentId: bot.id,
            studentName: bot.name,
            isCorrect,
            chosenIndex,
            chosenAnswer,
            timeRemaining,
            points
          });
        }
      }, delayMs);

      this.botTimers.push(timer);
    });
  }
}

const syncEngine = new SyncEngine();
