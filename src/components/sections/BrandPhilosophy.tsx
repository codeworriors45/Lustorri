"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles, Gem, Flame } from "lucide-react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { LuxuryDiamond } from "@/components/common/LuxuryDiamond";

const values = [
  {
    icon: Heart,
    title: "Intimacy",
    description: "Every piece ties back to a shared moment — a touch, a breath, a heartbeat.",
    color: "primary",
  },
  {
    icon: Flame,
    title: "Authenticity",
    description: "We embrace imperfect, passionate love — not idealized romance.",
    color: "rose-gold",
  },
  {
    icon: Gem,
    title: "Quality & Craft",
    description: "Lab diamonds, premium metals, and impeccable finishing.",
    color: "gold",
  },
  {
    icon: Sparkles,
    title: "Emotional Storytelling",
    description: "Jewelry that says what words often cannot.",
    color: "primary",
  },
];

export function BrandPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // GSAP animation for title reveal — useGSAP handles cleanup
  useGSAP(() => {
    if (isInView && titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { opacity: 0, y: 30, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.out(1.7)",
        }
      );
    }
  }, { dependencies: [isInView] });

  // Split text into characters for animation
  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="char inline-block"
        style={{ transformStyle: "preserve-3d" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-44 bg-linear-to-b from-background via-muted/30 to-background overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="brand-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="#C4A968" />
              <path d="M50 20 L55 35 L50 50 L45 35 Z" fill="#C4A968" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brand-pattern)" />
        </svg>
      </div>

      {/* Floating Orbs */}
      <motion.div
        style={{ y }}
        className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-primary/5 blur-[150px] rounded-full"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
        className="absolute bottom-20 right-[10%] w-[500px] h-[500px] bg-gold/5 blur-[180px] rounded-full"
      />

      {/* Floating Diamonds */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{
            top: `${15 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
        >
          <LuxuryDiamond id={`brand-float-${i}`} className={`w-${4 + i} h-${4 + i} opacity-20`} />
        </motion.div>
      ))}

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <LuxuryDiamond id="brand-header" className="w-12 h-12 mx-auto" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-4 text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-gold"
          >
            <span className="w-12 h-[1px] bg-linear-to-r from-transparent to-gold" />
            Our Philosophy
            <span className="w-12 h-[1px] bg-linear-to-l from-transparent to-gold" />
          </motion.span>

          <p
            ref={titleRef}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-light text-foreground tracking-tight perspective-1000"
          >
            <span className="block">{splitText("Where Lust")}</span>
            <span className="block mt-3 font-semibold">
              <span className="bg-linear-to-r from-primary via-rose-gold to-primary bg-clip-text text-transparent">
                {splitText("Meets Love")}
              </span>
            </span>
          </p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 text-lg sm:text-xl font-serif italic text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            &ldquo;To craft meaningful diamond jewelry that captures the raw, intimate,
            and unforgettable moments between couples — transforming emotion into wearable stories.&rdquo;
          </motion.p>
        </div>

        {/* Main Content - Two Column */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-rose-gold/10 to-gold/20 blur-3xl" />

              {/* Decorative Frame */}
              <div className="absolute inset-4 border border-gold/30" />
              <div className="absolute inset-8 border border-gold/20" />

              {/* Central Content */}
              <div className="absolute inset-12 bg-linear-to-br from-[#1a1512] via-[#2a2420] to-[#1a1512] flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-gold/10 rounded-full m-8"
                />
                <motion.div
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-primary/10 rounded-full m-16"
                />

                <div className="text-center p-8 relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <LuxuryDiamond id="brand-center" className="w-16 h-16 mx-auto mb-6" />
                  </motion.div>
                  <p className="font-display text-2xl text-white mb-2">Every piece</p>
                  <p className="font-serif italic text-gold text-lg">holds a memory</p>
                  <div className="mt-6 w-16 h-[1px] bg-linear-to-r from-transparent via-gold to-transparent mx-auto" />
                  <p className="mt-6 font-display text-2xl text-white mb-2">Every card</p>
                  <p className="font-serif italic text-gold text-lg">holds a confession</p>
                </div>
              </div>

              {/* Corner Diamonds */}
              <div className="absolute top-0 left-0 w-4 h-4 rotate-45 bg-gold" />
              <div className="absolute top-0 right-0 w-4 h-4 rotate-45 bg-gold" />
              <div className="absolute bottom-0 left-0 w-4 h-4 rotate-45 bg-gold" />
              <div className="absolute bottom-0 right-0 w-4 h-4 rotate-45 bg-gold" />
            </div>
          </motion.div>

          {/* Right - Values Grid */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base font-sans text-muted-foreground leading-relaxed mb-10"
            >
              We design for couples who feel deeply — and aren&apos;t afraid to show it.
              Lustorri is not just a jewelry brand. It&apos;s a storytelling brand for lovers
              who want their relationship immortalized and etched with metal, light, and story.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="group"
                >
                  <div className="relative p-6 bg-background border border-border hover:border-gold/40 hover:shadow-[0_8px_32px_rgba(196,169,104,0.1)] transition-all duration-500 h-full">
                    {/* Corner accent */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 rotate-45 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className={`w-12 h-12 rounded-full bg-${value.color}/10 border border-${value.color}/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className={`w-5 h-5 text-${value.color}`} />
                    </div>

                    <p className="text-lg font-display font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </p>
                    <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-10 pt-8 border-t border-border"
            >
              <div className="flex items-start gap-4">
                <div className="w-1 h-12 bg-linear-to-b from-primary via-rose-gold to-gold rounded-full" />
                <div>
                  <p className="font-serif italic text-foreground/80 text-base leading-relaxed">
                    &ldquo;Fewer than 10 Universes in our entire lifetime.
                    Every collection is rare, intentional, and built to last.&rdquo;
                  </p>
                  <p className="mt-3 font-sans text-xs uppercase tracking-wider text-gold">
                    — Radical Curation
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
