import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Reveal, SectionLabel } from "../site/Reveal";

const stages = [
  {
    stage: "01",
    name: "Orientation",
    detail: "Understand the field, the roles inside it, and which direction actually fits you.",
  },
  {
    stage: "02",
    name: "Foundation",
    detail: "Build the core skills the role assumes you already have before day one.",
  },
  {
    stage: "03",
    name: "Application",
    detail: "Put skills into real work — projects, contributions, small paid jobs.",
  },
  {
    stage: "04",
    name: "Evidence",
    detail: "Turn that work into proof a hiring manager can read in under a minute.",
  },
  {
    stage: "05",
    name: "Entry",
    detail: "Apply from a position of demonstrated capability rather than potential.",
  },
];

export function ProgressionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 60%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <SectionLabel>Career progression</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-lg mt-8 max-w-[16ch]">
            The road exists. Most people just never see it drawn.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16 pl-8 sm:pl-14">
          <div className="absolute bottom-0 left-[3px] top-0 w-px bg-border sm:left-[7px]" />
          <motion.div
            aria-hidden="true"
            style={{ height: reduced ? "100%" : height }}
            className="absolute left-[3px] top-0 w-px bg-signal sm:left-[7px]"
          />

          <ol className="space-y-14 sm:space-y-20">
            {stages.map((s, i) => (
              <li key={s.stage} className="relative">
                <span className="absolute -left-8 top-2 block h-[7px] w-[7px] rounded-full bg-signal sm:-left-14 sm:h-[15px] sm:w-[15px] sm:border-4 sm:border-background" />
                <Reveal delay={i * 0.04}>
                  <div className="grid gap-3 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-8">
                    <span className="label-mono">Stage {s.stage}</span>
                    <div>
                      <h3 className="display-md">{s.name}</h3>
                      <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {s.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
