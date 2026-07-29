"use client";

import { OpeningSection } from "@/components/landing/opening-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { PlatformSection } from "@/components/landing/platform-section";
import { ExperienceSection } from "@/components/landing/experience-section";
import { TransformationSection } from "@/components/landing/transformation-section";
import { AudienceSection } from "@/components/landing/audience-section";
import { CTASection } from "@/components/landing/cta-section";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen">
      <OpeningSection />
      <ProblemSection />
      <PlatformSection />
      <ExperienceSection />
      <TransformationSection />
      <AudienceSection />
      <CTASection />
    </main>
  );
}
