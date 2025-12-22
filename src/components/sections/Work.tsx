"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Toggle from "@/components/ui/Toggle";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/constants";
import { fadeUp, workGridTransform, workCardTransform } from "@/lib/animations";

export default function Work() {
  const [activeMode, setActiveMode] = useState<"code" | "lens">("code");

  const filteredProjects = projects.filter((p) => p.category === activeMode);

  return (
    <section id="work" className="py-32">
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: '48px', paddingRight: '48px' }}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-display text-h1 font-bold mb-8">SELECTED WORKS</h2>

          {/* Toggle */}
          <Toggle activeMode={activeMode} onToggle={setActiveMode} />
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            variants={workGridTransform}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filteredProjects.map((project, index) => (
              <motion.div key={project.id} variants={workCardTransform}>
                <ProjectCard project={project} index={index} mode={activeMode} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Link */}
        <motion.div
          className="text-center mt-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <a
            href="/work"
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-accent transition-colors duration-300 font-medium"
          >
            VIEW FULL PORTFOLIO
            <span className="text-accent">→</span>
          </a>
        </motion.div>
      </div>

      {/* Mode-specific background texture */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-500 -z-10 ${
          activeMode === "code" ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Subtle grid pattern for code mode */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(232, 93, 4, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(232, 93, 4, 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </section>
  );
}
