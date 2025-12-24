"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/lib/constants";
import { useMood } from "@/contexts/MoodContext";
import { staggerContainer, fadeUp } from "@/lib/animations";
import Navigation from "@/components/layout/Navigation";

export default function ProjectsPage() {
  const { mood } = useMood();

  // Filter projects based on current mood
  const filteredProjects = projects.filter((project) =>
    mood === "code" ? project.category === "code" : project.category === "art"
  );

  const allProjects = mood === "code"
    ? [...projects.filter(p => p.category === "code"), ...projects.filter(p => p.category === "art")]
    : [...projects.filter(p => p.category === "art"), ...projects.filter(p => p.category === "code")];

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-h1 mb-4 ${mood === "code" ? "font-display font-bold" : "font-serif italic"}`}>
              {mood === "code" ? "Projects" : "Portfolio"}
            </h1>
            <p className="text-foreground-secondary text-lg max-w-2xl">
              {mood === "code"
                ? "A collection of software projects, from ML pipelines to full-stack applications."
                : "Visual stories captured through lens and light. Films, photography, and creative direction."
              }
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            className="flex gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className={`text-sm px-4 py-2 rounded-full transition-all ${
              mood === "code"
                ? "bg-accent/20 text-accent"
                : "bg-background-secondary text-foreground-muted"
            }`}>
              Code ({projects.filter(p => p.category === "code").length})
            </span>
            <span className={`text-sm px-4 py-2 rounded-full transition-all ${
              mood === "art"
                ? "bg-accent/20 text-accent"
                : "bg-background-secondary text-foreground-muted"
            }`}>
              Art ({projects.filter(p => p.category === "art").length})
            </span>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 md:px-12 pb-24">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              custom={index}
              className="group"
            >
              <Link href={`/projects/${project.id}`}>
                <div className={`
                  relative overflow-hidden bg-background-secondary
                  transition-all duration-500
                  ${mood === "code" ? "rounded-lg" : "rounded-2xl"}
                  ${project.category !== (mood === "code" ? "code" : "art") ? "opacity-50" : ""}
                `}>
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {project.featured && (
                      <span className="absolute top-4 right-4 z-20 text-xs px-3 py-1 bg-accent/90 text-white rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className={`text-lg font-semibold text-foreground group-hover:text-accent transition-colors ${
                        mood === "art" ? "font-serif" : "font-display"
                      }`}>
                        {project.title}
                      </h3>
                      <ExternalLink size={16} className="text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2 py-1 rounded transition-colors ${
                            mood === "code"
                              ? "bg-accent/10 text-accent"
                              : "bg-foreground/5 text-foreground-secondary"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
