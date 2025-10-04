import { Question } from "../../domain/entities/Question";

/**
 * Preguntas para el cultivo de QUINOA
 * Organizadas por nivel (1-6)
 */
export const quinoaQuestions: Question[] = [
  // NIVEL 1: Primeros Pasos
  {
    id: "quinoa-1-1",
    cropType: "quinoa",
    levelId: 1,
    question: "¿Cuál es el nombre científico de la quinoa?",
    options: [
      "Zea mays",
      "Solanum tuberosum",
      "Chenopodium quinoa",
      "Triticum aestivum",
    ],
    correctAnswer: 2,
    explanation:
      "Chenopodium quinoa es el nombre científico de la quinoa, pseudocereal andino.",
    points: 20,
  },
  {
    id: "quinoa-1-2",
    cropType: "quinoa",
    levelId: 1,
    question: "¿Cuál es la principal ventaja de la quinoa?",
    options: [
      "Requiere mucha agua",
      "Tolerancia a la sequía",
      "Solo crece en calor extremo",
      "No tiene proteínas",
    ],
    correctAnswer: 1,
    explanation:
      "La quinoa es altamente tolerante a la sequía, adaptada a condiciones áridas andinas.",
    points: 20,
  },
  {
    id: "quinoa-1-3",
    cropType: "quinoa",
    levelId: 1,
    question: "¿Cuánto tarda el ciclo de la quinoa desde siembra a cosecha?",
    options: ["60-80 días", "90-120 días", "150-180 días", "200-240 días"],
    correctAnswer: 2,
    explanation:
      "La quinoa tiene un ciclo de 150-180 días dependiendo de la variedad y condiciones.",
    points: 20,
  },
  {
    id: "quinoa-1-4",
    cropType: "quinoa",
    levelId: 1,
    question: "¿En qué altitud crece mejor la quinoa?",
    options: ["0-500 msnm", "500-1500 msnm", "2500-4000 msnm", "Nivel del mar"],
    correctAnswer: 2,
    explanation:
      "La quinoa crece óptimamente en altitudes de 2500-4000 metros sobre el nivel del mar.",
    points: 20,
  },
  {
    id: "quinoa-1-5",
    cropType: "quinoa",
    levelId: 1,
    question: "¿Qué parte de la quinoa se consume?",
    options: ["Las hojas", "Las raíces", "Las semillas (granos)", "El tallo"],
    correctAnswer: 2,
    explanation:
      "Los granos o semillas de quinoa son la parte comestible, ricas en proteínas.",
    points: 20,
  },

  // NIVEL 2: Explorador
  {
    id: "quinoa-2-1",
    cropType: "quinoa",
    levelId: 2,
    question: "¿Cuál es la principal plaga de la quinoa?",
    options: [
      "Gusano cogollero",
      "Polilla de la quinoa",
      "Mosca blanca",
      "Trips",
    ],
    correctAnswer: 1,
    explanation:
      "La polilla de la quinoa (Eurysacca melanocampta) es la plaga más importante.",
    points: 20,
  },
  {
    id: "quinoa-2-2",
    cropType: "quinoa",
    levelId: 2,
    question: "¿Qué indica hojas amarillas en la base de la quinoa?",
    options: [
      "Exceso de agua",
      "Deficiencia de nitrógeno",
      "Planta saludable",
      "Mucha luz",
    ],
    correctAnswer: 1,
    explanation:
      "Las hojas inferiores amarillas indican deficiencia de nitrógeno.",
    points: 20,
  },
  {
    id: "quinoa-2-3",
    cropType: "quinoa",
    levelId: 2,
    question: "¿Cuánta agua necesita la quinoa comparada con otros cultivos?",
    options: ["Mucho más", "Similar", "Mucho menos", "No necesita agua"],
    correctAnswer: 2,
    explanation:
      "La quinoa requiere 300-400 mm de agua, significativamente menos que maíz o papa.",
    points: 20,
  },
  {
    id: "quinoa-2-4",
    cropType: "quinoa",
    levelId: 2,
    question: "¿En qué etapa la quinoa es más sensible al estrés hídrico?",
    options: [
      "Germinación",
      "Floración y llenado de grano",
      "Maduración",
      "Cosecha",
    ],
    correctAnswer: 1,
    explanation:
      "Durante floración y llenado de grano, el estrés hídrico reduce significativamente el rendimiento.",
    points: 20,
  },
  {
    id: "quinoa-2-5",
    cropType: "quinoa",
    levelId: 2,
    question: "¿Qué enfermedad afecta más a la quinoa en condiciones húmedas?",
    options: ["Roya", "Mildiú", "Fusarium", "Virus del mosaico"],
    correctAnswer: 1,
    explanation:
      "El mildiú (Peronospora farinosa) ataca la quinoa en condiciones de alta humedad.",
    points: 20,
  },

  // NIVEL 3: Maestro Explorador
  {
    id: "quinoa-3-1",
    cropType: "quinoa",
    levelId: 3,
    question: "¿Qué nutriente es más importante para la quinoa?",
    options: ["Nitrógeno", "Fósforo", "Potasio", "Todos por igual"],
    correctAnswer: 0,
    explanation:
      "El nitrógeno es crítico para el crecimiento vegetativo y proteína del grano.",
    points: 20,
  },
  {
    id: "quinoa-3-2",
    cropType: "quinoa",
    levelId: 3,
    question: "¿Cuál es el pH ideal del suelo para quinoa?",
    options: ["4.0-5.0", "6.0-8.5", "9.0-10.0", "3.0-4.0"],
    correctAnswer: 1,
    explanation:
      "La quinoa tolera un amplio rango de pH entre 6.0 y 8.5, incluso suelos salinos.",
    points: 20,
  },
  {
    id: "quinoa-3-3",
    cropType: "quinoa",
    levelId: 3,
    question: "¿Qué estrategia de riego es mejor para quinoa?",
    options: [
      "Riego abundante constante",
      "Riego mínimo estratégico en etapas críticas",
      "No regar nunca",
      "Inundar el campo",
    ],
    correctAnswer: 1,
    explanation:
      "La quinoa responde mejor a riego estratégico en floración y llenado de grano.",
    points: 20,
  },
  {
    id: "quinoa-3-4",
    cropType: "quinoa",
    levelId: 3,
    question: "¿Qué indica un NDVI alto en quinoa?",
    options: [
      "Planta enferma",
      "Vegetación densa y saludable",
      "Suelo seco",
      "Falta de luz",
    ],
    correctAnswer: 1,
    explanation:
      "NDVI alto indica vegetación vigorosa con buena cobertura foliar.",
    points: 20,
  },
  {
    id: "quinoa-3-5",
    cropType: "quinoa",
    levelId: 3,
    question: "¿La quinoa tolera suelos salinos?",
    options: [
      "No, es muy sensible",
      "Sí, moderadamente",
      "Solo agua salada",
      "No crece en suelos",
    ],
    correctAnswer: 1,
    explanation:
      "La quinoa tiene moderada tolerancia a la salinidad, ventaja en suelos marginales.",
    points: 20,
  },

  // NIVEL 4: Juego Perfecto
  {
    id: "quinoa-4-1",
    cropType: "quinoa",
    levelId: 4,
    question:
      "Si SMAP muestra baja humedad pero NDVI está bien, ¿qué significa?",
    options: [
      "La quinoa está estresada",
      "La quinoa está usando eficientemente el agua disponible",
      "Hay enfermedad",
      "Necesita más fertilizante",
    ],
    correctAnswer: 1,
    explanation:
      "La quinoa puede mantener buen vigor con poca agua gracias a su tolerancia a la sequía.",
    points: 20,
  },
  {
    id: "quinoa-4-2",
    cropType: "quinoa",
    levelId: 4,
    question: "¿Qué rango de NDVI indica quinoa saludable?",
    options: ["0.1-0.3", "0.4-0.7", "0.8-0.9", "1.0"],
    correctAnswer: 1,
    explanation:
      "La quinoa saludable tiene NDVI entre 0.4 y 0.7, menor que maíz por su menor biomasa.",
    points: 20,
  },
  {
    id: "quinoa-4-3",
    cropType: "quinoa",
    levelId: 4,
    question: "¿Cómo usar SMAP para optimizar riego en quinoa?",
    options: [
      "Regar siempre que esté bajo",
      "Regar solo en etapas críticas si está muy bajo",
      "No usar SMAP",
      "Ignorar la humedad",
    ],
    correctAnswer: 1,
    explanation:
      "En quinoa, el riego se prioriza en floración y llenado cuando SMAP indica déficit.",
    points: 20,
  },
  {
    id: "quinoa-4-4",
    cropType: "quinoa",
    levelId: 4,
    question: "Si NDVI cae bruscamente en quinoa, ¿qué revisar primero?",
    options: ["Temperatura", "Heladas o granizo", "Color del cielo", "Nada"],
    correctAnswer: 1,
    explanation:
      "La quinoa es sensible a heladas y granizo; caídas bruscas de NDVI pueden indicar daño físico.",
    points: 20,
  },
  {
    id: "quinoa-4-5",
    cropType: "quinoa",
    levelId: 4,
    question: "¿Qué ventaja tiene la quinoa según datos satelitales?",
    options: [
      "Requiere más agua que otros",
      "Mantiene NDVI aceptable con menos humedad (SMAP)",
      "No se puede medir con satélites",
      "Solo crece en invernaderos",
    ],
    correctAnswer: 1,
    explanation:
      "La quinoa mantiene vigor con menor humedad del suelo, ventaja en zonas áridas.",
    points: 20,
  },

  // NIVEL 5: Buscador de Conocimiento
  {
    id: "quinoa-5-1",
    cropType: "quinoa",
    levelId: 5,
    question: "¿Cuál es la ET típica de la quinoa?",
    options: ["2-3 mm/día", "4-5 mm/día", "7-8 mm/día", "10-12 mm/día"],
    correctAnswer: 0,
    explanation:
      "La quinoa tiene una ET de 2-3 mm/día, menor que maíz o papa, refleja su eficiencia.",
    points: 20,
  },
  {
    id: "quinoa-5-2",
    cropType: "quinoa",
    levelId: 5,
    question: "¿Cómo OpenET ayuda en zonas áridas con quinoa?",
    options: [
      "No ayuda",
      "Identifica cuándo regar mínimamente",
      "Solo funciona en zonas húmedas",
      "Mide solo temperatura",
    ],
    correctAnswer: 1,
    explanation:
      "OpenET permite maximizar eficiencia hídrica identificando momentos críticos de riego.",
    points: 20,
  },
  {
    id: "quinoa-5-3",
    cropType: "quinoa",
    levelId: 5,
    question: "¿Qué indica una ET muy alta en quinoa?",
    options: [
      "Uso eficiente del agua",
      "Posible estrés o exceso de evaporación",
      "Planta dormida",
      "Todo normal",
    ],
    correctAnswer: 1,
    explanation:
      "ET alta en quinoa puede indicar estrés o condiciones de alta evaporación atmosférica.",
    points: 20,
  },
  {
    id: "quinoa-5-4",
    cropType: "quinoa",
    levelId: 5,
    question: "¿Por qué la quinoa es sostenible según OpenET?",
    options: [
      "Requiere mucha agua",
      "Baja ET indica bajo consumo de agua",
      "No es sostenible",
      "Solo crece una vez",
    ],
    correctAnswer: 1,
    explanation:
      "La quinoa tiene baja ET, consumiendo menos agua que otros cultivos, ideal para sostenibilidad.",
    points: 20,
  },
  {
    id: "quinoa-5-5",
    cropType: "quinoa",
    levelId: 5,
    question: "¿Cómo mejorar el rendimiento de quinoa con OpenET?",
    options: [
      "Regar todo el tiempo",
      "Regar estratégicamente en floración según ET",
      "No regar",
      "Solo usar fertilizantes",
    ],
    correctAnswer: 1,
    explanation:
      "OpenET ayuda a optimizar el riego en floración, maximizando rendimiento con mínima agua.",
    points: 20,
  },

  // NIVEL 6: Experto en Satélites
  {
    id: "quinoa-6-1",
    cropType: "quinoa",
    levelId: 6,
    question: "¿Qué satélite ayuda a predecir heladas en quinoa?",
    options: ["GPM", "MODIS (temperatura superficial)", "SMAP", "Landsat"],
    correctAnswer: 1,
    explanation:
      "MODIS proporciona temperatura superficial terrestre, útil para predecir heladas.",
    points: 20,
  },
  {
    id: "quinoa-6-2",
    cropType: "quinoa",
    levelId: 6,
    question:
      "Si GPM no muestra lluvias, SMAP bajo y NDVI aún aceptable, ¿qué pasa?",
    options: [
      "La quinoa está muriendo",
      "La quinoa está usando eficientemente agua residual",
      "Hay exceso de agua",
      "Hay plaga",
    ],
    correctAnswer: 1,
    explanation:
      "La quinoa puede mantener vigor con poca agua gracias a su adaptación a sequía.",
    points: 20,
  },
  {
    id: "quinoa-6-3",
    cropType: "quinoa",
    levelId: 6,
    question:
      "¿Qué índice satelital es más útil para monitorear estrés por sequía en quinoa?",
    options: [
      "NDVI solo",
      "NDWI solo",
      "NDVI + SMAP + NDWI",
      "Solo temperatura",
    ],
    correctAnswer: 2,
    explanation:
      "La combinación NDVI + SMAP + NDWI da una visión completa del estrés hídrico.",
    points: 20,
  },
  {
    id: "quinoa-6-4",
    cropType: "quinoa",
    levelId: 6,
    question:
      "¿Cuál es la mejor frecuencia de monitoreo satelital para quinoa?",
    options: ["Anual", "Mensual", "Semanal", "Cada 3 meses"],
    correctAnswer: 2,
    explanation:
      "Monitoreo semanal permite detectar cambios rápidos y tomar decisiones oportunas.",
    points: 20,
  },
  {
    id: "quinoa-6-5",
    cropType: "quinoa",
    levelId: 6,
    question:
      "¿Cuál es la principal ventaja de integrar todos los satélites para quinoa?",
    options: [
      "Solo cuesta dinero",
      "Decisiones precisas maximizando rendimiento con mínimos recursos",
      "No hay ventajas",
      "Solo funciona en laboratorio",
    ],
    correctAnswer: 1,
    explanation:
      "La integración satelital permite optimizar cada decisión, crítico en cultivos de bajos recursos como quinoa.",
    points: 20,
  },
];
