// Sistema de traducciones para la aplicación
// Fácil de modificar y mantener

export type Language = "en" | "es";

export interface Translations {
  // Navigation
  nav: {
    home: string;
    game: string;
    map: string;
    about: string;
  };

  // Hero Section
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    cta: string;
  };

  // About Project Section
  about: {
    title: string;
    subtitle: string;
    gameTitle: string;
    gameDescription: string;
    levelsTitle: string;
    levelsDescription: string;
    mapTitle: string;
    mapDescription: string;
    missionTitle: string;
    missionDescription: string;
    features: {
      levels: string;
      questions: string;
      difficulty: string;
      exploration: string;
    };
  };

  // History Section
  history: {
    title: string;
    subtitle: string;
    intro: string;
    ancientTitle: string;
    ancientText: string;
    modernTitle: string;
    modernText: string;
    inspirationTitle: string;
    inspirationText: string;
    quote: string;
    quoteAuthor: string;
  };

  // Common
  common: {
    learnMore: string;
    startNow: string;
    readMore: string;
  };

  // Dashboard
  dashboard: {
    title: string;
    selectCrop: string;
    selectLevel: string;
    progress: string;
    completed: string;
    available: string;
    locked: string;
    duration: string;
    repeatLevel: string;
    startAdventure: string;
    levelLocked: string;
    closeHint: string;
    difficulties: {
      easy: string;
      medium: string;
      hard: string;
      epic: string;
    };
    levels: {
      [key: number]: {
        title: string;
        description: string;
      };
    };
  };

  // Trivia
  trivia: {
    question: string;
    of: string;
    timeRemaining: string;
    submit: string;
    continue: string;
    correctAnswer: string;
    incorrectAnswer: string;
    correctAnswerWas: string;
    finish: {
      completed: string;
      notPassed: string;
      congratulations: string;
      needMorePractice: string;
      tooManyWrong: string;
      failed: string;
      maxAllowed: string;
      rating: string;
      correct: string;
      incorrect: string;
      backToMap: string;
      retry: string;
      continueToMap: string;
      retryLevel: string;
    };
  };

  // Map
  map: {
    title: string;
    subtitle: string;
    clickInstruction: string;
    analyzing: string;
    error: string;
    location: string;
    analysisDate: string;
    recommendedCrops: string;
    suitability: string;
    high: string;
    medium: string;
    low: string;
    selectCrop: string;
    cropDetails: string;
    temperature: string;
    precipitation: string;
    soilMoisture: string;
    vegetation: string;
    waterIndex: string;
    playTrivia: string;
    viewDetails: string;
    noData: string;
    loading: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      game: "Play Game",
      map: "Crop Map",
      about: "About",
    },

    hero: {
      badge: "Nasa satellite crop advisor",
      title: "Optimize planting using five years of satellite and climate data",
      titleHighlight: "Learn by playing",
      subtitle:
        "Analyzing 5 years of NASA data (MODIS, ERA5, SRTM) + user input (coordinates, temperature, irrigation, altitude) via a smart questionnaire to recommend optimal crops and planting windows!",
      cta: "🌱 Start Playing",
    },

    about: {
      title: "About the Project",
      subtitle: "An educational adventure through agriculture",
      gameTitle: "Crop Trivia Challenge",
      gameDescription:
        "Test your knowledge with an exciting trivia game about crops, organized into 6 progressive levels.",
      levelsTitle: "6 Difficulty Levels",
      levelsDescription:
        "Each level represents a mountain that you must climb with the right crop. Progress from beginner to expert!",
      mapTitle: "Interactive Exploration",
      mapDescription:
        "Use our interactive map to discover which crops grow in different regions of Peru and make strategic decisions.",
      missionTitle: "Your Mission",
      missionDescription:
        "For each level, you must: Explore the map to identify suitable crops → Answer questions correctly → Make the crop climb the mountain → Unlock the next level!",
      features: {
        levels: "6 Progressive Levels",
        questions: "Questions by Difficulty",
        difficulty: "Easy, Medium, Hard",
        exploration: "Interactive Map Exploration",
      },
    },

    history: {
      title: "Agricultural Heritage of Ayacucho",
      subtitle: "The inspiration behind our project",
      intro:
        "Ayacucho, Peru, has a rich agricultural history spanning millennia, from ancient Andean civilizations to modern sustainable farming.",
      ancientTitle: "Ancient Roots",
      ancientText:
        "The Wari culture (600-1100 AD) developed sophisticated agricultural systems in Ayacucho, including terraces and irrigation canals. They cultivated quinoa, potatoes, and corn at different altitudes, demonstrating deep understanding of microclimates.",
      modernTitle: "Modern Agriculture",
      modernText:
        "Today, Ayacucho continues this legacy with over 60% of its population engaged in agriculture. The region produces native potatoes, quinoa, wheat, barley, and traditional Andean crops, maintaining ancestral techniques while embracing innovation.",
      inspirationTitle: "Our Inspiration",
      inspirationText:
        "This project honors Ayacucho's agricultural wisdom. By combining traditional knowledge with NASA satellite data, we help new generations understand and value sustainable agriculture in the Andes.",
      quote:
        "Agriculture is not just about food, it's about preserving our identity and connection to the land.",
      quoteAuthor: "Andean Farmer Proverb",
    },

    common: {
      learnMore: "Learn More",
      startNow: "Start Now",
      readMore: "Read More",
    },

    dashboard: {
      title: "Game Dashboard",
      selectCrop: "Select a Crop",
      selectLevel: "Select a Level",
      progress: "Progress",
      completed: "Completed",
      available: "Available",
      locked: "Locked",
      duration: "Duration",
      repeatLevel: "Repeat Level",
      startAdventure: "Start Adventure",
      levelLocked: "Level Locked",
      closeHint: "to close",
      difficulties: {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        epic: "Epic",
      },
      levels: {
        1: {
          title: "First Steps",
          description: "Growth cycle, basic water needs, ideal soil.",
        },
        2: {
          title: "Explorer",
          description:
            "Identify symptoms of water stress and common pests in crops.",
        },
        3: {
          title: "Master Explorer",
          description:
            "Manage fertilization and irrigation by stages in different crops.",
        },
        4: {
          title: "Perfect Game",
          description:
            "Comprehensive diagnosis, decision making under pressure. NDVI + SMAP combination.",
        },
        5: {
          title: "Knowledge Seeker",
          description:
            "Resource optimization, sustainability, performance. OpenET (evapotranspiration).",
        },
        6: {
          title: "Satellite Expert",
          description:
            "All satellites: GPM, SMAP, MODIS, NDVI, NDWI. Total data integration.",
        },
      },
    },

    trivia: {
      question: "Question",
      of: "of",
      timeRemaining: "Time remaining",
      submit: "Submit Answer",
      continue: "Continue",
      correctAnswer: "Correct!",
      incorrectAnswer: "Incorrect",
      correctAnswerWas: "The correct answer was:",
      finish: {
        completed: "Completed!",
        notPassed: "Not Passed!",
        congratulations: "Congratulations! You've completed the level.",
        needMorePractice: "You need more practice to pass this level.",
        tooManyWrong: "Too many incorrect answers",
        failed: "You failed",
        maxAllowed: "questions. The maximum allowed is",
        rating: "Your Rating",
        correct: "Correct",
        incorrect: "Incorrect",
        backToMap: "Back to Map",
        retry: "Retry",
        continueToMap: "Continue to Map",
        retryLevel: "Retry Level",
      },
    },

    // Map
    map: {
      title: "Interactive Crop Map",
      subtitle: "Explore Peru and discover suitable crops",
      clickInstruction: "Click on the map to analyze a location",
      analyzing: "Analyzing 5 years of NASA data for the location.",
      error: "Error loading data",
      location: "Location",
      analysisDate: "Analysis Date",
      recommendedCrops: "Recommended Crops",
      suitability: "Suitability",
      high: "High",
      medium: "Medium",
      low: "Low",
      selectCrop: "Select a crop to see details",
      cropDetails: "Crop Details",
      temperature: "Temperature",
      precipitation: "Precipitation",
      soilMoisture: "Soil Moisture",
      vegetation: "Vegetation (NDVI)",
      waterIndex: "Water Index (NDWI)",
      playTrivia: "Play Trivia",
      viewDetails: "View Details",
      noData: "No data available",
      loading: "Loading...",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      game: "Jugar",
      map: "Mapa de Cultivos",
      about: "Acerca de",
    },

    hero: {
      badge: "Nasa satellite crop advisor",
      title: "Aprende a cultivar como un experto usando datos reales de",
      titleHighlight: "satélites de la NASA.",
      subtitle:
        "¡Analizamos 5 años de datos de la NASA (MODIS, ERA5, SRTM) + información proporcionada por los usuarios (coordenadas, temperatura, riego, altitud) mediante un cuestionario inteligente para recomendar los cultivos y las épocas de siembra óptimos!",
      cta: "🌱 Empezar a Jugar",
    },

    about: {
      title: "Sobre el Proyecto",
      subtitle: "Una aventura educativa a través de la agricultura",
      gameTitle: "Trivia de Cultivos",
      gameDescription:
        "Pon a prueba tus conocimientos con un emocionante juego de trivia sobre cultivos, organizado en 6 niveles progresivos.",
      levelsTitle: "6 Niveles de Dificultad",
      levelsDescription:
        "Cada nivel representa una montaña que debes escalar con el cultivo correcto. ¡Progresa de principiante a experto!",
      mapTitle: "Exploración Interactiva",
      mapDescription:
        "Usa nuestro mapa interactivo para descubrir qué cultivos crecen en diferentes regiones de Perú y toma decisiones estratégicas.",
      missionTitle: "Tu Misión",
      missionDescription:
        "Para cada nivel debes: Explorar el mapa para identificar cultivos adecuados → Responder preguntas correctamente → Hacer que el cultivo escale la montaña → ¡Desbloquear el siguiente nivel!",
      features: {
        levels: "6 Niveles Progresivos",
        questions: "Preguntas por Dificultad",
        difficulty: "Fácil, Medio, Difícil",
        exploration: "Exploración de Mapa Interactivo",
      },
    },

    history: {
      title: "Patrimonio Agrícola de Ayacucho",
      subtitle: "La inspiración detrás de nuestro proyecto",
      intro:
        "Ayacucho, Perú, tiene una rica historia agrícola que abarca milenios, desde las antiguas civilizaciones andinas hasta la agricultura sostenible moderna.",
      ancientTitle: "Raíces Ancestrales",
      ancientText:
        "La cultura Wari (600-1100 d.C.) desarrolló sofisticados sistemas agrícolas en Ayacucho, incluyendo terrazas y canales de riego. Cultivaban quinua, papa y maíz en diferentes altitudes, demostrando un profundo entendimiento de los microclimas.",
      modernTitle: "Agricultura Moderna",
      modernText:
        "Hoy, Ayacucho continúa este legado con más del 60% de su población dedicada a la agricultura. La región produce papas nativas, quinua, trigo, cebada y cultivos andinos tradicionales, manteniendo técnicas ancestrales mientras abraza la innovación.",
      inspirationTitle: "Nuestra Inspiración",
      inspirationText:
        "Este proyecto honra la sabiduría agrícola de Ayacucho. Al combinar conocimiento tradicional con datos satelitales de la NASA, ayudamos a las nuevas generaciones a comprender y valorar la agricultura sostenible en los Andes.",
      quote:
        "La agricultura no es solo sobre alimento, es sobre preservar nuestra identidad y conexión con la tierra.",
      quoteAuthor: "Proverbio Campesino Andino",
    },

    common: {
      learnMore: "Conocer Más",
      startNow: "Comenzar Ahora",
      readMore: "Leer Más",
    },

    dashboard: {
      title: "Tablero del Juego",
      selectCrop: "Selecciona un Cultivo",
      selectLevel: "Selecciona un Nivel",
      progress: "Progreso",
      completed: "Completado",
      available: "Disponible",
      locked: "Bloqueado",
      duration: "Duración",
      repeatLevel: "Repetir Nivel",
      startAdventure: "Comenzar Aventura",
      levelLocked: "Nivel Bloqueado",
      closeHint: "para cerrar",
      difficulties: {
        easy: "Fácil",
        medium: "Medio",
        hard: "Difícil",
        epic: "Épico",
      },
      levels: {
        1: {
          title: "Primeros Pasos",
          description:
            "Ciclo de crecimiento, necesidades básicas de agua, suelo ideal.",
        },
        2: {
          title: "Explorador",
          description:
            "Identifica síntomas de estrés hídrico y plagas comunes en cultivos.",
        },
        3: {
          title: "Maestro Explorador",
          description:
            "Gestiona fertilización y riego por etapas en diferentes cultivos.",
        },
        4: {
          title: "Juego Perfecto",
          description:
            "Diagnóstico integral, toma de decisiones bajo presión. Combinación NDVI + SMAP.",
        },
        5: {
          title: "Buscador de Conocimiento",
          description:
            "Optimización de recursos, sostenibilidad, rendimiento. OpenET (evapotranspiración).",
        },
        6: {
          title: "Experto en Satélites",
          description:
            "Todos los satélites: GPM, SMAP, MODIS, NDVI, NDWI. Integración total de datos.",
        },
      },
    },

    trivia: {
      question: "Pregunta",
      of: "de",
      timeRemaining: "Tiempo restante",
      submit: "Enviar Respuesta",
      continue: "Continuar",
      correctAnswer: "¡Correcto!",
      incorrectAnswer: "Incorrecto",
      correctAnswerWas: "La respuesta correcta era:",
      finish: {
        completed: "¡Completado!",
        notPassed: "¡No Superado!",
        congratulations: "¡Felicitaciones! Has completado el nivel.",
        needMorePractice: "Necesitas más práctica para pasar este nivel.",
        tooManyWrong: "Demasiadas respuestas incorrectas",
        failed: "Fallaste",
        maxAllowed: "preguntas. El máximo permitido es",
        rating: "Tu Calificación",
        correct: "Correctas",
        incorrect: "Incorrectas",
        backToMap: "Volver al Mapa",
        retry: "Reintentar",
        continueToMap: "Continuar al Mapa",
        retryLevel: "Reintentar Nivel",
      },
    },

    // Map
    map: {
      title: "Mapa Interactivo de Cultivos",
      subtitle: "Explora Perú y descubre cultivos adecuados",
      clickInstruction: "Haz clic en el mapa para analizar una ubicación",
      analyzing: "Análisis de 5 años de datos de la NASA sobre la ubicación...",
      error: "Error al cargar datos",
      location: "Ubicación",
      analysisDate: "Fecha de Análisis",
      recommendedCrops: "Cultivos Recomendados",
      suitability: "Aptitud",
      high: "Alta",
      medium: "Media",
      low: "Baja",
      selectCrop: "Selecciona un cultivo para ver detalles",
      cropDetails: "Detalles del Cultivo",
      temperature: "Temperatura",
      precipitation: "Precipitación",
      soilMoisture: "Humedad del Suelo",
      vegetation: "Vegetación (NDVI)",
      waterIndex: "Índice de Agua (NDWI)",
      playTrivia: "Jugar Trivia",
      viewDetails: "Ver Detalles",
      noData: "No hay datos disponibles",
      loading: "Cargando...",
    },
  },
};

// Helper function to get translations
export const getTranslations = (lang: Language): Translations => {
  return translations[lang];
};
