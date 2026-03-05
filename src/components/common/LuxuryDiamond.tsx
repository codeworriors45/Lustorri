"use client";

import { memo } from "react";

export interface LuxuryDiamondProps {
  /** CSS class name for styling */
  className?: string;
  /** Unique ID prefix for gradients (prevents SVG conflicts) */
  id?: string;
  /** Primary gradient colors */
  colors?: {
    light?: string;
    mid?: string;
    dark?: string;
  };
}

const defaultColors = {
  light: "#E8D5B7",
  mid: "#C4A968",
  dark: "#B8976A",
};

/**
 * Luxury diamond icon SVG component - Brilliant Cut
 * Centralized to avoid duplication across the application
 */
export const LuxuryDiamond = memo(function LuxuryDiamond({
  className = "",
  id = "diamond",
  colors = defaultColors,
}: LuxuryDiamondProps) {
  const lightGradId = `${id}-light`;
  const midGradId = `${id}-mid`;
  const darkGradId = `${id}-dark`;

  const c = { ...defaultColors, ...colors };

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={lightGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="100%" stopColor={c.mid} />
        </linearGradient>
        <linearGradient id={midGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
        <linearGradient id={darkGradId} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={c.dark} />
          <stop offset="100%" stopColor="#9A7B5A" />
        </linearGradient>
      </defs>

      {/* Table - top flat surface */}
      <polygon points="35,20 65,20 72,28 28,28" fill={`url(#${lightGradId})`} />

      {/* Crown left facet */}
      <polygon points="10,38 28,28 35,20 20,25" fill={`url(#${midGradId})`} />

      {/* Crown right facet */}
      <polygon points="90,38 72,28 65,20 80,25" fill={`url(#${darkGradId})`} />

      {/* Crown front left */}
      <polygon points="28,28 45,40 35,40 10,38" fill={c.mid} />

      {/* Crown front center */}
      <polygon points="28,28 72,28 55,40 45,40" fill={`url(#${lightGradId})`} />

      {/* Crown front right */}
      <polygon points="72,28 90,38 65,40 55,40" fill={c.dark} />

      {/* Pavilion left facet */}
      <polygon points="10,38 35,40 50,85" fill={`url(#${midGradId})`} />

      {/* Pavilion center-left */}
      <polygon points="35,40 45,40 50,85" fill={c.light} />

      {/* Pavilion center */}
      <polygon points="45,40 55,40 50,85" fill={`url(#${lightGradId})`} />

      {/* Pavilion center-right */}
      <polygon points="55,40 65,40 50,85" fill={c.mid} />

      {/* Pavilion right facet */}
      <polygon points="65,40 90,38 50,85" fill={`url(#${darkGradId})`} />

      {/* Highlight on table */}
      <polygon points="38,22 55,22 60,26 33,26" fill="white" opacity="0.4" />

      {/* Outline */}
      <polygon
        points="35,20 65,20 80,25 90,38 65,40 55,40 50,85 45,40 35,40 10,38 20,25"
        fill="none"
        stroke={c.dark}
        strokeWidth="0.8"
      />
    </svg>
  );
});

LuxuryDiamond.displayName = "LuxuryDiamond";
