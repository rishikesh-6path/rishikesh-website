"use client";

import { motion } from "framer-motion";
import { Terminal, Aperture } from "lucide-react";
import dynamic from "next/dynamic";

const GlassSurface = dynamic(() => import("@/components/GlassSurface"), {
  ssr: false,
});

interface MoodPanelProps {
  mode: "code" | "art";
  isActive: boolean;
  onClick: () => void;
  side: "left" | "right";
}

export default function MoodPanel({ mode, isActive, onClick, side }: MoodPanelProps) {
  const isCode = mode === "code";

  // Selection indicator color based on mode
  const indicatorColor = isCode ? "rgba(232, 93, 4, 0.8)" : "rgba(212, 165, 116, 0.8)";

  // No border radius - panels fade into edges seamlessly
  const borderRadiusStyle = "0";

  return (
    <motion.button
      onClick={onClick}
      className="relative cursor-pointer w-full h-full"
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.998 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <GlassSurface
        width={600}
        height={900}
        borderRadius={0}
        borderWidth={0.04}
        brightness={isActive ? 55 : 50}
        opacity={0.88}
        blur={isActive ? 22 : 16}
        displace={0}
        backgroundOpacity={isActive ? 0.1 : 0.02}
        saturation={0}
        distortionScale={-160}
        redOffset={0}
        greenOffset={12}
        blueOffset={24}
        className={`
          !w-full !h-full
          ${!isActive ? "opacity-50" : ""}
        `}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: borderRadiusStyle,
          transition: "all 0.5s ease",
        }}
      >
        <div
          className={`
            relative w-full h-full flex flex-col p-10 lg:p-12
            ${side === "left" ? "items-start justify-center" : "items-end justify-center text-right"}
          `}
        >
          {/* Accent glow overlay for active state */}
          {isActive && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: borderRadiusStyle,
                boxShadow: isCode
                  ? "inset 0 0 80px rgba(232, 93, 4, 0.06)"
                  : "inset 0 0 80px rgba(212, 165, 116, 0.06)",
              }}
            />
          )}

          {/* Icon */}
          <div className="relative z-10 text-white/70 mb-6">
            {isCode ? (
              <Terminal size={36} strokeWidth={1.5} />
            ) : (
              <Aperture size={36} strokeWidth={1.5} />
            )}
          </div>

          {/* Label */}
          <div className="relative z-10">
            <h3
              className={`text-2xl lg:text-3xl tracking-[0.18em] font-semibold text-white/85 ${
                isCode ? "font-display" : "font-serif italic"
              }`}
            >
              {isCode ? "CODE" : "ART"}
            </h3>
            <p className="text-base mt-2 text-white/45 tracking-wider">
              {isCode ? "Developer" : "Artist"}
            </p>
          </div>

          {/* Selection indicator line */}
          {isActive && (
            <motion.div
              className={`absolute bottom-10 lg:bottom-12 h-[2px] rounded-full ${
                side === "left" ? "left-10 lg:left-12" : "right-10 lg:right-12"
              }`}
              style={{
                backgroundColor: indicatorColor,
                width: "48px",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          )}
        </div>
      </GlassSurface>
    </motion.button>
  );
}
