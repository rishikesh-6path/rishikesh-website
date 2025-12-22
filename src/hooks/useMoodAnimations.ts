"use client";

import { useMemo } from "react";
import { Variants } from "framer-motion";
import { useMood } from "@/contexts/MoodContext";

// Animation timing constants
const CODE_TIMING = {
  duration: 0.3,
  durationSlow: 0.5,
  stagger: 0.05,
  ease: [0.25, 0.46, 0.45, 0.94] as const, // Sharp easeOut
};

const LENS_TIMING = {
  duration: 0.6,
  durationSlow: 0.9,
  stagger: 0.1,
  ease: [0.4, 0, 0.2, 1] as const, // Smooth cubic-bezier
};

export function useMoodAnimations() {
  const { mood } = useMood();

  return useMemo(() => {
    const timing = mood === "code" ? CODE_TIMING : LENS_TIMING;

    // Fade up animation
    const fadeUp: Variants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: timing.duration,
          ease: timing.ease,
        },
      },
    };

    // Fade in animation
    const fadeIn: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: timing.duration,
          ease: timing.ease,
        },
      },
    };

    // Scale up animation
    const scaleUp: Variants = {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: timing.duration,
          ease: timing.ease,
        },
      },
    };

    // Slide from left
    const slideLeft: Variants = {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: timing.durationSlow,
          ease: timing.ease,
        },
      },
    };

    // Slide from right
    const slideRight: Variants = {
      hidden: { opacity: 0, x: 30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: timing.durationSlow,
          ease: timing.ease,
        },
      },
    };

    // Stagger container
    const staggerContainer: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: timing.stagger,
          delayChildren: 0.1,
        },
      },
    };

    // Card hover animation
    const cardHover = {
      rest: { scale: 1 },
      hover: {
        scale: mood === "code" ? 1.03 : 1.015,
        transition: {
          duration: timing.duration,
          ease: "easeOut" as const,
        },
      },
    };

    // Transition settings for CSS
    const transition = {
      duration: timing.duration,
      durationSlow: timing.durationSlow,
      ease: timing.ease,
      stagger: timing.stagger,
      // CSS-compatible values
      css: {
        duration: `${timing.duration * 1000}ms`,
        durationSlow: `${timing.durationSlow * 1000}ms`,
      },
    };

    return {
      fadeUp,
      fadeIn,
      scaleUp,
      slideLeft,
      slideRight,
      staggerContainer,
      cardHover,
      transition,
      timing,
    };
  }, [mood]);
}

// Simple hook for just transition timing
export function useMoodTransition() {
  const { mood } = useMood();

  return useMemo(() => {
    const timing = mood === "code" ? CODE_TIMING : LENS_TIMING;

    return {
      duration: timing.duration,
      durationSlow: timing.durationSlow,
      ease: timing.ease,
      stagger: timing.stagger,
      // For CSS usage
      durationMs: timing.duration * 1000,
      durationSlowMs: timing.durationSlow * 1000,
    };
  }, [mood]);
}
