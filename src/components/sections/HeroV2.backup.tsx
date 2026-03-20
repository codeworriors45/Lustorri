"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/animations/gsap";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { GradientOrb } from "@/components/animations/GradientOrb";
import { ParticleField } from "@/components/animations/ParticleField";
import { getUniverseById } from "@/lib/data/universes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

// ============================================
// Pixel Heart SVG
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

// ============================================
// Card Layout Positions — elegant, refined angles
// ============================================

interface CardLayout {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
}

// Desktop — symmetrical scattered: center, left-right pairs (tight)
const LAYOUTS_DESKTOP: CardLayout[] = [
  { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 },
  { x: -160, y: -25, rotation: -6, scale: 0.97, opacity: 1 },
  { x: 160, y: -25, rotation: 6, scale: 0.97, opacity: 1 },
  { x: -290, y: 15, rotation: -8, scale: 0.95, opacity: 1 },
  { x: 290, y: 15, rotation: 7, scale: 0.95, opacity: 1 },
  { x: -400, y: -10, rotation: -5, scale: 0.92, opacity: 1 },
  { x: 400, y: -10, rotation: 5, scale: 0.92, opacity: 1 },
];

// Mobile — tighter scattered positions
const LAYOUTS_MOBILE: CardLayout[] = [
  { x: 0, y: 0, rotation: -3, scale: 1, opacity: 1 },
  { x: 80, y: -20, rotation: 5, scale: 0.95, opacity: 1 },
  { x: -90, y: 25, rotation: -6, scale: 0.93, opacity: 1 },
  { x: 50, y: 55, rotation: 3, scale: 0.91, opacity: 1 },
];

// Heart animation variants
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
  const [isMobile, setIsMobile] = useState(false);
  const [isEntranceDone, setIsEntranceDone] = useState(false);
  const isSwapping = useRef(false);

  // Responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const LAYOUTS = isMobile ? LAYOUTS_MOBILE : LAYOUTS_DESKTOP; // eslint-disable-line @typescript-eslint/no-unused-vars

  // Refs
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rotateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const breatheTimelines = useRef<gsap.core.Tween[]>([]);
  const marqueeRowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ============================================
  // Idle Breathing — cards float gently when no interaction
  // ============================================

  const startBreathing = useCallback(() => {
    // Kill old breathe animations
    breatheTimelines.current.forEach((t) => t.kill());
    breatheTimelines.current = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const duration = 3 + i * 0.4;
      const yAmount = i === 0 ? 4 : 2 + i * 0.5;
      const rotAmount = 0.3 + i * 0.1;

      const tween = gsap.to(card, {
        y: `+=${yAmount}`,
        rotation: `+=${rotAmount}`,
        duration,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.3,
      });
      breatheTimelines.current.push(tween);
    });
  }, []);

  const stopBreathing = useCallback(() => {
    breatheTimelines.current.forEach((t) => t.kill());
    breatheTimelines.current = [];
  }, []);

  // ============================================
  // GSAP-Driven Card Swap — fully controlled, no CSS transition fighting
  // ============================================

  const animateCardsToLayout = useCallback(
    (momentOrder: PolaroidMoment[], skipAnimation = false, swapFromIndex?: number) => {
      const layouts = isMobile ? LAYOUTS_MOBILE : LAYOUTS_DESKTOP;
      const maxVisible = isMobile ? 4 : 7;

      momentOrder.forEach((moment, newIndex) => {
        // Find the actual DOM card by data attribute
        const card = cardRefs.current.find(
          (el) => el?.dataset.momentId === moment.id
        );
        if (!card || newIndex >= maxVisible) return;

        const layout = layouts[newIndex] || layouts[layouts.length - 1];
        const zIndex = 20 - newIndex;
        const parent = card.parentElement as HTMLElement;

        // Z-index strategy for smooth swap:
        // - New front card (index 0): gets highest z-index immediately
        // - Old front card (now at swapFromIndex): keeps high z-index during animation, drops after
        // - All others: set immediately
        const isOldFrontCard = swapFromIndex !== undefined && newIndex === swapFromIndex;

        if (isOldFrontCard && !skipAnimation) {
          // Old front card stays on top during first half, then drops behind new front
          parent.style.zIndex = "19";
          setTimeout(() => {
            parent.style.zIndex = String(zIndex);
          }, 600);
        } else if (newIndex === 0 && !skipAnimation) {
          // New front card gets boosted immediately
          parent.style.zIndex = "25";
          setTimeout(() => {
            parent.style.zIndex = "20";
          }, 1100);
        } else {
          parent.style.zIndex = String(zIndex);
        }

        if (skipAnimation) {
          gsap.set(parent, {
            x: layout.x,
            y: layout.y,
          });
          gsap.set(card, {
            rotation: layout.rotation,
            scale: layout.scale,
            opacity: layout.opacity,
          });
          return;
        }

        // New front card: lift up first, then glide to center
        if (newIndex === 0 && swapFromIndex !== undefined) {
          const tl = gsap.timeline();

          // Phase 1: Lift up — card rises, scales up, straightens rotation
          tl.to(card, {
            scale: 1.08,
            rotation: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          }, 0);

          // Lift shadow deeper while rising
          const frame = card.querySelector("[data-polaroid-frame]") as HTMLElement;
          if (frame) {
            tl.to(frame, {
              boxShadow: "0 30px 70px rgba(196,169,104,0.35), 0 15px 35px rgba(74,55,40,0.2)",
              duration: 0.35,
              ease: "power2.out",
            }, 0);
          }

          // Phase 2: Glide to center position
          tl.to(parent, {
            x: layout.x,
            y: layout.y,
            duration: 0.9,
            ease: "power3.inOut",
            overwrite: "auto",
          }, 0.25);

          // Settle scale and rotation
          tl.to(card, {
            scale: layout.scale,
            rotation: layout.rotation,
            duration: 0.9,
            ease: "power3.inOut",
            overwrite: "auto",
          }, 0.25);

        } else {
          // All other cards: smooth glide to new position
          gsap.to(parent, {
            x: layout.x,
            y: layout.y,
            duration: 1.1,
            ease: "power3.inOut",
            overwrite: "auto",
          });

          gsap.to(card, {
            rotation: layout.rotation,
            scale: layout.scale,
            opacity: layout.opacity,
            duration: 1.1,
            ease: "power3.inOut",
            overwrite: "auto",
          });
        }

        // Front card gets a special glow treatment
        if (newIndex === 0) {
          const frame = card.querySelector("[data-polaroid-frame]") as HTMLElement;
          if (frame) {
            gsap.fromTo(
              frame,
              {
                boxShadow:
                  "0 20px 60px rgba(196,169,104,0.25), 0 10px 25px rgba(74,55,40,0.15)",
              },
              {
                boxShadow:
                  "0 8px 30px rgba(74,55,40,0.12), 0 2px 8px rgba(74,55,40,0.08)",
                duration: 1.8,
                ease: "power2.out",
                delay: 0.3,
              }
            );
          }
        }
      });
    },
    [isMobile]
  );

  // ============================================
  // Click to swap — elegant position exchange
  // ============================================

  const bringToFront = useCallback(
    (clickedId: string) => {
      if (isSwapping.current) return;
      isSwapping.current = true;

      setIsUserActive(true);
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      if (rotateTimerRef.current) clearTimeout(rotateTimerRef.current);

      stopBreathing();

      setMoments((prev) => {
        const idx = prev.findIndex((m) => m.id === clickedId);
        if (idx === 0) {
          isSwapping.current = false;
          return prev;
        }

        const next = [...prev];
        [next[0], next[idx]] = [next[idx], next[0]];

        // Animate to new layout positions — pass swap index so old front card z-index is delayed
        requestAnimationFrame(() => {
          animateCardsToLayout(next, false, idx);

          // Re-enable after full animation completes (lift 0.35s + glide 0.9s)
          setTimeout(() => {
            isSwapping.current = false;
            startBreathing();
            autoPlayTimerRef.current = setTimeout(() => {
              setIsUserActive(false);
            }, 8000);
          }, 1400);
        });

        return next;
      });
    },
    [animateCardsToLayout, stopBreathing, startBreathing]
  );

  // ============================================
  // Auto-rotate — gentle cycle
  // ============================================

  useEffect(() => {
    if (!isUserActive && moments.length > 0 && isEntranceDone) {
      rotateTimerRef.current = setTimeout(() => {
        if (isSwapping.current) return;
        isSwapping.current = true;
        stopBreathing();

        setMoments((prev) => {
          const next = [...prev];
          const first = next.shift()!;
          next.push(first);

          requestAnimationFrame(() => {
            animateCardsToLayout(next);
            setTimeout(() => {
              isSwapping.current = false;
              startBreathing();
            }, 1200);
          });

          return next;
        });
      }, 5000);
    }
    return () => {
      if (rotateTimerRef.current) clearTimeout(rotateTimerRef.current);
    };
  }, [isUserActive, moments, isEntranceDone, animateCardsToLayout, stopBreathing, startBreathing]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      if (rotateTimerRef.current) clearTimeout(rotateTimerRef.current);
      stopBreathing();
    };
  }, [stopBreathing]);

  // ============================================
  // 3D Hover Tilt — elegant, subtle
  // ============================================

  const handleCardMouseMove = useCallback((e: React.MouseEvent, momentId: string) => {
    // Only apply 3D tilt on the active/front card
    if (moments[0]?.id !== momentId) return;

    const card = cardRefs.current.find((el) => el?.dataset.momentId === momentId);
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = ((y - centerY) / centerY) * -5;
    const tiltY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Cursor glow
    if (glowRef.current) {
      gsap.to(glowRef.current, { x, y, opacity: 1, duration: 0.4, ease: "power2.out" });
    }
  }, [moments]);

  const handleCardMouseLeave = useCallback((momentId: string) => {
    const card = cardRefs.current.find((el) => el?.dataset.momentId === momentId);
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: "power3.out",
      overwrite: "auto",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
    }
  }, []);

  // ============================================
  // Peek Effect — side cards lift on hover
  // ============================================

  const handleSideCardHover = useCallback((momentId: string, index: number) => {
    const card = cardRefs.current.find((el) => el?.dataset.momentId === momentId);
    if (!card) return;

    stopBreathing();

    const frame = card.querySelector("[data-polaroid-frame]") as HTMLElement;
    const layouts = isMobile ? LAYOUTS_MOBILE : LAYOUTS_DESKTOP;
    const layout = layouts[index] || layouts[layouts.length - 1];
    const isLeft = layout.x < 0;

    // Simple slide outward — no origin change, no jerk
    gsap.to(card.parentElement!, {
      x: layout.x + (isLeft ? -80 : 80),
      duration: 0.7,
      ease: "power2.out",
      overwrite: true,
    });

    if (frame) {
      gsap.to(frame, {
        boxShadow: "0 20px 50px rgba(74,55,40,0.18), 0 8px 20px rgba(74,55,40,0.1)",
        duration: 0.7,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, [stopBreathing, isMobile]);

  const handleSideCardLeave = useCallback((momentId: string, index: number) => {
    const card = cardRefs.current.find((el) => el?.dataset.momentId === momentId);
    if (!card) return;

    const frame = card.querySelector("[data-polaroid-frame]") as HTMLElement;
    const layouts = isMobile ? LAYOUTS_MOBILE : LAYOUTS_DESKTOP;
    const layout = layouts[index] || layouts[layouts.length - 1];

    // Slide back to original
    gsap.to(card.parentElement!, {
      x: layout.x,
      duration: 0.7,
      ease: "power2.inOut",
      overwrite: true,
      onComplete: () => startBreathing(),
    });

    if (frame) {
      gsap.to(frame, {
        boxShadow: "0 8px 30px rgba(74,55,40,0.12), 0 2px 8px rgba(74,55,40,0.08)",
        duration: 0.7,
        ease: "power2.inOut",
        overwrite: true,
      });
    }
  }, [isMobile, startBreathing]);

  // ============================================
  // Like Interaction
  // ============================================

  const handleLike = useCallback(
    (momentId: string, e: React.MouseEvent) => {
      e.stopPropagation();

      const button = e.currentTarget as HTMLElement;
      gsap.fromTo(
        button,
        { scale: 1 },
        {
          keyframes: [
            { scale: 1.3, duration: 0.15, ease: "power2.out" },
            { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" },
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

      const heartCount = 6;
      const timestamp = Date.now();
      const newHearts = Array.from({ length: heartCount }, (_, i) => ({
        id: `${momentId}-${timestamp}-${Math.random()}-${i}`,
        momentId,
        delay: i * 120,
        variant: Math.floor(Math.random() * 3),
      }));

      setFloatingHearts((prev) => [...prev, ...newHearts]);
      setTimeout(() => {
        setFloatingHearts((prev) =>
          prev.filter((h) => !newHearts.find((nh) => nh.id === h.id))
        );
      }, 2000);
    },
    []
  );

  // ============================================
  // GSAP Marquee
  // ============================================

  useEffect(() => {
    const rows = marqueeRowRefs.current.filter(Boolean) as HTMLDivElement[];
    if (rows.length === 0) return;

    const baseSpeeds = [-80, 50, -45, 60];
    const positions = rows.map(() => 0);
    let speedMultiplier = 1;
    let targetMultiplier = 1;
    let rafId: number;
    let lastTime = 0;
    let scrollDecayTimer: number;

    const boost = (delta: number) => {
      if (Math.abs(delta) > 1) {
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

    const tick = (time: number) => {
      if (!lastTime) lastTime = time;
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      speedMultiplier += (targetMultiplier - speedMultiplier) * 0.06;

      rows.forEach((row, i) => {
        const speed = (baseSpeeds[i] || -40) * speedMultiplier;
        positions[i] += speed * dt;

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
  // Cinematic Entrance — elegant reveal
  // ============================================

  useEffect(() => {
    window.scrollTo(0, 0);

    // Delay card animation until header logo finishes (1.2s)
    const tl = gsap.timeline({ delay: 1.2 });
    const layouts = isMobile ? LAYOUTS_MOBILE : LAYOUTS_DESKTOP;
    const maxVisible = isMobile ? 4 : 7;

    // Section fade in
    tl.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" },
      0
    );

    // Get visible cards in render order (index 0 = front, index 6 = back)
    const visibleCards: HTMLDivElement[] = [];
    for (let i = 0; i < maxVisible; i++) {
      const card = cardRefs.current[i];
      if (card) visibleCards.push(card);
    }

    // Set all cards to initial hidden state at center
    visibleCards.forEach((card) => {
      gsap.set(card.parentElement!, { x: 0, y: 0 });
      gsap.set(card, {
        opacity: 0,
        scale: 0.6,
        rotation: 0,
        y: 40,
      });
    });

    // Phase 1: Cards fade in one by one from back to front
    const totalCards = visibleCards.length;
    for (let step = 0; step < totalCards; step++) {
      // Back cards first: index totalCards-1, then totalCards-2, ... then 0
      const cardIndex = totalCards - 1 - step;
      const card = visibleCards[cardIndex];
      const delay = 0.5 + step * 0.15;

      tl.to(
        card,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: (Math.random() - 0.5) * 3,
          duration: 0.5,
          ease: "power2.out",
        },
        delay
      );
    }

    // Phase 2: Cards spread to their layout positions
    const spreadStart = 0.5 + totalCards * 0.15 + 0.4;

    visibleCards.forEach((card, index) => {
      const layout = layouts[index] || layouts[layouts.length - 1];

      // Position via parent
      tl.to(
        card.parentElement!,
        {
          x: layout.x,
          y: layout.y,
          duration: 1.4,
          ease: "power3.inOut",
        },
        spreadStart
      );

      // Rotation, scale, opacity via card
      tl.to(
        card,
        {
          rotation: layout.rotation,
          scale: layout.scale,
          opacity: layout.opacity,
          duration: 1.4,
          ease: "power3.inOut",
        },
        spreadStart
      );
    });

    // Phase 3: Front card subtle shimmer
    if (visibleCards[0]) {
      const frame = visibleCards[0].querySelector("[data-polaroid-frame]") as HTMLElement;
      if (frame) {
        tl.fromTo(
          frame,
          {
            boxShadow:
              "0 25px 70px rgba(196,169,104,0.3), 0 12px 30px rgba(74,55,40,0.18)",
          },
          {
            boxShadow:
              "0 8px 30px rgba(74,55,40,0.12), 0 2px 8px rgba(74,55,40,0.08)",
            duration: 1.5,
            ease: "power2.out",
          },
          spreadStart + 1.0
        );
      }
    }

    // Mark entrance complete and start breathing
    tl.call(
      () => {
        setIsEntranceDone(true);
        startBreathing();
      },
      [],
      spreadStart + 1.6
    );

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============================================
  // Derived data
  // ============================================

  const frontMoment = moments[0];
  const frontUniverse = getUniverseById(frontMoment.universeId); // eslint-disable-line @typescript-eslint/no-unused-vars
  const maxVisible = isMobile ? 4 : 7;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background opacity-0 pb-12 sm:pb-16 md:pb-20"
    >
      {/* Ambient Background */}
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
        transition={{ delay: 4.5, duration: 1.0 }}
        className="pointer-events-none"
      >
        <ParticleField count={15} color="gold" intensity="subtle" />
      </motion.div>

      {/* Background Moving Text */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none flex flex-col justify-center gap-2"
        style={{ transform: "rotate(-12deg) scale(1.3)", transformOrigin: "center center" }}
      >
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

      {/* Polaroid Card Stack */}
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-0 flex flex-col items-center">

        {/* Mobile — Swiper Cards */}
        <div className="block sm:hidden w-full max-w-[230px] mx-auto pt-20 pb-8">
          <Swiper
            effect="cards"
            grabCursor
            modules={[EffectCards]}
            className="w-full"
            cardsEffect={{
              perSlideOffset: 8,
              perSlideRotate: 3,
              rotate: true,
              slideShadows: false,
            }}
          >
            {polaroidMoments.map((moment) => {
              const universe = getUniverseById(moment.universeId);
              return (
                <SwiperSlide key={moment.id} className="!bg-transparent">
                  <div className="bg-[#FAFAF8] border-2 border-primary/30 p-2 pb-6 shadow-[0_8px_30px_rgba(74,55,40,0.12),0_2px_8px_rgba(74,55,40,0.08)]">
                    <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
                      <Image
                        src={moment.image}
                        alt={moment.title}
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{ backgroundColor: universe?.color || "#C4A968" }}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-2">
                      <p
                        className="text-center text-sm text-foreground/80 italic"
                        style={{ fontFamily: "'Segoe Script', 'Brush Script MT', cursive" }}
                      >
                        {moment.caption}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <PixelHeart size={12} />
                        <span className="text-sm font-sans font-medium tabular-nums">
                          {likes[moment.id]?.count.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 mt-1">
                        {moment.hashtags.map((tag) => (
                          <span key={tag} className="text-[10px] font-sans font-medium text-foreground/30">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      className={cn(
                        "absolute bottom-3 left-3 z-10 transition-all duration-300",
                        "hover:scale-110 active:scale-95",
                        likes[moment.id]?.userLiked
                          ? "text-primary drop-shadow-[0_0_6px_rgba(162,44,62,0.5)]"
                          : "text-muted-foreground"
                      )}
                      onClick={(e) => handleLike(moment.id, e)}
                      aria-label="Like this moment"
                    >
                      <PixelHeart size={24} />
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Desktop — Scattered Card Stack */}
        <div className="relative mx-auto hidden sm:block" style={{ height: "clamp(420px, 65vh, 780px)" }}>
          {moments.map((moment, index) => {
            const universe = getUniverseById(moment.universeId);
            const isHovered = hoveredId === moment.id;
            if (index >= maxVisible) return null;

            return (
              <div
                key={moment.id}
                className="absolute top-28 left-1/2"
                style={{
                  zIndex: 20 - index,
                  transform: "translate(-50%, -50%)",
                  willChange: "transform",
                  cursor: "pointer",
                }}
                onClick={() => bringToFront(moment.id)}
                onMouseMove={(e) => handleCardMouseMove(e, moment.id)}
                onMouseEnter={() => {
                  setHoveredId(moment.id);
                  setIsUserActive(true);
                  if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
                  if (index !== 0) handleSideCardHover(moment.id, index);
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  handleCardMouseLeave(moment.id);
                  if (index !== 0) handleSideCardLeave(moment.id, index);
                  autoPlayTimerRef.current = setTimeout(() => {
                    setIsUserActive(false);
                  }, 8000);
                }}
              >
                {/* Card inner — GSAP controls rotation/scale/opacity */}
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  data-moment-id={moment.id}
                  data-index={String(index)}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "800px",
                  }}
                >
                  {/* Polaroid frame */}
                  <div
                    data-polaroid-frame
                    className={cn(
                      "relative w-[200px] sm:w-[260px] md:w-[300px] bg-[#FAFAF8] border-2 border-primary/30 p-2 sm:p-3 md:p-4 pb-6 sm:pb-8 md:pb-10",
                      "shadow-[0_8px_30px_rgba(74,55,40,0.12),0_2px_8px_rgba(74,55,40,0.08)]",
                      "transition-shadow duration-700 ease-out",
                      isHovered &&
                      "shadow-[0_20px_60px_rgba(74,55,40,0.22),0_8px_20px_rgba(74,55,40,0.15)]"
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
                        className={cn(
                          "object-cover transition-transform duration-700 ease-out",
                          isHovered && "scale-[1.03]"
                        )}
                        sizes="300px"
                        priority={index === 0}
                      />

                      {/* Universe accent bar */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{
                          backgroundColor: universe?.color || "#C4A968",
                          transition: "background-color 0.8s ease",
                        }}
                      />

                      {/* Cursor glow — front card only */}
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
                              "radial-gradient(circle 150px, rgba(255,255,255,0.12), transparent)",
                            opacity: 0,
                          }}
                        />
                      )}
                    </div>

                    {/* Caption */}
                    <div className="mt-3 flex flex-col gap-2">
                      <p
                        className="text-center text-xs sm:text-sm text-foreground/80 italic"
                        style={{ fontFamily: "'Segoe Script', 'Brush Script MT', cursive" }}
                      >
                        {moment.caption}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <PixelHeart size={12} />
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={likes[moment.id]?.count}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="text-sm font-sans font-medium tabular-nums"
                          >
                            {likes[moment.id]?.count.toLocaleString()}
                          </motion.span>
                        </AnimatePresence>
                      </div>
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

                    {/* Like button */}
                    <button
                      className={cn(
                        "absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10",
                        "transition-all duration-300",
                        "hover:scale-110 active:scale-95",
                        likes[moment.id]?.userLiked
                          ? "text-primary drop-shadow-[0_0_6px_rgba(162,44,62,0.5)]"
                          : "text-muted-foreground"
                      )}
                      onClick={(e) => handleLike(moment.id, e)}
                      aria-label="Like this moment"
                    >
                      <PixelHeart size={24} />
                    </button>

                    {/* Floating hearts */}
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
        </div>

        {/* Hero content */}
        <div className="relative z-30 flex flex-col items-center text-center gap-2 sm:gap-3 mt-12 sm:mt-16 md:mt-20 max-w-[800px] mx-auto flex-shrink-0">
          <AnimatedText
            as="h1"
            animation="split"
            delay={isMobile ? 0.3 : 4.5}
            className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[4rem] font-semibold leading-[1.15] text-foreground tracking-tight px-2"
          >
            Jewelry for the moments you never forget.
          </AnimatedText>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0.5 : 4.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif italic text-lg sm:text-xl text-muted-foreground max-w-[500px]"
          >
            Every ring holds a story. Every story begins with a touch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0.7 : 5.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
