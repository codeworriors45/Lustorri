"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LuxuryDiamond } from "@/components/common/LuxuryDiamond";

// Universe data from brand document
const momentUniverses = [
  {
    name: "The Pulse",
    tagline: "The first electric touch that made your heart race",
    href: "/universe/the-pulse",
  },
  {
    name: "The Bite",
    tagline: "Fierce desire that leaves its mark",
    href: "/universe/the-bite",
  },
  {
    name: "The Vein",
    tagline: "Love that runs through your entire being",
    href: "/universe/the-vein",
  },
  {
    name: "The Drown",
    tagline: "Surrendering completely to someone",
    href: "/universe/the-drown",
  },
];

const identityUniverses = [
  {
    name: "The Eclipse",
    tagline: "For opposites drawn together by gravity stronger than reason",
    href: "/universe/the-eclipse",
  },
  {
    name: "The Melted Promise",
    tagline: "For lovers who dissolved into each other",
    href: "/universe/the-melted-promise",
  },
  {
    name: "The Midnight Thread",
    tagline: "For love born in darkness, raw and magnetic",
    href: "/universe/the-midnight-thread",
  },
  {
    name: "The Sin Curve",
    tagline: "For those who chose feeling over fear",
    href: "/universe/the-sin-curve",
  },
  {
    name: "The Scar Line",
    tagline: "For love that survived imperfection and became eternal",
    href: "/universe/the-scar-line",
  },
  {
    name: "The Ember",
    tagline: "For flames that never die, just burn quieter",
    href: "/universe/the-ember",
  },
];

// Decorative Diamond Divider
const DiamondDivider = ({ className = "", id = "divider" }: { className?: string; id?: string }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>
    <div className="w-16 h-[1px] bg-linear-to-r from-transparent via-gold/40 to-gold" />
    <LuxuryDiamond id={id} className="w-5 h-5" />
    <div className="w-16 h-[1px] bg-linear-to-l from-transparent via-gold/40 to-gold" />
  </div>
);

export function UniverseShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-44 bg-linear-to-b from-[#FDFCFA] via-[#FAF8F4] to-[#F7F4EE] overflow-hidden"
    >
      {/* Luxury Diamond Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="luxury-diamond" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0 L45 20 L40 40 L35 20 Z" fill="#C4A968"/>
              <path d="M0 40 L20 35 L40 40 L20 45 Z" fill="#C4A968"/>
              <path d="M40 40 L45 60 L40 80 L35 60 Z" fill="#C4A968"/>
              <path d="M40 40 L60 35 L80 40 L60 45 Z" fill="#C4A968"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#luxury-diamond)" />
        </svg>
      </div>

      {/* Floating Luxury Diamonds */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[10%]"
      >
        <LuxuryDiamond className="w-8 h-8 opacity-20" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-48 right-[15%]"
      >
        <LuxuryDiamond className="w-6 h-6 opacity-15" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-40 left-[20%]"
      >
        <LuxuryDiamond className="w-5 h-5 opacity-10" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-32 right-[8%]"
      >
        <LuxuryDiamond className="w-7 h-7 opacity-15" />
      </motion.div>

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/8 blur-[180px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/8 blur-[150px] rounded-full" />

      {/* Gold Corner Accents */}
      <div className="absolute top-0 left-0 w-40 h-40">
        <div className="absolute top-8 left-8 w-24 h-[1px] bg-linear-to-r from-gold/50 to-transparent" />
        <div className="absolute top-8 left-8 w-[1px] h-24 bg-linear-to-b from-gold/50 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-40 h-40">
        <div className="absolute top-8 right-8 w-24 h-[1px] bg-linear-to-l from-gold/50 to-transparent" />
        <div className="absolute top-8 right-8 w-[1px] h-24 bg-linear-to-b from-gold/50 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-40 h-40">
        <div className="absolute bottom-8 left-8 w-24 h-[1px] bg-linear-to-r from-gold/50 to-transparent" />
        <div className="absolute bottom-8 left-8 w-[1px] h-24 bg-linear-to-t from-gold/50 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40">
        <div className="absolute bottom-8 right-8 w-24 h-[1px] bg-linear-to-l from-gold/50 to-transparent" />
        <div className="absolute bottom-8 right-8 w-[1px] h-24 bg-linear-to-t from-gold/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          {/* Luxury Diamond Header */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <LuxuryDiamond className="w-10 h-10 mx-auto" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-4 text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-gold"
          >
            <span className="w-10 h-[1px] bg-linear-to-r from-transparent to-gold" />
            The Universe Collection
            <span className="w-10 h-[1px] bg-linear-to-l from-transparent to-gold" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-light text-foreground tracking-tight"
          >
            Find Your
            <span className="block mt-3 font-semibold bg-linear-to-r from-primary via-rose-gold to-primary bg-clip-text text-transparent">
              Universe
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-base font-sans text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            Each Universe is a complete emotional world — a story you can wear.
            Choose the one that speaks to your love.
          </motion.p>

          {/* Diamond Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <DiamondDivider className="mt-12" />
          </motion.div>
        </motion.div>

        {/* Universe Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Moment Universes */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            {/* Luxury Card Container */}
            <div className="relative p-8 bg-white/70 backdrop-blur-sm border border-gold/20 shadow-[0_8px_32px_rgba(196,169,104,0.08)]">
              {/* Corner Diamonds */}
              <div className="absolute -top-2 -left-2 w-4 h-4 rotate-45 bg-linear-to-br from-gold to-gold/60 shadow-sm" />
              <div className="absolute -top-2 -right-2 w-4 h-4 rotate-45 bg-linear-to-bl from-gold to-gold/60 shadow-sm" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 rotate-45 bg-linear-to-tr from-gold to-gold/60 shadow-sm" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 rotate-45 bg-linear-to-tl from-gold to-gold/60 shadow-sm" />

              <div className="mb-8 flex items-center gap-4">
                <LuxuryDiamond className="w-6 h-6" />
                <div>
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-primary">
                    What did you feel?
                  </span>
                  <p className="mt-1 text-2xl font-display font-light text-foreground">
                    Moment Universes
                  </p>
                </div>
              </div>

              <div className="space-y-0">
                {momentUniverses.map((universe, index) => (
                  <motion.div
                    key={universe.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
                    <Link href={universe.href} className="group block">
                      <div className="py-5 border-b border-gold/15 hover:border-primary/40 transition-all duration-500 hover:bg-gold/5 -mx-4 px-4">
                        <div className="flex items-center gap-4">
                          {/* Diamond Bullet */}
                          <div className="w-2 h-2 rotate-45 bg-linear-to-br from-gold to-gold/60 group-hover:from-primary group-hover:to-primary/60 transition-all duration-300 shrink-0 shadow-sm" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-lg font-display font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                {universe.name}
                              </p>
                              <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                            </div>
                            <p className="mt-1 text-sm font-serif italic text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                              {universe.tagline}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-8 text-center font-serif italic text-muted-foreground text-sm"
              >
                &ldquo;This is what you made me feel&rdquo;
              </motion.p>
            </div>
          </motion.div>

          {/* Identity Universes */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative"
          >
            {/* Luxury Card Container */}
            <div className="relative p-8 bg-white/70 backdrop-blur-sm border border-gold/20 shadow-[0_8px_32px_rgba(196,169,104,0.08)]">
              {/* Corner Diamonds */}
              <div className="absolute -top-2 -left-2 w-4 h-4 rotate-45 bg-linear-to-br from-gold to-gold/60 shadow-sm" />
              <div className="absolute -top-2 -right-2 w-4 h-4 rotate-45 bg-linear-to-bl from-gold to-gold/60 shadow-sm" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 rotate-45 bg-linear-to-tr from-gold to-gold/60 shadow-sm" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 rotate-45 bg-linear-to-tl from-gold to-gold/60 shadow-sm" />

              <div className="mb-8 flex items-center gap-4">
                <LuxuryDiamond className="w-6 h-6" />
                <div>
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-gold">
                    What kind of love is this?
                  </span>
                  <p className="mt-1 text-2xl font-display font-light text-foreground">
                    Identity Universes
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {identityUniverses.map((universe, index) => (
                  <motion.div
                    key={universe.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.08 }}
                  >
                    <Link href={universe.href} className="group block h-full">
                      {/* Luxury card */}
                      <div className="relative p-4 bg-linear-to-br from-[#FDFCFA] to-[#F8F6F1] border border-gold/15 hover:border-gold/40 hover:shadow-[0_4px_20px_rgba(196,169,104,0.15)] transition-all duration-500 h-full">
                        {/* Top gold line accent */}
                        <div className="absolute top-0 left-4 right-4 h-[2px] bg-linear-to-r from-transparent via-gold/40 to-transparent group-hover:via-gold transition-all duration-500" />

                        <div className="flex items-start gap-3 pt-2">
                          <div className="w-1.5 h-1.5 rotate-45 bg-linear-to-br from-gold to-gold/60 shrink-0 mt-1.5 group-hover:scale-125 transition-transform duration-300" />
                          <div>
                            <p className="text-sm font-display font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                              {universe.name}
                            </p>
                            <p className="mt-2 text-xs font-sans text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300 line-clamp-2 leading-relaxed">
                              {universe.tagline}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="mt-8 text-center font-serif italic text-muted-foreground text-sm"
              >
                &ldquo;This is who we are&rdquo;
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Luxury Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24 relative"
        >
          {/* Diamond Divider */}
          <DiamondDivider className="mb-16" />

          {/* Luxury Stats Bar */}
          <div className="relative p-8 bg-linear-to-r from-[#1a1512] via-[#2a2420] to-[#1a1512] shadow-2xl">
            {/* Gold border top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent" />
            {/* Gold border bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* Left - Radical Curation */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <LuxuryDiamond className="w-14 h-14" />
                </div>
                <div>
                  <span className="text-3xl font-display font-semibold text-gold">&lt;10</span>
                  <p className="text-sm font-sans text-white/80">Universes — Ever</p>
                  <p className="text-xs font-sans text-white/50 mt-0.5">
                    Each one rare, intentional, built to last.
                  </p>
                </div>
              </div>

              {/* Center - What's Inside */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-2 h-2 rotate-45 bg-gold/60" />
                  <p className="text-xs font-sans text-white/50 uppercase tracking-[0.2em]">
                    Each Universe Contains
                  </p>
                  <div className="w-2 h-2 rotate-45 bg-gold/60" />
                </div>
                <p className="text-sm font-sans text-white/90 tracking-wide">
                  Rings &middot; Necklaces &middot; Earrings &middot; Bracelets &middot; Specials
                </p>
              </div>

              {/* Right - CTA */}
              <Link
                href="/universes"
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-gold via-[#D4B978] to-gold overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(196,169,104,0.4)]"
              >
                <span className="text-sm font-sans font-semibold text-[#1a1512] uppercase tracking-wider">
                  Explore All
                </span>
                <ArrowRight className="w-4 h-4 text-[#1a1512] group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
