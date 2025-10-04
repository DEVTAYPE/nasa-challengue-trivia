import { Question } from "../../domain/entities/Question";

/**
 * Preguntas para el cultivo de MAÍZ
 * Organizadas por nivel (1-6)
 */
export const cornQuestions: Question[] = [
  // NIVEL 1: Primeros Pasos
  {
    id: "corn-1-1",
    cropType: "corn",
    levelId: 1,
    question: "¿Cuál es el nombre científico del maíz?",
    options: [
      "Triticum aestivum",
      "Zea mays",
      "Oryza sativa",
      "Solanum tuberosum",
    ],
    correctAnswer: 1,
    explanation:
      "Zea mays es el nombre científico del maíz, una planta originaria de Mesoamérica.",
    points: 20,
  },
  {
    id: "corn-1-2",
    cropType: "corn",
    levelId: 1,
    question: "¿Cuántos días aproximadamente tarda el maíz en germinar?",
    options: ["3-5 días", "7-10 días", "15-20 días", "25-30 días"],
    correctAnswer: 1,
    explanation:
      "El maíz generalmente germina entre 7 y 10 días después de la siembra en condiciones óptimas.",
    points: 20,
  },
  {
    id: "corn-1-3",
    cropType: "corn",
    levelId: 1,
    question: "¿Qué tipo de suelo es ideal para el cultivo de maíz?",
    options: [
      "Suelo arenoso puro",
      "Suelo arcilloso pesado",
      "Suelo franco con buen drenaje",
      "Suelo muy ácido",
    ],
    correctAnswer: 2,
    explanation:
      "El maíz crece mejor en suelos francos con buen drenaje y pH entre 5.5 y 7.5.",
    points: 20,
  },
  {
    id: "corn-1-4",
    cropType: "corn",
    levelId: 1,
    question: "¿A qué temperatura óptima germina el maíz?",
    options: ["5-10°C", "15-18°C", "25-30°C", "35-40°C"],
    correctAnswer: 2,
    explanation:
      "La temperatura óptima para la germinación del maíz está entre 25-30°C.",
    points: 20,
  },
  {
    id: "corn-1-5",
    cropType: "corn",
    levelId: 1,
    question:
      "¿Cuál es el ciclo de vida promedio del maíz desde siembra hasta cosecha?",
    options: ["30-45 días", "60-80 días", "90-120 días", "150-180 días"],
    correctAnswer: 2,
    explanation:
      "El maíz tiene un ciclo de vida de aproximadamente 90 a 120 días, dependiendo de la variedad.",
    points: 20,
  },

  // NIVEL 2: Explorador
  {
    id: "corn-2-1",
    cropType: "corn",
    levelId: 2,
    question: "¿Cuál es un síntoma de estrés hídrico en el maíz?",
    options: [
      "Hojas enrolladas en forma de tubo",
      "Hojas de color verde oscuro brillante",
      "Crecimiento excesivo del tallo",
      "Flores abundantes",
    ],
    correctAnswer: 0,
    explanation:
      "Cuando el maíz sufre estrés hídrico, las hojas se enrollan para reducir la pérdida de agua.",
    points: 20,
  },
  {
    id: "corn-2-2",
    cropType: "corn",
    levelId: 2,
    question: "¿Qué plaga es más común en el cultivo de maíz?",
    options: [
      "Mosca blanca",
      "Gusano cogollero (Spodoptera frugiperda)",
      "Pulgón verde",
      "Araña roja",
    ],
    correctAnswer: 1,
    explanation:
      "El gusano cogollero es una de las plagas más destructivas del maíz, afectando las hojas y mazorcas.",
    points: 20,
  },
  {
    id: "corn-2-3",
    cropType: "corn",
    levelId: 2,
    question: "¿Cómo se identifica la deficiencia de nitrógeno en el maíz?",
    options: [
      "Hojas superiores amarillas",
      "Hojas inferiores amarillas en forma de 'V'",
      "Manchas rojas en el tallo",
      "Raíces negras",
    ],
    correctAnswer: 1,
    explanation:
      "La deficiencia de nitrógeno causa amarillamiento en las hojas inferiores, iniciando en la punta en forma de 'V'.",
    points: 20,
  },
  {
    id: "corn-2-4",
    cropType: "corn",
    levelId: 2,
    question: "¿Cuánta agua necesita el maíz durante su ciclo de crecimiento?",
    options: ["200-300 mm", "400-600 mm", "800-1000 mm", "1200-1500 mm"],
    correctAnswer: 1,
    explanation:
      "El maíz requiere entre 400-600 mm de agua durante todo su ciclo de crecimiento.",
    points: 20,
  },
  {
    id: "corn-2-5",
    cropType: "corn",
    levelId: 2,
    question: "¿En qué etapa el maíz es más susceptible al estrés hídrico?",
    options: [
      "Germinación",
      "Floración y polinización",
      "Maduración",
      "Después de la cosecha",
    ],
    correctAnswer: 1,
    explanation:
      "La floración y polinización es la etapa más crítica para el agua; el estrés reduce significativamente el rendimiento.",
    points: 20,
  },

  // NIVEL 3: Maestro Explorador
  {
    id: "corn-3-1",
    cropType: "corn",
    levelId: 3,
    question:
      "¿Qué nutriente es más importante durante la fase de crecimiento vegetativo del maíz?",
    options: ["Calcio", "Nitrógeno", "Hierro", "Zinc"],
    correctAnswer: 1,
    explanation:
      "El nitrógeno es esencial para el crecimiento vegetativo y el desarrollo de las hojas del maíz.",
    points: 20,
  },
  {
    id: "corn-3-2",
    cropType: "corn",
    levelId: 3,
    question:
      "¿Cuándo se debe aplicar la mayor cantidad de fertilizante nitrogenado?",
    options: [
      "Antes de la siembra",
      "Durante V6-V8 (6-8 hojas)",
      "Durante la floración",
      "Después de la cosecha",
    ],
    correctAnswer: 1,
    explanation:
      "La mayor demanda de nitrógeno ocurre entre V6-V8, cuando la planta crece rápidamente.",
    points: 20,
  },
  {
    id: "corn-3-3",
    cropType: "corn",
    levelId: 3,
    question: "¿Qué método de riego es más eficiente para el maíz?",
    options: [
      "Riego por inundación",
      "Riego por aspersión",
      "Riego por goteo",
      "Riego manual",
    ],
    correctAnswer: 2,
    explanation:
      "El riego por goteo es el más eficiente, entregando agua directamente a las raíces con mínimas pérdidas.",
    points: 20,
  },
  {
    id: "corn-3-4",
    cropType: "corn",
    levelId: 3,
    question: "¿Qué indica un índice NDVI alto en un cultivo de maíz?",
    options: [
      "Planta enferma",
      "Falta de agua",
      "Planta saludable con buen vigor",
      "Suelo pobre",
    ],
    correctAnswer: 2,
    explanation:
      "Un NDVI alto indica vegetación saludable y vigorosa con buena actividad fotosintética.",
    points: 20,
  },
  {
    id: "corn-3-5",
    cropType: "corn",
    levelId: 3,
    question: "¿Cuál es el pH ideal del suelo para el maíz?",
    options: ["4.0-5.0", "5.5-7.5", "8.0-9.0", "9.5-10.5"],
    correctAnswer: 1,
    explanation:
      "El maíz prefiere un pH de suelo entre 5.5 y 7.5 para una óptima absorción de nutrientes.",
    points: 20,
  },

  // NIVEL 4: Juego Perfecto (NDVI + SMAP)
  {
    id: "corn-4-1",
    cropType: "corn",
    levelId: 4,
    question: "¿Qué mide el satélite SMAP?",
    options: [
      "Temperatura del aire",
      "Humedad del suelo",
      "Velocidad del viento",
      "Radiación solar",
    ],
    correctAnswer: 1,
    explanation:
      "SMAP (Soil Moisture Active Passive) mide la humedad del suelo desde el espacio.",
    points: 20,
  },
  {
    id: "corn-4-2",
    cropType: "corn",
    levelId: 4,
    question: "¿Qué significa un NDVI de 0.8 en un cultivo de maíz?",
    options: [
      "Vegetación muerta",
      "Vegetación escasa",
      "Vegetación densa y saludable",
      "Suelo desnudo",
    ],
    correctAnswer: 2,
    explanation:
      "Un NDVI de 0.8 indica vegetación muy densa y saludable con alta biomasa.",
    points: 20,
  },
  {
    id: "corn-4-3",
    cropType: "corn",
    levelId: 4,
    question:
      "Si SMAP muestra baja humedad y NDVI está disminuyendo, ¿qué acción tomar?",
    options: [
      "No hacer nada",
      "Aplicar más fertilizante",
      "Aumentar el riego inmediatamente",
      "Cosechar",
    ],
    correctAnswer: 2,
    explanation:
      "Baja humedad con NDVI decreciente indica estrés hídrico; se debe aumentar el riego urgentemente.",
    points: 20,
  },
  {
    id: "corn-4-4",
    cropType: "corn",
    levelId: 4,
    question:
      "¿En qué rango de valores se encuentra típicamente el NDVI para maíz saludable?",
    options: ["-0.5 a 0.0", "0.0 a 0.3", "0.3 a 0.6", "0.6 a 0.9"],
    correctAnswer: 3,
    explanation:
      "El maíz saludable generalmente tiene valores de NDVI entre 0.6 y 0.9.",
    points: 20,
  },
  {
    id: "corn-4-5",
    cropType: "corn",
    levelId: 4,
    question: "¿Qué profundidad del suelo mide principalmente SMAP?",
    options: ["0-5 cm", "0-10 cm", "0-5 metros", "Solo la superficie"],
    correctAnswer: 0,
    explanation:
      "SMAP mide principalmente la humedad en los primeros 5 cm del suelo.",
    points: 20,
  },

  // NIVEL 5: Buscador de Conocimiento (OpenET)
  {
    id: "corn-5-1",
    cropType: "corn",
    levelId: 5,
    question: "¿Qué es la evapotranspiración (ET)?",
    options: [
      "Solo evaporación del suelo",
      "Solo transpiración de plantas",
      "Suma de evaporación del suelo y transpiración de plantas",
      "Precipitación acumulada",
    ],
    correctAnswer: 2,
    explanation:
      "La ET es la combinación de la evaporación del agua del suelo y la transpiración de las plantas.",
    points: 20,
  },
  {
    id: "corn-5-2",
    cropType: "corn",
    levelId: 5,
    question: "¿Qué indica una ET alta en tu cultivo de maíz?",
    options: [
      "Bajo consumo de agua",
      "Alto consumo de agua y actividad metabólica",
      "Planta dormida",
      "Suelo saturado",
    ],
    correctAnswer: 1,
    explanation:
      "Una ET alta indica que el cultivo está activamente transpirando y consumiendo agua.",
    points: 20,
  },
  {
    id: "corn-5-3",
    cropType: "corn",
    levelId: 5,
    question: "¿Cómo ayuda OpenET a optimizar el riego?",
    options: [
      "Midiendo solo la temperatura",
      "Calculando el uso real de agua del cultivo",
      "Prediciendo plagas",
      "Midiendo nutrientes del suelo",
    ],
    correctAnswer: 1,
    explanation:
      "OpenET calcula la evapotranspiración real, permitiendo ajustar el riego a las necesidades del cultivo.",
    points: 20,
  },
  {
    id: "corn-5-4",
    cropType: "corn",
    levelId: 5,
    question: "¿Cuál es la ET promedio diaria del maíz en pleno crecimiento?",
    options: ["1-2 mm/día", "3-5 mm/día", "6-8 mm/día", "10-12 mm/día"],
    correctAnswer: 2,
    explanation:
      "Durante el crecimiento activo, el maíz puede tener una ET de 6-8 mm por día.",
    points: 20,
  },
  {
    id: "corn-5-5",
    cropType: "corn",
    levelId: 5,
    question: "¿Qué estrategia mejora la sostenibilidad del cultivo de maíz?",
    options: [
      "Riego excesivo constante",
      "Riego deficitario controlado",
      "No regar nunca",
      "Regar solo una vez al mes",
    ],
    correctAnswer: 1,
    explanation:
      "El riego deficitario controlado optimiza el uso del agua manteniendo rendimientos aceptables.",
    points: 20,
  },

  // NIVEL 6: Experto en Satélites (Integración total)
  {
    id: "corn-6-1",
    cropType: "corn",
    levelId: 6,
    question: "¿Qué mide el satélite GPM?",
    options: [
      "Temperatura del suelo",
      "Precipitación global",
      "Viento",
      "Contaminación del aire",
    ],
    correctAnswer: 1,
    explanation:
      "GPM (Global Precipitation Measurement) mide la precipitación global desde el espacio.",
    points: 20,
  },
  {
    id: "corn-6-2",
    cropType: "corn",
    levelId: 6,
    question: "¿Qué indica un NDWI alto?",
    options: [
      "Suelo seco",
      "Alto contenido de agua en la vegetación",
      "Vegetación muerta",
      "Alta temperatura",
    ],
    correctAnswer: 1,
    explanation:
      "NDWI (Normalized Difference Water Index) alto indica buen contenido de agua en las plantas.",
    points: 20,
  },
  {
    id: "corn-6-3",
    cropType: "corn",
    levelId: 6,
    question:
      "¿Qué satélite proporciona datos de temperatura superficial terrestre?",
    options: ["GPM", "SMAP", "MODIS", "Landsat únicamente"],
    correctAnswer: 2,
    explanation:
      "MODIS proporciona datos de temperatura superficial terrestre entre muchos otros parámetros.",
    points: 20,
  },
  {
    id: "corn-6-4",
    cropType: "corn",
    levelId: 6,
    question:
      "Combinando NDVI bajo, SMAP bajo y GPM sin lluvias, ¿qué situación enfrentas?",
    options: [
      "Cultivo saludable",
      "Sequía severa",
      "Exceso de agua",
      "Plaga de insectos",
    ],
    correctAnswer: 1,
    explanation:
      "Esta combinación indica sequía severa: vegetación estresada, suelo seco y sin precipitación.",
    points: 20,
  },
  {
    id: "corn-6-5",
    cropType: "corn",
    levelId: 6,
    question:
      "¿Qué resolución espacial tiene típicamente Landsat para análisis de cultivos?",
    options: ["1 metro", "10 metros", "30 metros", "100 metros"],
    correctAnswer: 2,
    explanation:
      "Landsat tiene una resolución espacial de 30 metros, adecuada para monitorear parcelas agrícolas.",
    points: 20,
  },
];
