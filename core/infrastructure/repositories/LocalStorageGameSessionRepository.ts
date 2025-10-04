import { IGameSessionRepository } from "../../domain/ports/IGameSessionRepository";
import {
  GameSession,
  CropProgress,
  LevelProgress,
} from "../../domain/entities/GameSession";
import { CropType, CROPS } from "../../domain/entities/Crop";
import { GAME_LEVELS } from "../../domain/entities/Level";

/**
 * Implementación usando LocalStorage para persistir la sesión
 */
export class LocalStorageGameSessionRepository
  implements IGameSessionRepository
{
  private readonly SESSION_KEY = "nasa-game-session";

  async saveSession(session: GameSession): Promise<void> {
    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    } catch (error) {
      console.error("Error saving session:", error);
    }
  }

  async getCurrentSession(): Promise<GameSession | null> {
    try {
      const data = localStorage.getItem(this.SESSION_KEY);
      if (!data) return null;

      const session = JSON.parse(data);
      // Convertir fechas de string a Date
      session.startedAt = new Date(session.startedAt);

      return session;
    } catch (error) {
      console.error("Error getting session:", error);
      return null;
    }
  }

  async clearSession(): Promise<void> {
    try {
      localStorage.removeItem(this.SESSION_KEY);
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  }

  async updateCropProgress(
    cropType: CropType,
    progress: CropProgress
  ): Promise<void> {
    const session = await this.getCurrentSession();
    if (!session) return;

    session.cropProgress[cropType] = progress;
    await this.saveSession(session);
  }

  async updateLevelProgress(
    cropType: CropType,
    levelId: number,
    progress: LevelProgress
  ): Promise<void> {
    const session = await this.getCurrentSession();
    if (!session) return;

    if (!session.cropProgress[cropType]) {
      session.cropProgress[cropType] = this.createInitialCropProgress(cropType);
    }

    session.cropProgress[cropType].levelsProgress[levelId] = progress;

    // Actualizar el score total del cultivo
    session.cropProgress[cropType].totalScore = Object.values(
      session.cropProgress[cropType].levelsProgress
    ).reduce((sum, level) => sum + level.score, 0);

    // Si el nivel se completó, desbloquear el siguiente
    if (progress.status === "completed") {
      const nextLevel = GAME_LEVELS.find((l) => l.id === levelId + 1);
      if (nextLevel) {
        if (!session.cropProgress[cropType].levelsProgress[nextLevel.id]) {
          session.cropProgress[cropType].levelsProgress[nextLevel.id] = {
            levelId: nextLevel.id,
            status: "available",
            score: 0,
            correctAnswers: 0,
            totalQuestions: 0,
            answers: [],
          };
        } else if (
          session.cropProgress[cropType].levelsProgress[nextLevel.id].status ===
          "locked"
        ) {
          session.cropProgress[cropType].levelsProgress[nextLevel.id].status =
            "available";
        }
      }
    }

    await this.saveSession(session);
  }

  /**
   * Crea el progreso inicial para un cultivo
   */
  private createInitialCropProgress(cropType: CropType): CropProgress {
    const levelsProgress: Record<number, LevelProgress> = {};

    GAME_LEVELS.forEach((level, index) => {
      levelsProgress[level.id] = {
        levelId: level.id,
        status: index === 0 ? "available" : "locked", // Solo el primero disponible
        score: 0,
        correctAnswers: 0,
        totalQuestions: 0,
        answers: [],
      };
    });

    return {
      cropType,
      currentLevel: 1,
      totalScore: 0,
      levelsProgress,
    };
  }
}
