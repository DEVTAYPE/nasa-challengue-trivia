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
 * @returns CropType correspondiente (siempre retorna un valor válido)
 */
export function mapCropName(cropName: string): CropType {
  const normalized = cropName.toLowerCase().trim();
  // Si existe en el mapa, usar el mapeo
  if (CROP_NAME_MAP[normalized]) {
    return CROP_NAME_MAP[normalized];
  }
  // Si no existe, retornar el nombre normalizado como CropType dinámico
  return normalized as CropType;
}

/**
 * Obtiene todos los cultivos disponibles en el juego
 */
export function getAvailableCrops(): CropType[] {
  return ["quinoa", "potato", "corn"];
}

/**
 * Verifica si un nombre de cultivo es válido
 * Ahora siempre retorna true ya que aceptamos cualquier cultivo dinámico
 */
export function isValidCropName(cropName: string): boolean {
  return Boolean(cropName && cropName.trim().length > 0);
}
