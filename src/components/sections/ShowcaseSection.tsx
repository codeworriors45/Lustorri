"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

// ============================================
// Section 2 — Curtain Reveal → Image Sequence → Curtain Close
// Mobile-optimised: normalizeScroll, stable vh, capped DPR, overscroll-none
// ============================================

const FRAME_COUNT = 120;
const FRAME_PATH = "/images/showcase/ezgif-frame-";

function padFrame(n: number): string {
  return String(n).padStart(3, "0");
}
function frameSrc(index: number): string {
  return `${FRAME_PATH}${padFrame(index)}.png`;
}

// ─── Stable viewport height ───────────────────────────────────────────────────
// On mobile, 100vh changes when the address bar shows/hides.
// We use window.innerHeight snapped once on mount and refreshed via
// ScrollTrigger.refresh() so the pin height is always correct.
function getStableVh(): number {
  return typeof window !== "undefined" ? window.innerHeight : 0;
}

export function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);
  const goldGlowRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const currentFrameRef = useRef(-1);
  const canvasSizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  // ─── Canvas size setup ────────────────────────────────────────────────────
  const setupCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Cap DPR at 2 — devices with DPR 3+ (many Android flagship phones)
    // spend GPU time rendering pixels the user can't distinguish. Capping
    // keeps mobile canvas fast without visible quality loss.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    if (
      canvasSizeRef.current.w === rect.width &&
      canvasSizeRef.current.h === rect.height &&
      canvasSizeRef.current.dpr === dpr
    )
      return;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvasSizeRef.current = { w: rect.width, h: rect.height, dpr };
    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxRef.current = ctx;
    }
  }, []);

  // ─── Synchronous frame draw ────────────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const ctx = ctxRef.current;
    const img = imagesRef.current[index];
    if (!ctx || !img || !img.complete || !img.naturalWidth) return;
    const { w: cW, h: cH } = canvasSizeRef.current;
    if (!cW || !cH) return;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cW / cH;
    let dW: number, dH: number, dX: number, dY: number;
    if (ir > cr) {
      dH = cH;
      dW = cH * ir;
      dX = (cW - dW) / 2;
      dY = 0;
    } else {
      dW = cW;
      dH = cW / ir;
      dX = 0;
      dY = (cH - dH) / 2;
    }
    ctx.clearRect(0, 0, cW, cH);
    ctx.drawImage(img, dX, dY, dW, dH);
  }, []);

  // ─── Draw only when frame actually changes (no RAF wrapper) ───────────────
  const requestDraw = useCallback(
    (index: number) => {
      if (index === currentFrameRef.current) return;
      currentFrameRef.current = index;
      drawFrame(index);
    },
    [drawFrame]
  );

  // ─── Preload images ───────────────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "sync";
      img.src = frameSrc(i);
      if (i === 1) {
        img.onload = () => {
          setupCanvasSize();
          drawFrame(0);
          currentFrameRef.current = 0;
        };
      }
      images.push(img);
    }
    imagesRef.current = images;
  }, [setupCanvasSize, drawFrame]);

  // ─── GSAP: curtain open → frames → curtain close ─────────────────────────
  useEffect(() => {
    const frameProxy = { value: 0 };
    const pin = pinContainerRef.current;
    const section = sectionRef.current;
    if (!pin || !section) return;

    // Set a stable pixel height on the pin container using window.innerHeight
    // instead of CSS 100vh, which fluctuates on mobile as the address bar
    // appears/disappears and breaks the ScrollTrigger end position.
    const stableH = getStableVh();
    pin.style.height = `${stableH}px`;

    const ctx = gsap.context(() => {
      const totalScroll = "+=450%";

      // ── Pinning ScrollTrigger ──────────────────────────────────────────────
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: totalScroll,
        pin: pin,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // onRefresh: recalculate the stable height in case orientation changed
        onRefresh() {
          const h = getStableVh();
          pin.style.height = `${h}px`;
        },
      });

      // ── Animation timeline ─────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: totalScroll,
          scrub: true,         // instant 1:1 mapping — no lag on any platform
          invalidateOnRefresh: true,
        },
      });

      // 0.00–0.04  gold line appears
      tl.fromTo(
        goldLineRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.04, ease: "power2.out" },
        0
      );
      tl.fromTo(
        goldGlowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.04, ease: "power2.out" },
        0
      );

      // 0.04–0.14  curtains open
      tl.to(
        curtainLeftRef.current,
        { xPercent: -100, duration: 0.10, ease: "power3.inOut" },
        0.04
      );
      tl.to(
        curtainRightRef.current,
        { xPercent: 100, duration: 0.10, ease: "power3.inOut" },
        0.04
      );
      tl.to(
        goldLineRef.current,
        { opacity: 0, duration: 0.06, ease: "power2.in" },
        0.05
      );
      tl.to(
        goldGlowRef.current,
        { opacity: 0, duration: 0.06, ease: "power2.in" },
        0.05
      );

      // 0.14–0.76  image sequence
      tl.to(
        frameProxy,
        {
          value: FRAME_COUNT - 1,
          duration: 0.62,
          ease: "none",
          onUpdate() {
            requestDraw(Math.round(frameProxy.value));
          },
        },
        0.14
      );

      // 0.76–0.86  curtains close
      tl.to(
        curtainLeftRef.current,
        { xPercent: 0, duration: 0.10, ease: "power3.inOut" },
        0.76
      );
      tl.to(
        curtainRightRef.current,
        { xPercent: 0, duration: 0.10, ease: "power3.inOut" },
        0.76
      );

      // 0.86–0.90  gold line reappears
      tl.to(
        goldLineRef.current,
        { scaleY: 1, opacity: 1, duration: 0.04, ease: "power2.out" },
        0.86
      );
      tl.to(
        goldGlowRef.current,
        { opacity: 1, duration: 0.04, ease: "power2.out" },
        0.86
      );

      // 0.90–0.95  gold line fades out
      tl.to(
        goldLineRef.current,
        { opacity: 0, duration: 0.05, ease: "power2.in" },
        0.92
      );
      tl.to(
        goldGlowRef.current,
        { opacity: 0, duration: 0.05, ease: "power2.in" },
        0.92
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [requestDraw]);

  // ─── Resize / orientation-change handler ─────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      setupCanvasSize();
      if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current);
      // Recompute the stable height and refresh triggers when orientation changes
      if (pinContainerRef.current) {
        pinContainerRef.current.style.height = `${getStableVh()}px`;
      }
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize, { passive: true });
    // orientationchange fires on mobile before resize sometimes
    window.addEventListener("orientationchange", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [setupCanvasSize, drawFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        zIndex: 1,
        // Prevent overscroll bounce on iOS from interfering with the pin
        overscrollBehavior: "none",
        // Use dvh (dynamic viewport height) as CSS fallback where supported;
        // the JS stable height above overrides this once JS runs
        minHeight: "100dvh",
      }}
    >
      <div
        ref={pinContainerRef}
        className="relative w-full overflow-hidden"
        style={{
          height: "100dvh", // dvh = dynamic viewport height (accounts for mobile bars)
        }}
      >
        {/* Dark background */}
        <div
          className="absolute inset-0"
          style={{ background: "#0a0a0a", zIndex: 0 }}
        />

        {/* Canvas layer */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: "block" }}
          />
        </div>

        {/* Curtains + gold line */}
        <div
          className="absolute inset-0"
          style={{ zIndex: 2, pointerEvents: "none" }}
        >
          {/* Left curtain */}
          <div
            ref={curtainLeftRef}
            className="absolute top-0 left-0 h-full"
            style={{
              width: "50%",
              background: "#0a0a0a",
              willChange: "transform",
              // translateZ forces GPU compositing layer — critical on mobile
              transform: "translateZ(0)",
            }}
          />
          {/* Right curtain */}
          <div
            ref={curtainRightRef}
            className="absolute top-0 right-0 h-full"
            style={{
              width: "50%",
              background: "#0a0a0a",
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          />

          {/* Gold line */}
          <div
            ref={goldLineRef}
            className="absolute top-0 left-1/2"
            style={{
              width: "2px",
              height: "100%",
              marginLeft: "-1px",
              background:
                "linear-gradient(180deg, transparent 0%, #C4A968 15%, #E8D5A3 50%, #C4A968 85%, transparent 100%)",
              transformOrigin: "center",
              opacity: 0,
              willChange: "transform, opacity",
              transform: "translateZ(0)",
            }}
          />

          {/* Gold glow */}
          <div
            ref={goldGlowRef}
            className="absolute top-0 left-1/2"
            style={{
              width: "80px",
              height: "100%",
              marginLeft: "-40px",
              background:
                "radial-gradient(ellipse at center, rgba(196,169,104,0.15) 0%, transparent 70%)",
              opacity: 0,
              willChange: "opacity",
            }}
          />
        </div>
      </div>
    </section>
  );
}
