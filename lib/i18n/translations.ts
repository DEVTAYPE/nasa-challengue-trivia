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
      badge: "Connecting Ancestral Wisdom with NASA Data",
      title: "Learn to Cultivate Like an Expert Using Real Data from",
      titleHighlight: "NASA Satellites.",
      subtitle: "Discover the Power of Sustainable Agriculture in the Andes!",
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
  },

  es: {
    nav: {
      home: "Inicio",
      game: "Jugar",
      map: "Mapa de Cultivos",
      about: "Acerca de",
    },

    hero: {
      badge: "Conectando la sabiduría ancestral con los datos de la NASA",
      title: "Aprende a cultivar como un experto usando datos reales de",
      titleHighlight: "satélites de la NASA.",
      subtitle: "¡Descubre el poder de la agricultura sostenible en los Andes!",
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
  },
};

// Helper function to get translations
export const getTranslations = (lang: Language): Translations => {
  return translations[lang];
};
