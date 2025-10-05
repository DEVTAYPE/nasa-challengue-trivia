export interface MapResult2 {
  analysis_data_summary: Analysisdatasummary;
  analysis_info: Analysisinfo;
  buffer_geojson: Buffergeojson;
  detailed_recommendations: Detailedrecommendation[];
  questions: QuestionMap[];
  top_recommendations: Detailedrecommendation[];
}

export interface Buffergeojson {
  geometry: Geometry;
  properties: Properties;
  type: string;
}

export interface Properties {
  center: Coordinates;
  description: string;
  name: string;
  radius_km: number;
}

export interface Geometry {
  coordinates: number[][][];
  type: string;
}

export interface Analysisinfo {
  analysis_date: string;
  analysis_month: number;
  coordinates: Coordinates;
  total_crops_analyzed: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Analysisdatasummary {
  ndvi: Ndvi;
  precipitation: Ndvi;
  soil_moisture: Ndvi;
  temperature: Ndvi;
}

export interface Ndvi {
  mean: number;
  quality: string;
  range: string;
}

// =========================}

interface Detailedrecommendation {
  // analysis_log: string[];
  base_score: number;
  confidence_level: "high" | "medium" | "low";
  crop_name: string;
  growth_period_days: number;
  harvest_date: string;
  planting_date: string;
  regional_multiplier: number;
  suitability_score: number;
  yield_potential: "high" | "medium" | "low";
}

interface QuestionMap {
  correctAnswer: number;
  cropType: string;
  id: string;
  levelId: number;
  optionExplanations: string[];
  options: string[];
  points: number;
  question: string;
}
