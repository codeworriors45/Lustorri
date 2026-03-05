import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // Primary - Lust Red filled
        primary: "bg-primary text-white hover:bg-primary/90",

        // Secondary - Gold/Champagne luxury style
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",

        // Gold - Luxury gold button
        gold: "bg-gold text-foreground hover:bg-gold/90",

        // Outline variants
        outline: "border border-border bg-transparent hover:bg-muted text-foreground",
        "outline-primary": "border border-primary bg-transparent text-primary hover:bg-primary hover:text-white",
        "outline-gold": "border border-gold bg-transparent text-gold hover:bg-gold hover:text-foreground",

        // Ghost - transparent with hover
        ghost: "bg-transparent hover:bg-muted text-foreground",

        // Link - text only
        link: "text-primary underline-offset-4 hover:underline bg-transparent",

        // Destructive
        destructive: "bg-destructive text-white hover:bg-destructive/90",

        // White - for dark backgrounds
        white: "bg-white text-foreground hover:bg-white/90",

        // Dark - for light backgrounds
        dark: "bg-foreground text-background hover:bg-foreground/90",
      },
      size: {
        xs: "h-8 px-3 text-xs",
        sm: "h-9 px-4 text-sm",
        default: "h-10 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-lg": "h-12 w-12 p-0",
      },
      rounded: {
        default: "rounded-md",
        sm: "rounded-sm",
        lg: "rounded-lg",
        full: "rounded-full",
        none: "rounded-none",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      uppercase: {
        true: "uppercase tracking-wider",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      rounded: "default",
      fullWidth: false,
      uppercase: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, fullWidth, uppercase, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, fullWidth, uppercase, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
