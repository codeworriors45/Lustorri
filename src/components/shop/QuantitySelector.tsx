"use client";

import { memo } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantitySelectorProps {
  /** Current quantity value */
  quantity: number;
  /** Callback when quantity changes */
  onQuantityChange: (newQuantity: number) => void;
  /** Minimum allowed quantity (default: 1) */
  min?: number;
  /** Maximum allowed quantity (default: 99) */
  max?: number;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const sizeStyles = {
  sm: {
    button: "w-8 h-8",
    text: "w-10 text-sm",
    icon: "w-3 h-3",
  },
  md: {
    button: "w-10 h-10",
    text: "w-12 text-base",
    icon: "w-4 h-4",
  },
  lg: {
    button: "w-12 h-12",
    text: "w-14 text-lg",
    icon: "w-5 h-5",
  },
} as const;

/**
 * Reusable quantity selector component
 * Used in cart, product pages, and checkout
 */
export const QuantitySelector = memo(function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  size = "md",
  disabled = false,
  className,
}: QuantitySelectorProps) {
  const styles = sizeStyles[size];

  const handleDecrement = () => {
    if (quantity > min && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center border border-border",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
        className={cn(
          styles.button,
          "flex items-center justify-center transition-colors",
          "hover:bg-muted disabled:hover:bg-transparent",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        <Minus className={styles.icon} />
      </button>
      <span
        className={cn(
          styles.text,
          "text-center font-sans font-medium select-none"
        )}
        aria-label={`Quantity: ${quantity}`}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
        className={cn(
          styles.button,
          "flex items-center justify-center transition-colors",
          "hover:bg-muted disabled:hover:bg-transparent",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        <Plus className={styles.icon} />
      </button>
    </div>
  );
});

QuantitySelector.displayName = "QuantitySelector";
