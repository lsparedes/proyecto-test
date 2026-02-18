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
        { id: 19, group: "Discurso Oral", name: "Descripción oral de una imagen", steps: [] },

        // =======================
        // Lectura
        // =======================
        { id: 20, group: "Lectura", name: "Lectura de palabras aisladas", steps: [] },
        { id: 21, group: "Lectura", name: "Lectura de palabras complejas", steps: [] },
        { id: 22, group: "Lectura", name: "Lectura de palabras funcionales", steps: [] },
        { id: 23, group: "Lectura", name: "Lectura de no-palabras", steps: [] },

        // =======================
        // Escritura
        // =======================
        { id: 24, group: "Escritura", name: "Copia", steps: [] },
        { id: 25, group: "Escritura", name: "Etiquetado de imágenes", steps: [] },
        { id: 26, group: "Escritura", name: "Escritura al dictado", steps: [] },

        // =======================
        // Discurso Escrito
        // =======================
        { id: 27, group: "Discurso Escrito", name: "Descripción escrita de una imagen", steps: [] },
    ],
};
