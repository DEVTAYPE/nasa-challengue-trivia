import {
  GameSession,
  CropProgress,
  LevelProgress,
} from "../entities/GameSession";
import { CropType } from "../entities/Crop";

/**
 * Puerto para acceder al repositorio de sesiones de juego
 */
export interface IGameSessionRepository {
  /**
   * Guarda o actualiza la sesión de juego
   */
  saveSession(session: GameSession): Promise<void>;

  /**
   * Obtiene la sesión actual del jugador
   */
  getCurrentSession(): Promise<GameSession | null>;

  /**
   * Limpia la sesión actual
   */
  clearSession(): Promise<void>;

  /**
   * Actualiza el progreso de un cultivo
   */
  updateCropProgress(cropType: CropType, progress: CropProgress): Promise<void>;

  /**
   * Actualiza el progreso de un nivel
   */
  updateLevelProgress(
    cropType: CropType,
    levelId: number,
    progress: LevelProgress
  ): Promise<void>;
}
