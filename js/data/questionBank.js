/**
 * Comprehensive Question Bank for CEFR Levels A1 - B2
 * Includes Multiple Choice (4 colored options) and Fill in the Blanks.
 */

const QUESTION_BANK = [
  // ==========================================
  // LEVEL A1 - Present Simple
  // ==========================================
  {
    id: "q-a1-ps-1",
    level: "A1",
    topicId: "a1-present-simple",
    topicName: "Present Simple",
    type: "multiple_choice",
    question: "She _____ to the university library every Tuesday afternoon.",
    options: ["go", "goes", "is going", "went"],
    correctIndex: 1,
    correctAnswer: "goes",
    explanation: "Con tercera persona singular (he, she, it) en Present Simple se agrega -es al verbo 'go' → 'goes'.",
    points: 1000
  },
  {
    id: "q-a1-ps-2",
    level: "A1",
    topicId: "a1-present-simple",
    topicName: "Present Simple",
    type: "multiple_choice",
    question: "_____ your sister speak German or French?",
    options: ["Do", "Does", "Is", "Are"],
    correctIndex: 1,
    correctAnswer: "Does",
    explanation: "'Your sister' es tercera persona singular (she), por lo tanto el auxiliar correcto en Present Simple es 'Does'.",
    points: 1000
  },
  {
    id: "q-a1-ps-3",
    level: "A1",
    topicId: "a1-present-simple",
    topicName: "Present Simple",
    type: "fill_blank",
    question: "They _____ (not eat) fast food on weekdays because they prefer healthy cooking.",
    options: ["don't eat", "doesn't eat", "not eat", "aren't eat"],
    correctAnswer: "don't eat",
    alternatives: ["do not eat", "dont eat"],
    correctIndex: 0,
    explanation: "El sujeto 'They' utiliza el auxiliar negativo 'do not' (don't) seguido del verbo en forma base.",
    points: 1000
  },
  {
    id: "q-a1-ps-4",
    level: "A1",
    topicId: "a1-present-simple",
    topicName: "Present Simple",
    type: "multiple_choice",
    question: "My brother _____ hard before any important math exam.",
    options: ["study", "studies", "studys", "is studying"],
    correctIndex: 1,
    correctAnswer: "studies",
    explanation: "Los verbos que terminan en consonante + 'y' cambian a '-ies' en tercera persona singular: study → studies.",
    points: 1000
  },

  // ==========================================
  // LEVEL A1 - Verb To Be
  // ==========================================
  {
    id: "q-a1-tb-1",
    level: "A1",
    topicId: "a1-to-be",
    topicName: "Verb To Be",
    type: "multiple_choice",
    question: "My classmates and I _____ extremely excited about the new science laboratory.",
    options: ["is", "am", "are", "be"],
    correctIndex: 2,
    correctAnswer: "are",
    explanation: "'My classmates and I' equivale al pronombre 'We' (primera persona plural), que conjuga con 'are'.",
    points: 1000
  },
  {
    id: "q-a1-tb-2",
    level: "A1",
    topicId: "a1-to-be",
    topicName: "Verb To Be",
    type: "multiple_choice",
    question: "How old are you? — I _____ twenty-one years old.",
    options: ["have", "am", "has", "am having"],
    correctIndex: 1,
    correctAnswer: "am",
    explanation: "En inglés, la edad siempre se expresa con el verbo 'TO BE' (I am), nunca con 'have'.",
    points: 1000
  },
  {
    id: "q-a1-tb-3",
    level: "A1",
    topicId: "a1-to-be",
    topicName: "Verb To Be",
    type: "fill_blank",
    question: "Professor Wilson _____ (not be) in his office today; he is giving a conference.",
    options: ["isn't", "aren't", "am not", "not is"],
    correctAnswer: "isn't",
    alternatives: ["is not", "isnt"],
    correctIndex: 0,
    explanation: "Para tercera persona singular (Professor Wilson = he), la negación de To Be es 'is not' o 'isn't'.",
    points: 1000
  },
  {
    id: "q-a1-tb-4",
    level: "A1",
    topicId: "a1-to-be",
    topicName: "Verb To Be",
    type: "multiple_choice",
    question: "_____ they ready for the final semester presentations?",
    options: ["Are", "Is", "Do", "Have"],
    correctIndex: 0,
    correctAnswer: "Are",
    explanation: "Para formular preguntas con adjetivos ('ready') y el sujeto 'they', invertimos el verbo To Be: 'Are they...?'.",
    points: 1000
  },

  // ==========================================
  // LEVEL A1 - Basic Vocabulary
  // ==========================================
  {
    id: "q-a1-bv-1",
    level: "A1",
    topicId: "a1-basic-vocab",
    topicName: "Basic Vocabulary",
    type: "multiple_choice",
    question: "When you arrive at an academic dinner at 7:30 PM, what is the correct greeting?",
    options: ["Good night", "Good evening", "Sweet dreams", "Goodbye"],
    correctIndex: 1,
    correctAnswer: "Good evening",
    explanation: "'Good evening' es el saludo formal de bienvenida en la noche; 'Good night' se usa exclusivamente para despedirse.",
    points: 1000
  },
  {
    id: "q-a1-bv-2",
    level: "A1",
    topicId: "a1-basic-vocab",
    topicName: "Basic Vocabulary",
    type: "fill_blank",
    question: "Please take your _____ and write down today's homework instructions.",
    options: ["notebook", "microwave", "refrigerator", "pillow"],
    correctAnswer: "notebook",
    alternatives: ["notebook", "pen", "pencil"],
    correctIndex: 0,
    explanation: "'Notebook' (cuaderno/libreta) es el objeto escolar básico donde los alumnos escriben sus notas.",
    points: 1000
  },
  {
    id: "q-a1-bv-3",
    level: "A1",
    topicId: "a1-basic-vocab",
    topicName: "Basic Vocabulary",
    type: "multiple_choice",
    question: "Which of the following describes the daughter of your mother and father?",
    options: ["Cousin", "Aunt", "Sister", "Niece"],
    correctIndex: 2,
    correctAnswer: "Sister",
    explanation: "'Sister' es la hermana, es decir, la hija de tus padres.",
    points: 1000
  },

  // ==========================================
  // LEVEL A1 - Articles & Pronouns
  // ==========================================
  {
    id: "q-a1-ap-1",
    level: "A1",
    topicId: "a1-articles-pronouns",
    topicName: "Articles & Pronouns",
    type: "multiple_choice",
    question: "It takes almost _____ hour by train to arrive at the central campus.",
    options: ["a", "an", "the", "no article"],
    correctIndex: 1,
    correctAnswer: "an",
    explanation: "La palabra 'hour' comienza con 'h' muda, emitiendo un sonido vocal /aʊər/. Por regla fonética se usa 'an'.",
    points: 1000
  },
  {
    id: "q-a1-ap-2",
    level: "A1",
    topicId: "a1-articles-pronouns",
    topicName: "Articles & Pronouns",
    type: "fill_blank",
    question: "This backpack belongs to me. It is _____.",
    options: ["mine", "my", "me", "myself"],
    correctAnswer: "mine",
    alternatives: ["mine"],
    correctIndex: 0,
    explanation: "'Mine' es el pronombre posesivo que sustituye al sustantivo ('It is mine' = es mío).",
    points: 1000
  },
  {
    id: "q-a1-ap-3",
    level: "A1",
    topicId: "a1-articles-pronouns",
    topicName: "Articles & Pronouns",
    type: "multiple_choice",
    question: "Emma called Daniel yesterday and invited _____ to study together.",
    options: ["he", "him", "his", "himself"],
    correctIndex: 1,
    correctAnswer: "him",
    explanation: "Al actuar como objeto directo del verbo 'invited', el pronombre correspondiente para masculino singular es 'him'.",
    points: 1000
  },

  // ==========================================
  // LEVEL A2 - Past Simple
  // ==========================================
  {
    id: "q-a2-ps-1",
    level: "A2",
    topicId: "a2-past-simple",
    topicName: "Past Simple",
    type: "multiple_choice",
    question: "Where _____ you go during the summer holidays last year?",
    options: ["did", "do", "were", "have"],
    correctIndex: 0,
    correctAnswer: "did",
    explanation: "En preguntas de Past Simple con verbos de acción ('go'), el auxiliar pasado es 'did'.",
    points: 1000
  },
  {
    id: "q-a2-ps-2",
    level: "A2",
    topicId: "a2-past-simple",
    topicName: "Past Simple",
    type: "multiple_choice",
    question: "Albert Einstein _____ the Nobel Prize in Physics in 1921.",
    options: ["win", "winned", "won", "has won"],
    correctIndex: 2,
    correctAnswer: "won",
    explanation: "El verbo 'win' es irregular y su forma pasada simple es 'won'.",
    points: 1000
  },
  {
    id: "q-a2-ps-3",
    level: "A2",
    topicId: "a2-past-simple",
    topicName: "Past Simple",
    type: "fill_blank",
    question: "We _____ (not understand) the math demonstration yesterday until the professor showed a diagram.",
    options: ["didn't understand", "didn't understood", "not understood", "weren't understand"],
    correctAnswer: "didn't understand",
    alternatives: ["did not understand", "didnt understand"],
    correctIndex: 0,
    explanation: "La negación en pasado es 'didn't' + verbo en forma base (understand).",
    points: 1000
  },
  {
    id: "q-a2-ps-4",
    level: "A2",
    topicId: "a2-past-simple",
    topicName: "Past Simple",
    type: "multiple_choice",
    question: "Which of these regular past verbs has the '-ed' pronounced as /ɪd/?",
    options: ["Played", "Watched", "Decided", "Cleaned"],
    correctIndex: 2,
    correctAnswer: "Decided",
    explanation: "La terminación -ed solo se pronuncia como /ɪd/ cuando la raíz del verbo termina en sonido /t/ o /d/ (decide → decided).",
    points: 1000
  },

  // ==========================================
  // LEVEL A2 - Present Continuous
  // ==========================================
  {
    id: "q-a2-pc-1",
    level: "A2",
    topicId: "a2-present-continuous",
    topicName: "Present Continuous",
    type: "multiple_choice",
    question: "Please be quiet in the auditorium! The dean _____ a commencement speech.",
    options: ["gives", "is giving", "gave", "has given"],
    correctIndex: 1,
    correctAnswer: "is giving",
    explanation: "La acción está ocurriendo en tiempo real en este momento ('Please be quiet'), requiriendo Present Continuous: 'is giving'.",
    points: 1000
  },
  {
    id: "q-a2-pc-2",
    level: "A2",
    topicId: "a2-present-continuous",
    topicName: "Present Continuous",
    type: "fill_blank",
    question: "The software developers are _____ (run) stress tests on the campus server right now.",
    options: ["running", "runing", "ran", "runs"],
    correctAnswer: "running",
    alternatives: ["running"],
    correctIndex: 0,
    explanation: "Por la regla de consonante-vocal-consonante (C-V-C) acentuada, 'run' duplica la 'n' al añadir -ing: 'running'.",
    points: 1000
  },
  {
    id: "q-a2-pc-3",
    level: "A2",
    topicId: "a2-present-continuous",
    topicName: "Present Continuous",
    type: "multiple_choice",
    question: "Which sentence is grammatically INCORRECT because of a stative verb?",
    options: [
      "I am studying for my biology quiz.",
      "She is knowing all the historical dates.",
      "They are writing their research paper.",
      "We are testing the new lab equipment."
    ],
    correctIndex: 1,
    correctAnswer: "She is knowing all the historical dates.",
    explanation: "'Know' es un verbo de estado mental; no se utiliza en tiempos continuos. Lo correcto es 'She knows...'.",
    points: 1000
  },

  // ==========================================
  // LEVEL A2 - Comparative & Superlative
  // ==========================================
  {
    id: "q-a2-cs-1",
    level: "A2",
    topicId: "a2-comparatives-superlatives",
    topicName: "Comparative & Superlative",
    type: "multiple_choice",
    question: "Taking the high-speed bullet train is much _____ than driving in rush hour.",
    options: ["faster", "more fast", "fastest", "most fast"],
    correctIndex: 0,
    correctAnswer: "faster",
    explanation: "Los adjetivos de una sílaba como 'fast' forman el comparativo añadiendo el sufijo '-er' ('faster than').",
    points: 1000
  },
  {
    id: "q-a2-cs-2",
    level: "A2",
    topicId: "a2-comparatives-superlatives",
    topicName: "Comparative & Superlative",
    type: "fill_blank",
    question: "This is the _____ (bad) score I have ever received in history class.",
    options: ["worst", "baddest", "worse", "most bad"],
    correctAnswer: "worst",
    alternatives: ["worst"],
    correctIndex: 0,
    explanation: "El superlativo irregular de 'bad' es 'the worst'.",
    points: 1000
  },
  {
    id: "q-a2-cs-3",
    level: "A2",
    topicId: "a2-comparatives-superlatives",
    topicName: "Comparative & Superlative",
    type: "multiple_choice",
    question: "Artificial intelligence is considered one of the _____ fields of modern research.",
    options: ["more exciting", "most exciting", "excitingest", "much exciting"],
    correctIndex: 1,
    correctAnswer: "most exciting",
    explanation: "Para adjetivos largos de tres o más sílabas ('exciting'), el superlativo se forma con 'the most'.",
    points: 1000
  },

  // ==========================================
  // LEVEL A2 - Daily Routines & Frequency
  // ==========================================
  {
    id: "q-a2-dr-1",
    level: "A2",
    topicId: "a2-daily-routines",
    topicName: "Daily Routines",
    type: "multiple_choice",
    question: "Where should the adverb 'always' go in this sentence: 'Sarah is _____ punctual for meetings'?",
    options: ["before 'is'", "after 'is'", "at the end of the sentence", "at the very beginning"],
    correctIndex: 1,
    correctAnswer: "after 'is'",
    explanation: "Con el verbo 'To Be', los adverbios de frecuencia siempre se colocan DESPUÉS del verbo (Sarah is always...).",
    points: 1000
  },
  {
    id: "q-a2-dr-2",
    level: "A2",
    topicId: "a2-daily-routines",
    topicName: "Daily Routines",
    type: "fill_blank",
    question: "He _____ (hardly ever) drinks sugary soda because he is an athlete.",
    options: ["hardly ever", "never hardly", "almost never ever", "hard ever"],
    correctAnswer: "hardly ever",
    alternatives: ["hardly ever", "rarely"],
    correctIndex: 0,
    explanation: "'Hardly ever' significa casi nunca y se ubica antes del verbo principal ('drinks').",
    points: 1000
  },

  // ==========================================
  // LEVEL B1 - Present Perfect
  // ==========================================
  {
    id: "q-b1-pp-1",
    level: "B1",
    topicId: "b1-present-perfect",
    topicName: "Present Perfect",
    type: "multiple_choice",
    question: "Dr. Ramirez _____ at this academic institution for more than fifteen years.",
    options: ["worked", "has worked", "is working", "works"],
    correctIndex: 1,
    correctAnswer: "has worked",
    explanation: "Al usar 'for + periodo de tiempo' para una acción que inició en el pasado y continúa en el presente, se utiliza Present Perfect: 'has worked'.",
    points: 1000
  },
  {
    id: "q-b1-pp-2",
    level: "B1",
    topicId: "b1-present-perfect",
    topicName: "Present Perfect",
    type: "multiple_choice",
    question: "Have you submitted your scholarship application _____?",
    options: ["already", "just", "yet", "since"],
    correctIndex: 2,
    correctAnswer: "yet",
    explanation: "'Yet' se utiliza al final de preguntas y negaciones para indicar si una acción esperada ya se realizó.",
    points: 1000
  },
  {
    id: "q-b1-pp-3",
    level: "B1",
    topicId: "b1-present-perfect",
    topicName: "Present Perfect",
    type: "fill_blank",
    question: "We have lived in this metropolitan city _____ 2018.",
    options: ["since", "for", "during", "from"],
    correctAnswer: "since",
    alternatives: ["since"],
    correctIndex: 0,
    explanation: "'Since' se utiliza para señalar el punto exacto de inicio en el tiempo (año 2018).",
    points: 1000
  },
  {
    id: "q-b1-pp-4",
    level: "B1",
    topicId: "b1-present-perfect",
    topicName: "Present Perfect",
    type: "multiple_choice",
    question: "Why is 'I have seen that movie yesterday' grammatically incorrect?",
    options: [
      "Because 'yesterday' requires Past Simple ('I saw').",
      "Because 'seen' is an incorrect participle.",
      "Because 'have' cannot be followed by past verbs.",
      "Because 'yesterday' can only be used with future."
    ],
    correctIndex: 0,
    correctAnswer: "Because 'yesterday' requires Past Simple ('I saw').",
    explanation: "Cuando se especifica un tiempo terminado en el pasado (yesterday, in 2020), no se puede usar Present Perfect.",
    points: 1000
  },

  // ==========================================
  // LEVEL B1 - Modal Verbs
  // ==========================================
  {
    id: "q-b1-mv-1",
    level: "B1",
    topicId: "b1-modal-verbs",
    topicName: "Modal Verbs",
    type: "multiple_choice",
    question: "Students _____ talk or look at each other's papers during the national examination. It is strictly forbidden.",
    options: ["don't have to", "mustn't", "shouldn't", "might not"],
    correctIndex: 1,
    correctAnswer: "mustn't",
    explanation: "'Mustn't' expresa una prohibición estricta o ilegalidad, a diferencia de 'don't have to' que indica mera falta de necesidad.",
    points: 1000
  },
  {
    id: "q-b1-mv-2",
    level: "B1",
    topicId: "b1-modal-verbs",
    topicName: "Modal Verbs",
    type: "fill_blank",
    question: "You look exhausted from all this studying; you _____ take a 20-minute break.",
    options: ["should", "must to", "have", "ought"],
    correctAnswer: "should",
    alternatives: ["should", "ought to"],
    correctIndex: 0,
    explanation: "'Should' se utiliza para dar un consejo amistoso o recomendación saludable.",
    points: 1000
  },
  {
    id: "q-b1-mv-3",
    level: "B1",
    topicId: "b1-modal-verbs",
    topicName: "Modal Verbs",
    type: "multiple_choice",
    question: "The campus gates are open; you _____ show your digital ID today, though it is recommended.",
    options: ["mustn't", "don't have to", "can't", "should not"],
    correctIndex: 1,
    correctAnswer: "don't have to",
    explanation: "'Don't have to' indica ausencia de obligación: no es obligatorio hacerlo.",
    points: 1000
  },

  // ==========================================
  // LEVEL B1 - First & Second Conditionals
  // ==========================================
  {
    id: "q-b1-fc-1",
    level: "B1",
    topicId: "b1-first-second-conditionals",
    topicName: "Conditionals",
    type: "multiple_choice",
    question: "If the university _____ more solar panels, it will reduce its electricity costs drastically.",
    options: ["installs", "will install", "installed", "would install"],
    correctIndex: 0,
    correctAnswer: "installs",
    explanation: "En el First Conditional, la cláusula de 'if' siempre se conjuga en Present Simple ('installs').",
    points: 1000
  },
  {
    id: "q-b1-fc-2",
    level: "B1",
    topicId: "b1-first-second-conditionals",
    topicName: "Conditionals",
    type: "multiple_choice",
    question: "If I _____ in your position, I would discuss the thesis topic with the supervisor.",
    options: ["am", "was", "were", "would be"],
    correctIndex: 2,
    correctAnswer: "were",
    explanation: "En el Second Conditional formal y académico, se utiliza 'were' para todas las personas gramaticales ('If I were you').",
    points: 1000
  },
  {
    id: "q-b1-fc-3",
    level: "B1",
    topicId: "b1-first-second-conditionals",
    topicName: "Conditionals",
    type: "fill_blank",
    question: "Unless you _____ (study) the irregular verb charts, you will struggle with past participles.",
    options: ["study", "will study", "don't study", "studied"],
    correctAnswer: "study",
    alternatives: ["study"],
    correctIndex: 0,
    explanation: "'Unless' significa 'if not' (a menos que); lleva el verbo en forma afirmativa y en Present Simple.",
    points: 1000
  },

  // ==========================================
  // LEVEL B1 - Passive Voice
  // ==========================================
  {
    id: "q-b1-pv-1",
    level: "B1",
    topicId: "b1-passive-voice",
    topicName: "Passive Voice",
    type: "multiple_choice",
    question: "Penicillin _____ by Alexander Fleming in 1928.",
    options: ["was discovered", "is discovered", "discovered", "has been discovered"],
    correctIndex: 0,
    correctAnswer: "was discovered",
    explanation: "Voz pasiva en pasado simple con sujeto singular: 'was' + participio pasado ('discovered').",
    points: 1000
  },
  {
    id: "q-b1-pv-2",
    level: "B1",
    topicId: "b1-passive-voice",
    topicName: "Passive Voice",
    type: "fill_blank",
    question: "Official grades _____ (post) on the student portal every semester after committee evaluation.",
    options: ["are posted", "is posted", "posted", "were posting"],
    correctAnswer: "are posted",
    alternatives: ["are posted"],
    correctIndex: 0,
    explanation: "'Official grades' es plural y la acción es habitual en presente: 'are' + 'posted'.",
    points: 1000
  },
  {
    id: "q-b1-pv-3",
    level: "B1",
    topicId: "b1-passive-voice",
    topicName: "Passive Voice",
    type: "multiple_choice",
    question: "Change this active sentence to passive: 'The lab technician calibrates the microscopes every morning.'",
    options: [
      "The microscopes are calibrated by the lab technician every morning.",
      "The microscopes were calibrated by the lab technician every morning.",
      "The microscopes calibrated the technician every morning.",
      "The microscopes have been calibrated every morning."
    ],
    correctIndex: 0,
    correctAnswer: "The microscopes are calibrated by the lab technician every morning.",
    explanation: "'Calibrates' está en Present Simple, por ende en pasiva plural usamos 'are calibrated'.",
    points: 1000
  },

  // ==========================================
  // LEVEL B2 - Third Conditional
  // ==========================================
  {
    id: "q-b2-tc-1",
    level: "B2",
    topicId: "b2-third-conditional",
    topicName: "Third Conditional",
    type: "multiple_choice",
    question: "If the flight control tower _____ the warning signal earlier, the collision would have been avoided.",
    options: ["relayed", "had relayed", "would relay", "would have relayed"],
    correctIndex: 1,
    correctAnswer: "had relayed",
    explanation: "En el Third Conditional, la cláusula condicional (con 'if') se construye con Past Perfect: had + participio pasado.",
    points: 1000
  },
  {
    id: "q-b2-tc-2",
    level: "B2",
    topicId: "b2-third-conditional",
    topicName: "Third Conditional",
    type: "multiple_choice",
    question: "_____ I known about the changes in the syllabus, I would have prepared differently.",
    options: ["Had", "If had", "Were", "Should"],
    correctIndex: 0,
    correctAnswer: "Had",
    explanation: "Inversión formal de Third Conditional sin 'if': 'Had + Sujeto + Participio' equivale a 'If I had known'.",
    points: 1000
  },
  {
    id: "q-b2-tc-3",
    level: "B2",
    topicId: "b2-third-conditional",
    topicName: "Third Conditional",
    type: "fill_blank",
    question: "If we had secured the institutional grant, we _____ (could / purchase) state-of-the-art spectrometers.",
    options: ["could have purchased", "could purchase", "had purchased", "would purchase"],
    correctAnswer: "could have purchased",
    alternatives: ["could have purchased", "would have purchased"],
    correctIndex: 0,
    explanation: "Tercer condicional con modal de posibilidad: could + have + participio pasado (purchased).",
    points: 1000
  },

  // ==========================================
  // LEVEL B2 - Reported Speech
  // ==========================================
  {
    id: "q-b2-rs-1",
    level: "B2",
    topicId: "b2-reported-speech",
    topicName: "Reported Speech",
    type: "multiple_choice",
    question: "'I am conducting an empirical survey today,' said Dr. Watson. → Dr. Watson said he _____ an empirical survey _____.",
    options: [
      "is conducting / today",
      "was conducting / that day",
      "had conducted / the previous day",
      "would conduct / tomorrow"
    ],
    correctIndex: 1,
    correctAnswer: "was conducting / that day",
    explanation: "Por regla de backshift: Present Continuous ('am conducting') pasa a Past Continuous ('was conducting'), y 'today' cambia a 'that day'.",
    points: 1000
  },
  {
    id: "q-b2-rs-2",
    level: "B2",
    topicId: "b2-reported-speech",
    topicName: "Reported Speech",
    type: "multiple_choice",
    question: "The director _____ us that the budget had been approved by the board.",
    options: ["said", "told", "explained", "admitted"],
    correctIndex: 1,
    correctAnswer: "told",
    explanation: "El verbo 'tell' (pasado 'told') se usa obligatoriamente cuando se incluye el objeto indirecto de persona sin preposición ('told US').",
    points: 1000
  },
  {
    id: "q-b2-rs-3",
    level: "B2",
    topicId: "b2-reported-speech",
    topicName: "Reported Speech",
    type: "fill_blank",
    question: "'We will publish the findings next week,' the team announced. → The team announced that they _____ publish the findings the following week.",
    options: ["would", "will", "can", "had"],
    correctAnswer: "would",
    alternatives: ["would"],
    correctIndex: 0,
    explanation: "En estilo indirecto, el futuro con 'will' retrocede a su equivalente condicional 'would'.",
    points: 1000
  },

  // ==========================================
  // LEVEL B2 - Mixed Conditionals
  // ==========================================
  {
    id: "q-b2-mc-1",
    level: "B2",
    topicId: "b2-mixed-conditionals",
    topicName: "Mixed Conditionals",
    type: "multiple_choice",
    question: "If I _____ the scholarship offer in 2021, I _____ living in Cambridge today.",
    options: [
      "had accepted / would be",
      "accepted / would have been",
      "would accept / was",
      "had accepted / had been"
    ],
    correctIndex: 0,
    correctAnswer: "had accepted / would be",
    explanation: "Mixed Conditional (Condición pasada → Consecuencia presente): Past Perfect ('had accepted') + would + verbo base ('would be').",
    points: 1000
  },
  {
    id: "q-b2-mc-2",
    level: "B2",
    topicId: "b2-mixed-conditionals",
    topicName: "Mixed Conditionals",
    type: "fill_blank",
    question: "If she were more detail-oriented, she _____ (not make) that grave calculation error on yesterday's balance sheet.",
    options: ["wouldn't have made", "wouldn't make", "didn't make", "hadn't made"],
    correctAnswer: "wouldn't have made",
    alternatives: ["would not have made", "wouldnt have made"],
    correctIndex: 0,
    explanation: "Mixed Conditional (Condición permanente presente → Resultado en el pasado puntual): Past Simple ('were') + would have + participio.",
    points: 1000
  },

  // ==========================================
  // LEVEL B2 - Advanced Phrasal Verbs & Vocab
  // ==========================================
  {
    id: "q-b2-pv-1",
    level: "B2",
    topicId: "b2-phrasal-verbs-advanced",
    topicName: "Advanced Phrasal Verbs",
    type: "multiple_choice",
    question: "The academic conference had to be _____ due to an unforeseen international travel strike.",
    options: ["put off", "called off", "turned down", "carried out"],
    correctIndex: 1,
    correctAnswer: "called off",
    explanation: "'Call off' significa cancelar un evento, mientras que 'put off' significa únicamente posponerlo.",
    points: 1000
  },
  {
    id: "q-b2-pv-2",
    level: "B2",
    topicId: "b2-phrasal-verbs-advanced",
    topicName: "Advanced Phrasal Verbs",
    type: "multiple_choice",
    question: "I am really looking forward to _____ your research cohort next month.",
    options: ["meet", "meeting", "have met", "met"],
    correctIndex: 1,
    correctAnswer: "meeting",
    explanation: "En la expresión 'look forward to', 'to' es una preposición, por lo que el verbo siguiente debe ir obligatoriamente en gerundio (-ing): 'meeting'.",
    points: 1000
  },
  {
    id: "q-b2-pv-3",
    level: "B2",
    topicId: "b2-phrasal-verbs-advanced",
    topicName: "Advanced Phrasal Verbs",
    type: "fill_blank",
    question: "The research team hopes to come _____ with an eco-friendly synthesis method before the grant expires.",
    options: ["up", "down", "out", "across"],
    correctAnswer: "up",
    alternatives: ["up"],
    correctIndex: 0,
    explanation: "La locución verbal idiomática de 3 partes es 'come UP with' (idear o proponer una solución/idea).",
    points: 1000
  },
  {
    id: "q-b2-pv-4",
    level: "B2",
    topicId: "b2-phrasal-verbs-advanced",
    topicName: "Advanced Phrasal Verbs",
    type: "multiple_choice",
    question: "He received a lucrative offer from a competing university, but he _____ it down to stay near his family.",
    options: ["looked", "carried", "turned", "called"],
    correctIndex: 2,
    correctAnswer: "turned",
    explanation: "'Turn down' es el phrasal verb separable que significa declinar o rechazar una propuesta o empleo.",
    points: 1000
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = QUESTION_BANK;
}
