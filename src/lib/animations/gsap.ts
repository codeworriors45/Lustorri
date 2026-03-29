"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  // 60fps-guaranteed defaults
  gsap.defaults({
    force3D: true,    // GPU acceleration on all tweens
    lazy: false,      // Render immediately — no deferred first-render
  });

  // Do NOT enable normalizeScroll — Lenis (in SmoothScroll.tsx) handles
  // scroll normalisation. Enabling both causes them to fight over scroll
  // position, resulting in lag and dropped frames.

  // Reduce ScrollTrigger overhead from mobile address bar resize events
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

// Default animation configurations
export const defaultEase = "power3.out";
export const smoothEase = "power2.inOut";
// Smooth weighted easing — per Stitch design system (no bouncy/elastic on mobile)
export const elasticEase =
  typeof window !== "undefined" && window.innerWidth < 768
    ? "power3.out"
    : "elastic.out(1, 0.5)";

// Reusable animation presets
export const fadeInUp = {
  from: { opacity: 0, y: 60 },
  to: { opacity: 1, y: 0, duration: 1, ease: defaultEase },
};

export const fadeInLeft = {
  from: { opacity: 0, x: -60 },
  to: { opacity: 1, x: 0, duration: 1, ease: defaultEase },
};

export const fadeInRight = {
  from: { opacity: 0, x: 60 },
  to: { opacity: 1, x: 0, duration: 1, ease: defaultEase },
};

export const scaleIn = {
  from: { opacity: 0, scale: 0.8 },
  to: { opacity: 1, scale: 1, duration: 0.8, ease: elasticEase },
};

// Stagger animations for lists
export const staggerFadeInUp = (stagger = 0.1) => ({
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0, duration: 0.8, stagger, ease: defaultEase },
});

// Text reveal animation
export const textReveal = {
  from: { opacity: 0, y: "100%" },
  to: { opacity: 1, y: "0%", duration: 1.2, ease: "power4.out" },
};

// Parallax effect helper
export const createParallax = (
  element: string | Element,
  speed: number = 0.5
) => {
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    },
  });
};

// Scroll-triggered animation helper
export const scrollTriggerAnimation = (
  element: string | Element,
  animation: gsap.TweenVars,
  triggerOptions: ScrollTrigger.Vars = {}
) => {
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      ...triggerOptions,
    },
  });
};

// Magnetic button effect
export const createMagneticEffect = (
  element: HTMLElement,
  strength: number = 0.3
) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

export { gsap, useGSAP, ScrollTrigger };
