# 📱 Diseño Responsive - Mapa de Cultivos

## Resumen de Cambios

Se ha implementado un diseño completamente responsive para la página de mapas que funciona perfectamente en dispositivos móviles, tablets y desktop.

## 🎯 Problemas Resueltos

### Antes:

- ❌ Sidebars se tapaban en mobile
- ❌ Contenido no visible en pantallas pequeñas
- ❌ Mapa no aprovechaba todo el espacio
- ❌ Experiencia de usuario deficiente en móviles

### Después:

- ✅ Layout adaptativo según tamaño de pantalla
- ✅ Bottom sheets deslizables en mobile
- ✅ Mapa ocupa toda la pantalla en mobile
- ✅ Botones flotantes de acción
- ✅ Experiencia fluida en todos los dispositivos

## 📐 Breakpoints Utilizados

### Mobile (< 1024px)

- Mapa ocupa toda la pantalla
- Sidebars ocultas por defecto
- Dos botones flotantes en la parte inferior:
  - **📋 Historial**: Abre panel de análisis guardados
  - **📊 Detalles**: Abre panel de resultados actuales

### Desktop (≥ 1024px)

- Sidebar izquierda fija (300px)
- Mapa en el centro
- Sidebar derecha flotante (350px)
- Layout de 3 columnas tradicional

## 🎨 Componentes Responsive

### 1. **Left Sidebar (Historial)**

```css
/* Desktop */
lg:flex lg:w-[300px]  → Visible, 300px de ancho

/* Mobile */
hidden                 → Oculto por defecto
Bottom sheet          → Abre desde abajo al tocar botón
```

### 2. **Right Sidebar (Detalles)**

```css
/* Desktop */
hidden lg:flex        → Flotante, visible
w-[350px]            → 350px de ancho
fixed top-5 right-5  → Posición flotante

/* Mobile */
hidden               → Oculto por defecto
Bottom sheet        → Abre desde abajo al tocar botón
```

### 3. **Bottom Sheets (Mobile)**

#### Características:

- **Animación suave**: `slide-up` desde abajo
- **Overlay oscuro**: Fondo semi-transparente
- **Handle bar**: Barra visual para deslizar
- **Max height**: 70% (historial) / 85% (detalles)
- **Cerrar**: Tap fuera o botón X
- **Scroll interno**: Contenido scrolleable

#### Historial Panel:

```tsx
showHistoryPanel → Control de estado
- Selector de fecha
- Lista de análisis guardados
- Cierra al seleccionar un análisis
```

#### Detalles Panel:

```tsx
showDetailsPanel → Control de estado
- Información de ubicación
- Top cultivos recomendados
- Análisis climático
- Detalles del cultivo seleccionado
```

### 4. **Floating Action Buttons (Mobile)**

```tsx
<div className="lg:hidden fixed bottom-4 left-4 right-4">
  <button>📋 Historial</button>
  <button>📊 Detalles</button>
</div>
```

- **Posición**: Fijos en la parte inferior
- **Ancho**: 100% (con padding lateral)
- **Distribución**: 50% cada uno (flex-1)
- **Estilo**: Gradientes verde y azul
- **Interacción**: Active scale effect

## 🎬 Animaciones Agregadas

### `slide-up`

```css
@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
```

- Usada en bottom sheets
- Duración: 0.3s
- Timing: ease-out

### `fade-in` (Existente)

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

- Usada en overlay
- Duración: 0.3s

## 📱 Espaciado Adaptativo

### CropDetails Component:

```tsx
// Antes
px-4 py-6 space-y-6

// Después (responsive)
px-3 md:px-4    → Padding horizontal menor en mobile
py-4 md:py-6    → Padding vertical menor en mobile
space-y-4 md:space-y-6  → Menos espacio entre elementos en mobile
```

## 🎯 Estados Manejados

```tsx
const [showHistoryPanel, setShowHistoryPanel] = useState(false);
const [showDetailsPanel, setShowDetailsPanel] = useState(false);
```

### Comportamientos:

1. **Tap en botón** → Abre panel
2. **Tap en overlay** → Cierra panel
3. **Tap en X** → Cierra panel
4. **Seleccionar análisis** → Cierra panel de historial
5. **e.stopPropagation()** → Evita cerrar al tocar contenido

## 🔧 Clases Tailwind Clave

### Visibilidad Condicional:

```css
hidden           → Oculto en mobile
lg:flex         → Visible solo en desktop (≥1024px)
lg:hidden       → Oculto solo en desktop
```

### Layout:

```css
fixed           → Posición fija
bottom-0        → Pegado al fondo
left-0 right-0  → Ancho completo
z-[1500]        → Encima de todo
```

### Interactividad:

```css
active:scale-95     → Efecto de presión
hover:shadow-xl     → Sombra al hover (desktop)
transition-all      → Transiciones suaves
```

## 📋 Testing Checklist

### Mobile (< 768px):

- [ ] Mapa ocupa toda la pantalla
- [ ] Botones flotantes visibles
- [ ] Historial se abre como bottom sheet
- [ ] Detalles se abre como bottom sheet
- [ ] Animaciones suaves
- [ ] Se puede cerrar tocando fuera
- [ ] Scroll funciona dentro de panels
- [ ] Selector de fecha funciona

### Tablet (768px - 1023px):

- [ ] Comportamiento igual a mobile
- [ ] Botones bien espaciados
- [ ] Panels aprovechan el espacio

### Desktop (≥ 1024px):

- [ ] Layout de 3 columnas
- [ ] Sidebars visibles
- [ ] No se muestran botones flotantes
- [ ] Sidebar derecha flotante

## 🚀 Mejoras Futuras

### Posibles optimizaciones:

1. **Swipe gestures**: Cerrar panel deslizando hacia abajo
2. **Persistencia**: Recordar estado de panels abiertos
3. **Tamaño ajustable**: Drag handle para redimensionar
4. **Landscape mode**: Layout especial para móvil horizontal
5. **Animación de entrada**: Transición entre análisis
6. **Haptic feedback**: Vibración al abrir/cerrar (PWA)

## 📚 Archivos Modificados

1. **app/maps/page.tsx**

   - Agregados estados para panels
   - Layout responsive con clases condicionales
   - Bottom sheets para mobile
   - Floating action buttons

2. **app/globals.css**

   - Nueva animación `slide-up`
   - Clase `.animate-slide-up`

3. **modules/map/components/crop-details.tsx**
   - Espaciado adaptativo (px-3 md:px-4, etc.)
   - Mejor UX en mobile

## 🎨 Paleta de Colores Responsive

### Botones Flotantes:

- **Historial**: `from-green-600 to-emerald-500`
- **Detalles**: `from-blue-600 to-cyan-500`

### Overlays:

- **Fondo**: `bg-black/50` (50% transparencia)

### Bottom Sheets:

- **Fondo**: `bg-white`
- **Handle**: `bg-gray-300`
- **Sombra**: `shadow-2xl`

## ✨ Resultado Final

### Mobile Experience:

1. Usuario abre la app → Ve mapa completo
2. Toca ubicación → Se analiza
3. Toca "📊 Detalles" → Bottom sheet aparece desde abajo
4. Revisa resultados → Scroll dentro del panel
5. Toca fuera o X → Panel se cierra suavemente
6. Toca "📋 Historial" → Ve análisis anteriores
7. Selecciona uno → Panel se cierra y muestra datos

### Desktop Experience:

1. Usuario ve layout de 3 columnas
2. Sidebar izquierda con historial siempre visible
3. Mapa en el centro
4. Sidebar derecha flotante con detalles
5. Workflow tradicional sin interrupciones

---

**Nota**: El diseño sigue los principios de Material Design para bottom sheets y mantiene consistencia con el tema verde/agricultura de la aplicación. 🌱
