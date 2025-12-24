"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin } from "lucide-react";
import { blogPosts } from "@/lib/constants";
import { useMood } from "@/contexts/MoodContext";
import Navigation from "@/components/layout/Navigation";

export default function BlogPostPage() {
  const params = useParams();
  const { mood } = useMood();
  const post = blogPosts.find((p) => p.id === params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-h2 mb-4">Post not found</h1>
          <Link href="/blog" className="text-accent hover:underline">
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Image */}
      <motion.div
        className="relative h-[40vh] md:h-[50vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </motion.div>

      {/* Content */}
      <article className="relative z-10 -mt-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              <span>All Posts</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12"
          >
            <span className={`inline-block text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${
              post.category === "code"
                ? "bg-accent/20 text-accent"
                : post.category === "art"
                ? "bg-foreground/10 text-foreground-secondary"
                : "bg-foreground/5 text-foreground-muted"
            }`}>
              {post.category}
            </span>

            <h1 className={`text-h1 mb-6 ${
              mood === "code" ? "font-display font-bold" : "font-serif italic"
            }`}>
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-foreground-muted text-sm">
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>
          </motion.header>

          {/* Article Body */}
          <motion.div
            className="prose prose-invert prose-lg max-w-none mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-xl text-foreground-secondary leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="text-foreground-secondary leading-relaxed space-y-6">
              <p>
                In this article, we explore the intricacies of {post.title.toLowerCase()}.
                Whether you're a seasoned professional or just starting out, there's something
                valuable here for everyone.
              </p>

              <h2 className={`text-h3 text-foreground mt-12 mb-4 ${mood === "code" ? "font-display" : "font-serif"}`}>
                Getting Started
              </h2>

              <p>
                The journey begins with understanding the fundamentals. Before diving into
                advanced techniques, it's crucial to have a solid foundation. This ensures
                that you can build upon your knowledge effectively.
              </p>

              <p>
                Key considerations include understanding the core principles, practicing
                regularly, and staying updated with the latest developments in the field.
              </p>

              <h2 className={`text-h3 text-foreground mt-12 mb-4 ${mood === "code" ? "font-display" : "font-serif"}`}>
                Advanced Techniques
              </h2>

              <p>
                Once you've mastered the basics, it's time to explore more sophisticated
                approaches. These techniques can significantly improve your results and
                set your work apart from the rest.
              </p>

              <ul className="list-disc list-inside space-y-2 text-foreground-secondary">
                <li>Start with a clear vision of what you want to achieve</li>
                <li>Iterate and refine your approach based on feedback</li>
                <li>Don't be afraid to experiment with new ideas</li>
                <li>Document your process for future reference</li>
              </ul>

              <h2 className={`text-h3 text-foreground mt-12 mb-4 ${mood === "code" ? "font-display" : "font-serif"}`}>
                Conclusion
              </h2>

              <p>
                Mastering any skill takes time and dedication. By following these principles
                and continuously pushing your boundaries, you'll be well on your way to
                achieving excellence in your craft.
              </p>
            </div>
          </motion.div>

          {/* Share */}
          <motion.div
            className="flex items-center gap-4 py-8 border-t border-b border-border mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="text-foreground-muted text-sm flex items-center gap-2">
              <Share2 size={14} />
              Share
            </span>
            <button className="p-2 rounded-full bg-background-secondary hover:bg-accent/20 transition-colors">
              <Twitter size={16} className="text-foreground" />
            </button>
            <button className="p-2 rounded-full bg-background-secondary hover:bg-accent/20 transition-colors">
              <Linkedin size={16} className="text-foreground" />
            </button>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              className="pb-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-foreground-muted text-sm uppercase tracking-wider mb-6">
                Related Posts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="group block"
                  >
                    <div className={`relative aspect-video overflow-hidden mb-4 ${
                      mood === "code" ? "rounded-lg" : "rounded-2xl"
                    }`}>
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="text-foreground font-semibold group-hover:text-accent transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-foreground-muted text-sm mt-1">
                      {relatedPost.readTime}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </article>
    </main>
  );
}
