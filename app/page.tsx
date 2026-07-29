"use client";

import { OpeningSection } from "@/components/landing/opening-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { PlatformSection } from "@/components/landing/platform-section";
import { ExperienceSection } from "@/components/landing/experience-section";
import { TransformationSection } from "@/components/landing/transformation-section";
import { AudienceSection } from "@/components/landing/audience-section";
import { CTASection } from "@/components/landing/cta-section";
import { AmbientBackground } from "@/components/ui/ambient-background";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen">
      <OpeningSection />
      <ProblemSection />
      <AmbientBackground variant="primary" className="top-1/2 h-1/2" />
      <PlatformSection />
      <ExperienceSection />
      <AmbientBackground variant="analytics" className="top-1/2 h-1/3 opacity-50" />
      <TransformationSection />
      <AudienceSection />
      <CTASection />
    </main>
  );
}
