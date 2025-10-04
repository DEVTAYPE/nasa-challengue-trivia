import { IQuestionRepository } from "../../domain/ports/IQuestionRepository";
import { Question } from "../../domain/entities/Question";
import { CropType } from "../../domain/entities/Crop";
import { cornQuestions } from "../data/cornQuestions";
import { potatoQuestions } from "../data/potatoQuestions";
import { quinoaQuestions } from "../data/quinoaQuestions";

/**
 * Implementación en memoria del repositorio de preguntas
 * Usa datos estáticos pero con la misma interfaz que usaría una base de datos
 */
export class InMemoryQuestionRepository implements IQuestionRepository {
  private questions: Question[];

  constructor() {
    // Combinar todas las preguntas
    this.questions = [...cornQuestions, ...potatoQuestions, ...quinoaQuestions];
  }

  async getQuestionsByCropAndLevel(
    cropType: CropType,
    levelId: number
  ): Promise<Question[]> {
    // Simular latencia de red (opcional)
    await this.simulateDelay();

    return this.questions.filter(
      (q) => q.cropType === cropType && q.levelId === levelId
    );
  }

  async getQuestionById(questionId: string): Promise<Question | null> {
    await this.simulateDelay();

    return this.questions.find((q) => q.id === questionId) || null;
  }

  async getQuestionsByCrop(cropType: CropType): Promise<Question[]> {
    await this.simulateDelay();

    return this.questions.filter((q) => q.cropType === cropType);
  }

  /**
   * Simula un pequeño delay como si fuera una llamada a API
   */
  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
}
