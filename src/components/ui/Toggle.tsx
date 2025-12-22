"use client";

import { motion } from "framer-motion";
import { Code2, Aperture } from "lucide-react";

interface ToggleProps {
  activeMode: "code" | "lens";
  onToggle: (mode: "code" | "lens") => void;
}

export default function Toggle({ activeMode, onToggle }: ToggleProps) {
  return (
    <div className="relative inline-flex items-center gap-1 bg-background-secondary/50 backdrop-blur-sm rounded-full p-1.5 border border-border/50">
      {/* CODE button */}
      <button
        onClick={() => onToggle("code")}
        className={`relative flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
          activeMode === "code"
            ? "bg-accent text-white shadow-lg shadow-accent/20"
            : "text-foreground-muted hover:text-foreground-secondary"
        }`}
      >
        <Code2 size={16} />
        <span className="font-display font-semibold text-sm tracking-wider">CODE</span>
      </button>

      {/* LENS button */}
      <button
        onClick={() => onToggle("lens")}
        className={`relative flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
          activeMode === "lens"
            ? "bg-accent text-white shadow-lg shadow-accent/20"
            : "text-foreground-muted hover:text-foreground-secondary"
        }`}
      >
        <Aperture size={16} />
        <span className="font-display font-semibold text-sm tracking-wider">LENS</span>
      </button>
    </div>
  );
}
