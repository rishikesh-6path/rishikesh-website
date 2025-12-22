"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useMood } from "@/contexts/MoodContext";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
}: ButtonProps) {
  const { mood } = useMood();

  // Mode-specific styles
  const borderRadius = mood === "code" ? "rounded-full" : "rounded-xl";
  const transitionDuration = mood === "code" ? "duration-300" : "duration-500";

  const baseStyles = `inline-flex items-center justify-center font-display font-medium transition-all ${transitionDuration} ${borderRadius}`;

  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-hover shadow-lg hover:shadow-[0_0_30px_var(--accent-glow)]",
    outline:
      "border border-border text-foreground-secondary hover:border-accent hover:text-accent",
    ghost: "text-foreground-secondary hover:text-accent",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // Mode-specific animation
  const hoverScale = mood === "code" ? 1.03 : 1.02;
  const hoverTransition = {
    duration: mood === "code" ? 0.2 : 0.4,
    ease: "easeOut" as const,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: hoverScale, transition: hoverTransition }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileHover={{ scale: hoverScale, transition: hoverTransition }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
