"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface UniverseCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  type: "moment" | "identity";
  badge?: string;
}

export function UniverseCard({
  title,
  subtitle,
  description,
  image,
  href,
  type,
  badge,
}: UniverseCardProps) {
  return (
    <Link href={href} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        {/* Image Container */}
        <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

          {/* Badge */}
          {badge && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-6 left-6 px-4 py-2 rounded-full bg-primary/90 text-primary-foreground text-xs font-sans font-medium uppercase tracking-wider"
            >
              {badge}
            </motion.span>
          )}

          {/* Type Indicator */}
          <div className="absolute top-6 right-6">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium uppercase tracking-wider ${
                type === "moment"
                  ? "bg-rose-gold/90 text-foreground"
                  : "bg-gold/90 text-foreground"
              }`}
            >
              {type === "moment" ? "Moment" : "Identity"}
            </span>
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            {/* Subtitle */}
            <p className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-gold mb-2">
              {subtitle}
            </p>

            {/* Title */}
            <p className="text-2xl lg:text-3xl font-display font-semibold text-white mb-3 group-hover:text-gold transition-colors duration-300">
              {title}
            </p>

            {/* Description */}
            <p className="font-sans text-white/80 text-sm leading-relaxed mb-4 max-w-md">
              {description}
            </p>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-2 text-gold font-sans font-medium text-sm"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span>Explore Universe</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
