"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, Sparkles, Trophy } from "lucide-react";
import { IQuestion } from "./trivia-contants";

interface TriviaFinishResultProps {
  score: number;
  correctAnswers: number;
  questions: Array<IQuestion>;
  handleRestart: () => void;
}

export const TriviaFinishResult: React.FC<TriviaFinishResultProps> = ({
  score,
  correctAnswers,
  questions,
  handleRestart,
}) => {
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
              <Trophy className="w-20 h-20 text-secondary animate-bounce" />
              <Sparkles className="w-6 h-6 text-secondary absolute -top-1 -right-1 animate-spin" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
            ¡Cuestionario Completado!
          </h1>

          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-4xl font-bold text-secondary mb-1">
                {score}
              </div>
              <div className="text-sm text-muted-foreground">Puntuación</div>
            </div>

            <div className="bg-accent/10 rounded-lg p-4">
              <div className="text-4xl font-bold text-accent">
                {correctAnswers}
              </div>
              <div className="text-sm text-muted-foreground">Correctas</div>
            </div>

            <div className="bg-destructive/10 rounded-lg p-4">
              <div className="text-4xl font-bold text-destructive">
                {questions.length - correctAnswers}
              </div>
              <div className="text-sm text-muted-foreground">Incorrectas</div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3">
            <div className="text-lg font-semibold">
              {correctAnswers === questions.length
                ? "¡Experto en Agricultura! 🌟"
                : correctAnswers >= questions.length * 0.7
                ? "¡Agricultor Avanzado! 🌾"
                : correctAnswers >= questions.length * 0.5
                ? "Agricultor en Desarrollo 🌱"
                : "Principiante 🌿"}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleRestart}
              className="flex-1 h-11"
              variant="default"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reintentar
            </Button>
            <Button
              onClick={() => {}}
              className="flex-1 h-11"
              variant="secondary"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Ranking
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
