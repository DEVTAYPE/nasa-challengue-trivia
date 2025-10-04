import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";
import { gameIntroConstants, IGameIntro } from "./game-entry-constants";

interface ICropCardProps {
  mission: IGameIntro;
  isSelected: boolean;
  setSelectedMission: (id: string) => void;
  Icon: any;
  initMission: () => void;
}

export const CropCard: React.FC<ICropCardProps> = ({
  mission,
  isSelected,
  setSelectedMission,
  Icon,
  initMission,
}) => {
  return (
    <motion.div
      key={mission.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.5 + gameIntroConstants.indexOf(mission) * 0.1,
      }}
      // whileHover={{ scale: 1.08, y: -10 }}
      // whileTap={{ scale: 0.95 }}
      onClick={() => setSelectedMission(mission.id)}
      className="cursor-pointer"
    >
      <Card
        className={`h-full relative overflow-hidden transition-all duration-500 backdrop-blur-md gap-3 ${
          isSelected
            ? `border-4 border-blue-400 shadow-[0_0_40px_rgba(96,165,250,0.4)]`
            : "border-2 border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]"
        } bg-gradient-to-br ${mission.gradient}`}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20"
          animate={{
            opacity: isSelected ? [0.3, 0.6, 0.3] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <CardHeader className="text-center space-y-3 relative z-10">
          <motion.div
            animate={{
              rotate: isSelected ? [0, 360] : 0,
              scale: isSelected ? [1, 1.15, 1] : 1,
            }}
            transition={{
              duration: isSelected ? 3 : 0,
              repeat: isSelected ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="mx-auto"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center relative ${
                isSelected
                  ? "bg-gradient-to-br from-blue-500/40 to-cyan-500/40 ring-4 ring-blue-400 shadow-[0_0_30px_rgba(96,165,250,0.6)]"
                  : "bg-gradient-to-br from-white/10 to-white/5 hover:ring-2 hover:ring-blue-400/50"
              } transition-all duration-300`}
            >
              {/* Icon glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl"
                animate={{
                  scale: isSelected ? [1, 1.3, 1] : 0,
                  opacity: isSelected ? [0.5, 0.8, 0.5] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <Icon
                className={`w-6 h-6 relative z-10 ${mission.iconColor} ${
                  isSelected ? "drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" : ""
                }`}
              />
            </div>
          </motion.div>

          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold text-white">
              {mission.title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          {isSelected && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="mt-3 text-center"
            >
              <motion.button
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(96,165,250,0.4)",
                    "0 0 30px rgba(96,165,250,0.6)",
                    "0 0 20px rgba(96,165,250,0.4)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  initMission();
                }}
                className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-bold hover:cursor-pointer"
              >
                ✓ Continuar
              </motion.button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
