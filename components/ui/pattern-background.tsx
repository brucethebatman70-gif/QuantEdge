import { cn } from "@/lib/cn";

interface PatternBackgroundProps {
  variant?: "dots" | "lines" | "grid" | "cross" | "waves";
  className?: string;
  children?: React.ReactNode;
}

export function PatternBackground({
  variant = "dots",
  className,
  children,
}: PatternBackgroundProps) {
  const variantClass = {
    dots: "bg-pattern-dots",
    lines: "bg-pattern-lines",
    grid: "bg-pattern-grid",
    cross: "bg-pattern-cross",
    waves: "bg-pattern-waves",
  }[variant];

  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 opacity-40 dark:opacity-20", variantClass)}
      />
      {children && <div className="relative">{children}</div>}
    </div>
  );
}
