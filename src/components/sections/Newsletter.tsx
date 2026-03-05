"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Lock, Bell, Gift } from "lucide-react";
import { LuxuryDiamond } from "@/components/common/LuxuryDiamond";
import { DiamondPattern } from "@/components/decorations/DiamondPattern";
import { CornerAccents } from "@/components/decorations/CornerAccent";
import { scrollFadeInUp, createFloatRotateAnimation } from "@/lib/animations/variants";

export function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-44 bg-linear-to-b from-[#FDFCFA] via-[#FAF8F4] to-[#F7F4EE] overflow-hidden"
    >
      {/* Luxury Diamond Pattern Background */}
      <DiamondPattern id="newsletter" />

      {/* Floating Diamonds */}
      <motion.div
        animate={createFloatRotateAnimation(15, 5, 8)}
        className="absolute top-20 left-[15%]"
      >
        <LuxuryDiamond id="nl-float-1" className="w-6 h-6 opacity-20" />
      </motion.div>
      <motion.div
        animate={createFloatRotateAnimation(12, -5, 9)}
        className="absolute top-32 right-[20%]"
      >
        <LuxuryDiamond id="nl-float-2" className="w-5 h-5 opacity-15" />
      </motion.div>
      <motion.div
        animate={createFloatRotateAnimation(10, 0, 7)}
        className="absolute bottom-32 left-[25%]"
      >
        <LuxuryDiamond id="nl-float-3" className="w-4 h-4 opacity-10" />
      </motion.div>
      <motion.div
        animate={createFloatRotateAnimation(10, 8, 10)}
        className="absolute bottom-20 right-[15%]"
      >
        <LuxuryDiamond id="nl-float-4" className="w-7 h-7 opacity-15" />
      </motion.div>

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gold/8 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-primary/8 blur-[120px] rounded-full" />

      {/* Corner Accents */}
      <CornerAccents corners={["top-left", "top-right"]} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <LuxuryDiamond id="nl-main" className="w-12 h-12 mx-auto" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-4 text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-gold"
          >
            <span className="w-10 h-[1px] bg-linear-to-r from-transparent to-gold" />
            Exclusive Access
            <span className="w-10 h-[1px] bg-linear-to-l from-transparent to-gold" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-light text-foreground tracking-tight"
          >
            Join the
            <span className="block mt-3 font-semibold bg-linear-to-r from-primary via-rose-gold to-primary bg-clip-text text-transparent">
              Inner Circle
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-base font-sans text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            Be the first to discover new universes, exclusive designs, and love stories that inspire.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 font-serif italic text-gold text-lg"
          >
            &ldquo;Because every love story deserves to be heard&rdquo;
          </motion.p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative max-w-xl mx-auto"
        >
          <div className="relative p-10 bg-white/80 backdrop-blur-sm border border-gold/20 shadow-[0_8px_32px_rgba(196,169,104,0.1)]">
            {/* Corner Diamonds */}
            <div className="absolute -top-2 -left-2 w-4 h-4 rotate-45 bg-linear-to-br from-gold to-gold/60" />
            <div className="absolute -top-2 -right-2 w-4 h-4 rotate-45 bg-linear-to-bl from-gold to-gold/60" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 rotate-45 bg-linear-to-tr from-gold to-gold/60" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 rotate-45 bg-linear-to-tl from-gold to-gold/60" />

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-[#FAF8F4] border border-gold/30 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-primary via-[#B83A4B] to-primary text-white font-sans font-medium shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-500"
              >
                <span className="uppercase tracking-wider text-sm">Subscribe Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-gold/20 flex flex-wrap justify-center gap-6 text-xs font-sans text-muted-foreground">
              <span className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-gold" />
                100% Secure
              </span>
              <span className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-gold" />
                No Spam Ever
              </span>
              <span className="flex items-center gap-2">
                <Gift className="w-3.5 h-3.5 text-gold" />
                Exclusive Offers
              </span>
            </div>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 rotate-45 bg-gold/60" />
            <p className="font-sans text-muted-foreground text-sm">
              Join <span className="text-gold font-semibold">2,500+</span> couples who receive our love notes
            </p>
            <div className="w-2 h-2 rotate-45 bg-gold/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
