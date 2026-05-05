export const MODULO3 = {
  tests: [
    {
      id: 1,
      groupId: 1,
      groupTitle: "Procesos Motores Basicos",
      name: "Evaluacion Orofacial",
      note: "Base inicial de pantallas para la secuencia orofacial.",
      instructions: "Primero se muestra una instruccion con audio al centro. Luego avanza por pantallas de palabra, audio y camara.",
      description: "Secuencia inicial de evaluacion orofacial con grabacion por pantalla.",
      screens: [
        {
          id: 1,
          kind: "instruction",
          label: "Instruccion",
          section: "instruccion",
          title: "Evaluacion Orofacial",
          text: "A continuación, usted deberá realizar distintos movimientos con su cara. Por favor, escuche atentamente las instrucciones e intente hacer lo que se le pide lo mejor que pueda.",
          audio: "assets/parte1/test1/instruccion.wav",
          record: false
        },
        {
          id: 2,
          kind: "label",
          label: "Cara",
          section: "cara",
          text: "Cara"
        },
        {
          id: 3,
          kind: "record",
          label: "Cara",
          section: "cara",
          title: "Cara",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/cara/cara1.wav",
          record: true,
          outputName: "modulo3_test1_cara_1"
        },
        {
          id: 4,
          kind: "record",
          label: "Cara",
          section: "cara",
          title: "Cara",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/cara/cara2.wav",
          record: true,
          outputName: "modulo3_test1_cara_2"
        },
        {
          id: 5,
          kind: "record",
          label: "Cara",
          section: "cara",
          title: "Cara",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/cara/cara3.wav",
          record: true,
          outputName: "modulo3_test1_cara_3"
        },
        {
          id: 6,
          kind: "label",
          label: "Mandibula",
          section: "mandibula",
          text: "Mandibula"
        },
        {
          id: 7,
          kind: "record",
          label: "Mandibula",
          section: "mandibula",
          title: "Mandibula",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/mandibula/mandibula1.wav",
          record: true,
          outputName: "modulo3_test1_mandibula_1"
        },
        {
          id: 8,
          kind: "label",
          label: "Lengua",
          section: "lengua",
          text: "Lengua"
        },
        {
          id: 9,
          kind: "record",
          label: "Lengua",
          section: "lengua",
          title: "Lengua",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/lengua/lengua1.wav",
          record: true,
          outputName: "modulo3_test1_lengua_1"
        },
        {
          id: 10,
          kind: "record",
          label: "Lengua",
          section: "lengua",
          title: "Lengua",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/lengua/lengua2.wav",
          record: true,
          outputName: "modulo3_test1_lengua_2"
        },
        {
          id: 11,
          kind: "record",
          label: "Lengua",
          section: "lengua",
          title: "Lengua",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/lengua/lengua3.wav",
          record: true,
          outputName: "modulo3_test1_lengua_3"
        },
        {
          id: 12,
          kind: "label",
          label: "Paladar blando",
          section: "paladarblando",
          text: "Paladar blando"
        },
        {
          id: 13,
          kind: "record",
          label: "Paladar blando",
          section: "paladarblando",
          title: "Paladar blando",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/paladarblando/paladarblando.wav",
          record: true,
          outputName: "modulo3_test1_paladarblando_1"
        },
        {
          id: 14,
          kind: "label",
          label: "Praxias orofaciales",
          section: "praxiasorofaciales",
          text: "Praxias orofaciales"
        },
        {
          id: 15,
          kind: "record",
          label: "Praxias orofaciales",
          section: "praxiasorofaciales",
          title: "Praxias orofaciales",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/praxiasorofaciales/praxiasorofaciales1.wav",
          record: true,
          outputName: "modulo3_test1_praxiasorofaciales_1"
        },
        {
          id: 16,
          kind: "record",
          label: "Praxias orofaciales",
          section: "praxiasorofaciales",
          title: "Praxias orofaciales",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/praxiasorofaciales/praxiasorofaciales2.wav",
          record: true,
          outputName: "modulo3_test1_praxiasorofaciales_2"
        },
        {
          id: 17,
          kind: "record",
          label: "Praxias orofaciales",
          section: "praxiasorofaciales",
          title: "Praxias orofaciales",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/praxiasorofaciales/praxiasorofaciales3.wav",
          record: true,
          outputName: "modulo3_test1_praxiasorofaciales_3"
        },
        {
          id: 18,
          kind: "record",
          label: "Praxias orofaciales",
          section: "praxiasorofaciales",
          title: "Praxias orofaciales",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/praxiasorofaciales/praxiasorofaciales4.wav",
          record: true,
          outputName: "modulo3_test1_praxiasorofaciales_4"
        },
        {
          id: 19,
          kind: "record",
          label: "Praxias orofaciales",
          section: "praxiasorofaciales",
          title: "Praxias orofaciales",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/praxiasorofaciales/praxiasorofaciales5.wav",
          record: true,
          outputName: "modulo3_test1_praxiasorofaciales_5"
        },
        {
          id: 20,
          kind: "record",
          label: "Praxias orofaciales",
          section: "praxiasorofaciales",
          title: "Praxias orofaciales",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "assets/parte1/test1/praxiasorofaciales/praxiasorofaciales6.wav",
          record: true,
          outputName: "modulo3_test1_praxiasorofaciales_6"
        }
      ]
    },
    {
      id: 2,
      groupId: 1,
      groupTitle: "Procesos Motores Basicos",
      name: "Evaluacion Integrada de la Respiracion, la Fonacion y la Resonancia",
      note: "Secuencia base con dos audios por bloque y grabacion automatica.",
      instructions: "Cada bloque tiene una pantalla de titulo y una pantalla con dos audios. La grabacion se activa automaticamente cerca del final de cada audio.",
      description: "Tiempo maximo espiracion, Tiempo maximo fonacion y Resonancia.",
      screens: [
        {
          id: 1,
          kind: "title",
          title: "Tiempo maximo espiracion"
        },
        {
          id: 2,
          kind: "dual_audio_record",
          title: "Tiempo maximo espiracion",
          audio1: "assets/parte1/test2/espiracion/espiracion1.wav",
          audio2: "assets/parte1/test2/espiracion/espiracion2.wav"
        },
        {
          id: 3,
          kind: "title",
          title: "Tiempo maximo fonacion"
        },
        {
          id: 4,
          kind: "dual_audio_record",
          title: "Tiempo maximo fonacion",
          audio1: "assets/parte1/test2/fonacion/fonacion1.wav",
          audio2: "assets/parte1/test2/fonacion/fonacion2.wav"
        },
        {
          id: 5,
          kind: "title",
          title: "Resonancia"
        },
        {
          id: 6,
          kind: "dual_audio_record",
          title: "Resonancia",
          audio1: "assets/parte1/test2/resonancia/resonancia1.wav",
          audio2: "assets/parte1/test2/resonancia/resonancia2.wav"
        }
      ]
    },
    {
      id: 3,
      groupId: 2,
      groupTitle: "Evaluacion Motora del Habla",
      name: "Volumen creciente",
      note: "Placeholder.",
      instructions: "Pendiente.",
      description: "Tarea guiada de control de intensidad."
    },
    {
      id: 4,
      groupId: 2,
      groupTitle: "Evaluacion Motora del Habla",
      name: "Habla automatica",
      note: "Placeholder.",
      instructions: "Pendiente.",
      description: "Secuencias automaticas del habla."
    },
    {
      id: 5,
      groupId: 2,
      groupTitle: "Evaluacion Motora del Habla",
      name: "Repeticion de silabas - diadococinesia",
      note: "Placeholder.",
      instructions: "Pendiente.",
      description: "Repeticion secuencial y alternante de silabas."
    },
    {
      id: 6,
      groupId: 2,
      groupTitle: "Evaluacion Motora del Habla",
      name: "Lectura",
      note: "Placeholder.",
      instructions: "Pendiente.",
      description: "Lectura guiada con analisis posterior."
    },
    {
      id: 7,
      groupId: 2,
      groupTitle: "Evaluacion Motora del Habla",
      name: "Diptongos",
      note: "Placeholder.",
      instructions: "Pendiente.",
      description: "Produccion focalizada de diptongos."
    },
    {
      id: 8,
      groupId: 2,
      groupTitle: "Evaluacion Motora del Habla",
      name: "Palabras polisilabicas",
      note: "Placeholder.",
      instructions: "Pendiente.",
      description: "Produccion de palabras polisilabicas."
    },
    {
      id: 9,
      groupId: 2,
      groupTitle: "Evaluacion Motora del Habla",
      name: "Palabras con longitud creciente",
      note: "Placeholder.",
      instructions: "Pendiente.",
      description: "Serie progresiva de longitud lexical."
    },
    {
      id: 10,
      groupId: 2,
      groupTitle: "Evaluacion Motora del Habla",
      name: "Pseudopalabras",
      note: "Placeholder.",
      instructions: "Pendiente.",
      description: "Lectura o repeticion de pseudopalabras."
    },
    {
      id: 11,
      groupId: 2,
      groupTitle: "Evaluacion Motora del Habla",
      name: "Repeticion de frases",
      note: "Placeholder.",
      instructions: "Pendiente.",
      description: "Repeticion guiada de frases."
    },
    {
      id: 12,
      groupId: 2,
      groupTitle: "Evaluacion Motora del Habla",
      name: "Lectura de frases",
      note: "Placeholder.",
      instructions: "Pendiente.",
      description: "Lectura de frases con analisis posterior."
    },
    {
      id: 13,
      groupId: 3,
      groupTitle: "Habla Conectada",
      name: "Habla Conectada",
      note: "Flujo unico con descripcion de imagen, narracion de historia y cierre final.",
      instructions: "La secuencia completa corre dentro del mismo enlace.",
      description: "Descripcion de una imagen, Narracion de una historia y cierre FIN.",
      screens: [
        {
          id: 1,
          kind: "image_single_audio_record",
          section: "descripcion_imagen",
          title: "Descripcion de una imagen",
          image: "assets/parte3/test1.jpg",
          audio: "assets/parte3/audios/instruccion_descripcionimagen.wav",
          outputName: "modulo3_parte3_descripcion_imagen"
        },
        {
          id: 2,
          kind: "story_intro",
          section: "narracion_historia",
          title: "Narracion de una historia",
          image: "assets/parte3/test2_1.png",
          audioTop: "assets/parte3/audios/narracion_historia_h.wav",
          audioBottom: "assets/parte3/audios/narracion_historia_m.wav",
          outputName: "modulo3_parte3_narracion_historia"
        },
        {
          id: 3,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_2.jpg"
        },
        {
          id: 4,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_3.png"
        },
        {
          id: 5,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_4.png"
        },
        {
          id: 6,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_5.png"
        },
        {
          id: 7,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_6.png"
        },
        {
          id: 8,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_7.png"
        },
        {
          id: 9,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_8.png"
        },
        {
          id: 10,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_9.png"
        },
        {
          id: 11,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_10.png"
        },
        {
          id: 12,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_11.png"
        },
        {
          id: 13,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_12.png"
        },
        {
          id: 14,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_13.png"
        },
        {
          id: 15,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_14.png"
        },
        {
          id: 16,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_15.png"
        },
        {
          id: 17,
          kind: "story_image",
          section: "narracion_historia",
          image: "assets/parte3/test2_16.png"
        },
        {
          id: 18,
          kind: "final_record",
          section: "narracion_historia",
          title: "FIN",
          audio: "assets/parte3/audios/narracion_historia_fin.wav",
          outputName: "modulo3_parte3_narracion_historia"
        },
        {
          id: 19,
          kind: "personal_record",
          section: "narracion_personal",
          title: "Narracion personal",
          audio: "assets/parte3/audios/instruccion_narracionpersonal.wav",
          outputName: "modulo3_parte3_narracion_personal"
        }
      ]
    }
  ]
};
