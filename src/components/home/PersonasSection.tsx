import { Reveal, SectionLabel } from "../site/Reveal";

const personas = [
  {
    who: "The undecided student",
    line: "You know you want to work in tech. You don't know which door you're walking through.",
    gain: "A direction chosen on evidence, not vibes.",
  },
  {
    who: "The busy learner",
    line: "You've finished courses, tutorials and half a bootcamp. None of it adds up to a story.",
    gain: "Scattered effort assembled into one visible track record.",
  },
  {
    who: "The fresh graduate",
    line: "You have a degree and no idea why applications keep going quiet.",
    gain: "A clear read on the gap between you and the role you want.",
  },
  {
    who: "The switcher",
    line: "You're moving into tech from somewhere else and starting from an unclear baseline.",
    gain: "Transferable strengths mapped, missing pieces named.",
  },
];

export function PersonasSection() {
  return (
    <section className="relative border-t border-border section-y">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <SectionLabel>Who it's for</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-lg mt-8 max-w-[18ch]">Who is CareerOS for?</h2>
        </Reveal>

        <ul className="mt-16 space-y-px">
          {personas.map((p, i) => (
            <Reveal as="li" key={p.who} delay={i * 0.05}>
              <div className="group grid gap-4 border-t border-border py-8 transition-colors duration-500 hover:border-signal sm:grid-cols-[minmax(0,18rem)_1fr_minmax(0,16rem)] sm:items-start sm:gap-10 sm:py-10">
                <h3 className="display-md">{p.who}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {p.line}
                </p>
                <p className="text-sm leading-relaxed text-signal">{p.gain}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
