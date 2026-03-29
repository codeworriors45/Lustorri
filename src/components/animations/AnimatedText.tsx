"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { gsap, useGSAP } from "@/lib/animations/gsap";

interface AnimatedTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  animation?: "fade" | "slide" | "reveal" | "typewriter" | "split";
  delay?: number;
  duration?: number;
  once?: boolean;
  splitBy?: "words" | "chars";
}

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const slideVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: (delay: number) => ({
    opacity: 1,
    y: "0%",
    transition: { duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function AnimatedText({
  children,
  className = "",
  as: Component = "p",
  animation = "fade",
  delay = 0,
  duration = 0.8,
  once = true,
  splitBy = "words",
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: delay > 0 ? "500px" : "-100px" });
  const charsRef = useRef<HTMLSpanElement[]>([]);

  // For split animation using GSAP — useGSAP handles cleanup automatically
  useGSAP(() => {
    if (animation === "split" && isInView && charsRef.current.length > 0) {
      gsap.fromTo(
        charsRef.current,
        { opacity: 0, y: 40, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: duration,
          stagger: 0.02,
          delay: delay,
          ease: "power3.out",
        }
      );
    }
  }, { dependencies: [animation, isInView, delay, duration] });

  // Split animation renders differently
  if (animation === "split") {
    const items = splitBy === "words" ? children.split(" ") : children.split("");

    return (
      <Component className={className}>
        <span ref={ref}>
          {items.map((item, index) => (
            <span
              key={index}
              ref={(el) => {
                if (el) charsRef.current[index] = el;
              }}
              className="inline-block"
              style={{ opacity: 0 }}
            >
              {item}
              {splitBy === "words" && index < items.length - 1 && "\u00A0"}
            </span>
          ))}
        </span>
      </Component>
    );
  }

  // Get variant based on animation type
  const getVariant = () => {
    switch (animation) {
      case "slide":
        return slideVariants;
      case "reveal":
        return revealVariants;
      default:
        return fadeVariants;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={getVariant()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={delay}
    >
      <Component className="inline">
        {animation === "reveal" ? (
          <span className="block overflow-hidden">
            <motion.span className="block">{children}</motion.span>
          </span>
        ) : (
          children
        )}
      </Component>
    </motion.div>
  );
}
