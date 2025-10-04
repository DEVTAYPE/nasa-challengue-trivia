/**
 * Tipos de cultivos disponibles
 */
export type CropType = "corn" | "potato" | "quinoa";

/**
 * Entidad del Cultivo
 */
export interface Crop {
  id: CropType;
  name: string;
  description: string;
  icon: any;
}

export const CROPS: Record<CropType, Crop> = {
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
