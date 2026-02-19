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
        { id: 1, group: "Examen Cognitivo", name: "Disección de líneas", steps: [] },
        // Parte 2 - Memoria semántica
        {
            id: 2,
            group: "Examen Cognitivo",
            name: "Memoria semántica",
            steps: [
                {
                    type: "semantic_match",
                    instruction: "Selecciona la imagen que más se relacione con la imagen central.",
                    instructionAudio: "assets/audio/parte2_instrucciones.mp3",
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

        { id: 3, group: "Examen Cognitivo", name: "Fluidez verbal", steps: [] },
        { id: 4, group: "Examen Cognitivo", name: "Memoria a corto plazo", steps: [] },
        { id: 5, group: "Examen Cognitivo", name: "Pantomima", steps: [] },
        {
            id: 6,
            group: "Examen Cognitivo",
            name: "Cálculo",
            steps: [
                {
                    type: "mcq_image",
                    instruction: "Seleccione la respuesta correcta.",
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
        { id: 7, group: "Batería de Lenguaje · Comprensión", name: "Comprensión oral de palabras aisladas", steps: [] },
        { id: 8, group: "Batería de Lenguaje · Comprensión", name: "Comprensión escrita de palabras aisladas", steps: [] },
        { id: 9, group: "Batería de Lenguaje · Comprensión", name: "Comprensión oral de oraciones", steps: [] },
        { id: 10, group: "Batería de Lenguaje · Comprensión", name: "Comprensión escrita de oraciones", steps: [] },
        { id: 11, group: "Batería de Lenguaje · Comprensión", name: "Comprensión oral de párrafos", steps: [] },

        // =======================
        // Batería de Lenguaje - Parte 2: Producción
        // =======================
        { id: 12, group: "Batería de Lenguaje · Producción", name: "Repetición de palabras", steps: [] },
        { id: 13, group: "Batería de Lenguaje · Producción", name: "Repetición de palabras complejas", steps: [] },
        { id: 14, group: "Batería de Lenguaje · Producción", name: "Repetición de no-palabras", steps: [] },
        { id: 15, group: "Batería de Lenguaje · Producción", name: "Repetición de dígitos", steps: [] },
        { id: 16, group: "Batería de Lenguaje · Producción", name: "Repetición de oraciones", steps: [] },
        { id: 17, group: "Batería de Lenguaje · Producción", name: "Denominación de objetos", steps: [] },
        { id: 18, group: "Batería de Lenguaje · Producción", name: "Denominación de acciones", steps: [] },

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
        { id: 24, group: "Escritura", name: "Copia", steps: [] },
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
