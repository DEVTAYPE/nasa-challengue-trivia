"use client";

import { useEffect } from "react";
import { useGameStore } from "@/core";

/**
 * Provider que carga la sesión del juego al iniciar la aplicación
 */
export function GameProvider({ children }: { children: React.ReactNode }) {
  const loadSession = useGameStore((state) => state.loadSession);

  useEffect(() => {
    // Cargar sesión existente desde localStorage al montar
    loadSession();
  }, [loadSession]);

  return <>{children}</>;
}
