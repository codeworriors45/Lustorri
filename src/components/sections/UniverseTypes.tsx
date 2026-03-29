"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Zap, Heart, ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { LuxuryDiamond } from "@/components/common/LuxuryDiamond";

const momentUniverses = [
  { name: "The Pulse", description: "The first electric touch that made your heart race" },
  { name: "The Bite", description: "Fierce desire that leaves its mark" },
  { name: "The Vein", description: "Love that runs through your entire being" },
  { name: "The Drown", description: "Surrendering completely to someone" },
];

const identityUniverses = [
  { name: "The Eclipse", description: "For opposites drawn together by gravity stronger than reason" },
  { name: "The Melted Promise", description: "For lovers who didn't fall in love, they dissolved into each other" },
  { name: "The Midnight Thread", description: "For love born in darkness, raw and magnetic" },
  { name: "The Ember", description: "For flames that never die, just burn quieter" },
];

export function UniverseTypes() {
  const sectionRef = useRef<HTMLElement>(null);
  const momentRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // GSAP hover animations for cards — useGSAP auto-reverts on unmount
  useGSAP(() => {
    if (!isInView) return;

    const cards = document.querySelectorAll(".universe-card");
    cards.forEach((card) => {
      const shine = card.querySelector(".card-shine");

      card.addEventListener("mouseenter", () => {
        gsap.to(shine, {
          x: "100%",
          duration: 0.6,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(shine, {
          x: "-100%",
          duration: 0.6,
          ease: "power2.out",
        });
      });
    });
  }, { scope: sectionRef, dependencies: [isInView] });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-44 bg-linear-to-b from-[#1a1512] via-[#0f0d0b] to-[#1a1512] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 blur-[200px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gold/5 blur-[180px] rounded-full" />

        {/* Vertical divider glow */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[60%] bg-linear-to-b from-transparent via-gold/30 to-transparent" />
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-40 h-40">
        <div className="absolute top-8 left-8 w-24 h-[1px] bg-linear-to-r from-primary/60 to-transparent" />
        <div className="absolute top-8 left-8 w-[1px] h-24 bg-linear-to-b from-primary/60 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-40 h-40">
        <div className="absolute top-8 right-8 w-24 h-[1px] bg-linear-to-l from-gold/60 to-transparent" />
        <div className="absolute top-8 right-8 w-[1px] h-24 bg-linear-to-b from-gold/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-40 h-40">
        <div className="absolute bottom-8 left-8 w-24 h-[1px] bg-linear-to-r from-primary/60 to-transparent" />
        <div className="absolute bottom-8 left-8 w-[1px] h-24 bg-linear-to-t from-primary/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40">
        <div className="absolute bottom-8 right-8 w-24 h-[1px] bg-linear-to-l from-gold/60 to-transparent" />
        <div className="absolute bottom-8 right-8 w-[1px] h-24 bg-linear-to-t from-gold/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <LuxuryDiamond className="w-10 h-10 mx-auto" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-4 text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-gold"
          >
            <span className="w-10 h-[1px] bg-linear-to-r from-transparent to-gold" />
            Two Ways to Love
            <span className="w-10 h-[1px] bg-linear-to-l from-transparent to-gold" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-light text-white tracking-tight"
          >
            Discover Your
            <span className="block mt-3 font-semibold bg-linear-to-r from-primary via-gold to-primary bg-clip-text text-transparent">
              Universe Type
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-base font-sans text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            Lustorri Universes fall into two categories — each serving a different emotional need.
            One captures what you felt. The other names who you are.
          </motion.p>
        </motion.div>

        {/* Two Types Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Moment Universes */}
          <motion.div
            ref={momentRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative p-8 lg:p-10 border border-primary/30 bg-primary/5 backdrop-blur-sm">
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-4 h-4 rotate-45 bg-primary" />
              <div className="absolute -top-2 -right-2 w-4 h-4 rotate-45 bg-primary/60" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 rotate-45 bg-primary/60" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 rotate-45 bg-primary" />

              {/* Type Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-primary/70">Type 1</span>
                  <p className="text-2xl font-display font-semibold text-white">Moment Universes</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm font-sans text-white/60 leading-relaxed mb-8">
                Capturing Sensations — These immortalize physical and emotional sensations,
                the intimate, fleeting moments between lovers that words can&apos;t capture.
              </p>

              {/* Question */}
              <div className="mb-8 p-4 bg-primary/10 border border-primary/20">
                <p className="font-serif italic text-primary text-center">
                  &ldquo;What did you feel in that moment?&rdquo;
                </p>
              </div>

              {/* Universe List */}
              <div className="space-y-3">
                {momentUniverses.map((universe, index) => (
                  <motion.div
                    key={universe.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="universe-card group relative p-4 bg-white/[0.02] border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    {/* Shine effect */}
                    <div className="card-shine absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-12" />

                    <div className="relative z-10 flex items-start gap-3">
                      <div className="w-2 h-2 rotate-45 bg-primary mt-2 shrink-0" />
                      <div>
                        <p className="font-display font-medium text-white group-hover:text-primary transition-colors">
                          {universe.name}
                        </p>
                        <p className="text-xs font-sans text-white/40 mt-1">
                          {universe.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Identity Universes */}
          <motion.div
            ref={identityRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="relative p-8 lg:p-10 border border-gold/30 bg-gold/5 backdrop-blur-sm">
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-4 h-4 rotate-45 bg-gold" />
              <div className="absolute -top-2 -right-2 w-4 h-4 rotate-45 bg-gold/60" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 rotate-45 bg-gold/60" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 rotate-45 bg-gold" />

              {/* Type Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-gold/70">Type 2</span>
                  <p className="text-2xl font-display font-semibold text-white">Identity Universes</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm font-sans text-white/60 leading-relaxed mb-8">
                Naming the Relationship — These don&apos;t capture a single moment,
                they name and define the relationship itself, giving it a symbol and story.
              </p>

              {/* Question */}
              <div className="mb-8 p-4 bg-gold/10 border border-gold/20">
                <p className="font-serif italic text-gold text-center">
                  &ldquo;What kind of love is this?&rdquo;
                </p>
              </div>

              {/* Universe List */}
              <div className="space-y-3">
                {identityUniverses.map((universe, index) => (
                  <motion.div
                    key={universe.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    className="universe-card group relative p-4 bg-white/[0.02] border border-white/10 hover:border-gold/40 hover:bg-gold/5 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    {/* Shine effect */}
                    <div className="card-shine absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-12" />

                    <div className="relative z-10 flex items-start gap-3">
                      <div className="w-2 h-2 rotate-45 bg-gold mt-2 shrink-0" />
                      <div>
                        <p className="font-display font-medium text-white group-hover:text-gold transition-colors">
                          {universe.name}
                        </p>
                        <p className="text-xs font-sans text-white/40 mt-1">
                          {universe.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-20 text-center"
        >
          {/* Why Two Types */}
          <div className="max-w-2xl mx-auto mb-12 p-8 bg-white/[0.02] border border-white/10">
            <LuxuryDiamond className="w-8 h-8 mx-auto mb-4" />
            <p className="font-display text-xl text-white mb-4">Why Two Types?</p>
            <p className="font-sans text-sm text-white/50 leading-relaxed">
              Together, these give couples a complete emotional language:
              <span className="text-primary"> Moment Universes</span> let them wear their most intimate sensations —
              while <span className="text-gold">Identity Universes</span> let them declare who they are as lovers.
            </p>
            <div className="mt-6 flex items-center justify-center gap-8 text-sm font-serif italic">
              <span className="text-primary">&ldquo;This is what you made me feel&rdquo;</span>
              <span className="text-white/30">×</span>
              <span className="text-gold">&ldquo;This is who we are&rdquo;</span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/universes"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-primary via-rose-gold to-gold text-white font-sans font-semibold shadow-xl hover:shadow-[0_0_40px_rgba(196,169,104,0.3)] transition-all duration-500"
          >
            <span className="uppercase tracking-wider text-sm">Explore All Universes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
