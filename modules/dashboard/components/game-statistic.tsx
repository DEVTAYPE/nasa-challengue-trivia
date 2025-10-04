"use client";

const statistics = [
  {
    title: "Puntos Totales",
    value: 100,
  },
  {
    title: "Juegos Jugados",
    value: 2,
  },
  {
    title: "Respuestas Correctas",
    value: 4,
  },
  {
    title: "Juegos Perfectos",
    value: 0,
  },
];

const learningData = [
  {
    title: "Satélites Aprendidos",
    value: "4/5",
    items: ["GPM", "SMAP", "MODIS", "NDVI"],
  },
  {
    title: "Regiones Exploradas",
    value: "1/2",
    items: ["Pará", "Andes"],
  },
];

export const GameStatistic = () => {
  return (
    <section>
      <h2>Mira todo lo que has aprendido!</h2>

      <section>
        <h3>Tu Progreso</h3>
        <p>Sigue explorando y desbloqueando logros</p>
      </section>

      <section>Conocimiento Adquirido</section>
    </section>
  );
};
