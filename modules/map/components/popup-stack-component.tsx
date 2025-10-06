import React, { useState, useEffect } from "react";
import {
  getPopupStack,
  removePopup,
  clearPopupStack,
  reorderPopup,
  getStackStats,
  PopupData,
  StackStats,
} from "../services/popup-stack-service";

interface PopupStackProps {
  onPopupSelect: (popup: PopupData) => void;
  selectedPopupId: string | null;
}

export const PopupStack: React.FC<PopupStackProps> = ({
  onPopupSelect,
  selectedPopupId,
}) => {
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [stats, setStats] = useState<StackStats>({
    total: 0,
    today: 0,
    thisWeek: 0,
    oldest: null,
    newest: null,
  });

  useEffect(() => {
    loadPopups();

    // Listener para actualizar cuando se agreguen nuevos popups
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === "crop_analysis_popup_stack") {
        loadPopups();
      }
    };

    // Listener para evento personalizado de cambios en popup stack
    const handlePopupStackChange = (): void => {
      loadPopups();
    };

    // Escuchar cambios en localStorage
    window.addEventListener("storage", handleStorageChange);

    // Escuchar evento personalizado
    window.addEventListener("popupStackChanged", handlePopupStackChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("popupStackChanged", handlePopupStackChange);
    };
  }, []);

  const loadPopups = (): void => {
    const popupStack = getPopupStack();
    setPopups(popupStack);
    setStats(getStackStats());
  };

  const handlePopupClick = (popup: PopupData): void => {
    onPopupSelect(popup);
  };

  const handleRemovePopup = (
    popupId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation();
    const updatedStack = removePopup(popupId);
    setPopups(updatedStack);
    setStats(getStackStats());
  };

  const handleClearAll = (): void => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres limpiar todos los Saved Reports?"
      )
    ) {
      const emptyStack = clearPopupStack();
      setPopups(emptyStack);
      setStats(getStackStats());
    }
  };

  const handleMoveToTop = (
    popupId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation();
    const updatedStack = reorderPopup(popupId, 0);
    setPopups(updatedStack);
  };

  const formatLocationName = (popup: PopupData): string => {
    if (popup.locationInfo?.display_name) {
      // Extraer solo el nombre principal (antes de la primera coma)
      return popup.locationInfo.display_name.split(",")[0];
    }
    // Si no hay nombre de Nominatim, usar coordenadas como fallback
    return `${popup.lat?.toFixed(4)}, ${popup.lng?.toFixed(4)}`;
  };

  const formatShortLocationName = (popup: PopupData): string => {
    if (popup.locationInfo?.address) {
      const address = popup.locationInfo.address;
      // Prioridad: village > town > city > municipality > county > state
      return (
        address.village ||
        address.town ||
        address.city ||
        address.municipality ||
        address.county ||
        address.state ||
        "Ubicación"
      );
    }
    if (popup.locationInfo?.display_name) {
      return popup.locationInfo.display_name.split(",")[0];
    }
    return `${popup.lat?.toFixed(4)}, ${popup.lng?.toFixed(4)}`;
  };

  const formatTimeAgo = (timestamp: number | undefined): string => {
    if (!timestamp) return "Desconocido";

    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Ahora";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  if (popups.length === 0) {
    return (
      <div className="p-6 text-center bg-gradient-to-br from-gray-50 to-green-50 m-4 rounded-xl border-2 border-dashed border-green-300">
        <div className="text-6xl mb-3">📍</div>
        <h3 className="text-lg font-bold text-gray-700 mb-2">
          Saved Reports
        </h3>
        <p className="text-sm text-gray-500">
          Haz clic en el mapa para crear tu primer análisis
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-green-800 flex items-center gap-2">
            📍 Saved Reports
          </h3>
          <span className="bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full">
            {popups.length}
          </span>
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex gap-3 text-gray-600">
            <span className="bg-white px-2 py-1 rounded-md border border-green-200">
              Today: <strong className="text-green-700">{stats.today}</strong>
            </span>
            <span className="bg-white px-2 py-1 rounded-md border border-green-200">
              Week:{" "}
              <strong className="text-green-700">{stats.thisWeek}</strong>
            </span>
          </div>
          <button
            onClick={handleClearAll}
            title="Limpiar todos los análisis"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-md transition-all text-xs font-medium flex items-center gap-1"
          >
            🗑️ Clean
          </button>
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-200">
        {popups.map((popup) => (
          <div
            key={popup.id}
            onClick={() => handlePopupClick(popup)}
            className={`p-4 cursor-pointer transition-all hover:bg-green-50 ${
              selectedPopupId === popup.id
                ? "bg-green-100 border-l-4 border-green-600"
                : "hover:border-l-4 hover:border-green-300"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              {/* Main Info */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-green-900 truncate mb-1 flex items-center gap-2">
                  <span className="text-lg">📌</span>
                  {formatShortLocationName(popup)}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="bg-gray-100 px-2 py-0.5 rounded-md font-mono">
                    {formatTimeAgo(popup.timestamp)}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="font-mono text-[10px]">
                    {popup.lat?.toFixed(4)}, {popup.lng?.toFixed(4)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => handleMoveToTop(popup.id!, e)}
                  title="Mover al inicio"
                  className="text-gray-400 hover:text-green-600 hover:bg-green-50 p-1.5 rounded-md transition-all"
                >
                  ⬆️
                </button>
                <button
                  onClick={(e) => handleRemovePopup(popup.id!, e)}
                  title="Eliminar análisis"
                  className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-all text-lg leading-none"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
