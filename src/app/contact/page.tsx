"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Send, Twitter, Github, Instagram, Linkedin } from "lucide-react";
import { useMood } from "@/contexts/MoodContext";
import Navigation from "@/components/layout/Navigation";

export default function ContactPage() {
  const { mood } = useMood();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/" },
    { name: "GitHub", icon: Github, href: "https://github.com/" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-h1 mb-6 ${mood === "code" ? "font-display font-bold" : "font-serif italic"}`}>
                Let's Connect
              </h1>

              <p className="text-foreground-secondary text-lg mb-8">
                Have a project in mind? Want to collaborate? Or just want to say hi?
                I'd love to hear from you.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-12">
                <div className="flex items-center gap-4 text-foreground-secondary">
                  <div className={`p-3 rounded-full bg-background-secondary ${mood === "art" ? "rounded-full" : "rounded-lg"}`}>
                    <Mail size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-foreground-muted text-sm">Email</p>
                    <a href="mailto:hello@rishikesh.dev" className="text-foreground hover:text-accent transition-colors">
                      hello@rishikesh.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-foreground-secondary">
                  <div className={`p-3 rounded-full bg-background-secondary ${mood === "art" ? "rounded-full" : "rounded-lg"}`}>
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-foreground-muted text-sm">Location</p>
                    <p className="text-foreground">Chennai, India</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-foreground-muted text-sm uppercase tracking-wider mb-4">
                  Follow Me
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-background-secondary hover:bg-accent/20 transition-all ${
                        mood === "code" ? "rounded-lg" : "rounded-full"
                      }`}
                    >
                      <social.icon size={20} className="text-foreground" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <motion.div
                className={`mt-12 p-6 border border-border ${mood === "code" ? "rounded-lg" : "rounded-2xl"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-foreground font-medium">Available for projects</span>
                </div>
                <p className="text-foreground-muted text-sm">
                  Currently accepting new projects for Q1 2025. Let's discuss how I can help bring your vision to life.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {submitted ? (
                <div className={`p-8 bg-background-secondary text-center ${mood === "code" ? "rounded-lg" : "rounded-2xl"}`}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <Send size={24} className="text-accent" />
                  </div>
                  <h3 className="text-h3 text-foreground mb-2">Message Sent!</h3>
                  <p className="text-foreground-muted">
                    Thanks for reaching out. I'll get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-foreground-muted text-sm mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-background-secondary border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent transition-colors ${
                        mood === "code" ? "rounded-lg" : "rounded-xl"
                      }`}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-foreground-muted text-sm mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-background-secondary border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent transition-colors ${
                        mood === "code" ? "rounded-lg" : "rounded-xl"
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-foreground-muted text-sm mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-background-secondary border border-border text-foreground focus:outline-none focus:border-accent transition-colors ${
                        mood === "code" ? "rounded-lg" : "rounded-xl"
                      }`}
                    >
                      <option value="">Select a topic</option>
                      <option value="project">Project Inquiry</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-foreground-muted text-sm mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 bg-background-secondary border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent transition-colors resize-none ${
                        mood === "code" ? "rounded-lg" : "rounded-xl"
                      }`}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 font-medium transition-all flex items-center justify-center gap-2 ${
                      mood === "code"
                        ? "bg-accent text-white hover:bg-accent-hover rounded-lg"
                        : "bg-foreground text-background hover:opacity-90 rounded-full"
                    } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
