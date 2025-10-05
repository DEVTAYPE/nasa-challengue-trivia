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
  const [locationName, setLocationName] = useState<LocationInfo | null>(null);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  // Asegurar que solo se ejecute en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!mapRef.current || !isClient) return;

    // Crear el mapa centrado en Perú
    const map = L.map(mapRef.current).setView([-12.0464, -77.0428], 6);
    mapInstanceRef.current = map;

    // Agregar capa de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

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

    // Solo mostrar marcador si no está cargando y hay datos de cultivos
    if (loading || !cropData) {
      // Remover marcador si está cargando o no hay datos
      if (markerRef.current) {
        mapInstanceRef.current.removeLayer(markerRef.current);
        markerRef.current = null;
      }
      // No remover el círculo temporal aquí, se mantiene hasta que aparezca el marcador
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

    // Centrar el mapa en la nueva ubicación
    mapInstanceRef.current.setView(
      [selectedLocation.lat, selectedLocation.lng],
      10
    );

    // Limpiar overlay de ubicación cuando se selecciona desde popup stack
    setLocationName(null);
    setLoadingLocation(false);
  }, [selectedLocation, loading, cropData]);

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
