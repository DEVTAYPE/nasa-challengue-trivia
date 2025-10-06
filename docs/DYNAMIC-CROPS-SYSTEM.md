# 🌾 Sistema Dinámico de Cultivos - Documentación

## 📋 Resumen de Cambios

Se ha refactorizado completamente el sistema de preguntas y cultivos para que sea **100% dinámico**, obteniendo toda la información desde el backend en lugar de usar datos hardcodeados.

---

## 🔄 Flujo Completo del Sistema

### 1. **Usuario selecciona ubicación en el mapa**

```
Usuario hace clic en el mapa
    ↓
Llamada al backend: GET /recommend?lat={lat}&lon={lng}&date={date}
    ↓
Backend responde con MapResult2 que incluye:
  - detailed_recommendations[] (cultivos recomendados)
  - questions[] (preguntas generadas por IA)
  - analysis_data_summary (datos climáticos)
```

### 2. **Almacenamiento de preguntas en localStorage**

```typescript
// En crop-details.tsx
useEffect(() => {
  if (cropData?.questions && cropData.questions.length > 0) {
    const questionsByCrop: { [key: string]: any[] } = {};

    // Agrupar preguntas por cultivo
    cropData.questions.forEach((q) => {
      const cropName = q.cropType.toLowerCase();
      if (!questionsByCrop[cropName]) {
        questionsByCrop[cropName] = [];
      }
      questionsByCrop[cropName].push(q);
    });

    // Almacenar las primeras 6 preguntas de cada cultivo
    Object.entries(questionsByCrop).forEach(([cropName, questions]) => {
      const first6Questions = questions.slice(0, 6);
      localStorage.setItem(
        `map-questions-${cropName}`,
        JSON.stringify(first6Questions)
      );
    });
  }
}, [cropData]);
```

**Clave de localStorage:** `map-questions-{cropName}`

- Ejemplo: `map-questions-cebolla`, `map-questions-arroz`, `map-questions-papa`

### 3. **Usuario hace clic en "Jugar con {cultivo}"**

```
Botón: /dashboard-game?crop={cropName}
    ↓
Dashboard carga y busca preguntas en localStorage
    ↓
Si encuentra preguntas → Muestra dashboard
Si NO encuentra → Redirige al mapa
```

### 4. **Usuario selecciona nivel**

```
Click en nivel → /dashboard-game/[trivia]?crop={cropName}&level={levelId}
    ↓
TriviaPage carga
    ↓
Busca preguntas: localStorage.getItem(`map-questions-${cropName}`)
    ↓
Si existen preguntas:
  - Toma la pregunta del índice (levelId - 1)
  - Carga la pregunta en el store
  - Muestra la trivia
    ↓
Si NO existen preguntas:
  - Muestra toast de error
  - Redirige a /maps
```

---

## 🏗️ Estructura de Datos

### MapResult2 (Backend Response)

```typescript
interface MapResult2 {
  analysis_data_summary: {
    ndvi: { mean: number; quality: string; range: string };
    precipitation: { mean: number; quality: string; range: string };
    soil_moisture: { mean: number; quality: string; range: string };
    temperature: { mean: number; quality: string; range: string };
  };
  analysis_info: {
    analysis_date: string;
    coordinates: { lat: number; lon: number };
    total_crops_analyzed: number;
  };
  detailed_recommendations: Array<{
    crop_name: string;
    suitability_score: number;
    confidence_level: "high" | "medium" | "low";
    growth_period_days: number;
    planting_date: string;
    harvest_date: string;
  }>;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    optionExplanations: string[];
    cropType: string;
    levelId: number;
    points: number;
  }>;
}
```

### QuestionMap (Pregunta Individual)

```typescript
interface QuestionMap {
  id: string; // "arroz-1-1"
  question: string; // "Based on the 5-year climate analysis..."
  options: string[]; // ["Option A", "Option B", ...]
  correctAnswer: number; // 1 (índice de la respuesta correcta)
  optionExplanations: string[]; // ["Explanation for A", "Explanation for B", ...]
  cropType: string; // "arroz"
  levelId: number; // 1
  points: number; // 20
}
```

---

## 🔧 Componentes Actualizados

### 1. **modules/map/components/crop-details.tsx**

**Función:** Almacena preguntas del backend en localStorage

```typescript
// Helper para almacenar preguntas
const storeMapQuestions = (cropName: string, questions: any[]) => {
  if (questions && questions.length > 0) {
    const first6Questions = questions.slice(0, 6); // Solo las primeras 6
    localStorage.setItem(
      `map-questions-${cropName.toLowerCase()}`,
      JSON.stringify(first6Questions)
    );
  }
};

// useEffect que almacena las preguntas
useEffect(() => {
  if (cropData?.questions && cropData.questions.length > 0) {
    // Agrupa y almacena preguntas por cultivo
    const questionsByCrop: { [key: string]: any[] } = {};

    cropData.questions.forEach((q) => {
      const cropName = q.cropType.toLowerCase();
      if (!questionsByCrop[cropName]) {
        questionsByCrop[cropName] = [];
      }
      questionsByCrop[cropName].push(q);
    });

    Object.entries(questionsByCrop).forEach(([cropName, questions]) => {
      storeMapQuestions(cropName, questions);
    });
  }
}, [cropData]);
```

### 2. **modules/trivia/components/page-trivia.tsx**

**Función:** Carga preguntas desde localStorage y las usa en el juego

```typescript
useEffect(() => {
  const loadFromQueryParams = async () => {
    const cropParam = searchParams.get("crop");
    const levelParam = searchParams.get("level");

    if (cropParam && levelParam) {
      const levelId = parseInt(levelParam);

      // Cargar preguntas del mapa (REQUERIDO)
      const mapQuestionsKey = `map-questions-${cropParam.toLowerCase()}`;
      const storedMapQuestions = localStorage.getItem(mapQuestionsKey);

      if (!storedMapQuestions) {
        toast.error("Primero selecciona en el mapa");
        router.push("/maps");
        return;
      }

      const mapQuestions = JSON.parse(storedMapQuestions);
      const startLevelWithMapQuestions =
        useGameStore.getState().startLevelWithMapQuestions;

      // Usar preguntas del mapa (1 pregunta por nivel)
      startLevelWithMapQuestions(levelId, mapQuestions);
    }
  };

  loadFromQueryParams();
}, [searchParams]);
```

### 3. **modules/dashboard/components/game-progress.tsx**

**Función:** Lista dinámica de cultivos disponibles desde localStorage

```typescript
const [availableCrops, setAvailableCrops] = useState<string[]>([]);

useEffect(() => {
  const getAvailableCrops = () => {
    const crops: string[] = [];

    // Buscar todas las claves que empiezan con "map-questions-"
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("map-questions-")) {
        const cropName = key.replace("map-questions-", "");
        const capitalizedCrop =
          cropName.charAt(0).toUpperCase() + cropName.slice(1);
        crops.push(capitalizedCrop);
      }
    }

    setAvailableCrops(crops);
  };

  getAvailableCrops();
}, []);

// Renderizar botones dinámicamente
{
  availableCrops.map((cropName) => {
    const cropId = cropName.toLowerCase();
    return (
      <Button
        key={cropId}
        onClick={() => handleCropChange(cropId as CropType)}
        variant={session.selectedCrop === cropId ? "default" : "outline"}
      >
        {cropName}
        {session.selectedCrop === cropId && " ✓"}
      </Button>
    );
  });
}
```

### 4. **core/application/useGameStore.ts**

**Función:** Método para cargar preguntas del mapa (1 por nivel)

```typescript
startLevelWithMapQuestions: (levelId: number, mapQuestions: Question[]) => {
  const { session } = get();
  if (!session || !session.selectedCrop) return;

  // Tomar solo la pregunta correspondiente al nivel
  const questionIndex = levelId - 1;
  const levelQuestion = mapQuestions[questionIndex];

  if (!levelQuestion) {
    console.error(`No hay pregunta para el nivel ${levelId}`);
    return;
  }

  // Asignar el levelId correcto a la pregunta
  const question: Question = {
    ...levelQuestion,
    levelId: levelId,
  };

  set({
    currentQuestions: [question], // Solo 1 pregunta por nivel
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showFeedback: false,
    answers: [],
    isLoading: false,
    session: {
      ...session,
      currentLevel: levelId,
    },
  });
},
```

---

## 🎮 Distribución de Preguntas por Nivel

El backend envía múltiples preguntas por cultivo. El sistema toma las **primeras 6 preguntas** y las distribuye:

```
Pregunta 1 → Nivel 1
Pregunta 2 → Nivel 2
Pregunta 3 → Nivel 3
Pregunta 4 → Nivel 4
Pregunta 5 → Nivel 5
Pregunta 6 → Nivel 6
```

**Importante:** Solo se usa **1 pregunta por nivel**, no las 10 preguntas como antes.

---

## 🌍 Soporte Multi-idioma

### ❌ Antes (Sistema Antiguo)

- Preguntas hardcodeadas en español
- Archivos separados para inglés
- Cambio de idioma recargaba preguntas del repositorio

### ✅ Ahora (Sistema Dinámico)

- Preguntas vienen del backend en el idioma del análisis
- **NO hay traducción de preguntas** (vienen como están del backend)
- Cambio de idioma solo afecta la UI, no las preguntas

---

## 🔐 Validaciones Implementadas

### 1. **En page-trivia.tsx**

```typescript
if (!storedMapQuestions) {
  toast.error("Primero selecciona en el mapa");
  router.push("/maps");
  return;
}
```

### 2. **En game-progress.tsx**

```typescript
{availableCrops.length === 0 ? (
  <div className="text-center p-4">
    <p>No hay cultivos disponibles</p>
    <Button onClick={() => router.push("/maps")}>
      Ir al Mapa
    </Button>
  </div>
) : (
  // Mostrar lista de cultivos
)}
```

---

## 📊 Ejemplo de Flujo Completo

### Escenario: Usuario analiza ubicación en Ayacucho, Perú

1. **Usuario hace clic en mapa**

   - Lat: -13.1631, Lon: -74.2236

2. **Backend responde con:**

   ```json
   {
     "detailed_recommendations": [
       { "crop_name": "arroz", "suitability_score": 85 },
       { "crop_name": "cebolla", "suitability_score": 78 },
       { "crop_name": "papa", "suitability_score": 92 }
     ],
     "questions": [
       {
         "id": "arroz-1-1",
         "question": "What elevation range is suitable for arroz?",
         "cropType": "arroz",
         "levelId": 1,
         ...
       },
       {
         "id": "arroz-2-1",
         "question": "What temperature is optimal for arroz?",
         "cropType": "arroz",
         "levelId": 2,
         ...
       },
       ... (más preguntas para arroz, cebolla, papa)
     ]
   }
   ```

3. **Sistema almacena en localStorage:**

   ```
   map-questions-arroz: [6 preguntas]
   map-questions-cebolla: [6 preguntas]
   map-questions-papa: [6 preguntas]
   ```

4. **Usuario hace clic en "Jugar con Arroz"**

   - Redirige a: `/dashboard-game?crop=arroz`
   - Dashboard muestra 6 niveles disponibles

5. **Usuario selecciona Nivel 1**

   - Redirige a: `/dashboard-game/[trivia]?crop=arroz&level=1`
   - Carga pregunta del índice 0 del array de arroz
   - Muestra trivia con 1 pregunta

6. **Usuario completa Nivel 1 → Nivel 2**
   - Carga pregunta del índice 1 del array de arroz
   - Continúa hasta el Nivel 6

---

## ✅ Ventajas del Sistema Dinámico

1. **Flexibilidad Total**

   - Acepta cualquier cultivo del backend
   - No requiere actualizar código para nuevos cultivos

2. **Preguntas Contextuales**

   - Generadas por IA según la ubicación específica
   - Datos reales de clima y suelo

3. **Menor Mantenimiento**

   - No hay archivos hardcodeados de preguntas
   - Todo viene del backend

4. **Escalabilidad**
   - Fácil agregar más cultivos
   - Fácil agregar más preguntas por nivel (solo cambiar slice)

---

## 🚧 Limitaciones Actuales

1. **Idioma de Preguntas**

   - Las preguntas vienen en el idioma que el backend las genera
   - No hay traducción automática

2. **Persistencia**

   - Preguntas se almacenan en localStorage
   - Si el usuario limpia el navegador, debe volver al mapa

3. **Sincronización**
   - Si el backend actualiza preguntas, el usuario debe volver a hacer clic en el mapa

---

## 🔮 Mejoras Futuras

1. **Cache Inteligente**

   - TTL para preguntas (ej: 24 horas)
   - Revalidación automática

2. **Traducción Automática**

   - Traducir preguntas del backend en el frontend
   - Usar API de traducción

3. **Más Preguntas por Nivel**

   - Actualmente: 1 pregunta por nivel
   - Futuro: 10 preguntas por nivel (usar slice(0, 60))

4. **Historial de Análisis**
   - Guardar múltiples análisis en IndexedDB
   - Permitir volver a análisis anteriores

---

## 📝 Checklist de Testing

- [ ] Hacer clic en mapa y verificar que se almacenen preguntas
- [ ] Verificar localStorage tiene keys `map-questions-{crop}`
- [ ] Hacer clic en "Jugar con {cultivo}"
- [ ] Verificar que dashboard muestre el cultivo correcto
- [ ] Seleccionar nivel y verificar que cargue 1 pregunta
- [ ] Completar nivel y verificar que avance al siguiente
- [ ] Cambiar de cultivo y verificar que cargue preguntas correctas
- [ ] Limpiar localStorage y verificar mensaje de error
- [ ] Probar con diferentes ubicaciones en el mapa
- [ ] Verificar que cultivos dinámicos aparezcan en el dashboard

---

## 🎉 Resultado Final

El sistema ahora es **100% dinámico** y funciona con **cualquier cultivo** que el backend envíe, sin necesidad de modificar código. Las preguntas son contextuales, generadas por IA según la ubicación, y cada nivel tiene 1 pregunta de las primeras 6 que vienen del backend.

**¡El juego ahora es verdaderamente adaptable a cualquier región del mundo!** 🌍
