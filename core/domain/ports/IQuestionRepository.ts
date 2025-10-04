import { Question } from "../entities/Question";
import { CropType } from "../entities/Crop";

/**
 * Puerto para acceder al repositorio de preguntas
 * Define el contrato que debe cumplir cualquier implementación
 */
export interface IQuestionRepository {
  /**
   * Obtiene todas las preguntas de un cultivo y nivel específico
   */
  getQuestionsByCropAndLevel(
    cropType: CropType,
    levelId: number
  ): Promise<Question[]>;

  /**
   * Obtiene una pregunta por su ID
   */
  getQuestionById(questionId: string): Promise<Question | null>;

  /**
   * Obtiene todas las preguntas de un cultivo
   */
  getQuestionsByCrop(cropType: CropType): Promise<Question[]>;
}
