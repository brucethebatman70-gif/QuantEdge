"use client";

import { cn } from "@/lib/cn";

interface PasswordStrengthProps {
  password: string;
}

function getStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score += 25;
  if (password.length >= 12) score += 10;
  if (/[A-Z]/.test(password)) score += 20;
  if (/[a-z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^A-Za-z0-9]/.test(password)) score += 15;

  if (score < 30) return { score, label: "Weak", color: "bg-error" };
  if (score < 50) return { score, label: "Fair", color: "bg-warning" };
  if (score < 70) return { score, label: "Good", color: "bg-info" };
  if (score < 85) return { score, label: "Strong", color: "bg-success" };
  return { score: 100, label: "Very Strong", color: "bg-success" };
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) return null;
  const { score, label, color } = getStrength(password);

  return (
    <div className="space-y-1">
      <div
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Password strength: ${label}`}
        className="flex gap-1"
      >
        {[1, 2, 3, 4].map((segment) => (
          <div
            key={segment}
            className={cn(
              "h-1 flex-1 rounded-full bg-muted transition-all duration-300",
              score >= segment * 25 && color
            )}
          />
        ))}
      </div>
      <p className={cn("text-[10px] font-medium", score < 30 ? "text-error" : score < 50 ? "text-warning" : score < 70 ? "text-info" : "text-success")}>
        {label}
      </p>
    </div>
  );
}