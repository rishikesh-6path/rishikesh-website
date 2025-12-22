"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/constants";
import { cardHover } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
  index: number;
  mode: "code" | "lens";
}

export default function ProjectCard({ project, index, mode }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const isLarge = project.featured || index === 0;

  return (
    <motion.article
      className={`group relative overflow-hidden rounded-2xl bg-background-secondary border border-border/50 hover:border-border-hover transition-all duration-300 cursor-pointer ${
        isLarge ? "md:col-span-2 md:row-span-2" : ""
      }`}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      layout
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-background-tertiary">
        {!imageError && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}

        {/* Gradient overlay - always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
                mode === "code"
                  ? "bg-accent/10 border border-accent/20 text-accent"
                  : "bg-white/5 border border-white/10 text-foreground-secondary"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-display font-semibold text-foreground mb-1">
          {project.title}
        </h3>

        {/* Description */}
        <p
          className={`text-foreground-secondary text-sm leading-relaxed transition-all duration-300 line-clamp-2 ${
            isLarge ? "opacity-100" : "opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20"
          }`}
        >
          {project.description}
        </p>
      </div>

      {/* Arrow indicator */}
      <div className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-sm text-foreground-muted group-hover:text-accent group-hover:bg-accent/10 transition-all duration-300">
        <ArrowUpRight size={16} />
      </div>
    </motion.article>
  );
}
