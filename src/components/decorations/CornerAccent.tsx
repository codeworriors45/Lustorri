"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

export type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface CornerAccentProps {
  /** Which corner to render */
  position: CornerPosition;
  /** Size of the accent container */
  size?: "sm" | "md" | "lg";
  /** Line color class (default: gold/50) */
  colorClass?: string;
  /** Additional CSS classes */
  className?: string;
}

const sizeStyles = {
  sm: {
    container: "w-24 h-24",
    offset: "8",
    lineLength: "w-16",
  },
  md: {
    container: "w-40 h-40",
    offset: "8",
    lineLength: "w-24",
  },
  lg: {
    container: "w-56 h-56",
    offset: "12",
    lineLength: "w-32",
  },
} as const;

const positionStyles: Record<CornerPosition, {
  container: string;
  horizontal: string;
  vertical: string;
  gradientH: string;
  gradientV: string;
}> = {
  "top-left": {
    container: "top-0 left-0",
    horizontal: "top-8 left-8",
    vertical: "top-8 left-8",
    gradientH: "bg-linear-to-r from-gold/50 to-transparent",
    gradientV: "bg-linear-to-b from-gold/50 to-transparent",
  },
  "top-right": {
    container: "top-0 right-0",
    horizontal: "top-8 right-8",
    vertical: "top-8 right-8",
    gradientH: "bg-linear-to-l from-gold/50 to-transparent",
    gradientV: "bg-linear-to-b from-gold/50 to-transparent",
  },
  "bottom-left": {
    container: "bottom-0 left-0",
    horizontal: "bottom-8 left-8",
    vertical: "bottom-8 left-8",
    gradientH: "bg-linear-to-r from-gold/50 to-transparent",
    gradientV: "bg-linear-to-t from-gold/50 to-transparent",
  },
  "bottom-right": {
    container: "bottom-0 right-0",
    horizontal: "bottom-8 right-8",
    vertical: "bottom-8 right-8",
    gradientH: "bg-linear-to-l from-gold/50 to-transparent",
    gradientV: "bg-linear-to-t from-gold/50 to-transparent",
  },
};

/**
 * Decorative corner accent with gold gradient lines
 * Used for luxury section decorations
 */
export const CornerAccent = memo(function CornerAccent({
  position,
  size = "md",
  className,
}: CornerAccentProps) {
  const sizeConfig = sizeStyles[size];
  const positionConfig = positionStyles[position];

  return (
    <div
      className={cn(
        "absolute",
        sizeConfig.container,
        positionConfig.container,
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute",
          sizeConfig.lineLength,
          "h-[1px]",
          positionConfig.horizontal,
          positionConfig.gradientH
        )}
      />
      <div
        className={cn(
          "absolute",
          "w-[1px]",
          sizeConfig.lineLength.replace("w-", "h-"),
          positionConfig.vertical,
          positionConfig.gradientV
        )}
      />
    </div>
  );
});

CornerAccent.displayName = "CornerAccent";

/**
 * Renders corner accents for all four corners
 */
export interface CornerAccentsProps {
  /** Which corners to show */
  corners?: CornerPosition[];
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

export const CornerAccents = memo(function CornerAccents({
  corners = ["top-left", "top-right"],
  size = "md",
}: CornerAccentsProps) {
  return (
    <>
      {corners.map((position) => (
        <CornerAccent key={position} position={position} size={size} />
      ))}
    </>
  );
});

CornerAccents.displayName = "CornerAccents";
