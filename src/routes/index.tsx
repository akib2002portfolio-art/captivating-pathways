import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ModelSection } from "@/components/home/ModelSection";
import { ProductDemo } from "@/components/home/ProductDemo";
import { MissionSection } from "@/components/home/MissionSection";
import { EvidenceSection } from "@/components/home/EvidenceSection";
import { IdentitySection } from "@/components/home/IdentitySection";
import { ProgressionSection } from "@/components/home/ProgressionSection";
import { PersonasSection } from "@/components/home/PersonasSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { FinalCta } from "@/components/home/FinalCta";

const title = "CareerOS — Build the career you're becoming";
const description =
  "A career progression system for students and fresh graduates entering technology: set a direction, close the gap with missions, and turn effort into evidence.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ModelSection />
      <IdentitySection />
      <ProductDemo />
      <MissionSection />
      <EvidenceSection />
      <ProgressionSection />
      <PersonasSection />
      <HowItWorksSection />
      <FinalCta />
    </>
  );
}
