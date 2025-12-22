"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, slideLeft, slideRight, staggerContainer } from "@/lib/animations";
import { aboutData } from "@/lib/constants";

export default function About() {
  return (
    <section id="about" className="pt-48 md:pt-56 pb-24 px-6 lg:px-8 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Pull Quote - Left Side */}
          <motion.div variants={slideLeft}>
            {/* Section label */}
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-foreground-muted mb-6">
              The Perspective
            </span>

            {/* Pull Quote */}
            <blockquote className="font-serif text-h2 italic text-foreground leading-tight">
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
                  className="px-4 py-2 rounded-full border border-border text-sm"
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
          <motion.div variants={slideRight}>
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-lg mx-auto rounded-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/about.jpg"
                  alt="Rishikesh working"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-accent/20 rounded-2xl -z-10" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
