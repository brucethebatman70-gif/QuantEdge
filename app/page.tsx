"use client";

import { OpeningSection } from "@/components/landing/opening-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { RealProblemSection } from "@/components/landing/real-problem-section";
import { PlatformSection } from "@/components/landing/platform-section";
import { DashboardShowcase } from "@/components/landing/dashboard-showcase";
import { ExperienceSection } from "@/components/landing/experience-section";
import { AICopilotSection } from "@/components/landing/ai-copilot-section";
import { TransformationSection } from "@/components/landing/transformation-section";
import { AudienceSection } from "@/components/landing/audience-section";
import { CTASection } from "@/components/landing/cta-section";
import { AmbientBackground } from "@/components/ui/ambient-background";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen">
      <OpeningSection />
      <ProblemSection />
      <RealProblemSection />
      <AmbientBackground variant="primary" className="top-1/2 h-1/2" />
      <PlatformSection />
      <DashboardShowcase />
      <ExperienceSection />
      <AmbientBackground variant="ai" className="top-1/3 h-1/2" />
      <AICopilotSection />
      <TransformationSection />
      <AudienceSection />
      <CTASection />
    </main>
  );
}
