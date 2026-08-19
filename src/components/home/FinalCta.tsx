import { ActionLink } from "../site/ActionButton";
import { Reveal, RevealWords, SectionLabel } from "../site/Reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border section-y">
      <div
        aria-hidden="true"
        className="grid-guides pointer-events-none absolute inset-0 opacity-50"
      />
      <div className="relative mx-auto max-w-[1400px] px-5 text-center sm:px-8">
        <Reveal>
          <div className="flex justify-center">
            <SectionLabel>Early access</SectionLabel>
          </div>
        </Reveal>

        <h2 className="display-xl mx-auto mt-8 max-w-[14ch]">
          <RevealWords text="Start proving what you can do." />
        </h2>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-[48ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            CareerOS is in student beta. Set your direction, run your first mission, and leave with
            evidence instead of intentions.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ActionLink to="/signup" size="lg" className="w-full sm:w-auto">
              Create your career file
            </ActionLink>
            <ActionLink to="/how-it-works" variant="outline" size="lg" className="w-full sm:w-auto">
              See how it works
            </ActionLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
