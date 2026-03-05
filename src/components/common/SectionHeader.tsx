"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/animations";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  description,
  align = "center",
  theme = "light",
  className = "",
}: SectionHeaderProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const textColors = {
    light: {
      badge: "text-primary",
      title: "text-foreground",
      subtitle: "text-primary",
      description: "text-muted-foreground",
    },
    dark: {
      badge: "text-gold",
      title: "text-background",
      subtitle: "text-gold",
      description: "text-background/70",
    },
  };

  const colors = textColors[theme];

  return (
    <div className={`mb-16 ${alignClasses[align]} ${className}`}>
      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            theme === "light"
              ? "bg-primary/10 border border-primary/20"
              : "bg-gold/20 border border-gold/30"
          } mb-6`}
        >
          <span className={`text-sm font-sans font-medium ${colors.badge}`}>
            {badge}
          </span>
        </motion.div>
      )}

      {/* Subtitle (above title) */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-sm font-sans font-medium uppercase tracking-[0.2em] ${colors.subtitle} mb-4`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Title */}
      <AnimatedText
        as="h2"
        animation="fade"
        delay={0.2}
        className={`text-3xl sm:text-4xl lg:text-5xl font-display font-semibold ${colors.title} mb-4 leading-tight`}
      >
        {title}
      </AnimatedText>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`font-sans ${colors.description} text-lg ${
            align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
