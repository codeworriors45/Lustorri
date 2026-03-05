"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, createMagneticEffect } from "@/lib/animations/gsap";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { GradientOrb } from "@/components/animations/GradientOrb";
import { ParticleField } from "@/components/animations/ParticleField";
import { createStaggerDelay } from "@/lib/animations/variants";
import { getUniverseById } from "@/lib/data/universes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ============================================
// Pixel Heart SVG (matches old project)
// ============================================

function PixelHeart({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className="pixel-heart"
      style={{ imageRendering: "pixelated" }}
    >
      <rect x="4" y="3" width="2" height="2" fill="currentColor" />
      <rect x="10" y="3" width="2" height="2" fill="currentColor" />
      <rect x="2" y="5" width="2" height="2" fill="currentColor" />
      <rect x="4" y="5" width="2" height="2" fill="currentColor" />
      <rect x="6" y="5" width="2" height="2" fill="currentColor" />
      <rect x="8" y="5" width="2" height="2" fill="currentColor" />
      <rect x="10" y="5" width="2" height="2" fill="currentColor" />
      <rect x="12" y="5" width="2" height="2" fill="currentColor" />
      <rect x="2" y="7" width="2" height="2" fill="currentColor" />
      <rect x="4" y="7" width="2" height="2" fill="currentColor" />
      <rect x="6" y="7" width="2" height="2" fill="currentColor" />
      <rect x="8" y="7" width="2" height="2" fill="currentColor" />
      <rect x="10" y="7" width="2" height="2" fill="currentColor" />
      <rect x="12" y="7" width="2" height="2" fill="currentColor" />
      <rect x="4" y="9" width="2" height="2" fill="currentColor" />
      <rect x="6" y="9" width="2" height="2" fill="currentColor" />
      <rect x="8" y="9" width="2" height="2" fill="currentColor" />
      <rect x="10" y="9" width="2" height="2" fill="currentColor" />
      <rect x="6" y="11" width="2" height="2" fill="currentColor" />
      <rect x="8" y="11" width="2" height="2" fill="currentColor" />
      <rect x="7" y="13" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

// ============================================
// Data
// ============================================

interface PolaroidMoment {
  id: string;
  universeId: string;
  title: string;
  caption: string;
  image: string;
  hashtags: string[];
  likes: number;
}

const polaroidMoments: PolaroidMoment[] = [
  {
    id: "melted-promise",
    universeId: "melted-promise",
    title: "The Melted Promise",
    caption: "Two souls dissolved into one.",
    image: "/images/products/ring-1.jpg",
    hashtags: ["TheMeltedPromise", "LoveStory", "ForeverBound"],
    likes: 1247,
  },
  {
    id: "pulse",
    universeId: "pulse",
    title: "The Pulse",
    caption: "The first heartbeat that changed everything.",
    image: "/images/products/necklace-1.jpg",
    hashtags: ["ThePulse", "FirstTouch", "HeartRacing"],
    likes: 892,
  },
  {
    id: "eclipse",
    universeId: "eclipse",
    title: "The Eclipse",
    caption: "Where opposites align in rare brilliance.",
    image: "/images/products/diamond-1.jpg",
    hashtags: ["TheEclipse", "Opposites", "RareAlignment"],
    likes: 2103,
  },
  {
    id: "ember",
    universeId: "ember",
    title: "The Ember",
    caption: "A flame that learned to burn forever.",
    image: "/images/products/bracelet-1.jpg",
    hashtags: ["TheEmber", "EternalFlame", "QuietFire"],
    likes: 3456,
  },
  {
    id: "midnight-thread",
    universeId: "midnight-thread",
    title: "Midnight Thread",
    caption: "Love born in darkness, raw and magnetic.",
    image: "/images/products/earring-1.jpg",
    hashtags: ["MidnightThread", "DarkRomance", "Magnetic"],
    likes: 1689,
  },
  {
    id: "scar-line",
    universeId: "scar-line",
    title: "The Scar Line",
    caption: "Beauty born from wounds.",
    image: "/images/products/ring-2.jpg",
    hashtags: ["TheScarLine", "Survival", "Eternal"],
    likes: 978,
  },
  {
    id: "sin-curve",
    universeId: "sin-curve",
    title: "The Sin Curve",
    caption: "They chose feeling over fear.",
    image: "/images/products/ring-3.jpg",
    hashtags: ["TheSinCurve", "Passion", "NoRegrets"],
    likes: 1534,
  },
];

// Scattered positions — desktop
const TRANSFORMS_DESKTOP = [
  "translate(-50%, -50%) rotate(-4deg) scale(1)",
  "translate(-50%, -50%) rotate(6deg) scale(0.98) translateX(220px) translateY(-35px)",
  "translate(-50%, -50%) rotate(-8deg) scale(0.97) translateX(-240px) translateY(45px)",
  "translate(-50%, -50%) rotate(3deg) scale(0.96) translateX(140px) translateY(90px)",
  "translate(-50%, -50%) rotate(-6deg) scale(0.95) translateX(-140px) translateY(-55px)",
  "translate(-50%, -50%) rotate(7deg) scale(0.94) translateX(350px) translateY(30px)",
  "translate(-50%, -50%) rotate(-5deg) scale(0.93) translateX(-360px) translateY(-20px)",
];

// Scattered positions — mobile (tighter spread)
const TRANSFORMS_MOBILE = [
  "translate(-50%, -50%) rotate(-3deg) scale(1)",
  "translate(-50%, -50%) rotate(5deg) scale(0.95) translateX(80px) translateY(-20px)",
  "translate(-50%, -50%) rotate(-6deg) scale(0.93) translateX(-90px) translateY(25px)",
  "translate(-50%, -50%) rotate(3deg) scale(0.91) translateX(50px) translateY(55px)",
  "translate(-50%, -50%) rotate(-4deg) scale(0.89) translateX(-60px) translateY(-35px)",
  "translate(-50%, -50%) rotate(5deg) scale(0.87) translateX(110px) translateY(15px)",
  "translate(-50%, -50%) rotate(-3deg) scale(0.85) translateX(-120px) translateY(-10px)",
];

// Heart animation variants for wider spread
const HEART_ANIMATIONS = ["floatUpHeart", "floatUpHeartRight", "floatUpHeartCenter"];

// ============================================
// Main Component
// ============================================

export function HeroV2() {
  const [moments, setMoments] = useState(polaroidMoments);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, { count: number; userLiked: boolean }>>(() =>
    polaroidMoments.reduce(
      (acc, m) => {
        acc[m.id] = { count: m.likes, userLiked: false };
        return acc;
      },
      {} as Record<string, { count: number; userLiked: boolean }>
    )
  );
  const [floatingHearts, setFloatingHearts] = useState<
    { id: string; momentId: string; delay: number; variant: number }[]
  >([]);
  const [isUserActive, setIsUserActive] = useState(false);
  const [activeClickId, setActiveClickId] = useState<string | null>(null);
  const [entrancePhase, setEntrancePhase] = useState<
    "stacking" | "spreading" | "complete"
  >("stacking");
  const [isMobile, setIsMobile] = useState(false);

  // Responsive breakpoint listener
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const TRANSFORMS = isMobile ? TRANSFORMS_MOBILE : TRANSFORMS_DESKTOP;

  // Core refs
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rotateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Enhancement refs
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftArrowRef = useRef<HTMLButtonElement>(null);
  const rightArrowRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Shuffle animation tracking
  const prevFrontRef = useRef(moments[0]?.id);
  const isInitialRenderRef = useRef(true);
  const shuffleTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Marquee row refs for GSAP-driven scroll
  const marqueeRowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ============================================
  // Modern Card Shuffle Effect (GSAP-driven)
  // ============================================

  const triggerShuffleEffect = useCallback(() => {
    // Kill any in-progress shuffle animation
    if (shuffleTimelineRef.current) shuffleTimelineRef.current.kill();

    const tl = gsap.timeline();
    shuffleTimelineRef.current = tl;

    // Only enhance the new FRONT card — leave all others to smooth CSS transition
    const frontCard = cardRefs.current[0];
    if (frontCard) {
      // Gentle scale emphasis as it arrives at center
      tl.fromTo(
        frontCard,
        { scale: 0.96 },
        { scale: 1, duration: 0.55, ease: "power3.out" },
        0.08
      );

      // Warm golden shadow glow that fades to normal
      const frame = frontCard.querySelector("div") as HTMLElement;
      if (frame) {
        tl.fromTo(
          frame,
          {
            boxShadow:
              "0 20px 50px rgba(196,169,104,0.3), 0 8px 20px rgba(74,55,40,0.15)",
          },
          {
            boxShadow:
              "0 8px 30px rgba(74,55,40,0.15), 0 2px 8px rgba(74,55,40,0.1)",
            duration: 0.8,
            ease: "power2.out",
          },
          0.05
        );
      }
    }
  }, []);

  // ============================================
  // Core card mechanics (UNCHANGED)
  // ============================================

  const resetAutoPlay = useCallback(() => {
    setIsUserActive(true);
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    if (rotateTimerRef.current) clearTimeout(rotateTimerRef.current);
    autoPlayTimerRef.current = setTimeout(() => {
      setIsUserActive(false);
    }, 8000);
  }, []);

  const rotateLeft = useCallback(() => {
    resetAutoPlay();
    setMoments((prev) => {
      const next = [...prev];
      const first = next.shift()!;
      next.push(first);
      return next;
    });
  }, [resetAutoPlay]);

  const rotateRight = useCallback(() => {
    resetAutoPlay();
    setMoments((prev) => {
      const next = [...prev];
      const first = next.shift()!;
      next.push(first);
      return next;
    });
  }, [resetAutoPlay]);

  const bringToFront = useCallback(
    (clickedId: string) => {
      resetAutoPlay();
      // Boost z-index immediately so the card stays on top during flight
      setActiveClickId(clickedId);
      setMoments((prev) => {
        const idx = prev.findIndex((m) => m.id === clickedId);
        if (idx === 0) return prev;
        const next = [...prev];
        const [clicked] = next.splice(idx, 1);
        next.unshift(clicked);
        return next;
      });
      // Clear boost after CSS transition finishes
      setTimeout(() => setActiveClickId(null), 750);
    },
    [resetAutoPlay]
  );

  // ============================================
  // Enhancement 8: Enhanced Like Interaction
  // ============================================

  const handleLike = useCallback(
    (momentId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      resetAutoPlay();

      // Heart pulse animation via GSAP
      const button = e.currentTarget as HTMLElement;
      gsap.fromTo(
        button,
        { scale: 1 },
        {
          keyframes: [
            { scale: 1.4, duration: 0.15, ease: "power2.out" },
            { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" },
          ],
        }
      );

      setLikes((prev) => ({
        ...prev,
        [momentId]: {
          count: prev[momentId].count + 1,
          userLiked: true,
        },
      }));

      // Wider heart spread with random variants
      const heartCount = 8;
      const timestamp = Date.now();
      const newHearts = Array.from({ length: heartCount }, (_, i) => ({
        id: `${momentId}-${timestamp}-${Math.random()}-${i}`,
        momentId,
        delay: i * 100,
        variant: Math.floor(Math.random() * 3),
      }));

      setFloatingHearts((prev) => [...prev, ...newHearts]);
      setTimeout(() => {
        setFloatingHearts((prev) =>
          prev.filter((h) => !newHearts.find((nh) => nh.id === h.id))
        );
      }, 2000);
    },
    [resetAutoPlay]
  );

  // ============================================
  // Enhancement 1: GSAP 3D Hover Tilt
  // ============================================

  const handleCardMouseMove = useCallback((e: React.MouseEvent, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const maxTilt = index === 0 ? 15 : 8;
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    gsap.to(card, { rotateX, rotateY, duration: 0.3, ease: "power2.out" });

    // Enhancement 2: Cursor-following glow (front card only)
    if (index === 0 && glowRef.current) {
      gsap.to(glowRef.current, { x, y, opacity: 1, duration: 0.3, ease: "power2.out" });
    }
  }, []);

  const handleCardMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });

    // Hide glow
    if (index === 0 && glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
    }
  }, []);

  // ============================================
  // Auto-play: rotate every 4.5s when user is inactive (UNCHANGED)
  // ============================================

  useEffect(() => {
    if (!isUserActive && moments.length > 0) {
      rotateTimerRef.current = setTimeout(() => {
        setMoments((prev) => {
          const next = [...prev];
          const first = next.shift()!;
          next.push(first);
          return next;
        });
      }, 4500);
    }
    return () => {
      if (rotateTimerRef.current) clearTimeout(rotateTimerRef.current);
    };
  }, [isUserActive, moments]);

  // Cleanup on unmount (UNCHANGED)
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      if (rotateTimerRef.current) clearTimeout(rotateTimerRef.current);
    };
  }, []);

  // Keyboard navigation (UNCHANGED)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") rotateLeft();
      if (e.key === "ArrowRight") rotateRight();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [rotateLeft, rotateRight]);

  // ============================================
  // Enhancement 3: Magnetic Arrow Buttons
  // ============================================

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    if (leftArrowRef.current) cleanups.push(createMagneticEffect(leftArrowRef.current));
    if (rightArrowRef.current) cleanups.push(createMagneticEffect(rightArrowRef.current));
    return () => cleanups.forEach((c) => c());
  }, []);

  // ============================================
  // GSAP Marquee — scroll-responsive speed, top→left / bottom→right
  // ============================================

  useEffect(() => {
    const rows = marqueeRowRefs.current.filter(Boolean) as HTMLDivElement[];
    if (rows.length === 0) return;

    // Base speeds (px/s): negative = left, positive = right
    // Rows 1,3,5 move left — Rows 2,4,6 move right
    const baseSpeeds = [-80, 50, -45, 60];
    const positions = rows.map(() => 0);
    let speedMultiplier = 1;
    let targetMultiplier = 1;
    let rafId: number;
    let lastTime = 0;
    let scrollDecayTimer: number;

    // Scroll/wheel: speed up in same direction (both up & down scroll = faster)
    const boost = (delta: number) => {
      if (Math.abs(delta) > 1) {
        // Both scroll directions speed up the marquee, scroll down = more boost
        const intensity = Math.min(Math.abs(delta) / 10, 5);
        targetMultiplier = 1 + intensity * 1.5;
        clearTimeout(scrollDecayTimer);
        scrollDecayTimer = window.setTimeout(() => {
          targetMultiplier = 1;
        }, 200);
      }
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      boost(currentY - lastScrollY);
      lastScrollY = currentY;
    };
    const handleWheel = (e: WheelEvent) => boost(e.deltaY);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });

    // Animation loop — auto-move + scroll speed boost
    const tick = (time: number) => {
      if (!lastTime) lastTime = time;
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth lerp to target speed
      speedMultiplier += (targetMultiplier - speedMultiplier) * 0.06;

      rows.forEach((row, i) => {
        const speed = (baseSpeeds[i] || -40) * speedMultiplier;
        positions[i] += speed * dt;

        // Seamless wrap at half-width
        const halfWidth = row.scrollWidth / 2;
        if (halfWidth > 0) {
          if (positions[i] < -halfWidth) positions[i] += halfWidth;
          if (positions[i] > 0) positions[i] -= halfWidth;
        }

        gsap.set(row, { x: positions[i] });
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollDecayTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // ============================================
  // Enhancement 4: Orchestrated Entrance — Stack then Spread
  // ============================================

  useEffect(() => {
    // Force scroll to top so the page doesn't start scrolled down
    window.scrollTo(0, 0);

    const tl = gsap.timeline();

    // 0.0s — Section fade in
    tl.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      0
    );

    // Phase 1: Cards drop in one by one at center (back → front)
    // Animate in reverse order so each new card stacks on TOP (higher z-index)
    const cardCount = cardRefs.current.length;
    for (let step = 0; step < cardCount; step++) {
      const cardIndex = cardCount - 1 - step; // 6, 5, 4, 3, 2, 1, 0
      const card = cardRefs.current[cardIndex];
      if (!card) continue;

      gsap.set(card, {
        opacity: 0,
        y: -60,
        scale: 0.7,
        rotation: (Math.random() - 0.5) * 20,
      });

      tl.to(
        card,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: (Math.random() - 0.5) * 4,
          duration: 0.22,
          ease: "back.out(1.7)",
        },
        0.35 + step * 0.12
      );
    }

    // Phase 2: Trigger spread via React state (CSS transition handles the movement)
    const stackEndTime = 0.35 + cardCount * 0.12 + 0.25;
    tl.call(() => setEntrancePhase("spreading"), [], stackEndTime);

    // Phase 3: Mark complete after CSS spread finishes
    tl.call(() => setEntrancePhase("complete"), [], stackEndTime + 0.9);

    // Front card subtle pulse after spread settles
    if (cardRefs.current[0]) {
      tl.to(
        cardRefs.current[0],
        { scale: 1.03, duration: 0.15, ease: "power2.inOut" },
        stackEndTime + 0.7
      );
      tl.to(
        cardRefs.current[0],
        { scale: 1, duration: 0.15, ease: "power2.inOut" },
        stackEndTime + 0.85
      );
    }

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============================================
  // Shuffle Animation — triggers on every card change
  // ============================================

  useEffect(() => {
    // Skip the very first render (entrance handles that)
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      return;
    }
    // Detect front card change
    if (prevFrontRef.current !== moments[0]?.id) {
      prevFrontRef.current = moments[0]?.id;
      triggerShuffleEffect();
    }
  }, [moments, triggerShuffleEffect]);

  // ============================================
  // Derived data
  // ============================================

  const frontMoment = moments[0];
  const frontUniverse = getUniverseById(frontMoment.universeId);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background opacity-0"
    >
      {/* Enhancement 5: Ambient Background Layers */}
      <GradientOrb
        size="xl"
        color="gold"
        position="top-right"
        animate
        animationType="float"
        className="opacity-20 pointer-events-none"
      />
      <GradientOrb
        size="lg"
        color="rose"
        position="bottom-left"
        animate
        animationType="pulse"
        className="opacity-15 pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.0 }}
        className="pointer-events-none"
      >
        <ParticleField count={15} color="gold" intensity="subtle" />
      </motion.div>

      {/* Background Moving Text — GSAP-driven scrolling rows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none flex flex-col justify-center gap-2"
        style={{ transform: "rotate(-12deg) scale(1.3)", transformOrigin: "center center" }}
      >
        {/* Row 1 — moves left, outline */}
        <div
          ref={(el) => { marqueeRowRefs.current[0] = el; }}
          className="flex whitespace-nowrap will-change-transform"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-display font-bold uppercase mx-6"
              style={{
                fontSize: "clamp(3rem, 8vw, 9rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "transparent",
                opacity: 0.08,
                WebkitTextStroke: "1.5px #C4A968",
              }}
            >
              turning lust into a timeless love storri.
              <span className="mx-6 opacity-30">&bull;</span>
            </span>
          ))}
        </div>

        {/* Row 2 — moves right */}
        <div
          ref={(el) => { marqueeRowRefs.current[1] = el; }}
          className="flex whitespace-nowrap will-change-transform"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-serif italic mx-10"
              style={{
                fontSize: "clamp(1.2rem, 3vw, 3rem)",
                lineHeight: 1,
                letterSpacing: "0.1em",
                color: "#C4A968",
                opacity: 0.07,
              }}
            >
              passion that becomes a love storri.
              <span className="mx-10 opacity-30">&mdash;</span>
            </span>
          ))}
        </div>

        {/* Row 3 — main large row, moves left */}
        <div
          ref={(el) => { marqueeRowRefs.current[2] = el; }}
          className="flex whitespace-nowrap will-change-transform"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-display font-bold uppercase mx-8"
              style={{
                fontSize: "clamp(5rem, 13vw, 14rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "#C4A968",
                opacity: 0.09,
              }}
            >
              a journey from lust to love.
              <span className="mx-8 opacity-30">&bull;</span>
            </span>
          ))}
        </div>

        {/* Row 4 — moves right */}
        <div
          ref={(el) => { marqueeRowRefs.current[3] = el; }}
          className="flex whitespace-nowrap will-change-transform"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-serif italic mx-10"
              style={{
                fontSize: "clamp(1.2rem, 3vw, 3rem)",
                lineHeight: 1,
                letterSpacing: "0.1em",
                color: "#C4A968",
                opacity: 0.07,
              }}
            >
              desire writing a beautiful storri.
              <span className="mx-10 opacity-30">&mdash;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Polaroid Stack */}
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-36 md:pt-46 pb-8">
        <div className="relative mx-auto" style={{ height: "clamp(350px, 55vh, 700px)" }}>
          {/* Left arrow — Enhancement 3: Magnetic */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-5 z-20">
            <button
              ref={leftArrowRef}
              onClick={rotateLeft}
              className={cn(
                "w-11 h-11 sm:w-[50px] sm:h-[50px] rounded-full",
                "flex items-center justify-center cursor-pointer",
                "bg-background/90 border border-gold text-gold",
                "shadow-[0_4px_12px_rgba(74,55,40,0.1)]",
                "transition-colors duration-300",
                "hover:bg-gold hover:text-background hover:shadow-[0_6px_20px_rgba(196,169,104,0.3)]"
              )}
              aria-label="Previous moment"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          {/* Cards */}
          {moments.map((moment, index) => {
            const universe = getUniverseById(moment.universeId);
            const isHovered = hoveredId === moment.id;
            // Hide far cards on mobile
            const maxVisible = isMobile ? 4 : 7;
            if (index >= maxVisible) return null;

            return (
              <div
                key={moment.id}
                className="absolute top-1/2 left-1/2"
                style={{
                  zIndex: moment.id === activeClickId ? 30 : 20 - index,
                  transform:
                    entrancePhase === "stacking"
                      ? "translate(-50%, -50%)"
                      : TRANSFORMS[index] || "translate(-50%, -50%) rotate(2deg) scale(0.92)",
                  opacity:
                    entrancePhase === "stacking"
                      ? 1
                      : index === 0
                        ? 1
                        : index <= 2
                          ? 0.95
                          : 0.85,
                  transition:
                    entrancePhase === "stacking"
                      ? "none"
                      : "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease",
                  willChange: "transform",
                  cursor: "pointer",
                  perspective: "800px",
                }}
                onClick={() => bringToFront(moment.id)}
              >
                {/* Enhancement 1: Tilt wrapper with 3D transform */}
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseMove={(e) => handleCardMouseMove(e, index)}
                  onMouseEnter={() => {
                    setHoveredId(moment.id);
                    resetAutoPlay();
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null);
                    handleCardMouseLeave(index);
                  }}
                >
                  {/* Polaroid frame */}
                  <div
                    className={cn(
                      "relative w-[200px] sm:w-[260px] md:w-[300px] bg-[#FAFAF8] p-2 sm:p-3 md:p-4 pb-6 sm:pb-8 md:pb-10",
                      "shadow-[0_8px_30px_rgba(74,55,40,0.15),0_2px_8px_rgba(74,55,40,0.1)]",
                      "transition-all duration-300",
                      isHovered &&
                      "shadow-[0_16px_50px_rgba(74,55,40,0.3),0_6px_16px_rgba(74,55,40,0.2)] scale-105"
                    )}
                  >
                    {/* Image */}
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ height: "clamp(200px, 30vh, 340px)" }}
                    >
                      <Image
                        src={moment.image}
                        alt={moment.title}
                        fill
                        className="object-cover"
                        sizes="300px"
                        priority={index === 0}
                      />

                      {/* Enhancement 7: Universe Color Accent Bar */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[3px]"
                        style={{
                          backgroundColor: universe?.color || "#C4A968",
                          transition: "background-color 0.5s",
                        }}
                      />

                      {/* Enhancement 2: Cursor-Following Light Glow (front card only) */}
                      {index === 0 && (
                        <div
                          ref={glowRef}
                          className="absolute pointer-events-none z-10"
                          style={{
                            width: "300px",
                            height: "300px",
                            top: "-150px",
                            left: "-150px",
                            background:
                              "radial-gradient(circle 150px, rgba(255,255,255,0.15), transparent)",
                            opacity: 0,
                          }}
                        />
                      )}
                    </div>

                    {/* Caption + Likes */}
                    <div className="mt-3 flex flex-col gap-2">
                      <p
                        className="text-center text-xs sm:text-sm text-foreground/80 italic"
                        style={{ fontFamily: "'Segoe Script', 'Brush Script MT', cursive" }}
                      >
                        {moment.caption}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <PixelHeart size={12} />
                        {/* Enhancement 8: Count morph animation */}
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={likes[moment.id]?.count}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="text-sm font-sans font-medium tabular-nums"
                          >
                            {likes[moment.id]?.count.toLocaleString()}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      {/* Hashtags inside polaroid */}
                      <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 mt-1">
                        {moment.hashtags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-sans font-medium text-foreground/30"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Enhancement 8: Enhanced Like button with glow state */}
                    <button
                      className={cn(
                        "absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10",
                        "transition-all duration-200",
                        "hover:scale-115 active:scale-95",
                        likes[moment.id]?.userLiked
                          ? "text-primary drop-shadow-[0_0_6px_rgba(162,44,62,0.5)]"
                          : "text-muted-foreground"
                      )}
                      onClick={(e) => handleLike(moment.id, e)}
                      aria-label="Like this moment"
                    >
                      <PixelHeart size={24} />
                    </button>

                    {/* Enhancement 8: Floating hearts with wider spread */}
                    {floatingHearts
                      .filter((h) => h.momentId === moment.id)
                      .map((heart) => (
                        <div
                          key={heart.id}
                          className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-primary pointer-events-none"
                          style={{
                            animation: `${HEART_ANIMATIONS[heart.variant]} 1.5s ease-out ${heart.delay}ms forwards`,
                            opacity: 0,
                          }}
                        >
                          <PixelHeart size={16} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Right arrow — Enhancement 3: Magnetic */}
          <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-5 z-20">
            <button
              ref={rightArrowRef}
              onClick={rotateRight}
              className={cn(
                "w-11 h-11 sm:w-[50px] sm:h-[50px] rounded-full",
                "flex items-center justify-center cursor-pointer",
                "bg-background/90 border border-gold text-gold",
                "shadow-[0_4px_12px_rgba(74,55,40,0.1)]",
                "transition-colors duration-300",
                "hover:bg-gold hover:text-background hover:shadow-[0_6px_20px_rgba(196,169,104,0.3)]"
              )}
              aria-label="Next moment"
            >
              <ChevronRight size={24} />
            </button>
          </div>

        </div>

        {/* Hero content below */}
        <div className="flex flex-col items-center text-center gap-3 sm:gap-5 mt-12 sm:mt-24 max-w-[800px] mx-auto">
          {/* Enhancement 6: AnimatedText Headline */}
          <AnimatedText
            as="h1"
            animation="split"
            delay={1.8}
            className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[4rem] font-semibold leading-[1.15] text-foreground tracking-tight px-2"
          >
            Jewelry for the moments you never forget.
          </AnimatedText>

          {/* Enhancement 6: Subtitle with Framer Motion fadeInUp */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif italic text-lg sm:text-xl text-muted-foreground max-w-[500px]"
          >
            Every ring holds a story. Every story begins with a touch.
          </motion.p>

          {/* CTA buttons — staggered entrance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <Button size="lg" variant="primary" asChild>
              <Link href="/universes">Discover the rings</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/stories">Read the love stories</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes floatUpHeart {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translateY(-100px) translateX(-25px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-170px) translateX(-40px) scale(0.8);
          }
        }
        @keyframes floatUpHeartRight {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translateY(-110px) translateX(25px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-175px) translateX(40px) scale(0.8);
          }
        }
        @keyframes floatUpHeartCenter {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translateY(-120px) translateX(5px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-180px) translateX(10px) scale(0.8);
          }
        }
      `}</style>
    </section>
  );
}
