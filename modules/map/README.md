# 🌾 Módulo de Análisis de Cultivos

## 📋 Descripción

Este módulo proporciona un sistema completo de análisis de idoneidad de cultivos basado en datos climáticos y geográficos de Perú.

## 🎨 Diseño Modernizado con Tailwind CSS

El módulo ha sido completamente rediseñado utilizando **Tailwind CSS v4** con las siguientes mejoras:

### ✨ Características del Nuevo Diseño

#### 1. **Layout Responsivo de 3 Columnas**

- **Sidebar Izquierda (400px)**: Header con selector de fecha + Lista de análisis guardados
- **Mapa Central (flex-1)**: Mapa interactivo de Leaflet
- **Sidebar Derecha (450px)**: Panel flotante con detalles del análisis

#### 2. **Componentes Estilizados**

##### Header Principal

```tsx
- Gradiente verde (from-green-700 to-emerald-600)
- Selector de fecha integrado con backdrop blur
- Indicador de ayuda con emoji
```

##### PopupStack Component

```tsx
- Estado vacío con diseño atractivo
- Tarjetas de análisis con hover effects
- Badges para estadísticas (hoy/semana)
- Botones de acción con transiciones suaves
```

##### Loading Overlay

```tsx
- Backdrop blur con animación fade-in
- Spinner personalizado con bordes verdes
- Modal centrado con shadow-2xl
```

#### 3. **Animaciones Personalizadas**

```css
@keyframes fade-in - Aparición suave de modales
@keyframes pulse-glow - Efecto de pulsación
@keyframes float - Efecto de flotación;
```

#### 4. **Paleta de Colores**

- **Verde Principal**: `green-700`, `green-600`, `emerald-600`
- **Verde Secundario**: `green-50`, `green-100`, `emerald-50`
- **Acentos**: `green-200` (borders), `green-300` (hover)
- **Backgrounds**: Gradientes de verde claro a esmeralda

### 🚀 Cómo Usar

1. **Iniciar el Backend**

   ```bash
   # Asegúrate de que el backend esté corriendo
   # en http://localhost:8000
   ```

2. **Navegar a la Página**

   ```
   http://localhost:3000/maps
   ```

3. **Interactuar con el Mapa**

   - Haz clic en cualquier punto del mapa
   - El sistema obtendrá datos climáticos automáticamente
   - Los resultados se guardarán en el PopupStack
   - Selecciona análisis anteriores desde la lista

4. **Ver Detalles**
   - Los detalles aparecen en el panel derecho flotante
   - Scroll para ver todas las recomendaciones
   - Selecciona cultivos específicos para más información

### 📦 Estructura de Archivos

```
modules/map/
├── components/
│   ├── map-component.tsx           # Wrapper con dynamic import
│   ├── map-component-client.tsx    # Implementación Leaflet
│   ├── popup-stack-component.tsx   # Lista de análisis (Tailwind)
│   ├── crop-details.tsx            # Detalles de cultivos
│   └── ...
├── services/
│   ├── cache.ts                    # Cache de LocalStorage
│   ├── popup-stack-service.ts      # Gestión de stack
│   └── nominatim.ts                # Geocoding
└── README.md                       # Este archivo
```

### 🔧 Tecnologías

- **Next.js 15.5.4** - Framework React
- **TypeScript 5** - Tipado estático
- **Tailwind CSS v4** - Estilos utilitarios
- **Leaflet** - Mapas interactivos
- **OpenStreetMap** - Tiles de mapa (gratis, sin API key)

### 🎯 Mejoras Implementadas

1. ✅ **Migración a Tailwind CSS** - Todo el CSS custom eliminado
2. ✅ **Diseño Responsive** - Layout flexible de 3 columnas
3. ✅ **Gradientes Modernos** - Headers con gradientes verdes
4. ✅ **Backdrop Blur** - Efectos de desenfoque en paneles flotantes
5. ✅ **Animaciones Suaves** - Transiciones en hover y estados
6. ✅ **Estados Vacíos** - Diseños atractivos cuando no hay datos
7. ✅ **Badges y Pills** - Contadores estilizados
8. ✅ **Icons con Emojis** - UX más amigable

### 🐛 Solución de Problemas

#### El mapa no carga

- Verifica que estés usando el componente con `"use client"`
- Asegúrate de que Leaflet se cargue solo en el cliente (dynamic import con ssr: false)

#### No se guardan análisis

- Verifica que el backend esté corriendo en `http://localhost:8000`
- Revisa la consola del navegador para errores de CORS
- Asegúrate de que LocalStorage esté habilitado

#### Errores de TypeScript

- Ejecuta `npx tsc --noEmit` para verificar errores
- Todos los componentes tienen interfaces TypeScript completas

### 📝 Notas

- El módulo usa **OpenStreetMap** que es completamente gratuito (no requiere API keys)
- Los datos se guardan en **LocalStorage** (persistente en el navegador)
- El diseño es **responsive** pero optimizado para pantallas grandes (1200px+)

### 🎨 Personalización

Para cambiar la paleta de colores, modifica las clases de Tailwind:

```tsx
// Cambiar de verde a azul
from-green-700 → from-blue-700
border-green-200 → border-blue-200
text-green-800 → text-blue-800
```

---

**Desarrollado con 💚 para NASA Space Challenge**
