import { CropType } from "../../domain/entities/Crop";
import { Question } from "../../domain/entities/Question";
import {
  IQuestionRepository,
  Language,
} from "../../domain/ports/IQuestionRepository";
import { cornQuestions } from "../data/cornQuestions-new";
import { potatoQuestions } from "../data/potatoQuestions-new";
import { quinoaQuestions } from "../data/quinoaQuestions-new";
import { cornQuestionsIngles } from "../data/cornQuestioningles";
import { potatoQuestionsInEnglish } from "../data/portatoQuestionIngles";
import { quinoaQuestionIngles } from "../data/quinoaQuestionIngles";

/**
 * Implementación en memoria del repositorio de preguntas
 * Usa datos estáticos pero con la misma interfaz que usaría una base de datos
 * Soporta múltiples idiomas (español e inglés)
 */
export class InMemoryQuestionRepository implements IQuestionRepository {
  private questionsEs: Question[];
  private questionsEn: Question[];

  constructor() {
    // Combinar todas las preguntas en español
    this.questionsEs = [
      ...cornQuestions,
      ...potatoQuestions,
      ...quinoaQuestions,
    ];

    // Combinar todas las preguntas en inglés
    this.questionsEn = [
      ...cornQuestionsIngles,
      ...potatoQuestionsInEnglish,
      ...quinoaQuestionIngles,
    ];
  }

  /**
   * Obtiene el conjunto de preguntas según el idioma
   */
  private getQuestionsByLanguage(language: Language = "es"): Question[] {
    return language === "en" ? this.questionsEn : this.questionsEs;
  }

  async getQuestionsByCropAndLevel(
    cropType: CropType,
    levelId: number,
    language: Language = "es"
  ): Promise<Question[]> {
    // Simular latencia de red (opcional)
    await this.simulateDelay();

    const questions = this.getQuestionsByLanguage(language);
    return questions.filter(
      (q) => q.cropType === cropType && q.levelId === levelId
    );
  }

  async getQuestionById(
    questionId: string,
    language: Language = "es"
  ): Promise<Question | null> {
    await this.simulateDelay();

    const questions = this.getQuestionsByLanguage(language);
    return questions.find((q) => q.id === questionId) || null;
  }

  async getQuestionsByCrop(
    cropType: CropType,
    language: Language = "es"
  ): Promise<Question[]> {
    await this.simulateDelay();

    const questions = this.getQuestionsByLanguage(language);
    return questions.filter((q) => q.cropType === cropType);
  }

  /**
   * Simula un pequeño delay como si fuera una llamada a API
   */
  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
}
