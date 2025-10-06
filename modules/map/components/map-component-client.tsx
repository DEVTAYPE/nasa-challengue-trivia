"use client";

import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  formatAddress,
  getLocationName,
  getShortLocationName,
} from "../services/nominatim";

// Fix para los iconos de Leaflet - se ejecuta al importar
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

interface LocationInfo {
  display_name: string;
  address: any;
  place_id?: string;
  osm_type?: string;
  osm_id?: string;
  lat: number;
  lon: number;
}

interface MapComponentProps {
  onMapClick: (
    lat: number,
    lng: number,
    locationInfo: LocationInfo | null
  ) => void;
  selectedLocation: { lat: number; lng: number } | null;
  loading: boolean;
  cropData: any;
}

const MapComponentClient: React.FC<MapComponentProps> = ({
  onMapClick,
  selectedLocation,
  loading,
  cropData,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const tempCircleRef = useRef<L.Circle | null>(null);
  const selectedCircleRef = useRef<L.Circle | null>(null); // Círculo del lugar seleccionado (5km)
  const previousLocationRef = useRef<{ lat: number; lng: number } | null>(null); // Para detectar cambios de ubicación
  const hasRenderedMarkerRef = useRef(false); // Para saber si ya se renderizó el marcador para esta ubicación
  const [locationName, setLocationName] = useState<LocationInfo | null>(null);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  // Helper para guardar la posición del mapa en localStorage
  const saveMapView = (lat: number, lng: number, zoom: number) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "map-last-view",
        JSON.stringify({ lat, lng, zoom, timestamp: Date.now() })
      );
    }
  };

  // Helper para recuperar la posición del mapa de localStorage
  const getLastMapView = (): {
    lat: number;
    lng: number;
    zoom: number;
  } | null => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("map-last-view");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  };

  // Asegurar que solo se ejecute en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!mapRef.current || !isClient) return;

    // Recuperar última vista guardada o usar Ayacucho por defecto
    const lastView = getLastMapView();
    const initialLat = lastView?.lat ?? -13.1638;
    const initialLng = lastView?.lng ?? -74.2234;
    const initialZoom = lastView?.zoom ?? 9;

    console.log("🗺️ Inicializando mapa en:", {
      lat: initialLat,
      lng: initialLng,
      zoom: initialZoom,
    });

    // Crear el mapa
    const map = L.map(mapRef.current).setView(
      [initialLat, initialLng],
      initialZoom
    );
    mapInstanceRef.current = map;

    // Agregar capa de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Guardar la vista cuando el usuario mueve o hace zoom en el mapa
    map.on("moveend", () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      saveMapView(center.lat, center.lng, zoom);
      console.log("💾 Vista del mapa guardada:", {
        lat: center.lat,
        lng: center.lng,
        zoom,
      });
    });

    // Manejar clicks en el mapa
    const handleMapClick = async (e: L.LeafletMouseEvent): Promise<void> => {
      const { lat, lng } = e.latlng;

      // Limpiar marcadores y círculos anteriores
      if (markerRef.current && mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(markerRef.current);
        markerRef.current = null;
      }
      if (tempCircleRef.current && mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(tempCircleRef.current);
        tempCircleRef.current = null;
      }

      // Agregar círculo temporal para mostrar dónde se hizo click
      if (mapInstanceRef.current) {
        const tempCircle = L.circle([lat, lng], {
          radius: 1000, // 1km de radio
          color: "#2c5530",
          fillColor: "#2c5530",
          fillOpacity: 0.2,
          weight: 2,
        }).addTo(mapInstanceRef.current);
        tempCircleRef.current = tempCircle;
      }

      setLoadingLocation(true);
      setLocationName(null); // Limpiar nombre anterior

      // Obtener nombre del lugar
      let locationInfo = null;
      try {
        const locationResult = await getLocationName(lat, lng);
        if (locationResult.success) {
          setLocationName(locationResult.data);
          locationInfo = locationResult.data;
        }
      } catch (error) {
        console.error("Error getting location name:", error);
      } finally {
        setLoadingLocation(false);
      }

      onMapClick(lat, lng, locationInfo);
    };

    map.on("click", handleMapClick);

    // Limpiar al desmontar
    return () => {
      map.off("click", handleMapClick);
      map.remove();
    };
  }, [onMapClick, isClient]);

  // Actualizar marcador cuando cambie la ubicación seleccionada y los datos estén cargados
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedLocation) return;

    // Detectar si la ubicación cambió
    const locationChanged =
      !previousLocationRef.current ||
      previousLocationRef.current.lat !== selectedLocation.lat ||
      previousLocationRef.current.lng !== selectedLocation.lng;

    console.log("🗺️ Map effect triggered:", {
      locationChanged,
      hasRenderedMarker: hasRenderedMarkerRef.current,
      loading,
      hasCropData: !!cropData,
    });

    // Solo mostrar marcador si no está cargando y hay datos de cultivos
    if (loading || !cropData) {
      // Remover marcador si está cargando o no hay datos
      if (markerRef.current) {
        mapInstanceRef.current.removeLayer(markerRef.current);
        markerRef.current = null;
      }
      // Remover círculo de selección anterior si no hay datos
      if (!cropData && selectedCircleRef.current) {
        mapInstanceRef.current.removeLayer(selectedCircleRef.current);
        selectedCircleRef.current = null;
      }
      // Resetear flag si está cargando o no hay datos
      if (locationChanged) {
        hasRenderedMarkerRef.current = false;
      }
      // No remover el círculo temporal aquí, se mantiene hasta que aparezca el marcador
      return;
    }

    // Si la ubicación no cambió y ya renderizamos el marcador, no hacer nada
    if (!locationChanged && hasRenderedMarkerRef.current) {
      console.log(
        "✅ Skipping map update - location unchanged and marker already rendered"
      );
      return;
    }

    // Remover marcador anterior
    if (markerRef.current) {
      mapInstanceRef.current.removeLayer(markerRef.current);
    }

    // Remover círculo temporal si existe
    if (tempCircleRef.current) {
      mapInstanceRef.current.removeLayer(tempCircleRef.current);
      tempCircleRef.current = null;
    }

    // Agregar nuevo marcador solo cuando los datos estén listos
    const marker = L.marker([selectedLocation.lat, selectedLocation.lng]).addTo(
      mapInstanceRef.current
    );

    markerRef.current = marker;

    // Remover círculo anterior si existe
    if (selectedCircleRef.current) {
      mapInstanceRef.current.removeLayer(selectedCircleRef.current);
      selectedCircleRef.current = null;
    }

    // Agregar círculo de 5km alrededor del lugar seleccionado
    const selectedCircle = L.circle(
      [selectedLocation.lat, selectedLocation.lng],
      {
        radius: 5000, // 5km de radio
        color: "#16a34a", // verde
        fillColor: "#22c55e",
        fillOpacity: 0.15,
        weight: 3,
        dashArray: "10, 10", // línea punteada
      }
    ).addTo(mapInstanceRef.current);

    selectedCircleRef.current = selectedCircle;

    // Centrar el mapa SOLO si la ubicación cambió Y es un nuevo análisis
    if (locationChanged) {
      console.log(
        "📍 Nueva ubicación detectada - centrando mapa:",
        selectedLocation
      );
      mapInstanceRef.current.setView(
        [selectedLocation.lat, selectedLocation.lng],
        10
      );

      // Actualizar la referencia de ubicación anterior
      previousLocationRef.current = {
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      };
    } else {
      console.log(
        "⏭️ Ubicación sin cambios - manteniendo vista actual del usuario"
      );
    }

    // Marcar que ya renderizamos el marcador para esta ubicación
    hasRenderedMarkerRef.current = true;

    // Limpiar overlay de ubicación cuando se selecciona desde popup stack
    setLocationName(null);
    setLoadingLocation(false);
  }, [selectedLocation, loading, cropData]); // cropData necesario para saber cuándo hay datos

  // Limpiar todos los elementos al desmontar el componente
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        // Limpiar marcador
        if (markerRef.current) {
          mapInstanceRef.current.removeLayer(markerRef.current);
        }
        // Limpiar círculo temporal
        if (tempCircleRef.current) {
          mapInstanceRef.current.removeLayer(tempCircleRef.current);
        }
        // Limpiar círculo de selección
        if (selectedCircleRef.current) {
          mapInstanceRef.current.removeLayer(selectedCircleRef.current);
        }
      }
    };
  }, []);

  // Mostrar loading mientras se carga en el cliente
  if (!isClient) {
    return (
      <div className="map-component">
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="spinner"></div>
          <span style={{ marginLeft: "10px" }}>Cargando mapa...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="map-component">
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />

      {/* Información de ubicación */}
      {(loadingLocation || loading) && (
        <div className="location-loading">
          <div className="spinner"></div>
          <span>
            {loading
              ? "Analizando ubicación..."
              : "Obteniendo nombre del lugar..."}
          </span>
        </div>
      )}

      {locationName && !loadingLocation && !loading && (
        <div className="location-info-overlay">
          <div className="location-name">
            {getShortLocationName(locationName.address)}
          </div>
          <div className="location-address">
            {formatAddress(locationName.address)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponentClient;
