"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  scale: number;
  duration: number;
  yOffset: number;
  delay: number;
}

interface ParticleFieldProps {
  count?: number;
  color?: "gold" | "rose" | "white" | "mixed";
  className?: string;
  intensity?: "subtle" | "normal" | "intense";
}

const colorClasses = {
  gold: "bg-gold/30",
  rose: "bg-rose-gold/30",
  white: "bg-white/20",
  mixed: "bg-primary/30",
};

// Generate particles deterministically based on seed
const generateParticles = (count: number, seed: number = 42): Particle[] => {
  const particles: Particle[] = [];

  // Simple seeded random number generator
  const seededRandom = (index: number): number => {
    const x = Math.sin(seed + index) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    particles.push({
      x: seededRandom(i * 5) * 100,
      y: seededRandom(i * 5 + 1) * 100,
      scale: 0.4 + seededRandom(i * 5 + 2) * 0.6,
      duration: 10 + seededRandom(i * 5 + 3) * 10,
      yOffset: -(80 + seededRandom(i * 5 + 4) * 120),
      delay: seededRandom(i * 5 + 5) * 5,
    });
  }

  return particles;
};

export function ParticleField({
  count = 20,
  color = "gold",
  className = "",
  intensity = "normal",
}: ParticleFieldProps) {
  const [mounted, setMounted] = useState(false);

  // Memoize particles to prevent regeneration
  const particles = useMemo(() => generateParticles(count), [count]);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const getOpacity = () => {
    switch (intensity) {
      case "subtle":
        return { min: 0.1, max: 0.4 };
      case "intense":
        return { min: 0.4, max: 1 };
      default:
        return { min: 0.2, max: 0.7 };
    }
  };

  const opacity = getOpacity();

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${colorClasses[color]}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{
            scale: particle.scale,
            opacity: 0,
          }}
          animate={{
            y: [0, particle.yOffset, 0],
            opacity: [opacity.min, opacity.max, opacity.min],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
