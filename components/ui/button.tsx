"use client";

import { type ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        destructive: "bg-error text-white hover:opacity-90",
        outline: "border border-input bg-transparent hover:bg-muted hover:text-foreground",
        secondary: "bg-muted text-foreground hover:opacity-80",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        premium:
          "bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg shadow-primary/25",
      },
      size: {
        xs: "h-7 px-2 text-xs rounded-md",
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-xs": "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, children, ...props }: ButtonProps) {
  const cls = cn(buttonVariants({ variant, size, className }));
  if (asChild) {
    return <button className={cls} {...props}>{children}</button>;
  }
  return (
    <motion.button
      className={cls}
      whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={{ scale: 0.97, transition: { duration: 0.08 } }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}

export { Button, buttonVariants };
