"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckCircle2, Lock, Play, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LevelSelectDetail } from "./level-select-detail";
import { useGameStore, CropType, Level } from "@/core";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GameProgressIcons } from "./game-progress-icons";
import { useLanguage } from "@/lib/i18n/language-context";
import Link from "next/link";

export const GameProgress = () => {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [availableCrops, setAvailableCrops] = useState<string[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t, language } = useLanguage();

  // Obtener datos del store
  const session = useGameStore((state) => state.session);
  const selectCrop = useGameStore((state) => state.selectCrop);
  const isLoading = useGameStore((state) => state.isLoading);
  const getLevelsForCurrentCrop = useGameStore(
    (state) => state.getLevelsForCurrentCrop
  );

  // Obtener niveles del cultivo actual
  const levels = getLevelsForCurrentCrop();

  // Obtener cultivos disponibles desde el último análisis del mapa
  useEffect(() => {
    const getAvailableCrops = () => {
      const crops: string[] = [];

      try {
        // Primero intentar obtener de la metadata del último análisis
        const lastAnalysis = localStorage.getItem("last-map-analysis");
        if (lastAnalysis) {
          const analysis = JSON.parse(lastAnalysis);
          if (analysis.crops && Array.isArray(analysis.crops)) {
            // Capitalizar y retornar todos los cultivos del análisis
            analysis.crops.forEach((crop: string) => {
              const capitalizedCrop =
                crop.charAt(0).toUpperCase() + crop.slice(1);
              crops.push(capitalizedCrop);
            });
            setAvailableCrops(crops);
            return;
          }
        }

        // Fallback: Buscar claves "map-questions-" (compatibilidad con versión anterior)
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("map-questions-")) {
            const cropName = key.replace("map-questions-", "");
            const capitalizedCrop =
              cropName.charAt(0).toUpperCase() + cropName.slice(1);
            if (!crops.includes(capitalizedCrop)) {
              crops.push(capitalizedCrop);
            }
          }
        }
      } catch (err) {
        console.error("Error loading available crops:", err);
      }

      setAvailableCrops(crops);
    };

    getAvailableCrops();

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      getAvailableCrops();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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

  // Manejar cambio de cultivo
  const handleCropChange = async (cropType: CropType) => {
    try {
      await selectCrop(cropType);
      setIsPopoverOpen(false);

      // Capitalizar el nombre del cultivo
      const cropName = cropType.charAt(0).toUpperCase() + cropType.slice(1);

      toast.success(
        language === "es"
          ? `Cultivo cambiado a ${cropName}`
          : `Crop changed to ${cropName}`
      );
      router.push("/dashboard-game?crop=" + cropType);
    } catch (error) {
      toast.error(
        language === "es"
          ? "Error al cambiar de cultivo"
          : "Error changing crop"
      );
      console.error(error);
    }
  };

  if (!session) {
    return null; // O un loader
  }

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
            {language === "es"
              ? "Empieza tu aventura agrícola!"
              : "Start your agricultural adventure!"}
          </h1>
          <p className="text-muted-foreground text-lg font-mono">
            {language === "es"
              ? "Hola cultivador!, selecciona tu próximo desafío"
              : "Hello farmer!, select your next challenge"}
          </p>
        </div>

        <div className="w-full">
          {/* Level Map */}
          <div className="relative">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-visible">
              <CardHeader className="flex items-center gap-3">
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button className="w-fit">
                      {language === "es" ? "Cultivo actual" : "Current crop"}:{" "}
                      {session.selectedCrop!.charAt(0).toUpperCase() +
                        session.selectedCrop!.slice(1)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-80 max-h-[400px] overflow-y-auto"
                    side="bottom"
                    align="start"
                  >
                    <section className="space-y-4">
                      <section className="space-y-3">
                        <CardTitle className="flex items-center gap-1">
                          <Trophy className="w-5 h-5 text-secondary" />
                          {language === "es" ? "Mapa de Niveles" : "Level Map"}
                        </CardTitle>
                        <CardDescription>
                          {t.dashboard.progress}:{" "}
                          {
                            levels.filter((l) => l.status === "completed")
                              .length
                          }
                          /{levels.length}{" "}
                          {language === "es"
                            ? "niveles completados"
                            : "levels completed"}
                        </CardDescription>
                        <div className="h-2 bg-border/20 rounded-full mt-2">
                          <div
                            className="h-2 bg-secondary rounded-full transition-all duration-500"
                            style={{
                              width: `${
                                (levels.filter((l) => l.status === "completed")
                                  .length /
                                  levels.length) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </section>
                      <section className="space-y-2">
                        <p className="text-sm font-semibold text-muted-foreground">
                          {language === "es"
                            ? "Cambiar cultivo"
                            : "Change crop"}
                          :
                        </p>
                        {availableCrops.length === 0 ? (
                          <div className="text-center p-4 text-sm text-muted-foreground">
                            <p className="mb-2">
                              {language === "es"
                                ? "No hay cultivos disponibles"
                                : "No crops available"}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                router.push("/maps");
                                setIsPopoverOpen(false);
                              }}
                            >
                              {language === "es" ? "Ir al Mapa" : "Go to Map"}
                            </Button>
                          </div>
                        ) : (
                          availableCrops.map((cropName) => {
                            const cropId = cropName.toLowerCase();
                            // Verificar si tiene preguntas disponibles
                            const hasQuestions =
                              localStorage.getItem(
                                `map-questions-${cropId}`
                              ) !== null;

                            return (
                              <Button
                                key={cropId}
                                onClick={() =>
                                  handleCropChange(cropId as CropType)
                                }
                                variant={
                                  session.selectedCrop === cropId
                                    ? "default"
                                    : "outline"
                                }
                                className="w-full justify-start"
                                disabled={isLoading || !hasQuestions}
                              >
                                {cropName}
                                {session.selectedCrop === cropId && " ✓"}
                                {!hasQuestions && (
                                  <span className="ml-auto text-xs opacity-50">
                                    {language === "es"
                                      ? "Sin preguntas"
                                      : "No questions"}
                                  </span>
                                )}
                              </Button>
                            );
                          })
                        )}
                      </section>
                    </section>
                  </PopoverContent>
                </Popover>

                <Link
                  href="/maps"
                  className="bg-gradient-to-r from-primary via-secondary to-accent  font-semibold underline ml-4"
                >
                  {language === "es"
                    ? "Analiza una nueva ubicación en el mapa"
                    : "Analyze a new location on the map"}
                </Link>
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
                    // Mapear el icon del nivel según su id
                    const Icon =
                      level.id === 1
                        ? GameProgressIcons.seedling
                        : level.id === 2
                        ? GameProgressIcons.bug
                        : level.id === 3
                        ? GameProgressIcons.fertilizer
                        : level.id === 4
                        ? GameProgressIcons.radar
                        : level.id === 5
                        ? GameProgressIcons.eco
                        : GameProgressIcons.satellite;
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
                            cropType={session.selectedCrop!}
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
