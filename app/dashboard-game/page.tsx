"use client";

import { GameProgress } from "@/modules/dashboard/components";
import { useGameStore, mapCropName, CROPS, CropType } from "@/core";
import { useGameLanguage } from "@/core/application/useGameLanguage";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n/language-context";

const DashboardGameContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);
  const [cropNotFound, setCropNotFound] = useState(false);
  const [invalidCrop, setInvalidCrop] = useState<string | null>(null);
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
          // 2. Mapear el nombre del cultivo
          const mappedCrop = mapCropName(cropParam);

          if (!mappedCrop) {
            // Cultivo no válido, mostrar opciones
            setInvalidCrop(cropParam);
            setCropNotFound(true);
            setIsInitializing(false);
            toast.error(
              language === "es"
                ? `No tenemos niveles para "${cropParam}". Selecciona uno de los disponibles.`
                : `We don't have levels for "${cropParam}". Select one of the available ones.`
            );
            return;
          }

          // 3. Inicializar o continuar sesión con el cultivo
          await initializeOrContinueSession(mappedCrop);
          toast.success(
            language === "es"
              ? `¡Bienvenido! Cultivo: ${CROPS[mappedCrop].name} 🌱`
              : `Welcome! Crop: ${CROPS[mappedCrop].name} 🌱`
          );
        } else {
          // No hay crop en params, cargar sesión existente
          await loadSession();

          if (!session) {
            // No hay sesión ni crop param, redirigir a home
            toast.info(
              language === "es"
                ? "Selecciona un cultivo para comenzar"
                : "Select a crop to start"
            );
            router.push("/");
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

  // Crop not found state
  if (cropNotFound) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-card border border-border rounded-2xl p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="text-6xl">🌾</div>
            <h2 className="text-3xl font-bold text-foreground">
              {language === "es"
                ? "Cultivo no disponible"
                : "Crop not available"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === "es"
                ? "Lo sentimos, no tenemos niveles para "
                : "Sorry, we don't have levels for "}
              <span className="font-semibold text-foreground">
                "{invalidCrop}"
              </span>
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-center text-muted-foreground font-semibold">
              {language === "es"
                ? "Selecciona uno de nuestros cultivos disponibles:"
                : "Select one of our available crops:"}
            </p>
            <div className="grid gap-4">
              {(Object.keys(CROPS) as CropType[]).map((cropType) => {
                const crop = CROPS[cropType];
                return (
                  <button
                    key={cropType}
                    onClick={() => {
                      router.push(`/dashboard-game?crop=${cropType}`);
                      setCropNotFound(false);
                      setIsInitializing(true);
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-6 rounded-xl font-bold text-xl transition-all hover:shadow-lg active:scale-95 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-3xl">{crop.icon}</span>
                      <span>{crop.name}</span>
                    </span>
                    <span className="text-2xl">→</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <button
              onClick={() => router.push("/maps")}
              className="w-full bg-muted hover:bg-muted/80 text-foreground py-3 rounded-lg font-semibold transition-all"
            >
              ← {language === "es" ? "Volver al Mapa" : "Back to Map"}
            </button>
          </div>
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
