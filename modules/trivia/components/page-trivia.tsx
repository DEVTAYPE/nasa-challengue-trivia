"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CROPS, useGameStore, Level } from "@/core";
import { GameEntryIcons } from "@/modules/home/components";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TriviaFinishResult } from "./trivia-finish-result";
import { useLanguage } from "@/lib/i18n/language-context";

export const TriviaPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { t, language } = useLanguage();

  // Obtener datos del store
  const session = useGameStore((state) => state.session);
  const currentQuestions = useGameStore((state) => state.currentQuestions);
  const currentQuestionIndex = useGameStore(
    (state) => state.currentQuestionIndex
  );
  const selectedAnswer = useGameStore((state) => state.selectedAnswer);
  const showFeedback = useGameStore((state) => state.showFeedback);
  const answers = useGameStore((state) => state.answers);

  // Acciones del store
  const selectAnswer = useGameStore((state) => state.selectAnswer);
  const submitAnswer = useGameStore((state) => state.submitAnswer);
  const nextQuestion = useGameStore((state) => state.nextQuestion);
  const finishLevel = useGameStore((state) => state.finishLevel);
  const startLevel = useGameStore((state) => state.startLevel);
  const initializeOrContinueSession = useGameStore(
    (state) => state.initializeOrContinueSession
  );

  // Cargar nivel desde query params si es necesario
  useEffect(() => {
    const loadFromQueryParams = async () => {
      const cropParam = searchParams.get("crop");
      const levelParam = searchParams.get("level");

      // Si hay preguntas cargadas, no necesitamos hacer nada
      if (currentQuestions.length > 0) {
        setIsLoading(false);
        return;
      }

      // Si hay parámetros en la URL, inicializar sesión y cargar nivel
      if (cropParam && levelParam) {
        try {
          const cropType = cropParam as "corn" | "potato" | "quinoa";
          const levelId = parseInt(levelParam);

          // Inicializar o continuar sesión con el cultivo
          await initializeOrContinueSession(cropType);

          // Cargar el nivel específico
          await startLevel(levelId);
          setIsLoading(false);
        } catch (error) {
          console.error("Error al cargar nivel desde URL:", error);
          toast.error(
            language === "es"
              ? "Error al cargar el nivel. Redirigiendo..."
              : "Error loading level. Redirecting..."
          );
          router.push("/dashboard-game");
        }
      } else if (currentQuestions.length === 0) {
        toast.error(
          language === "es"
            ? "No hay preguntas cargadas. Redirigiendo..."
            : "No questions loaded. Redirecting..."
        );
        router.push("/dashboard-game");
      } else {
        setIsLoading(false);
      }
    };

    loadFromQueryParams();
  }, [
    searchParams,
    currentQuestions,
    initializeOrContinueSession,
    startLevel,
    router,
  ]);

  // Mostrar pantalla de carga mientras se inicializa
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground font-mono">
            {language === "es" ? "Cargando trivia..." : "Loading trivia..."}
          </p>
        </div>
      </div>
    );
  }

  // Si no hay sesión o preguntas, no renderizar
  if (!session || currentQuestions.length === 0) {
    return null;
  }

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const score = correctAnswers * 20;
  const progress = (correctAnswers / currentQuestions.length) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    selectAnswer(answerIndex);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;
    await submitAnswer();
    // Ya no avanzamos automáticamente, esperamos que el usuario haga clic en "Continuar"
  };

  const handleContinue = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      nextQuestion();
    }
    // Si es la última pregunta, el componente se renderizará como TriviaFinishResult
  };

  const handleRestart = async () => {
    // Reiniciar el nivel actual
    const currentLevel =
      session.cropProgress[session.selectedCrop!].currentLevel;
    const startLevel = useGameStore.getState().startLevel;
    await startLevel(currentLevel);
  };

  // Verificar si terminó el nivel
  // El nivel termina cuando has respondido todas las preguntas
  const isFinished = answers.length === currentQuestions.length;

  // Verificar si es el primer intento y cuántas puede fallar
  const currentLevelData =
    session.cropProgress[session.selectedCrop!]?.levelsProgress[
      session.cropProgress[session.selectedCrop!].currentLevel
    ];
  const isFirstAttempt =
    !currentLevelData || currentLevelData.status !== "completed";

  // Obtener maxQuestionFailed del nivel actual
  const currentLevelInfo = useGameStore
    .getState()
    .getCurrentLevel() as Level | null;
  const maxQuestionFailed = currentLevelInfo?.maxQuestionFailed || 2;

  if (isFinished) {
    return (
      <TriviaFinishResult
        score={score}
        correctAnswers={correctAnswers}
        questions={currentQuestions}
        handleRestart={handleRestart}
        isFirstAttempt={isFirstAttempt}
        maxQuestionFailed={maxQuestionFailed}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2 md:p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl min-h-[90vh] lg:h-[90vh] flex flex-col">
        <div className="mb-2 md:mb-4 text-center">
          {/* <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
            Trivia de Agricultura
          </h1> */}
          <p className="text-sm md:text-lg text-muted-foreground font-mono font-bold">
            {language === "es"
              ? `COMIENZA LA TRIVIA: Cultivo de ${
                  CROPS[session.selectedCrop!].name
                } - Nivel ${
                  session.cropProgress[session.selectedCrop!].currentLevel
                }`
              : `START TRIVIA: ${
                  CROPS[session.selectedCrop!].name
                } Crop - Level ${
                  session.cropProgress[session.selectedCrop!].currentLevel
                }`}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-3 md:gap-4 flex-1 min-h-0">
          {/* Left Column - triviaQuestions */}
          <div className="flex flex-col gap-2 md:gap-3 min-h-0">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 flex-shrink-0">
              <CardContent className="p-3 md:p-4">
                <Link
                  href={`/dashboard-game?crop=${session.selectedCrop}`}
                  className="text-xs md:text-sm font-medium text-primary hover:underline block mb-2"
                >
                  ← {language === "es" ? "Volver" : "Back"}
                </Link>
                <section>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm font-medium">
                      {t.trivia.question} {currentQuestionIndex + 1}{" "}
                      {t.trivia.of} {currentQuestions.length}
                    </span>
                    <span className="text-xs md:text-sm font-medium text-secondary">
                      {score} pts
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent via-secondary to-primary transition-all duration-500"
                      style={{
                        width: `${
                          ((currentQuestionIndex + 1) /
                            currentQuestions.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </section>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50 flex-1 min-h-0 flex flex-col p-0">
              <CardContent className="p-3 md:p-4 space-y-3 md:space-y-4 flex-1 overflow-y-auto">
                <div>
                  <Badge className="mb-2 md:mb-3 bg-secondary text-secondary-foreground text-xs">
                    {t.trivia.question} {currentQuestionIndex + 1}
                  </Badge>
                  <h2 className="text-sm md:text-base lg:text-lg font-bold text-balance leading-relaxed font-mono">
                    {currentQuestion.question}
                  </h2>
                </div>

                <div className="space-y-2">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrectOption =
                      index === currentQuestion.correctAnswer;
                    const showCorrect = showFeedback && isCorrectOption;
                    const showIncorrect =
                      showFeedback && isSelected && !isCorrectOption;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showFeedback}
                        className={`w-full text-left p-2.5 md:p-3 rounded-lg border-2 transition-all duration-300 ${
                          showCorrect
                            ? "bg-accent/20 border-accent"
                            : showIncorrect
                            ? "bg-destructive/20 border-destructive"
                            : isSelected
                            ? "bg-primary/20 border-primary"
                            : "bg-muted/30 border-border hover:border-primary/50 hover:bg-muted/50"
                        } ${
                          showFeedback ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs md:text-sm font-medium font-mono leading-snug">
                            {option}
                          </span>
                          {showCorrect && (
                            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" />
                          )}
                          {showIncorrect && (
                            <XCircle className="w-4 h-4 md:w-5 md:h-5 text-destructive flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {showFeedback && (
                  <div
                    className={`p-3 md:p-4 rounded-lg space-y-2 md:space-y-3 ${
                      isCorrect
                        ? "bg-accent/10 border border-accent/50"
                        : "bg-destructive/10 border border-destructive/50"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 md:w-5 md:h-5 text-destructive flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div
                          className={`font-semibold text-xs md:text-sm mb-1 ${
                            isCorrect ? "text-accent" : "text-destructive"
                          }`}
                        >
                          {isCorrect
                            ? t.trivia.correctAnswer
                            : t.trivia.incorrectAnswer}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleContinue}
                      className={`w-full h-9 md:h-10 text-sm ${
                        isCorrect
                          ? "bg-accent hover:bg-accent/90"
                          : "bg-primary hover:bg-primary/90"
                      }`}
                    >
                      {currentQuestionIndex < currentQuestions.length - 1
                        ? t.trivia.continue
                        : language === "es"
                        ? "Ver Resultados"
                        : "View Results"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}

                {!showFeedback && (
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                    className="w-full h-9 md:h-10 text-sm"
                  >
                    {t.trivia.submit}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Mountain Visual (Hidden on mobile) */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden flex-col hidden lg:flex">
            <CardContent className="p-4 md:p-6 flex flex-col h-full">
              <div className="text-center mb-3 md:mb-4">
                <h3 className="text-lg md:text-xl font-bold mb-1">
                  {language === "es"
                    ? "Escalando la Montaña"
                    : "Climbing the Mountain"}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground font-mono">
                  {correctAnswers} {t.trivia.of} {currentQuestions.length}{" "}
                  {t.trivia.finish.correct.toLowerCase()}
                </p>
              </div>

              <div className="relative flex-1 bg-gradient-to-b from-sky-300/20 via-sky-200/10 to-green-900/20 rounded-xl overflow-hidden">
                {/* Sun */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-secondary rounded-full blur-sm animate-pulse" />
                <div className="absolute top-4 right-4 w-10 h-10 bg-secondary/80 rounded-full" />

                {/* Clouds */}
                <div className="absolute top-8 left-8 w-16 h-6 bg-white/20 rounded-full blur-sm" />
                <div className="absolute top-16 right-16 w-20 h-8 bg-white/20 rounded-full blur-sm" />

                {/* Mountain path - zigzag */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 500"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 50 480 L 100 400 L 150 380 L 200 300 L 250 280 L 300 200 L 350 180 L 380 100"
                    stroke="rgba(139, 92, 46, 0.3)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="10,5"
                  />
                </svg>

                {/* Mountain silhouette */}
                <svg
                  className="absolute bottom-0 w-full h-3/4"
                  viewBox="0 0 400 300"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0 300 L 100 200 L 200 100 L 300 150 L 400 50 L 400 300 Z"
                    fill="url(#mountainGradient)"
                    opacity="0.3"
                  />
                  <defs>
                    <linearGradient
                      id="mountainGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="rgb(34, 197, 94)"
                        stopOpacity="0.4"
                      />
                      <stop
                        offset="100%"
                        stopColor="rgb(22, 101, 52)"
                        stopOpacity="0.6"
                      />
                    </linearGradient>
                  </defs>
                </svg>

                {/* icon character climbing */}
                <div
                  className="absolute transition-all duration-1000 ease-out"
                  style={{
                    left: `${20 + (progress / 100) * 70}%`,
                    bottom: `${10 + (progress / 100) * 75}%`,
                    transform: "translate(-50%, 50%)",
                  }}
                >
                  {/* Renderizar icono según el cultivo seleccionado */}
                  {session.selectedCrop === "corn" && (
                    <GameEntryIcons.corn
                      className="relative animate-bounce w-16 h-16 "
                      style={{ animationDuration: "2s" }}
                    />
                  )}
                  {session.selectedCrop === "potato" && (
                    <GameEntryIcons.potato
                      className="relative animate-bounce w-16 h-16 "
                      style={{ animationDuration: "2s" }}
                    />
                  )}
                  {session.selectedCrop === "quinoa" && (
                    <GameEntryIcons.quinoa
                      className="relative animate-bounce w-16 h-16 "
                      style={{ animationDuration: "2s" }}
                    />
                  )}
                </div>

                {/* Progress markers */}
                {[...Array(currentQuestions.length)].map((_, i) => {
                  const markerProgress =
                    ((i + 1) / currentQuestions.length) * 100;
                  return (
                    <div
                      key={i}
                      className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${
                        i < correctAnswers
                          ? "bg-accent scale-125"
                          : "bg-muted/50"
                      }`}
                      style={{
                        left: `${20 + (markerProgress / 100) * 70}%`,
                        bottom: `${10 + (markerProgress / 100) * 75}%`,
                        transform: "translate(-50%, 50%)",
                      }}
                    />
                  );
                })}

                {/* Peak flag */}
                <div className="absolute top-16 right-12 animate-wave">
                  <div className="w-1 h-12 bg-foreground/30" />
                  <div className="absolute top-0 left-1 w-8 h-5 bg-primary/60 rounded-r" />
                </div>

                {/* Progress percentage */}
                <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                  <div className="text-2xl font-bold text-accent">
                    {Math.round(progress)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Progreso</div>
                </div>
              </div>

              <div className="mt-3 md:mt-4 grid grid-cols-5 gap-2">
                {[...Array(currentQuestions.length)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i < correctAnswers ? "bg-accent" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Progress Indicator - Only visible on mobile */}
        <div className="lg:hidden mt-3 md:mt-4">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {session.selectedCrop === "corn" && (
                    <GameEntryIcons.corn className="w-8 h-8" />
                  )}
                  {session.selectedCrop === "potato" && (
                    <GameEntryIcons.potato className="w-8 h-8" />
                  )}
                  {session.selectedCrop === "quinoa" && (
                    <GameEntryIcons.quinoa className="w-8 h-8" />
                  )}
                  <div>
                    <p className="text-xs font-semibold">Progreso</p>
                    <p className="text-xs text-muted-foreground">
                      {correctAnswers} de {currentQuestions.length} correctas
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent">
                    {Math.round(progress)}%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[...Array(currentQuestions.length)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i < correctAnswers ? "bg-accent" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
