import { createFileRoute } from "@tanstack/react-router";

import { Reveal, RevealWords, SectionLabel } from "@/components/site/Reveal";
import { FinalCta } from "@/components/home/FinalCta";

const title = "About CareerOS — why we built a career progression system";
const description =
  "CareerOS exists because talent is common and direction is rare. We build the system that turns student effort into visible, verifiable career progress.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const beliefs = [
  {
    k: "01",
    t: "Effort is not the bottleneck",
    b: "Students already work hard. What's missing is a structure that makes the work count toward something specific.",
  },
  {
    k: "02",
    t: "Advice doesn't scale, systems do",
    b: "A good mentor answers one question at a time. A good system answers the same question for everyone, continuously.",
  },
  {
    k: "03",
    t: "Proof beats presentation",
    b: "Hiring rewards what you can show. We optimise for the artefact, not the adjective.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden section-y-top">
        <div
          aria-hidden="true"
          className="grid-guides pointer-events-none absolute inset-0 opacity-50"
        />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <SectionLabel>About</SectionLabel>
          </Reveal>
          <h1 className="display-xl mt-8 max-w-[15ch]">
            <RevealWords text="Talent is common. Direction is rare." />
          </h1>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[54ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              CareerOS started from a simple observation: the students who struggle to enter
              technology are rarely the least capable ones. They're the ones nobody handed a map.
              We're building that map — and the operating system that runs on top of it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border section-y">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <SectionLabel>What we believe</SectionLabel>
          </Reveal>
          <div className="mt-14 space-y-px">
            {beliefs.map((b, i) => (
              <Reveal key={b.k} delay={i * 0.06}>
                <div className="grid gap-4 border-t border-border py-10 sm:grid-cols-[5rem_minmax(0,22rem)_1fr] sm:gap-10">
                  <span className="font-mono text-sm text-signal">{b.k}</span>
                  <h2 className="display-md">{b.t}</h2>
                  <p className="max-w-[50ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {b.b}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border section-y">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <h2 className="display-lg max-w-[16ch]">Where we are now</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[50ch] text-base leading-relaxed text-muted-foreground">
              CareerOS is in an early student beta, built in the open with the people it's for.
              Career tracks, mission libraries and the evidence model are being shaped by real usage
              rather than assumptions — if you're a student, graduate or educator, we want your
              input in that process.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
