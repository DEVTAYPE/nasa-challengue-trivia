import { MapResult2 } from "@/core/domain/entities/map-result-2";
import { useLanguage } from "@/lib/i18n/language-context";
import React from "react";

interface CropDetailsProps {
  cropData: MapResult2 | null;
  selectedCropIndex: number | null;
  onCropSelect: (index: number) => void;
  locationInfo: any;
  loading: boolean;
  error: string | null;
}

export const CropDetails: React.FC<CropDetailsProps> = ({
  cropData,
  selectedCropIndex,
  onCropSelect,
  locationInfo,
  loading,
  error,
}) => {
  const { t, language } = useLanguage();

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-green-800 mb-2">
            🌾 {t.map.analyzing}
          </h3>
          <p className="text-gray-600">
            {language === "es"
              ? "Obteniendo recomendaciones para esta ubicación"
              : "Getting recommendations for this location"}
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center gap-2">
            <span>❌</span> {t.map.error}
          </h3>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!cropData || !cropData.top_recommendations) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-4">🌍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {language === "es" ? "Bienvenido" : "Welcome"}
          </h3>
          <p className="text-gray-600">{t.map.clickInstruction}</p>
        </div>
      </div>
    );
  }

  const selectedCrop =
    selectedCropIndex !== null
      ? cropData.top_recommendations[selectedCropIndex]
      : null;
  const { analysis_info, analysis_data_summary } = cropData;

  return (
    <div className="h-full overflow-y-auto px-3 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6 bg-gray-50">
      {/* Location Information */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span>📍</span>
            {locationInfo
              ? getLocationName(locationInfo)
              : analysis_info?.coordinates
              ? `${analysis_info.coordinates.lat?.toFixed(4) || "N/A"}°, ${
                  analysis_info.coordinates.lon?.toFixed(4) || "N/A"
                }°`
              : "Ubicación"}
          </h3>
        </div>
        {/* <div className="p-4 space-y-2">
          {locationInfo && analysis_info?.coordinates && (
            <p className="text-sm text-gray-600 font-mono">
              📐 {analysis_info.coordinates.lat?.toFixed(4) || "N/A"}°,{" "}
              {analysis_info.coordinates.lon?.toFixed(4) || "N/A"}°
            </p>
          )}
          {analysis_info && (
            <div className="grid grid-cols-2 gap-3 pt-2 border-t">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-600 mb-1">📅 Fecha Análisis</p>
                <p className="font-mono text-sm font-semibold text-blue-900">
                  {analysis_info.analysis_date}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-green-600 mb-1">🌱 Cultivos</p>
                <p className="font-mono text-sm font-semibold text-green-900">
                  {analysis_info.total_crops_analyzed}
                </p>
              </div>
            </div>
          )}
        </div> */}
      </div>

      {/* Top Recommendations */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 border-b-2 border-green-200">
          <h3 className="text-lg font-bold text-green-900 flex items-center gap-2">
            {language === "es"
              ? `Selecciona uno de ${
                  cropData.top_recommendations.length
                } cultivo${
                  cropData.top_recommendations.length !== 1 ? "s" : ""
                } que puedes jugar`
              : `Select one of ${cropData.top_recommendations.length} crop${
                  cropData.top_recommendations.length !== 1 ? "s" : ""
                } you can play`}
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {cropData.top_recommendations.map((crop, index) => (
            <div
              key={index}
              className={`w-full transition-all ${
                selectedCropIndex === index
                  ? "bg-green-100 border-l-4 border-green-600"
                  : ""
              }`}
            >
              <button
                onClick={() => onCropSelect(index)}
                className="w-full p-4 text-left hover:bg-green-50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                      {crop.crop_name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span
                        className={`px-2 py-0.5 rounded-full font-semibold ${getConfidenceBadgeClass(
                          crop.confidence_level
                        )}`}
                      >
                        {getConfidenceLevelLabel(crop.confidence_level)}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="font-mono">
                        {crop.growth_period_days}{" "}
                        {language === "es" ? "días" : "days"}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`text-xl font-bold px-4 py-2 rounded-lg ${getScoreColorClass(
                      crop.suitability_score
                    )}`}
                  >
                    {Math.round(crop.suitability_score)}%
                  </div>
                </div>
              </button>
              {selectedCropIndex === index && (
                <div className="px-4 pb-4">
                  <a
                    href={`/dashboard-game?crop=${encodeURIComponent(
                      crop.crop_name.toLowerCase()
                    )}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all active:scale-95 text-sm"
                  >
                    <span>🎮</span>
                    {language === "es"
                      ? `Jugar con ${crop.crop_name}`
                      : `Play with ${crop.crop_name}`}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Info - Solo cuando NO hay cultivo seleccionado */}
      {!selectedCrop && analysis_info && (
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-semibold text-blue-800">
              💡 {language === "es" ? "Consejo" : "Tip"}:
            </span>{" "}
            {t.map.selectCrop}
          </p>
        </div>
      )}

      {/* Selected Crop Details */}
      {selectedCrop && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span>🎯</span>
              Detalles: {selectedCrop.crop_name}
            </h3>
          </div>
          <div className="p-4 space-y-4">
            {/* Score Badge */}
            <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Puntuación de Idoneidad
                </p>
                <p className="text-3xl font-bold text-green-800">
                  {Math.round(selectedCrop.suitability_score)}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Potencial</p>
                <p
                  className={`text-lg font-semibold ${getYieldPotentialColorClass(
                    selectedCrop.yield_potential
                  )}`}
                >
                  {getYieldPotentialLabel(selectedCrop.yield_potential)}
                </p>
              </div>
            </div>

            {/* Planting Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-600 mb-1">
                  📅 Fecha de Siembra
                </p>
                <p className="font-mono text-sm font-semibold text-blue-900">
                  {selectedCrop.planting_date}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-green-600 mb-1">
                  🌾 Fecha de Cosecha
                </p>
                <p className="font-mono text-sm font-semibold text-green-900">
                  {selectedCrop.harvest_date}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-xs text-purple-600 mb-1">⏱️ Duración</p>
                <p className="font-mono text-sm font-semibold text-purple-900">
                  {selectedCrop.growth_period_days} días
                </p>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                <p className="text-xs text-amber-600 mb-1">📊 Confianza</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getConfidenceBadgeClass(
                      selectedCrop.confidence_level
                    )}`}
                  >
                    {getConfidenceLevelLabel(selectedCrop.confidence_level)}
                  </span>
                </div>
              </div>
            </div>

            {/* Environmental Conditions */}
            {analysis_data_summary && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span>📊</span>
                  Condiciones Ambientales
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {/* Temperature */}
                  <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-orange-600 font-semibold">
                        🌡️ Temperatura
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getQualityBadgeClass(
                          analysis_data_summary.temperature.quality
                        )}`}
                      >
                        {analysis_data_summary.temperature.quality}
                      </span>
                    </div>
                    <p className="font-mono text-lg font-bold text-orange-900">
                      {analysis_data_summary.temperature.mean}°C
                    </p>
                    <p className="text-xs text-orange-600 mt-1">
                      {analysis_data_summary.temperature.range}
                    </p>
                  </div>

                  {/* Precipitation */}
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-blue-600 font-semibold">
                        💧 Precipitación
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getQualityBadgeClass(
                          analysis_data_summary.precipitation.quality
                        )}`}
                      >
                        {analysis_data_summary.precipitation.quality}
                      </span>
                    </div>
                    <p className="font-mono text-lg font-bold text-blue-900">
                      {analysis_data_summary.precipitation.mean} mm
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      {analysis_data_summary.precipitation.range}
                    </p>
                  </div>

                  {/* Soil Moisture */}
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-green-600 font-semibold">
                        🌱 Humedad Suelo
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getQualityBadgeClass(
                          analysis_data_summary.soil_moisture.quality
                        )}`}
                      >
                        {analysis_data_summary.soil_moisture.quality}
                      </span>
                    </div>
                    <p className="font-mono text-lg font-bold text-green-900">
                      {analysis_data_summary.soil_moisture.mean}%
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      {analysis_data_summary.soil_moisture.range}
                    </p>
                  </div>

                  {/* NDVI */}
                  <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-emerald-600 font-semibold">
                        📈 NDVI
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getQualityBadgeClass(
                          analysis_data_summary.ndvi.quality
                        )}`}
                      >
                        {analysis_data_summary.ndvi.quality}
                      </span>
                    </div>
                    <p className="font-mono text-lg font-bold text-emerald-900">
                      {analysis_data_summary.ndvi.mean}
                    </p>
                    <p className="text-xs text-emerald-600 mt-1">
                      {analysis_data_summary.ndvi.range}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Scores Breakdown */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-bold text-gray-700 mb-3">
                Análisis de Puntuación
              </h4>
              <div className="space-y-2">
                <ScoreBar
                  label="Puntuación Base"
                  value={selectedCrop.base_score}
                  color="blue"
                />
                <ScoreBar
                  label="Multiplicador Regional"
                  value={selectedCrop.regional_multiplier}
                  color="purple"
                />
              </div>
            </div>

            {/* Analysis Log */}
            {selectedCrop.analysis_log &&
              selectedCrop.analysis_log.length > 0 && (
                <div className="border-t pt-4">
                  <details className="group">
                    <summary className="cursor-pointer text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <span className="group-open:rotate-90 transition-transform">
                        ▶
                      </span>
                      Registro de Análisis ({selectedCrop.analysis_log.length})
                    </summary>
                    <div className="mt-2 bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto">
                      <ul className="text-xs text-gray-700 space-y-1 font-mono">
                        {selectedCrop.analysis_log.map((log, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-gray-400">{idx + 1}.</span>
                            <span>{log}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

const getScoreClass = (score: number): string => {
  if (score >= 0.8) return "excellent";
  if (score >= 0.6) return "good";
  if (score >= 0.4) return "moderate";
  return "low";
};

const getScoreColorClass = (score: number): string => {
  if (score >= 0.8) return "text-green-600";
  if (score >= 0.6) return "text-lime-600";
  if (score >= 0.4) return "text-yellow-600";
  return "text-orange-600";
};

const getQualityBadgeClass = (quality: string): string => {
  const qualityLower = quality.toLowerCase();
  if (qualityLower === "high" || qualityLower === "alta") {
    return "bg-green-100 text-green-800 border border-green-300";
  }
  if (qualityLower === "medium" || qualityLower === "media") {
    return "bg-yellow-100 text-yellow-800 border border-yellow-300";
  }
  if (qualityLower === "low" || qualityLower === "baja") {
    return "bg-orange-100 text-orange-800 border border-orange-300";
  }
  return "bg-gray-100 text-gray-800 border border-gray-300";
};

// ScoreBar Component
interface ScoreBarProps {
  label: string;
  value: number;
  color: "blue" | "green" | "purple" | "amber";
}

const ScoreBar: React.FC<ScoreBarProps> = ({ label, value, color }) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
  };

  const bgClasses = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
    amber: "bg-amber-100",
  };

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-mono font-semibold text-gray-800">
          {Math.round(value)}%
        </span>
      </div>
      <div
        className={`w-full h-2 ${bgClasses[color]} rounded-full overflow-hidden`}
      >
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

const getQualityLabel = (key: string): string => {
  const labels: { [key: string]: string } = {
    ndvi_quality: "NDVI",
    temp_quality: "Temperatura",
    precip_quality: "Precipitación",
    soil_quality: "Humedad del Suelo",
    terrain_quality: "Terreno",
  };
  return labels[key] || key;
};

const getLocationName = (locationInfo: any): string => {
  if (!locationInfo) return "Ubicación desconocida";

  // Prioridad: display_name > address components > coordinates
  if (locationInfo.display_name) {
    // Extraer solo el nombre principal (antes de la primera coma)
    return locationInfo.display_name.split(",")[0];
  }

  if (locationInfo.address) {
    const address = locationInfo.address;
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

  // Fallback a coordenadas si no hay nombre
  if (locationInfo.lat && locationInfo.lng) {
    return `${locationInfo.lat.toFixed(4)}, ${locationInfo.lng.toFixed(4)}`;
  }

  return "Ubicación desconocida";
};

// Helper para formatear yield_potential (potencial de rendimiento)
const getYieldPotentialLabel = (
  potential: "high" | "medium" | "low"
): string => {
  const labels = {
    high: "Alto",
    medium: "Medio",
    low: "Bajo",
  };
  return labels[potential] || potential;
};

// Helper para formatear confidence_level (nivel de confianza)
const getConfidenceLevelLabel = (level: "high" | "medium" | "low"): string => {
  const labels = {
    high: "Alta",
    medium: "Media",
    low: "Baja",
  };
  return labels[level] || level;
};

// Helper para obtener clases de color según yield_potential
const getYieldPotentialColorClass = (
  potential: "high" | "medium" | "low"
): string => {
  const colors = {
    high: "text-green-600",
    medium: "text-amber-600",
    low: "text-orange-600",
  };
  return colors[potential] || "text-gray-600";
};

// Helper para obtener clases de badge según confidence_level
const getConfidenceBadgeClass = (level: "high" | "medium" | "low"): string => {
  const classes = {
    high: "bg-green-100 text-green-800 border border-green-300",
    medium: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    low: "bg-orange-100 text-orange-800 border border-orange-300",
  };
  return classes[level] || "bg-gray-100 text-gray-800 border border-gray-300";
};
