import { GameProgressIcons } from "./game-progress-icons";

export type TDifficulty = "easy" | "medium" | "hard" | "epic";

export interface Level {
  id: number;
  title: string;
  description: string;
  difficulty: TDifficulty;
  status: "locked" | "available" | "completed";
  icon: any;
  duration: string;
  position: { x: number; y: number };
}

export const levels: Level[] = [
  {
    id: 1,
    title: "Primeros Pasos",
    description:
      "Ciclo de crecimiento, necesidades básicas de agua, suelo ideal.",
    difficulty: "easy",
    status: "completed",
    icon: GameProgressIcons.seedling,
    duration: "5 min",
    position: { x: 10, y: 20 },
  },
  {
    id: 2,
    title: "Explorador",
    description:
      "Identifica síntomas de estrés hídrico y plagas comunes en cultivos.",
    difficulty: "easy",
    status: "completed",
    icon: GameProgressIcons.bug,
    duration: "7 min",
    position: { x: 30, y: 35 },
  },
  {
    id: 3,
    title: "Maestro Explorador",
    description:
      "Gestiona fertilización y riego por etapas en diferentes cultivos.",
    difficulty: "medium",
    status: "available",
    icon: GameProgressIcons.fertilizer,
    duration: "10 min",
    position: { x: 60, y: 25 },
  },
  {
    id: 4,
    title: "Juego Perfecto",
    description:
      "Diagnóstico integral, toma de decisiones bajo presión. Combinación NDVI + SMAP.",
    difficulty: "medium",
    status: "locked",
    icon: GameProgressIcons.radar,
    duration: "12 min",
    position: { x: 75, y: 45 },
  },
  {
    id: 5,
    title: "Buscador de Conocimiento",
    description:
      "Optimización de recursos, sostenibilidad, rendimiento. OpenET (evapotranspiración).",
    difficulty: "hard",
    status: "locked",
    icon: GameProgressIcons.eco,
    duration: "15 min",
    position: { x: 50, y: 65 },
  },
  {
    id: 6,
    title: "Experto en Satélites",
    description:
      "Todos los satélites: GPM, SMAP, MODIS, NDVI, NDWI. Integración total de datos.",
    difficulty: "hard",
    status: "locked",
    icon: GameProgressIcons.satellite,
    duration: "18 min",
    position: { x: 25, y: 80 },
  },
];
