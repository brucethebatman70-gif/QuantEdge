import { useEffect, useState, useRef } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  delay?: number;
  enabled?: boolean;
}

const easeOutQuad = (t: number) => t * (2 - t);

export function useCountUp({ end, duration = 1.2, delay = 0, enabled = true }: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (!enabled) { setValue(end); return; }

    const startDelay = setTimeout(() => {
      startTimeRef.current = performance.now();

      const animate = (now: number) => {
        const elapsed = (now - startTimeRef.current) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuad(progress);
        setValue(eased * end);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, delay, enabled]);

  return value;
}

export function formatCount(value: number, prefix = "", suffix = "", decimals = 0): string {
  return `${prefix}${value.toFixed(decimals)}${suffix}`;
}
