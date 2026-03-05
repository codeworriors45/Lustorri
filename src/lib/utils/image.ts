/**
 * Centralized image utilities for blur placeholders and shimmer effects
 */

/**
 * Creates an animated shimmer SVG placeholder
 * @param width - Width of the placeholder
 * @param height - Height of the placeholder
 * @param baseColor - Base background color (default: luxury cream)
 * @param shimmerColor - Shimmer highlight color
 */
export function createShimmerSvg(
  width: number,
  height: number,
  baseColor: string = "#f9f5ef",
  shimmerColor: string = "#f0ebe3"
): string {
  return `
<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="shimmer-gradient">
      <stop stop-color="${baseColor}" offset="0%" />
      <stop stop-color="${shimmerColor}" offset="50%" />
      <stop stop-color="${baseColor}" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="${baseColor}" />
  <rect id="shimmer-rect" width="${width}" height="${height}" fill="url(#shimmer-gradient)" />
  <animate xlink:href="#shimmer-rect" attributeName="x" from="-${width}" to="${width}" dur="1.5s" repeatCount="indefinite" />
</svg>`.trim();
}

/**
 * Converts a string to base64 (works in both server and client environments)
 */
export function toBase64(str: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(str).toString("base64");
  }
  return window.btoa(str);
}

/**
 * Creates a blur data URL for Next.js Image placeholder
 * @param width - Width of the placeholder
 * @param height - Height of the placeholder
 * @param animated - Whether to include shimmer animation
 */
export function createBlurDataURL(
  width: number = 400,
  height: number = 400,
  animated: boolean = true
): string {
  if (animated) {
    return `data:image/svg+xml;base64,${toBase64(createShimmerSvg(width, height))}`;
  }

  // Static blur placeholder
  const staticSvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" fill="#f9f9f9"/></svg>`;
  return `data:image/svg+xml;base64,${toBase64(staticSvg)}`;
}

/**
 * Pre-generated blur data URLs for common sizes
 */
export const BLUR_DATA_URLS = {
  square: createBlurDataURL(400, 400),
  squareStatic: createBlurDataURL(400, 400, false),
  product: createBlurDataURL(400, 500),
  hero: createBlurDataURL(1200, 600),
  thumbnail: createBlurDataURL(100, 100),
} as const;

/**
 * Default blur data URL for product images
 */
export const DEFAULT_BLUR_DATA_URL = BLUR_DATA_URLS.square;
