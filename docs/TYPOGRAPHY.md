# 🔤 Tipografía del Proyecto

## 📖 Fuentes Utilizadas

### 1. **Inter** - Fuente Principal (Sans-serif)

**Diseñador:** Rasmus Andersson  
**Tipo:** Sans-serif humanista  
**Uso:** Interfaz de usuario, textos generales, encabezados

#### ✨ Características

- ✅ Optimizada específicamente para pantallas digitales
- ✅ Excelente legibilidad en tamaños pequeños
- ✅ Espaciado y altura de línea perfectos para UI
- ✅ Incluye ligaduras y características OpenType avanzadas
- ✅ Soporta múltiples idiomas incluyendo español

#### 📊 Pesos Disponibles

```typescript
weight: ["300", "400", "500", "600", "700", "800"];
```

- **300 (Light)**: Textos secundarios, subtítulos
- **400 (Regular)**: Textos del cuerpo, párrafos
- **500 (Medium)**: Énfasis moderado, labels
- **600 (Semibold)**: Subtítulos, botones
- **700 (Bold)**: Títulos, encabezados
- **800 (Extrabold)**: Títulos principales, CTAs

#### 🎨 Ejemplos de Uso

```tsx
// Encabezados
<h1 className="text-3xl font-bold">Análisis de Cultivos</h1>
<h2 className="text-2xl font-semibold">Recomendaciones</h2>

// Cuerpo de texto
<p className="text-base font-normal">Descripción del análisis...</p>

// Labels y badges
<span className="text-sm font-medium">Estado: Activo</span>

// Botones
<button className="font-semibold">Analizar Ubicación</button>
```

---

### 2. **JetBrains Mono** - Fuente Monoespaciada

**Diseñador:** JetBrains  
**Tipo:** Monospace humanista  
**Uso:** Código, datos numéricos, coordenadas, fechas

#### ✨ Características

- ✅ Diseñada específicamente para programadores
- ✅ Distinción clara entre caracteres similares (0, O, l, 1, I)
- ✅ Espaciado uniforme para alineación perfecta
- ✅ Legaduras para código (opcional)
- ✅ Excelente para datos tabulares

#### 📊 Pesos Disponibles

```typescript
weight: ["400", "500", "600", "700"];
```

- **400 (Regular)**: Coordenadas, datos
- **500 (Medium)**: Código, valores destacados
- **600 (Semibold)**: Labels numéricos importantes
- **700 (Bold)**: Valores críticos, alertas

#### 🎨 Ejemplos de Uso

```tsx
// Coordenadas geográficas
<span className="font-mono text-xs">
  -12.0464, -77.0428
</span>

// Fechas y timestamps
<input
  type="date"
  className="font-mono"
  value={analysisDate}
/>

// Valores numéricos
<span className="font-mono font-semibold">
  92.5% idoneidad
</span>

// Código o IDs
<code className="font-mono bg-gray-100 px-2 py-1 rounded">
  popup_id_12345
</code>
```

---

## 🎨 Sistema de Tipografía

### Jerarquía de Tamaños

```css
/* Títulos Principales */
h1: 2xl-3xl (1.5rem-1.875rem) font-bold tracking-tight
h2: xl-2xl (1.25rem-1.5rem) font-semibold tracking-tight
h3: lg-xl (1.125rem-1.25rem) font-semibold

/* Subtítulos */
h4: base-lg (1rem-1.125rem) font-semibold
h5: sm-base (0.875rem-1rem) font-medium
h6: sm (0.875rem) font-medium

/* Cuerpo de Texto */
body: base (1rem) font-normal
small: sm (0.875rem) font-normal
tiny: xs (0.75rem) font-normal

/* Datos y Código */
code: sm (0.875rem) font-mono
data: xs-sm (0.75rem-0.875rem) font-mono
```

### Pesos Recomendados por Contexto

| Contexto          | Fuente    | Peso    | Clase Tailwind          |
| ----------------- | --------- | ------- | ----------------------- |
| Título principal  | Inter     | 700-800 | `font-bold`             |
| Subtítulos        | Inter     | 600-700 | `font-semibold`         |
| Texto normal      | Inter     | 400     | `font-normal`           |
| Labels/Badges     | Inter     | 500-600 | `font-medium`           |
| Botones           | Inter     | 600     | `font-semibold`         |
| Coordenadas       | JetBrains | 400     | `font-mono`             |
| Valores numéricos | JetBrains | 500-600 | `font-mono font-medium` |
| Código            | JetBrains | 400     | `font-mono`             |

---

## 🔧 Configuración Técnica

### Layout Principal (`app/layout.tsx`)

```typescript
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
```

### Variables CSS (`globals.css`)

```css
@theme inline {
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains);
}
```

### Clases Tailwind Disponibles

```css
font-sans    → Inter (default)
font-mono    → JetBrains Mono
font-normal  → Weight 400
font-medium  → Weight 500
font-semibold → Weight 600
font-bold    → Weight 700
font-extrabold → Weight 800
```

---

## 🎯 Mejores Prácticas

### ✅ DO - Hacer

```tsx
// Usar Inter para UI
<h1 className="text-2xl font-bold">Título</h1>

// Usar JetBrains Mono para datos
<span className="font-mono text-sm">-12.0464, -77.0428</span>

// Combinar pesos para jerarquía
<div>
  <h2 className="font-bold">Análisis</h2>
  <p className="font-normal">Descripción...</p>
</div>

// Usar tracking negativo en títulos grandes
<h1 className="text-3xl font-bold tracking-tight">
  Bienvenido
</h1>
```

### ❌ DON'T - Evitar

```tsx
// ❌ No uses fuente mono para textos largos
<p className="font-mono">
  Este es un párrafo largo que es difícil de leer...
</p>

// ❌ No uses demasiados pesos en el mismo componente
<div className="font-light">
  <span className="font-bold">Texto</span>
  <span className="font-extrabold">Más texto</span>
</div>

// ❌ No combines fuentes aleatoriamente
<h1 className="font-mono">Título</h1> // Usa Inter
<code className="font-sans">código</code> // Usa JetBrains
```

---

## 📱 Responsive Typography

```tsx
// Escala de fuentes responsive
<h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
  Título Responsive
</h1>

// Pesos diferentes por breakpoint
<p className="font-normal md:font-medium lg:font-semibold">
  Texto que gana peso en pantallas grandes
</p>
```

---

## 🌟 Features Especiales

### Inter - OpenType Features

```css
body {
  font-feature-settings: "cv02", /* Alternate g */ "cv03", /* Alternate y */
      "cv04", /* Alternate i */ "cv11"; /* Alternate 1 */
}
```

Estas características mejoran la legibilidad distinguiendo mejor ciertos caracteres.

### JetBrains Mono - Ligaduras (Opcional)

Si necesitas ligaduras de código (como `=>`, `!=`, `>=`):

```css
.code-with-ligatures {
  font-feature-settings: "liga" 1, "calt" 1;
}
```

---

## 🎨 Paleta Tipográfica Completa

### Colores de Texto Recomendados

```tsx
// Textos principales
text - gray - 900; // Negro suave
text - green - 900; // Verde oscuro (tema agricultura)

// Textos secundarios
text - gray - 600; // Gris medio
text - gray - 500; // Gris claro

// Datos y código
text - gray - 700; // Gris oscuro para mono
text - green - 700; // Verde para valores positivos

// Estados
text - red - 600; // Errores
text - yellow - 600; // Advertencias
text - green - 600; // Éxito
text - blue - 600; // Información
```

---

## 📚 Referencias

- [Inter Font](https://rsms.me/inter/) - Sitio oficial
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) - Sitio oficial
- [Next.js Font Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts)
- [Google Fonts](https://fonts.google.com/)

---

**Actualizado:** Octubre 2025  
**Versión:** 2.0  
**Fuentes anteriores:** Geist, Geist Mono (deprecated)
