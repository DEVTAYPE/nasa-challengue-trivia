"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CropCard } from "./crop-card";
import { gameIntroConstants } from "./game-entry-constants";

export const GameEntry1 = () => {
  const [username, setUsername] = useState("");
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const router = useRouter();

  const initMission = () => {
    if (!username) {
      alert("Por favor, ingresa tu nombre explorador.");
      return;
    }

    if (!selectedMission) {
      alert("Por favor, selecciona una misión.");
      return;
    }

    // TODO: Lógica para iniciar la misión con el nombre y misión seleccionada

    router.push("/dashboard-game");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl"
    >
      <Card className="backdrop-blur-sm shadow-2xl border border-white/10 bg-gradient-to-br from-black/80 via-black/70 to-black/60 overflow-hidden">
        <CardHeader className="space-y-2 relative">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent text-center">
              Empecemos tu aventura agrícola!
            </CardTitle>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-6 px-10 pb-10">
          {/* Username Input */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-md space-y-3"
          >
            <Label
              htmlFor="username"
              className="text-xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent"
            >
              Tu nombre explorador:
            </Label>
            <Input
              id="username"
              placeholder="Ej: Pedro Agricultor"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-sm border-white/20 bg-white/5 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 placeholder:text-white/30 text-white/90 selection:bg-blue-400/30 selection:text-white"
            />
          </motion.div>

          {/* Mission Cards */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              Selecciona tu primer cultivo para la misión:
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {gameIntroConstants.map((mission) => {
                const Icon = mission.icon;
                const isSelected = selectedMission === mission.id;

                return (
                  <CropCard
                    Icon={Icon}
                    isSelected={isSelected}
                    setSelectedMission={setSelectedMission}
                    mission={mission}
                    initMission={initMission}
                  />
                );
              })}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
