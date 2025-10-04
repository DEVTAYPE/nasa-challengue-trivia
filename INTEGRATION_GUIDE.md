# 🔧 Guía de Integración - Sistema Funcional

## ✅ Lo que ya está implementado

1. ✅ Arquitectura hexagonal completa
2. ✅ Store de Zustand configurado
3. ✅ 90 preguntas (30 por cultivo, 5 por nivel)
4. ✅ Repositorios (LocalStorage + InMemory)
5. ✅ Entidades del dominio
6. ✅ Toaster agregado al layout
7. ✅ `game-entry-1.tsx` actualizado para usar el store

## 🔨 Siguientes pasos para completar la integración

### 1. Crear Provider para cargar sesión al inicio

Crear `app/providers.tsx`:

```typescript
"use client";

import { useEffect } from "react";
import { useGameStore } from "@/core";

export function GameProvider({ children }: { children: React.ReactNode }) {
  const loadSession = useGameStore((state) => state.loadSession);

  useEffect(() => {
    // Cargar sesión al montar la app
    loadSession();
  }, [loadSession]);

  return <>{children}</>;
}
```

Actualizar `app/layout.tsx`:

```typescript
import { GameProvider } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GameProvider>{children}</GameProvider>
        <Toaster />
      </body>
    </html>
  );
}
```

### 2. Actualizar `modules/dashboard/components/game-progress.tsx`

Reemplazar el contenido con la integración del store:

```typescript
"use client";

import { useEffect } from "react";
import { useGameStore } from "@/core";
import { useRouter } from "next/navigation";
// ... otros imports

export const GameProgress = () => {
  const router = useRouter();

  // Obtener del store
  const session = useGameStore((state) => state.session);
  const levels = useGameStore((state) => state.getLevelsForCurrentCrop());
  const selectCrop = useGameStore((state) => state.selectCrop);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  // Redirigir si no hay sesión
  useEffect(() => {
    if (!session) {
      router.push("/game-entry");
    }
  }, [session, router]);

  if (!session) {
    return <div>Cargando...</div>;
  }

  const handleLevelClick = (level: Level) => {
    if (level.status === "locked") return;

    setSelectedLevel(level);
  };

  const handleStartLevel = async (levelId: number) => {
    router.push(`/dashboard-game/${levelId}`);
  };

  // Resto del componente...
  // Usar `levels` en lugar de datos estáticos
  // Usar `session.playerName` en lugar de "John Doe"
  // Usar `session.selectedCrop` para mostrar el cultivo actual
};
```

### 3. Actualizar `modules/trivia/components/page-trivia.tsx`

Este es el componente más importante - la trivia:

```typescript
"use client";

import { useEffect } from "react";
import { useGameStore } from "@/core";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

export const TriviaPage = () => {
  const router = useRouter();
  const params = useParams();
  const levelId = parseInt(params.trivia as string);

  // Store
  const session = useGameStore((state) => state.session);
  const currentQuestions = useGameStore((state) => state.currentQuestions);
  const currentQuestionIndex = useGameStore(
    (state) => state.currentQuestionIndex
  );
  const selectedAnswer = useGameStore((state) => state.selectedAnswer);
  const showFeedback = useGameStore((state) => state.showFeedback);
  const answers = useGameStore((state) => state.answers);

  const startLevel = useGameStore((state) => state.startLevel);
  const selectAnswer = useGameStore((state) => state.selectAnswer);
  const submitAnswer = useGameStore((state) => state.submitAnswer);
  const nextQuestion = useGameStore((state) => state.nextQuestion);
  const finishLevel = useGameStore((state) => state.finishLevel);
  const getCurrentQuestion = useGameStore((state) => state.getCurrentQuestion);

  // Iniciar nivel al montar
  useEffect(() => {
    if (session) {
      startLevel(levelId);
    }
  }, [levelId, session, startLevel]);

  // Redirigir si no hay sesión
  useEffect(() => {
    if (!session) {
      router.push("/game-entry");
    }
  }, [session, router]);

  const currentQuestion = getCurrentQuestion();
  const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    selectAnswer(index);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) {
      toast.error("Por favor selecciona una respuesta");
      return;
    }

    await submitAnswer();

    // Esperar 2.5 segundos y avanzar
    setTimeout(() => {
      if (isLastQuestion) {
        handleFinish();
      } else {
        nextQuestion();
      }
    }, 2500);
  };

  const handleFinish = async () => {
    await finishLevel();
    toast.success("¡Nivel completado! 🎉");
    router.push("/dashboard-game");
  };

  if (!currentQuestion || !session) {
    return <div>Cargando preguntas...</div>;
  }

  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const score = correctAnswers * 20;

  return (
    <div className="h-screen flex items-center justify-center p-4">
      {/* UI de la trivia usando currentQuestion, selectedAnswer, etc. */}
      {/* Ver modules/trivia/components/page-trivia.tsx para la estructura UI */}
    </div>
  );
};
```

### 4. Actualizar constantes para usar iconos del core

Crear `core/domain/entities/CropIcons.tsx`:

```typescript
import { LucideProps } from "lucide-react";

export const CropIcons = {
  corn: (props: LucideProps) => (
    // SVG del maíz de game-entry-constants.tsx
  ),
  potato: (props: LucideProps) => (
    // SVG de la papa
  ),
  quinoa: (props: LucideProps) => (
    // SVG de la quinoa
  ),
};
```

Actualizar `core/domain/entities/Crop.ts`:

```typescript
import { CropIcons } from "./CropIcons";

export const CROPS: Record<CropType, Crop> = {
  corn: {
    id: "corn",
    name: "Maíz",
    description: "...",
    icon: CropIcons.corn,
  },
  // ...
};
```

### 5. Actualizar `crop-card.tsx` para aceptar `isLoading`

```typescript
interface ICropCardProps {
  Icon: any;
  isSelected: boolean;
  setSelectedMission: (id: string) => void;
  mission: IGameIntro;
  initMission: () => Promise<void>;
  isLoading?: boolean; // Agregar esto
}

export const CropCard: React.FC<ICropCardProps> = ({
  // ...
  isLoading = false,
}) => {
  return (
    <motion.div
      onClick={() => {
        if (!isLoading) {
          setSelectedMission(mission.id);
        }
      }}
      className={`... ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {/* Resto del componente */}
    </motion.div>
  );
};
```

### 6. Actualizar page de dashboard `app/dashboard-game/page.tsx`

```typescript
import { GameProgress } from "@/modules/dashboard/components/game-progress";

export default function DashboardGamePage() {
  return <GameProgress />;
}
```

### 7. Actualizar page de trivia `app/dashboard-game/[trivia]/page.tsx`

```typescript
import { TriviaPage } from "@/modules/trivia/components/page-trivia";

export default function TriviaPageRoute() {
  return <TriviaPage />;
}
```

## 🎯 Verificación Final

Después de implementar estos cambios, el flujo debería ser:

1. **`/game-entry`**

   - Usuario ingresa nombre
   - Selecciona cultivo (maíz, papa o quinoa)
   - Click en "Empezar" → Crea sesión y navega

2. **`/dashboard-game`**

   - Muestra nombre del jugador
   - Muestra progreso del cultivo seleccionado
   - Nivel 1 disponible, resto bloqueados
   - Click en nivel disponible → Navega a trivia

3. **`/dashboard-game/1`** (o cualquier nivel)

   - Carga las 5 preguntas del nivel y cultivo
   - Usuario responde pregunta por pregunta
   - Al terminar, calcula score
   - Guarda progreso
   - Desbloquea nivel 2
   - Vuelve al dashboard

4. **Cambio de Cultivo**
   - En el dashboard, botón para cambiar cultivo
   - Mantiene progreso de todos los cultivos
   - Cada cultivo tiene sus propias preguntas

## 🐛 Debugging

Si algo no funciona:

1. **Verificar localStorage**:

   ```javascript
   // En DevTools Console
   localStorage.getItem("nasa-game-session");
   ```

2. **Verificar Store**:

   ```typescript
   // En componente
   const session = useGameStore.getState().session;
   console.log(session);
   ```

3. **Limpiar sesión**:
   ```javascript
   localStorage.removeItem("nasa-game-session");
   ```

## 📚 Archivos Clave Creados

```
core/
├── domain/
│   ├── entities/
│   │   ├── Player.ts
│   │   ├── Crop.ts
│   │   ├── Level.ts
│   │   ├── Question.ts
│   │   └── GameSession.ts
│   └── ports/
│       ├── IQuestionRepository.ts
│       └── IGameSessionRepository.ts
├── application/
│   └── useGameStore.ts
├── infrastructure/
│   ├── data/
│   │   ├── cornQuestions.ts (30 preguntas)
│   │   ├── potatoQuestions.ts (30 preguntas)
│   │   └── quinoaQuestions.ts (30 preguntas)
│   └── repositories/
│       ├── InMemoryQuestionRepository.ts
│       └── LocalStorageGameSessionRepository.ts
└── index.ts (exports)
```

## ✨ ¡Todo listo!

Con estos cambios, tendrás un sistema completamente funcional con:

- ✅ Persistencia de datos
- ✅ Gestión de estado global
- ✅ Arquitectura escalable
- ✅ 90 preguntas únicas
- ✅ Progreso por cultivo
- ✅ Sistema de niveles

La arquitectura está lista para cuando quieras migrar a una base de datos real - solo necesitas crear nuevos repositorios que implementen las mismas interfaces.
