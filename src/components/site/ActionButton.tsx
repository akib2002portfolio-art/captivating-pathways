import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export const actionVariants = cva(
  "group inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        signal:
          "bg-signal text-primary-foreground hover:brightness-110 hover:-translate-y-0.5 shadow-[0_10px_30px_-16px_var(--signal)]",
        outline: "border border-border text-foreground hover:border-signal hover:text-signal",
        ghost: "text-muted-foreground hover:text-foreground",
        paper: "bg-paper text-ink hover:brightness-95",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-md",
        md: "h-11 px-6 text-sm rounded-md",
        lg: "h-14 px-8 text-base rounded-md",
      },
    },
    defaultVariants: { variant: "signal", size: "md" },
  },
);

type Common = VariantProps<typeof actionVariants> & { className?: string; children: ReactNode };

export function ActionButton({
  variant,
  size,
  className,
  ...props
}: Common & ComponentProps<"button">) {
  return <button className={cn(actionVariants({ variant, size }), className)} {...props} />;
}

export function ActionLink({
  variant,
  size,
  className,
  to,
  ...props
}: Common & { to: string } & Omit<ComponentProps<typeof Link>, "to">) {
  return (
    <Link
      to={to}
      className={cn(actionVariants({ variant, size }), className)}
      {...(props as Record<string, unknown>)}
    />
  );
}
