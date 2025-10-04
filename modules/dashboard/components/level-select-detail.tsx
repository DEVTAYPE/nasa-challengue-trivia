"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Lock, Play, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Level, TDifficulty } from "./game-progress-constants";

interface LevelSelectDetailProps {
  level: Level;
  setSelectedLevel: (level: Level | null) => void;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  Icon: React.ComponentType<any>;
}

export const LevelSelectDetail: React.FC<LevelSelectDetailProps> = ({
  level,
  setSelectedLevel,
  popoverRef,
  Icon,
}) => {
  const getDifficultyColor = (difficulty: TDifficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-accent text-accent-foreground";
      case "medium":
        return "bg-secondary text-secondary-foreground";
      case "hard":
        return "bg-destructive text-destructive-foreground";
      case "epic":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      {/* <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] animate-in fade-in duration-200" /> */}

      <div
        ref={popoverRef}
        className={`absolute z-[999] ${
          level.position.x > 50 ? "right-20" : "left-20"
        } top-1/2 -translate-y-1/2 w-96 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300`}
      >
        <Card className="bg-card">
          {/* <Card className="bg-card border-2 border-primary/60 shadow-2xl shadow-primary/30 overflow-hidden relative hover:shadow-primary/40 transition-shadow duration-300"> */}
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />

          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedLevel(null);
            }}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/90 hover:bg-destructive/20 border border-border hover:border-destructive/50 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90 group shadow-lg"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
          </button>

          <CardHeader className="space-y-3 relative pr-12">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge className={getDifficultyColor(level.difficulty)}>
                    {level.difficulty}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {level.status === "completed"
                      ? "Completado"
                      : level.status === "available"
                      ? "Disponible"
                      : "Bloqueado"}
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-tight">
                  {level.title}
                </CardTitle>
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  level.status === "completed"
                    ? "bg-accent"
                    : level.status === "available"
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardDescription className="text-sm leading-relaxed">
              {level.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 relative">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">
                  Duración
                </div>
                <div className="text-xl font-bold">{level.duration}</div>
              </div>
            </div>

            {/* Action Button */}
            <Button
              className="w-full h-10 text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow hover:cursor-pointer"
              disabled={level.status === "locked"}
              variant={level.status === "completed" ? "secondary" : "default"}
            >
              {level.status === "completed" && (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Repetir Nivel
                </>
              )}
              {level.status === "available" && (
                <Link
                  href={`/dashboard-game/${level.id}`}
                  className="flex items-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Comenzar Aventura
                </Link>
              )}
              {level.status === "locked" && (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Nivel Bloqueado
                </>
              )}
            </Button>

            {/* Keyboard hint */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/70 pt-1">
              <kbd className="px-2 py-1 bg-muted/50 border border-border rounded text-[10px] font-mono">
                ESC
              </kbd>
              <span>para cerrar</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
