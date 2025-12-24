"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/lib/constants";
import { useMood } from "@/contexts/MoodContext";
import { staggerContainer, fadeUp } from "@/lib/animations";
import Navigation from "@/components/layout/Navigation";

export default function BlogPage() {
  const { mood } = useMood();

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
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
              Blog
            </h1>
            <p className="text-foreground-secondary text-lg max-w-2xl">
              Thoughts on code, creativity, and everything in between.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="px-6 md:px-12 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-foreground-muted text-sm uppercase tracking-wider mb-6">
              Featured
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Link href={`/blog/${post.id}`} className="group block">
                    <div className={`relative overflow-hidden bg-background-secondary ${
                      mood === "code" ? "rounded-lg" : "rounded-2xl"
                    }`}>
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <span className={`inline-block text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${
                            post.category === "code"
                              ? "bg-accent/20 text-accent"
                              : post.category === "art"
                              ? "bg-foreground/10 text-foreground-secondary"
                              : "bg-foreground/5 text-foreground-muted"
                          }`}>
                            {post.category}
                          </span>
                          <h3 className={`text-xl font-semibold text-foreground group-hover:text-accent transition-colors ${
                            mood === "art" ? "font-serif" : "font-display"
                          }`}>
                            {post.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-6 pt-4">
                        <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-foreground-muted text-xs">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-foreground-muted text-sm uppercase tracking-wider mb-6">
            All Posts
          </h2>
          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={fadeUp}
                custom={index}
              >
                <Link href={`/blog/${post.id}`} className="group block">
                  <div className={`flex flex-col md:flex-row gap-6 p-6 bg-background-secondary/50 hover:bg-background-secondary transition-colors ${
                    mood === "code" ? "rounded-lg" : "rounded-2xl"
                  }`}>
                    <div className={`relative w-full md:w-48 aspect-video md:aspect-square overflow-hidden flex-shrink-0 ${
                      mood === "code" ? "rounded-md" : "rounded-xl"
                    }`}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className={`inline-block w-fit text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${
                        post.category === "code"
                          ? "bg-accent/20 text-accent"
                          : post.category === "art"
                          ? "bg-foreground/10 text-foreground-secondary"
                          : "bg-foreground/5 text-foreground-muted"
                      }`}>
                        {post.category}
                      </span>
                      <h3 className={`text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2 ${
                        mood === "art" ? "font-serif" : "font-display"
                      }`}>
                        {post.title}
                      </h3>
                      <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-foreground-muted text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
