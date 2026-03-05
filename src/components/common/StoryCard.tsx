"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export interface StoryCardProps {
  id: string;
  title: string;
  quote: string;
  couple: string;
  image: string;
  href: string;
  universe?: string;
}

export function StoryCard({
  title,
  quote,
  couple,
  image,
  href,
  universe,
}: StoryCardProps) {
  return (
    <Link href={href} className="group block">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

          {/* Universe Badge */}
          {universe && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-foreground text-xs font-sans font-medium">
              {universe}
            </span>
          )}

          {/* Heart Icon */}
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-5 h-5 text-primary" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quote */}
          <blockquote className="font-serif italic text-foreground/80 text-base leading-relaxed mb-4 line-clamp-2">
            &ldquo;{quote}&rdquo;
          </blockquote>

          {/* Title */}
          <p className="font-display font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </p>

          {/* Couple Name */}
          <p className="font-sans text-muted-foreground text-sm">
            {couple}
          </p>

          {/* Animated underline */}
          <motion.div
            className="mt-4 h-0.5 bg-linear-to-r from-primary to-rose-gold origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </div>
      </motion.article>
    </Link>
  );
}
