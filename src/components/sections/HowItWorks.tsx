"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Heart, Gem, PenTool, Gift, ArrowRight } from "lucide-react";
import { LuxuryDiamond } from "@/components/common/LuxuryDiamond";
import { DiamondPattern } from "@/components/decorations/DiamondPattern";
import { CornerAccents } from "@/components/decorations/CornerAccent";

const steps = [
  {
    id: 1,
    icon: Heart,
    title: "Choose Your Universe",
    description: "Select the story that defines your love — a moment or an identity.",
  },
  {
    id: 2,
    icon: Gem,
    title: "Pick Your Piece",
    description: "Browse designs crafted for your chosen universe.",
  },
  {
    id: 3,
    icon: PenTool,
    title: "Write Your Story",
    description: "Add the words only you two understand — we'll engrave them forever.",
  },
  {
    id: 4,
    icon: Gift,
    title: "Receive Your Forever",
    description: "Your jewelry arrives with a metal story card — your love, eternalized.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-44 bg-linear-to-b from-[#FDFCFA] via-[#FAF8F4] to-[#F7F4EE] overflow-hidden"
    >
      {/* Luxury Diamond Pattern Background */}
      <DiamondPattern id="how-it-works" />

      {/* Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold/8 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/8 blur-[120px] rounded-full" />

      {/* Corner Accents */}
      <CornerAccents corners={["top-left", "top-right"]} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <LuxuryDiamond id="how-main" className="w-10 h-10 mx-auto" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-4 text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-gold"
          >
            <span className="w-10 h-[1px] bg-linear-to-r from-transparent to-gold" />
            Simple Process
            <span className="w-10 h-[1px] bg-linear-to-l from-transparent to-gold" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-light text-foreground tracking-tight"
          >
            How Lustorri
            <span className="block mt-3 font-semibold bg-linear-to-r from-primary via-rose-gold to-primary bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-base font-sans text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            Four simple steps to create your perfect piece — from universe to forever.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-2 w-4 h-[2px] bg-linear-to-r from-gold/50 to-gold/20 z-20" />
              )}

              {/* Card */}
              <div className="relative p-8 bg-white/80 backdrop-blur-sm border border-gold/20 hover:border-gold/40 hover:shadow-[0_8px_32px_rgba(196,169,104,0.12)] transition-all duration-500 h-full">
                {/* Corner Diamonds */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rotate-45 bg-linear-to-br from-gold to-gold/60" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rotate-45 bg-linear-to-bl from-gold to-gold/60" />

                {/* Step Number */}
                <div className="absolute top-4 right-4 text-5xl font-display font-light text-gold/10 select-none">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-full bg-linear-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-6 h-6 text-gold" />
                  </div>
                </div>

                {/* Content */}
                <p className="text-lg font-display font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </p>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-20"
        >
          <p className="font-serif italic text-muted-foreground text-lg mb-8">
            Ready to tell your story?
          </p>

          <Link
            href="/universes"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-primary via-[#B83A4B] to-primary text-white font-sans font-medium shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-500"
          >
            <span className="uppercase tracking-wider text-sm">Start Your Journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
