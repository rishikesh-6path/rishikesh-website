"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { aboutData } from "@/lib/constants";
import { useMood } from "@/contexts/MoodContext";

export default function About() {
  const { mood } = useMood();

  // Mode-specific classes
  const sectionLabelClasses = mood === "code"
    ? "font-medium tracking-[0.2em]"
    : "font-serif tracking-[0.15em] italic";

  const quoteClasses = mood === "code"
    ? "font-serif text-h2 italic"
    : "font-serif text-h2 italic opacity-90";

  const statPillClasses = mood === "code"
    ? "rounded-full border border-border"
    : "rounded-full border-0 bg-background-secondary/50";

  // Decorative element: square for CODE, circle for ART
  const decorativeClasses = mood === "code"
    ? "w-32 h-32 rounded-2xl border border-accent/20"
    : "w-36 h-36 rounded-full border-2 border-accent/15";

  return (
    <section id="about" className="pt-48 md:pt-56 pb-24 bg-background relative z-10">
      {/* Top gradient - matches Hero's 90% black ending, fades to bg-background */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, transparent 100%)",
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: '48px', paddingRight: '48px' }}>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Pull Quote - Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: mood === "code" ? 0.7 : 1, ease: "easeOut" }}
          >
            {/* Section label */}
            <span className={`inline-block text-xs uppercase text-foreground-muted mb-6 transition-all duration-500 ${sectionLabelClasses}`}>
              The Perspective
            </span>

            {/* Pull Quote */}
            <blockquote className={`text-foreground leading-tight transition-all duration-500 ${quoteClasses}`}>
              &ldquo;{aboutData.pullQuote}&rdquo;
            </blockquote>

            {/* Short intro */}
            <p className="mt-8 text-foreground-secondary leading-relaxed">
              {aboutData.shortIntro}
            </p>

            {/* Stat pills */}
            <motion.div
              className="flex flex-wrap gap-3 mt-8"
              variants={staggerContainer}
            >
              {aboutData.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className={`px-4 py-2 text-sm transition-all duration-500 ${statPillClasses}`}
                >
                  <span className="text-foreground-muted">{stat.label}: </span>
                  <span className="text-foreground font-medium">{stat.value}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Long narrative */}
            <motion.p
              className="mt-8 text-foreground-muted text-sm leading-relaxed max-w-md"
              variants={fadeUp}
            >
              {aboutData.longNarrative}
            </motion.p>
          </motion.div>

          {/* Image - Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: mood === "code" ? 0.7 : 1, ease: "easeOut", delay: 0.1 }}
          >
            <div className="relative">
              <div className={`relative aspect-[4/5] max-w-lg mx-auto overflow-hidden transform transition-all duration-500 ${
                mood === "code"
                  ? "rounded-2xl rotate-1 hover:rotate-0"
                  : "rounded-3xl rotate-0 hover:scale-[1.02]"
              }`}>
                <Image
                  src="/images/about.jpg"
                  alt="Rishikesh working"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative element - square for CODE, circle for ART */}
              <div className={`absolute -bottom-4 -right-4 -z-10 transition-all duration-500 ${decorativeClasses}`} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
