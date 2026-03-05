"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale" | "parallax";
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  useGSAP?: boolean;
  parallaxSpeed?: number;
}

const variants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  parallax: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  },
};

export function ScrollReveal({
  children,
  className = "",
  animation = "slide-up",
  delay = 0,
  duration = 0.8,
  once = true,
  threshold = 0.1,
  useGSAP = false,
  parallaxSpeed = 0.3,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px" as const
  });

  // GSAP parallax effect
  useEffect(() => {
    if (useGSAP && animation === "parallax" && ref.current) {
      const element = ref.current;

      gsap.fromTo(
        element,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Add parallax on scroll
      gsap.to(element, {
        yPercent: parallaxSpeed * -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === element) {
            trigger.kill();
          }
        });
      };
    }
  }, [useGSAP, animation, parallaxSpeed]);

  // Use Framer Motion for non-GSAP animations
  if (!useGSAP) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={variants[animation]}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
