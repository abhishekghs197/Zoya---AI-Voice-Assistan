import React from "react";
import { motion, AnimatePresence } from "motion/react";

type AppState = "idle" | "listening" | "processing" | "speaking";

interface ZoyaAvatarProps {
  state: AppState;
}

export default function ZoyaAvatar({ state }: ZoyaAvatarProps) {
  // Eye Variants
  const eyeVariants = {
    idle: {
      scaleY: [1, 1, 0.1, 1, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        times: [0, 0.45, 0.5, 0.55, 1],
      },
    },
    listening: {
      scaleY: 1.2,
      scaleX: 1.1,
      transition: { duration: 0.3 },
    },
    processing: {
      x: [-5, 5, -5],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
    speaking: {
      scaleY: [1, 0.9, 1.1, 1],
      transition: { duration: 0.2, repeat: Infinity },
    },
  };

  // Mouth Variants
  const mouthVariants = {
    idle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      transition: { duration: 0.5 },
    },
    listening: {
      width: 20,
      height: 20,
      borderRadius: 10,
      transition: { duration: 0.3 },
    },
    processing: {
      width: 30,
      height: 4,
      borderRadius: 2,
      opacity: [0.5, 1, 0.5],
      transition: { duration: 1, repeat: Infinity },
    },
    speaking: {
      height: [4, 15, 6, 12, 4],
      width: [40, 35, 42, 38, 40],
      borderRadius: [2, 10, 4, 8, 2],
      transition: { duration: 0.15, repeat: Infinity },
    },
  };

  // Glow Colors based on state
  const getGlowColor = () => {
    switch (state) {
      case "listening": return "rgba(139, 92, 246, 0.6)"; // Violet
      case "processing": return "rgba(56, 189, 248, 0.6)"; // Sky Blue
      case "speaking": return "rgba(236, 72, 153, 0.6)"; // Pink
      default: return "rgba(6, 182, 212, 0.4)"; // Cyan
    }
  };

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Outer Glow Ring */}
      <motion.div
        animate={{
          scale: state === "idle" ? [1, 1.05, 1] : [1, 1.1, 1],
          opacity: state === "idle" ? [0.2, 0.4, 0.2] : [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ backgroundColor: getGlowColor() }}
      />

      {/* Face Container */}
      <motion.div
        animate={{
          y: state === "idle" ? [0, -5, 0] : 0,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-32 h-32 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 flex flex-col items-center justify-center shadow-2xl overflow-hidden"
      >
        {/* Eyes Row */}
        <div className="flex gap-8 mb-4">
          {/* Left Eye */}
          <motion.div
            variants={eyeVariants}
            animate={state}
            className="w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />
          {/* Right Eye */}
          <motion.div
            variants={eyeVariants}
            animate={state}
            className="w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />
        </div>

        {/* Mouth */}
        <motion.div
          variants={mouthVariants}
          animate={state}
          className="bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        />

        {/* HUD Elements (Subtle) */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border border-dashed border-white/5 rounded-full"
          />
        </div>
      </motion.div>

      {/* State Label (Optional, very subtle) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.5, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute -bottom-8 text-[10px] uppercase tracking-[0.3em] font-mono text-white/60"
        >
          {state}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
