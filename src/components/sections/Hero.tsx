"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Particles from "@/components/ui/Particles";
import MoodPanel from "@/components/ui/MoodPanel";
import { heroImage, heroSubtext, fadeUp } from "@/lib/animations";
import { useMood } from "@/contexts/MoodContext";

export default function Hero() {
  const { mood, setMood } = useMood();

  // Mode-specific typography classes
  const nameClasses = mood === "code"
    ? "font-display font-bold tracking-tighter"
    : "font-serif font-normal tracking-normal italic";

  const taglineClasses = mood === "code"
    ? "font-body tracking-wide"
    : "font-serif tracking-wider italic";

  return (
    <section className="relative h-screen flex flex-col items-center justify-end overflow-hidden pb-16 md:pb-20">
      {/* Background Image - Full bleed */}
      <motion.div
        className="absolute inset-0 z-0"
        variants={heroImage}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/images/portrait.jpg"
          alt="Rishikesh Swaminathan"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Subtle gradient at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent transition-colors duration-500" />
      </motion.div>

      {/* Ambient particles */}
      <Particles />

      {/* Mode Selector Panels - Desktop (floor-to-ceiling with central gutter) */}
      <div className="hidden md:flex absolute inset-0 z-10 pointer-events-none">
        {/* CODE Panel - Left Edge */}
        <motion.div
          className="absolute left-0 pointer-events-auto"
          style={{
            width: "46vw",
            height: "100vh",
            top: "0",
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <MoodPanel
            mode="code"
            side="left"
            isActive={mood === "code"}
            onClick={() => setMood("code")}
          />
        </motion.div>

        {/* ART Panel - Right Edge */}
        <motion.div
          className="absolute right-0 pointer-events-auto"
          style={{
            width: "46vw",
            height: "100vh",
            top: "0",
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <MoodPanel
            mode="art"
            side="right"
            isActive={mood === "art"}
            onClick={() => setMood("art")}
          />
        </motion.div>
      </div>

      {/* Mode Selector Panels - Mobile (compact horizontal strip) */}
      <motion.div
        className="md:hidden absolute top-20 left-0 right-0 z-10 flex justify-center gap-3 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-[140px] h-[180px]">
          <MoodPanel
            mode="code"
            side="left"
            isActive={mood === "code"}
            onClick={() => setMood("code")}
          />
        </div>
        <div className="w-[140px] h-[180px]">
          <MoodPanel
            mode="art"
            side="right"
            isActive={mood === "art"}
            onClick={() => setMood("art")}
          />
        </div>
      </motion.div>

      {/* Dark gradient overlay - blends glass panels with text */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* Name */}
      <motion.div
        className="relative z-20 text-center px-6"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className={`leading-[0.9] transition-all duration-500 ${nameClasses}`}>
          <span className="block text-[clamp(2rem,9vw,7rem)]">RISHIKESH</span>
          <span className="block text-[clamp(2rem,9vw,7rem)]">SWAMINATHAN</span>
        </h1>

        {/* Tagline */}
        <motion.p
          className={`mt-4 text-foreground-secondary text-lg md:text-xl transition-all duration-500 ${taglineClasses}`}
          variants={heroSubtext}
          initial="hidden"
          animate="visible"
        >
          Creator.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-foreground-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
