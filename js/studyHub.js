/**
 * Study Hub Module (CEFR A1 - B2 Curriculum)
 * Interactive theory explorer, flashcards, and native speech pronunciation.
 */

const StudyHub = {
  currentLevel: 'ALL',
  currentTopicId: null,

  init() {
    this.renderLevelFilters();
    this.renderTopics();
  },

  setLevel(level) {
    this.currentLevel = level;
    this.renderLevelFilters();
    this.renderTopics();
  },

  renderLevelFilters() {
    const container = document.getElementById('study-level-filters');
    if (!container) return;

    const levels = [
      { id: 'ALL', label: 'Todos los Niveles', color: '#6366f1' },
      { id: 'A1', label: 'Nivel A1 (Beginner)', color: '#10b981' },
      { id: 'A2', label: 'Nivel A2 (Elementary)', color: '#3b82f6' },
      { id: 'B1', label: 'Nivel B1 (Intermediate)', color: '#eab308' },
      { id: 'B2', label: 'Nivel B2 (Upper Int)', color: '#8b5cf6' }
    ];

    container.innerHTML = levels.map(lvl => `
      <button class="filter-chip ${this.currentLevel === lvl.id ? 'active' : ''}" 
              onclick="StudyHub.setLevel('${lvl.id}')"
              style="${this.currentLevel === lvl.id ? `background: ${lvl.color}; border-color: ${lvl.color};` : ''}">
        ${lvl.label}
      </button>
    `).join('');
  },

  getAllTopics() {
    let list = [];
    Object.keys(CEFR_CONTENT).forEach(lvlKey => {
      if (this.currentLevel === 'ALL' || this.currentLevel === lvlKey) {
        list = list.concat(CEFR_CONTENT[lvlKey].topics);
      }
    });
    return list;
  },

  renderTopics(searchQuery = '') {
    const container = document.getElementById('study-topics-grid');
    if (!container) return;

    let topics = this.getAllTopics();
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      topics = topics.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.subtitle.toLowerCase().includes(q) || 
        t.summary.toLowerCase().includes(q) ||
        t.vocabulary.some(v => v.word.toLowerCase().includes(q) || v.translation.toLowerCase().includes(q))
      );
    }

    if (topics.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No se encontraron temas</h3>
          <p>Prueba con otro término de búsqueda o selecciona otro nivel del CEFR.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = topics.map(topic => {
      const levelMeta = CEFR_CONTENT[topic.level];
      return `
        <div class="topic-card" onclick="StudyHub.openTopicModal('${topic.id}')">
          <div class="topic-header">
            <span class="topic-level-badge level-${topic.level}">${topic.level}</span>
            <span class="topic-icon">${topic.icon}</span>
          </div>
          <h3 class="topic-title">${topic.title}</h3>
          <p class="topic-subtitle">${topic.subtitle}</p>
          <p class="topic-summary">${topic.summary}</p>
          
          <div class="topic-meta-bar">
            <span>📚 ${topic.theory.structures.length} Estructuras</span>
            <span>💡 ${topic.examples.length} Ejemplos</span>
            <span>🔤 ${topic.vocabulary.length} Palabras</span>
          </div>
          <button class="btn-read-topic">
            Estudiar Tema <span class="arrow-icon">→</span>
          </button>
        </div>
      `;
    }).join('');
  },

  openTopicModal(topicId) {
    let targetTopic = null;
    for (const lvl in CEFR_CONTENT) {
      const found = CEFR_CONTENT[lvl].topics.find(t => t.id === topicId);
      if (found) {
        targetTopic = found;
        break;
      }
    }
    if (!targetTopic) return;

    this.currentTopicId = topicId;
    const modal = document.getElementById('topic-detail-modal');
    const content = document.getElementById('topic-modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="modal-header-hero">
        <div class="badge-row" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="topic-level-badge level-${targetTopic.level}">${targetTopic.level} • CEFR</span>
            <span class="hero-icon" style="font-size: 1.5rem; margin-left: 0.5rem;">${targetTopic.icon}</span>
          </div>
          <button class="btn btn-kahoot-action" style="font-size: 0.82rem; padding: 0.4rem 0.9rem;" onclick="StudyHub.startQuizOnTopic('${targetTopic.level}', '${targetTopic.id}')">
            ⚡ Evaluar este Tema en Vivo
          </button>
        </div>
        <h2>${targetTopic.title}</h2>
        <p class="hero-subtitle">${targetTopic.subtitle}</p>
        <p class="hero-desc">${targetTopic.summary}</p>
      </div>

      <!-- Tab navigation inside modal -->
      <div class="modal-tabs">
        <button class="modal-tab active" onclick="StudyHub.switchModalTab(event, 'tab-structures')">📐 Estructuras & Reglas</button>
        <button class="modal-tab" onclick="StudyHub.switchModalTab(event, 'tab-examples')">🌟 Ejemplos Contextuales</button>
        <button class="modal-tab" onclick="StudyHub.switchModalTab(event, 'tab-vocabulary')">🔤 Vocabulario & Audio</button>
      </div>

      <div class="modal-tab-body">
        <!-- Tab 1: Structures & Rules -->
        <div id="tab-structures" class="tab-pane active">
          <h4 class="section-title">Fórmulas Gramaticales</h4>
          <div class="structures-grid">
            ${targetTopic.theory.structures.map(s => `
              <div class="structure-card">
                <span class="struct-type">${s.type}</span>
                <div class="struct-formula"><code>${s.formula}</code></div>
                <div class="struct-example"><em>Ejemplo:</em> "${s.example}"</div>
              </div>
            `).join('')}
          </div>

          <h4 class="section-title mt-4">Reglas Clave a Recordar</h4>
          <ul class="key-rules-list">
            ${targetTopic.theory.keyRules.map(r => `
              <li><span class="rule-bullet">✔</span> ${r}</li>
            `).join('')}
          </ul>

          <h4 class="section-title mt-4">Errores Comunes & Corrección</h4>
          <div class="mistakes-box">
            ${targetTopic.theory.commonMistakes.map(m => `
              <div class="mistake-item">
                <div class="mistake-bad">❌ <s>${m.incorrect}</s></div>
                <div class="mistake-good">✅ <strong>${m.correct}</strong></div>
                <div class="mistake-why"><em>Nota docente:</em> ${m.explanation}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Tab 2: Examples -->
        <div id="tab-examples" class="tab-pane">
          <h4 class="section-title">Casos de Uso Real</h4>
          <div class="examples-list">
            ${targetTopic.examples.map(ex => `
              <div class="example-item">
                <div class="ex-en">
                  <strong>"${ex.en}"</strong>
                  <button class="btn-mini-audio" onclick="soundEngine.speakEnglish('${ex.en.replace(/'/g, "\\'")}')" title="Escuchar pronunciación">
                    🔊
                  </button>
                </div>
                <div class="ex-es">${ex.es}</div>
                <div class="ex-badge">${ex.context}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Tab 3: Vocabulary with Pronunciation -->
        <div id="tab-vocabulary" class="tab-pane">
          <div class="vocab-header-info">
            <p>Haz clic en el icono 🔊 para escuchar la pronunciación nativa con síntesis de voz en inglés.</p>
          </div>
          <div class="vocab-grid">
            ${targetTopic.vocabulary.map(v => `
              <div class="vocab-card">
                <div class="vocab-top">
                  <span class="vocab-word">${v.word}</span>
                  <button class="btn-mini-audio" onclick="soundEngine.speakEnglish('${v.word.replace(/'/g, "\\'")}')" title="Pronunciar en inglés">
                    🔊 Escuchar
                  </button>
                </div>
                <div class="vocab-ipa">${v.ipa}</div>
                <div class="vocab-trans">${v.translation}</div>
                <div class="vocab-sample">
                  <em>"${v.sample}"</em>
                  <button class="btn-micro-audio" onclick="soundEngine.speakEnglish('${v.sample.replace(/'/g, "\\'")}')" title="Escuchar oración">
                    🗣️
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
  },

  switchModalTab(event, tabId) {
    document.querySelectorAll('.modal-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    event.currentTarget.classList.add('active');
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');
  },

  closeTopicModal() {
    const modal = document.getElementById('topic-detail-modal');
    if (modal) modal.classList.remove('open');
  },

  startQuizOnTopic(level, topicId) {
    this.closeTopicModal();
    App.navigateTo('dashboard');
    const lvlSelect = document.getElementById('quiz-level-select');
    if (lvlSelect) {
      lvlSelect.value = level;
      App.onDashboardLevelChange();
    }
    const topicSelect = document.getElementById('quiz-topic-select');
    if (topicSelect) {
      topicSelect.value = topicId;
    }
  }
};
