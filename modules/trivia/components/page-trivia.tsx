"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GameEntryIcons } from "@/modules/home/components";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { triviaQuestions } from "./trivia-contants";
import { TriviaFinishResult } from "./trivia-finish-result";

export const TriviaPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [cornGrowth, setCornGrowth] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect =
      selectedAnswer === triviaQuestions[currentQuestion].correctAnswer;
    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + 20);
      setCorrectAnswers(correctAnswers + 1);
      setCornGrowth(((correctAnswers + 1) / triviaQuestions.length) * 100);
    }

    setTimeout(() => {
      if (currentQuestion < triviaQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setIsFinished(true);
      }
    }, 2500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCorrectAnswers(0);
    setIsFinished(false);
    setCornGrowth(0);
    setShowFeedback(false);
  };

  const isCorrect =
    selectedAnswer === triviaQuestions[currentQuestion].correctAnswer;

  if (isFinished) {
    return (
      <TriviaFinishResult
        score={score}
        correctAnswers={correctAnswers}
        questions={triviaQuestions}
        handleRestart={handleRestart}
      />
    );
  }

  return (
    <div className="h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl h-[90vh] flex flex-col">
        <div className="mb-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
            Trivia de Agricultura
          </h1>
          <p className="text-sm text-muted-foreground">Cultivo de Maíz</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Left Column - triviaQuestions */}
          <div className="flex flex-col gap-3 min-h-0">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 flex-shrink-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    {currentQuestion + 1}/{triviaQuestions.length}
                  </span>
                  <span className="text-sm font-medium text-secondary">
                    {score} pts
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent via-secondary to-primary transition-all duration-500"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / triviaQuestions.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50 flex-1 min-h-0 flex flex-col">
              <CardContent className="p-6 space-y-4 flex-1 overflow-y-auto">
                <div>
                  <Badge className="mb-3 bg-secondary text-secondary-foreground">
                    Pregunta {currentQuestion + 1}
                  </Badge>
                  <h2 className="text-xl md:text-2xl font-bold text-balance leading-relaxed">
                    {triviaQuestions[currentQuestion].question}
                  </h2>
                </div>

                <div className="space-y-2">
                  {triviaQuestions[currentQuestion].options.map(
                    (option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrectOption =
                        index ===
                        triviaQuestions[currentQuestion].correctAnswer;
                      const showCorrect = showFeedback && isCorrectOption;
                      const showIncorrect =
                        showFeedback && isSelected && !isCorrectOption;

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={showFeedback}
                          className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-300 ${
                            showCorrect
                              ? "bg-accent/20 border-accent"
                              : showIncorrect
                              ? "bg-destructive/20 border-destructive"
                              : isSelected
                              ? "bg-primary/20 border-primary"
                              : "bg-muted/30 border-border hover:border-primary/50 hover:bg-muted/50"
                          } ${
                            showFeedback
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {option}
                            </span>
                            {showCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                            )}
                            {showIncorrect && (
                              <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>

                {showFeedback && (
                  <div
                    className={`p-3 rounded-lg ${
                      isCorrect
                        ? "bg-accent/10 border border-accent/50"
                        : "bg-destructive/10 border border-destructive/50"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div
                          className={`font-semibold text-sm mb-1 ${
                            isCorrect ? "text-accent" : "text-destructive"
                          }`}
                        >
                          {isCorrect ? "¡Correcto!" : "Incorrecto"}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {triviaQuestions[currentQuestion].explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!showFeedback && (
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                    className="w-full h-10"
                  >
                    Confirmar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-1">Escalando la Montaña</h3>
                <p className="text-sm text-muted-foreground">
                  {correctAnswers} de {triviaQuestions.length} correctas
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
                    left: `${20 + (cornGrowth / 100) * 70}%`,
                    bottom: `${10 + (cornGrowth / 100) * 75}%`,
                    transform: "translate(-50%, 50%)",
                  }}
                >
                  {/* TODO: SEGUN LO QUE FUE SELECCIONADO */}

                  {/* <GameEntryIcons.corn
                    className="relative animate-bounce w-16 h-16 "
                    style={{ animationDuration: "2s" }}
                  /> */}
                  <GameEntryIcons.potato
                    className="relative animate-bounce w-16 h-16 "
                    style={{ animationDuration: "2s" }}
                  />
                  {/*                   <GameEntryIcons.quinoa
                    className="relative animate-bounce w-16 h-16 "
                    style={{ animationDuration: "2s" }}
                  /> */}
                </div>

                {/* Progress markers */}
                {[...Array(triviaQuestions.length)].map((_, i) => {
                  const progress = ((i + 1) / triviaQuestions.length) * 100;
                  return (
                    <div
                      key={i}
                      className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${
                        i < correctAnswers
                          ? "bg-accent scale-125"
                          : "bg-muted/50"
                      }`}
                      style={{
                        left: `${20 + (progress / 100) * 70}%`,
                        bottom: `${10 + (progress / 100) * 75}%`,
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
                    {Math.round(cornGrowth)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Progreso</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-5 gap-2">
                {[...Array(triviaQuestions.length)].map((_, i) => (
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
      </div>
    </div>
  );
};
