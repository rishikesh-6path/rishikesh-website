"use client";

import { Code2, Aperture } from "lucide-react";
import { useMood } from "@/contexts/MoodContext";

export default function Toggle() {
  const { mood, setMood } = useMood();

  return (
    <div className="relative inline-flex items-center gap-1 bg-background-secondary/50 backdrop-blur-sm rounded-full p-1.5 border border-border/50 transition-colors duration-500">
      {/* CODE button */}
      <button
        onClick={() => setMood("code")}
        className={`relative flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
          mood === "code"
            ? "bg-accent text-white shadow-lg shadow-accent/20"
            : "text-foreground-muted hover:text-foreground-secondary"
        }`}
      >
        <Code2 size={16} />
        <span className="font-display font-semibold text-sm tracking-wider">CODE</span>
      </button>

      {/* ART button */}
      <button
        onClick={() => setMood("art")}
        className={`relative flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
          mood === "art"
            ? "bg-accent text-white shadow-lg shadow-accent/20"
            : "text-foreground-muted hover:text-foreground-secondary"
        }`}
      >
        <Aperture size={16} />
        <span className="font-display font-semibold text-sm tracking-wider">ART</span>
      </button>
    </div>
  );
}
