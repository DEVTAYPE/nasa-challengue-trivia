import { Question } from "../../domain/entities/Question";

/**
 * Preguntas para el cultivo de MAÍZ
 * Organizadas por nivel (1-6)
 * Nueva estructura con explicaciones individuales por opción
 */
export const cornQuestions: Question[] = [
  // ==================== NIVEL 1: Primeros Pasos ====================
  {
    id: "corn-1-1",
    cropType: "corn",
    levelId: 1,
    question:
      "¿Cómo se llama la flor masculina del maíz, que produce el polen?",
    options: ["Espiga", "Barba", "Chala", "Tusa"],
    correctAnswer: 0,
    optionExplanations: [
      "¡Muy bien! La espiga es esa estructura ramificada que crece en la parte superior del tallo del maíz, liberando el polen que luego caerá sobre la flor femenina (la mazorca).",
      "La 'barba' se refiere a los pelos (estigmas) que salen de la mazorca y cuya única función es capturar el polen, no producirlo.",
      "La chala es el nombre popular que le damos a las hojas que envuelven y protegen la mazorca.",
      "La tusa es el eje interno de la mazorca (el olote), que sostiene los granos.",
    ],
    points: 20,
  },
  {
    id: "corn-1-2",
    cropType: "corn",
    levelId: 1,
    question:
      '¿Cuál es la función principal de la "barba" o estigmas que emergen de la mazorca?',
    options: [
      "Capturar el polen para la fertilización",
      "Proteger el grano del sol",
      "Transportar agua del tallo",
      "Ayudar a la respiración de la planta",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Exacto! Cada hilo de la barba está conectado a un óvulo, y su trabajo es atrapar un grano de polen que viene de la espiga. Si no es polinizada, ese óvulo no se convertirá en un grano.",
      "Esa es la función de la chala, que es la capa de hojas que cubre la mazorca.",
      "El agua se transporta a través del xilema en el tallo y la tusa, no por la barba.",
      "Las hojas son la principal vía para el intercambio de gases y la respiración.",
    ],
    points: 20,
  },
  {
    id: "corn-1-3",
    cropType: "corn",
    levelId: 1,
    question:
      "¿Cuál es la primera etapa fenológica visible del maíz que ocurre después de la siembra?",
    options: ["Emergencia", "Floración", "Madurez", "Llenado de grano"],
    correctAnswer: 0,
    optionExplanations: [
      "¡Correcto! La Emergencia es cuando la plántula rompe la superficie del suelo y es el primer indicador de que la semilla germinó exitosamente.",
      "Esta es una etapa crítica que ocurre varias semanas después de la emergencia, cuando la planta ya está grande.",
      "Es la etapa final, cuando el grano ha completado su desarrollo y está listo para la cosecha.",
      "Esta etapa sigue inmediatamente a la fertilización, mucho después de la emergencia.",
    ],
    points: 20,
  },
  {
    id: "corn-1-4",
    cropType: "corn",
    levelId: 1,
    question:
      "¿Cómo se denomina el tallo principal del maíz, que sostiene la espiga y las mazorcas?",
    options: ["Caña", "Estolón", "Rizoma", "Bulbo"],
    correctAnswer: 0,
    optionExplanations: [
      "¡Ese es el término agronómico! El tallo del maíz se llama caña y es una estructura robusta y segmentada.",
      "Los estolones son tallos rastreros que se encuentran en plantas como la fresa y crecen sobre la superficie del suelo.",
      "Los rizomas son tallos subterráneos, como en el jengibre, no la parte aérea del maíz.",
      "El bulbo es una estructura de almacenamiento subterráneo, como en la cebolla.",
    ],
    points: 20,
  },
  {
    id: "corn-1-5",
    cropType: "corn",
    levelId: 1,
    question:
      "¿En qué etapa del ciclo de crecimiento la necesidad de agua del maíz es más crítica y una sequía podría causar la mayor pérdida de rendimiento?",
    options: [
      "Floración y formación de grano",
      "Emergencia",
      "Madurez",
      "Pre-siembra",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Conocimiento clave! El maíz necesita la mayor cantidad de agua en el momento en que está formando y llenando la mazorca. El estrés hídrico aquí reduce drásticamente el número y el tamaño de los granos.",
      "Si bien el agua es necesaria, la planta puede recuperarse de un estrés leve en esta fase inicial con menos impacto en el rendimiento final.",
      "En la madurez, el grano ya se formó. La falta de agua solo ayuda al secado.",
      "Se necesita humedad para la germinación, pero la máxima demanda de agua es durante la etapa reproductiva.",
    ],
    points: 20,
  },
  {
    id: "corn-1-6",
    cropType: "corn",
    levelId: 1,
    question:
      "¿Cuál es el rango de pH de suelo ideal para que la mayoría de las variedades de maíz absorban nutrientes de manera eficiente?",
    options: [
      "Ligeramente ácido a neutro (6.0 a 7.5)",
      "Muy ácido (4.0 a 5.0)",
      "Muy alcalino (8.5 a 9.5)",
      "Extremadamente alcalino (9.5+)",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Lo lograste! El maíz prefiere suelos con un pH en este rango, lo que garantiza la mejor disponibilidad de nutrientes esenciales como el Fósforo y el Nitrógeno.",
      "Este pH puede llevar a la toxicidad por aluminio e inhibir la absorción de Fósforo, dañando seriamente al maíz.",
      "Un pH tan alto puede causar deficiencias de micronutrientes como el Zinc o el Hierro.",
      "Un suelo así sería tóxico para la gran mayoría de los cultivos.",
    ],
    points: 20,
  },
  {
    id: "corn-1-7",
    cropType: "corn",
    levelId: 1,
    question:
      "¿Qué nutriente es el más demandado por el maíz para el crecimiento de las hojas, el tallo y la fotosíntesis (responsable del color verde intenso)?",
    options: ["Nitrógeno (N)", "Fósforo (P)", "Potasio (K)", "Calcio (Ca)"],
    correctAnswer: 0,
    optionExplanations: [
      "¡El campeón del crecimiento! El Nitrógeno es el componente principal de la clorofila y las proteínas, por lo que una deficiencia limita inmediatamente el crecimiento vegetativo y causa un amarillamiento general.",
      "El Fósforo es clave para la energía y la raíz, y su deficiencia causa tonos púrpuras.",
      "El Potasio ayuda en la regulación del agua y la resistencia, y su deficiencia se ve como quemaduras en los bordes de las hojas viejas.",
      "El Calcio es un nutriente estructural que afecta el crecimiento de los puntos nuevos, no la intensidad del color verde.",
    ],
    points: 20,
  },
  {
    id: "corn-1-8",
    cropType: "corn",
    levelId: 1,
    question: "¿A qué familia botánica pertenece el maíz?",
    options: [
      "Poaceae (Gramíneas)",
      "Solanáceas",
      "Fabáceas (Leguminosas)",
      "Quenopodiáceas",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Exacto! El maíz es un miembro orgulloso de la familia de las Gramíneas o Poáceas, al igual que el trigo, el arroz y la caña de azúcar.",
      "Esta familia incluye cultivos como la papa, el tomate y el ají.",
      "Esta familia incluye frijoles, lentejas y garbanzos, conocidos por fijar nitrógeno.",
      "Esta familia, ahora Amaranthaceae, incluye a la quinua.",
    ],
    points: 20,
  },
  {
    id: "corn-1-9",
    cropType: "corn",
    levelId: 1,
    question:
      "¿Cómo se llama la estructura leñosa que permanece después de desgranar la mazorca y que sirve de soporte a los granos?",
    options: ["Tusa (o Olote)", "Chala", "Barba", "Raíces"],
    correctAnswer: 0,
    optionExplanations: [
      "¡Lo sabes bien! La tusa es el núcleo de la mazorca. Su función es sostener los granos mientras crecen y llenan.",
      "La chala es el protector externo, no la estructura de soporte interna.",
      "La barba son los pelos que permiten la polinización.",
      "Las raíces están en el suelo y anclan la planta.",
    ],
    points: 20,
  },
  {
    id: "corn-1-10",
    cropType: "corn",
    levelId: 1,
    question:
      '¿Qué plaga es la más conocida por atacar el brote central del maíz joven, interrumpiendo el crecimiento y causando el síntoma conocido como "hoja de flecha"?',
    options: [
      "Gusano Cogollero (Spodoptera frugiperda)",
      "Gusano Blanco de la Papa",
      "Pulgón (Áfido)",
      "Mosca Blanca",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Un problema serio! El Gusano Cogollero ataca el punto de crecimiento más tierno. Su daño es devastador, y deja la hoja nueva (el cogollo) sin abrir, pareciendo una flecha.",
      "Este gusano se enfoca en las raíces y tubérculos, no en el cogollo del maíz.",
      "El pulgón succiona savia de las hojas, pero no perfora ni daña el cogollo de la misma manera destructiva que el cogollero.",
      "Es más un problema de transmisión de virus, no de daño mecánico al punto de crecimiento.",
    ],
    points: 20,
  },

  // ==================== NIVEL 2: Explorador ====================
  {
    id: "corn-2-1",
    cropType: "corn",
    levelId: 2,
    question:
      "¿Cuál es el síntoma de estrés hídrico más característico en el maíz durante el mediodía, incluso si hay humedad superficial en el suelo?",
    options: [
      'Enrollamiento de las hojas superiores (en forma de "V")',
      "Coloración púrpura-rojiza",
      "Amarillamiento de las hojas inferiores",
      "Necrosis en los bordes de las hojas viejas",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Buena observación! Cuando el maíz está estresado por falta de agua, enrolla las hojas superiores hacia adentro para reducir la superficie de exposición al sol y minimizar la pérdida de agua por transpiración.",
      "Esto se asocia más con la deficiencia de Fósforo (P).",
      "Es el síntoma típico de la deficiencia de Nitrógeno (N).",
      "Esto es un síntoma clásico de la deficiencia de Potasio (K).",
    ],
    points: 30,
  },
  {
    id: "corn-2-2",
    cropType: "corn",
    levelId: 2,
    question:
      "Si los datos del satélite GPM (Global Precipitation Measurement) de la NASA muestran una interrupción de lluvia durante la etapa de floración del maíz, ¿qué es lo más probable que ocurra?",
    options: [
      "Fallo en la polinización y pérdida de óvulos (choclos incompletos)",
      "Ataque masivo de Gusano Cogollero",
      "Tizón tardío por exceso de humedad",
      "Mejora en la absorción de Nitrógeno",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Diagnóstico preciso! La polinización es muy sensible a la sequía y al calor. La falta de agua puede esterilizar el polen y evitar que la barba (estigma) sea viable para la fertilización, resultando en mazorcas con granos faltantes.",
      "Las plagas están relacionadas con las condiciones climáticas, pero la falta de lluvia impacta directamente el proceso reproductivo de la planta.",
      "El dato GPM indica falta de humedad, lo contrario a lo que causa el tizón tardío.",
      "El Nitrógeno requiere agua para ser absorbido y transportado; la sequía reduce su absorción.",
    ],
    points: 30,
  },
  {
    id: "corn-2-3",
    cropType: "corn",
    levelId: 2,
    question:
      "La plaga Spodoptera frugiperda (Gusano Cogollero) es más destructiva en las primeras etapas del maíz. ¿Qué práctica de manejo cultural ayuda a reducir su población en el campo?",
    options: [
      "Siembra de variedades resistentes o el uso de barreras de plantas trampa",
      "Aporque de la planta",
      "Riego por inundación",
      "Aplicación de Potasio (K) foliar",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Medida preventiva inteligente! El uso de variedades de maíz que tienen alguna resistencia natural a la larva o sembrar plantas cebo para distraer a la plaga es un manejo cultural efectivo.",
      "El aporque protege el tallo y la raíz, pero el cogollero ataca la parte superior de la planta.",
      "Esta práctica no tiene un efecto directo en el control del gusano cogollero, y desperdicia agua.",
      "El Potasio es nutricional, no insecticida.",
    ],
    points: 30,
  },
  {
    id: "corn-2-4",
    cropType: "corn",
    levelId: 2,
    question:
      "¿Cuál es la época de siembra ideal para el maíz en regiones andinas para que la floración coincida con la temporada de mayor humedad y menor riesgo de heladas tempranas?",
    options: [
      "Inicios de la temporada de lluvias (Noviembre-Diciembre)",
      "Mediados de la temporada seca (Junio-Julio)",
      "Finales de la temporada de lluvias (Marzo-Abril)",
      "Cualquier mes, el maíz es resistente",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Calendario correcto! Sembrar al inicio de las lluvias garantiza que la fase crítica de floración y llenado de grano coincida con el período de máxima disponibilidad hídrica.",
      "Sembrar en la época seca es muy riesgoso y requiere riego completo, no es el período ideal.",
      "Si siembras tarde, la madurez podría ser alcanzada durante el pico de heladas tempranas, lo que es fatal para el grano.",
      "El maíz es sensible a las condiciones de siembra y floración.",
    ],
    points: 30,
  },
  {
    id: "corn-2-5",
    cropType: "corn",
    levelId: 2,
    question:
      "Los datos del satélite MODIS de la NASA te informan sobre la Temperatura de la Superficie Terrestre (LST). Si tu LST cae por debajo de 0°C durante la fase de emergencia del maíz, ¿cuál es el riesgo principal?",
    options: [
      "Muerte de las plántulas y necesidad de resiembra",
      "Aumento en la tasa de fotosíntesis",
      "Atracción de polillas (Spodoptera frugiperda)",
      "Bloqueo en la absorción de Nitrógeno",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Punto crítico! Las plántulas jóvenes de maíz son muy susceptibles a las bajas temperaturas. Una temperatura de 0°C o menos puede congelar sus tejidos, causando daño irreversible.",
      "El frío extremo detiene la fotosíntesis, no la aumenta.",
      "El frío suele reducir la actividad de los insectos.",
      "Aunque el frío reduce la absorción, el riesgo inmediato y más grave es la muerte de la planta.",
    ],
    points: 30,
  },
  {
    id: "corn-2-6",
    cropType: "corn",
    levelId: 2,
    question:
      'Si observas las hojas del maíz con un patrón de amarillamiento en forma de "V" (empezando por la punta y a lo largo de la nervadura central), ¿qué deficiencia nutricional es el diagnóstico más probable?',
    options: ["Nitrógeno (N)", "Fósforo (P)", "Potasio (K)", "Azufre (S)"],
    correctAnswer: 0,
    optionExplanations: [
      '¡El síntoma más clásico! El Nitrógeno es móvil en la planta, por lo que la planta lo mueve de las hojas viejas (inferiores) a las nuevas (superiores), causando este amarillamiento en forma de "V" en las hojas más viejas.',
      "Causa tonos púrpuras en las hojas viejas.",
      'Causa quemaduras o necrosis en los bordes de las hojas viejas, no la "V" amarilla.',
      "El Azufre no es móvil, por lo que su deficiencia aparece primero en las hojas más jóvenes (superiores).",
    ],
    points: 30,
  },
  {
    id: "corn-2-7",
    cropType: "corn",
    levelId: 2,
    question:
      "¿Cuál de los siguientes es el principal insecto que ataca y consume las raíces del maíz, especialmente en suelos con alto contenido de materia orgánica?",
    options: [
      "Gusano Alambre (Wireworm - Agriotes spp.)",
      "Mosca Blanca",
      "Pulgón de la Raíz",
      "Gusano Cogollero",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Diagnóstico de raíz! El Gusano Alambre es la plaga de suelo más común y peligrosa, ya que perfora y destruye las raíces, causando un gran problema de anclaje y absorción.",
      "Ataca las hojas y tallos, no las raíces.",
      "Aunque existe, el Gusano Alambre es mucho más destructivo y conocido en el maíz.",
      "Ataca el punto de crecimiento del tallo, no la raíz.",
    ],
    points: 30,
  },
  {
    id: "corn-2-8",
    cropType: "corn",
    levelId: 2,
    question:
      "En cuanto a la época de siembra, si siembras el maíz demasiado tarde en la temporada, ¿cuál es el riesgo más grande que enfrentará el cultivo al final de su ciclo?",
    options: [
      "Daño por heladas tempranas en la etapa de madurez",
      "Exceso de lluvia durante la emergencia",
      "Mayor ataque de Gusano Cogollero",
      "Deficiencia de Potasio (K)",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Un error costoso! Una siembra tardía empuja la maduración hacia los meses más fríos. Si una helada temprana golpea el grano que aún está húmedo, puede arruinar la cosecha.",
      "La lluvia es más probable al inicio de la temporada.",
      "El Cogollero es más activo al inicio del ciclo, no al final.",
      "La deficiencia de K no está ligada directamente a la época de siembra.",
    ],
    points: 30,
  },
  {
    id: "corn-2-9",
    cropType: "corn",
    levelId: 2,
    question:
      "El principal riesgo de sembrar maíz en suelos con mal drenaje (alto contenido de arcilla y propensos a encharcarse) es:",
    options: [
      "Pudrición radicular por falta de oxígeno",
      "Deficiencia de Nitrógeno",
      "Estrés por sequía",
      "Tasa de transpiración reducida",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Causa y efecto! Las raíces del maíz necesitan oxígeno para respirar. Si el suelo está saturado de agua por mucho tiempo, el oxígeno se agota y las raíces se asfixian y pudren.",
      "Aunque el encharcamiento puede causar pérdidas de Nitrógeno, el riesgo inmediato y letal para la planta es la pudrición de la raíz.",
      "El problema opuesto. El mal drenaje significa exceso de agua.",
      "La transpiración se regula por las hojas, aunque la pudrición sí detiene la absorción de agua.",
    ],
    points: 30,
  },
  {
    id: "corn-2-10",
    cropType: "corn",
    levelId: 2,
    question:
      "Si los datos MODIS de Temperatura de la Superficie Terrestre (LST) indican temperaturas consistentemente por encima de 35°C durante la floración del maíz, ¿qué impacto directo habrá en el rendimiento?",
    options: [
      "Esterilidad del polen y baja viabilidad de la barba (reducción drástica de granos)",
      "Deficiencia de Fósforo (P)",
      "Aumento en el ataque de Gusano Alambre",
      "Crecimiento vegetativo acelerado",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Temperatura crítica! El polen del maíz muere o se vuelve inviable cuando las temperaturas superan los 35°C, impidiendo la fertilización. Esto es una causa común de mazorcas parcialmente llenas.",
      "Las altas temperaturas no causan directamente deficiencia de P.",
      "El Gusano Alambre (de raíz) no está relacionado con la temperatura del aire.",
      "El crecimiento se aceleraría, pero la parte reproductiva (polen) sufriría un daño crítico.",
    ],
    points: 30,
  },

  // ==================== NIVEL 3: Maestro Explorador ====================
  {
    id: "corn-3-1",
    cropType: "corn",
    levelId: 3,
    question:
      "¿Cuál es la estrategia más eficiente para aplicar el Nitrógeno en el maíz, considerando su alta movilidad en el suelo?",
    options: [
      "Fraccionamiento de la dosis (aplicación dividida)",
      "Aplicar toda la dosis en la siembra",
      "Aplicación foliar continua",
      "Aplicar solo abono orgánico",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Maestría en nutrición! Aplicar el Nitrógeno en varias dosis (fraccionar), especialmente una antes de la siembra y otra en la etapa V6-V8 (alto crecimiento), asegura que el nutriente esté disponible cuando la planta lo necesita más y minimiza las pérdidas por lixiviación.",
      "Esto es ineficiente; gran parte del Nitrógeno se perdería por lavado o volatilización antes de que la planta lo necesite en su fase de mayor demanda.",
      "La aplicación foliar es útil para correcciones rápidas de micronutrientes, pero no es la forma eficiente de cubrir la alta demanda de Nitrógeno del maíz.",
      "Aunque el abono orgánico es excelente, la tasa de liberación de N puede ser muy lenta para cubrir la demanda crítica del maíz durante su desarrollo máximo.",
    ],
    points: 40,
  },
  {
    id: "corn-3-2",
    cropType: "corn",
    levelId: 3,
    question:
      "¿Qué dato del satélite SMAP (Soil Moisture Active Passive) de la NASA te permite decidir con precisión el momento óptimo para regar el maíz?",
    options: [
      "Cuando el valor de humedad volumétrica cae al 50% de la capacidad de campo",
      "Cuando la humedad sube al 90%",
      "Cuando el SMAP se correlaciona con un NDVI de 0.8",
      "Cuando el valor es inferior al 10%",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Decisión basada en ciencia! Regar cuando la humedad está alrededor del 50% de la capacidad de campo asegura que el maíz tenga suficiente agua disponible (Fácilmente Disponible) sin sufrir estrés severo ni encharcamiento.",
      "Esto sería un problema, ya que indica saturación y riesgo de pudrición radicular.",
      "El NDVI alto indica que la planta está sana, pero no te dice cuándo está a punto de estresarse por falta de agua.",
      "Esto es demasiado tarde; la planta ya estaría sufriendo un estrés hídrico severo e irreversible.",
    ],
    points: 40,
  },
  {
    id: "corn-3-3",
    cropType: "corn",
    levelId: 3,
    question:
      "La enfermedad Roya del Maíz (Puccinia sorghi) se controla mejor con fungicidas cuando se encuentra en su fase inicial. ¿En qué etapa fenológica del maíz debes priorizar la vigilancia para detectarla?",
    options: [
      "Fase de crecimiento vegetativo tardío (V10 en adelante) hasta la floración",
      "Etapa de emergencia (V1-V2)",
      "Madurez fisiológica",
      "Solo durante la siembra",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Vigilancia en el momento justo! La Roya aparece y se propaga rápidamente cuando la planta ya tiene una gran masa foliar. La aplicación preventiva en esta fase protege el área foliar que es crucial para el llenado de grano.",
      "La Roya es poco común en plántulas; la vigilancia debe intensificarse después del desarrollo del tallo.",
      "En esta etapa ya es demasiado tarde, el daño de la enfermedad ya está hecho y la planta no se beneficiará del fungicida.",
      "La siembra se centra en la aplicación de semilla y fertilizante; el monitoreo de enfermedades debe ser continuo después de la emergencia.",
    ],
    points: 40,
  },
  {
    id: "corn-3-4",
    cropType: "corn",
    levelId: 3,
    question:
      "Si el NDVI Avanzado de tu lote de maíz muestra una caída significativa y repentina (de 0.8 a 0.5) en la etapa de llenado de grano, ¿cuál es el diagnóstico más probable?",
    options: [
      "Inicio de la senescencia forzada debido a una deficiencia de Nitrógeno o Potasio",
      "Exceso de riego",
      "Daño por helada",
      "Ataque de Gusano Alambre",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Lectura experta! Una caída brusca del NDVI en una etapa tan crucial indica que las hojas están muriendo rápidamente. Esto suele ser causado por la planta movilizando urgentemente Nitrógeno o Potasio de las hojas viejas para llenar el grano.",
      "El exceso de riego llevaría a la pudrición radicular, pero la caída del NDVI es un síntoma de falta de nutrientes en las hojas.",
      "Las heladas causan una caída repentina, pero en este caso, la deficiencia nutricional es una causa común de senescencia acelerada.",
      "El Gusano Alambre causa problemas de emergencia y anclaje, no una caída repentina del NDVI en la fase de llenado.",
    ],
    points: 40,
  },
  {
    id: "corn-3-5",
    cropType: "corn",
    levelId: 3,
    question:
      "El Potasio (K) es esencial para el manejo del agua. ¿En qué etapa del ciclo de crecimiento la aplicación de Potasio es más vital para maximizar el rendimiento del maíz?",
    options: [
      "Llenado de grano",
      "Pre-siembra",
      "Emergencia (V1-V2)",
      "Madurez",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Rol vital! El Potasio regula la apertura y cierre de estomas (manejo del agua) y es clave en el transporte de azúcares de las hojas al grano. Una buena disponibilidad en esta etapa asegura el peso final del grano.",
      "Aunque se aplica una dosis base, el Potasio no es tan crítico al inicio como lo es el Fósforo para la raíz.",
      "El Potasio no es el principal impulsor del crecimiento inicial.",
      "En madurez, el Potasio ya ha cumplido su función; la planta ya está seca.",
    ],
    points: 40,
  },
  {
    id: "corn-3-6",
    cropType: "corn",
    levelId: 3,
    question:
      "¿Qué tipo de suelo debe evitarse para el cultivo de maíz debido a su baja capacidad para retener agua y nutrientes, requiriendo un manejo de riego constante?",
    options: [
      "Suelos arenosos (baja capacidad de retención)",
      "Suelos francos (ideal)",
      "Suelos arcillosos (alto riesgo de encharcamiento)",
      "Suelos volcánicos",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Identificaste el riesgo! Los suelos arenosos son livianos, drenan muy rápido y no retienen bien ni el agua ni los nutrientes, obligando a un riego y fertilización fraccionados constantes.",
      "Los suelos francos son considerados los ideales porque tienen un balance perfecto de agua, aire y retención de nutrientes.",
      "El riesgo aquí es el encharcamiento y la falta de oxígeno, no la falta de retención de agua.",
      "Muchos suelos volcánicos son excelentes para el maíz debido a su buena textura y contenido mineral.",
    ],
    points: 40,
  },
  {
    id: "corn-3-7",
    cropType: "corn",
    levelId: 3,
    question:
      "¿Cuál es el principal síntoma de la enfermedad Tizón Foliar del Maíz (Exserohilum turcicum) que debes buscar en las hojas?",
    options: [
      "Lesiones largas, elípticas y necróticas de color gris o bronceado",
      "Pústulas naranjas y redondas",
      "Manchas aceitosas que se vuelven angulares",
      "Amarillamiento total de la planta",
    ],
    correctAnswer: 0,
    optionExplanations: [
      '¡Ojo experto! El Tizón Foliar se caracteriza por estas lesiones alargadas que parecen "quemaduras" en las hojas, y que pueden unirse rápidamente, destruyendo el área foliar.',
      "Esto es un síntoma de la enfermedad de la Roya.",
      "Esto es más característico de la Mancha de la Hoja o de ataques bacterianos.",
      "Esto es un síntoma de deficiencia de Nitrógeno o senescencia.",
    ],
    points: 40,
  },
  {
    id: "corn-3-8",
    cropType: "corn",
    levelId: 3,
    question:
      "Si decides aplicar un riego deficitario controlado al maíz, ¿en qué etapa fenológica debe aplicarse la restricción hídrica para minimizar el impacto en el rendimiento?",
    options: [
      "Etapa vegetativa temprana (V4-V8)",
      "Floración (R1)",
      "Llenado de grano (R2-R4)",
      "Emergencia (V1)",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Manejo avanzado! El maíz es más tolerante a un estrés hídrico leve en su fase vegetativa temprana. Restringir un poco el agua aquí puede promover un desarrollo radicular más profundo sin comprometer seriamente la mazorca.",
      "El riego deficitario en floración es catastrófico y causa pérdidas masivas de rendimiento.",
      "La restricción en esta etapa resulta en granos livianos y mazorcas cortas.",
      "La restricción en emergencia puede llevar a la pérdida de plántulas y una población irregular.",
    ],
    points: 40,
  },
  {
    id: "corn-3-9",
    cropType: "corn",
    levelId: 3,
    question:
      "El NDVI avanzado (Índice de Vegetación de Diferencia Normalizada) en la etapa de floración se usa para estimar el área foliar. Un valor consistentemente bajo (menos de 0.4) indica que:",
    options: [
      "El cultivo tiene poca cobertura, lo que implica baja densidad o estrés nutricional/hídrico",
      "El campo está listo para la cosecha",
      "La absorción de Potasio es óptima",
      "Hay exceso de vegetación",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Alerta! Un NDVI bajo en floración significa que las hojas no están cubriendo bien el suelo (poca biomasa). Esto se debe a que las plantas están estresadas o hay muy pocas por hectárea.",
      "Un NDVI bajo indica un problema de salud, la cosecha se asocia con la madurez.",
      "El NDVI no mide directamente la absorción de Potasio.",
      "El exceso de vegetación daría un NDVI alto, cercano a 0.8 o 0.9.",
    ],
    points: 40,
  },
  {
    id: "corn-3-10",
    cropType: "corn",
    levelId: 3,
    question:
      "En la gestión de la fertilización, ¿cuál es el nutriente que, si está en déficit en la etapa de desarrollo inicial de la mazorca, causa una formación pobre de la punta (tip-filling)?",
    options: ["Potasio (K)", "Nitrógeno (N)", "Calcio (Ca)", "Boro (B)"],
    correctAnswer: 0,
    optionExplanations: [
      "¡El Potasio es el transportista! Un déficit de Potasio impide que la planta mueva eficientemente los azúcares hacia la punta de la mazorca, resultando en mazorcas que están incompletas en la parte final.",
      "La deficiencia de N afecta más el tamaño total de la mazorca y el número de granos, pero el K es más específico en el llenado de la punta.",
      "El Calcio es un nutriente poco móvil; sus deficiencias se ven en los puntos de crecimiento nuevos (hojas).",
      "Aunque el Boro es vital para la polinización, el Potasio es el principal limitante en el transporte para el llenado de la punta.",
    ],
    points: 40,
  },

  // ==================== NIVEL 4: Juego Perfecto ====================
  {
    id: "corn-4-1",
    cropType: "corn",
    levelId: 4,
    question:
      "Estás en la etapa de Llenado de Grano (R3). Observas un NDVI de 0.85 (muy sano), pero los datos SMAP indican que la humedad del suelo cayó al 30% de la capacidad de campo. ¿Cuál es la acción inmediata más crítica?",
    options: [
      "Aplicar un riego urgente (salvamento) para prevenir el colapso celular en el grano",
      "Aplicar fungicida para proteger las hojas",
      "Aplicar Nitrógeno foliar",
      "Reducir la densidad de siembra",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Decisión vital! El NDVI aún es alto porque el daño aún no es visible, pero la falta de humedad crítica (30%) en la etapa R3 significa que la planta está a horas de entrar en un estrés irreversible, deteniendo el llenado de grano.",
      "Esto no resuelve el problema de la falta de agua, que es la amenaza inmediata a la vida del cultivo.",
      "El Nitrógeno no es la limitante aquí, ya que el NDVI es alto. La restricción es el agua.",
      "La densidad es una decisión de siembra, no una acción correctiva de emergencia.",
    ],
    points: 50,
  },
  {
    id: "corn-4-2",
    cropType: "corn",
    levelId: 4,
    question:
      "En la etapa V12 (pre-floración), el NDVI está en 0.4 (bajo) y el SMAP reporta 85% de humedad del suelo. ¿Cuál es el problema más probable y la acción correctiva adecuada?",
    options: [
      "Problema: Pudrición radicular por encharcamiento. Acción: Mejorar el drenaje y aplicar fungicida de suelo",
      "Problema: Sequía severa. Acción: Riego urgente",
      "Problema: Deficiencia de Nitrógeno. Acción: Aplicar Nitrógeno",
      "Problema: Ataque de Gusano Cogollero. Acción: Insecticida",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Excelente diagnóstico de saturación! El NDVI bajo (poca salud) con humedad excesiva (85%) indica que las raíces se están asfixiando por falta de oxígeno, lo que lleva a la pudrición. Se debe detener el riego y trabajar el drenaje.",
      "El SMAP alto refuta la sequía. El problema es el exceso de agua.",
      "La pudrición radicular limita la absorción; corregir el drenaje es prioritario antes que aplicar fertilizante.",
      "Aunque podría haber plagas, el patrón de NDVI bajo y SMAP alto apunta directamente a un problema hídrico/radicular.",
    ],
    points: 50,
  },
  {
    id: "corn-4-3",
    cropType: "corn",
    levelId: 4,
    question:
      "Tienes un campo de maíz con NDVI heterogéneo (varios colores). El SMAP muestra que la humedad es uniforme (60%) en todo el campo. ¿Cuál es el diagnóstico más lógico de la heterogeneidad?",
    options: [
      "Variación en la fertilidad del suelo o en la densidad de siembra (problema no hídrico)",
      "Problema de riego por goteo defectuoso",
      "Fallo en la polinización",
      "Daño por helada",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Pensamiento lateral! Si la humedad (SMAP) es uniforme, pero la salud (NDVI) no lo es, la causa no es el riego. Las diferencias en el pH, la compactación o la cantidad de semillas plantadas son las razones más comunes.",
      "Si el riego falla, el SMAP mostraría heterogeneidad, no uniformidad.",
      "El fallo en la polinización es un problema tardío (floración/llenado de grano), y el NDVI reflejaría la salud en general de las hojas.",
      "El daño por helada suele ser geográfico (partes bajas del campo) y no se correlaciona con la humedad uniforme del suelo.",
    ],
    points: 50,
  },
  {
    id: "corn-4-4",
    cropType: "corn",
    levelId: 4,
    question:
      'El objetivo en la etapa V8 (máximo crecimiento vegetativo) es alcanzar el máximo NDVI (0.8+). Si el NDVI es bajo (0.5) y el SMAP es bajo (40%), ¿qué acción debe priorizarse para obtener el "Juego Perfecto"?',
    options: [
      "Riego inmediato para recuperar la humedad y una aplicación foliar de rescate (N+micronutrientes)",
      "Aplicar fungicida y esperar a la próxima lluvia",
      "Arar el campo para airear el suelo",
      "Monitorear solo la temperatura (MODIS)",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Doble acción! Ambos indicadores son malos: falta agua (SMAP bajo) y la planta está estresada (NDVI bajo). Corregir el agua es vital, pero la aplicación foliar de N dará un impulso rápido mientras el riego hace efecto en la raíz.",
      "Esto ignora la necesidad urgente de agua y nutrientes que reflejan ambos indicadores.",
      "Arar el campo en V8 es desastroso, cortaría las raíces de anclaje.",
      "Se debe usar MODIS, pero los datos SMAP y NDVI ya exigen una acción correctiva inmediata, no solo más monitoreo.",
    ],
    points: 50,
  },
  {
    id: "corn-4-5",
    cropType: "corn",
    levelId: 4,
    question:
      "Estás cerca de la cosecha (R6 - Madurez Fisiológica). El NDVI está en 0.3 y el SMAP en 20%. ¿Cuál es la decisión agronómica correcta?",
    options: [
      "Detener todo insumo y programar la cosecha",
      "Aplicar riego urgente",
      "Aplicar Nitrógeno para revivir la planta",
      "Aumentar el drenaje",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Hora de recoger la inversión! En R6, un NDVI bajo (senescencia natural) y una humedad muy baja son normales y deseables. Significa que la planta está seca y ha completado el llenado de grano.",
      "Aplicar riego ahora solo retrasaría la cosecha y podría fomentar enfermedades o pudrición de la mazorca.",
      "La planta ya completó su ciclo reproductivo, no se puede revivir.",
      "El drenaje ya es bajo (20%); el objetivo ahora es que seque.",
    ],
    points: 50,
  },
  {
    id: "corn-4-6",
    cropType: "corn",
    levelId: 4,
    question:
      "Tu campo tiene un área con NDVI alto (0.8) en etapa V10 (crecimiento), pero esa misma área tiene hojas pálidas y un SMAP de 70%. ¿Qué combinación de factores es la más probable?",
    options: [
      "Exceso de Nitrógeno y Potasio (K) con riesgo de vuelco (lodging)",
      "Estrés hídrico severo",
      "Deficiencia de Potasio y Fósforo",
      "Suelo arenoso",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "El NDVI alto es positivo, pero el SMAP alto (70%) indica mucho crecimiento vegetativo por el exceso de agua y N. Esto lleva a tallos blandos, alto riesgo de vuelco (lodging) y dificulta el manejo de enfermedades por el microclima.",
      "El SMAP de 70% refuta el estrés hídrico.",
      "Si hubiera deficiencia, el NDVI sería bajo, no alto.",
      "Los suelos arenosos tendrían un SMAP bajo debido a la baja retención.",
    ],
    points: 50,
  },
  {
    id: "corn-4-7",
    cropType: "corn",
    levelId: 4,
    question:
      "Un agricultor te dice que su lote de maíz tiene un NDVI perfecto (0.9), pero sus mazorcas están saliendo pequeñas y con pocos granos. ¿Qué dato satelital usarías para explicar el bajo rendimiento?",
    options: [
      "Revisar el MODIS (Temperatura) durante la floración",
      "Revisar el SMAP (Humedad) durante la siembra",
      "Revisar el GPM (Lluvia) durante la cosecha",
      "Revisar la topografía del campo",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Mira el estrés invisible! Un NDVI perfecto solo te dice que las hojas están verdes. Si el MODIS muestra temperaturas extremas (>35°C) durante la floración, el polen fue esterilizado, resultando en mazorcas vacías a pesar de la salud foliar perfecta.",
      "La siembra es importante, pero el fallo crítico es en la reproducción.",
      "El GPM es muy general, y en la cosecha ya es muy tarde.",
      "La topografía afecta el NDVI, pero no explica por qué una planta verde produce una mazorca vacía.",
    ],
    points: 50,
  },
  {
    id: "corn-4-8",
    cropType: "corn",
    levelId: 4,
    question:
      "Se detecta un área con NDVI bajo (0.4) en etapa V6. Los datos SMAP son normales (55%). El agricultor no aplicó el aporque. ¿Cuál es la causa más probable del bajo NDVI?",
    options: [
      "Daño por Gusano Cogollero, ya que el aporque no lo controla",
      "Deficiencia de Fósforo (P) severa",
      "Roya del Maíz",
      "Toxicidad por Aluminio",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Relación lógica! La humedad normal descarta estrés hídrico. El Gusano Cogollero ataca el cogollo y reduce severamente la biomasa, lo que se traduce en un NDVI bajo. El aporque no protege la parte superior de la planta.",
      "La deficiencia de P causa tonos púrpuras, no una caída tan drástica del NDVI.",
      "La Roya afecta más tarde (V10 en adelante), no tan temprano en V6.",
      "La toxicidad del suelo es un problema uniforme, no un problema localizado en el NDVI.",
    ],
    points: 50,
  },
  {
    id: "corn-4-9",
    cropType: "corn",
    levelId: 4,
    question:
      "¿Qué significa que un valor de NDVI de 0.8 se mantenga constante por cinco semanas consecutivas en la fase de llenado de grano, según el diagnóstico integral?",
    options: [
      "La planta está llenando el grano de manera eficiente sin estrés nutricional ni hídrico",
      "Hay un exceso de riego que está causando encharcamiento",
      "Se ha detenido la absorción de Nitrógeno (N)",
      "El cultivo está madurando prematuramente",
    ],
    correctAnswer: 0,
    optionExplanations: [
      '¡Estabilidad perfecta! Mantener un NDVI alto y estable durante el llenado de grano significa que las hojas (la "fábrica" de azúcares) están funcionando a plena capacidad, lo cual es ideal para un alto rendimiento.',
      "El encharcamiento causaría una caída del NDVI (asfixia radicular).",
      "La detención de N causaría una caída del NDVI por senescencia forzada.",
      "La maduración se indica por una caída del NDVI.",
    ],
    points: 50,
  },
  {
    id: "corn-4-10",
    cropType: "corn",
    levelId: 4,
    question:
      "Tienes un lote de maíz en etapa R2 (Grano Lechoso) con un NDVI de 0.7 y un SMAP de 65%. El agricultor te pregunta si debe aplicar fertilizante foliar. ¿Cuál es tu decisión final (Juego Perfecto)?",
    options: [
      "No aplicar, ambos indicadores son saludables y la fertilización foliar no es eficiente en esta etapa",
      "Sí, aplicar Potasio (K) de inmediato",
      "Sí, aplicar Nitrógeno para mantener el color verde",
      "No aplicar, pero reducir el riego para forzar la madurez",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Manejo económico y sabio! Un NDVI de 0.7 y un SMAP de 65% indican una condición saludable. Gastar en fertilizante foliar en R2, cuando la mayor parte de la absorción ya ocurrió, no proporcionará un retorno de la inversión.",
      "El K se debió aplicar antes (V8 o V10); aplicar foliar ahora es ineficiente.",
      "El color verde ya es bueno (NDVI 0.7); la absorción de N ya está disminuyendo.",
      "Forzar la madurez en R2 daña el llenado de grano.",
    ],
    points: 50,
  },

  // ==================== NIVEL 5: Buscador de Conocimiento ====================
  {
    id: "corn-5-1",
    cropType: "corn",
    levelId: 5,
    question:
      "¿Cuál es la definición más precisa de Evapotranspiración del Cultivo (ETc), según el sistema OpenET?",
    options: [
      "El consumo real de agua por el cultivo (transpiración) más el agua que se pierde del suelo (evaporación)",
      "Mide solo el agua que la planta usa para la fotosíntesis",
      "Mide el agua de lluvia que cae sobre el campo (GPM)",
      "Mide la humedad volumétrica del suelo (SMAP)",
    ],
    correctAnswer: 0,
    optionExplanations: [
      '¡Definición maestra! La ETc es la suma del agua que la planta usa para crecer (transpiración) y el agua que se va directamente del suelo a la atmósfera (evaporación). Es el indicador real de cuánta agua "come" tu campo.',
      "Esto sería solo la Transpiración. La Evaporación del suelo es una parte crucial de la ETc que OpenET mide.",
      "Esto es precipitación. La ETc es el consumo, no la oferta de agua.",
      "Esto mide el contenido de agua en el suelo en un momento dado, no la tasa de consumo.",
    ],
    points: 60,
  },
  {
    id: "corn-5-2",
    cropType: "corn",
    levelId: 5,
    question:
      "Para la optimización del Nitrógeno (N), si el análisis de suelo es bajo, ¿cuál es el mejor momento para aplicar la mayor parte de la dosis requerida para maximizar el rendimiento del maíz?",
    options: [
      "Antes de la etapa V6 (crecimiento acelerado)",
      "Aplicar todo el Nitrógeno antes de la siembra para ahorrar pases de tractor",
      "Aplicar el Nitrógeno durante la floración (R1), ya que es el momento más crítico",
      "Usar solo abonos verdes",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Momento clave! La planta de maíz toma la mayor parte del Nitrógeno antes de la floración, especialmente entre V6 y V10. Asegurar la disponibilidad en esta fase maximiza la altura, el área foliar y el potencial de mazorca.",
      "Esto lleva a grandes pérdidas de N por lixiviación o volatilización antes de que la planta lo necesite.",
      "Aunque la floración es crítica, la absorción ya ha disminuido. El N debe estar disponible ANTES de esta etapa.",
      "Los abonos verdes son excelentes, pero a menudo no liberan N a una tasa suficientemente rápida para cubrir la altísima demanda del maíz durante V6-V10.",
    ],
    points: 60,
  },
  {
    id: "corn-5-3",
    cropType: "corn",
    levelId: 5,
    question:
      "¿Qué práctica de manejo se considera fundamental para la sostenibilidad en el cultivo de maíz al reducir drásticamente la erosión del suelo y mejorar la retención de carbono?",
    options: [
      "La labranza de conservación o labranza cero (no mover el suelo)",
      "El arado profundo anual para airear el suelo",
      "El monocultivo intensivo con altos insumos químicos",
      "El uso de riego por inundación",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Foco en el suelo! Dejar los residuos de cosecha en la superficie (labranza cero) protege el suelo del impacto de la lluvia y el viento, reduce la erosión y promueve la acumulación de materia orgánica (carbono).",
      "El arado profundo expone el suelo al viento y la lluvia, acelerando la oxidación de la materia orgánica y promoviendo la erosión.",
      "El monocultivo aumenta el riesgo de plagas específicas y no contribuye a la salud a largo plazo del suelo.",
      "El riego por inundación puede ser ineficiente y aumentar el riesgo de erosión hídrica en ciertas pendientes.",
    ],
    points: 60,
  },
  {
    id: "corn-5-4",
    cropType: "corn",
    levelId: 5,
    question:
      "Si el valor OpenET de tu maíz es de 8mm/día y la lluvia reciente fue de 3mm/día. ¿Cuál es la necesidad real de riego que debes reponer ese día?",
    options: [
      "5mm/día (diferencia entre ETc y el agua recibida)",
      "11mm/día (la suma de ambos)",
      "La necesidad de riego es igual al doble de la precipitación del mes anterior",
      "No hay necesidad de riego, ya que llovió",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Matemática del riego! La necesidad de riego es la diferencia entre lo que el cultivo consumió (8mm) y lo que recibió de forma natural (lluvia: 3mm). Es crucial para optimizar el uso del agua.",
      "La suma sería un sobre-riego y llevaría al desperdicio de agua y al riesgo de encharcamiento.",
      "Esto ignora el consumo real del cultivo (ETc), que cambia diariamente.",
      "Llovió, pero la cantidad fue insuficiente para cubrir la alta demanda de la planta.",
    ],
    points: 60,
  },
  {
    id: "corn-5-5",
    cropType: "corn",
    levelId: 5,
    question:
      "El objetivo de la rotación de cultivos con una leguminosa (ej. frijol o haba) antes de sembrar maíz es:",
    options: [
      "Romper los ciclos de plagas y enfermedades específicos del maíz y mejorar el aporte de Nitrógeno al suelo",
      "Aumentar la necesidad de fertilizantes químicos",
      "Reducir la capacidad de retención de agua del suelo",
      "Disminuir el rendimiento del maíz en el segundo año",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Manejo biológico inteligente! La rotación interrumpe el ciclo de vida de plagas y enfermedades, y las leguminosas, al fijar Nitrógeno, reducen la necesidad de fertilizantes químicos para el maíz siguiente.",
      "Es lo contrario; busca reducir la dependencia de insumos químicos.",
      "Una buena rotación, al mejorar la estructura del suelo con más materia orgánica, tiende a aumentar la capacidad de retención.",
      "Una rotación bien planificada debe aumentar o estabilizar el rendimiento del maíz.",
    ],
    points: 60,
  },
  {
    id: "corn-5-6",
    cropType: "corn",
    levelId: 5,
    question:
      "Para optimizar la absorción de Fósforo (P), un nutriente de baja movilidad, ¿cuál es la técnica de aplicación más eficiente en el maíz?",
    options: [
      "Aplicar Fósforo debajo de la semilla (bandeo) durante la siembra",
      "Aplicar Fósforo por aspersión foliar en V10",
      "Aplicar Fósforo al voleo antes de arar",
      "Aplicar Fósforo granular en el tallo del maíz",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Ubicación estratégica! Aplicar el Fósforo cerca de la semilla (bandeo) asegura que la raíz en crecimiento lo alcance rápidamente antes de que se fije en el suelo, maximizando la eficiencia.",
      "El P es un macronutriente de alta demanda, la aplicación foliar es insuficiente para cubrir los requerimientos del maíz.",
      "Aplicar al voleo sin incorporarlo cerca de la raíz reduce drásticamente la eficiencia de uso del Fósforo.",
      "El Fósforo se absorbe por la raíz; aplicarlo en el tallo no sirve.",
    ],
    points: 60,
  },
  {
    id: "corn-5-7",
    cropType: "corn",
    levelId: 5,
    question:
      "¿Cuál es la medición más crucial para estimar el rendimiento potencial del maíz antes de la cosecha (en la etapa de llenado de grano)?",
    options: [
      "Medir el número de mazorcas por planta, el número de hileras y el número de granos por hilera",
      "Contar el número total de hojas sanas en V12",
      "Solo pesar los granos cosechados al final",
      "Medir la altura final de la espiga",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Muestreo predictivo! Estas tres mediciones (componentes del rendimiento) te permiten proyectar el número total de granos por unidad de área, ofreciendo la estimación más precisa del rendimiento final.",
      "Esto solo te da una idea de la salud vegetativa, no el potencial reproductivo.",
      "Esto es medir el rendimiento real, pero no te permite estimar el rendimiento potencial para tomar decisiones durante el ciclo.",
      "La altura no se correlaciona directamente con el rendimiento.",
    ],
    points: 60,
  },
  {
    id: "corn-5-8",
    cropType: "corn",
    levelId: 5,
    question:
      "Si tu índice OpenET se mantiene consistentemente bajo (2mm/día) mientras el maíz está en su pico de crecimiento (V10), ¿qué está indicando esto sobre el cultivo?",
    options: [
      "Que el maíz está sufriendo un estrés severo (hídrico o nutricional) y no está transpirando correctamente",
      "Que hay un exceso de riego en el campo",
      "Que la planta está usando agua muy eficientemente",
      "Que la temperatura del aire es muy baja (MODIS)",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Alerta de estrés! Una baja ETc en el pico de crecimiento significa que la planta está cerrando sus estomas (reduciendo la transpiración) para conservar agua. Esto es un signo de estrés que reduce el crecimiento y el rendimiento.",
      "El exceso de riego se vería con una ETc normal o alta (si la planta aún no se asfixia) y un SMAP alto.",
      "La eficiencia del agua es importante, pero una ETc tan baja en pico de crecimiento indica una restricción, no una eficiencia.",
      "La baja temperatura reduce la ETc, pero una reducción tan drástica requiere una causa más directa, como el estrés.",
    ],
    points: 60,
  },
  {
    id: "corn-5-9",
    cropType: "corn",
    levelId: 5,
    question:
      "Para lograr la máxima optimización del agua y la sostenibilidad, ¿qué inversión tecnológica es más efectiva en una finca de maíz con riego?",
    options: [
      "La instalación de tensiómetros o sensores de humedad del suelo para riego localizado",
      "Usar riego por inundación para asegurar la saturación del suelo",
      "Aplicar agua siempre según un calendario fijo, sin importar el clima",
      "Calcular la Evapotranspiración solo con la temperatura",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Precisión es sostenibilidad! Los sensores te dicen exactamente cuánta agua hay en la zona de la raíz, lo que permite regar solo cuando es necesario, evitando el sobre-riego y minimizando el desperdicio.",
      "El riego por inundación es la técnica menos eficiente y menos sostenible, con alta pérdida de agua.",
      "Un calendario fijo ignora la lluvia (GPM) y el consumo real (OpenET), lo que resulta en ineficiencia.",
      "La ET es más precisa cuando considera radiación, viento y humedad, no solo la temperatura.",
    ],
    points: 60,
  },
  {
    id: "corn-5-10",
    cropType: "corn",
    levelId: 5,
    question:
      "Una práctica clave de sostenibilidad en el maíz es el uso de cultivos de cobertura. ¿Cuál es el principal beneficio de sembrar una leguminosa (ej. Trébol) después de la cosecha?",
    options: [
      "Mejorar la estructura del suelo y fijar Nitrógeno para la siguiente campaña de maíz",
      "Usar herbicidas de amplio espectro para eliminar toda la vegetación del suelo",
      "Dejar el suelo desnudo después de la siembra para facilitar la emergencia",
      "Aplicar una capa gruesa de plástico negro para evitar la evaporación",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Sinergia perfecta! La leguminosa protege el suelo en el invierno, sus raíces mejoran la estructura y, al ser leguminosa, añade Nitrógeno biológico, reduciendo la necesidad de N sintético para el próximo ciclo de maíz.",
      "Esto no es sostenible; deja el suelo desnudo, promueve la erosión y requiere más insumos químicos.",
      "El suelo desnudo está expuesto a la erosión. La cobertura es mejor para la salud a largo plazo.",
      "El plástico es costoso, no añade materia orgánica y no mejora la fertilidad a largo plazo.",
    ],
    points: 60,
  },

  // ==================== NIVEL 6: Experto en Satélites ====================
  {
    id: "corn-6-1",
    cropType: "corn",
    levelId: 6,
    question:
      "Estás en la etapa V10. Los datos muestran: NDVI: 0.6 (estrés medio), SMAP: 55% (humedad normal), MODIS: 25°C (temperatura óptima). ¿Cuál es el diagnóstico más probable para el bajo NDVI?",
    options: [
      "Deficiencia de Nitrógeno (N) severa o ataque de Roya (enfermedad)",
      "Estrés hídrico por falta de riego",
      "Daño por helada",
      "Exceso de riego y asfixia radicular",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Descartaste las variables hídricas y térmicas! Si la humedad y la temperatura son óptimas, el estrés foliar (NDVI bajo) apunta a un problema nutricional (N móvil) o a una enfermedad fúngica.",
      "El SMAP de 55% (humedad normal) descarta el estrés hídrico.",
      "La temperatura MODIS (25°C) descarta un daño por frío.",
      "El SMAP de 55% es óptimo, no excesivo.",
    ],
    points: 70,
  },
  {
    id: "corn-6-2",
    cropType: "corn",
    levelId: 6,
    question:
      "Se acerca la floración (R1). El GPM predice 2 semanas sin lluvia. El SMAP está en 45% y el NDVI en 0.88. ¿Cuál es la estrategia combinada para proteger el rendimiento?",
    options: [
      "Iniciar riego inmediato para elevar el SMAP al 65%, y aplicar Potasio (K) foliar para aumentar la tolerancia al estrés hídrico",
      "Aplicar solo Nitrógeno para maximizar la fotosíntesis",
      "Esperar 1 semana más, ya que el NDVI es alto",
      "Arar el campo para reducir la compactación",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Acción de experto! El NDVI es excelente, pero la humedad (45%) y la sequía inminente (GPM) son amenazas. El riego es vital. El Potasio, al ser un regulador de agua, ayuda a las estomas a resistir el estrés térmico en floración.",
      "El NDVI ya es alto; el problema es el agua.",
      "Esto es arriesgar la floración. El daño hídrico en R1 es catastrófico, el tiempo es crucial.",
      "Arar antes de R1 es destructivo para las raíces y no soluciona la necesidad de agua.",
    ],
    points: 70,
  },
  {
    id: "corn-6-3",
    cropType: "corn",
    levelId: 6,
    question:
      "Se detectan áreas con NDVI bajo (0.4) en etapa V6. Los datos MODIS indican 38°C y el NDWI (Índice de Agua de Diferencia Normalizada) es 0.05 (muy bajo). ¿Qué indica la combinación NDWI + MODIS?",
    options: [
      "Estrés hídrico y térmico severo, la planta ha cerrado estomas para sobrevivir",
      "Deficiencia de Fósforo (P) severa",
      "Infección fúngica masiva",
      "Alto rendimiento potencial",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Doble alerta crítica! El MODIS alto indica calor extremo y el NDWI muy bajo confirma que la planta está deshidratada y cerró las estomas para retener agua, deteniendo el crecimiento.",
      "El calor y el NDWI bajo apuntan al agua, no al Fósforo.",
      "Las enfermedades fúngicas suelen proliferar con la humedad, no con la sequía extrema.",
      "Los indicadores combinados apuntan a una crisis de rendimiento.",
    ],
    points: 70,
  },
  {
    id: "corn-6-4",
    cropType: "corn",
    levelId: 6,
    question:
      "¿Cuál es la principal diferencia que el NDWI (Índice de Agua) aporta a la toma de decisiones que el NDVI (Índice de Vegetación) no ofrece?",
    options: [
      "El NDWI indica directamente el contenido de agua en las hojas, alertando sobre el estrés hídrico interno antes de que el NDVI caiga",
      "El NDWI mide la temperatura del suelo (MODIS)",
      "El NDWI mide la biomasa total (igual que el NDVI)",
      "El NDWI mide la precipitación acumulada (GPM)",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Dato preciso! El NDWI es más sensible a la humedad interna de la hoja. Muestra el estrés antes de que el daño sea visible en la biomasa (NDVI).",
      "El NDWI no mide la temperatura.",
      "Ambos miden la biomasa, pero el NDWI es mejor para el contenido de agua.",
      "El NDWI es un índice de la planta; el GPM es un índice atmosférico.",
    ],
    points: 70,
  },
  {
    id: "corn-6-5",
    cropType: "corn",
    levelId: 6,
    question:
      "Estás en la etapa V6. El SMAP está en 90%. El GPM muestra que llovió 15mm en las últimas 24 horas. ¿Qué acción es prioritaria para evitar una pérdida de rendimiento?",
    options: [
      "Revisar el drenaje del campo y aplicar un antifúngico preventivo si el agua se estanca (manejo de riesgo)",
      "Aplicar riego para diluir el Nitrógeno",
      "Aplicar insecticida para el Gusano Cogollero",
      "Aplicar Potasio (K) foliar para endurecer el tallo",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Gestión de riesgo! El SMAP al 90% (saturación) es peligroso. La prioridad no es añadir agua (ya hay suficiente), sino mitigar el riesgo de pudrición radicular y el desarrollo de hongos por el exceso de humedad.",
      "No se debe añadir más agua; el problema es el exceso.",
      "La plaga es una preocupación, pero la asfixia radicular y los hongos son la amenaza inmediata.",
      "La aplicación foliar de K no resuelve la saturación de humedad en el suelo.",
    ],
    points: 70,
  },
  {
    id: "corn-6-6",
    cropType: "corn",
    levelId: 6,
    question:
      "Si la LST de MODIS sube a 37°C y la humedad del suelo (SMAP) es ideal (60%) durante el llenado de grano. ¿Cuál es el principal factor limitante del rendimiento?",
    options: [
      "Estrés térmico que reduce el peso y la calidad del grano por alta respiración",
      "Falta de Nitrógeno (N) y caída del NDVI",
      "Deshidratación celular (NDWI bajo)",
      "Ataque de Gusano Alambre",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Término de la cosecha! La temperatura alta, aunque haya agua (SMAP 60%), hace que el maíz use sus azúcares para respirar en lugar de usarlos para llenar el grano. Esto reduce el peso final del grano (rendimiento).",
      "Con SMAP ideal, la absorción de N debería ser óptima; el problema es la temperatura.",
      "Si el SMAP es 60%, la planta tiene agua suficiente para transpirar y enfriarse, pero el calor extremo de todas formas causa estrés por respiración.",
      "Plaga de raíz no relacionada con la temperatura aérea.",
    ],
    points: 70,
  },
  {
    id: "corn-6-7",
    cropType: "corn",
    levelId: 6,
    question:
      "Una combinación de NDVI bajo (0.3) y NDWI bajo (0.01) en V12 indica que:",
    options: [
      "El maíz está prácticamente muerto por estrés hídrico extremo, necesita resiembra inmediata",
      "El maíz está listo para la cosecha (senescencia natural)",
      "La planta solo tiene deficiencia de Nitrógeno",
      "El sensor está fallando debido a nubes",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Pérdida total! Ambos índices son casi nulos. La planta no está verde (NDVI) ni tiene agua en sus tejidos (NDWI). El estrés es irreversible.",
      "La senescencia natural ocurre en R6, no en V12.",
      "La deficiencia de N no causaría un colapso tan severo en ambos índices.",
      "La falla del sensor afectaría la lectura, pero no es el diagnóstico agronómico más probable.",
    ],
    points: 70,
  },
  {
    id: "corn-6-8",
    cropType: "corn",
    levelId: 6,
    question:
      "¿Cómo se utiliza el dato OpenET para Optimización Económica en la gestión del riego del maíz?",
    options: [
      "Calcular la lámina de riego precisa para reponer solo el agua consumida, evitando el desperdicio y la lixiviación de nutrientes",
      "Se usa para estimar el rendimiento final de la mazorca (NDVI)",
      "Se usa para monitorear el ataque de plagas (MODIS LST)",
      "Se usa para decidir la dosis de Potasio (K)",
    ],
    correctAnswer: 0,
    optionExplanations: [
      '¡Riego de precisión! OpenET te dice exactamente cuánta agua se perdió, permitiéndote aplicar solo esa cantidad, lo que ahorra agua y fertilizantes (ya que no se "lavan" con el exceso).',
      "El NDVI es mejor para estimar el rendimiento. OpenET es para el agua.",
      "El MODIS LST se usa para el estrés térmico o la actividad de insectos, no la Evapotranspiración.",
      "La dosis de Potasio se decide por análisis de suelo y la etapa fenológica (V6/llenado de grano).",
    ],
    points: 70,
  },
  {
    id: "corn-6-9",
    cropType: "corn",
    levelId: 6,
    question:
      "El NDVI avanzado (0.85) se correlaciona con un GPM de 5mm de lluvia diarios durante una semana. El agricultor te pregunta si debe regar. ¿Cuál es la decisión experta?",
    options: [
      "No regar, ya que la precipitación está cubriendo la alta demanda de la planta sana (NDVI 0.85)",
      "Regar inmediatamente para asegurar la humedad superficial",
      "Aplicar fungicida preventivo por el exceso de humedad",
      "Aumentar la fertilización nitrogenada",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Manejo climático! Una planta muy sana (NDVI alto) tiene una alta demanda de agua (ETc). Si el GPM indica que la lluvia es suficiente para cubrir esa demanda, el riego artificial sería redundante e innecesariamente costoso.",
      "La lluvia ya proporciona humedad superficial.",
      "La lluvia de 5mm es ideal, no excesiva. El exceso de humedad es más preocupante con un SMAP en 90.",
      "El NDVI de 0.85 sugiere que la fertilización está funcionando correctamente.",
    ],
    points: 70,
  },
  {
    id: "corn-6-10",
    cropType: "corn",
    levelId: 6,
    question:
      "En un diagnóstico final (Juego Perfecto), se encuentra: SMAP 75%, MODIS 20°C, GPM 0mm de lluvia, NDWI bajo. ¿Cuál es la conclusión correcta sobre el historial de manejo del agricultor?",
    options: [
      "El agricultor no ha regado correctamente; la alta humedad proviene de un riego único y masivo (OpenET bajo), lo que estresó la planta (NDWI bajo)",
      "El campo tiene sequía severa, la lluvia fue insuficiente",
      "El maíz está listo para la cosecha",
      "La alta temperatura MODIS causó la esterilidad del polen",
    ],
    correctAnswer: 0,
    optionExplanations: [
      "¡Evaluación histórica! El SMAP es alto (75%) lo que parece bueno, pero la planta está estresada (NDWI bajo) y no ha llovido (GPM 0). Esto sugiere un riego masivo reciente (SMAP alto), pero la planta aún no se recupera del estrés previo, o el exceso de agua causó un daño temporal a las raíces.",
      "El SMAP de 75% descarta la sequía severa.",
      "La temperatura de 20°C es ideal para el crecimiento, no para la madurez.",
      "El MODIS (20°C) es óptimo, no excesivo.",
    ],
    points: 70,
  },
];
