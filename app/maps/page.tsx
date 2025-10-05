"use client";

import {
  CropDetails,
  ErrorBoundary,
  MapComponent,
  PopupStack,
} from "@/modules/map/components";
import { addPopup } from "@/modules/map/services";
import { useState } from "react";

const Page = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [cropData, setCropData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [selectedPopupId, setSelectedPopupId] = useState(null);
  const [selectedCropIndex, setSelectedCropIndex] = useState<number | null>(
    null
  );
  const [analysisDate, setAnalysisDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today

  const handleMapClick = async (
    lat: number,
    lng: number,
    locationInfo: any = null
  ) => {
    setLoading(true);
    setError(null);
    setSelectedLocation({ lat, lng });
    setLocationInfo(locationInfo);
    setSelectedPopupId(null);
    setSelectedCropIndex(null); // Reset selected crop when new location is clicked

    try {
      const response = await fetch(
        `http://localhost:8000/recommend?lat=${lat}&lon=${lng}&date=${analysisDate}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);
      setCropData(data);

      // Agregar al stack de popups
      const popupData = {
        lat,
        lng,
        locationInfo,
        cropData: data,
        timestamp: Date.now(),
      };
      addPopup(popupData);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      if (err.message.includes("CORS") || err.message.includes("blocked")) {
        setError(
          "Error de CORS: El backend no permite conexiones desde el frontend. Ejecuta: ./fix-cors.sh"
        );
      } else if (err.message.includes("Failed to fetch")) {
        setError(
          "Error de conexión: Asegúrate de que el backend esté ejecutándose en http://localhost:8000"
        );
      } else {
        setError(`Error: ${err.message}`);
      }
      setCropData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCropSelect = (cropIndex: number) => {
    setSelectedCropIndex(cropIndex);
  };

  const handlePopupSelect = (popup: any) => {
    setSelectedLocation({ lat: popup.lat, lng: popup.lng });
    setLocationInfo(popup.locationInfo);
    setCropData(popup.cropData);
    setSelectedPopupId(popup.id);
    setSelectedCropIndex(null); // Reset crop selection when selecting saved analysis
    setError(null);
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Global Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md animate-fade-in">
            <div className="w-14 h-14 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              🌾 Analizando Ubicación...
            </h2>
            <p className="text-gray-600">
              Obteniendo datos climáticos y recomendaciones de cultivos
            </p>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-1 h-screen overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-[400px] bg-white border-r-2 border-green-200 flex flex-col shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white p-6 shadow-md">
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
              🌾 Análisis de Cultivos
            </h1>

            {/* Date Selector */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-2">
              <label
                htmlFor="analysis-date"
                className="text-sm font-semibold flex items-center gap-2"
              >
                📅 Fecha de Análisis
              </label>
              <input
                id="analysis-date"
                type="date"
                value={analysisDate}
                onChange={(e) => setAnalysisDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-green-300 bg-white text-green-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              />
            </div>

            <p className="mt-4 text-sm text-green-50 bg-green-800/30 rounded-lg p-3">
              💡 Haz clic en el mapa para analizar cualquier ubicación
            </p>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <ErrorBoundary>
              <PopupStack
                onPopupSelect={handlePopupSelect}
                selectedPopupId={selectedPopupId}
              />
            </ErrorBoundary>
          </div>
        </aside>

        {/* Map Container */}
        <main className="flex-1 relative bg-gray-100">
          <MapComponent
            onMapClick={handleMapClick}
            selectedLocation={selectedLocation}
            loading={loading}
            cropData={cropData}
          />
        </main>

        {/* Right Sidebar - Floating */}
        <aside className="fixed top-5 right-5 w-[450px] h-[calc(100vh-2.5rem)] bg-white/80 backdrop-blur-xl border border-green-200 rounded-2xl shadow-2xl overflow-hidden z-[1000] flex flex-col">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-5 shadow-md">
            <h2 className="text-xl font-bold flex items-center gap-2">
              📊 Detalles del Análisis
            </h2>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <ErrorBoundary>
              <CropDetails
                cropData={cropData}
                selectedCropIndex={selectedCropIndex}
                onCropSelect={handleCropSelect}
                loading={loading}
                error={error}
                locationInfo={locationInfo}
              />
            </ErrorBoundary>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Page;
