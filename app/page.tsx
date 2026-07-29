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
import { SuccessStories } from "@/components/landing/success-stories";
import { CommunitySection } from "@/components/landing/community-section";
import { TrustSection } from "@/components/landing/trust-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { VisionSection } from "@/components/landing/vision-section";
import { FinalCTASection } from "@/components/landing/final-cta-section";
import { EnterpriseSection } from "@/components/landing/enterprise-section";
import { CommunityHubSection } from "@/components/landing/community-hub-section";
import { FooterSection } from "@/components/landing/footer-section";
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
      <AmbientBackground variant="analytics" className="top-1/3 h-1/2 opacity-30" />
      <TransformationSection />
      <SuccessStories />
      <CommunitySection />
      <TrustSection />
      <PricingSection />
      <VisionSection />
      <FinalCTASection />
      <EnterpriseSection />
      <CommunityHubSection />
      <FooterSection />
    </main>
  );
}
