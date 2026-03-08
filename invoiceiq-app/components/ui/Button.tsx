import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-[14px] font-medium h-[40px] px-[16px] transition-all duration-150 ease-in-out disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-brand-primary text-white hover:bg-brand-hover shadow-sm",
      secondary: "bg-surface text-ink border border-border hover:bg-canvas shadow-sm",
      ghost: "bg-transparent text-slate hover:bg-canvas hover:text-ink",
      danger: "bg-danger text-white hover:bg-danger/90 shadow-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";