"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Lock, Play, Trophy, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Level, levels } from "./game-progress-constants";
import { LevelSelectDetail } from "./level-select-detail";

export const GameProgress = () => {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        // Check if click is not on a level button
        const target = event.target as HTMLElement;
        const isLevelButton = target.closest("[data-level-button]");
        if (!isLevelButton) {
          setSelectedLevel(null);
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedLevel(null);
      }
    };

    if (selectedLevel) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedLevel]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "available":
        return <Play className="w-4 h-4" />;
      case "locked":
        return <Lock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Empieza tu aventura agrícola!
          </h1>
          <p className="text-muted-foreground text-lg">
            Hola explorador, selecciona tu próximo desafío
          </p>
        </div>

        <div className="w-full">
          {/* Level Map */}
          <div className="relative">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-visible">
              <CardHeader>
                <CardTitle className="flex items-center gap-1">
                  <Trophy className="w-5 h-5 text-secondary" />
                  Mapa de Niveles
                </CardTitle>
                <CardDescription>
                  Progreso:{" "}
                  {levels.filter((l) => l.status === "completed").length}/
                  {levels.length} niveles completados
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="relative h-[600px] w-full overflow-visible">
                  {/* SVG Path connecting levels */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    style={{ zIndex: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="pathGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="rgb(139, 92, 246)"
                          stopOpacity="0.5"
                        />
                        <stop
                          offset="50%"
                          stopColor="rgb(234, 179, 8)"
                          stopOpacity="0.5"
                        />
                        <stop
                          offset="100%"
                          stopColor="rgb(34, 197, 94)"
                          stopOpacity="0.5"
                        />
                      </linearGradient>
                    </defs>
                    {levels.map((level, index) => {
                      if (index < levels.length - 1) {
                        const nextLevel = levels[index + 1];
                        return (
                          <line
                            key={`path-${level.id}`}
                            x1={`${level.position.x}%`}
                            y1={`${level.position.y}%`}
                            x2={`${nextLevel.position.x}%`}
                            y2={`${nextLevel.position.y}%`}
                            stroke="url(#pathGradient)"
                            strokeWidth="3"
                            strokeDasharray={
                              level.status === "completed" ? "0" : "8,8"
                            }
                            className="transition-all duration-500"
                          />
                        );
                      }
                      return null;
                    })}
                  </svg>

                  {/* Level Nodes */}
                  {levels.map((level) => {
                    const Icon = level.icon;
                    const isSelected = selectedLevel?.id === level.id;

                    return (
                      <div
                        key={level.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                          isSelected ? "z-[99]" : "z-10"
                        }`}
                        style={{
                          left: `${level.position.x}%`,
                          top: `${level.position.y}%`,
                        }}
                      >
                        <button
                          data-level-button
                          onClick={() =>
                            setSelectedLevel(isSelected ? null : level)
                          }
                          // disabled={level.status === "locked"}
                          className={`transition-all duration-300 ${
                            level.status === "locked"
                              ? "cursor-pointer opacity-50"
                              : "cursor-pointer hover:scale-110"
                          } ${isSelected ? "" : ""} relative`}
                        >
                          <div
                            className={`relative ${
                              level.status === "available"
                                ? "animate-float"
                                : ""
                            }`}
                          >
                            {/* Glow effect for available levels */}
                            {level.status === "available" && (
                              <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50 animate-pulse-glow" />
                            )}

                            {/* Level button */}
                            <div
                              className={`relative w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${
                                level.status === "completed"
                                  ? "bg-accent border-accent shadow-lg shadow-accent/50"
                                  : level.status === "available"
                                  ? "bg-primary border-primary shadow-lg shadow-primary/50"
                                  : "bg-muted border-border"
                              } ${
                                isSelected && level.status !== "locked"
                                  ? "ring-4 ring-ring"
                                  : ""
                              }`}
                            >
                              <Icon
                                className={`w-8 h-8 ${
                                  level.status === "locked"
                                    ? "text-muted-foreground"
                                    : "text-white"
                                }`}
                              />
                            </div>

                            {/* Level number badge */}
                            <div
                              className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                level.status === "completed"
                                  ? "bg-accent text-accent-foreground"
                                  : level.status === "available"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {level.id}
                            </div>

                            {/* Status indicator */}
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                              {getStatusIcon(level.status)}
                            </div>
                          </div>
                        </button>

                        {isSelected && (
                          <LevelSelectDetail
                            Icon={Icon}
                            level={level}
                            setSelectedLevel={setSelectedLevel}
                            popoverRef={popoverRef}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
