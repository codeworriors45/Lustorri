/**
 * Centralized Framer Motion animation variants
 * Use these throughout the application for consistent animations
 */

import type { Variants, Transition, TargetAndTransition } from "framer-motion";

// ============================================
// Standard Easing Curves
// ============================================

export const EASING = {
  /** Smooth, natural easing */
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  /** Quick snap-back effect */
  snapBack: [0.68, -0.55, 0.265, 1.55] as const,
  /** Gentle ease out */
  easeOut: [0, 0, 0.2, 1] as const,
  /** Standard ease in-out */
  easeInOut: [0.4, 0, 0.2, 1] as const,
} as const;

// ============================================
// Duration Presets
// ============================================

export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  medium: 0.6,
  slow: 0.8,
  verySlow: 1.0,
} as const;

// ============================================
// Entrance Animation Variants
// ============================================

/**
 * Fade in with upward movement - most common entrance animation
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Fade in from below (larger movement)
 */
export const fadeInUpLarge: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

/**
 * Fade in from left
 */
export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

/**
 * Fade in from right
 */
export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

/**
 * Simple fade (no movement)
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Scale in from center
 */
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

/**
 * Scale in with spring effect (for icons, buttons)
 */
export const popIn: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

// ============================================
// Scroll-triggered Animation Props
// ============================================

export interface ScrollAnimationProps {
  initial: TargetAndTransition;
  whileInView: TargetAndTransition;
  viewport: { once: boolean; margin?: string };
  transition: Transition;
}

/**
 * Standard scroll-triggered entrance animation
 * Usage: <motion.div {...scrollFadeInUp} />
 */
export const scrollFadeInUp: ScrollAnimationProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: DURATION.medium, ease: EASING.smooth },
};

/**
 * Larger scroll-triggered entrance
 */
export const scrollFadeInUpLarge: ScrollAnimationProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: DURATION.slow, ease: EASING.smooth },
};

/**
 * Scroll-triggered scale entrance
 */
export const scrollScaleIn: ScrollAnimationProps = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: DURATION.medium, ease: EASING.smooth },
};

// ============================================
// Interactive Animation Props
// ============================================

/**
 * Standard button hover/tap animation
 * Usage: <motion.button {...buttonAnimation} />
 */
export const buttonAnimation = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: DURATION.fast },
} as const;

/**
 * More pronounced button animation
 */
export const buttonAnimationLarge = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: DURATION.fast },
} as const;

/**
 * Icon/heart animation with spring
 */
export const iconSpringAnimation = {
  initial: { scale: 0, rotate: -45 },
  animate: { scale: 1, rotate: 0 },
  transition: {
    type: "spring" as const,
    stiffness: 500,
    damping: 15,
  },
} as const;

/**
 * Card hover lift effect
 */
export const cardHover = {
  whileHover: { y: -4 },
  transition: { duration: DURATION.normal, ease: EASING.smooth },
} as const;

// ============================================
// Stagger Children Variants
// ============================================

/**
 * Parent container for staggered children
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Faster stagger for many items
 */
export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

/**
 * Child item for stagger animation
 */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// ============================================
// Floating/Ambient Animations
// ============================================

/**
 * Gentle floating animation for decorative elements
 * @param amplitude - Movement distance in pixels
 * @param duration - Animation duration in seconds
 */
export function createFloatAnimation(
  amplitude: number = 15,
  duration: number = 8
) {
  return {
    y: [0, -amplitude, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };
}

/**
 * Floating with rotation
 */
export function createFloatRotateAnimation(
  yAmplitude: number = 15,
  rotateAmplitude: number = 5,
  duration: number = 8
) {
  return {
    y: [0, -yAmplitude, 0],
    rotate: [0, rotateAmplitude, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };
}

// ============================================
// Page Transition Variants
// ============================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.medium,
      ease: EASING.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: DURATION.normal,
    },
  },
};

// ============================================
// Utility Functions
// ============================================

/**
 * Creates a delayed animation transition
 * @param delay - Delay in seconds
 * @param duration - Duration in seconds
 */
export function createDelayedTransition(
  delay: number,
  duration: number = DURATION.medium
): Transition {
  return {
    delay,
    duration,
    ease: EASING.smooth,
  };
}

/**
 * Creates stagger delay based on index
 * @param index - Item index
 * @param baseDelay - Base delay before stagger starts
 * @param staggerDelay - Delay between each item
 */
export function createStaggerDelay(
  index: number,
  baseDelay: number = 0.2,
  staggerDelay: number = 0.08
): number {
  return baseDelay + index * staggerDelay;
}
