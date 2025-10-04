"use client";

import { GameEntry1 } from "@/modules/home/components";
import { motion } from "framer-motion";

const GameEntryPage = () => {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-background p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('/game/background-entry.jpeg')` }}
    >
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 bg-blue-500/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      <section className="absolute inset-0 top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black/50"></section>
      <GameEntry1 />
      {/* <GameEntry /> */}
      {/* Entry game */}
    </main>
  );
};

export default GameEntryPage;
