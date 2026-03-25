"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

// ============================================
// Section 2 — Curtain Reveal → Image Sequence → Curtain Close
// Same curtains open and close with gold line at seam
// ============================================

const FRAME_COUNT = 120;
const FRAME_PATH = "/images/showcase/ezgif-frame-";

function padFrame(n: number): string {
  return String(n).padStart(3, "0");
}
function frameSrc(index: number): string {
  return `${FRAME_PATH}${padFrame(index)}.png`;
}

export function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Single set of curtain refs (reused for open + close)
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);
  const goldGlowRef = useRef<HTMLDivElement>(null);


  const imagesRef = useRef<HTMLImageElement[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const currentFrameRef = useRef(-1);
  const rafIdRef = useRef(0);
  const canvasSizeRef = useRef({ w: 0, h: 0, dpr: 1 });


  const setupCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (canvasSizeRef.current.w === rect.width && canvasSizeRef.current.h === rect.height && canvasSizeRef.current.dpr === dpr) return;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvasSizeRef.current = { w: rect.width, h: rect.height, dpr };
    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctxRef.current = ctx; }
  }, []);

  const drawFrame = useCallback((index: number) => {
    const ctx = ctxRef.current;
    const img = imagesRef.current[index];
    if (!ctx || !img || !img.complete || !img.naturalWidth) return;
    const { w: cW, h: cH } = canvasSizeRef.current;
    if (!cW || !cH) return;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cW / cH;
    let dW: number, dH: number, dX: number, dY: number;
    if (ir > cr) { dH = cH; dW = cH * ir; dX = (cW - dW) / 2; dY = 0; }
    else { dW = cW; dH = cW / ir; dX = 0; dY = (cH - dH) / 2; }
    ctx.clearRect(0, 0, cW, cH);
    ctx.drawImage(img, dX, dY, dW, dH);
  }, []);

  const requestDraw = useCallback((index: number) => {
    if (index === currentFrameRef.current) return;
    currentFrameRef.current = index;
    cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => drawFrame(index));
  }, [drawFrame]);

  // Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      if (i === 1) {
        img.onload = () => { setupCanvasSize(); drawFrame(0); currentFrameRef.current = 0; };
      }
      images.push(img);
    }
    imagesRef.current = images;
    return () => cancelAnimationFrame(rafIdRef.current);
  }, [setupCanvasSize, drawFrame]);

  // GSAP — curtain open → frames → curtain close (same curtains)
  useEffect(() => {
    const frameProxy = { value: 0 };

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // 0.00–0.04  gold line appears
      // 0.04–0.14  curtains open
      // 0.14–0.76  image sequence
      // 0.76–0.86  curtains close
      // 0.86–0.90  gold line appears again
      // 0.90–0.95  gold line fades
      // 0.95–1.00  hold dark

      const totalScroll = "+=450%";

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: totalScroll,
        pin: pinContainerRef.current,
        pinSpacing: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: totalScroll,
          scrub: 1,
        },
      });

      // === INTRO: Gold line appears at center ===
      tl.fromTo(goldLineRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.04, ease: "power2.out" },
        0
      );
      tl.fromTo(goldGlowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.04, ease: "power2.out" },
        0
      );

      // === INTRO: Curtains split open ===
      // Left curtain: xPercent 0 → -100
      tl.to(curtainLeftRef.current,
        { xPercent: -100, duration: 0.10, ease: "power3.inOut" },
        0.04
      );
      // Right curtain: xPercent 0 → 100
      tl.to(curtainRightRef.current,
        { xPercent: 100, duration: 0.10, ease: "power3.inOut" },
        0.04
      );
      // Gold line fades as curtains part
      tl.to(goldLineRef.current,
        { opacity: 0, duration: 0.06, ease: "power2.in" },
        0.05
      );
      tl.to(goldGlowRef.current,
        { opacity: 0, duration: 0.06, ease: "power2.in" },
        0.05
      );

      // === IMAGE SEQUENCE ===
      tl.to(frameProxy, {
        value: FRAME_COUNT - 1,
        duration: 0.62,
        ease: "none",
        onUpdate: () => requestDraw(Math.round(frameProxy.value)),
      }, 0.14);

      // === OUTRO: Same curtains close back ===
      // Left curtain: -100 → 0
      tl.to(curtainLeftRef.current,
        { xPercent: 0, duration: 0.10, ease: "power3.inOut" },
        0.76
      );
      // Right curtain: 100 → 0
      tl.to(curtainRightRef.current,
        { xPercent: 0, duration: 0.10, ease: "power3.inOut" },
        0.76
      );

      // === OUTRO: Gold line reappears as curtains meet ===
      tl.to(goldLineRef.current,
        { scaleY: 1, opacity: 1, duration: 0.04, ease: "power2.out" },
        0.86
      );
      tl.to(goldGlowRef.current,
        { opacity: 1, duration: 0.04, ease: "power2.out" },
        0.86
      );

      // Gold line fades out
      tl.to(goldLineRef.current,
        { opacity: 0, duration: 0.05, ease: "power2.in" },
        0.92
      );
      tl.to(goldGlowRef.current,
        { opacity: 0, duration: 0.05, ease: "power2.in" },
        0.92
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [requestDraw]);

  // Resize
  useEffect(() => {
    const onResize = () => { setupCanvasSize(); if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setupCanvasSize, drawFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ zIndex: 1 }}
    >
      <div
        ref={pinContainerRef}
        className="relative w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Dark background */}
        <div className="absolute inset-0" style={{ background: "#0a0a0a", zIndex: 0 }} />

        {/* Canvas layer */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: "block" }} />
        </div>

        {/* Curtains + gold line (single layer, reused for open & close) */}
        <div className="absolute inset-0" style={{ zIndex: 2, pointerEvents: "none" }}>
          {/* Left curtain */}
          <div
            ref={curtainLeftRef}
            className="absolute top-0 left-0 h-full"
            style={{ width: "50%", background: "#0a0a0a" }}
          />
          {/* Right curtain */}
          <div
            ref={curtainRightRef}
            className="absolute top-0 right-0 h-full"
            style={{ width: "50%", background: "#0a0a0a" }}
          />

          {/* Gold line at center seam */}
          <div
            ref={goldLineRef}
            className="absolute top-0 left-1/2"
            style={{
              width: "2px",
              height: "100%",
              marginLeft: "-1px",
              background: "linear-gradient(180deg, transparent 0%, #C4A968 15%, #E8D5A3 50%, #C4A968 85%, transparent 100%)",
              transformOrigin: "center",
              opacity: 0,
            }}
          />

          {/* Gold glow behind the line */}
          <div
            ref={goldGlowRef}
            className="absolute top-0 left-1/2"
            style={{
              width: "80px",
              height: "100%",
              marginLeft: "-40px",
              background: "radial-gradient(ellipse at center, rgba(196,169,104,0.15) 0%, transparent 70%)",
              opacity: 0,
            }}
          />
        </div>
      </div>
    </section>
  );
}
