# 🎮 Sistema de Progreso del Juego - Query Params

## Resumen de Cambios

Se ha implementado un nuevo flujo para iniciar el juego directamente desde el mapa, permitiendo a los usuarios seleccionar cultivos basados en recomendaciones reales y mantener su progreso guardado.

## 🎯 Flujo Anterior vs Nuevo

### Antes:

1. Usuario va a `/game-entry`
2. Ingresa nombre manualmente
3. Selecciona cultivo de 3 opciones
4. Va al dashboard

### Ahora:

1. Usuario va a `/maps`
2. Hace clic en el mapa
3. Ve recomendaciones de cultivos reales
4. Hace clic en **"🎮 Jugar con [cultivo]"**
5. Va automáticamente a `/dashboard-game?crop=papa`
6. Sistema detecta el cultivo y:
   - Si **existe sesión**: Continúa donde quedó con ese cultivo
   - Si **no existe sesión**: Crea una nueva con nombre "CULTIVADOR"

## 📐 Arquitectura

### 1. **Mapper de Cultivos** (`core/utils/crop-mapper.ts`)

```typescript
// Mapeo flexible de nombres
const CROP_NAME_MAP = {
  // Quinoa
  quinua: "quinoa",
  quinoa: "quinoa",

  // Papa
  papa: "potato",
  potato: "potato",
  patata: "potato",

  // Maíz
  maiz: "corn",
  maíz: "corn",
  corn: "corn",
  choclo: "corn",
};
```

#### Funciones:

- `mapCropName(cropName: string): CropType | null` - Mapea nombre a tipo
- `getAvailableCrops(): CropType[]` - Lista cultivos disponibles
- `isValidCropName(cropName: string): boolean` - Valida nombre

### 2. **Store Actualizado** (`core/application/useGameStore.ts`)

#### Nueva función: `initializeOrContinueSession`

```typescript
initializeOrContinueSession: async (
  cropType: CropType,
  playerName?: string
) => {
  const existingSession = await getCurrentSession();

  if (existingSession) {
    // Continuar: Actualiza cultivo, mantiene progreso
    updatedSession = {
      ...existingSession,
      selectedCrop: cropType,
      currentLevel: existingSession.cropProgress[cropType].currentLevel,
    };
  } else {
    // Nueva sesión: Nombre por defecto "CULTIVADOR"
    newSession = {
      playerName: playerName || "CULTIVADOR",
      selectedCrop: cropType,
      currentLevel: 1,
      // ... progreso inicial
    };
  }
};
```

#### Persistencia:

- ✅ Progreso se guarda en **localStorage**
- ✅ Cada cultivo tiene su propio progreso independiente
- ✅ Al cambiar de cultivo, se restaura el nivel donde quedó

### 3. **Componente CropDetails** (Mapa)

#### Cambios visuales:

**Antes:**

```tsx
<button onClick={selectCrop}>🌱 Papa 85%</button>
```

**Ahora:**

```tsx
<button onClick={selectCrop}>🌱 Papa 85%</button>;

{
  selected && <a href="/dashboard-game?crop=papa">🎮 Jugar con Papa</a>;
}
```

#### Flujo:

1. Usuario hace clic en cultivo → Se expande
2. Aparece botón **"🎮 Jugar con [cultivo]"**
3. Link con query param: `/dashboard-game?crop=papa`

### 4. **Página Dashboard** (`app/dashboard-game/page.tsx`)

#### Estados:

```typescript
// 1. Loading inicial
if (isInitializing) {
  return <LoadingScreen />;
}

// 2. Cultivo no encontrado
if (cropNotFound) {
  return <CropSelectionScreen />;
}

// 3. Todo OK
return <GameProgress />;
```

#### Lógica de inicialización:

```typescript
useEffect(() => {
  const cropParam = searchParams.get("crop"); // "papa", "quinua", "maiz"

  if (cropParam) {
    const mappedCrop = mapCropName(cropParam); // "potato", "quinoa", "corn"

    if (!mappedCrop) {
      // Cultivo inválido → Mostrar opciones
      setCropNotFound(true);
      return;
    }

    // Inicializar/continuar sesión
    await initializeOrContinueSession(mappedCrop);
  } else {
    // Sin param → Cargar sesión existente
    await loadSession();
  }
}, [searchParams]);
```

## 🗺️ Mapeo de Cultivos

### Backend → Frontend

| Backend (Español)  | Frontend (CropType) | CROPS.name |
| ------------------ | ------------------- | ---------- |
| papa, patata       | potato              | Papa       |
| quinua, quinoa     | quinoa              | Quinua     |
| maiz, maíz, choclo | corn                | Maíz       |

### URLs válidas:

```
✅ /dashboard-game?crop=papa
✅ /dashboard-game?crop=potato
✅ /dashboard-game?crop=patata
✅ /dashboard-game?crop=quinua
✅ /dashboard-game?crop=quinoa
✅ /dashboard-game?crop=maiz
✅ /dashboard-game?crop=maíz
✅ /dashboard-game?crop=corn
✅ /dashboard-game?crop=choclo

❌ /dashboard-game?crop=tomate → Muestra pantalla de selección
❌ /dashboard-game?crop=lechuga → Muestra pantalla de selección
```

## 💾 Persistencia del Progreso

### Estructura en localStorage:

```json
{
  "playerId": "uuid-123",
  "playerName": "CULTIVADOR",
  "selectedCrop": "potato",
  "currentLevel": 3,
  "cropProgress": {
    "potato": {
      "currentLevel": 3,
      "levels": {
        "1": { "status": "completed", "score": 95 },
        "2": { "status": "completed", "score": 88 },
        "3": { "status": "available" }
      }
    },
    "quinoa": {
      "currentLevel": 1,
      "levels": {
        "1": { "status": "available" }
      }
    },
    "corn": {
      "currentLevel": 1,
      "levels": {
        "1": { "status": "available" }
      }
    }
  },
  "startedAt": "2025-10-05T10:30:00.000Z"
}
```

### Escenarios:

#### Escenario 1: Primera vez

```
Usuario → Mapa → Selecciona "Papa"
└─> localStorage vacío
    └─> Crea sesión nueva
        └─> playerName: "CULTIVADOR"
        └─> selectedCrop: "potato"
        └─> currentLevel: 1
```

#### Escenario 2: Jugador existente, mismo cultivo

```
Usuario → Ya jugó Papa hasta nivel 3
└─> Selecciona Papa en mapa
    └─> initializeOrContinueSession("potato")
        └─> Carga sesión existente
        └─> currentLevel: 3 (continúa donde quedó)
```

#### Escenario 3: Jugador existente, diferente cultivo

```
Usuario → Jugó Papa (nivel 3), ahora selecciona Maíz
└─> Selecciona Maíz en mapa
    └─> initializeOrContinueSession("corn")
        └─> Actualiza selectedCrop: "corn"
        └─> currentLevel: 1 (empieza Maíz desde el inicio)
        └─> Papa sigue en nivel 3 (progreso guardado)
```

## 🎨 UI/UX Improvements

### 1. Crop Details (Mapa)

#### Botón expandible:

```tsx
{
  selectedCropIndex === index && (
    <div className="px-4 pb-4">
      <a
        href={`/dashboard-game?crop=${crop.crop_name.toLowerCase()}`}
        className="inline-flex items-center gap-2 
                 bg-gradient-to-r from-purple-600 to-pink-600 
                 text-white px-4 py-2 rounded-lg 
                 font-semibold hover:shadow-lg 
                 transition-all active:scale-95"
      >
        <span>🎮</span>
        Jugar con {crop.crop_name}
      </a>
    </div>
  );
}
```

### 2. Loading Screen (Dashboard)

```tsx
<div className="min-h-screen flex items-center justify-center">
  <div className="text-center space-y-4">
    <div
      className="w-16 h-16 border-4 border-primary 
                    border-t-transparent rounded-full animate-spin"
    />
    <h2 className="text-2xl font-bold">Cargando tu aventura...</h2>
    <p className="text-muted-foreground">
      Preparando el terreno para tus cultivos 🌱
    </p>
  </div>
</div>
```

### 3. Crop Not Found Screen

```tsx
<div className="max-w-2xl bg-card border rounded-2xl p-8">
  <div className="text-center">
    <div className="text-6xl">🌾</div>
    <h2 className="text-3xl font-bold">Cultivo no disponible</h2>
    <p className="text-lg text-muted-foreground">
      No tenemos niveles para "{invalidCrop}"
    </p>
  </div>

  <div className="space-y-4">
    <p>Selecciona uno de nuestros cultivos disponibles:</p>

    {/* Botones de cultivos */}
    <button onClick={selectPotato}>🥔 Papa →</button>
    <button onClick={selectQuinoa}>🌾 Quinua →</button>
    <button onClick={selectCorn}>🌽 Maíz →</button>
  </div>

  <button onClick={backToMap}>← Volver al Mapa</button>
</div>
```

## 🔄 Flujos Completos

### Flujo 1: Usuario Nuevo desde Mapa

```
1. Usuario → localhost:3000/maps
2. Hace clic en ubicación
3. Ve recomendación: "Papa - 85%"
4. Hace clic → Expande detalles
5. Hace clic en "🎮 Jugar con Papa"
6. Redirige a /dashboard-game?crop=papa
7. Sistema:
   - Detecta crop=papa
   - Mapea papa → potato
   - No encuentra sesión
   - Crea nueva: { playerName: "CULTIVADOR", selectedCrop: "potato" }
   - Muestra GameProgress con Papa nivel 1
```

### Flujo 2: Jugador Regresa

```
1. Usuario abre /dashboard-game (sin params)
2. Sistema:
   - No hay crop param
   - Busca sesión en localStorage
   - Encuentra: { playerName: "CULTIVADOR", selectedCrop: "potato", currentLevel: 3 }
   - Carga directamente GameProgress
   - Muestra Papa nivel 3 (donde quedó)
```

### Flujo 3: Cambio de Cultivo

```
1. Usuario está en dashboard jugando Papa (nivel 3)
2. Usa selector de cultivos → Selecciona Maíz
3. Sistema:
   - Ejecuta selectCrop("corn")
   - Actualiza sesión: selectedCrop = "corn"
   - Restaura currentLevel = cropProgress.corn.currentLevel (nivel 1)
   - Recarga GameProgress con Maíz nivel 1
```

### Flujo 4: Cultivo Inválido

```
1. Usuario visita /dashboard-game?crop=tomate
2. Sistema:
   - Detecta crop=tomate
   - Mapea tomate → null (no existe)
   - setCropNotFound(true)
   - Muestra pantalla de selección
   - Usuario hace clic en "Papa"
   - Redirige a /dashboard-game?crop=potato
   - Reinicia flujo con cultivo válido
```

## 📋 Testing Checklist

### URLs a probar:

- [ ] `/dashboard-game?crop=papa` → Carga Papa
- [ ] `/dashboard-game?crop=potato` → Carga Papa
- [ ] `/dashboard-game?crop=quinua` → Carga Quinua
- [ ] `/dashboard-game?crop=quinoa` → Carga Quinua
- [ ] `/dashboard-game?crop=maiz` → Carga Maíz
- [ ] `/dashboard-game?crop=corn` → Carga Maíz
- [ ] `/dashboard-game?crop=tomate` → Muestra selección
- [ ] `/dashboard-game` (sin param) → Carga sesión o redirige

### Persistencia:

- [ ] Completa nivel 1 de Papa
- [ ] Cierra navegador
- [ ] Reabre `/dashboard-game?crop=papa`
- [ ] Verifica que está en nivel 2

- [ ] Cambia a Maíz
- [ ] Completa nivel 1 de Maíz
- [ ] Vuelve a Papa
- [ ] Verifica que sigue en nivel 2 (no se perdió progreso)

### Integración Mapa:

- [ ] Ve al mapa
- [ ] Haz clic en ubicación
- [ ] Ve recomendaciones
- [ ] Haz clic en cultivo → Expande
- [ ] Ve botón "🎮 Jugar con X"
- [ ] Haz clic → Va a dashboard
- [ ] Cultivo correcto seleccionado

## 🚀 Ventajas del Nuevo Sistema

### Para el Usuario:

✅ No necesita escribir nombre cada vez
✅ Progreso se guarda automáticamente
✅ Puede alternar entre cultivos sin perder progreso
✅ Flujo más rápido desde el mapa
✅ Recomendaciones basadas en datos reales

### Para el Desarrollo:

✅ Query params permiten deep linking
✅ Mapper flexible acepta múltiples nombres
✅ Persistencia automática en localStorage
✅ Código más modular y reutilizable
✅ Fácil agregar nuevos cultivos

## 📂 Archivos Modificados

1. **`core/utils/crop-mapper.ts`** (nuevo)

   - Mapeo de nombres de cultivos
   - Funciones de validación

2. **`core/application/useGameStore.ts`**

   - Nueva función `initializeOrContinueSession`
   - Manejo de persistencia mejorado

3. **`core/index.ts`**

   - Exporta crop-mapper

4. **`modules/map/components/crop-details.tsx`**

   - Botón "Jugar con [cultivo]" en expansión
   - Link con query param

5. **`app/dashboard-game/page.tsx`**

   - Lógica de query params
   - Estados de loading/error
   - Pantalla de selección de cultivos

6. **`modules/home/components/game-entry-1.tsx`**
   - Enlace alternativo al mapa
   - Mantiene flujo tradicional opcional

## 🔮 Mejoras Futuras

### Posibles optimizaciones:

1. **Sincronización en la nube**

   - Guardar progreso en backend
   - Permite continuar en otros dispositivos

2. **Nombres personalizados desde mapa**

   - Modal para ingresar nombre antes de jugar
   - Mantener "CULTIVADOR" como default

3. **Estadísticas globales**

   - Tracking de cultivos más populares
   - Ranking de jugadores

4. **Recomendaciones inteligentes**

   - Sugerir cultivos basados en ubicación
   - Mostrar dificultad estimada

5. **Achievements**
   - Desbloquear badges por completar cultivos
   - Recompensas por probar todos los cultivos

---

**Nota**: El sistema es completamente retrocompatible. Los usuarios pueden seguir usando `/game-entry` si lo prefieren, o usar el nuevo flujo desde `/maps`. Ambos caminos funcionan correctamente. 🌱🎮
