"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

export interface DiamondPatternProps {
  /** Unique ID for the pattern (required for multiple instances) */
  id: string;
  /** Pattern color (default: #C4A968 gold) */
  color?: string;
  /** Pattern opacity (default: 0.03) */
  opacity?: number;
  /** Pattern size (default: 80) */
  patternSize?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Decorative diamond pattern background
 * Used for luxury section backgrounds
 */
export const DiamondPattern = memo(function DiamondPattern({
  id,
  color = "#C4A968",
  opacity = 0.03,
  patternSize = 80,
  className,
}: DiamondPatternProps) {
  const patternId = `diamond-pattern-${id}`;
  const halfSize = patternSize / 2;
  const quarterSize = patternSize / 4;
  const eighthSize = patternSize / 8;

  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={patternSize}
            height={patternSize}
            patternUnits="userSpaceOnUse"
          >
            {/* Vertical diamond */}
            <path
              d={`M${halfSize} 0 L${halfSize + eighthSize} ${quarterSize} L${halfSize} ${halfSize} L${halfSize - eighthSize} ${quarterSize} Z`}
              fill={color}
            />
            {/* Horizontal diamond */}
            <path
              d={`M0 ${halfSize} L${quarterSize} ${halfSize - eighthSize} L${halfSize} ${halfSize} L${quarterSize} ${halfSize + eighthSize} Z`}
              fill={color}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
});

DiamondPattern.displayName = "DiamondPattern";
