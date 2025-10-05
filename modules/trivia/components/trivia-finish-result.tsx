"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGameStore, Question } from "@/core";
import { useLanguage } from "@/lib/i18n/language-context";

interface TriviaFinishResultProps {
  score: number;
  correctAnswers: number;
  questions: Array<Question>;
  handleRestart: () => void;
  isFirstAttempt: boolean;
  maxQuestionFailed: number;
}

export const TriviaFinishResult: React.FC<TriviaFinishResultProps> = ({
  score,
  correctAnswers,
  questions,
  handleRestart,
  isFirstAttempt,
  maxQuestionFailed,
}) => {
  const router = useRouter();
  const finishLevel = useGameStore((state) => state.finishLevel);
  const { t, language } = useLanguage();

  // Calcular si pasó el nivel
  const incorrectAnswers = questions.length - correctAnswers;
  const passed = !isFirstAttempt || incorrectAnswers <= maxQuestionFailed;

  const handleBackToDashboard = async () => {
    // Terminar el nivel guardará el progreso
    await finishLevel();
    router.push("/dashboard-game");
  };
  return (
    <div className="h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <Card className="w-full max-w-3xl bg-card/90 backdrop-blur-sm border-border/50 relative z-10 animate-in zoom-in duration-500">
        <CardContent className="p-8 text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              {passed ? (
                <>
                  <Trophy className="w-20 h-20 text-secondary animate-bounce" />
                  <Sparkles className="w-6 h-6 text-secondary absolute -top-1 -right-1 animate-spin" />
                </>
              ) : (
                <div className="w-20 h-20 flex items-center justify-center text-6xl">
                  😞
                </div>
              )}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
            {passed ? t.trivia.finish.completed : t.trivia.finish.notPassed}
          </h1>

          {!passed && isFirstAttempt && (
            <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4">
              <p className="text-sm text-destructive font-semibold mb-1">
                ❌ {t.trivia.finish.tooManyWrong}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.trivia.finish.failed} {incorrectAnswers} {t.trivia.of}{" "}
                {questions.length}{" "}
                {language === "es" ? "preguntas" : "questions"}.{" "}
                {t.trivia.finish.maxAllowed} {maxQuestionFailed}{" "}
                {language === "es"
                  ? "para pasar al siguiente nivel"
                  : "to pass to the next level"}
                .
              </p>
              <p className="text-xs text-primary font-semibold mt-2">
                💪{" "}
                {language === "es"
                  ? "¡No te rindas! Reinténtalo y demuestra lo que sabes."
                  : "Don't give up! Try again and show what you know."}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-4xl font-bold text-secondary mb-1">
                {score}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.trivia.finish.rating}
              </div>
            </div>

            <div className="bg-accent/10 rounded-lg p-4">
              <div className="text-4xl font-bold text-accent">
                {correctAnswers}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.trivia.finish.correct}
              </div>
            </div>

            <div className="bg-destructive/10 rounded-lg p-4">
              <div className="text-4xl font-bold text-destructive">
                {questions.length - correctAnswers}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.trivia.finish.incorrect}
              </div>
            </div>
          </div>

          <div
            className={`rounded-lg p-3 ${
              passed ? "bg-muted/30" : "bg-destructive/10"
            }`}
          >
            <div className="text-lg font-semibold">
              {passed
                ? correctAnswers === questions.length
                  ? language === "es"
                    ? "¡Experto en Agricultura! 🌟"
                    : "Agriculture Expert! 🌟"
                  : correctAnswers >= questions.length * 0.7
                  ? language === "es"
                    ? "¡Agricultor Avanzado! 🌾"
                    : "Advanced Farmer! 🌾"
                  : correctAnswers >= questions.length * 0.5
                  ? language === "es"
                    ? "Agricultor en Desarrollo 🌱"
                    : "Developing Farmer 🌱"
                  : language === "es"
                  ? "Agricultor Aprobado 🌿"
                  : "Approved Farmer 🌿"
                : language === "es"
                ? "Necesitas más práctica 📚"
                : "You need more practice 📚"}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            {passed ? (
              <>
                <Button
                  onClick={handleRestart}
                  className="flex-1 h-11"
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t.trivia.finish.retry}
                </Button>
                <Button
                  onClick={handleBackToDashboard}
                  className="flex-1 h-11"
                  variant="default"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.trivia.finish.continueToMap}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleBackToDashboard}
                  className="flex-1 h-11"
                  variant="outline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.trivia.finish.backToMap}
                </Button>
                <Button
                  onClick={handleRestart}
                  className="flex-1 h-11"
                  variant="default"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t.trivia.finish.retryLevel}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
