"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { navSlideDown } from "@/lib/animations";
import Button from "@/components/ui/Button";
import { useMood } from "@/contexts/MoodContext";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { mood } = useMood();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mode-specific classes
  const logoClasses = mood === "code"
    ? "font-display font-bold"
    : "font-serif font-normal italic";

  const navLinkClasses = mood === "code"
    ? "font-medium"
    : "font-normal tracking-wide";

  const transitionDuration = mood === "code" ? "duration-300" : "duration-500";

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${transitionDuration} ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border/50"
            : "bg-transparent"
        }`}
        variants={navSlideDown}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className={`text-xl text-foreground min-w-[80px] transition-all ${transitionDuration} ${logoClasses}`}>
              RS<span className="text-accent transition-colors duration-500">.</span>
            </a>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`link-hover text-foreground-secondary hover:text-foreground transition-colors ${transitionDuration} text-sm ${navLinkClasses}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button variant="outline" size="md" href="#contact">
                Let&apos;s Talk
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`text-3xl text-foreground hover:text-accent transition-colors ${
                    mood === "code" ? "font-display font-semibold" : "font-serif font-normal italic"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * (mood === "code" ? 0.1 : 0.15) }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * (mood === "code" ? 0.1 : 0.15) }}
              >
                <Button variant="primary" size="lg" href="#contact">
                  Let&apos;s Talk
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
