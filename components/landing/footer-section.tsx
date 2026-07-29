"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { brand } from "@/config/brand";

const columns = [
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    label: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "/integrations" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help" },
      { label: "API", href: "/api" },
    ],
  },
  {
    label: "Community",
    links: [
      { label: "Discord", href: "/discord" },
      { label: "Forum", href: "/forum" },
      { label: "YouTube", href: "/youtube" },
      { label: "Twitter", href: "/twitter" },
    ],
  },
];

const newsletterBenefits = [
  "Product Updates",
  "AI Features",
  "Trading Education",
  "Platform Improvements",
  "Premium Insights",
];

export function FooterSection() {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  return (
    <footer className="relative px-6 pt-32 pb-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#00D4AA]/[0.008] blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground/40">
                Stay Ahead
              </span>
              <h3 className="mt-2 text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium leading-[1.15] tracking-[-0.01em]">
                Get product updates,<br />
                <span className="text-[#00D4AA]">trading insights, and more.</span>
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {newsletterBenefits.map((b) => (
                  <span
                    key={b}
                    className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.04] text-[9px] text-muted-foreground/50"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-[12px] text-foreground placeholder:text-muted-foreground/30 transition-all focus:outline-none focus:border-[#00D4AA]/30"
                />
                <button className="rounded-xl bg-[#00D4AA]/10 border border-[#00D4AA]/20 px-4 py-2.5 text-[12px] font-medium text-[#00D4AA]/80 hover:bg-[#00D4AA]/20 transition-all shrink-0">
                  Subscribe
                </button>
              </div>
              <p className="text-[9px] text-muted-foreground/30 mt-1.5">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((col) => (
            <div key={col.label}>
              <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-muted-foreground/40 block mb-3">
                {col.label}
              </span>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12px] text-muted-foreground/50 hover:text-foreground/70 transition-all duration-300 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-8 border-t border-white/[0.04]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground/40">
              <motion.span
                whileHover={{ scale: 1.02 }}
                className="font-medium tracking-[-0.02em] text-foreground/60"
              >
                {brand.name}
              </motion.span>
              <span className="hidden md:inline text-muted-foreground/20">·</span>
              <span>&copy; {new Date().getFullYear()} {brand.company}. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground/40">
              {[
                { label: "Privacy", href: "/legal/privacy" },
                { label: "Terms", href: "/legal/terms" },
                { label: "Security", href: "/legal/security" },
                { label: "Contact", href: "mailto:support@quantedge.io" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-foreground/60 transition-all duration-300 hover:translate-y-[-1px]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
