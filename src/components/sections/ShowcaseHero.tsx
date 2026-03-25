"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/animations/gsap";

export function ShowcaseHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const imageWrapper = imageWrapperRef.current;
      const image = imageRef.current;
      const overlay = overlayRef.current;
      const shimmer = shimmerRef.current;
      if (!container || !imageWrapper || !image || !overlay || !shimmer) return;

      // Parallax — image moves slower than scroll for depth
      gsap.fromTo(
        image,
        { yPercent: -5, scale: 1.1 },
        {
          yPercent: 5,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Overlay lightens as user scrolls into view
      gsap.fromTo(
        overlay,
        { opacity: 0.5 },
        {
          opacity: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // Shimmer sweep — luxury light pass
      gsap.fromTo(
        shimmer,
        { xPercent: -120 },
        {
          xPercent: 120,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: container,
            start: "top 50%",
            end: "center 20%",
            scrub: 2,
          },
        }
      );

      // Scale reveal — image card grows slightly as it comes into view
      gsap.fromTo(
        imageWrapper,
        { scale: 0.92 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            end: "top 20%",
            scrub: 1.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        marginTop: "-180px",
        paddingTop: "0",
        zIndex: 0,
      }}
    >
      {/* Cream arch overlay — creates seamless dome/arch from Section 1 */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          style={{ height: "clamp(100px, 15vw, 200px)" }}
          preserveAspectRatio="none"
        >
          <path
            d="M0 0H1440V80C1440 80 1280 200 720 200C160 200 0 80 0 80V0Z"
            fill="var(--background)"
          />
        </svg>
      </div>

      {/* Image section — full width rounded card */}
      <div className="relative px-3 sm:px-4 lg:px-6">
        <div
          ref={imageWrapperRef}
          className="relative w-full mx-auto overflow-hidden will-change-transform"
          style={{
            height: "clamp(450px, 75vh, 900px)",
            borderRadius: "0 0 32px 32px",
          }}
        >
          {/* Parallax inner image */}
          <div
            ref={imageRef}
            className="absolute will-change-transform"
            style={{
              inset: "-10%",
            }}
          >
            <Image
              src="/images/idol/first.jpg"
              alt="Lustorri signature necklace — handcrafted luxury jewelry"
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
          </div>

          {/* Dark overlay — fades on scroll */}
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          />

          {/* Shimmer light sweep */}
          <div
            ref={shimmerRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.08) 45%, rgba(196,169,104,0.12) 50%, rgba(255,255,255,0.08) 55%, transparent 65%)",
            }}
          />

          {/* Vignette for cinematic feel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 40%, rgba(0,0,0,0.35) 100%)",
            }}
          />

          {/* Top inner shadow for depth under the arch */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: "120px",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
