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
          text: "Presiona el audio para escuchar la instruccion inicial y luego usa la flecha para continuar.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/instruction.wav"
        },
        {
          id: 2,
          kind: "label",
          label: "Cara",
          text: "Cara"
        },
        {
          id: 3,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/cara-1.wav"
        },
        {
          id: 4,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/cara-2.wav"
        },
        {
          id: 5,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/cara-3.wav"
        },
        {
          id: 6,
          kind: "label",
          label: "Mandibula",
          text: "Mandibula"
        },
        {
          id: 7,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/mandibula-1.wav"
        },
        {
          id: 8,
          kind: "label",
          label: "Lengua",
          text: "Lengua"
        },
        {
          id: 9,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/lengua-1.wav"
        },
        {
          id: 10,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/lengua-2.wav"
        },
        {
          id: 11,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/lengua-3.wav"
        },
        {
          id: 12,
          kind: "label",
          label: "Paladar blando",
          text: "Paladar blando"
        },
        {
          id: 13,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/paladar-blando-1.wav"
        },
        {
          id: 14,
          kind: "label",
          label: "Praxias orofaciales",
          text: "Praxias orofaciales"
        },
        {
          id: 15,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/praxias-orofaciales-1.wav"
        },
        {
          id: 16,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/praxias-orofaciales-2.wav"
        },
        {
          id: 17,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/praxias-orofaciales-3.wav"
        },
        {
          id: 18,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/praxias-orofaciales-4.wav"
        },
        {
          id: 19,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/praxias-orofaciales-5.wav"
        },
        {
          id: 20,
          kind: "record",
          label: "",
          title: "",
          text: "Reproduce el audio, observa la camara activa y controla la grabacion.",
          audio: "/tests/modulo3/assets/Audio/part1/test1/praxias-orofaciales-6.wav"
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
          audio1: "/tests/modulo3/assets/Audio/part1/test2/espiracion-1.wav",
          audio2: "/tests/modulo3/assets/Audio/part1/test2/espiracion-2.wav"
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
          audio1: "/tests/modulo3/assets/Audio/part1/test2/fonacion-1.wav",
          audio2: "/tests/modulo3/assets/Audio/part1/test2/fonacion-2.wav"
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
          audio1: "/tests/modulo3/assets/Audio/part1/test2/resonancia-1.wav",
          audio2: "/tests/modulo3/assets/Audio/part1/test2/resonancia-2.wav"
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
      name: "Descripcion de una imagen",
      note: "Placeholder.",
      instructions: "Pendiente.",
      description: "Produccion discursiva a partir de una imagen."
    },
    {
      id: 14,
      groupId: 3,
      groupTitle: "Habla Conectada",
      name: "Narracion de una historia",
      note: "Placeholder.",
      instructions: "Pendiente.",
      description: "Relato estructurado basado en una historia."
    },
    {
      id: 15,
      groupId: 3,
      groupTitle: "Habla Conectada",
      name: "Narracion personal",
      note: "Placeholder.",
      instructions: "Pendiente.",
      description: "Narracion autobiografica guiada."
    }
  ]
};
