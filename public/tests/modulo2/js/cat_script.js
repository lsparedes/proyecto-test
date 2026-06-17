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
        //3
        {
            id: 3,
            group: "Examen Cognitivo",
            name: "Fluidez verbal",
            steps: [
                {
                    type: "verbal_fluency",

                    // Audios
                    instr1Audio: "/tests/modulo2/assets/Audio/Test_3/Instruccion/audio1.wav",
                    ropaAudio: "/tests/modulo2/assets/Audio/Test_3/Prueba/audio2.wav",
                    animalesAudio: "/tests/modulo2/assets/Audio/Test_3/Ensayo/audio3.wav",
                    instr2Audio: "/tests/modulo2/assets/Audio/Test_3/Instruccion/audio4.wav",
                    letraBAudio: "/tests/modulo2/assets/Audio/Test_3/Prueba/audio5.wav",
                    letraSAudio: "/tests/modulo2/assets/Audio/Test_3/Ensayo/audio6.wav",

                    recordDurationMs: 60000
                }
            ]
        },
        //4
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
        //5
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
        //6
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
                                "8",
                                "13",
                                "15",
                                "19",
                                "21",
                            ],
                            correctIndex: 2
                        },
                        {
                            id: 2,
                            promptImg: "assets/calculo/part6/calc_2.png",
                            options: [
                                "2",
                                "3",
                                "4",
                                "11",
                                "6",
                            ],
                            correctIndex: 1
                        },
                        {
                            id: 3,
                            promptImg: "assets/calculo/part6/calc_3.png",
                            options: [
                                "15",
                                "42",
                                "54",
                                "56",
                                "76",
                            ],
                            correctIndex: 3
                        },
                        {
                            id: 4,
                            promptImg: "assets/calculo/part6/calc_4.png",
                            options: [
                                "21",
                                "22",
                                "28",
                                "32",
                                "3",
                            ],
                            correctIndex: 3
                        },
                        {
                            id: 5,
                            promptImg: "assets/calculo/part6/calc_5.png",
                            options: [
                                "11",
                                "19",
                                "21",
                                "29",
                                "4",
                            ],
                            correctIndex: 1
                        },
                        {
                            id: 6,
                            promptImg: "assets/calculo/part6/calc_6.png",
                            options: [
                                "89",
                                "91",
                                "99",
                                "101",
                                "205",
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
                    filePattern: "{t}-{o}.png", // fallback para nombres antiguos
                    imageFiles: {
                        1: ["1-diamante.png", "1-margarita.png", "1-roca.png", "1-rosa.png"],
                        2: ["2-capa.png", "2-casa.png", "2-chaqueta.png", "2-edificio.png"],
                        3: ["3-bala.png", "3-pala.png", "3-pistola.png", "3-rastrillo.png"],
                        4: ["4-astas.png", "4-cuerno.png", "4-cuervo.png", "4-paloma.png"],
                        5: ["5-hacha.png", "5-saturno.png", "5-sierra.png", "5-tierra.png"],
                        6: ["6-bota.png", "6-gota.png", "6-grifo.png", "6-sandalia.png"],
                        7: ["7-copa.png", "7-helado.png", "7-sopa.png", "7-vaso.png"],
                        8: ["8-hoja.png", "8-lagartija.png", "8-rama.png", "8-rana.png"],
                        9: ["9-boca.png", "9-delfin.png", "9-foca.png", "9-nariz.png"],
                        10: ["10-gallina.png", "10-gato.png", "10-pato.png", "10-perro.png"],
                        11: ["11-oreja.png", "11-oveja.png", "11-pendiente.png", "11-vaca.png"],
                        12: ["12-cuna.png", "12-cura.png", "12-hamaca.png", "12-iglesia.png"],
                        13: ["13-maleta.png", "13-mochila.png", "13-paleta.png", "13-pincel.png"],
                        14: ["14-botella.png", "14-conejo.png", "14-rata.png", "14-vaso.png"],
                        15: ["15-cigarro.png", "15-muro.png", "15-puro.png", "15-valla.png"],
                        16: ["16-chimenea.png", "16-fuego.png", "16-juego.png", "16-pelota.png"],
                    },
                    trialAudioStart: 4,
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
        //8
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
                    instructionAudio: "/tests/modulo2/assets/Audio/Test_8/Instruccion/audio1.wav",

                    // Audios: solo en t=1 y t=2
                    audioT1: "/tests/modulo2/assets/Audio/Test_8/Prueba/audio2.wav",
                    audioT2: "/tests/modulo2/assets/Audio/Test_8/Ensayo/audio3.wav",

                    // Palabras en orden t=1..16
                    words: [
                        "piña", "dedal", "sable", "mesa", "carta", "cocina", "espina", "vela",
                        "rama", "toro", "hueso", "lima", "pata", "cama", "fuente", "barco"
                    ],

                    requireSelectionToAdvance: true
                }
            ]
        },
        //9
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
                    introAudio1: "/tests/modulo2/assets/Audio/Test_9/Instruccion/audio1.wav",  // "assets/parte9/audio/intro_1.mp3"
                    introAudio2: "/tests/modulo2/assets/Audio/Test_9/Instruccion/audio2.wav",  // "assets/parte9/audio/intro_2.mp3"
                    practiceAudio1: "/tests/modulo2/assets/Audio/Test_9/Prueba/audio3.wav",

                    // Audio por pantalla (t=1..17). Tú lo enlazas después.
                    trialAudioPattern: "/tests/modulo2/assets/Audio/Test_9/Ensayo/audio{t}.wav", // ej: "assets/parte9/audio/{t}.mp3"

                    requireSelectionToAdvance: true
                }
            ]
        },
        //10
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
                    instructionAudio: "/tests/modulo2/assets/Audio/Test_10/Instruccion/audio1.wav",

                    // Pantalla 2 (t=1): 2 audios arriba derecha
                    practiceAudio1: "/tests/modulo2/assets/Audio/Test_10/Prueba/audio2.wav",
                    practiceAudio2: "/tests/modulo2/assets/Audio/Test_10/Prueba/audio3.wav",

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
        //11
        {
            id: 11,
            group: "Batería de Lenguaje",
            name: "Comprensión oral de párrafos",
            steps: [
                {
                    type: "story_yesno_flow",
                    // Pantallas:
                    // 1) 3 audios centrados (instrucción + 2 preguntas simples)
                    screen1_centerAudios: [
                        "/tests/modulo2/assets/Audio/Test_11/Instruccion/audio1.wav",
                        "/tests/modulo2/assets/Audio/Test_11/Instruccion/audio2.wav",
                        "/tests/modulo2/assets/Audio/Test_11/Instruccion/audio3.wav"],

                    // 2) historia 1 (audio centrado)
                    story1_audio: "/tests/modulo2/assets/Audio/Test_11/Instruccion/audio4.wav",

                    // 3-6) 4 preguntas Sí/No (audio arriba derecha)
                    yesno_block1_audios: [
                        "/tests/modulo2/assets/Audio/Test_11/Ensayo/audio5.wav",
                        "/tests/modulo2/assets/Audio/Test_11/Ensayo/audio6.wav",
                        "/tests/modulo2/assets/Audio/Test_11/Ensayo/audio7.wav",
                        "/tests/modulo2/assets/Audio/Test_11/Ensayo/audio8.wav"],

                    // 7) historia 2 + 3 audios centrados (apilados)
                    screen7_centerAudios: [
                        "/tests/modulo2/assets/Audio/Test_11/Instruccion/audio9.wav",
                        "/tests/modulo2/assets/Audio/Test_11/Instruccion/audio10.wav",
                    ],
                    story2_audio: "/tests/modulo2/assets/Audio/Test_11/Instruccion/audio11.wav",

                    // 8-11) 4 preguntas Sí/No (audio arriba derecha)
                    yesno_block2_audios: [
                        "/tests/modulo2/assets/Audio/Test_11/Ensayo/audio12.wav",
                        "/tests/modulo2/assets/Audio/Test_11/Ensayo/audio13.wav",
                        "/tests/modulo2/assets/Audio/Test_11/Ensayo/audio14.wav",
                        "/tests/modulo2/assets/Audio/Test_11/Ensayo/audio15.wav"],

                    requireSelectionToAdvance: true
                }
            ]
        },
        // =======================
        // 12 Batería de Lenguaje - Parte 2: Producción
        // =======================
        {
            id: 12,
            group: "Parte 2: Producción",
            name: "Repetición de palabras",
            steps: [
                {
                    type: "repeat_audio_record",

                    introAudios: [
                        "/tests/modulo2/assets/Audio/Test_12/Instruccion/audio1.wav",
                        "/tests/modulo2/assets/Audio/Test_12/Instruccion/audio2.wav"
                    ],

                    exampleAudio: "/tests/modulo2/assets/Audio/Test_12/Prueba/audio3.wav",

                    trialAudioPattern: "/tests/modulo2/assets/Audio/Test_12/Ensayo/audio{n}.wav",
                    trialAudioStart: 4,
                    trialWords: [
                        "patin"
                    ],

                    totalTrials: 16
                }
            ]
        },
        //13
        {
            id: 13,
            group: "Parte 2: Producción",
            name: "Repetición de palabras complejas",
            steps: [
                {
                    type: "repeat_audio_record",
                    introAudios: [],
                    noExample: true,
                    trialAudios: [
                        "/tests/modulo2/assets/Audio/Test_13/Ensayo/audio1.wav",
                        "/tests/modulo2/assets/Audio/Test_13/Ensayo/audio2.wav",
                        "/tests/modulo2/assets/Audio/Test_13/Ensayo/audio3.wav"
                    ],
                    totalTrials: 3
                }
            ]
        },
        //14
        {
            id: 14,
            group: "Parte 2: Producción",
            name: "Repetición de no-palabras",
            steps: [
                {
                    type: "repeat_audio_record",

                    // Pantalla 1: 2 audios centrados
                    introAudios: [
                        "/tests/modulo2/assets/Audio/Test_14/Instruccion/audio1.wav",
                        "/tests/modulo2/assets/Audio/Test_14/Instruccion/audio2.wav"
                    ],

                    noExample: true,

                    // Ensayos 1..5 => audio3..audio7
                    trialAudioPattern: "/tests/modulo2/assets/Audio/Test_14/Ensayo/audio{n}.wav",
                    trialAudioStart: 3,
                    totalTrials: 5
                }
            ]
        },
        //15
        {
            id: 15,
            group: "Parte 2: Producción",
            name: "Repetición de dígitos",
            steps: [
                {
                    type: "repeat_audio_record",

                    // Pantalla 1: 2 audios centrados (instrucciones)
                    introAudios: [
                        "/tests/modulo2/assets/Audio/Test_15/Instruccion/audio1.wav",
                        "/tests/modulo2/assets/Audio/Test_15/Instruccion/audio2.wav"],

                    // NO hay ejemplo, así que lo dejamos null
                    exampleAudio: null,

                    // 12 ensayos (pantallas 2..13)
                    trialAudioPattern: "/tests/modulo2/assets/Audio/Test_15/Ensayo/audio{n}.wav", // ejemplo: "assets/parte15/audio/{n}.mp3" con n=1..12
                    trialAudioStart: 3,
                    totalTrials: 12,

                    // Nuevo flag para decir que NO hay ejemplo (solo trials)
                    noExample: true
                }
            ]
        },
        //16
        {
            id: 16,
            group: "Parte 2: Producción",
            name: "Repetición de oraciones",
            steps: [
                {
                    type: "repeat_audio_record",

                    // Pantalla 1: instrucción (2 audios centrados)
                    introAudios: [
                        "/tests/modulo2/assets/Audio/Test_16/Instruccion/audio1.wav",
                        "/tests/modulo2/assets/Audio/Test_16/Instruccion/audio2.wav"],

                    // Sin ejemplo: solo ensayos
                    noExample: true,
                    exampleAudio: null,

                    // 8 ensayos
                    totalTrials: 8,
                    trialAudioStart: 3,
                    trialAudioPattern: "/tests/modulo2/assets/Audio/Test_16/Ensayo/audio{n}.wav" // ejemplo: "assets/parte16/audio/{n}.mp3" con n=1..8
                }
            ]
        },
        //17
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

                    // Ejemplo (pantalla 1)
                    instrI: "/tests/modulo2/assets/Audio/Test_17/Prueba/audio1.wav",
                    instrP: "",
                    instrPS: "/tests/modulo2/assets/Audio/Test_17/Prueba/audio3.wav",
                    instrPF: "/tests/modulo2/assets/Audio/Test_17/Prueba/audio4.wav",

                    // Ensayos (pantallas 2..25)
                    trialAudioBase: "/tests/modulo2/assets/Audio/Test_17/Ensayo",
                    trialAudioStart: 5,     // audio5.wav ... audio77.wav
                    specialTrialPF2: 12,    // el ensayo 12 tiene PF2 extra

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
                    lastImage: 6,
                    imagePattern: "{n}.png",

                    // Solo pantalla 1
                    instructionAudio: "/tests/modulo2/assets/Audio/Test_18/Prueba/audio1.wav",

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
                    image: "/tests/modulo2/assets/parte19/imagen.png",
                    instructionAudio: "/tests/modulo2/assets/Audio/Test_19/Ensayo/audio1.wav",
                    audioKey: "part19_take1"
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
                instructionAudio: "/tests/modulo2/assets/Audio/Test_20/Prueba/audio1.wav",
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
                hasExample: false,
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
                hasExample: false,
                words: ["pero", "de", "y"]
            }]
        },

        {
            id: 23,
            group: "Lectura",
            name: "Lectura de no-palabras",
            steps: [{
                type: "audio_record_words",
                instructionAudio: "/tests/modulo2/assets/Audio/Test_23/Instruccion/audio1.wav",
                autoStart: true,
                hasExample: false,
                words: ["polma", "tarco", "fugamo", "vitero", "espisto"]
            }]
        },


        // =======================
        // Escritura
        // =======================
        {
            id: 24,
            group: "Escritura",
            name: "Copia",
            steps: [
                {
                    type: "writing_copy_canvas"
                }
            ]
        },

        {
            id: 25,
            group: "Escritura",
            name: "Etiquetado de imÃ¡genes",
            steps: [
                {
                    type: "image_labeling",
                    instructionAudio: "/tests/modulo2/assets/Audio/Test_25/Instruccion/audio1.wav",
                    images: [
                        "assets/parte25/1.png",
                        "assets/parte25/2.png",
                        "assets/parte25/3.png",
                        "assets/parte25/4.png",
                        "assets/parte25/5.png",
                        "assets/parte25/6.png"
                    ],
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

                    // Textos
                    
                    
                    prompt: "Escriba aquí la palabra que escucha:",

                    // Audios
                    instructionAudio: "/tests/modulo2/assets/Audio/Test_26/Instruccion/audio1.wav",
                    exampleAudio: "/tests/modulo2/assets/Audio/Test_26/Prueba/audio2.wav",
                    trialAudios: [
                        "/tests/modulo2/assets/Audio/Test_26/Ensayo/audio3.wav",
                        "/tests/modulo2/assets/Audio/Test_26/Ensayo/audio4.wav",
                        "/tests/modulo2/assets/Audio/Test_26/Ensayo/audio5.wav",
                        "/tests/modulo2/assets/Audio/Test_26/Ensayo/audio6.wav",
                        "/tests/modulo2/assets/Audio/Test_26/Ensayo/audio7.wav"
                    ],

                    totalPractice: 1,
                    totalTrials: 5,
                    minChars: 1
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
            instructionAudio: "/tests/modulo2/assets/Audio/Test_27/Instruccion/audio1.wav",
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
