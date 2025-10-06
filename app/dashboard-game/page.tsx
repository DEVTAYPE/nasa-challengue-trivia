"use client";

import { GameProgress } from "@/modules/dashboard/components";
import { useGameStore, mapCropName, getCrop, CropType } from "@/core";
import { useGameLanguage } from "@/core/application/useGameLanguage";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n/language-context";

const DashboardGameContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);
  const { language } = useLanguage();

  // ✅ Sincronizar idioma con el store del juego
  useGameLanguage();

  const session = useGameStore((state) => state.session);
  const loadSession = useGameStore((state) => state.loadSession);
  const initializeOrContinueSession = useGameStore(
    (state) => state.initializeOrContinueSession
  );

  useEffect(() => {
    const initializePage = async () => {
      try {
        // 1. Obtener el crop del query param
        const cropParam = searchParams.get("crop");

        if (cropParam) {
          // 2. Mapear el nombre del cultivo (ahora siempre retorna un valor)
          const mappedCrop = mapCropName(cropParam);
          const cropInfo = getCrop(mappedCrop);

          // 3. Inicializar o continuar sesión con el cultivo
          await initializeOrContinueSession(mappedCrop);
          toast.success(
            language === "es"
              ? `¡Bienvenido! Cultivo: ${cropInfo.name} ${
                  cropInfo.icon || "🌱"
                }`
              : `Welcome! Crop: ${cropInfo.name} ${cropInfo.icon || "🌱"}`
          );
        } else {
          // No hay crop en params, cargar sesión existente
          await loadSession();

          // Si no hay sesión, intentar recuperar del último análisis
          if (!session) {
            // Buscar el último análisis del mapa
            const lastAnalysis = localStorage.getItem("last-map-analysis");
            if (lastAnalysis) {
              try {
                const analysis = JSON.parse(lastAnalysis);
                if (analysis.crops && analysis.crops.length > 0) {
                  // Buscar el primer cultivo que tenga preguntas
                  let cropWithQuestions = null;
                  for (const crop of analysis.crops) {
                    const hasQuestions =
                      localStorage.getItem(`map-questions-${crop}`) !== null;
                    if (hasQuestions) {
                      cropWithQuestions = crop;
                      break;
                    }
                  }

                  if (cropWithQuestions) {
                    // Inicializar con el primer cultivo que tenga preguntas
                    await initializeOrContinueSession(cropWithQuestions);
                    const cropInfo = getCrop(cropWithQuestions);
                    toast.success(
                      language === "es"
                        ? `Continuando con ${cropInfo.name} ${
                            cropInfo.icon || "🌱"
                          }`
                        : `Continuing with ${cropInfo.name} ${
                            cropInfo.icon || "🌱"
                          }`
                    );
                    setIsInitializing(false);
                    return;
                  }
                }
              } catch (err) {
                console.error("Error parsing last analysis:", err);
              }
            }

            // No hay datos disponibles, redirigir al mapa
            toast.info(
              language === "es"
                ? "Analiza una ubicación en el mapa para comenzar"
                : "Analyze a location on the map to start"
            );
            router.push("/maps");
            return;
          }
        }
      } catch (error) {
        console.error("Error initializing game:", error);
        toast.error(
          language === "es"
            ? "Error al inicializar el juego"
            : "Error initializing game"
        );
      } finally {
        setIsInitializing(false);
      }
    };

    initializePage();
  }, [searchParams]);

  // Loading state
  if (isInitializing) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">
            {language === "es"
              ? "Cargando tu aventura..."
              : "Loading your adventure..."}
          </h2>
          <p className="text-muted-foreground">
            {language === "es"
              ? "Preparando el terreno para tus cultivos 🌱"
              : "Preparing the ground for your crops 🌱"}
          </p>
        </div>
      </main>
    );
  }

  // Main game view
  return (
    <main className="min-h-screen bg-background">
      <GameProgress />
    </main>
  );
};

const DashboardGame = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <DashboardGameContent />
    </Suspense>
  );
};

export default DashboardGame;
