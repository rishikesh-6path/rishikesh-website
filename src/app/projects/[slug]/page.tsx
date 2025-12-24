"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/constants";
import { useMood } from "@/contexts/MoodContext";
import Navigation from "@/components/layout/Navigation";

export default function ProjectDetailPage() {
  const params = useParams();
  const { mood } = useMood();
  const project = projects.find((p) => p.id === params.slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-h2 mb-4">Project not found</h1>
          <Link href="/projects" className="text-accent hover:underline">
            Back to projects
          </Link>
        </div>
      </main>
    );
  }

  const isCode = project.category === "code";

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Image */}
      <motion.div
        className="relative h-[50vh] md:h-[60vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <section className="relative z-10 -mt-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              <span>All Projects</span>
            </Link>
          </motion.div>

          {/* Title & Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Category Badge */}
            <span className={`inline-block text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${
              isCode
                ? "bg-accent/20 text-accent"
                : "bg-foreground/10 text-foreground-secondary"
            }`}>
              {isCode ? "Code" : "Art"}
            </span>

            <h1 className={`text-h1 mb-4 ${
              mood === "code" ? "font-display font-bold" : "font-serif italic"
            }`}>
              {project.title}
            </h1>

            <p className="text-foreground-secondary text-xl leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    mood === "code"
                      ? "bg-background-secondary border border-border text-foreground"
                      : "bg-background-secondary/50 text-foreground-secondary"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-16">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                    mood === "code"
                      ? "bg-accent text-white hover:bg-accent-hover"
                      : "bg-foreground text-background hover:opacity-90"
                  }`}
                >
                  <ExternalLink size={16} />
                  View Live
                </a>
              )}
              {isCode && (
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground hover:bg-background-secondary transition-all"
                >
                  <Github size={16} />
                  Source Code
                </a>
              )}
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            className="prose prose-invert max-w-none mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className={`text-h3 mb-6 ${mood === "code" ? "font-display" : "font-serif"}`}>
              About this {isCode ? "Project" : "Work"}
            </h2>

            <div className="text-foreground-secondary leading-relaxed space-y-4">
              <p>
                {project.description} This project represents a significant milestone in my journey as a {isCode ? "developer" : "visual artist"}.
              </p>

              {isCode ? (
                <>
                  <h3 className="text-foreground font-semibold mt-8 mb-4">Technical Stack</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>

                  <h3 className="text-foreground font-semibold mt-8 mb-4">Key Features</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Responsive design optimized for all devices</li>
                    <li>Performance-focused architecture</li>
                    <li>Modern development practices</li>
                    <li>Comprehensive documentation</li>
                  </ul>
                </>
              ) : (
                <>
                  <h3 className="text-foreground font-semibold mt-8 mb-4">Creative Direction</h3>
                  <p>
                    The visual language of this project draws from contemporary aesthetics while maintaining a timeless quality.
                    Each frame was carefully composed to tell a cohesive story.
                  </p>

                  <h3 className="text-foreground font-semibold mt-8 mb-4">Equipment & Techniques</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Shot on professional cinema cameras</li>
                    <li>Color graded for cinematic look</li>
                    <li>Natural and artificial lighting blend</li>
                  </ul>
                </>
              )}
            </div>
          </motion.div>

          {/* Navigation to other projects */}
          <motion.div
            className="border-t border-border pt-12 pb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-foreground-muted text-sm uppercase tracking-wider mb-6">
              More {isCode ? "Projects" : "Work"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects
                .filter((p) => p.id !== project.id && p.category === project.category)
                .slice(0, 2)
                .map((relatedProject) => (
                  <Link
                    key={relatedProject.id}
                    href={`/projects/${relatedProject.id}`}
                    className="group block"
                  >
                    <div className={`relative aspect-video overflow-hidden ${
                      mood === "code" ? "rounded-lg" : "rounded-2xl"
                    }`}>
                      <Image
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <h4 className="text-foreground font-semibold group-hover:text-accent transition-colors">
                          {relatedProject.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
