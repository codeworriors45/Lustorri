"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-linear-to-br from-background via-muted/20 to-background"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose-gold/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Particles - Fixed positions to avoid hydration mismatch */}
        {[
          { left: 10, top: 15, duration: 3.2, delay: 0.1 },
          { left: 25, top: 80, duration: 4.1, delay: 0.5 },
          { left: 40, top: 30, duration: 3.5, delay: 0.8 },
          { left: 55, top: 65, duration: 4.3, delay: 1.2 },
          { left: 70, top: 20, duration: 3.8, delay: 0.3 },
          { left: 85, top: 75, duration: 4.0, delay: 0.9 },
          { left: 15, top: 50, duration: 3.3, delay: 1.5 },
          { left: 35, top: 85, duration: 4.2, delay: 0.2 },
          { left: 60, top: 10, duration: 3.6, delay: 1.0 },
          { left: 80, top: 45, duration: 4.4, delay: 0.6 },
          { left: 5, top: 35, duration: 3.4, delay: 1.3 },
          { left: 45, top: 55, duration: 3.9, delay: 0.4 },
          { left: 65, top: 90, duration: 4.1, delay: 1.1 },
          { left: 90, top: 25, duration: 3.7, delay: 0.7 },
          { left: 20, top: 70, duration: 4.0, delay: 1.4 },
          { left: 50, top: 5, duration: 3.5, delay: 0.0 },
          { left: 75, top: 60, duration: 4.3, delay: 1.6 },
          { left: 30, top: 40, duration: 3.8, delay: 0.8 },
          { left: 95, top: 50, duration: 4.2, delay: 1.2 },
          { left: 12, top: 95, duration: 3.6, delay: 0.5 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/40"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-20"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[70vh]">
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Brand Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Heart className="w-4 h-4 text-primary fill-primary/30" />
              <span className="text-sm font-sans font-medium text-primary tracking-wide">
                For Couples Who Feel Deeply
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold text-foreground leading-[1.05] mb-6"
            >
              Where{" "}
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-primary via-rose-gold to-primary bg-clip-text text-transparent">
                  Lust
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-linear-to-r from-primary to-rose-gold rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>{" "}
              Meets{" "}
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-gold via-rose-gold to-gold bg-clip-text text-transparent">
                  Love
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-linear-to-r from-gold to-rose-gold rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </span>
            </motion.h1>

            {/* Poetic Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl sm:text-2xl font-serif italic text-foreground/80 mb-4 leading-relaxed"
            >
              Jewelry that says what words cannot
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg font-sans text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Every piece holds a memory. Every card holds a confession.
              Transforming your intimate moments into wearable stories.
            </motion.p>

            {/* USP - Metal Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gold/10 border border-gold/20 mb-10"
            >
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-sm font-sans text-foreground">
                <span className="font-semibold">Free metal engraved story card</span> with every piece
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium rounded-full shadow-xl shadow-primary/30 group"
                >
                  <Link href="/universes">
                    Discover Your Universe
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-base font-medium rounded-full border-2 hover:bg-primary/5"
                >
                  <Link href="/stories">
                    Read Love Stories
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - 5 columns - Floating Jewelry Showcase */}
          <div className="lg:col-span-5 relative h-[400px] lg:h-[500px]">
            {/* Central Ring Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-linear-to-br from-primary/20 via-rose-gold/20 to-gold/20 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-2xl">
                  <Image
                    src="/images/hero/hero-ring.jpg"
                    alt="Lustorri Ring"
                    width={200}
                    height={200}
                    className="rounded-full object-cover shadow-lg"
                  />
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl -z-10" />
              </motion.div>
            </motion.div>

            {/* Floating Universe Tags */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute top-10 left-0 z-30"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="px-4 py-2 rounded-full bg-rose-gold/90 text-foreground text-sm font-sans font-medium shadow-lg"
              >
                The Pulse
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute top-20 right-0 z-30"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="px-4 py-2 rounded-full bg-gold/90 text-foreground text-sm font-sans font-medium shadow-lg"
              >
                The Eclipse
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute bottom-20 left-5 z-30"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="px-4 py-2 rounded-full bg-background/90 border border-border text-foreground text-sm font-sans font-medium shadow-lg"
              >
                The Ember
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="absolute bottom-10 right-10 z-30"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                className="px-4 py-2 rounded-full bg-primary/90 text-primary-foreground text-sm font-sans font-medium shadow-lg"
              >
                The Bite
              </motion.div>
            </motion.div>

            {/* Decorative Ring */}
            <motion.div
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 0.5, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-primary/20 -z-10"
            />
            <motion.div
              initial={{ opacity: 0, rotate: 20 }}
              animate={{ opacity: 0.3, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.7 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[450px] sm:h-[450px] rounded-full border border-gold/10 -z-10"
            />
          </div>
        </div>

      </motion.div>

      {/* Bottom Stats - Outside fade container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="pt-8 border-t border-border/50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "10", label: "Curated Universes" },
              { value: "Free", label: "Engraved Story Card" },
              { value: "100%", label: "Handcrafted" },
              { value: "Lab", label: "Grown Diamonds" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl font-display font-semibold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-sans text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
