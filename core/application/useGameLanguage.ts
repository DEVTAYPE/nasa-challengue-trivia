import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { useGameStore } from "@/core/application/useGameStore";
import { Language } from "@/core/domain/ports/IQuestionRepository";

/**
 * Hook que sincroniza el idioma del contexto de i18n con el store del juego
 * Permite que las preguntas de trivia se carguen en el idioma correcto
 */
export const useGameLanguage = () => {
  const { language } = useLanguage();
  const setGameLanguage = useGameStore((state) => state.setLanguage);

  useEffect(() => {
    // Sincronizar el idioma cuando cambie
    setGameLanguage(language as Language);
  }, [language, setGameLanguage]);

  return { language };
};
