// js/cat_script.js
// CAT: 27 partes (ensayos). Luego iremos rellenando steps por parte.

export const CAT = {
    meta: {
        name: "CAT",
        version: "1.0",
        totalParts: 27,
    },

    parts: [
        // =======================
        // Examen Cognitivo
        // =======================
        {
            id: 1,
            group: "Examen Cognitivo",
            name: "Disección de líneas",
            steps: [
                {
                    type: "line_bisection",

                    // screen 0 (Demostración)
                    demoAudios: [
                        "/tests/modulo2/assets/Audio/Test_1/Intruccion/audio1.wav",
                        "/tests/modulo2/assets/Audio/Test_1/Prueba/audio2.wav"
                    ],
                    patientAudio: "/tests/modulo2/assets/Audio/Test_1/Ensayo/audio3.wav",

                    // Imagen base
                    baseImage: "assets/parte1/lineas.png",

                    // Imagen de escala
                    scaleImage: "assets/parte1/escala.png"
                }
            ]
        },
        // Parte 2 - Memoria semántica
        {
            id: 2,
            group: "Examen Cognitivo",
            name: "Memoria semántica",
            steps: [
                {
                    type: "semantic_match",
                    instruction: "Selecciona la imagen que más se relacione con la imagen central.",
                    instructionAudio: "/tests/modulo2/assets/Audio/Test_2/Instruccion/audio1.wav",
                    trials: [
                        {
                            id: 1,
                            center: "assets/semantic/part2/t1_center.png",
                            options: [
                                "assets/semantic/part2/t1_a.png", // esquina sup-izq
                                "assets/semantic/part2/t1_b.png", // sup-der
                                "assets/semantic/part2/t1_c.png", // inf-izq
                                "assets/semantic/part2/t1_d.png", // inf-der
                            ],
                            correctIndex: 0
                        },
                        {
                            id: 2,
                            center: "assets/semantic/part2/t2_center.png",
                            options: [
                                "assets/semantic/part2/t2_a.png",
                                "assets/semantic/part2/t2_b.png",
                                "assets/semantic/part2/t2_c.png",
                                "assets/semantic/part2/t2_d.png",
                            ],
                            correctIndex: 2
                        },
                        {
                            id: 3,
                            center: "assets/semantic/part2/t3_center.png",
                            options: [
                                "assets/semantic/part2/t3_a.png",
                                "assets/semantic/part2/t3_b.png",
                                "assets/semantic/part2/t3_c.png",
                                "assets/semantic/part2/t3_d.png",
                            ],
                            correctIndex: 1
                        },
                        {
                            id: 4,
                            center: "assets/semantic/part2/t4_center.png",
                            options: [
                                "assets/semantic/part2/t4_a.png",
                                "assets/semantic/part2/t4_b.png",
                                "assets/semantic/part2/t4_c.png",
                                "assets/semantic/part2/t4_d.png",
                            ],
                            correctIndex: 3
                        },
                        {
                            id: 5,
                            center: "assets/semantic/part2/t5_center.png",
                            options: [
                                "assets/semantic/part2/t5_a.png",
                                "assets/semantic/part2/t5_b.png",
                                "assets/semantic/part2/t5_c.png",
                                "assets/semantic/part2/t5_d.png",
                            ],
                            correctIndex: 0
                        },
                        {
                            id: 6,
                            center: "assets/semantic/part2/t6_center.png",
                            options: [
                                "assets/semantic/part2/t6_a.png",
                                "assets/semantic/part2/t6_b.png",
                                "assets/semantic/part2/t6_c.png",
                                "assets/semantic/part2/t6_d.png",
                            ],
                            correctIndex: 0
                        },
                        {
                            id: 7,
                            center: "assets/semantic/part2/t7_center.png",
                            options: [
                                "assets/semantic/part2/t7_a.png",
                                "assets/semantic/part2/t7_b.png",
                                "assets/semantic/part2/t7_c.png",
                                "assets/semantic/part2/t7_d.png",
                            ],
                            correctIndex: 0
                        },
                        {
                            id: 8,
                            center: "assets/semantic/part2/t8_center.png",
                            options: [
                                "assets/semantic/part2/t8_a.png",
                                "assets/semantic/part2/t8_b.png",
                                "assets/semantic/part2/t8_c.png",
                                "assets/semantic/part2/t8_d.png",
                            ],
                            correctIndex: 0
                        },
                        {
                            id: 9,
                            center: "assets/semantic/part2/t9_center.png",
                            options: [
                                "assets/semantic/part2/t9_a.png",
                                "assets/semantic/part2/t9_b.png",
                                "assets/semantic/part2/t9_c.png",
                                "assets/semantic/part2/t9_d.png",
                            ],
                            correctIndex: 0
                        },
                        {
                            id: 10,
                            center: "assets/semantic/part2/t10_center.png",
                            options: [
                                "assets/semantic/part2/t10_a.png",
                                "assets/semantic/part2/t10_b.png",
                                "assets/semantic/part2/t10_c.png",
                                "assets/semantic/part2/t10_d.png",
                            ],
                            correctIndex: 0
                        },
                        {
                            id: 11,
                            center: "assets/semantic/part2/t11_center.png",
                            options: [
                                "assets/semantic/part2/t11_a.png",
                                "assets/semantic/part2/t11_b.png",
                                "assets/semantic/part2/t11_c.png",
                                "assets/semantic/part2/t11_d.png",
                            ],
                            correctIndex: 0
                        },
                    ]
                }
            ]
        },

        {
            id: 3,
            group: "Examen Cognitivo",
            name: "Fluidez verbal",
            steps: [
                {
                    type: "verbal_fluency",

                    // Audios
                    instr1Audio: null,
                    ropaAudio: null,
                    animalesAudio: null,
                    instr2Audio: null,
                    letraBAudio: null,
                    letraSAudio: null,

                    recordDurationMs: 60000
                }
            ]
        },
        {
            id: 4,
            group: "Examen Cognitivo",
            name: "Memoria a corto plazo",
            steps: [
                {
                    type: "mcq4_image_trials",

                    // solo en prueba (pantalla 1)
                    instructionAudio: "/tests/modulo2/assets/Audio/Test_4/Instruccion/audio1.wav", // ejemplo: "assets/audio/parte4_instrucciones.mp3"
                    patientAudio: "/tests/modulo2/assets/Audio/Test_4/Prueba/audio2.wav",
                    // 1 prueba + 10 ensayos (total 11 pantallas)
                    totalTrials: 11,       // pantallas 1..11
                    practiceIndex: 1,      // la pantalla 1 es prueba

                    // ruta base y patrón de nombres
                    basePath: "assets/parte4",  // ojo: “parte4” como dijiste
                    filePattern: "{t}-{o}.png", // t = 1..11, o = 1..4

                    // UI
                    requireSelectionToAdvance: true
                }
            ]
        },
        {
            id: 5,
            group: "Examen Cognitivo",
            name: "Pantomima",
            steps: [
                {
                    type: "video_record_trials",
                    instructionAudio: "/tests/modulo2/assets/Audio/Test_5/Instruccion/audio1.wav",

                    // 1 práctica + 6 ensayos => total 7 pantallas de estímulo
                    practiceCount: 1,
                    trialCount: 6,

                    // imágenes: práctica = 1.png, ensayos = 2.png..7.png
                    basePath: "assets/parte5",
                    images: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"]
                }
            ]
        },
        {
            id: 6,
            group: "Examen Cognitivo",
            name: "Cálculo",
            steps: [
                {
                    type: "mcq_image",
                    instructionAudio: "/tests/modulo2/assets/Audio/Test_6/Instruccion/audio1.wav",
                    trials: [
                        {
                            id: 1,
                            promptImg: "assets/calculo/part6/calc_1.png", // imagen del cálculo
                            options: [
                                "assets/calculo/part6/q1_a.png",
                                "assets/calculo/part6/q1_b.png",
                                "assets/calculo/part6/q1_c.png",
                                "assets/calculo/part6/q1_d.png",
                                "assets/calculo/part6/q1_e.png",
                            ],
                            correctIndex: 2
                        },
                        {
                            id: 2,
                            promptImg: "assets/calculo/part6/calc_2.png",
                            options: [
                                "assets/calculo/part6/q2_a.png",
                                "assets/calculo/part6/q2_b.png",
                                "assets/calculo/part6/q2_c.png",
                                "assets/calculo/part6/q2_d.png",
                                "assets/calculo/part6/q2_e.png",
                            ],
                            correctIndex: 0
                        },
                        {
                            id: 3,
                            promptImg: "assets/calculo/part6/calc_3.png",
                            options: [
                                "assets/calculo/part6/q3_a.png",
                                "assets/calculo/part6/q3_b.png",
                                "assets/calculo/part6/q3_c.png",
                                "assets/calculo/part6/q3_d.png",
                                "assets/calculo/part6/q3_e.png",
                            ],
                            correctIndex: 4
                        },
                        {
                            id: 3,
                            promptImg: "assets/calculo/part6/calc_4.png",
                            options: [
                                "assets/calculo/part6/q4_a.png",
                                "assets/calculo/part6/q4_b.png",
                                "assets/calculo/part6/q4_c.png",
                                "assets/calculo/part6/q4_d.png",
                                "assets/calculo/part6/q4_e.png",
                            ],
                            correctIndex: 4
                        },
                        {
                            id: 3,
                            promptImg: "assets/calculo/part6/calc_5.png",
                            options: [
                                "assets/calculo/part6/q5_a.png",
                                "assets/calculo/part6/q5_b.png",
                                "assets/calculo/part6/q5_c.png",
                                "assets/calculo/part6/q5_d.png",
                                "assets/calculo/part6/q5_e.png",
                            ],
                            correctIndex: 4
                        },
                        {
                            id: 3,
                            promptImg: "assets/calculo/part6/calc_6.png",
                            options: [
                                "assets/calculo/part6/q6_a.png",
                                "assets/calculo/part6/q6_b.png",
                                "assets/calculo/part6/q6_c.png",
                                "assets/calculo/part6/q6_d.png",
                                "assets/calculo/part6/q6_e.png",
                            ],
                            correctIndex: 4
                        },
                    ]
                }
            ]
        },


        // =======================
        // Batería de Lenguaje - Parte 1: Comprensión
        // =======================
        {
            id: 7,
            group: "Batería de Lenguaje",
            name: "Comprensión oral de palabras aisladas",
            steps: [
                {
                    type: "audio_mcq4_trials",

                    basePath: "assets/parte7",
                    // imágenes: 1-1..1-4 práctica, 2-1..16-4 ensayos
                    firstTrial: 1,
                    lastTrial: 16,
                    filePattern: "{t}-{o}.png", // t=1..16, o=1..4

                    // Audios (tú los enlazas después)
                    instructionAudio: "/tests/modulo2/assets/Audio/Test_7/Instruccion/audio1.wav",
                    practiceAudio1: "/tests/modulo2/assets/Audio/Test_7/Prueba/audio2.wav",
                    practiceAudio2: "/tests/modulo2/assets/Audio/Test_7/Prueba/audio3.wav",

                    // Audio por ensayo (1 por pantalla del 2 al 16)
                    trialAudioPattern: "/tests/modulo2/assets/Audio/Test_7/Ensayo/audio{t}.wav",

                    requireSelectionToAdvance: true
                }
            ]
        },
        {
            id: 8,
            group: "Batería de Lenguaje",
            name: "Comprensión escrita de palabras aisladas",
            steps: [
                {
                    type: "audio_mcq4_words_on_screen",

                    basePath: "assets/parte8",
                    firstTrial: 1,
                    lastTrial: 16,
                    filePattern: "{t}-{o}.png",

                    // Pantalla 1: instrucción (audio centrado)
                    instructionAudio: null,

                    // Audios: solo en t=1 y t=2
                    audioT1: null,
                    audioT2: null,

                    // Palabras en orden t=1..16
                    words: [
                        "piña", "dedal", "sable", "mesa", "carta", "cocina", "espina", "vela",
                        "rama", "toro", "hueso", "lima", "pata", "cama", "fuente", "barco"
                    ],

                    requireSelectionToAdvance: true
                }
            ]
        },
        {
            id: 9,
            group: "Batería de Lenguaje",
            name: "Comprensión oral de oraciones",
            steps: [
                {
                    type: "audio_mcq4_trials_with_dual_intro",

                    basePath: "assets/parte9",
                    firstTrial: 1,
                    lastTrial: 17,
                    filePattern: "{t}-{o}.png",

                    // Pantalla 1: 2 audios centrados
                    introAudio1: null,  // "assets/parte9/audio/intro_1.mp3"
                    introAudio2: null,  // "assets/parte9/audio/intro_2.mp3"

                    // Audio por pantalla (t=1..17). Tú lo enlazas después.
                    trialAudioPattern: null, // ej: "assets/parte9/audio/{t}.mp3"

                    requireSelectionToAdvance: true
                }
            ]
        },
        {
            id: 10,
            group: "Batería de Lenguaje",
            name: "Comprensión escrita de oraciones",
            steps: [
                {
                    type: "mcq4_sentence_center_with_audio_practice",

                    basePath: "assets/parte10",
                    firstTrial: 1,
                    lastTrial: 17,
                    filePattern: "{t}-{o}.png",

                    // Pantalla 1 (instrucción)
                    instructionAudio: null,

                    // Pantalla 2 (t=1): 2 audios arriba derecha
                    practiceAudio1: null,
                    practiceAudio2: null,

                    // Oraciones por t=1..17
                    sentences: [
                        "El hombre está sentado",
                        "El hombre está bebiendo",
                        "La mujer está caminando",
                        "Él está llorando",
                        "La mujer se está comiendo un helado",
                        "El hombre está pintando un cuadro",
                        "El niño está sentado bajo la mesa",
                        "El lápiz está bajo el papel",
                        "El cocinero llama al doctor",
                        "El doctor empuja al cantante",
                        "La bailarina es dibujada por la bruja",
                        "El doctor es perseguido por el cocinero",
                        "La bruja dibuja a la bailarina",
                        "El zapato bajo el lápiz es rojo",
                        "La alfombra en la que está el gato es verde",
                        "El zapato amarillo está bajo el lápiz",
                        "La flor bajo la taza es roja"
                    ],

                    requireSelectionToAdvance: true
                }
            ]
        },
        {
            id: 11,
            group: "Batería de Lenguaje",
            name: "Comprensión oral de párrafos",
            steps: [
                {
                    type: "story_yesno_flow",
                    // Pantallas:
                    // 1) 3 audios centrados (instrucción + 2 preguntas simples)
                    screen1_centerAudios: [null, null, null],

                    // 2) historia 1 (audio centrado)
                    story1_audio: null,

                    // 3-6) 4 preguntas Sí/No (audio arriba derecha)
                    yesno_block1_audios: [null, null, null, null],

                    // 7) historia 2 + 3 audios centrados (apilados)
                    story2_audio: null,
                    screen7_centerAudios: [null, null, null],

                    // 8-11) 4 preguntas Sí/No (audio arriba derecha)
                    yesno_block2_audios: [null, null, null, null],

                    requireSelectionToAdvance: true
                }
            ]
        },

        // =======================
        // Batería de Lenguaje - Parte 2: Producción
        // =======================
        {
            id: 12,
            group: "Parte 2: Producción",
            name: "Repetición de palabras",
            steps: [
                {
                    type: "repeat_audio_record",

                    // Pantalla 1: 2 audios de instrucción (centrados)
                    introAudios: [null, null],

                    // Pantalla 2: ejemplo (audio centrado)
                    exampleAudio: null,

                    // Pantallas 3..16: ensayos (14 audios centrados)
                    trialAudioPattern: null, // ejemplo: "assets/parte12/audio/{n}.mp3" con n=1..14

                    totalTrials: 14
                }
            ]
        },
        {
            id: 13,
            group: "Parte 2: Producción",
            name: "Repetición de palabras complejas",
            steps: [
                {
                    type: "repeat_audio_record",

                    // sin pantalla de instrucciones
                    introAudios: [],

                    // pantalla 1 (ejemplo / primer audio)
                    exampleAudio: null,

                    // pantallas 2 y 3 (2 ensayos)
                    trialAudioPattern: null, // ejemplo: "assets/parte13/audio/{n}.mp3" con n=1..2

                    totalTrials: 2
                }
            ]
        },
        {
            id: 14,
            group: "Parte 2: Producción",
            name: "Repetición de no-palabras",
            steps: [
                {
                    type: "repeat_audio_record",

                    // Pantalla 1: 2 audios centrados (arriba/abajo)
                    introAudios: [null, null], // luego pones rutas

                    // Pantallas 2..6: audio+grabación
                    exampleAudio: null,        // pantalla 2
                    trialAudioPattern: null,   // pantallas 3..6 (n=1..4)

                    totalTrials: 4             // 1 example + 4 trials = 5 pantallas de grabación (2..6)
                }
            ]
        },
        {
            id: 15,
            group: "Parte 2: Producción",
            name: "Repetición de dígitos",
            steps: [
                {
                    type: "repeat_audio_record",

                    // Pantalla 1: 2 audios centrados (instrucciones)
                    introAudios: [null, null],

                    // NO hay ejemplo, así que lo dejamos null
                    exampleAudio: null,

                    // 12 ensayos (pantallas 2..13)
                    trialAudioPattern: null, // ejemplo: "assets/parte15/audio/{n}.mp3" con n=1..12
                    totalTrials: 12,

                    // Nuevo flag para decir que NO hay ejemplo (solo trials)
                    noExample: true
                }
            ]
        },
        {
            id: 16,
            group: "Parte 2: Producción",
            name: "Repetición de oraciones",
            steps: [
                {
                    type: "repeat_audio_record",

                    // Pantalla 1: instrucción (2 audios centrados)
                    introAudios: [null, null],

                    // Sin ejemplo: solo ensayos
                    noExample: true,
                    exampleAudio: null,

                    // 8 ensayos
                    totalTrials: 8,
                    trialAudioPattern: null // ejemplo: "assets/parte16/audio/{n}.mp3" con n=1..8
                }
            ]
        },
        {
            id: 17,
            group: "Parte 2: Producción",
            name: "Denominación de objetos",
            steps: [
                {
                    type: "image_instr_auto_record",

                    basePath: "assets/parte17",
                    firstImage: 1,
                    lastImage: 25,
                    imagePattern: "{n}.png",

                    // Instrucciones por pantalla:
                    // pantalla 1: I, P, PS, PF
                    // pantallas 2..25: P, PS, PF
                    instrI: null,
                    instrP: null,
                    instrPS: null,
                    instrPF: null,

                    // grabación wav (auto)
                    autoStartRecording: true
                }
            ]
        },
        {
            id: 18,
            group: "Parte 2: Producción",
            name: "Denominación de acciones",
            steps: [
                {
                    type: "image_auto_record_simple",

                    basePath: "assets/parte18",
                    firstImage: 1,
                    lastImage: 5,
                    imagePattern: "{n}.png",

                    // Solo pantalla 1
                    instructionAudio: null,

                    autoStartRecording: true
                }
            ]
        },

        // =======================
        // Discurso Oral
        // =======================
        {
            id: 19,
            group: "Discurso Oral",
            name: "Descripción oral de una imagen",
            steps: [
                {
                    type: "audio_record_image",
                    image: "assets/parte19/imagen.png",          // pon tu ruta real
                    instructionAudio: null,                     // "assets/audio/part19_instrucciones.mp3"
                    audioKey: "part19_take1"                    // clave para guardar el wav
                }
            ]
        },


        // =======================
        // Lectura
        // =======================
        {
            id: 20,
            group: "Lectura",
            name: "Lectura de palabras aisladas",
            steps: [{
                type: "audio_record_words",
                instructionAudio: null,
                autoStart: true,
                words: [
                    "silla", "contenedor", "goce", "micrófono", "pierna", "trecho", "pasaporte", "sonajero", "zorro", "tomar",
                    "estropajo", "causa", "dormitorio", "culpa", "educación", "pasar", "bailarina", "hurgar", "siglo",
                    "televisión", "diccionario", "brillar", "porcelana", "pecar", "chocolate"
                ]
            }]
        },

        {
            id: 21,
            group: "Lectura",
            name: "Lectura de palabras complejas",
            steps: [{
                type: "audio_record_words",
                instructionAudio: null,
                autoStart: true,
                words: ["informativo", "recalentado", "preconcebido"]
            }]
        },

        {
            id: 22,
            group: "Lectura",
            name: "Lectura de palabras funcionales",
            steps: [{
                type: "audio_record_words",
                instructionAudio: null,
                autoStart: true,
                words: ["pero", "de", "y"]
            }]
        },

        {
            id: 23,
            group: "Lectura",
            name: "Lectura de no-palabras",
            steps: [{
                type: "audio_record_words",
                instructionAudio: null,
                autoStart: true,
                words: ["polma", "tarco", "fugamo", "vitero", "espisto"]
            }]
        },


        // =======================
        // Escritura
        // =======================
        { id: 24, group: "Escritura", name: "Copia - Falta Terminar!!!", steps: [] },
        {
            id: 25,
            group: "Escritura",
            name: "Etiquetado de imágenes",
            steps: [
                {
                    type: "image_labeling",

                    // Pantalla 1 (instrucción)
                    instructionTitle: "Etiquetado de imágenes",
                    instructionBody: "Escuche las instrucciones y escriba el nombre correspondiente a la imagen.",
                    instructionAudio: null, // ejemplo: "assets/audio/part25_instrucciones.mp3"

                    // Imágenes (6 en total: 1 práctica + 5 ensayos)
                    images: [
                        "assets/parte25/1.png", // práctica
                        "assets/parte25/2.png", // ensayo 1
                        "assets/parte25/3.png", // ensayo 2
                        "assets/parte25/4.png", // ensayo 3
                        "assets/parte25/5.png", // ensayo 4
                        "assets/parte25/6.png", // ensayo 5
                    ],

                    placeholder: "Escriba aquí...",
                    minChars: 0
                }
            ]
        },

        {
            id: 26,
            group: "Escritura",
            name: "Escritura al dictado",
            steps: [
                {
                    type: "dictation_text",
                    audio: null, // ejemplo: "assets/audio/parte26_dictado.mp3"

                    prompt: "",

                    // 1 práctica + 5 ensayos = 6
                    totalPractice: 1,
                    totalTrials: 5,

                    // si después quieres mínimo de caracteres
                    minChars: 0
                }
            ]
        },


        // =======================
        // Discurso Escrito
        // =======================
        {
            id: 27,
            group: "Discurso Escrito",
            name: "Descripción escrita de una imagen",
            instructionAudio: "assets/audio/parte2_instrucciones.mp3",
            steps: [
                {
                    type: "text_image",
                    image: "assets/parte27/imagen.png",
                    placeholder: "Escriba aquí su descripción...",
                    minChars: 1 // por ahora mínimo 1, lo ajustamos cuando definan criterios
                }
            ]
        },

    ],
};
