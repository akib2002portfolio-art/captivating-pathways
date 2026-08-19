import { CheckCircle2, GitBranch, Globe, Target } from "lucide-react";

import { Reveal, SectionLabel } from "../site/Reveal";

const rows = [
  {
    label: "Career goal",
    value: "Frontend Developer",
    icon: Target,
  },
  {
    label: "Current focus",
    value: "Build production React experience",
  },
];

export function ProductDemo() {
  return (
    <section className="border-t border-border" aria-label="Product demonstration">
      <div className="section-y mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel>Inside the product</SectionLabel>
            <h2 className="display-lg mt-6 max-w-[13ch]">A career, described precisely.</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              CareerOS doesn't hand you a dashboard of numbers. It states where you're going, what
              you're missing, what to do about it, and what that action proved.
            </p>
            <p className="mt-6 max-w-sm text-xs leading-relaxed text-muted-foreground">
              The panel shown here is a product visualisation of the CareerOS experience in
              development — not live data.
            </p>
          </div>

          <Reveal>
            <div className="surface rounded-xl">
              <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
                <span className="label-mono">Career file</span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                  In progress
                </span>
              </div>

              <dl className="divide-y divide-border">
                {rows.map((r) => (
                  <div key={r.label} className="px-5 py-5 sm:flex sm:items-baseline sm:gap-8">
                    <dt className="label-mono sm:w-40 sm:shrink-0">{r.label}</dt>
                    <dd className="mt-1.5 font-display text-xl sm:mt-0 sm:text-2xl">{r.value}</dd>
                  </div>
                ))}

                <div className="px-5 py-5 sm:flex sm:gap-8">
                  <dt className="label-mono sm:w-40 sm:shrink-0">Why this matters</dt>
                  <dd className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-0">
                    You have developing React knowledge but need stronger evidence of practical
                    work.
                  </dd>
                </div>

                <div className="px-5 py-5 sm:flex sm:gap-8">
                  <dt className="label-mono sm:w-40 sm:shrink-0">Mission</dt>
                  <dd className="mt-1.5 sm:mt-0">
                    <p className="text-base">Build and deploy a React application</p>
                  </dd>
                </div>

                <div className="px-5 py-5 sm:flex sm:gap-8">
                  <dt className="label-mono sm:w-40 sm:shrink-0">Evidence</dt>
                  <dd className="mt-2 flex flex-wrap gap-2 sm:mt-0">
                    <span className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs">
                      <GitBranch className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
                      GitHub repository
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs">
                      <Globe className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
                      Live deployment
                    </span>
                  </dd>
                </div>

                <div className="px-5 py-5 sm:flex sm:gap-8">
                  <dt className="label-mono sm:w-40 sm:shrink-0">Progress</dt>
                  <dd className="mt-2 space-y-2.5 sm:mt-0">
                    {[
                      "React skill moves up a level",
                      "Portfolio evidence + 1",
                      "Career milestone advances",
                    ].map((p) => (
                      <p key={p} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-signal" aria-hidden="true" />
                        {p}
                      </p>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
