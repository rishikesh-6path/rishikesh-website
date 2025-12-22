"use client";

import { motion } from "framer-motion";
import { Terminal, Aperture } from "lucide-react";

interface MoodPanelProps {
  mode: "code" | "art";
  isActive: boolean;
  onClick: () => void;
}

export default function MoodPanel({ mode, isActive, onClick }: MoodPanelProps) {
  const isCode = mode === "code";

  // Mode-specific styling
  const accentColor = isCode ? "rgba(232, 93, 4, 0.3)" : "rgba(212, 165, 116, 0.3)";
  const accentGlow = isCode ? "rgba(232, 93, 4, 0.5)" : "rgba(212, 165, 116, 0.5)";

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative overflow-hidden cursor-pointer
        w-36 h-48 md:w-44 md:h-64 lg:w-52 lg:h-80
        rounded-2xl
        backdrop-blur-md
        border border-white/10
        transition-all duration-500
        flex flex-col items-center justify-center gap-3
        ${isActive ? "opacity-100" : "opacity-40 hover:opacity-70"}
      `}
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
        boxShadow: isActive ? `0 0 40px ${accentGlow}, inset 0 0 20px ${accentColor}` : "none",
        borderColor: isActive ? accentColor : "rgba(255,255,255,0.1)",
      }}
      whileHover={{ scale: isActive ? 1.02 : 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background texture preview on hover */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100
          ${isCode ? "" : ""}
        `}
      >
        {isCode ? (
          // CODE: Grid pattern overlay
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(232, 93, 4, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(232, 93, 4, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
        ) : (
          // ART: Film grain overlay
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )}
      </div>

      {/* Active glow effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Icon */}
      <motion.div
        className={`relative z-10 transition-colors duration-500 ${
          isActive ? "text-white" : "text-white/60"
        }`}
        animate={{ scale: isActive ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {isCode ? (
          <Terminal size={32} strokeWidth={1.5} />
        ) : (
          <Aperture size={32} strokeWidth={1.5} />
        )}
      </motion.div>

      {/* Label */}
      <div className="relative z-10 text-center">
        <h3
          className={`text-lg md:text-xl font-bold tracking-wider transition-colors duration-500 ${
            isActive ? "text-white" : "text-white/60"
          } ${isCode ? "font-display" : "font-serif italic"}`}
        >
          {isCode ? "CODE" : "ART"}
        </h3>
        <p
          className={`text-xs md:text-sm mt-1 transition-colors duration-500 ${
            isActive ? "text-white/80" : "text-white/40"
          }`}
        >
          {isCode ? "Developer" : "Artist"}
        </p>
      </div>

      {/* Selection indicator */}
      {isActive && (
        <motion.div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
          style={{ backgroundColor: isCode ? "#E85D04" : "#D4A574" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
}
