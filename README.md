# 🇬🇧 EnglishArena PRO • Kahoot-Style Educational Platform
### Sistema Web Educativo Completo e Interactivo para Clases Universitarias y Escolares

Una plataforma moderna, rápida y pedagógicamente rigurosa para la enseñanza del idioma inglés, diseñada tanto para sesiones en vivo de proyección en clase (*Host / Proyector*) como para interacción simultánea de estudiantes desde smartphones, tablets o computadores.

---

## 🚀 Características Principales

### 1. Estructura de Contenidos por Niveles CEFR (A1 a B2)
- **Nivel A1 (Beginner):**
  - *Present Simple:* Hábitos, rutinas diarias, reglas de tercera persona singular (-s, -es, -ies) y auxiliares *Do / Does*.
  - *Verb To Be:* Identidad, edad (*I am 20 years old*), estados emocionales y clima.
  - *Basic Vocabulary:* Saludos formales/informales (*Good evening* vs *Good night*), números, familia y objetos de clase.
  - *Articles & Pronouns:* Diferenciación fonética *A vs An* (*an hour*, *a university*), pronombres sujeto, objeto y adjetivos posesivos.
- **Nivel A2 (Elementary):**
  - *Past Simple:* Verbos regulares (pronunciación de *-ed* como /t/, /d/ y /ɪd/), irregulares clave y uso de *did / didn't*.
  - *Present Continuous:* Acciones en tiempo real, reglas de ortografía *-ing* y contraste con *Stative Verbs*.
  - *Comparative & Superlative:* Formas cortas (*-er / -est*), largas (*more / most*), irregulares (*good/better/best*, *bad/worse/worst*) y comparativo de igualdad.
  - *Daily Routines & Frequency:* Posición de adverbios de frecuencia (*always, usually, rarely*) y conectores discursivos (*First, Then, Finally*).
- **Nivel B1 (Intermediate):**
  - *Present Perfect:* Experiencias, tiempo no concluido, contraste con *Past Simple*, marcadores *Already, Yet, Just, For* y *Since*.
  - *Modal Verbs:* Obligación (*Must* vs *Have to*), prohibición (*Mustn't*) y consejo (*Should / Ought to*).
  - *First & Second Conditionals:* Probabilidad real (*If + Present, Will...*) vs situaciones hipotéticas (*If + Past, Would...* y *If I were you*).
  - *Passive Voice:* Estructura en presente y pasado (*am/is/are + V3*, *was/were + V3*) para redacción académica.
- **Nivel B2 (Upper Intermediate):**
  - *Third Conditional:* Especulación retrospectiva (*If + had + V3, would have + V3*) e inversión formal (*Had I known...*).
  - *Reported Speech:* Discurso indirecto, cambios de tiempos (*Backshift*), adaptaciones de lugar y tiempo (*today → that day*).
  - *Mixed Conditionals:* Conexión entre causas del pasado y realidades del presente.
  - *Advanced Phrasal Verbs & Vocabulary:* Verbos separables e inseparables de 2 y 3 partículas (*look forward to, put off, call off, come across*).

> **🔊 Audio Nativo Integrado:** Cada tarjeta de vocabulario y ejemplo cuenta con síntesis de voz en inglés (*Web Speech API*) para escuchar la pronunciación y entonación correcta en tiempo real.

---

### 2. Panel de la Profesora (Teacher Dashboard)
- Configuración personalizada de la sesión:
  - Selección de nivel CEFR (A1, A2, B1, B2).
  - Selección de tema específico o modo **"Examen Pro / Parcial General"** (mezcla aleatoria de todo el nivel).
  - Selección de tipo de actividad: *Quiz Corto (5 preguntas)*, *Taller Interactivo (10 preguntas)* o *Parcial Final Pro (15 preguntas)*.
  - Tiempo ajustable por pregunta: 15s, 20s, 30s, 45s o 60s.
  - Ponderación de la nota para el semestre (20%, 25%, 30%, 50%, 100%).
- **Generador de Sala y Código QR:**
  - PIN aleatorio de 6 dígitos con enlace directo.
  - Código QR generado matemáticamente en SVG (100% nativo, sin dependencias externas).
- **Lobby en Vivo (Waiting Room):**
  - Lista de estudiantes conectados en tiempo real.
  - Botón para **Añadir Alumnos Simulados (Bots)** con nombres y códigos realistas para demostraciones inmediatas.
  - Opción de expulsión (*Kick student*) para moderar la sala.
  - Cuenta regresiva animada (3, 2, 1, ¡GO!) con efectos sonoros antes de la primera pregunta.

---

### 3. Arena de Juego / Parcial en Vivo (Kahoot Style)
- **Pantalla de Proyección (Host / Profesora):**
  - Pregunta en tipografía de alto impacto.
  - Temporizador visual animado en anillo SVG circular con cambio de color y advertencia sonora en los últimos 5 segundos.
  - Cuadrícula con los 4 colores y figuras geométricas icónicas de Kahoot:
    - 🔺 **Rojo:** Triángulo
    - 🔷 **Azul:** Rombo
    - 🟡 **Amarillo:** Círculo
    - 🟩 **Verde:** Cuadrado
  - Gráfica de barras de respuestas que revela la distribución de elecciones tras terminar el tiempo.
  - Tarjeta pedagógica de retroalimentación inmediata (*"¿Por qué es correcto?"*).
  - Modal de **Tabla de Posiciones Intermedia (Top 5)** con indicador de racha de fuego 🔥.
- **Mando del Estudiante (Player Controller):**
  - Compatible con cualquier pantalla táctil o móvil.
  - Botones táctiles de gran tamaño.
  - Soporte tanto para **Opción Múltiple (4 alternativas)** como **Completar Espacios en Blanco (*Fill in the blanks*)**.
  - Retroalimentación instantánea (Pantalla verde con arpegio de éxito y puntos por velocidad vs pantalla roja de corrección).
- **Modo Vista Dividida (Demo Pro):**
  - Permite visualizar la pantalla de la profesora y el mando del estudiante lado a lado en un mismo monitor para pruebas y exposiciones.

---

### 4. Podio 3D y Resultados Finales
- Escenario con pedestales tridimensionales para 1º (Oro), 2º (Plata) y 3º (Bronce).
- Animación de entrada de los ganadores con fanfarria triunfal sintetizada por software.
- Lluvia continua de confeti renderizada sobre un lienzo HTML5 Canvas.
- Tabla de posiciones general accesible con todos los alumnos.

---

### 5. Libro Oficial de Calificaciones (Gradebook)
- **Escala de Calificación Académica Latinoamericana / Colombiana (1.0 a 5.0):**
  - Cálculo ponderado con umbral de aprobación del 60% (*Nota 3.0*).
  - Insignias de desempeño: *Sobresaliente (4.6 - 5.0)*, *Alto (4.0 - 4.5)*, *Básico (3.0 - 3.9)* y *Bajo (1.0 - 2.9)*.
- **Métricas Ejecutivas del Curso:**
  - Promedio general del grupo.
  - Nota más alta y más baja.
  - Tasa de aprobación (% Aprobados vs Reprobados).
  - Detección automática del tema o pregunta con más fallas para refuerzo docente.
- **Exportación e Impresión:**
  - 📥 **Exportar a CSV / Excel:** Genera un archivo `.csv` con codificación UTF-8 BOM para abrir nombres y tildes perfectamente en Microsoft Excel.
  - 🖨️ **Imprimir Reporte Oficial:** Hoja de estilo adaptada (`@media print`) con membrete institucional, resumen ejecutivo, tabla formal y espacio para firma docente y visto bueno de coordinación.

---

## 🛠️ Tecnologías y Arquitectura

- **Frontend:** HTML5 semántico, CSS3 moderno (Variables CSS, Flexbox, Grid, Neumorfismo y Glassmorfismo) y Vanilla JavaScript (ES6+ modular).
- **Sincronización en Tiempo Real:** `BroadcastChannel API` + fallback en `LocalStorage Event Storage` para comunicación entre pestañas/ventanas sin requerir backend obligatorio.
- **Síntesis Sonora:** `Web Audio API` (genera música rítmica de tensión para el temporizador, ticks, arpegios mayores y fanfarrias sin archivos externos `.mp3` que puedan fallar).
- **Pronunciación:** `Web Speech API (SpeechSynthesis)` para reproducción de acento en inglés nativo.
- **Generación de QR:** Motor matemático puro de codificación Reed-Solomon en SVG.

---

## 💻 Instrucciones de Uso

1. Abre el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Edge, Safari, Firefox).
2. Para una demostración rápida de 1 minuto:
   - Haz clic en el botón superior **"🪟 Vista Dividida (Demo Pro)"**.
   - Haz clic en **"⚡ Crear Sala Rápida Demo (B1)"** en el panel lateral.
   - En el Lobby, haz clic en **"▶️ ¡Iniciar Parcial Ahora!"**.
   - Interactúa respondiendo desde el mando del estudiante de la derecha mientras ves cómo la pantalla de la profesora cuenta los tiempos y calcula las notas.
3. Al finalizar, haz clic en **"📋 Ver Libro Oficial de Calificaciones (Gradebook)"** para exportar el reporte a Excel o imprimirlo en PDF.
