import { createFileRoute } from "@tanstack/react-router";

import { ActionLink } from "@/components/site/ActionButton";
import { Reveal, RevealWords, SectionLabel } from "@/components/site/Reveal";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { FinalCta } from "@/components/home/FinalCta";

const title = "How CareerOS works — from unclear to demonstrable";
const description =
  "The six-step CareerOS loop: set your starting point, choose a direction, see the gap, run missions, capture evidence, and show proven capability.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/how-it-works" },
    ],
    links: [{ rel: "canonical", href: "/how-it-works" }],
  }),
  component: HowItWorksPage,
});

const principles = [
  {
    title: "Direction before effort",
    body: "Work only compounds when it points somewhere. Every mission exists because it closes a named gap.",
  },
  {
    title: "Evidence over claims",
    body: "Anyone can say they know something. CareerOS records the artefact that proves it.",
  },
  {
    title: "One file, always current",
    body: "Your record updates as you work, so you never rebuild your story the night before a deadline.",
  },
];

function HowItWorksPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div
          aria-hidden="true"
          className="grid-guides pointer-events-none absolute inset-0 opacity-50"
        />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <SectionLabel>The loop</SectionLabel>
          </Reveal>
          <h1 className="display-xl mt-8 max-w-[14ch]">
            <RevealWords text="How CareerOS works" />
          </h1>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              CareerOS is a loop, not a course. You set a target, the system names the distance,
              and each pass through the loop shortens it while leaving proof behind.
            </p>
          </Reveal>
        </div>
      </section>

      <HowItWorksSection heading="Six steps, run in order, repeated as you grow." />

      <section className="border-t border-border py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <SectionLabel>Principles</SectionLabel>
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <h2 className="display-md">{p.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-14">
              <ActionLink to="/signup" size="lg">
                Start your first loop
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
