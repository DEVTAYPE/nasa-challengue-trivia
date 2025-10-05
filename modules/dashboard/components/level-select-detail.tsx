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
import { Level, Difficulty } from "@/core";
import { useGameStore } from "@/core";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n/language-context";

interface LevelSelectDetailProps {
  level: Level;
  setSelectedLevel: (level: Level | null) => void;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  Icon: React.ComponentType<any>;
  cropType: string;
}

export const LevelSelectDetail: React.FC<LevelSelectDetailProps> = ({
  level,
  setSelectedLevel,
  popoverRef,
  Icon,
  cropType,
}) => {
  const router = useRouter();
  const startLevel = useGameStore((state) => state.startLevel);
  const isLoading = useGameStore((state) => state.isLoading);
  const { t, language } = useLanguage();

  const getDifficultyColor = (difficulty: Difficulty) => {
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

  const handleStartLevel = async () => {
    if (level.status === "locked") {
      toast.error(
        language === "es"
          ? "Este nivel está bloqueado. Completa el nivel anterior primero."
          : "This level is locked. Complete the previous level first."
      );
      return;
    }

    try {
      await startLevel(level.id);
      router.push(`/dashboard-game/trivia?crop=${cropType}&level=${level.id}`);
    } catch (error) {
      toast.error(
        language === "es" ? "Error al iniciar el nivel" : "Error starting level"
      );
      console.error(error);
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
                    {t.dashboard.difficulties[level.difficulty]}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {level.status === "completed"
                      ? t.dashboard.completed
                      : level.status === "available"
                      ? t.dashboard.available
                      : t.dashboard.locked}
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-tight">
                  {t.dashboard.levels[level.id]?.title || level.title}
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
              {t.dashboard.levels[level.id]?.description || level.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 relative">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">
                  {t.dashboard.duration}
                </div>
                <div className="text-xl font-bold">{level.duration}</div>
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleStartLevel}
              className="w-full h-10 text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow hover:cursor-pointer"
              disabled={level.status === "locked" || isLoading}
              variant={level.status === "completed" ? "secondary" : "default"}
            >
              {level.status === "completed" && (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {t.dashboard.repeatLevel}
                </>
              )}
              {level.status === "available" && (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  {t.dashboard.startAdventure}
                </>
              )}
              {level.status === "locked" && (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  {t.dashboard.levelLocked}
                </>
              )}
            </Button>

            {/* Keyboard hint */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/70 pt-1">
              <kbd className="px-2 py-1 bg-muted/50 border border-border rounded text-[10px] font-mono">
                ESC
              </kbd>
              <span>{t.dashboard.closeHint}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
