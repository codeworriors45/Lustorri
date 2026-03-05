/**
 * Centralized formatting utilities
 */

export type CurrencyCode = "USD" | "INR" | "EUR" | "GBP";

export interface CurrencyConfig {
  code: CurrencyCode;
  locale: string;
  symbol: string;
}

/**
 * Available currency configurations
 */
export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: "USD", locale: "en-US", symbol: "$" },
  INR: { code: "INR", locale: "en-IN", symbol: "₹" },
  EUR: { code: "EUR", locale: "de-DE", symbol: "€" },
  GBP: { code: "GBP", locale: "en-GB", symbol: "£" },
} as const;

/**
 * Default currency for the application
 */
export const DEFAULT_CURRENCY: CurrencyCode = "USD";

/**
 * Formats a price with the specified currency
 * @param price - The price to format
 * @param currency - Currency code (default: USD)
 * @param showDecimals - Whether to show decimal places
 */
export function formatPrice(
  price: number,
  currency: CurrencyCode = DEFAULT_CURRENCY,
  showDecimals: boolean = false
): string {
  const config = CURRENCIES[currency];

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(price);
}

/**
 * Formats a number with locale-specific separators
 * @param value - The number to format
 * @param locale - Locale string (default: en-US)
 */
export function formatNumber(
  value: number,
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Calculates discount percentage
 * @param originalPrice - Original price
 * @param salePrice - Discounted price
 * @returns Discount percentage rounded to nearest integer
 */
export function calculateDiscount(
  originalPrice: number,
  salePrice: number
): number {
  if (originalPrice <= 0 || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Formats a date in a human-readable format
 * @param date - Date to format
 * @param locale - Locale string
 */
export function formatDate(
  date: Date | string,
  locale: string = "en-US"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
}

/**
 * Truncates text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Pluralizes a word based on count
 * @param count - Number to check
 * @param singular - Singular form
 * @param plural - Plural form (optional, defaults to singular + 's')
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}
