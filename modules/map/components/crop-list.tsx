import { useLanguage } from "@/lib/i18n/language-context";
import React from "react";

interface CropRecommendation {
  crop: string;
  overall_suitability_score?: number;
}

interface CropData {
  top_recommendations?: CropRecommendation[];
}

interface CropListProps {
  cropData: CropData | null;
  onCropSelect: (index: number) => void;
  selectedCropIndex: number | null;
}

export const CropList: React.FC<CropListProps> = ({
  cropData,
  onCropSelect,
  selectedCropIndex,
}) => {
  const { t, language } = useLanguage();

  if (!cropData || !cropData.top_recommendations) {
    return (
      <div className="crop-list-container">
        <h3>🌾 {t.map.recommendedCrops}</h3>
        <p>{t.map.clickInstruction}</p>
      </div>
    );
  }

  const { top_recommendations } = cropData;

  return (
    <div className="crop-list-container">
      <h3>🌾 {t.map.recommendedCrops}</h3>
      <div className="crop-list">
        {top_recommendations.map((crop, index) => (
          <div
            key={index}
            className={`crop-list-item ${
              selectedCropIndex === index ? "selected" : ""
            }`}
            onClick={() => onCropSelect(index)}
          >
            <div className="crop-name">{crop.crop}</div>
            <div
              className={`crop-score score-${getScoreClass(
                crop.overall_suitability_score || 0
              )}`}
            >
              {Math.round((crop.overall_suitability_score || 0) * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getScoreClass = (score: number): string => {
  if (score >= 0.8) return "excellent";
  if (score >= 0.6) return "good";
  if (score >= 0.4) return "moderate";
  return "low";
};
