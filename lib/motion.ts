import type { Variants, Transition, SpringOptions, TargetAndTransition } from "framer-motion";

/* ── Easings ── */
export const easings = {
  enter: [0.22, 1, 0.36, 1] as [number, number, number, number],
  hover: [0.16, 1, 0.3, 1] as [number, number, number, number],
  exit: [0.4, 0, 1, 1] as [number, number, number, number],
  micro: { type: "spring" as const, stiffness: 400, damping: 25 },
};

/* ── Spring Presets ── */
export const springs = {
  micro: { type: "spring" as const, stiffness: 400, damping: 25, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 },
  bouncy: { type: "spring" as const, stiffness: 350, damping: 20, mass: 0.6 },
  gentle: { type: "spring" as const, stiffness: 200, damping: 35, mass: 1 },
  snap: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

/* ── Transition Builders ── */
type Durations = {
  instant?: number;
  fast?: number;
  normal?: number;
  slow?: number;
  deliberate?: number;
};

export const duration: Durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  deliberate: 0.7,
};

export function enter(delay = 0, dur = duration.normal): Transition {
  return { duration: dur, ease: easings.enter, delay };
}

export function exit(dur = duration.normal): Transition {
  return { duration: dur, ease: easings.exit };
}

export function hover(dur = duration.fast): Transition {
  return { duration: dur, ease: easings.hover };
}

/* ── Stagger ── */
export function stagger(interval = 0.04): Transition {
  return { staggerChildren: interval, delayChildren: 0 };
}

export function staggerItem(delay = 0, dir: "up" | "down" | "left" | "right" = "up"): Variants {
  const offset = dir === "up" ? 16 : dir === "down" ? -16 : dir === "left" ? 16 : -16;
  return {
    hidden: { opacity: 0, y: dir === "up" || dir === "down" ? offset : 0, x: dir === "left" || dir === "right" ? offset : 0, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, x: 0, filter: "blur(0px)", transition: enter(delay) },
  };
}

/* ── Variant Factories ── */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: enter() },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: enter() },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: enter() },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: enter() },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: enter() },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: enter() },
};

export const scaleOut: Variants = {
  hidden: { opacity: 1, scale: 1, filter: "blur(0px)" },
  visible: { opacity: 0, scale: 0.96, filter: "blur(8px)", transition: exit() },
};

/* ── Card Animations ── */
export const cardEnter: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: enter(0, 0.5) },
};

export const cardHover: TargetAndTransition = {
  y: -4,
  scale: 1.015,
  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  transition: hover(),
};

export const cardTap: TargetAndTransition = {
  scale: 0.985,
  transition: { duration: 0.05 },
};

/* ── Page Transitions ── */
export const pageExit: Variants = {
  hidden: { opacity: 0, scale: 0.98, filter: "blur(4px)", transition: exit(0.3) },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: enter(0, 0.35) },
};

export const pageEnter: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: enter() },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, scale: 1 },
  animate: { opacity: 1, scale: 1, transition: enter(0, 0.35) },
  exit: { opacity: 0, scale: 0.98, filter: "blur(4px)", transition: exit(0.25) },
};

/* ── Button Animations ── */
export const buttonHover: TargetAndTransition = {
  scale: 1.02,
  transition: { duration: 0.2, ease: easings.hover },
};

export const buttonTap: TargetAndTransition = {
  scale: 0.97,
  transition: { duration: 0.08, ease: easings.exit },
};

/* ── Sidebar Animations ── */
export const sidebarItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: enter() },
  hover: { x: 4, transition: { duration: 0.2, ease: easings.hover } },
};

export const sidebarIndicator: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { scaleY: 1, opacity: 1, transition: { duration: 0.35, ease: easings.enter } },
};

/* ── Table Row ── */
export const rowEnter: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: enter(i * 0.015) }),
};

/* ── Counter ── */
export const counterEnter: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: enter(0, 0.4) },
};

/* ── Modal ── */
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: enter() },
  exit: { opacity: 0, transition: exit() },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: enter(0, 0.4) },
  exit: { opacity: 0, scale: 0.96, y: -10, filter: "blur(4px)", transition: exit(0.2) },
};

/* ── Drawer ── */
export const drawerOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: enter() },
  exit: { opacity: 0, transition: exit(0.15) },
};

export const drawerContent: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.4, ease: easings.enter } },
  exit: { x: "100%", transition: { duration: 0.25, ease: easings.exit } },
};

/* ── Tooltip ── */
export const tooltipEnter: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(2px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.15, ease: easings.enter } },
};

/* ── Command Palette / Search ── */
export const searchOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: easings.enter } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: easings.exit } },
};

export const searchContent: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(4px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: enter(0, 0.3) },
  exit: { opacity: 0, scale: 0.96, filter: "blur(4px)", transition: exit(0.15) },
};

/* ── Scroll Reveal ── */
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: enter(0, 0.5) },
};

export const scrollRevealChildren: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: enter() },
};

/* ── Skeleton / Shimmer ── */
export const shimmer: Variants = {
  initial: { backgroundPosition: "200% 0" },
  animate: { backgroundPosition: "-200% 0", transition: { duration: 1.5, repeat: Infinity, ease: "linear" } },
};

/* ── Micro Interactions ── */
export const microHover: TargetAndTransition = {
  scale: 1.02,
  transition: springs.micro,
};

export const microTap: TargetAndTransition = {
  scale: 0.97,
  transition: { duration: 0.05 },
};

export const microFocus: TargetAndTransition = {
  boxShadow: "0 0 0 2px var(--ring)",
  transition: { duration: 0.15 },
};

/* ── Success / Error pulse ── */
export const pulseRing: Variants = {
  hidden: { scale: 0.8, opacity: 0.6 },
  visible: { scale: 2, opacity: 0, transition: { duration: 0.8, ease: easings.exit, repeat: Infinity } },
};

/* ── Stagger Container Component Props ── */
export function staggerContainer(interval = 0.04, delayFirst = 0): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: interval, delayChildren: delayFirst },
    },
  };
}

/* ── Progress bar ── */
export const progressFill: Variants = {
  hidden: { scaleX: 0, transformOrigin: "left" },
  visible: (val: number) => ({
    scaleX: val / 100,
    transition: { duration: 0.8, ease: easings.enter, delay: 0.2 },
  }),
};

/* ── Tooltip arrow ── */
export const tooltipArrow: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.15, delay: 0.05 } },
};

export const motionConfig = {
  default: { transition: enter() },
  reduced: { transition: { duration: 0.01 } },
};
