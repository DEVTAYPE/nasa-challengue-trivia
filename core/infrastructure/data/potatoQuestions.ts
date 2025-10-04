import { Question } from "../../domain/entities/Question";

/**
 * Preguntas para el cultivo de PAPA
 * Organizadas por nivel (1-6)
 */
export const potatoQuestions: Question[] = [
  // NIVEL 1: Primeros Pasos
  {
    id: "potato-1-1",
    cropType: "potato",
    levelId: 1,
    question: "¿Cuál es el nombre científico de la papa?",
    options: [
      "Zea mays",
      "Solanum tuberosum",
      "Oryza sativa",
      "Triticum aestivum",
    ],
    correctAnswer: 1,
    explanation:
      "Solanum tuberosum es el nombre científico de la papa, originaria de los Andes.",
    points: 20,
  },
  {
    id: "potato-1-2",
    cropType: "potato",
    levelId: 1,
    question: "¿En qué rango de temperatura crece mejor la papa?",
    options: ["5-10°C", "15-20°C", "25-30°C", "35-40°C"],
    correctAnswer: 1,
    explanation:
      "La papa prefiere temperaturas frescas entre 15-20°C para su desarrollo óptimo.",
    points: 20,
  },
  {
    id: "potato-1-3",
    cropType: "potato",
    levelId: 1,
    question: "¿Cuántos días tarda el ciclo completo de la papa?",
    options: ["60-80 días", "90-120 días", "120-150 días", "180-210 días"],
    correctAnswer: 1,
    explanation:
      "La papa tiene un ciclo de 90-120 días dependiendo de la variedad.",
    points: 20,
  },
  {
    id: "potato-1-4",
    cropType: "potato",
    levelId: 1,
    question: "¿Qué parte de la planta se cosecha?",
    options: [
      "Las hojas",
      "Las flores",
      "Los tubérculos subterráneos",
      "Las semillas",
    ],
    correctAnswer: 2,
    explanation:
      "Los tubérculos (papas) crecen bajo tierra y son la parte comestible.",
    points: 20,
  },
  {
    id: "potato-1-5",
    cropType: "potato",
    levelId: 1,
    question: "¿Qué tipo de suelo prefiere la papa?",
    options: [
      "Muy arcilloso",
      "Franco arenoso bien drenado",
      "Muy arenoso",
      "Muy ácido",
    ],
    correctAnswer: 1,
    explanation:
      "La papa crece mejor en suelos franco arenosos con buen drenaje y pH 5.5-6.5.",
    points: 20,
  },

  // NIVEL 2: Explorador
  {
    id: "potato-2-1",
    cropType: "potato",
    levelId: 2,
    question: "¿Cuál es el principal síntoma del tizón tardío en papa?",
    options: [
      "Hojas amarillas",
      "Manchas marrones con borde amarillo en hojas",
      "Raíces negras",
      "Flores blancas",
    ],
    correctAnswer: 1,
    explanation:
      "El tizón tardío (Phytophthora infestans) causa manchas marrones características.",
    points: 20,
  },
  {
    id: "potato-2-2",
    cropType: "potato",
    levelId: 2,
    question: "¿Qué indica una papa con hojas enrolladas hacia arriba?",
    options: [
      "Exceso de agua",
      "Estrés hídrico",
      "Planta saludable",
      "Exceso de fertilizante",
    ],
    correctAnswer: 1,
    explanation:
      "Las hojas enrolladas indican que la planta está conservando agua por estrés hídrico.",
    points: 20,
  },
  {
    id: "potato-2-3",
    cropType: "potato",
    levelId: 2,
    question: "¿Cuánta agua necesita la papa durante su ciclo?",
    options: ["200-300 mm", "400-500 mm", "600-700 mm", "900-1000 mm"],
    correctAnswer: 1,
    explanation:
      "La papa requiere 400-500 mm de agua durante su ciclo de crecimiento.",
    points: 20,
  },
  {
    id: "potato-2-4",
    cropType: "potato",
    levelId: 2,
    question: "¿Qué plaga ataca principalmente los tubérculos de papa?",
    options: [
      "Mariposa blanca",
      "Polilla de la papa",
      "Mosca de la fruta",
      "Pulgón verde",
    ],
    correctAnswer: 1,
    explanation:
      "La polilla de la papa (Phthorimaea operculella) daña los tubérculos en almacenamiento y campo.",
    points: 20,
  },
  {
    id: "potato-2-5",
    cropType: "potato",
    levelId: 2,
    question: "¿En qué etapa la papa es más sensible al déficit hídrico?",
    options: [
      "Germinación",
      "Tuberización",
      "Maduración",
      "Después de la cosecha",
    ],
    correctAnswer: 1,
    explanation:
      "Durante la tuberización, el estrés hídrico reduce significativamente el rendimiento.",
    points: 20,
  },

  // NIVEL 3: Maestro Explorador
  {
    id: "potato-3-1",
    cropType: "potato",
    levelId: 3,
    question: "¿Qué nutriente es crítico para la formación de tubérculos?",
    options: ["Nitrógeno", "Fósforo", "Potasio", "Calcio"],
    correctAnswer: 2,
    explanation:
      "El potasio es esencial para la formación y calidad de los tubérculos.",
    points: 20,
  },
  {
    id: "potato-3-2",
    cropType: "potato",
    levelId: 3,
    question: "¿Cuándo aplicar el fertilizante potásico?",
    options: [
      "Solo al inicio",
      "Durante la tuberización",
      "Solo al final",
      "No aplicar",
    ],
    correctAnswer: 1,
    explanation:
      "El potasio debe estar disponible durante la tuberización para optimizar el rendimiento.",
    points: 20,
  },
  {
    id: "potato-3-3",
    cropType: "potato",
    levelId: 3,
    question: "¿Qué método de riego es mejor para papa en zonas montañosas?",
    options: ["Inundación", "Aspersión", "Goteo", "Sin riego"],
    correctAnswer: 2,
    explanation:
      "El riego por goteo es ideal para terrenos con pendiente y optimiza el uso del agua.",
    points: 20,
  },
  {
    id: "potato-3-4",
    cropType: "potato",
    levelId: 3,
    question: "¿Qué significa un NDVI bajo en tu cultivo de papa?",
    options: [
      "Vegetación densa",
      "Vegetación estresada o escasa",
      "Suelo húmedo",
      "Fertilización correcta",
    ],
    correctAnswer: 1,
    explanation: "NDVI bajo indica vegetación con poco vigor o estresada.",
    points: 20,
  },
  {
    id: "potato-3-5",
    cropType: "potato",
    levelId: 3,
    question: "¿Cuál es el pH ideal para papa?",
    options: ["4.0-4.5", "5.5-6.5", "7.5-8.5", "9.0-10.0"],
    correctAnswer: 1,
    explanation:
      "La papa prefiere suelos ligeramente ácidos con pH entre 5.5 y 6.5.",
    points: 20,
  },

  // NIVEL 4: Juego Perfecto
  {
    id: "potato-4-1",
    cropType: "potato",
    levelId: 4,
    question:
      "Si SMAP muestra humedad baja y NDVI está cayendo en papa, ¿qué hacer?",
    options: [
      "Cosechar",
      "Regar inmediatamente",
      "Esperar lluvia",
      "Aplicar fertilizante",
    ],
    correctAnswer: 1,
    explanation:
      "Humedad baja con NDVI decreciente indica necesidad urgente de riego.",
    points: 20,
  },
  {
    id: "potato-4-2",
    cropType: "potato",
    levelId: 4,
    question: "¿Qué rango de NDVI indica una papa saludable?",
    options: ["0.0-0.2", "0.2-0.4", "0.5-0.8", "0.9-1.0"],
    correctAnswer: 2,
    explanation: "La papa saludable tiene NDVI entre 0.5 y 0.8.",
    points: 20,
  },
  {
    id: "potato-4-3",
    cropType: "potato",
    levelId: 4,
    question: "¿Qué detecta SMAP que es crítico para papa?",
    options: ["Temperatura aire", "Humedad del suelo", "Viento", "Luz solar"],
    correctAnswer: 1,
    explanation:
      "SMAP detecta humedad del suelo, fundamental para el manejo del riego en papa.",
    points: 20,
  },
  {
    id: "potato-4-4",
    cropType: "potato",
    levelId: 4,
    question: "¿Cómo usar NDVI para detectar enfermedades en papa?",
    options: [
      "No sirve",
      "Detecta caídas bruscas de vigor",
      "Solo mide temperatura",
      "Mide solo el agua",
    ],
    correctAnswer: 1,
    explanation:
      "NDVI detecta caídas de vigor que pueden indicar enfermedades como el tizón.",
    points: 20,
  },
  {
    id: "potato-4-5",
    cropType: "potato",
    levelId: 4,
    question: "Si SMAP está alto pero NDVI bajo, ¿qué problema hay?",
    options: [
      "Falta de agua",
      "Exceso de agua o enfermedad",
      "Todo normal",
      "Falta fertilizante",
    ],
    correctAnswer: 1,
    explanation:
      "Suelo húmedo con bajo vigor puede indicar exceso de agua o enfermedad radicular.",
    points: 20,
  },

  // NIVEL 5: Buscador de Conocimiento
  {
    id: "potato-5-1",
    cropType: "potato",
    levelId: 5,
    question: "¿Cuál es la ET típica de la papa en pleno crecimiento?",
    options: ["1-2 mm/día", "3-5 mm/día", "6-7 mm/día", "10-12 mm/día"],
    correctAnswer: 1,
    explanation:
      "La papa tiene una ET de 3-5 mm/día en pleno crecimiento vegetativo.",
    points: 20,
  },
  {
    id: "potato-5-2",
    cropType: "potato",
    levelId: 5,
    question: "¿Cómo reduce OpenET el desperdicio de agua en papa?",
    options: [
      "No lo hace",
      "Calcula el consumo real del cultivo",
      "Solo predice lluvias",
      "Mide plagas",
    ],
    correctAnswer: 1,
    explanation:
      "OpenET calcula la evapotranspiración real, permitiendo riego preciso según necesidades.",
    points: 20,
  },
  {
    id: "potato-5-3",
    cropType: "potato",
    levelId: 5,
    question: "¿Qué estrategia mejora la sostenibilidad en cultivo de papa?",
    options: [
      "Riego excesivo",
      "Riego deficitario controlado",
      "No regar",
      "Regar solo una vez",
    ],
    correctAnswer: 1,
    explanation:
      "El riego deficitario controlado optimiza recursos manteniendo rendimientos.",
    points: 20,
  },
  {
    id: "potato-5-4",
    cropType: "potato",
    levelId: 5,
    question: "¿Qué indica una ET muy baja en papa?",
    options: [
      "Cultivo muy activo",
      "Estrés hídrico o enfermedad",
      "Exceso de agua",
      "Planta saludable",
    ],
    correctAnswer: 1,
    explanation:
      "ET baja indica que la planta no está transpirando normalmente, señal de estrés.",
    points: 20,
  },
  {
    id: "potato-5-5",
    cropType: "potato",
    levelId: 5,
    question: "¿Cómo OpenET ayuda en zonas con escasez de agua?",
    options: [
      "No ayuda",
      "Identifica cuándo y cuánto regar eficientemente",
      "Solo mide temperatura",
      "Predice plagas",
    ],
    correctAnswer: 1,
    explanation:
      "OpenET permite gestionar el agua escasa mediante decisiones informadas sobre el riego.",
    points: 20,
  },

  // NIVEL 6: Experto en Satélites
  {
    id: "potato-6-1",
    cropType: "potato",
    levelId: 6,
    question: "¿Qué satélite mide precipitación para planificar riego de papa?",
    options: ["MODIS", "GPM", "Landsat", "Sentinel-1"],
    correctAnswer: 1,
    explanation:
      "GPM (Global Precipitation Measurement) mide precipitación global.",
    points: 20,
  },
  {
    id: "potato-6-2",
    cropType: "potato",
    levelId: 6,
    question: "¿Qué índice complementa mejor al NDVI para papa?",
    options: ["SAVI", "NDWI", "EVI", "Todos"],
    correctAnswer: 3,
    explanation:
      "NDWI muestra contenido de agua; combinado con NDVI da una visión completa.",
    points: 20,
  },
  {
    id: "potato-6-3",
    cropType: "potato",
    levelId: 6,
    question: "Si GPM muestra lluvia, SMAP alto y NDVI bajo, ¿qué pasa?",
    options: [
      "Sequía",
      "Exceso de agua o enfermedad",
      "Todo bien",
      "Falta luz",
    ],
    correctAnswer: 1,
    explanation:
      "Agua abundante pero bajo vigor indica problemas de drenaje o enfermedad.",
    points: 20,
  },
  {
    id: "potato-6-4",
    cropType: "potato",
    levelId: 6,
    question: "¿Qué resolución temporal tiene MODIS?",
    options: ["Diaria", "Semanal", "Mensual", "Anual"],
    correctAnswer: 0,
    explanation:
      "MODIS proporciona datos diarios, útil para monitoreo frecuente de cultivos.",
    points: 20,
  },
  {
    id: "potato-6-5",
    cropType: "potato",
    levelId: 6,
    question: "¿Cuál es la mejor combinación de satélites para papa?",
    options: [
      "Solo GPM",
      "GPM + SMAP + NDVI + MODIS",
      "Solo NDVI",
      "Solo SMAP",
    ],
    correctAnswer: 1,
    explanation:
      "La integración de múltiples satélites proporciona información completa para decisiones óptimas.",
    points: 20,
  },
];
