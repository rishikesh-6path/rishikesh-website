"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { mood } = useMood();

  useEffect(() => {
    // Generate different particle configurations based on mood
    const particleCount = mood === "code" ? 20 : 12;
    const minSize = mood === "code" ? 2 : 4;
    const maxSizeAdd = mood === "code" ? 3 : 8;

    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * maxSizeAdd + minSize,
      duration: Math.random() * 10 + (mood === "code" ? 10 : 15),
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [mood]);

  // Mode-specific animation configurations
  const getAnimation = (particle: Particle) => {
    if (mood === "code") {
      // CODE: More geometric, precise movements
      return {
        y: [0, -30, 0],
        x: [0, 10, -10, 0],
        opacity: [0.2, 0.5, 0.2],
      };
    } else {
      // LENS: Softer, bokeh-like floating
      return {
        y: [0, -20, 0],
        x: [0, 5, -5, 0],
        opacity: [0.1, 0.4, 0.1],
        scale: [1, 1.2, 1],
      };
    }
  };

  const getTransition = (particle: Particle) => {
    const ease: "easeInOut" | "linear" = mood === "code" ? "easeInOut" : "linear";
    return {
      duration: particle.duration,
      repeat: Infinity,
      delay: particle.delay,
      ease,
    };
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={`${particle.id}-${mood}`}
          className={`absolute rounded-full transition-colors duration-500 ${
            mood === "code"
              ? "bg-accent/40"
              : "bg-accent/20 blur-[1px]"
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={getAnimation(particle)}
          transition={getTransition(particle)}
        />
      ))}
    </div>
  );
}
