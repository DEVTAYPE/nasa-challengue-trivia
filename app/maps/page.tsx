"use client";

import { MapResult2 } from "@/core/domain/entities/map-result-2";
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
  const [cropData, setCropData] = useState<MapResult2 | null>(null);
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
        // `http://localhost:8000/recommend?lat=${lat}&lon=${lng}&date=${analysisDate}`,
        `/data/result-mock.json`,
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

      const data = (await response.json()) as MapResult2;
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

  // Estados para mobile panels
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);

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
      <div className="flex flex-1 min-h-screen overflow-hidden">
        {/* Left Sidebar - Hidden on mobile, shown on desktop */}
        <aside className="hidden lg:flex lg:w-[300px] bg-white border-r-2 border-green-200 flex-col shadow-lg">
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

          {/* Mobile: Floating Action Buttons */}
          <div className="lg:hidden fixed bottom-4 left-4 right-4 flex gap-3 z-[999]">
            <button
              onClick={() => setShowHistoryPanel(!showHistoryPanel)}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition-all active:scale-95"
            >
              <span>📋</span>
              Historial
            </button>
            <button
              onClick={() => setShowDetailsPanel(!showDetailsPanel)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 rounded-xl shadow-lg font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition-all active:scale-95"
            >
              <span>📊</span>
              Detalles
            </button>
          </div>
        </main>

        {/* Right Sidebar - Desktop (Floating) */}
        <aside className="hidden lg:flex fixed top-5 right-5 w-[350px] h-[calc(100vh-2.5rem)] bg-white/80 backdrop-blur-xl border border-green-200 rounded-2xl shadow-2xl overflow-hidden z-[1000] flex-col">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-5 shadow-md">
            <h2 className="text-xl font-bold flex items-center gap-2">
              📊 Detalles del Análisis
            </h2>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
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

        {/* Mobile: History Panel (Bottom Sheet) */}
        {showHistoryPanel && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-[1500] animate-fade-in"
            onClick={() => setShowHistoryPanel(false)}
          >
            <div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[70vh] flex flex-col animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              {/* Header */}
              <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white px-6 py-4 shadow-md">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    🌾 Análisis de Cultivos
                  </h2>
                  <button
                    onClick={() => setShowHistoryPanel(false)}
                    className="text-white/80 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Date Selector */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 space-y-2 mt-3">
                  <label
                    htmlFor="analysis-date-mobile"
                    className="text-xs font-semibold flex items-center gap-2"
                  >
                    📅 Fecha de Análisis
                  </label>
                  <input
                    id="analysis-date-mobile"
                    type="date"
                    value={analysisDate}
                    onChange={(e) => setAnalysisDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border-2 border-green-300 bg-white text-green-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                  />
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <ErrorBoundary>
                  <PopupStack
                    onPopupSelect={(popup) => {
                      handlePopupSelect(popup);
                      setShowHistoryPanel(false);
                    }}
                    selectedPopupId={selectedPopupId}
                  />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        )}

        {/* Mobile: Details Panel (Bottom Sheet) */}
        {showDetailsPanel && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-[1500] animate-fade-in"
            onClick={() => setShowDetailsPanel(false)}
          >
            <div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-4 shadow-md">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    📊 Detalles del Análisis
                  </h2>
                  <button
                    onClick={() => setShowDetailsPanel(false)}
                    className="text-white/80 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
