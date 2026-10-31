/**
 * CEFR English Content Database (A1 - B2)
 * Comprehensive pedagogical content covering grammar, usage, examples, and vocabulary.
 */

const CEFR_CONTENT = {
  A1: {
    levelName: "A1 - Beginner / Principiante",
    color: "#10b981", // Emerald
    description: "Comprensión y uso de expresiones cotidianas básicas y frases sencillas para necesidades concretas.",
    topics: [
      {
        id: "a1-present-simple",
        title: "Present Simple",
        subtitle: "Habits, Routines & Universal Truths",
        icon: "⏰",
        level: "A1",
        summary: "Se utiliza para hablar de rutinas diarias, hábitos repetitivos, hechos permanentes y verdades universales.",
        theory: {
          structures: [
            { type: "Afirmativa (+)", formula: "Subject + Verb(s) + Complement", example: "She works at a university every Monday." },
            { type: "Negativa (-)", formula: "Subject + don't / doesn't + Verb (base) + Complement", example: "They do not (don't) eat meat." },
            { type: "Interrogativa (?)", formula: "Do / Does + Subject + Verb (base) + Complement?", example: "Does he speak English fluently?" }
          ],
          keyRules: [
            "Tercera persona singular (he, she, it): agregamos -s o -es al verbo principal (e.g., play → plays, watch → watches).",
            "Si el verbo termina en consonante + y, cambiamos a -ies (study → studies).",
            "Los auxiliares DO (I, you, we, they) y DOES (he, she, it) cancelan la -s del verbo en negaciones y preguntas."
          ],
          commonMistakes: [
            { incorrect: "She lives in London? / She doesn't lives here.", correct: "Does she live in London? / She doesn't live here.", explanation: "Al usar auxiliar does/doesn't, el verbo principal regresa a su forma base sin 's'." }
          ]
        },
        examples: [
          { en: "Water boils at 100 degrees Celsius.", es: "El agua hierve a 100 grados Celsius.", context: "Hecho científico" },
          { en: "I wake up at 6:30 AM every morning.", es: "Me despierto a las 6:30 a.m. todas las mañanas.", context: "Rutina personal" },
          { en: "Lucas plays basketball on Saturdays.", es: "Lucas juega baloncesto los sábados.", context: "Hábito semanal" }
        ],
        vocabulary: [
          { word: "Always", ipa: "/ˈɔːlweɪz/", translation: "Siempre", sample: "I always brush my teeth before sleeping." },
          { word: "Usually", ipa: "/ˈjuːʒuəli/", translation: "Usualmente", sample: "She usually takes the bus to school." },
          { word: "Sometimes", ipa: "/ˈsʌmtaɪmz/", translation: "A veces", sample: "We sometimes drink coffee after dinner." },
          { word: "Never", ipa: "/ˈnevər/", translation: "Nunca", sample: "He never arrives late to class." },
          { word: "Wake up", ipa: "/weɪk ʌp/", translation: "Despertarse", sample: "I wake up early on weekdays." },
          { word: "Breakfast", ipa: "/ˈbrekfəst/", translation: "Desayuno", sample: "We have breakfast together as a family." }
        ]
      },
      {
        id: "a1-to-be",
        title: "Verb To Be",
        subtitle: "Identity, States & Descriptions",
        icon: "👤",
        level: "A1",
        summary: "El verbo más fundamental del inglés: significa 'Ser' o 'Estar' y no requiere auxiliares externos para negar o preguntar.",
        theory: {
          structures: [
            { type: "Presente Afirmativo", formula: "I am | You/We/They are | He/She/It is", example: "I am a student. She is ready." },
            { type: "Contracciones", formula: "I'm, You're, We're, They're, He's, She's, It's", example: "We're in the English laboratory." },
            { type: "Negativa", formula: "Subject + AM/IS/ARE + not + Complement", example: "He is not (isn't) hungry." },
            { type: "Pregunta", formula: "AM/IS/ARE + Subject + Complement?", example: "Are you ready for the exam?" }
          ],
          keyRules: [
            "En inglés, el verbo TO BE también se usa para la EDAD (e.g. 'I am 20 years old', NUNCA 'I have 20 years').",
            "También se usa para sensaciones físicas y clima: 'I am hungry' (tengo hambre), 'It is cold' (hace frío)."
          ],
          commonMistakes: [
            { incorrect: "I have 19 years old.", correct: "I am 19 years old.", explanation: "En inglés la edad es un estado de existencia (To Be), no una posesión (To Have)." }
          ]
        },
        examples: [
          { en: "Dr. Evans is our English professor.", es: "El Dr. Evans es nuestro profesor de inglés.", context: "Identidad profesional" },
          { en: "They are very enthusiastic about the project.", es: "Ellos están muy entusiasmados con el proyecto.", context: "Estado emocional" },
          { en: "It is sunny and warm today.", es: "Hoy está soleado y cálido.", context: "Clima" }
        ],
        vocabulary: [
          { word: "Student", ipa: "/ˈstjuːdnt/", translation: "Estudiante", sample: "She is a dedicated university student." },
          { word: "Teacher", ipa: "/ˈtiːtʃər/", translation: "Profesor(a)", sample: "Our teacher explains grammar very clearly." },
          { word: "Classroom", ipa: "/ˈklɑːsruːm/", translation: "Aula de clase", sample: "The classroom is spacious and bright." },
          { word: "Hungry", ipa: "/ˈhʌŋɡri/", translation: "Hambriento/a", sample: "I am hungry after three hours of lecture." },
          { word: "Thirsty", ipa: "/ˈθɜːrsti/", translation: "Sediento/a", sample: "Drink water if you are thirsty." },
          { word: "Tired", ipa: "/ˈtaɪərd/", translation: "Cansado/a", sample: "They are tired after the marathon." }
        ]
      },
      {
        id: "a1-basic-vocab",
        title: "Basic Vocabulary",
        subtitle: "Greetings, Family, Numbers & Everyday Objects",
        icon: "🎒",
        level: "A1",
        summary: "Léxico esencial para presentarse, saludar cordialmente, describir miembros de la familia y el entorno escolar.",
        theory: {
          structures: [
            { type: "Saludos Formales", formula: "Good morning / afternoon / evening", example: "Good morning, Professor Johnson." },
            { type: "Saludos Informales", formula: "Hello / Hi / Hey / How are you doing?", example: "Hey Sophia, how's everything?" },
            { type: "Despedidas", formula: "Goodbye / See you tomorrow / Take care", example: "See you next Monday in class!" }
          ],
          keyRules: [
            "Good evening se usa para saludar al llegar de noche (a partir de las 6 p.m.).",
            "Good night SOLO se usa para despedirse o antes de ir a dormir, nunca como saludo de llegada."
          ],
          commonMistakes: [
            { incorrect: "Saying 'Good night' when entering a restaurant at 8 PM.", correct: "Say 'Good evening' upon arrival.", explanation: "Good night es exclusivamente una despedida nocturna." }
          ]
        },
        examples: [
          { en: "Nice to meet you! My name is Carlos.", es: "¡Gusto en conocerte! Mi nombre es Carlos.", context: "Presentación formal" },
          { en: "I have two brothers and one younger sister.", es: "Tengo dos hermanos y una hermana menor.", context: "Familia" },
          { en: "Can I borrow your notebook and pen?", es: "¿Puedo tomar prestado tu cuaderno y bolígrafo?", context: "Objetos de clase" }
        ],
        vocabulary: [
          { word: "Notebook", ipa: "/ˈnəʊtbʊk/", translation: "Cuaderno", sample: "Write your notes inside this notebook." },
          { word: "Brother", ipa: "/ˈbrʌðər/", translation: "Hermano", sample: "My brother studies engineering." },
          { word: "Sister", ipa: "/ˈsɪstər/", translation: "Hermana", sample: "Her sister is twelve years old." },
          { word: "Pencil", ipa: "/ˈpensl/", translation: "Lápiz", sample: "Use a pencil for the diagram." },
          { word: "Backpack", ipa: "/ˈbækpæk/", translation: "Mochila / Morral", sample: "Put your books inside your backpack." },
          { word: "Library", ipa: "/ˈlaɪbrəri/", translation: "Biblioteca", sample: "We study silently in the library." }
        ]
      },
      {
        id: "a1-articles-pronouns",
        title: "Articles & Pronouns",
        subtitle: "A / An / The, Subject & Possessive Pronouns",
        icon: "🔤",
        level: "A1",
        summary: "Elementos estructurales para determinar objetos específicos vs genéricos, y reemplazar sustantivos para evitar redundancias.",
        theory: {
          structures: [
            { type: "Artículo Indefinido A / An", formula: "A + sonido consonante | AN + sonido vocal", example: "a university (sonido /j/), an apple, an hour (sonido /aʊər/)" },
            { type: "Artículo Definido The", formula: "The + sustantivo específico conocido", example: "The book on the table is mine." },
            { type: "Pronombres Sujeto vs Objeto", formula: "I/me, You/you, He/him, She/her, It/it, We/us, They/them", example: "She gave the homework to him." }
          ],
          keyRules: [
            "Regla de sonido, NO de letra: Usamos 'an' antes de sonidos vocálicos (an hour, an umbrella) y 'a' antes de sonidos consonánticos (a university, a European country).",
            "Los adjetivos posesivos (my, your, his, her, its, our, their) siempre van acompañados de un sustantivo (my car).",
            "Los pronombres posesivos (mine, yours, his, hers, ours, theirs) van solos al final de la cláusula (The car is mine)."
          ],
          commonMistakes: [
            { incorrect: "A honest man / An university.", correct: "An honest man / A university.", explanation: "'Honest' empieza con sonido vocal /ɒ/; 'university' empieza con sonido consonántico semivocal /j/." }
          ]
        },
        examples: [
          { en: "An umbrella is essential during rainy season.", es: "Un paraguas es esencial durante la temporada de lluvias.", context: "Uso de 'an'" },
          { en: "This is my jacket; that one is yours.", es: "Esta es mi chaqueta; esa de allá es la tuya.", context: "Posesivos" },
          { en: "We love our teacher and she always supports us.", es: "Amamos a nuestra profesora y ella siempre nos apoya.", context: "Pronombres de objeto" }
        ],
        vocabulary: [
          { word: "Umbrella", ipa: "/ʌmˈbrelə/", translation: "Paraguas", sample: "Take an umbrella because it might rain." },
          { word: "University", ipa: "/ˌjuːnɪˈvɜːrsəti/", translation: "Universidad", sample: "He attends a prestigious university." },
          { word: "Honest", ipa: "/ˈɒnɪst/", translation: "Honesto/a", sample: "She is an honest and hardworking student." },
          { word: "Their", ipa: "/ðeər/", translation: "De ellos / Sus", sample: "Their project won first place." },
          { word: "Ours", ipa: "/ˈaʊərz/", translation: "El nuestro / De nosotros", sample: "The blue team is ours." }
        ]
      }
    ]
  },
  A2: {
    levelName: "A2 - Elementary / Básico",
    color: "#3b82f6", // Blue
    description: "Capacidad para describir aspectos del pasado, el entorno inmediato y comunicarse en tareas habituales.",
    topics: [
      {
        id: "a2-past-simple",
        title: "Past Simple",
        subtitle: "Completed Actions, Regular & Irregular Verbs",
        icon: "📜",
        level: "A2",
        summary: "Se utiliza para acciones concretas que empezaron y finalizaron en un momento específico del pasado.",
        theory: {
          structures: [
            { type: "Verbos Regulares (+)", formula: "Verb + -ed / -d", example: "She visited the museum yesterday." },
            { type: "Verbos Irregulares (+)", formula: "Segunda columna de verbos", example: "We went (go → went) to Paris in 2023." },
            { type: "Negativa (-)", formula: "Subject + didn't + Verb (base)", example: "He didn't call me last night." },
            { type: "Pregunta (?)", formula: "Did + Subject + Verb (base)?", example: "Did you finish the assignment?" }
          ],
          keyRules: [
            "Pronunciación del -ed: /t/ tras consonantes sordas (p, k, f, s, sh, ch: watched); /d/ tras sonoras (b, g, v, z, m, n, l: played); /ɪd/ solo tras t o d (wanted, needed).",
            "El auxiliar DID absorbe el pasado; el verbo principal SIEMPRE va en infinitivo/base en negación y pregunta."
          ],
          commonMistakes: [
            { incorrect: "Did you saw the news?", correct: "Did you see the news?", explanation: "'Did' ya indica pasado; el verbo debe estar en infinitivo (see)." }
          ]
        },
        examples: [
          { en: "Gabriel García Márquez wrote 'One Hundred Years of Solitude'.", es: "Gabriel García Márquez escribió 'Cien años de soledad'.", context: "Hecho histórico" },
          { en: "We moved into our new apartment last month.", es: "Nos mudamos a nuestro nuevo apartamento el mes pasado.", context: "Acción completada" },
          { en: "Did you study for the Midterm Exam?", es: "¿Estudiaste para el examen parcial?", context: "Pregunta en pasado" }
        ],
        vocabulary: [
          { word: "Yesterday", ipa: "/ˈjestərdeɪ/", translation: "Ayer", sample: "I attended the workshop yesterday." },
          { word: "Last week", ipa: "/lɑːst wiːk/", translation: "La semana pasada", sample: "We submitted the essay last week." },
          { word: "Ago", ipa: "/əˈɡəʊ/", translation: "Hace (tiempo atrás)", sample: "They graduated two years ago." },
          { word: "Discovered", ipa: "/dɪˈskʌvəd/", translation: "Descubierto/a", sample: "Alexander Fleming discovered penicillin." },
          { word: "Broke", ipa: "/brəʊk/", translation: "Rompió (romper)", sample: "He accidentally broke the test tube." },
          { word: "Bought", ipa: "/bɔːt/", translation: "Compró (comprar)", sample: "She bought a dictionary for class." }
        ]
      },
      {
        id: "a2-present-continuous",
        title: "Present Continuous",
        subtitle: "Actions in Progress & Temporary Situations",
        icon: "🌊",
        level: "A2",
        summary: "Describe acciones que están ocurriendo en el momento exacto en que se habla o tendencias temporales actuales.",
        theory: {
          structures: [
            { type: "Afirmativa (+)", formula: "Subject + AM/IS/ARE + Verb-ING", example: "The professor is explaining the theorem right now." },
            { type: "Negativa (-)", formula: "Subject + AM/IS/ARE + NOT + Verb-ING", example: "They aren't listening to music; they are working." },
            { type: "Pregunta (?)", formula: "AM/IS/ARE + Subject + Verb-ING?", example: "Are you preparing for the quiz?" }
          ],
          keyRules: [
            "Stative Verbs (verbos de estado): Verbos como 'know', 'understand', 'want', 'like', 'believe' NO suelen usarse en continuo (se dice 'I understand', no 'I am understanding').",
            "Duplicación de consonante C-V-C: run → running, swim → swimming, sit → sitting."
          ],
          commonMistakes: [
            { incorrect: "I am knowing the answer.", correct: "I know the answer.", explanation: "'Know' es un verbo de estado mental; no admite la forma continua." }
          ]
        },
        examples: [
          { en: "Look! It is starting to rain heavily outside.", es: "¡Mira! Está empezando a llover con fuerza afuera.", context: "Acción en vivo" },
          { en: "I am reading an interesting psychology article this week.", es: "Estoy leyendo un artículo de psicología interesante esta semana.", context: "Situación temporal" },
          { en: "Why are you whispering in the corridor?", es: "¿Por qué estás susurrando en el pasillo?", context: "Pregunta en progreso" }
        ],
        vocabulary: [
          { word: "Currently", ipa: "/ˈkʌrəntli/", translation: "Actualmente", sample: "She is currently living in Boston." },
          { word: "Right now", ipa: "/raɪt naʊ/", translation: "En este preciso instante", sample: "We are taking an exam right now." },
          { word: "Whispering", ipa: "/ˈwɪspərɪŋ/", translation: "Susurrando", sample: "The students are whispering in the hall." },
          { word: "Developing", ipa: "/dɪˈveləpɪŋ/", translation: "Desarrollando", sample: "The team is developing a mobile app." },
          { word: "Improving", ipa: "/ɪmˈpruːvɪŋ/", translation: "Mejorando", sample: "Your pronunciation is improving rapidly." }
        ]
      },
      {
        id: "a2-comparatives-superlatives",
        title: "Comparative & Superlative",
        subtitle: "Comparing Qualities & Extremes",
        icon: "⚖️",
        level: "A2",
        summary: "Se emplean para contrastar dos elementos entre sí (comparativo) o destacar un elemento como el máximo de un grupo (superlativo).",
        theory: {
          structures: [
            { type: "Comparativo Corto (1 sílaba)", formula: "Adj + -er + THAN", example: "English is easier than German." },
            { type: "Comparativo Largo (2+ sílabas)", formula: "MORE + Adj + THAN", example: "Physics is more complex than Biology." },
            { type: "Superlativo Corto", formula: "THE + Adj + -est", example: "Mount Everest is the highest mountain." },
            { type: "Superlativo Largo", formula: "THE MOST + Adj", example: "This is the most fascinating book." }
          ],
          keyRules: [
            "Irregulares obligatorios: Good → Better → The Best; Bad → Worse → The Worst; Far → Further → The Furthest.",
            "Comparativo de igualdad: AS + adjetivo + AS (e.g., He is as tall as his father)."
          ],
          commonMistakes: [
            { incorrect: "He is more tall than me. / This is the most best day.", correct: "He is taller than me. / This is the best day.", explanation: "No se combina 'more' con sufijo -er, ni 'most' con 'best'." }
          ]
        },
        examples: [
          { en: "Tokyo is more populated than Madrid.", es: "Tokio está más poblada que Madrid.", context: "Comparación geográfica" },
          { en: "She is the fastest runner in our university club.", es: "Ella es la corredora más rápida de nuestro club universitario.", context: "Superlativo" },
          { en: "Today's exam was better than last week's.", es: "El examen de hoy estuvo mejor que el de la semana pasada.", context: "Comparativo irregular" }
        ],
        vocabulary: [
          { word: "Better", ipa: "/ˈbetər/", translation: "Mejor (que)", sample: "Electric vehicles are better for clean air." },
          { word: "Worse", ipa: "/wɜːrs/", translation: "Peor (que)", sample: "The weather today is worse than yesterday." },
          { word: "Cheaper", ipa: "/ˈtʃiːpər/", translation: "Más barato", sample: "Public transit is cheaper than driving." },
          { word: "Crowded", ipa: "/ˈkraʊdɪd/", translation: "Abarrotado / Concurrido", sample: "The subway was more crowded today." },
          { word: "Efficient", ipa: "/ɪˈfɪʃnt/", translation: "Eficiente", sample: "This code is the most efficient algorithm." }
        ]
      },
      {
        id: "a2-daily-routines",
        title: "Daily Routines & Frequency",
        subtitle: "Adverbs of Frequency & Time Sequencers",
        icon: "📅",
        level: "A2",
        summary: "Estructuras para narrar el orden cronológico del día a día con marcadores discursivos y adverbios de frecuencia.",
        theory: {
          structures: [
            { type: "Posición Adverbios de Frecuencia", formula: "Sujeto + Adverbio + Verbo Principal (salvo To Be)", example: "I usually drink green tea in the morning." },
            { type: "Con Verbo To Be", formula: "Sujeto + AM/IS/ARE + Adverbio", example: "He is always punctual to lecture." },
            { type: "Secuenciadores de Tiempo", formula: "First, Then, Next, After that, Finally", example: "First I wake up; after that, I jog in the park." }
          ],
          keyRules: [
            "Adverbios negativos como 'hardly ever' y 'never' no requieren otra negación (doble negación es incorrecta en inglés estándar).",
            "Las expresiones compuestas (once a week, every day) van normalmente al final de la oración."
          ],
          commonMistakes: [
            { incorrect: "I don't never eat fast food.", correct: "I never eat fast food. / I don't ever eat fast food.", explanation: "Evitar la doble negación con 'never'." }
          ]
        },
        examples: [
          { en: "First, we review grammar; next, we solve interactive quizzes.", es: "Primero repasamos gramática; luego resolvemos cuestionarios interactivos.", context: "Secuencia de clase" },
          { en: "She rarely goes to sleep before midnight during finals.", es: "Rara vez se acuesta antes de medianoche durante los exámenes finales.", context: "Frecuencia baja" }
        ],
        vocabulary: [
          { word: "Frequently", ipa: "/ˈfriːkwəntli/", translation: "Frecuentemente", sample: "He frequently visits the computer lab." },
          { word: "Hardly ever", ipa: "/ˈhɑːrdli ˈevər/", translation: "Casi nunca", sample: "I hardly ever skip my morning breakfast." },
          { word: "Afterwards", ipa: "/ˈɑːftəwədz/", translation: "Después / Más tarde", sample: "We will discuss the grades afterwards." },
          { word: "Punctual", ipa: "/ˈpʌŋktʃuəl/", translation: "Puntual", sample: "Our engineering tutor is extremely punctual." }
        ]
      }
    ]
  },
  B1: {
    levelName: "B1 - Intermediate / Intermedio",
    color: "#eab308", // Amber
    description: "Comprensión de los puntos principales en textos claros, manejo de situaciones de viaje y expresión de planes, deseos y opiniones justificadas.",
    topics: [
      {
        id: "b1-present-perfect",
        title: "Present Perfect",
        subtitle: "Experiences, Unfinished Time & Relevant Past",
        icon: "⏳",
        level: "B1",
        summary: "Conecta el pasado con el presente. Usado para experiencias de vida, acciones pasadas con efecto en el presente, o periodos que no han concluido.",
        theory: {
          structures: [
            { type: "Afirmativa (+)", formula: "Subject + HAVE / HAS + Past Participle (V3)", example: "I have traveled to five European countries." },
            { type: "Negativa (-)", formula: "Subject + HAVEN'T / HASN'T + Past Participle", example: "He hasn't finished writing the lab report yet." },
            { type: "Interrogativa (?)", formula: "HAVE / HAS + Subject + Past Participle?", example: "Have you ever delivered a public speech?" }
          ],
          keyRules: [
            "FOR vs SINCE: 'For' mide duración (for three years); 'Since' marca el punto de inicio específico (since 2021, since Monday).",
            "ALREADY, YET, JUST: 'Already' (ya, afirmativa), 'Yet' (aún/ya, final de negaciones y preguntas), 'Just' (acabar de, acción inmediata).",
            "Diferencia con Past Simple: Si mencionas CUÁNDO ocurrió exactamente (yesterday, in 2018), DEBES usar Past Simple, NO Present Perfect."
          ],
          commonMistakes: [
            { incorrect: "I have visited London last year.", correct: "I visited London last year.", explanation: "Al especificar la fecha exacta ('last year'), el marco temporal está cerrado; se debe usar Past Simple." }
          ]
        },
        examples: [
          { en: "Scientists have developed a sustainable battery prototype.", es: "Los científicos han desarrollado un prototipo de batería sostenible.", context: "Noticia / Impacto presente" },
          { en: "She has worked as an academic researcher since 2019.", es: "Ella ha trabajado como investigadora académica desde 2019.", context: "Acción continua que sigue viva" },
          { en: "I have just sent the revised document to your email.", es: "Acabo de enviar el documento corregido a tu correo electrónico.", context: "Acción recién terminada (just)" }
        ],
        vocabulary: [
          { word: "Achieved", ipa: "/əˈtʃiːvd/", translation: "Alcanzado / Logrado", sample: "They have achieved remarkable research results." },
          { word: "Already", ipa: "/ɔːlˈredi/", translation: "Ya (antes de lo previsto)", sample: "The train has already departed." },
          { word: "Since", ipa: "/sɪns/", translation: "Desde", sample: "I haven't seen Professor Miller since Friday." },
          { word: "Recently", ipa: "/ˈriːsntli/", translation: "Recientemente", sample: "Have you read any good articles recently?" },
          { word: "Discovered", ipa: "/dɪˈskʌvəd/", translation: "Descubierto", sample: "Astronomers have discovered a new exoplanet." }
        ]
      },
      {
        id: "b1-modal-verbs",
        title: "Modal Verbs",
        subtitle: "Obligation, Permission, Ability & Deduction",
        icon: "🛡️",
        level: "B1",
        summary: "Verbos auxiliares especiales que matizan el significado del verbo principal indicando posibilidad, capacidad, permiso o necesidad.",
        theory: {
          structures: [
            { type: "Habilidad / Permiso", formula: "CAN / COULD + Verb base", example: "She can speak four languages fluently." },
            { type: "Obligación Fuerte vs Personal", formula: "MUST (norma/convicción) vs HAVE TO (regla externa)", example: "You must wear safety goggles in the chemistry laboratory." },
            { type: "Prohibición", formula: "MUSTN'T (está prohibido)", example: "Students mustn't use cellphones during the midterm." },
            { type: "Consejo / Sugerencia", formula: "SHOULD / OUGHT TO + Verb base", example: "You should review your notes before the quiz." }
          ],
          keyRules: [
            "Los verbos modales NO llevan -s en la tercera persona (he cans ❌ -> he can ✔️).",
            "Van seguidos de verbo en infinitivo SIN 'to' (excepto ought to / have to).",
            "DON'T HAVE TO significa 'no es necesario' (opcional), mientras que MUSTN'T significa 'está terminantemente prohibido'."
          ],
          commonMistakes: [
            { incorrect: "You don't have to smoke here (when illegal).", correct: "You mustn't smoke here.", explanation: "'Don't have to' implica que no tienes obligación pero podrías si quieres; 'mustn't' prohíbe taxativamente." }
          ]
        },
        examples: [
          { en: "Undergraduate students must submit their theses by Friday.", es: "Los estudiantes de pregrado deben entregar sus tesis antes del viernes.", context: "Obligación institucional" },
          { en: "You don't have to attend the optional workshop, but it helps.", es: "No tienes que asistir al taller opcional, pero ayuda.", context: "Falta de obligación" },
          { en: "The simulation might take longer than expected.", es: "La simulación podría tomar más tiempo de lo esperado.", context: "Posibilidad / Deducción" }
        ],
        vocabulary: [
          { word: "Mandatory", ipa: "/ˈmændətəri/", translation: "Obligatorio", sample: "Attendance at the seminar is mandatory." },
          { word: "Permitted", ipa: "/pəˈmɪtɪd/", translation: "Permitido", sample: "Calculators are permitted in the exam." },
          { word: "Advisable", ipa: "/ədˈvaɪzəbl/", translation: "Aconsejable", sample: "It is advisable to back up your dissertation." },
          { word: "Prohibited", ipa: "/prəˈhɪbɪtɪd/", translation: "Prohibido", sample: "Plagiarism is strictly prohibited." }
        ]
      },
      {
        id: "b1-first-second-conditionals",
        title: "First & Second Conditionals",
        subtitle: "Real Possibilities vs Hypothetical Scenarios",
        icon: "🔀",
        level: "B1",
        summary: "Estructuras condicionales para proyectar consecuencias reales en el futuro (1st) o imaginar escenarios hipotéticos en el presente (2nd).",
        theory: {
          structures: [
            { type: "First Conditional (Real/Probable)", formula: "IF + Present Simple, ... WILL + Verb base", example: "If you practice every day, you will achieve fluency." },
            { type: "Second Conditional (Hipotético/Irreal)", formula: "IF + Past Simple, ... WOULD + Verb base", example: "If I won a research scholarship, I would study in Cambridge." },
            { type: "Consejo Formal (2nd Cond)", formula: "IF I WERE YOU, I WOULD...", example: "If I were you, I would consult the academic counselor." }
          ],
          keyRules: [
            "En el segundo condicional formal, se prefiere 'were' para todas las personas gramaticales: 'If he were here...', 'If I were you...'.",
            "Nunca uses 'will' o 'would' dentro de la cláusula de 'IF' (If I will win ❌ -> If I win ✔️)."
          ],
          commonMistakes: [
            { incorrect: "If I will have time, I will help you.", correct: "If I have time, I will help you.", explanation: "La cláusula del 'if' en primer condicional va en Present Simple." }
          ]
        },
        examples: [
          { en: "If the economy collapses, inflation will surge dramatically.", es: "Si la economía colapsa, la inflación aumentará drásticamente.", context: "1st Condicional (Causa-Efecto real)" },
          { en: "If I had more leisure time, I would learn Japanese.", es: "Si tuviera más tiempo libre, aprendería japonés.", context: "2nd Condicional (Sueño hipotético)" }
        ],
        vocabulary: [
          { word: "Unless", ipa: "/ənˈles/", translation: "A menos que / Si no", sample: "We will fail unless we prepare diligently." },
          { word: "Provided that", ipa: "/prəˈvaɪdɪd ðæt/", translation: "Siempre que / Con la condición de que", sample: "You can pass provided that you submit all tasks." },
          { word: "Hypothetical", ipa: "/ˌhaɪpəˈθetɪkl/", translation: "Hipotético", sample: "Let us examine a hypothetical case study." },
          { word: "Consequence", ipa: "/ˈkɒnsɪkwəns/", translation: "Consecuencia", sample: "Every ethical choice has a direct consequence." }
        ]
      },
      {
        id: "b1-passive-voice",
        title: "Passive Voice",
        subtitle: "Focus on the Action, Object & Academic Style",
        icon: "⚙️",
        level: "B1",
        summary: "Transfiere el protagonismo de quien realiza la acción al objeto que la recibe. Es el pilar de la redacción académica y científica.",
        theory: {
          structures: [
            { type: "Present Simple Passive", formula: "Subject + AM/IS/ARE + Past Participle (V3)", example: "English is spoken worldwide by millions of people." },
            { type: "Past Simple Passive", formula: "Subject + WAS/WERE + Past Participle (V3)", example: "The telescope was invented in the seventeenth century." },
            { type: "Agente Opcional (BY)", formula: "... by + Agent (solo si aporta valor)", example: "The novel was written by Virginia Woolf." }
          ],
          keyRules: [
            "Solo los verbos transitivos (que tienen objeto directo) pueden transformarse a voz pasiva.",
            "Si el agente es desconocido, obvio o irrelevante ('someone', 'people'), se omite la frase con 'by'."
          ],
          commonMistakes: [
            { incorrect: "The experiment was conduct last week.", correct: "The experiment was conducted last week.", explanation: "El verbo en voz pasiva siempre debe estar en Participio Pasado (V3: conducted)." }
          ]
        },
        examples: [
          { en: "Thousands of scientific papers are published each month.", es: "Miles de artículos científicos son publicados cada mes.", context: "Voz pasiva en presente" },
          { en: "The architectural blueprints were approved by the city council.", es: "Los planos arquitectónicos fueron aprobados por el concejo de la ciudad.", context: "Voz pasiva en pasado" }
        ],
        vocabulary: [
          { word: "Conducted", ipa: "/kənˈdʌktɪd/", translation: "Realizado / Conducido", sample: "The survey was conducted across three campuses." },
          { word: "Constructed", ipa: "/kənˈstrʌktɪd/", translation: "Construido", sample: "The bridge was constructed in 1932." },
          { word: "Disseminated", ipa: "/dɪˈsemɪneɪtɪd/", translation: "Difundido", sample: "Findings were disseminated to the international community." },
          { word: "Manufactured", ipa: "/ˌmænjuˈfæktʃəd/", translation: "Fabricado", sample: "Semiconductors are manufactured in Taiwan." }
        ]
      }
    ]
  },
  B2: {
    levelName: "B2 - Upper Intermediate / Avanzado",
    color: "#8b5cf6", // Purple
    description: "Comprensión de textos complejos técnicos, interacción fluida y espontánea con hablantes nativos, y producción de argumentos matizados.",
    topics: [
      {
        id: "b2-third-conditional",
        title: "Third Conditional",
        subtitle: "Past Regrets & Alternative Historical Outcomes",
        icon: "🔙",
        level: "B2",
        summary: "Especula sobre hechos ocurridos en el pasado que ya no pueden cambiarse. Expresa arrepentimiento o alivio retrospectivo.",
        theory: {
          structures: [
            { type: "Estructura Estándar", formula: "IF + Past Perfect (had + V3), ... WOULD HAVE + Past Participle (V3)", example: "If she had arrived five minutes earlier, she would have caught the flight." },
            { type: "Variantes con Modales", formula: "IF + had + V3, ... COULD / MIGHT HAVE + V3", example: "If we had secured funding, we could have purchased better equipment." },
            { type: "Inversión Formal (Sin IF)", formula: "HAD + Subject + V3, ... WOULD HAVE + V3", example: "Had the engineers inspected the turbine, the failure would have been averted." }
          ],
          keyRules: [
            "Ambas partes de la oración se refieren 100% al pasado irreal o no ocurrido.",
            "La inversión literaria formal 'Had I known...' eleva enormemente el registro académico en redacción B2/C1."
          ],
          commonMistakes: [
            { incorrect: "If I would have known, I would have warned you.", correct: "If I had known, I would have warned you.", explanation: "Nunca se coloca 'would have' dentro de la cláusula condicional de 'if'." }
          ]
        },
        examples: [
          { en: "If the algorithm had detected the anomaly sooner, the cyberattack would have been prevented.", es: "Si el algoritmo hubiera detectado la anomalía antes, el ciberataque se habría prevenido.", context: "Seguridad informática" },
          { en: "Had they consulted the climatologist, the expedition might have survived.", es: "De haber consultado al climatólogo, la expedición podría haber sobrevivido.", context: "Inversión formal B2" }
        ],
        vocabulary: [
          { word: "Averted", ipa: "/əˈvɜːtɪd/", translation: "Evitado / Eludido", sample: "A diplomatic crisis was averted at the last minute." },
          { word: "Unforeseen", ipa: "/ˌʌnfɔːˈsiːn/", translation: "Imprevisto", sample: "We encountered unforeseen financial setbacks." },
          { word: "Regret", ipa: "/rɪˈɡret/", translation: "Lamentar / Arrepentimiento", sample: "He expressed sincere regret for his rash decision." },
          { word: "Catastrophic", ipa: "/ˌkætəˈstrɒfɪk/", translation: "Catastrófico", sample: "The structural collapse had catastrophic effects." }
        ]
      },
      {
        id: "b2-reported-speech",
        title: "Reported Speech",
        subtitle: "Indirect Discourse, Backshift & Reporting Verbs",
        icon: "🗣️",
        level: "B2",
        summary: "Permite relatar lo dicho por otra persona adaptando tiempos verbales (Backshifting), pronombres y referencias espaciotemporales.",
        theory: {
          structures: [
            { type: "Backshifting (Cambio de Tiempos)", formula: "Present Simple → Past Simple | Present Continuous → Past Continuous | Will → Would", example: "'I am writing my thesis' → She said she was writing her thesis." },
            { type: "Present Perfect → Past Perfect", formula: "'I have solved the glitch' → He announced that he had solved the glitch.", example: "Notice the shift from have solved to had solved." },
            { type: "Verbos Discursivos Avanzados", formula: "Subject + verb (admitted / insisted / warned / claimed) + clause", example: "The Dean urged students to remain calm." }
          ],
          keyRules: [
            "Cambios temporales: today → that day, tomorrow → the next day, yesterday → the day before, now → then, here → there.",
            "Say vs Tell: 'Tell' requiere un objeto personal (tell ME, tell HIM), mientras que 'say' va directamente a la cláusula o con 'to' (say to me)."
          ],
          commonMistakes: [
            { incorrect: "She said me that the deadline had changed.", correct: "She told me that the deadline had changed. / She said that the deadline had changed.", explanation: "'Say' no puede llevar objeto directo de persona sin la preposición 'to'." }
          ]
        },
        examples: [
          { en: "'We cannot compromise on safety standards,' the CEO stated.", es: "El director ejecutivo declaró que no podían comprometer los estándares de seguridad.", context: "Cita directa a indirecta" },
          { en: "The investigator concluded that the fire had been caused by an electrical failure.", es: "El investigador concluyó que el incendio había sido causado por una falla eléctrica.", context: "Reporte analítico" }
        ],
        vocabulary: [
          { word: "Claimed", ipa: "/kleɪmd/", translation: "Afirmó / Aseguró", sample: "The witness claimed that he recognized the driver." },
          { word: "Emphasized", ipa: "/ˈemfəsaɪzd/", translation: "Enfatizó / Recalcó", sample: "The lecturer emphasized the importance of peer reviews." },
          { word: "Denounced", ipa: "/dɪˈnaʊnst/", translation: "Denunció", sample: "The committee denounced the irregular procurement process." },
          { word: "Acknowledged", ipa: "/əkˈnɒlɪdʒd/", translation: "Reconoció / Admitió", sample: "The author acknowledged assistance from fellow scholars." }
        ]
      },
      {
        id: "b2-mixed-conditionals",
        title: "Mixed Conditionals",
        subtitle: "Bridging Past Conditions with Present Realities",
        icon: "🧬",
        level: "B2",
        summary: "Combina elementos del 2º y 3º condicional para vincular una condición del pasado con una repercusión en el presente (o viceversa).",
        theory: {
          structures: [
            { type: "Tipo 1: Condición Pasada → Consecuencia Presente", formula: "IF + Past Perfect (had + V3), ... WOULD + Verb base (now)", example: "If I had accepted the scholarship in 2020, I would live in London today." },
            { type: "Tipo 2: Condición Permanente → Consecuencia Pasada", formula: "IF + Past Simple (were/had), ... WOULD HAVE + V3 (past)", example: "If she were more organized, she wouldn't have missed yesterday's deadline." }
          ],
          keyRules: [
            "Tipo 1 explica por qué mi situación actual es diferente gracias o debido a un evento del pasado.",
            "Tipo 2 utiliza una característica intrínseca o de personalidad para justificar un evento pasado puntual."
          ],
          commonMistakes: [
            { incorrect: "If I would have studied medicine, I am a doctor today.", correct: "If I had studied medicine, I would be a doctor today.", explanation: "En la prótasis se usa 'had + participio' y en la apódosis 'would + infinitivo'." }
          ]
        },
        examples: [
          { en: "If we had invested in renewable energy a decade ago, our electric grid would be self-sufficient now.", es: "Si hubiésemos invertido en energía renovable hace una década, nuestra red eléctrica sería autosuficiente ahora.", context: "Política ambiental y presente" },
          { en: "If he spoke German fluently, he would have translated the document yesterday.", es: "Si él hablara alemán con fluidez, habría traducido el documento ayer.", context: "Habilidad constante afectando evento pasado" }
        ],
        vocabulary: [
          { word: "Self-sufficient", ipa: "/ˌself səˈfɪʃnt/", translation: "Autosuficiente", sample: "The campus aims to be fully self-sufficient by 2030." },
          { word: "Perseverance", ipa: "/ˌpɜːsəˈvɪərəns/", translation: "Perseverancia", sample: "Success in scientific trials requires sheer perseverance." },
          { word: "Incurred", ipa: "/ɪnˈkɜːd/", translation: "Incurrido", sample: "Heavy losses were incurred during the restructuring." },
          { word: "Repercussion", ipa: "/ˌriːpəˈkʌʃn/", translation: "Repercusión", sample: "The economic reform had an immediate repercussion on employment." }
        ]
      },
      {
        id: "b2-phrasal-verbs-advanced",
        title: "Advanced Phrasal Verbs & Vocabulary",
        subtitle: "Idiomatic Expressions, Academic Collocations & Nuance",
        icon: "💎",
        level: "B2",
        summary: "Domina verbos compuestos de 2 y 3 partículas, expresiones idiomáticas y colocaciones léxicas indispensables para una competencia profesional.",
        theory: {
          structures: [
            { type: "Phrasal Verbs Inseparables", formula: "Verb + Preposition + Object", example: "I came across an intriguing hypothesis in the journal." },
            { type: "Phrasal Verbs Separables", formula: "Verb + Object + Particle", example: "They called the symposium off due to the blizzard." },
            { type: "Phrasal Verbs de 3 Partículas", formula: "Verb + Particle + Preposition", example: "We look forward to collaborating with your research institute." }
          ],
          keyRules: [
            "Con verbos separables, si el objeto es un pronombre (it, them), DEBE ir en medio: 'turn it down' (nunca 'turn down it').",
            "Cuidado con la preposición 'to' en 'look forward to': exige verbo en -ing: 'look forward to hearing from you'."
          ],
          commonMistakes: [
            { incorrect: "I look forward to meet you.", correct: "I look forward to meeting you.", explanation: "'To' en esta frase actúa como preposición, exigiendo gerundio (-ing)." }
          ]
        },
        examples: [
          { en: "The research committee decided to put off the launch until next semester.", es: "El comité de investigación decidió posponer el lanzamiento hasta el próximo semestre.", context: "Put off = posponer" },
          { en: "She ran into her former supervisor at the international conference.", es: "Ella se tropezó con su antiguo supervisor en la conferencia internacional.", context: "Run into = toparse por casualidad" },
          { en: "We need to come up with a viable solution before the audit.", es: "Necesitamos idear una solución viable antes de la auditoría.", context: "Come up with = idear / proponer" }
        ],
        vocabulary: [
          { word: "Look forward to", ipa: "/lʊk ˈfɔːwəd tuː/", translation: "Esperar con ilusión / Quedar a la espera", sample: "We look forward to receiving your constructive feedback." },
          { word: "Put off", ipa: "/pʊt ɒf/", translation: "Posponer / Postergar", sample: "Never put off until tomorrow what you can achieve today." },
          { word: "Call off", ipa: "/kɔːl ɒf/", translation: "Cancelar", sample: "The administration decided to call off the outdoor festival." },
          { word: "Come across", ipa: "/kʌm əˈkrɒs/", translation: "Toparse / Encontrar por azar", sample: "Did you come across any typographical errors in the draft?" },
          { word: "Carry out", ipa: "/ˈkæri aʊt/", translation: "Llevar a cabo / Ejecutar", sample: "Biologists will carry out fieldwork next month." },
          { word: "Turn down", ipa: "/tɜːn daʊn/", translation: "Rechazar (oferta)", sample: "He turned down the job offer in Zurich." }
        ]
      }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CEFR_CONTENT;
}
