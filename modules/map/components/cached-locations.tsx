import React, { useState, useEffect } from "react";
import {
  getAllCachedLocations,
  removeFromCache,
  clearCache,
} from "../services";

interface CachedLocation {
  lat: number;
  lng: number;
  locationInfo?: any;
  timestamp: number;
  date: string;
}

interface CachedLocationsProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
}

export const CachedLocations: React.FC<CachedLocationsProps> = ({
  onLocationSelect,
  selectedLocation,
}) => {
  const [cachedLocations, setCachedLocations] = useState<CachedLocation[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    loadCachedLocations();
  }, []);

  const loadCachedLocations = (): void => {
    const locations = getAllCachedLocations();
    setCachedLocations(locations);
  };

  const handleLocationClick = (location: CachedLocation): void => {
    onLocationSelect(location.lat, location.lng);
  };

  const handleRemoveLocation = (
    lat: number,
    lng: number,
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation();
    removeFromCache(lat, lng);
    loadCachedLocations();
  };

  const handleClearAll = (): void => {
    if (
      window.confirm("¿Estás seguro de que quieres limpiar todo el historial?")
    ) {
      clearCache();
      loadCachedLocations();
    }
  };

  const isLocationSelected = (location: CachedLocation): boolean => {
    if (!selectedLocation) return false;
    const threshold = 0.0001; // ~11 metros
    return (
      Math.abs(location.lat - selectedLocation.lat) < threshold &&
      Math.abs(location.lng - selectedLocation.lng) < threshold
    );
  };

  if (cachedLocations.length === 0) {
    return null;
  }

  return (
    <div className="cached-locations">
      <div
        className="cached-locations-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3>📍 Ubicaciones Anteriores</h3>
        <span className="toggle-icon">{isExpanded ? "▼" : "▶"}</span>
        <span className="count">({cachedLocations.length})</span>
      </div>

      {isExpanded && (
        <div className="cached-locations-list">
          <div className="cached-locations-actions">
            <button
              className="clear-all-btn"
              onClick={handleClearAll}
              title="Limpiar todo el historial"
            >
              🗑️ Limpiar Todo
            </button>
          </div>

          {cachedLocations.map((location, index) => (
            <div
              key={`${location.lat}-${location.lng}-${index}`}
              className={`cached-location-item ${
                isLocationSelected(location) ? "selected" : ""
              }`}
              onClick={() => handleLocationClick(location)}
            >
              <div className="location-info">
                <div className="location-name">
                  {location.locationInfo?.display_name ||
                    `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}
                </div>
                <div className="location-date">{location.date}</div>
              </div>

              <div className="location-actions">
                <button
                  className="remove-btn"
                  onClick={(e) =>
                    handleRemoveLocation(location.lat, location.lng, e)
                  }
                  title="Eliminar de historial"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
