import { CropType } from "../domain/entities/Crop";

/**
 * Mapea nombres de cultivos del backend (español) a los tipos del juego (inglés)
 */
export const CROP_NAME_MAP: Record<string, CropType> = {
  // Quinoa
  quinua: "quinoa",
  quinoa: "quinoa",

  // Papa
  papa: "potato",
  potato: "potato",
  patata: "potato",
  papa_nativa: "potato",

  // Maíz
  maiz: "corn",
  maíz: "corn",
  corn: "corn",
  choclo: "corn",
};

/**
 * Convierte un nombre de cultivo del backend a CropType
 * @param cropName - Nombre del cultivo (puede venir en español o inglés)
 * @returns CropType correspondiente o null si no se encuentra
 */
export function mapCropName(cropName: string): CropType | null {
  const normalized = cropName.toLowerCase().trim();
  return CROP_NAME_MAP[normalized] || null;
}

/**
 * Obtiene todos los cultivos disponibles en el juego
 */
export function getAvailableCrops(): CropType[] {
  return ["quinoa", "potato", "corn"];
}

/**
 * Verifica si un nombre de cultivo es válido
 */
export function isValidCropName(cropName: string): boolean {
  return mapCropName(cropName) !== null;
}
