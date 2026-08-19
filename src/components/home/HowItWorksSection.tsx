import { Reveal, SectionLabel } from "../site/Reveal";

export const steps = [
  {
    n: "01",
    title: "Set your starting point",
    body: "Answer a short structured intake about your background, current skills and constraints. No polish required — accuracy beats presentation.",
  },
  {
    n: "02",
    title: "Choose a direction",
    body: "Pick a target role from mapped career tracks. Each one shows the capabilities it expects and the work that typically proves them.",
  },
  {
    n: "03",
    title: "See the gap",
    body: "CareerOS compares where you are to where you're going and names the specific distance between the two.",
  },
  {
    n: "04",
    title: "Work through missions",
    body: "The gap becomes a sequence of concrete missions — build, contribute, practise, ship. One thing at a time, in order.",
  },
  {
    n: "05",
    title: "Capture evidence",
    body: "Every completed mission attaches artefacts to the skills it demonstrates. Your record grows as a by-product of doing the work.",
  },
  {
    n: "06",
    title: "Show proven capability",
    body: "Your career file becomes a shareable, verifiable picture of what you can actually do — updated continuously, never rewritten from scratch.",
  },
];

export function HowItWorksSection({ heading }: { heading?: string }) {
  return (
    <section className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <SectionLabel>How it works</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-lg mt-8 max-w-[16ch]">
            {heading ?? "Six steps from unclear to demonstrable."}
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={(i % 3) * 0.06}>
              <div className="h-full bg-background p-8 transition-colors duration-500 hover:bg-card sm:p-10">
                <span className="font-mono text-3xl text-signal">{s.n}</span>
                <h3 className="display-md mt-6">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
