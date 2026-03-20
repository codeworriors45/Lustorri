"use client";

import { useState, useRef, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  lowQualitySrc?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  enableBlur?: boolean;
}

// Simple shimmer placeholder for blur effect
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

export function OptimizedImage({
  src,
  alt,
  className,
  aspectRatio = "auto",
  enableBlur = true,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true); // eslint-disable-line react-hooks/set-state-in-effect
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before image enters viewport
        threshold: 0,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    auto: "",
  }[aspectRatio];

  return (
    <div
      ref={imgRef}
      className={cn(
        "relative overflow-hidden bg-muted/30",
        aspectRatioClass,
        className
      )}
    >
      {isInView ? (
        <>
          <Image
            src={src}
            alt={alt}
            className={cn(
              "transition-opacity duration-500",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsLoaded(true)}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            placeholder={enableBlur ? "blur" : "empty"}
            blurDataURL={enableBlur ? `data:image/svg+xml;base64,${toBase64(shimmer(700, 700))}` : undefined}
            {...props}
          />
          {/* Loading shimmer overlay */}
          {!isLoaded && enableBlur && (
            <div
              className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted/30 via-muted/60 to-muted/30"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite linear",
              }}
            />
          )}
        </>
      ) : (
        // Placeholder while not in view
        <div className="absolute inset-0 bg-muted/30" />
      )}
    </div>
  );
}

// Lightweight version for product cards - uses native lazy loading
export function ProductImage({
  src,
  alt,
  className,
  fill = true,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  priority = false,
  ...props
}: Omit<ImageProps, "onLoad">) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted/20", className)}>
      <Image
        src={hasError ? "/images/products/jewelry-isolated.png" : src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "object-cover transition-all duration-500",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 400))}`}
        {...props}
      />
      {/* Shimmer while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20 animate-shimmer" />
      )}
    </div>
  );
}
