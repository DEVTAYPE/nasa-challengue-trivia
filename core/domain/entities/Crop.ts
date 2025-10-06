/**
 * Tipos de cultivos base (predefinidos)
 */
export type BaseCropType = "corn" | "potato" | "quinoa";

/**
 * Tipo de cultivo que acepta los base + cualquier string dinámico
 */
export type CropType = BaseCropType | string;

/**
 * Entidad del Cultivo
 */
export interface Crop {
  id: string;
  name: string;
  description: string;
  icon?: any;
}

export const CROPS: Record<BaseCropType, Crop> = {
  corn: {
    id: "corn",
    name: "Maíz",
    description:
      "Cultivo versátil que requiere agua constante. Gestiona la irrigación para maximizar la producción.",
  } as Crop,
  potato: {
    id: "potato",
    name: "Papa",
    description:
      "Tubérculo resistente que se adapta a climas fríos. Optimiza el uso del agua en suelos montañosos.",
  } as Crop,
  quinoa: {
    id: "quinoa",
    name: "Quinoa",
    description:
      "Superalimento andino tolerante a la sequía. Maneja los recursos hídricos con precisión.",
  } as Crop,
};

/**
 * Iconos para cultivos dinámicos
 */
const CROP_ICONS: Record<string, string> = {
  cebolla: "🧅",
  tomate: "🍅",
  zanahoria: "🥕",
  lechuga: "🥬",
  arroz: "🌾",
  trigo: "🌾",
  frijol: "🫘",
  default: "🌱",
};

/**
 * Obtiene información de un cultivo, creándolo dinámicamente si no existe
 */
export function getCrop(cropType: CropType): Crop {
  // Si es un cultivo base, retornarlo directamente
  if (cropType in CROPS) {
    return CROPS[cropType as BaseCropType];
  }

  // Crear cultivo dinámico
  const normalizedName = cropType.charAt(0).toUpperCase() + cropType.slice(1);
  return {
    id: cropType,
    name: normalizedName,
    description: `Cultivo de ${normalizedName.toLowerCase()} con características únicas según el análisis climático.`,
    icon: CROP_ICONS[cropType.toLowerCase()] || CROP_ICONS.default,
  };
}
