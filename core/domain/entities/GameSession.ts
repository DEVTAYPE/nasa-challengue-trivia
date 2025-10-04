import { CropType } from "./Crop";
import { Level, LevelStatus } from "./Level";
import { Answer } from "./Question";

/**
 * Progreso del jugador en un nivel específico
 */
export interface LevelProgress {
  levelId: number;
  status: LevelStatus;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt?: Date;
  answers: Answer[];
}

/**
 * Progreso del jugador en un cultivo
 */
export interface CropProgress {
  cropType: CropType;
  currentLevel: number;
  totalScore: number;
  levelsProgress: Record<number, LevelProgress>;
}

/**
 * Sesión de juego actual
 */
export interface GameSession {
  playerId: string;
  playerName: string;
  selectedCrop: CropType | null;
  currentLevel: number | null;
  cropProgress: Record<CropType, CropProgress>;
  startedAt: Date;
}
