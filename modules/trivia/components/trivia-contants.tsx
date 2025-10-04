export interface IQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const triviaQuestions: IQuestion[] = [
  {
    id: 1,
    question: "¿Cuál es el nombre científico del maíz?",
    options: [
      "Triticum aestivum",
      "Zea mays",
      "Oryza sativa",
      "Solanum tuberosum",
    ],
    correctAnswer: 1,
    explanation:
      "Zea mays es el nombre científico del maíz, una planta originaria de Mesoamérica.",
  },
  {
    id: 2,
    question: "¿Cuántos días aproximadamente tarda el maíz en germinar?",
    options: ["3-5 días", "7-10 días", "15-20 días", "25-30 días"],
    correctAnswer: 1,
    explanation:
      "El maíz generalmente germina entre 7 y 10 días después de la siembra en condiciones óptimas.",
  },
  {
    id: 3,
    question: "¿Qué nutriente es más importante para el crecimiento del maíz?",
    options: ["Calcio", "Nitrógeno", "Hierro", "Zinc"],
    correctAnswer: 1,
    explanation:
      "El nitrógeno es esencial para el crecimiento vegetativo y el desarrollo de las hojas del maíz.",
  },
  {
    id: 4,
    question: "¿A qué temperatura óptima germina el maíz?",
    options: ["5-10°C", "15-18°C", "25-30°C", "35-40°C"],
    correctAnswer: 2,
    explanation:
      "La temperatura óptima para la germinación del maíz está entre 25-30°C.",
  },
  {
    id: 5,
    question: "¿Cuánta agua necesita el maíz durante su ciclo de crecimiento?",
    options: ["200-300 mm", "400-600 mm", "800-1000 mm", "1200-1500 mm"],
    correctAnswer: 1,
    explanation:
      "El maíz requiere entre 400-600 mm de agua durante todo su ciclo de crecimiento.",
  },
];
