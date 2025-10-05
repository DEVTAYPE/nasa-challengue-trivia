import { CropType } from "./Crop";

/**
 * Entidad de la Pregunta
 */
export interface Question {
  id: string;
  cropType: CropType;
  levelId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  optionExplanations: string[];
  points: number;
}

/**
 * Respuesta del usuario
 */
export interface Answer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number; // en segundos
}
