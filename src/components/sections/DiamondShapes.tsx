"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Proper diamond shape SVGs matching real diamond cuts
const diamondShapes = [
  {
    name: "Round",
    href: "/diamonds/round",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="50" cy="50" r="44" />
        <circle cx="50" cy="50" r="32" />
        <circle cx="50" cy="50" r="18" />
        <path d="M50 6 L50 94" />
        <path d="M6 50 L94 50" />
        <path d="M14 14 L86 86" />
        <path d="M86 14 L14 86" />
        <path d="M50 6 L82 26" />
        <path d="M50 6 L18 26" />
        <path d="M50 94 L82 74" />
        <path d="M50 94 L18 74" />
        <path d="M6 50 L26 18" />
        <path d="M6 50 L26 82" />
        <path d="M94 50 L74 18" />
        <path d="M94 50 L74 82" />
      </svg>
    ),
  },
  {
    name: "Princess",
    href: "/diamonds/princess",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <rect x="8" y="8" width="84" height="84" />
        <rect x="22" y="22" width="56" height="56" />
        <path d="M8 8 L50 50" />
        <path d="M92 8 L50 50" />
        <path d="M8 92 L50 50" />
        <path d="M92 92 L50 50" />
        <path d="M8 50 L22 50" />
        <path d="M78 50 L92 50" />
        <path d="M50 8 L50 22" />
        <path d="M50 78 L50 92" />
        <path d="M22 22 L50 35" />
        <path d="M78 22 L50 35" />
        <path d="M22 78 L50 65" />
        <path d="M78 78 L50 65" />
      </svg>
    ),
  },
  {
    name: "Radiant",
    href: "/diamonds/radiant",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M20 8 L80 8 L92 20 L92 80 L80 92 L20 92 L8 80 L8 20 Z" />
        <path d="M30 20 L70 20 L78 30 L78 70 L70 78 L30 78 L22 70 L22 30 Z" />
        <path d="M8 20 L22 30" />
        <path d="M92 20 L78 30" />
        <path d="M8 80 L22 70" />
        <path d="M92 80 L78 70" />
        <path d="M20 8 L30 20" />
        <path d="M80 8 L70 20" />
        <path d="M20 92 L30 78" />
        <path d="M80 92 L70 78" />
        <path d="M50 20 L50 78" />
        <path d="M22 50 L78 50" />
      </svg>
    ),
  },
  {
    name: "Asscher",
    href: "/diamonds/asscher",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <rect x="8" y="8" width="84" height="84" />
        <rect x="20" y="20" width="60" height="60" />
        <rect x="32" y="32" width="36" height="36" />
        <rect x="42" y="42" width="16" height="16" />
        <path d="M8 8 L20 20" />
        <path d="M92 8 L80 20" />
        <path d="M8 92 L20 80" />
        <path d="M92 92 L80 80" />
        <path d="M20 20 L32 32" />
        <path d="M80 20 L68 32" />
        <path d="M20 80 L32 68" />
        <path d="M80 80 L68 68" />
      </svg>
    ),
  },
  {
    name: "Cushion",
    href: "/diamonds/cushion",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <rect x="8" y="8" width="84" height="84" rx="18" ry="18" />
        <rect x="22" y="22" width="56" height="56" rx="10" ry="10" />
        <path d="M50 8 L50 22" />
        <path d="M50 78 L50 92" />
        <path d="M8 50 L22 50" />
        <path d="M78 50 L92 50" />
        <path d="M18 18 L30 30" />
        <path d="M82 18 L70 30" />
        <path d="M18 82 L30 70" />
        <path d="M82 82 L70 70" />
        <path d="M22 50 L78 50" />
        <path d="M50 22 L50 78" />
      </svg>
    ),
  },
  {
    name: "Oval",
    href: "/diamonds/oval",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <ellipse cx="50" cy="50" rx="28" ry="44" />
        <ellipse cx="50" cy="50" rx="18" ry="30" />
        <path d="M50 6 L50 94" />
        <path d="M22 50 L78 50" />
        <path d="M30 18 L50 35 L70 18" />
        <path d="M30 82 L50 65 L70 82" />
        <path d="M22 35 L50 50" />
        <path d="M78 35 L50 50" />
        <path d="M22 65 L50 50" />
        <path d="M78 65 L50 50" />
      </svg>
    ),
  },
  {
    name: "Emerald",
    href: "/diamonds/emerald",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M22 6 L78 6 L94 22 L94 78 L78 94 L22 94 L6 78 L6 22 Z" />
        <path d="M30 18 L70 18 L82 30 L82 70 L70 82 L30 82 L18 70 L18 30 Z" />
        <path d="M38 30 L62 30 L70 38 L70 62 L62 70 L38 70 L30 62 L30 38 Z" />
        <path d="M6 22 L18 30" />
        <path d="M94 22 L82 30" />
        <path d="M6 78 L18 70" />
        <path d="M94 78 L82 70" />
        <path d="M22 6 L30 18" />
        <path d="M78 6 L70 18" />
        <path d="M22 94 L30 82" />
        <path d="M78 94 L70 82" />
        <path d="M6 50 L94 50" />
      </svg>
    ),
  },
  {
    name: "Pear",
    href: "/diamonds/pear",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M50 6 Q85 40 70 70 Q60 94 50 94 Q40 94 30 70 Q15 40 50 6" />
        <path d="M50 18 Q70 42 60 62 Q54 78 50 78 Q46 78 40 62 Q30 42 50 18" />
        <path d="M50 6 L50 94" />
        <path d="M25 55 L75 55" />
        <path d="M50 6 L30 35" />
        <path d="M50 6 L70 35" />
        <path d="M30 35 L50 50" />
        <path d="M70 35 L50 50" />
        <path d="M30 70 L50 55" />
        <path d="M70 70 L50 55" />
      </svg>
    ),
  },
  {
    name: "Marquise",
    href: "/diamonds/marquise",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M50 4 Q82 30 82 50 Q82 70 50 96 Q18 70 18 50 Q18 30 50 4" />
        <path d="M50 16 Q68 34 68 50 Q68 66 50 84 Q32 66 32 50 Q32 34 50 16" />
        <path d="M50 4 L50 96" />
        <path d="M18 50 L82 50" />
        <path d="M50 4 L32 30" />
        <path d="M50 4 L68 30" />
        <path d="M50 96 L32 70" />
        <path d="M50 96 L68 70" />
        <path d="M18 50 L32 35" />
        <path d="M18 50 L32 65" />
        <path d="M82 50 L68 35" />
        <path d="M82 50 L68 65" />
      </svg>
    ),
  },
  {
    name: "Heart",
    href: "/diamonds/heart",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M50 88 L12 50 Q4 35 12 22 Q22 10 36 12 Q46 14 50 26 Q54 14 64 12 Q78 10 88 22 Q96 35 88 50 Z" />
        <path d="M50 72 L24 48 Q18 38 24 30 Q30 22 40 24 Q46 26 50 34 Q54 26 60 24 Q70 22 76 30 Q82 38 76 48 Z" />
        <path d="M50 26 L50 88" />
        <path d="M50 26 L36 12" />
        <path d="M50 26 L64 12" />
        <path d="M12 50 L50 55" />
        <path d="M88 50 L50 55" />
      </svg>
    ),
  },
  // Row 2
  {
    name: "Rose Cut",
    href: "/diamonds/rose-cut",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="50" cy="50" r="44" />
        <polygon points="50,10 80,35 80,65 50,90 20,65 20,35" />
        <path d="M50 10 L50 90" />
        <path d="M20 35 L80 65" />
        <path d="M80 35 L20 65" />
        <path d="M50 50 L20 35" />
        <path d="M50 50 L80 35" />
        <path d="M50 50 L20 65" />
        <path d="M50 50 L80 65" />
        <path d="M50 50 L50 10" />
        <path d="M50 50 L50 90" />
      </svg>
    ),
  },
  {
    name: "Old European",
    href: "/diamonds/old-european",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="50" cy="50" r="44" />
        <circle cx="50" cy="50" r="30" />
        <circle cx="50" cy="50" r="15" />
        <path d="M50 6 L50 20" />
        <path d="M50 80 L50 94" />
        <path d="M6 50 L20 50" />
        <path d="M80 50 L94 50" />
        <path d="M15 15 L28 28" />
        <path d="M72 28 L85 15" />
        <path d="M15 85 L28 72" />
        <path d="M72 72 L85 85" />
        <path d="M20 50 L35 50" />
        <path d="M65 50 L80 50" />
        <path d="M50 20 L50 35" />
        <path d="M50 65 L50 80" />
      </svg>
    ),
  },
  {
    name: "Half Moon",
    href: "/diamonds/half-moon",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M20 8 L20 92 Q75 92 75 50 Q75 8 20 8" />
        <path d="M20 22 L20 78 Q58 78 58 50 Q58 22 20 22" />
        <path d="M20 8 L20 92" />
        <path d="M20 50 L75 50" />
        <path d="M20 30 L60 30" />
        <path d="M20 70 L60 70" />
        <path d="M20 8 L40 22" />
        <path d="M20 92 L40 78" />
        <path d="M60 30 L58 50" />
        <path d="M60 70 L58 50" />
      </svg>
    ),
  },
  {
    name: "Baguette Trapezoid",
    href: "/diamonds/baguette-trapezoid",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M32 10 L68 10 L88 90 L12 90 Z" />
        <path d="M38 24 L62 24 L76 76 L24 76 Z" />
        <path d="M50 10 L50 90" />
        <path d="M32 10 L38 24" />
        <path d="M68 10 L62 24" />
        <path d="M12 90 L24 76" />
        <path d="M88 90 L76 76" />
        <path d="M38 24 L50 50" />
        <path d="M62 24 L50 50" />
        <path d="M24 76 L50 50" />
        <path d="M76 76 L50 50" />
      </svg>
    ),
  },
  {
    name: "Baguette",
    href: "/diamonds/baguette",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <rect x="28" y="8" width="44" height="84" />
        <rect x="36" y="20" width="28" height="60" />
        <path d="M28 8 L36 20" />
        <path d="M72 8 L64 20" />
        <path d="M28 92 L36 80" />
        <path d="M72 92 L64 80" />
        <path d="M50 8 L50 92" />
        <path d="M28 50 L72 50" />
        <path d="M36 20 L36 80" />
        <path d="M64 20 L64 80" />
      </svg>
    ),
  },
  {
    name: "Hexagon",
    href: "/diamonds/hexagon",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <polygon points="50,6 90,28 90,72 50,94 10,72 10,28" />
        <polygon points="50,22 72,36 72,64 50,78 28,64 28,36" />
        <path d="M50 6 L50 94" />
        <path d="M10 28 L90 72" />
        <path d="M90 28 L10 72" />
        <path d="M50 6 L50 22" />
        <path d="M50 78 L50 94" />
        <path d="M10 28 L28 36" />
        <path d="M90 28 L72 36" />
        <path d="M10 72 L28 64" />
        <path d="M90 72 L72 64" />
      </svg>
    ),
  },
  {
    name: "Kite",
    href: "/diamonds/kite",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M50 6 L88 38 L50 94 L12 38 Z" />
        <path d="M50 20 L70 40 L50 74 L30 40 Z" />
        <path d="M50 6 L50 94" />
        <path d="M12 38 L88 38" />
        <path d="M50 6 L30 40" />
        <path d="M50 6 L70 40" />
        <path d="M12 38 L50 55" />
        <path d="M88 38 L50 55" />
        <path d="M50 94 L30 40" />
        <path d="M50 94 L70 40" />
      </svg>
    ),
  },
  {
    name: "Old Mine",
    href: "/diamonds/old-mine",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <rect x="10" y="10" width="80" height="80" rx="12" ry="12" />
        <rect x="24" y="24" width="52" height="52" rx="6" ry="6" />
        <rect x="38" y="38" width="24" height="24" rx="3" ry="3" />
        <path d="M10 10 L24 24" />
        <path d="M90 10 L76 24" />
        <path d="M10 90 L24 76" />
        <path d="M90 90 L76 76" />
        <path d="M24 24 L38 38" />
        <path d="M76 24 L62 38" />
        <path d="M24 76 L38 62" />
        <path d="M76 76 L62 62" />
      </svg>
    ),
  },
  {
    name: "Trapezoid",
    href: "/diamonds/trapezoid",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M22 14 L78 14 L94 86 L6 86 Z" />
        <path d="M32 28 L68 28 L80 72 L20 72 Z" />
        <path d="M50 14 L50 86" />
        <path d="M22 14 L32 28" />
        <path d="M78 14 L68 28" />
        <path d="M6 86 L20 72" />
        <path d="M94 86 L80 72" />
        <path d="M32 28 L50 50" />
        <path d="M68 28 L50 50" />
        <path d="M20 72 L50 50" />
        <path d="M80 72 L50 50" />
      </svg>
    ),
  },
  {
    name: "Triangular",
    href: "/diamonds/triangular",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <polygon points="50,6 94,90 6,90" />
        <polygon points="50,28 76,76 24,76" />
        <path d="M50 6 L50 90" />
        <path d="M6 90 L72 48" />
        <path d="M94 90 L28 48" />
        <path d="M50 6 L24 76" />
        <path d="M50 6 L76 76" />
        <path d="M50 28 L50 76" />
        <path d="M24 76 L76 76" />
        <path d="M6 90 L94 90" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export function DiamondShapes() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-4">
            Lab Diamonds in Customizable Shapes
          </p>
          <p className="font-sans text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our collection of 1,500,000+ IGI/GIA/GCAL certified diamonds
          </p>
        </motion.div>

        {/* Diamond Shapes Grid - Row 1 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-5 md:grid-cols-10 gap-3 md:gap-6"
        >
          {diamondShapes.slice(0, 10).map((shape) => (
            <motion.div key={shape.name} variants={itemVariants}>
              <Link
                href={shape.href}
                className="group flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.15, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 text-foreground/60 group-hover:text-primary transition-colors duration-300"
                >
                  {shape.svg}
                </motion.div>
                <motion.span
                  className="mt-3 text-[10px] sm:text-xs font-sans font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center tracking-wide"
                  whileHover={{ scale: 1.05 }}
                >
                  {shape.name.toUpperCase()}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Diamond Shapes Grid - Row 2 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-5 md:grid-cols-10 gap-3 md:gap-6 mt-10"
        >
          {diamondShapes.slice(10, 20).map((shape) => (
            <motion.div key={shape.name} variants={itemVariants}>
              <Link
                href={shape.href}
                className="group flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.15, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 text-foreground/60 group-hover:text-primary transition-colors duration-300"
                >
                  {shape.svg}
                </motion.div>
                <motion.span
                  className="mt-3 text-[10px] sm:text-xs font-sans font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center tracking-wide leading-tight"
                  whileHover={{ scale: 1.05 }}
                >
                  {shape.name.toUpperCase()}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
