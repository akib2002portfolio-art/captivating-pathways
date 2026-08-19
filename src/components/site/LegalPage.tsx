import { Reveal, SectionLabel } from "./Reveal";

export type LegalBlock = { h: string; p: string };

export function LegalPage({
  label,
  heading,
  intro,
  blocks,
}: {
  label: string;
  heading: string;
  intro: string;
  blocks: LegalBlock[];
}) {
  return (
    <section className="relative overflow-hidden section-y-top">
      <div
        aria-hidden="true"
        className="grid-guides pointer-events-none absolute inset-0 opacity-40"
      />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display-lg mt-8 max-w-[16ch]">{heading}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[56ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
            {intro}
          </p>
        </Reveal>

        <div className="mt-16 max-w-[68ch] space-y-px">
          {blocks.map((b, i) => (
            <Reveal key={b.h} delay={i * 0.04}>
              <div className="border-t border-border py-8">
                <h2 className="display-md">{b.h}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {b.p}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
