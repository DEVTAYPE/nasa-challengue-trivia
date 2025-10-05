import { create } from "zustand";
import { CropType } from "../domain/entities/Crop";
import { Level, LevelStatus } from "../domain/entities/Level";
import { Question, Answer } from "../domain/entities/Question";
import { GameSession, LevelProgress } from "../domain/entities/GameSession";
import {
  IQuestionRepository,
  Language,
} from "../domain/ports/IQuestionRepository";
import { IGameSessionRepository } from "../domain/ports/IGameSessionRepository";
import { InMemoryQuestionRepository } from "../infrastructure/repositories/InMemoryQuestionRepository";
import { LocalStorageGameSessionRepository } from "../infrastructure/repositories/LocalStorageGameSessionRepository";
import { GAME_LEVELS } from "../domain/entities/Level";
import { PlayerEntity } from "../domain/entities/Player";

/**
 * Estado del Store
 */
interface GameStore {
  // Repositorios (puertos)
  questionRepository: IQuestionRepository;
  sessionRepository: IGameSessionRepository;

  // Estado de la sesión
  session: GameSession | null;
  isLoading: boolean;
  error: string | null;

  // Idioma actual
  currentLanguage: Language;

  // Estado de la trivia actual
  currentQuestions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
  answers: Answer[];

  // Acciones de sesión
  initializeSession: (playerName: string, cropType: CropType) => Promise<void>;
  initializeOrContinueSession: (
    cropType: CropType,
    playerName?: string
  ) => Promise<void>;
  loadSession: () => Promise<void>;
  selectCrop: (cropType: CropType) => Promise<void>;
  clearSession: () => Promise<void>;

  // Acción de idioma
  setLanguage: (language: Language) => void;

  // Acciones de nivel
  startLevel: (levelId: number) => Promise<void>;
  getLevelsForCurrentCrop: () => Level[];

  // Acciones de trivia
  selectAnswer: (answerIndex: number) => void;
  submitAnswer: () => Promise<void>;
  nextQuestion: () => void;
  finishLevel: () => Promise<void>;

  // Getters
  getCurrentLevel: () => Level | null;
  getCurrentQuestion: () => Question | null;
  getLevelProgress: (levelId: number) => LevelProgress | null;
}

/**
 * Store principal del juego usando Zustand
 */
export const useGameStore = create<GameStore>((set, get) => ({
  // Inicializar repositorios
  questionRepository: new InMemoryQuestionRepository(),
  sessionRepository: new LocalStorageGameSessionRepository(),

  // Estado inicial
  session: null,
  isLoading: false,
  error: null,
  currentLanguage: "es",
  currentQuestions: [],
  currentQuestionIndex: 0,
  selectedAnswer: null,
  showFeedback: false,
  answers: [],

  /**
   * Inicializa una nueva sesión de juego
   */
  initializeSession: async (playerName: string, cropType: CropType) => {
    set({ isLoading: true, error: null });

    try {
      const player = PlayerEntity.create(playerName);

      // Crear progreso inicial para todos los cultivos
      const cropProgress: GameSession["cropProgress"] = {
        corn: createInitialCropProgress("corn"),
        potato: createInitialCropProgress("potato"),
        quinoa: createInitialCropProgress("quinoa"),
      };

      const newSession: GameSession = {
        playerId: player.id,
        playerName: player.name,
        selectedCrop: cropType,
        currentLevel: 1,
        cropProgress,
        startedAt: new Date(),
      };

      await get().sessionRepository.saveSession(newSession);
      set({ session: newSession, isLoading: false });
    } catch (error) {
      set({
        error: "Error al inicializar la sesión",
        isLoading: false,
      });
    }
  },

  /**
   * Inicializa o continúa una sesión existente desde el mapa
   * Si existe sesión, la actualiza con el cultivo seleccionado
   * Si no existe, crea una nueva con nombre por defecto
   */
  initializeOrContinueSession: async (
    cropType: CropType,
    playerName?: string
  ) => {
    set({ isLoading: true, error: null });

    try {
      const existingSession = await get().sessionRepository.getCurrentSession();

      if (existingSession) {
        // Ya existe sesión, solo actualizamos el cultivo
        const updatedSession: GameSession = {
          ...existingSession,
          selectedCrop: cropType,
          currentLevel: existingSession.cropProgress[cropType].currentLevel,
        };

        await get().sessionRepository.saveSession(updatedSession);
        set({ session: updatedSession, isLoading: false });
      } else {
        // No existe sesión, crear nueva con nombre por defecto
        const defaultName = playerName || "CULTIVADOR";
        const player = PlayerEntity.create(defaultName);

        const cropProgress: GameSession["cropProgress"] = {
          corn: createInitialCropProgress("corn"),
          potato: createInitialCropProgress("potato"),
          quinoa: createInitialCropProgress("quinoa"),
        };

        const newSession: GameSession = {
          playerId: player.id,
          playerName: player.name,
          selectedCrop: cropType,
          currentLevel: 1,
          cropProgress,
          startedAt: new Date(),
        };

        await get().sessionRepository.saveSession(newSession);
        set({ session: newSession, isLoading: false });
      }
    } catch (error) {
      set({
        error: "Error al inicializar la sesión",
        isLoading: false,
      });
    }
  },

  /**
   * Carga la sesión existente desde localStorage
   */
  loadSession: async () => {
    set({ isLoading: true });

    try {
      const session = await get().sessionRepository.getCurrentSession();
      set({ session, isLoading: false });
    } catch (error) {
      set({ error: "Error al cargar la sesión", isLoading: false });
    }
  },

  /**
   * Selecciona un cultivo
   */
  selectCrop: async (cropType: CropType) => {
    const { session, sessionRepository } = get();
    if (!session) return;

    const updatedSession = {
      ...session,
      selectedCrop: cropType,
      currentLevel: 1,
    };

    await sessionRepository.saveSession(updatedSession);
    set({ session: updatedSession });
  },

  /**
   * Limpia la sesión actual
   */
  clearSession: async () => {
    await get().sessionRepository.clearSession();
    set({
      session: null,
      currentQuestions: [],
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showFeedback: false,
      answers: [],
    });
  },

  /**
   * Establece el idioma del juego
   */
  setLanguage: (language: Language) => {
    set({ currentLanguage: language });
  },

  /**
   * Inicia un nivel cargando sus preguntas
   */
  startLevel: async (levelId: number) => {
    const { session, questionRepository, currentLanguage } = get();
    if (!session || !session.selectedCrop) return;

    set({ isLoading: true });

    try {
      const questions = await questionRepository.getQuestionsByCropAndLevel(
        session.selectedCrop,
        levelId,
        currentLanguage
      );

      set({
        currentQuestions: questions,
        currentQuestionIndex: 0,
        selectedAnswer: null,
        showFeedback: false,
        answers: [],
        isLoading: false,
        session: {
          ...session,
          currentLevel: levelId,
        },
      });
    } catch (error) {
      set({ error: "Error al cargar las preguntas", isLoading: false });
    }
  },

  /**
   * Obtiene los niveles con el estado de progreso del cultivo actual
   */
  getLevelsForCurrentCrop: () => {
    const { session } = get();
    if (!session || !session.selectedCrop) return [];

    const cropProgress = session.cropProgress[session.selectedCrop];
    if (!cropProgress) return [];

    return GAME_LEVELS.map((level) => {
      const progress = cropProgress.levelsProgress[level.id];
      return {
        ...level,
        status: progress?.status || "locked",
      };
    });
  },

  /**
   * Selecciona una respuesta
   */
  selectAnswer: (answerIndex: number) => {
    if (get().showFeedback) return;
    set({ selectedAnswer: answerIndex });
  },

  /**
   * Envía la respuesta seleccionada
   */
  submitAnswer: async () => {
    const { selectedAnswer, currentQuestions, currentQuestionIndex, answers } =
      get();

    if (selectedAnswer === null) return;

    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent: 0, // TODO: Implementar timer
    };

    set({
      showFeedback: true,
      answers: [...answers, newAnswer],
    });
  },

  /**
   * Avanza a la siguiente pregunta
   */
  nextQuestion: () => {
    const { currentQuestions, currentQuestionIndex } = get();

    if (currentQuestionIndex < currentQuestions.length - 1) {
      set({
        currentQuestionIndex: currentQuestionIndex + 1,
        selectedAnswer: null,
        showFeedback: false,
      });
    }
  },

  /**
   * Finaliza el nivel y guarda el progreso
   */
  finishLevel: async () => {
    const { session, answers, currentQuestions, sessionRepository } = get();

    if (!session || !session.selectedCrop) return;

    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    const incorrectAnswers = answers.length - correctAnswers;
    const score = correctAnswers * 20; // 20 puntos por respuesta correcta

    // Obtener el nivel actual para verificar maxQuestionFailed
    const currentLevelData = GAME_LEVELS.find(
      (l) => l.id === session.currentLevel
    );
    const maxQuestionFailed = currentLevelData?.maxQuestionFailed || 2;

    // Verificar si es el primer intento (status === "available")
    const existingProgress =
      session.cropProgress[session.selectedCrop]?.levelsProgress[
        session.currentLevel!
      ];
    const isFirstAttempt =
      !existingProgress || existingProgress.status !== "completed";

    // Determinar si pasó el nivel
    // Solo aplicar la restricción de maxQuestionFailed en el primer intento
    let levelStatus: LevelStatus = "completed";
    if (isFirstAttempt && incorrectAnswers > maxQuestionFailed) {
      levelStatus = "available"; // No pasó, sigue disponible para reintentar
    }

    const levelProgress: LevelProgress = {
      levelId: session.currentLevel!,
      status: levelStatus,
      score,
      correctAnswers,
      totalQuestions: currentQuestions.length,
      completedAt: levelStatus === "completed" ? new Date() : undefined,
      answers,
    };

    await sessionRepository.updateLevelProgress(
      session.selectedCrop,
      session.currentLevel!,
      levelProgress
    );

    // Recargar sesión para reflejar cambios
    const updatedSession = await sessionRepository.getCurrentSession();
    set({ session: updatedSession });
  },

  /**
   * Obtiene el nivel actual
   */
  getCurrentLevel: () => {
    const { session } = get();
    if (!session || !session.currentLevel || !session.selectedCrop) return null;

    const baseLevel = GAME_LEVELS.find((l) => l.id === session.currentLevel);
    if (!baseLevel) return null;

    const progress =
      session.cropProgress[session.selectedCrop]?.levelsProgress[baseLevel.id];

    return {
      ...baseLevel,
      status: progress?.status || "locked",
    } as Level;
  },

  /**
   * Obtiene la pregunta actual
   */
  getCurrentQuestion: () => {
    const { currentQuestions, currentQuestionIndex } = get();
    return currentQuestions[currentQuestionIndex] || null;
  },

  /**
   * Obtiene el progreso de un nivel específico
   */
  getLevelProgress: (levelId: number) => {
    const { session } = get();
    if (!session || !session.selectedCrop) return null;

    const cropProgress = session.cropProgress[session.selectedCrop];
    return cropProgress?.levelsProgress[levelId] || null;
  },
}));

/**
 * Helper para crear progreso inicial de un cultivo
 */
function createInitialCropProgress(cropType: CropType) {
  const levelsProgress: Record<number, LevelProgress> = {};

  GAME_LEVELS.forEach((level, index) => {
    levelsProgress[level.id] = {
      levelId: level.id,
      status: index === 0 ? "available" : "locked",
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
