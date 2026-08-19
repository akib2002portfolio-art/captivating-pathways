import { Reveal, SectionLabel } from "../site/Reveal";

const facets = [
  {
    label: "Who you are",
    title: "Professional identity",
    body: "Your strengths, interests and working style — written down instead of guessed at every time someone asks what you do.",
  },
  {
    label: "What you can do",
    title: "Capability map",
    body: "Skills tracked at the level you actually hold them, from first exposure through to consistently applied in real work.",
  },
  {
    label: "What you've proven",
    title: "Evidence record",
    body: "Projects, contributions and outcomes attached to the skills they demonstrate, ready to hand to anyone who asks.",
  },
  {
    label: "Where you're going",
    title: "Direction",
    body: "A named target role with the gap between here and there made explicit, so effort has somewhere to land.",
  },
];

export function IdentitySection() {
  return (
    <section className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <SectionLabel>Professional identity</SectionLabel>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="display-lg max-w-[18ch]">
              A CV is a summary. Your identity is the system underneath it.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:pt-4">
            <p className="max-w-[46ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              Most students describe themselves in whatever words the last application form
              demanded. CareerOS keeps one structured picture of you that grows as you do — and
              every part of it points at something you can show.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {facets.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <article className="h-full bg-background p-8 transition-colors duration-500 hover:bg-card sm:p-10">
                <span className="label-mono">{f.label}</span>
                <h3 className="display-md mt-5">{f.title}</h3>
                <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
