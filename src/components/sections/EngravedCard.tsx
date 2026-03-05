"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Heart, PenTool, Gift } from "lucide-react";
import { LuxuryDiamond } from "@/components/common/LuxuryDiamond";

const features = [
  {
    icon: PenTool,
    title: "Personally Engraved",
    description: "Your words, your story — etched forever in metal",
  },
  {
    icon: Heart,
    title: "Your Love Story",
    description: "A confession only you two understand",
  },
  {
    icon: Gift,
    title: "Complimentary",
    description: "Free with every Lustorri piece",
  },
];

export function EngravedCard() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-44 bg-linear-to-b from-[#1a1512] via-[#141110] to-[#1a1512] overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[200px] rounded-full" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-6 left-6 w-16 h-[1px] bg-linear-to-r from-gold/60 to-transparent" />
        <div className="absolute top-6 left-6 w-[1px] h-16 bg-linear-to-b from-gold/60 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-6 right-6 w-16 h-[1px] bg-linear-to-l from-gold/60 to-transparent" />
        <div className="absolute top-6 right-6 w-[1px] h-16 bg-linear-to-b from-gold/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute bottom-6 left-6 w-16 h-[1px] bg-linear-to-r from-gold/60 to-transparent" />
        <div className="absolute bottom-6 left-6 w-[1px] h-16 bg-linear-to-t from-gold/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-6 right-6 w-16 h-[1px] bg-linear-to-l from-gold/60 to-transparent" />
        <div className="absolute bottom-6 right-6 w-[1px] h-16 bg-linear-to-t from-gold/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Card Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Metal Card Mockup */}
            <div className="relative mx-auto max-w-md">
              {/* Card shadow/glow */}
              <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-3xl transform rotate-3" />

              {/* Main Card */}
              <motion.div
                animate={{ rotateY: [0, 5, 0], rotateX: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="relative bg-linear-to-br from-[#2a2520] via-[#3a3530] to-[#2a2520] rounded-2xl p-8 border border-gold/30 shadow-2xl">
                  {/* Card shine effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent rounded-2xl" />

                  {/* Lustorri branding */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-sans uppercase tracking-[0.3em] text-gold/70">Lustorri</span>
                    <LuxuryDiamond className="w-5 h-5" />
                  </div>

                  {/* Engraved text area */}
                  <div className="space-y-4 mb-8">
                    <p className="font-serif italic text-white/90 text-lg leading-relaxed">
                      &ldquo;The night we danced in the rain,
                      <br />
                      you held me like I was the only warmth left in the world.&rdquo;
                    </p>
                  </div>

                  {/* Bottom details */}
                  <div className="flex items-center justify-between pt-4 border-t border-gold/20">
                    <div>
                      <p className="text-[10px] font-sans uppercase tracking-wider text-gold/50">Universe</p>
                      <p className="text-sm font-display text-gold">The Drown</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-sans uppercase tracking-wider text-gold/50">Date</p>
                      <p className="text-sm font-sans text-white/70">Forever</p>
                    </div>
                  </div>

                  {/* Corner diamond accents */}
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rotate-45 bg-gold/80" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rotate-45 bg-gold/80" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rotate-45 bg-gold/80" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rotate-45 bg-gold/80" />
                </div>
              </motion.div>

              {/* Floating sparkles */}
              <motion.div
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-6 h-6 text-gold" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-2 -left-6"
              >
                <Sparkles className="w-5 h-5 text-gold/70" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Header */}
            <div className="mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <LuxuryDiamond className="w-6 h-6" />
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] text-gold">
                  The Story Card
                </span>
              </motion.div>

              <p className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-white leading-tight mb-6">
                Your Words,
                <span className="block mt-2 font-semibold bg-linear-to-r from-gold via-[#E8D5B7] to-gold bg-clip-text text-transparent">
                  Etched in Metal
                </span>
              </p>

              <p className="text-base font-sans text-white/60 leading-relaxed max-w-md">
                Every Lustorri piece comes with a complimentary metal-engraved story card —
                a permanent keepsake of the moment, the feeling, the confession that inspired your choice.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-lg font-display font-medium text-white mb-1">
                      {feature.title}
                    </p>
                    <p className="text-sm font-sans text-white/50">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative pl-6 border-l-2 border-gold/40"
            >
              <p className="font-serif italic text-white/40 text-sm">
                &ldquo;This is not just jewelry. This is evidence that we happened.&rdquo;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
