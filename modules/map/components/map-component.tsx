"use client";

import dynamic from "next/dynamic";
import React from "react";

// Importar el componente del mapa solo en el cliente, sin SSR
const MapComponentClient = dynamic(() => import("./map-component-client"), {
  ssr: false,
  loading: () => (
    <div className="map-component">
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="spinner"></div>
        <span style={{ marginTop: "10px" }}>Cargando mapa...</span>
      </div>
    </div>
  ),
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

export const MapComponent: React.FC<MapComponentProps> = (props) => {
  return <MapComponentClient {...props} />;
};
