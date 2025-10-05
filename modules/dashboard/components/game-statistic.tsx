"use client";

import { useLanguage } from "@/lib/i18n/language-context";

export const GameStatistic = () => {
  const { language } = useLanguage();

  const statistics = [
    {
      title: language === "es" ? "Puntos Totales" : "Total Points",
      value: 100,
    },
    {
      title: language === "es" ? "Juegos Jugados" : "Games Played",
      value: 2,
    },
    {
      title: language === "es" ? "Respuestas Correctas" : "Correct Answers",
      value: 4,
    },
    {
      title: language === "es" ? "Juegos Perfectos" : "Perfect Games",
      value: 0,
    },
  ];

  const learningData = [
    {
      title: language === "es" ? "Satélites Aprendidos" : "Satellites Learned",
      value: "4/5",
      items: ["GPM", "SMAP", "MODIS", "NDVI"],
    },
    {
      title: language === "es" ? "Regiones Exploradas" : "Regions Explored",
      value: "1/2",
      items: ["Pará", "Andes"],
    },
  ];

  return (
    <section>
      <h2>
        {language === "es"
          ? "Mira todo lo que has aprendido!"
          : "Look at everything you've learned!"}
      </h2>

      <section>
        <h3>{language === "es" ? "Tu Progreso" : "Your Progress"}</h3>
        <p>
          {language === "es"
            ? "Sigue explorando y desbloqueando logros"
            : "Keep exploring and unlocking achievements"}
        </p>
      </section>

      <section>
        {language === "es" ? "Conocimiento Adquirido" : "Knowledge Acquired"}
      </section>
    </section>
  );
};
