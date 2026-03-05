"use client";

import { memo } from "react";
import { Truck, Shield, RotateCcw, Lock, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TrustBadge {
  icon: LucideIcon;
  label: string;
  description?: string;
}

export interface TrustBadgesProps {
  /** Display variant */
  variant?: "compact" | "detailed" | "inline";
  /** Which badges to show */
  badges?: ("shipping" | "warranty" | "returns" | "secure")[];
  /** Additional CSS classes */
  className?: string;
  /** Icon color class (default: text-gold) */
  iconColor?: string;
}

const defaultBadges: Record<string, TrustBadge> = {
  shipping: {
    icon: Truck,
    label: "Free Shipping",
    description: "Free shipping on orders $500+",
  },
  warranty: {
    icon: Shield,
    label: "Lifetime Warranty",
    description: "Covered for life against defects",
  },
  returns: {
    icon: RotateCcw,
    label: "30-Day Returns",
    description: "Easy returns within 30 days",
  },
  secure: {
    icon: Lock,
    label: "Secure Checkout",
    description: "Your payment is encrypted",
  },
};

/**
 * Reusable trust badges component
 * Displays trust indicators for shipping, warranty, returns, security
 */
export const TrustBadges = memo(function TrustBadges({
  variant = "compact",
  badges = ["shipping", "warranty", "returns"],
  className,
  iconColor = "text-gold",
}: TrustBadgesProps) {
  const selectedBadges = badges.map((key) => ({
    key,
    ...defaultBadges[key],
  }));

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-6",
          className
        )}
      >
        {selectedBadges.map(({ key, icon: Icon, label }) => (
          <div key={key} className="flex items-center gap-2 text-muted-foreground">
            <Icon className={cn("w-4 h-4", iconColor)} />
            <span className="text-xs font-sans">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-3 gap-4",
          className
        )}
      >
        {selectedBadges.map(({ key, icon: Icon, label, description }) => (
          <div
            key={key}
            className="flex items-start gap-3 p-4 border border-border"
          >
            <Icon className={cn("w-6 h-6 shrink-0", iconColor)} />
            <div>
              <span className="block text-sm font-sans font-medium text-foreground">
                {label}
              </span>
              {description && (
                <span className="text-xs font-sans text-muted-foreground">
                  {description}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: compact variant
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-2 pt-6 border-t border-border",
        className
      )}
    >
      {selectedBadges.map(({ key, icon: Icon, label }) => (
        <div key={key} className="text-center">
          <Icon className={cn("w-5 h-5 mx-auto mb-1", iconColor)} />
          <span className="text-[10px] font-sans text-muted-foreground">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
});

TrustBadges.displayName = "TrustBadges";
