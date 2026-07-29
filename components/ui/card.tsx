"use client";

import type { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.015, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={{ scale: 0.985, transition: { duration: 0.05 } }}
      className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}
    >
      {children}
    </motion.div>
  );
}

function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
}

function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
