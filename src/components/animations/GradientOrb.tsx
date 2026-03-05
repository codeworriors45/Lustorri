"use client";

import { motion } from "framer-motion";

interface GradientOrbProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "gold" | "rose" | "champagne" | "mixed";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  blur?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  animationType?: "float" | "pulse" | "rotate";
}

const sizeClasses = {
  sm: "w-32 h-32",
  md: "w-48 h-48",
  lg: "w-64 h-64",
  xl: "w-96 h-96",
};

const colorClasses = {
  gold: "bg-linear-to-r from-gold/20 to-gold-light/20",
  rose: "bg-linear-to-r from-rose-gold/20 to-rose-gold-light/20",
  champagne: "bg-linear-to-r from-champagne/30 to-gold-light/30",
  mixed: "bg-linear-to-r from-gold/20 via-rose-gold/20 to-champagne/20",
};

const positionClasses = {
  "top-left": "-top-20 -left-20",
  "top-right": "-top-20 -right-20",
  "bottom-left": "-bottom-20 -left-20",
  "bottom-right": "-bottom-20 -right-20",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

const blurClasses = {
  sm: "blur-xl",
  md: "blur-2xl",
  lg: "blur-3xl",
  xl: "blur-[80px]",
};

const floatAnimation = {
  y: [0, -30, 0],
  x: [0, 20, 0],
  scale: [1, 1.1, 1],
};

const pulseAnimation = {
  scale: [1, 1.2, 1],
  opacity: [0.3, 0.5, 0.3],
};

const rotateAnimation = {
  rotate: [0, 180, 360],
  scale: [1, 1.05, 1],
};

export function GradientOrb({
  className = "",
  size = "lg",
  color = "gold",
  position = "top-left",
  blur = "lg",
  animate = true,
  animationType = "float",
}: GradientOrbProps) {
  const getAnimation = () => {
    switch (animationType) {
      case "pulse":
        return pulseAnimation;
      case "rotate":
        return rotateAnimation;
      default:
        return floatAnimation;
    }
  };

  const getDuration = () => {
    switch (animationType) {
      case "pulse":
        return 4;
      case "rotate":
        return 20;
      default:
        return 15;
    }
  };

  return (
    <motion.div
      className={`absolute rounded-full ${sizeClasses[size]} ${colorClasses[color]} ${positionClasses[position]} ${blurClasses[blur]} ${className}`}
      animate={animate ? getAnimation() : undefined}
      transition={
        animate
          ? {
            duration: getDuration(),
            repeat: Infinity,
            ease: "easeInOut",
          }
          : undefined
      }
    />
  );
}
