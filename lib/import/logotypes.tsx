import type { FC, SVGProps } from "react";

type LogoComponent = FC<SVGProps<SVGSVGElement>>;

export const platformLogos: Record<string, { component: LogoComponent; bg: string }> = {
  mt4: {
    component: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect width="40" height="40" rx="8" fill="#2B579A" />
        <circle cx="20" cy="20" r="14" fill="none" stroke="white" strokeWidth="1.5" opacity="0.1" />
        <text x="13" y="27" textAnchor="middle" fill="white" fontSize="20" fontWeight="800" fontFamily="Arial, sans-serif">M</text>
        <text x="23" y="18" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif">T</text>
        <text x="28" y="18" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily="Arial, sans-serif">4</text>
      </svg>
    ),
    bg: "#2B579A",
  },
  mt5: {
    component: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect width="40" height="40" rx="8" fill="#1A3D7C" />
        <circle cx="20" cy="20" r="14" fill="none" stroke="white" strokeWidth="1.5" opacity="0.1" />
        <text x="13" y="27" textAnchor="middle" fill="white" fontSize="20" fontWeight="800" fontFamily="Arial, sans-serif">M</text>
        <text x="23" y="18" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif">T</text>
        <text x="28" y="18" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily="Arial, sans-serif">5</text>
      </svg>
    ),
    bg: "#1A3D7C",
  },
  tradingview: {
    component: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect width="40" height="40" rx="8" fill="#2196F3" />
        <path d="M26 12L17 27 12 18l6-4 4 6 4-8z" fill="white" />
        <circle cx="28" cy="13" r="1.5" fill="white" />
      </svg>
    ),
    bg: "#2196F3",
  },
  ctrader: {
    component: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect width="40" height="40" rx="8" fill="#00A78E" />
        <path d="M26 20c0 4.4-2.7 6-6 6s-6-3.6-6-6 2.7-6 6-6c2 0 3.5.7 4.6 1.8" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    bg: "#00A78E",
  },
  dxtrade: {
    component: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect width="40" height="40" rx="8" fill="#5C6BC0" />
        <text x="13" y="28" textAnchor="middle" fill="white" fontSize="20" fontWeight="800" fontFamily="Arial, sans-serif">D</text>
        <text x="27" y="28" textAnchor="middle" fill="white" fontSize="20" fontWeight="800" fontFamily="Arial, sans-serif">X</text>
      </svg>
    ),
    bg: "#5C6BC0",
  },
  matchtrader: {
    component: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect width="40" height="40" rx="8" fill="#7B1FA2" />
        <path d="M12 28V12l8 6-8 10z" fill="white" />
        <path d="M20 18l8-6v16l-8-10z" fill="white" opacity="0.7" />
      </svg>
    ),
    bg: "#7B1FA2",
  },
  ninjatrader: {
    component: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect width="40" height="40" rx="8" fill="#F57C00" />
        <path d="M14 28V12l6 8 6-8v16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="20" cy="14" r="2" fill="white" opacity="0.4" />
      </svg>
    ),
    bg: "#F57C00",
  },
  tradelocker: {
    component: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect width="40" height="40" rx="8" fill="#2E7D32" />
        <rect x="12" y="18" width="16" height="11" rx="2" fill="white" />
        <rect x="14" y="10" width="12" height="10" rx="6" fill="#2E7D32" stroke="white" strokeWidth="2" />
      </svg>
    ),
    bg: "#2E7D32",
  },
  binance: {
    component: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect width="40" height="40" rx="8" fill="#F3BA2F" />
        <g fill="white">
          <rect x="16" y="16" width="8" height="8" rx="1" />
          <rect x="20" y="20" width="8" height="8" rx="1" />
          <rect x="12" y="20" width="8" height="8" rx="1" />
          <rect x="16" y="12" width="8" height="8" rx="1" />
          <rect x="16" y="24" width="8" height="8" rx="1" opacity="0.5" />
          <rect x="24" y="16" width="8" height="8" rx="1" opacity="0.5" />
          <rect x="8" y="16" width="8" height="8" rx="1" opacity="0.5" />
          <rect x="16" y="8" width="8" height="8" rx="1" opacity="0.5" />
        </g>
      </svg>
    ),
    bg: "#F3BA2F",
  },
  bybit: {
    component: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect width="40" height="40" rx="8" fill="#1A1A2E" />
        <rect x="10" y="8" width="4" height="24" rx="1" fill="#F7A600" />
        <text x="18" y="26" fill="white" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">BY</text>
        <text x="28" y="26" fill="white" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">IT</text>
      </svg>
    ),
    bg: "#1A1A2E",
  },
  okx: {
    component: (props) => (
      <svg viewBox="0 0 40 40" fill="none" {...props}>
        <rect width="40" height="40" rx="8" fill="#0A0A0A" />
        <text x="20" y="27" textAnchor="middle" fill="white" fontSize="18" fontWeight="800" fontFamily="Arial, sans-serif">OKX</text>
      </svg>
    ),
    bg: "#0A0A0A",
  },
};
