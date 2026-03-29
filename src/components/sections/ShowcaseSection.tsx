"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/animations/gsap";

const BAR_POSITIONS = [10, 30, 50, 70, 90];
const LAYERS_PER_LINE = 3; // glow + medium + core per vertical section
const FRAME_COUNT = 120;

function getFrameSrc(index: number): string {
  const num = String(Math.min(Math.max(index, 1), FRAME_COUNT)).padStart(3, "0");
  return `/images/showcase/ezgif-frame-${num}.png`;
}

// Stable viewport height — on mobile, 100vh changes when the address bar
// shows/hides. We snapshot window.innerHeight once and refresh via
// ScrollTrigger.refresh() so the pin height stays correct.
function getStableVh(): number {
  return typeof window !== "undefined" ? window.innerHeight : 0;
}

export function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const currentFrameRef = useRef(-1);
  const canvasSizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  // ─── Canvas size setup ──────────────────────────────────────────────────
  const setupCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Cap DPR at 1 on mobile, 2 on desktop — mobile GPU can't handle 3x+
    const isMobile = window.innerWidth < 768;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
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
    // alpha: false — opaque canvas is faster (no compositing with background)
    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxRef.current = ctx;
    }
  }, []);

  // ─── Synchronous frame draw ─────────────────────────────────────────────
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

  // ─── Draw only when frame actually changes (skip duplicate draws) ───────
  const requestDraw = useCallback(
    (index: number) => {
      if (index === currentFrameRef.current) return;
      currentFrameRef.current = index;
      drawFrame(index);
    },
    [drawFrame]
  );

  // ─── Preload images ─────────────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "sync";
      img.src = getFrameSrc(i);
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

  // ─── GSAP: Lines → Circles → Showcase → Reverse ────────────────────────
  useGSAP(() => {
    const frameProxy = { value: 0 };
    const pin = pinContainerRef.current;
    const section = sectionRef.current;
    if (!pin || !section) return;

    // Stable pixel height — avoids mobile address bar flicker
    const stableH = getStableVh();
    pin.style.height = `${stableH}px`;

    const isMobile = window.innerWidth < 768;
      // Mobile: shorter scroll distance — +=1200% requires too much touch
      // scrolling and creates more scroll events for the GPU to process.
      const totalScroll = isMobile ? "+=600%" : "+=1200%";

      const lines = gsap.utils.toArray(".gsap-line");
      const circles = gsap.utils.toArray(".gsap-circle");
      const showcaseEl = ".gsap-showcase";
      const ambientGlows = gsap.utils.toArray(".gsap-ambient-glow");

      // Single merged ScrollTrigger — two separate triggers (pin + timeline)
      // cause double recalculation on every scroll event. Merging halves the
      // per-frame overhead on mobile.
      // scrub: true on mobile — Lenis already smooths the scroll, adding
      // scrub delay creates "double smoothing" that reads as lag.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: totalScroll,
          pin: pin,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: isMobile ? true : 0.5,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
          onRefresh() {
            const h = getStableVh();
            pin.style.height = `${h}px`;
          },
        },
      });

      // ─── 1. Entry: Lines drop in ──────────────────────────────────────
      tl.fromTo(
        lines,
        { yPercent: -100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: (i: number) => Math.floor(i / LAYERS_PER_LINE) * 0.1,
          ease: "power2.out",
        }
      );

      // ─── 2. Converge to Center ────────────────────────────────────────
      // Mobile: use GPU-accelerated x transform (no layout reflow)
      // Desktop: use left for pixel-perfect positioning
      const parentW = pin.clientWidth;

      if (isMobile) {
        tl.to(
          lines,
          {
            x: (i: number) => {
              const pos = BAR_POSITIONS[Math.floor(i / LAYERS_PER_LINE)];
              return (parentW * 0.5) - (parentW * pos / 100);
            },
            duration: 1,
            ease: "power3.inOut",
          },
          "+=0.2"
        );
      } else {
        tl.to(
          lines,
          { left: "50%", duration: 1, ease: "power3.inOut" },
          "+=0.2"
        );
      }

      // ─── 3. Transform to Circles ──────────────────────────────────────
      tl.to(
        lines,
        { scaleY: 0, opacity: 0, duration: 0.6, ease: "power2.inOut", transformOrigin: "center center" },
        "+=0.2"
      );

      tl.fromTo(
        circles,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out", force3D: true },
        "<0.2"
      );

      // ─── 4. Zoom Out & Showcase Reveal ────────────────────────────────
      tl.to(
        circles,
        { scale: 10, opacity: 0, duration: 1.5, ease: "power2.inOut", force3D: true },
        "+=0.2"
      );

      // Immersive background fill flare as rings explode outward
      tl.to(
        ambientGlows,
        { scale: 1.5, opacity: 0.8, duration: 1.5, ease: "power2.out" },
        "<"
      );

      tl.fromTo(
        showcaseEl,
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
        "<0.3"
      );

      // ─── 5. Image Sequence Playback (scroll-driven) ───────────────────
      tl.to(
        frameProxy,
        {
          value: FRAME_COUNT - 1,
          duration: 3,
          ease: "none",
          onUpdate() {
            requestDraw(Math.round(frameProxy.value));
          },
        },
        "+=0.1"
      );

      // ─── 6. Hold Showcase (removed for instant responsive exit) ───────

      // ─── 7. EXIT: Showcase fades, circles zoom back in ───────────────
      tl.to(
        showcaseEl,
        { opacity: 0, scale: 1.2, duration: 1.5, ease: "power2.in" },
        "+=0.0"
      );

      // Immersive background fill recedes smoothly
      tl.to(
        ambientGlows,
        { scale: 1, opacity: 0.06, duration: 1.5, ease: "power2.inOut" },
        "<0.3"
      );

      tl.to(
        circles,
        { scale: 1, opacity: 1, duration: 1.5, stagger: -0.2, ease: "power2.inOut" },
        "<0"
      );

      // ─── 8. EXIT: Circles shrink, lines reappear at center ───────────
      tl.to(
        circles,
        { scale: 0, opacity: 0, duration: 1, stagger: -0.2, ease: "power2.in" },
        "+=0.2"
      );

      tl.to(
        lines,
        { scaleY: 1, opacity: 1, duration: 0.6, ease: "power2.inOut" },
        "<0.2"
      );

      // ─── 9. EXIT: Lines spread back to original positions ────────────
      if (isMobile) {
        // Reset x transform back to 0 — lines return to their CSS left positions
        tl.to(
          lines,
          { x: 0, duration: 1, ease: "power3.inOut" },
          "+=0.2"
        );
      } else {
        tl.to(
          lines,
          {
            left: (i: number) => `${BAR_POSITIONS[Math.floor(i / LAYERS_PER_LINE)]}%`,
            duration: 1,
            ease: "power3.inOut",
          },
          "+=0.2"
        );
      }

      // ─── 10. EXIT: Lines slide up and fade out ───────────────────────
      tl.to(
        lines,
        {
          yPercent: -100,
          opacity: 0,
          duration: 1,
          stagger: (i: number) => (4 - Math.floor(i / LAYERS_PER_LINE)) * 0.1,
          ease: "power2.in",
        },
        "+=0.2"
      );
  }, { scope: sectionRef, dependencies: [requestDraw] });

  // ─── Resize / orientation-change handler ────────────────────────────────
  // Debounced — on mobile, the URL bar show/hide fires resize events dozens
  // of times per second during scroll. Calling ScrollTrigger.refresh() on
  // each one bypasses ignoreMobileResize and forces full page recalculation
  // mid-animation. We wait 200ms after resizing stops before refreshing.
  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const onResize = () => {
      // Canvas + pin height can update immediately (cheap operations)
      setupCanvasSize();
      if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current);
      if (pinContainerRef.current) {
        pinContainerRef.current.style.height = `${getStableVh()}px`;
      }

      // Debounce the expensive ScrollTrigger.refresh()
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [setupCanvasSize, drawFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        zIndex: 1,
        overscrollBehavior: "none",
        minHeight: "100dvh",
        // Prevent horizontal swipe gestures from interfering with vertical scroll pin
        touchAction: "pan-y",
      }}
    >
      <div
        ref={pinContainerRef}
        className="relative w-full overflow-hidden bg-[#0A0A0A]"
        style={{
          height: "100dvh",
        }}
      >
        {/* Subtle ambient noise texture overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "repeating-conic-gradient(rgba(212,175,55,0.015) 0% 25%, transparent 0% 50%) 0 0 / 4px 4px",
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* Ambient radial warm glow */}
        <div
          className="gsap-ambient-glow absolute inset-0 z-[1]"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(196,169,104,0.06) 0%, rgba(196,169,104,0.02) 30%, transparent 65%)",
            pointerEvents: "none",
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        />

        {/* Floor reflection glow */}
        <div
          className="gsap-ambient-glow absolute bottom-0 left-0 w-full z-[1]"
          style={{
            height: "35%",
            background: "radial-gradient(ellipse at 50% 100%, rgba(196,169,104,0.08) 0%, rgba(140,120,70,0.03) 40%, transparent 70%)",
            pointerEvents: "none",
            transformOrigin: "bottom center",
            willChange: "transform, opacity",
          }}
        />

        {/* Showcase Canvas (Bottom Layer) — 120 frame sequence */}
        <div
          className="gsap-showcase absolute inset-0 w-full h-full opacity-0 origin-center z-[2]"
          style={{ willChange: "transform, opacity" }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: "block" }}
          />
        </div>

        {/* Animation GUI Layer (Top Layer) */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">

          {/* 5 Vertical Gold/Cream Lines — with glow layers
              Mobile: blur filters are removed — they force expensive per-frame
              repaints during scroll. Instead we use wider/softer gradient widths
              and lower opacity to simulate the glow without filter: blur(). */}
          {BAR_POSITIONS.map((pos, i) => {
            const mobile = typeof window !== "undefined" && window.innerWidth < 768;
            return (
            <React.Fragment key={i}>
              {/* Wide soft glow behind each line */}
              <div
                className="gsap-line absolute top-0 h-full"
                style={{
                  left: `${pos}%`,
                  width: mobile ? "40px" : "30px",
                  marginLeft: mobile ? "-20px" : "-15px",
                  background: mobile
                    ? "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)"
                    : "linear-gradient(180deg, rgba(212,175,55,0.12) 0%, rgba(245,230,200,0.06) 50%, rgba(212,175,55,0.12) 100%)",
                  filter: mobile ? undefined : "blur(8px)",
                }}
              />
              {/* Medium glow */}
              <div
                className="gsap-line absolute top-0 h-full"
                style={{
                  left: `${pos}%`,
                  width: mobile ? "12px" : "8px",
                  marginLeft: mobile ? "-6px" : "-4px",
                  background: mobile
                    ? "linear-gradient(180deg, rgba(212,175,55,0.25) 0%, rgba(245,230,200,0.15) 50%, rgba(212,175,55,0.25) 100%)"
                    : "linear-gradient(180deg, rgba(212,175,55,0.4) 0%, rgba(245,230,200,0.25) 50%, rgba(212,175,55,0.4) 100%)",
                  filter: mobile ? undefined : "blur(3px)",
                }}
              />
              {/* Core bright line */}
              <div
                className="gsap-line absolute top-0 h-full"
                style={{
                  left: `${pos}%`,
                  width: "2px",
                  marginLeft: "-1px",
                  background: "linear-gradient(180deg, #b8944e 0%, #f5e6c8 20%, #fffaf0 50%, #f5e6c8 80%, #b8944e 100%)",
                  boxShadow: mobile ? "0 0 4px rgba(245,230,200,0.4)" : "0 0 6px rgba(245,230,200,0.5), 0 0 15px rgba(212,175,55,0.3)",
                }}
              />
            </React.Fragment>
            );
          })}

          {/* Circular Cream/Gold Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">

            {/* Ring ambient glow */}
            <div
              className="gsap-circle absolute rounded-full opacity-0"
              style={{
                width: "500px",
                height: "500px",
                background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(196,169,104,0.05) 40%, transparent 70%)",
              }}
            />

            {/* Outer Gold Ring */}
            <div
              className="gsap-circle absolute rounded-full opacity-0"
              style={{
                width: "400px",
                height: "400px",
                border: "3px solid rgba(212,175,55,0.7)",
                boxShadow:
                  "0 0 15px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.15), 0 0 80px rgba(196,169,104,0.08), inset 0 0 15px rgba(212,175,55,0.1), inset 0 0 40px rgba(196,169,104,0.05)",
              }}
            />

            {/* Inner Cream/White Ring */}
            <div
              className="gsap-circle absolute rounded-full opacity-0"
              style={{
                width: "300px",
                height: "300px",
                border: "2px solid rgba(245,230,200,0.85)",
                boxShadow:
                  "0 0 12px rgba(245,230,200,0.5), 0 0 30px rgba(245,230,200,0.2), 0 0 60px rgba(212,175,55,0.1), inset 0 0 12px rgba(245,230,200,0.15), inset 0 0 30px rgba(212,175,55,0.05)",
              }}
            />
          </div>

        </div>

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 z-[11] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </div>
    </section>
  );
}
