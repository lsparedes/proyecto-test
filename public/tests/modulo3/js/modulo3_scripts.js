export const module3Tests = [
  {
    id: 1,
    name: "Procesos Motores Básicos",
    parts: [
      {
        type: "orofacial_video_sequence",
        screens: [
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/1.wav" },

          { kind: "section", title: "Cara" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/2.wav" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/3.wav" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/4.wav" },

          { kind: "section", title: "Mandíbula" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/5.wav" },

          { kind: "section", title: "Lengua" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/6.wav" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/7.wav" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/8.wav" },

          { kind: "section", title: "Paladar blando" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/9.wav" },

          { kind: "section", title: "Praxias orofaciales" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/10.wav" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/11.wav" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/12.wav" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/13.wav" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/14.wav" },
          { kind: "audio", audio: "/tests/modulo3/test1/audio/parte1/15.wav" }
        ]
      },
      {
        type: "breathing_phonation_resonance_video",
        title: "Evaluación integrada de la Respiración, la Fonación y la Resonancia",
        audio1: "/tests/modulo3/test1/audio/parte2/1.wav"
      }
    ]
  },

  {
    id: 2,
    name: "Evaluación Motora del Habla",
    parts: [
      {
        type: "motor_speech_record",
        title: "Evaluación Motora del Habla",
        audio1: "/tests/modulo3/test2/audio/parte1/1.wav"
      }
    ]
  },

  {
    id: 3,
    name: "Habla Conectada",
    parts: [
      {
        type: "image_description_audio_record",
        image: "/tests/modulo3/test3/1.png",
        instructionAudio: "/tests/modulo3/test3/audio/parte1/1.wav"
      },
      {
        type: "story_narration_sequence",
        screens: [
          {
            image: "/tests/modulo3/test3/2.png",
            audio1: "/tests/modulo3/test3/audio/parte2/1.wav",
            audio2: "/tests/modulo3/test3/audio/parte2/2.wav"
          },
          {
            image: "/tests/modulo3/test3/3.png"
          },
          {
            image: "/tests/modulo3/test3/4.png"
          },
          {
            image: "/tests/modulo3/test3/5.png"
          },
          {
            image: "/tests/modulo3/test3/6.png"
          },
          {
            image: "/tests/modulo3/test3/7.png"
          },
          {
            image: "/tests/modulo3/test3/8.png"
          },
          {
            image: "/tests/modulo3/test3/9.png"
          },
          {
            image: "/tests/modulo3/test3/10.png"
          },
          {
            image: "/tests/modulo3/test3/11.png"
          },
          {
            image: "/tests/modulo3/test3/12.png"
          },
          {
            image: "/tests/modulo3/test3/13.png"
          },
          {
            image: "/tests/modulo3/test3/14.png"
          },
          {
            image: "/tests/modulo3/test3/15.png"
          },
          {
            image: "/tests/modulo3/test3/16.png"
          },
          {
            type: "final_record",
            text: "FIN",
            audio1: "/tests/modulo3/test3/audio/parte2/final.wav"
          }
        ]
      },
      {
        type: "personal_narration_record",
        audio1: "/tests/modulo3/test3/audio/parte3/1.wav"
      }
    ]
  }
];