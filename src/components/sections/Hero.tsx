"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Particles from "@/components/ui/Particles";
import { heroImage, heroSubtext, fadeUp } from "@/lib/animations";

export default function Hero() {
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
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </motion.div>

      {/* Ambient particles */}
      <Particles />

      {/* Name */}
      <motion.div
        className="relative z-10 text-center px-6"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="font-display font-bold tracking-tighter leading-[0.9]">
          <span className="block text-[clamp(2rem,9vw,7rem)]">RISHIKESH</span>
          <span className="block text-[clamp(2rem,9vw,7rem)]">SWAMINATHAN</span>
        </h1>

        {/* Tagline */}
        <motion.p
          className="mt-4 text-foreground-secondary font-body text-lg md:text-xl tracking-wide"
          variants={heroSubtext}
          initial="hidden"
          animate="visible"
        >
          Creator.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
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
