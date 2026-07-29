"use client";

import { OpeningSection } from "@/components/landing/opening-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { RealProblemSection } from "@/components/landing/real-problem-section";
import { PlatformSection } from "@/components/landing/platform-section";
import { DashboardShowcase } from "@/components/landing/dashboard-showcase";
import { ExperienceSection } from "@/components/landing/experience-section";
import { AICopilotSection } from "@/components/landing/ai-copilot-section";
import { JournalShowcase } from "@/components/landing/journal-showcase";
import { AnalyticsShowcase } from "@/components/landing/analytics-showcase";
import { RiskShowcase } from "@/components/landing/risk-showcase";
import { IntegrationsShowcase } from "@/components/landing/integrations-showcase";
import { EcosystemSection } from "@/components/landing/ecosystem-section";
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
      <AmbientBackground variant="primary" className="top-1/3 h-1/3 opacity-30" />
      <JournalShowcase />
      <AnalyticsShowcase />
      <RiskShowcase />
      <IntegrationsShowcase />
      <EcosystemSection />
      <TransformationSection />
      <AudienceSection />
      <CTASection />
    </main>
  );
}
