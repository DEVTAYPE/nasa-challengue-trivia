/**
 * Servicio para manejar el stack de popups/ubicaciones analizadas
 * Permite apilar múltiples ubicaciones y gestionarlas
 */

// Interfaces
export interface PopupData {
  id?: string;
  timestamp?: number;
  lat?: number;
  lng?: number;
  locationInfo?: any;
  cropData?: any;
  [key: string]: any;
}

export interface StackStats {
  total: number;
  today: number;
  thisWeek: number;
  oldest: string | null;
  newest: string | null;
}

const POPUP_STACK_KEY = "crop_analysis_popup_stack";
const MAX_POPUPS = 20; // Máximo 20 popups en el stack

/**
 * Obtiene el stack de popups desde localStorage
 * @returns {Array} Array de popups
 */
export const getPopupStack = (): PopupData[] => {
  try {
    const stored = localStorage.getItem(POPUP_STACK_KEY);
    if (!stored) return [];

    const stack: PopupData[] = JSON.parse(stored);

    // Limpiar popups expirados (más de 7 días)
    const now = Date.now();
    const validStack = stack.filter((popup: PopupData) => {
      return now - (popup.timestamp || 0) < 7 * 24 * 60 * 60 * 1000;
    });

    // Guardar stack limpio si se removieron elementos
    if (validStack.length !== stack.length) {
      localStorage.setItem(POPUP_STACK_KEY, JSON.stringify(validStack));
    }

    return validStack;
  } catch (error) {
    console.error("Error loading popup stack:", error);
    return [];
  }
};

/**
 * Guarda el stack de popups en localStorage
 * @param {Array} stack - Array de popups
 */
const savePopupStack = (stack: PopupData[]): void => {
  try {
    localStorage.setItem(POPUP_STACK_KEY, JSON.stringify(stack));

    // Emitir evento personalizado para notificar cambios
    window.dispatchEvent(
      new CustomEvent("popupStackChanged", {
        detail: { stack },
      })
    );
  } catch (error) {
    console.error("Error saving popup stack:", error);
  }
};

/**
 * Agrega un nuevo popup al stack
 * @param {Object} popupData - Datos del popup
 * @returns {Array} Stack actualizado
 */
export const addPopup = (popupData: PopupData): PopupData[] => {
  const stack = getPopupStack();

  // Crear nuevo popup con ID único
  const newPopup: PopupData = {
    id: `popup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    ...popupData,
  };

  // Agregar al inicio del stack (más reciente primero)
  stack.unshift(newPopup);

  // Limitar tamaño del stack
  if (stack.length > MAX_POPUPS) {
    stack.splice(MAX_POPUPS);
  }

  savePopupStack(stack);
  console.log(`Popup agregado al stack: ${newPopup.id}`);
  console.log(`Stack actualizado con ${stack.length} popups`);
  console.log("Popup data:", newPopup);

  return stack;
};

/**
 * Remueve un popup del stack por ID
 * @param {string} popupId - ID del popup a remover
 * @returns {Array} Stack actualizado
 */
export const removePopup = (popupId: string): PopupData[] => {
  const stack = getPopupStack();
  const filteredStack = stack.filter(
    (popup: PopupData) => popup.id !== popupId
  );

  savePopupStack(filteredStack);
  console.log(`Popup removido del stack: ${popupId}`);

  return filteredStack;
};

/**
 * Limpia todo el stack de popups
 * @returns {Array} Stack vacío
 */
export const clearPopupStack = (): PopupData[] => {
  const emptyStack: PopupData[] = [];
  savePopupStack(emptyStack);
  console.log("Stack de popups limpiado");
  return emptyStack;
};

/**
 * Actualiza un popup existente
 * @param {string} popupId - ID del popup a actualizar
 * @param {Object} updates - Datos a actualizar
 * @returns {Array} Stack actualizado
 */
export const updatePopup = (
  popupId: string,
  updates: Partial<PopupData>
): PopupData[] => {
  const stack = getPopupStack();
  const popupIndex = stack.findIndex(
    (popup: PopupData) => popup.id === popupId
  );

  if (popupIndex !== -1) {
    stack[popupIndex] = {
      ...stack[popupIndex],
      ...updates,
      id: popupId, // Mantener el ID original
      timestamp: stack[popupIndex].timestamp, // Mantener timestamp original
    };

    savePopupStack(stack);
    console.log(`Popup actualizado: ${popupId}`);
  }

  return stack;
};

/**
 * Obtiene un popup por ID
 * @param {string} popupId - ID del popup
 * @returns {Object|null} Popup encontrado o null
 */
export const getPopupById = (popupId: string): PopupData | null => {
  const stack = getPopupStack();
  return stack.find((popup: PopupData) => popup.id === popupId) || null;
};

/**
 * Reordena un popup en el stack
 * @param {string} popupId - ID del popup a mover
 * @param {number} newIndex - Nueva posición en el stack
 * @returns {Array} Stack actualizado
 */
export const reorderPopup = (
  popupId: string,
  newIndex: number
): PopupData[] => {
  const stack = getPopupStack();
  const popupIndex = stack.findIndex(
    (popup: PopupData) => popup.id === popupId
  );

  if (popupIndex !== -1 && newIndex >= 0 && newIndex < stack.length) {
    const popup = stack.splice(popupIndex, 1)[0];
    stack.splice(newIndex, 0, popup);

    savePopupStack(stack);
    console.log(`Popup reordenado: ${popupId} a posición ${newIndex}`);
  }

  return stack;
};

/**
 * Obtiene estadísticas del stack
 * @returns {Object} Estadísticas del stack
 */
export const getStackStats = (): StackStats => {
  const stack = getPopupStack();
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

  return {
    total: stack.length,
    today: stack.filter(
      (popup: PopupData) => (popup.timestamp || 0) > oneDayAgo
    ).length,
    thisWeek: stack.filter(
      (popup: PopupData) => (popup.timestamp || 0) > oneWeekAgo
    ).length,
    oldest:
      stack.length > 0
        ? new Date(
            Math.min(...stack.map((p: PopupData) => p.timestamp || 0))
          ).toLocaleDateString()
        : null,
    newest:
      stack.length > 0
        ? new Date(
            Math.max(...stack.map((p: PopupData) => p.timestamp || 0))
          ).toLocaleDateString()
        : null,
  };
};
