/**
 * Gradebook & Official Academic Report Module
 * Handles Latin American / Colombian 1.0 - 5.0 grading scale, analytics, CSV export, and print formatting.
 */

const Gradebook = {
  sessionData: null,

  calculateGrade(correct, total) {
    if (total === 0) return 1.0;
    const ratio = correct / total;
    // Standard academic scale: 60% is 3.0 approval threshold
    let grade;
    if (ratio < 0.60) {
      grade = 1.0 + (ratio / 0.60) * 2.0; // from 1.0 to 3.0
    } else {
      grade = 3.0 + ((ratio - 0.60) / 0.40) * 2.0; // from 3.0 to 5.0
    }
    return Math.round(grade * 10) / 10; // Round to 1 decimal place (e.g., 4.5)
  },

  getPerformanceBadge(grade) {
    if (grade >= 4.6) return { label: 'Sobresaliente', class: 'badge-excellent', icon: '🏆' };
    if (grade >= 4.0) return { label: 'Alto', class: 'badge-high', icon: '⭐' };
    if (grade >= 3.0) return { label: 'Básico (Aprobado)', class: 'badge-basic', icon: '✔️' };
    return { label: 'Bajo (Reprobado)', class: 'badge-low', icon: '⚠️' };
  },

  generateReport(session) {
    this.sessionData = session;
    const { students, questions, config } = session;

    // Process each student's results
    const results = students.map(student => {
      const correctCount = student.correctCount || 0;
      const totalQuestions = questions.length;
      const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
      const finalGrade = this.calculateGrade(correctCount, totalQuestions);
      const badge = this.getPerformanceBadge(finalGrade);

      return {
        ...student,
        correctCount,
        totalQuestions,
        accuracy,
        finalGrade,
        badge,
        isPassed: finalGrade >= 3.0
      };
    });

    // Sort by finalGrade descending, then by Kahoot score descending
    results.sort((a, b) => {
      if (b.finalGrade !== a.finalGrade) return b.finalGrade - a.finalGrade;
      return b.score - a.score;
    });

    // Add final ranks
    results.forEach((s, idx) => {
      s.rank = idx + 1;
    });

    // Calculate class statistics
    const totalStudents = results.length;
    const sumGrades = results.reduce((acc, s) => acc + s.finalGrade, 0);
    const averageGrade = totalStudents > 0 ? Math.round((sumGrades / totalStudents) * 10) / 10 : 0;
    const highestGrade = totalStudents > 0 ? Math.max(...results.map(s => s.finalGrade)) : 0;
    const lowestGrade = totalStudents > 0 ? Math.min(...results.map(s => s.finalGrade)) : 0;
    const passedCount = results.filter(s => s.isPassed).length;
    const passRate = totalStudents > 0 ? Math.round((passedCount / totalStudents) * 100) : 0;

    // Analyze most difficult question/topic
    const questionMistakes = {};
    questions.forEach(q => {
      questionMistakes[q.id] = { question: q.question, topicName: q.topicName, wrongCount: 0 };
    });

    results.forEach(s => {
      if (s.answers) {
        s.answers.forEach(ans => {
          if (!ans.isCorrect && questionMistakes[ans.questionId]) {
            questionMistakes[ans.questionId].wrongCount++;
          }
        });
      }
    });

    let mostFailedTopic = "Ninguno identificado";
    let maxFailures = 0;
    Object.values(questionMistakes).forEach(item => {
      if (item.wrongCount > maxFailures) {
        maxFailures = item.wrongCount;
        mostFailedTopic = `${item.topicName} (${maxFailures} fallas acumuladas)`;
      }
    });

    return {
      results,
      stats: {
        totalStudents,
        averageGrade,
        highestGrade,
        lowestGrade,
        passedCount,
        failedCount: totalStudents - passedCount,
        passRate,
        mostFailedTopic
      },
      config
    };
  },

  renderView(report) {
    const container = document.getElementById('gradebook-view');
    if (!container) return;

    const { results, stats, config } = report;

    container.innerHTML = `
      <div class="gradebook-container">
        <!-- Header Actions -->
        <div class="gradebook-header">
          <div>
            <div class="badge-row">
              <span class="topic-level-badge level-${config.level}">${config.level} • CEFR</span>
              <span class="activity-type-pill">${config.activityType}</span>
            </div>
            <h2>Libro Oficial de Calificaciones / Gradebook</h2>
            <p class="subtitle">Sesión PIN: <strong>${config.roomPin}</strong> • Materia: Idioma Inglés • Fecha: ${new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div class="gradebook-actions">
            <button class="btn btn-secondary" onclick="Gradebook.exportCSV()">
              📥 Exportar a CSV / Excel
            </button>
            <button class="btn btn-primary" onclick="Gradebook.printReport()">
              🖨️ Imprimir Reporte Oficial
            </button>
            <button class="btn btn-outline" onclick="App.navigateTo('dashboard')">
              ← Volver al Panel
            </button>
          </div>
        </div>

        <!-- Academic Summary Cards -->
        <div class="stats-cards-grid">
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-data">
              <span class="stat-label">Promedio de la Clase</span>
              <span class="stat-value ${stats.averageGrade >= 3.0 ? 'text-green' : 'text-red'}">${stats.averageGrade.toFixed(1)} / 5.0</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-data">
              <span class="stat-label">Nota Más Alta</span>
              <span class="stat-value text-purple">${stats.highestGrade.toFixed(1)} / 5.0</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-data">
              <span class="stat-label">Tasa de Aprobación</span>
              <span class="stat-value text-blue">${stats.passRate}% (${stats.passedCount}/${stats.totalStudents})</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💡</div>
            <div class="stat-data">
              <span class="stat-label">Tema con Más Fallas</span>
              <span class="stat-subvalue">${stats.mostFailedTopic}</span>
            </div>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div class="table-controls">
          <input type="text" id="gradebook-search" placeholder="🔍 Buscar estudiante por nombre o código..." oninput="Gradebook.filterTable(this.value)" class="input-search">
          <span class="student-count-indicator">Total: <strong>${results.length}</strong> estudiantes evaluados</span>
        </div>

        <!-- Printable Academic Header (Hidden in Screen, Visible in Print) -->
        <div class="print-only print-header">
          <div class="print-org-info">
            <h1>INSTITUCIÓN EDUCATIVA / DEPARTAMENTO DE LENGUAS EXTRANJERAS</h1>
            <h2>REPORTE OFICIAL DE CALIFICACIONES - PARCIAL EN VIVO</h2>
            <p><strong>Nivel CEFR:</strong> ${config.level} | <strong>Actividad:</strong> ${config.activityType} | <strong>Tema:</strong> ${config.topicTitle}</p>
            <p><strong>Fecha de Evaluación:</strong> ${new Date().toLocaleString()} | <strong>PIN de Sala:</strong> ${config.roomPin}</p>
          </div>
          <div class="print-stats-summary">
            <strong>Resumen Ejecutivo:</strong> Estudiantes Evaluados: ${stats.totalStudents} | Promedio General: ${stats.averageGrade}/5.0 | Aprobados: ${stats.passedCount} (${stats.passRate}%) | Reprobados: ${stats.failedCount}
          </div>
        </div>

        <!-- Interactive Table -->
        <div class="table-responsive">
          <table class="gradebook-table" id="gradebook-data-table">
            <thead>
              <tr>
                <th style="width: 70px;">Puesto</th>
                <th>Estudiante</th>
                <th>Código ID</th>
                <th>Aciertos</th>
                <th>Efectividad</th>
                <th>Puntaje Kahoot</th>
                <th>Nota Final (1.0 - 5.0)</th>
                <th>Desempeño</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${results.map(s => `
                <tr class="${s.isPassed ? 'row-passed' : 'row-failed'}">
                  <td class="rank-cell">
                    <span class="rank-badge ${s.rank === 1 ? 'rank-1' : s.rank === 2 ? 'rank-2' : s.rank === 3 ? 'rank-3' : ''}">
                      #${s.rank}
                    </span>
                  </td>
                  <td class="student-cell">
                    <span class="student-avatar">${s.avatar || '🎓'}</span>
                    <strong>${s.name}</strong>
                    ${s.isBot ? '<span class="bot-badge">Simulado</span>' : ''}
                  </td>
                  <td><code>${s.code || 'N/A'}</code></td>
                  <td><strong>${s.correctCount}</strong> / ${s.totalQuestions}</td>
                  <td>
                    <div class="progress-bar-inline">
                      <div class="bar-fill" style="width: ${s.accuracy}%"></div>
                    </div>
                    <span class="pct-text">${s.accuracy}%</span>
                  </td>
                  <td><span class="kahoot-pts">${s.score.toLocaleString()} pts</span></td>
                  <td>
                    <span class="grade-pill ${s.finalGrade >= 4.0 ? 'grade-high' : s.finalGrade >= 3.0 ? 'grade-pass' : 'grade-fail'}">
                      ${s.finalGrade.toFixed(1)}
                    </span>
                  </td>
                  <td>
                    <span class="perf-badge ${s.badge.class}">
                      ${s.badge.icon} ${s.badge.label}
                    </span>
                  </td>
                  <td>
                    <span class="status-tag ${s.isPassed ? 'status-pass' : 'status-fail'}">
                      ${s.isPassed ? 'APROBADO' : 'REPROBADO'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Print-only Signature Footer -->
        <div class="print-only print-footer">
          <div class="signature-line">
            <p>________________________________________________</p>
            <p><strong>Firma de la Profesora / Docente Titular</strong></p>
            <p>Departamento de Inglés y Lenguas Modernas</p>
          </div>
          <div class="signature-line">
            <p>________________________________________________</p>
            <p><strong>Visto Bueno Coordinación Académica</strong></p>
            <p>Registro y Control de Calificaciones</p>
          </div>
        </div>
      </div>
    `;
  },

  filterTable(query) {
    const q = query.toLowerCase().trim();
    const rows = document.querySelectorAll('#gradebook-data-table tbody tr');
    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  },

  exportCSV() {
    if (!this.sessionData) {
      alert("No hay datos de sesión disponibles para exportar.");
      return;
    }

    const { results, config } = this.sessionData.report || this.generateReport(this.sessionData);

    const headers = [
      "Puesto",
      "Nombre",
      "Codigo_Estudiante",
      "Aciertos",
      "Total_Preguntas",
      "Porcentaje_Efectividad",
      "Puntaje_Kahoot",
      "Nota_Final_5_0",
      "Desempeno",
      "Estado_Aprobatorio"
    ];

    const rows = results.map(s => [
      s.rank,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.code || ''}"`,
      s.correctCount,
      s.totalQuestions,
      `${s.accuracy}%`,
      s.score,
      s.finalGrade.toFixed(1),
      `"${s.badge.label}"`,
      s.isPassed ? "APROBADO" : "REPROBADO"
    ]);

    const csvContent = "\uFEFF" + [headers.join(",")].concat(rows.map(r => r.join(","))).join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const cleanDate = new Date().toISOString().split("T")[0];
    link.setAttribute("href", url);
    link.setAttribute("download", `Calificaciones_Ingles_${config.level}_${cleanDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  printReport() {
    window.print();
  }
};
