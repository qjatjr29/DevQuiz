import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const glassCardVariants = cva("rounded-2xl backdrop-blur-xl transition-all", {
  variants: {
    variant: {
      default: "glass-panel",
      solid: "bg-card border border-border",
      gradient:
        "bg-gradient-to-br from-card to-surface-highlight border border-border",
    },
    hover: {
      true: "card-hover cursor-pointer",
      false: "",
    },
    glow: {
      true: "shadow-neon",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    hover: false,
    glow: false,
  },
});

interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, hover, glow, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(glassCardVariants({ variant, hover, glow, className }))}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";
