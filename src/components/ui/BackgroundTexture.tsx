"use client";

import { useMood } from "@/contexts/MoodContext";

export default function BackgroundTexture() {
  const { mood } = useMood();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* CODE Mode: Subtle grid pattern */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          mood === "code" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(232, 93, 4, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(232, 93, 4, 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* ART Mode: Film grain + warm vignette */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          mood === "art" ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Enhanced film grain */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Warm vignette overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(13, 11, 9, 0.8) 100%)`,
          }}
        />

        {/* Subtle warm light leak - top right */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background: `radial-gradient(ellipse at 80% 20%, rgba(212, 165, 116, 0.5) 0%, transparent 50%)`,
          }}
        />

        {/* Subtle warm light leak - bottom left */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            background: `radial-gradient(ellipse at 20% 80%, rgba(212, 165, 116, 0.4) 0%, transparent 40%)`,
          }}
        />
      </div>
    </div>
  );
}
