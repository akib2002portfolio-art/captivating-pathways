import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { SectionLabel } from "../site/Reveal";

const stages = [
  {
    key: "Goal",
    body: "You choose a destination. Frontend Developer, Data Engineer, Product Designer — a direction the system can measure against.",
  },
  {
    key: "Current State",
    body: "Your existing skills, projects and experience form around that goal as an honest starting position.",
  },
  {
    key: "Gap",
    body: "The distance between the two becomes visible. Not a score — a specific list of what is missing.",
  },
  {
    key: "Mission",
    body: "Each gap converts into one concrete thing to do next, sized so you can actually finish it.",
  },
  {
    key: "Evidence",
    body: "Finishing produces something real: a repository, a deployment, a written artefact, a shipped result.",
  },
  {
    key: "Progress",
    body: "Evidence updates your position, and the system points at the next destination.",
  },
];

export function ModelSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lineLength = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative border-t border-border"
      style={{ height: reduced ? "auto" : `${stages.length * 90}vh` }}
      aria-label="The CareerOS model"
    >
      <div
        className={
          reduced
            ? "section-y mx-auto max-w-[1400px] px-5 sm:px-8"
            : "sticky top-0 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-5 sm:px-8"
        }
      >
        <SectionLabel>The model</SectionLabel>
        <h2 className="display-lg mt-6 max-w-[14ch]">One loop, repeated until you're ready.</h2>

        <div className="relative mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* spine */}
          <ol className="relative space-y-6 pl-8">
            <span
              className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-border"
              aria-hidden="true"
            />
            {!reduced && (
              <motion.span
                style={{ scaleY: lineLength }}
                className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-signal"
                aria-hidden="true"
              />
            )}
            {stages.map((s, i) => (
              <Stage
                key={s.key}
                index={i}
                total={stages.length}
                stage={s}
                progress={scrollYProgress}
                reduced={!!reduced}
              />
            ))}
          </ol>

          <div className="hidden lg:block">
            <LoopDiagram progress={scrollYProgress} reduced={!!reduced} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stage({
  stage,
  index,
  total,
  progress,
  reduced,
}: {
  stage: (typeof stages)[number];
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  // Offsets must stay inside [0, 1] and strictly ascending, otherwise the
  // WAAPI keyframes generated for `opacity` throw for the first stage (start = 0).
  const start = index / total;
  const fadeIn = Math.max(0, Math.min(0.92, start - 0.06));
  const fadeOut = Math.min(1, fadeIn + 0.08);
  const active = useTransform(progress, [fadeIn, fadeOut], [0.32, 1]);

  return (
    <motion.li className="relative" style={reduced ? {} : { opacity: active }}>
      <span
        className="absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border border-signal bg-background"
        aria-hidden="true"
      >
        <span className="absolute inset-1 rounded-full bg-signal" />
      </span>
      <h3 className="font-display text-xl">
        <span className="label-mono mr-3">0{index + 1}</span>
        {stage.key}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{stage.body}</p>
    </motion.li>
  );
}

function LoopDiagram({
  progress,
  reduced,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const draw = useTransform(progress, [0.05, 0.9], [0, 1]);
  const rotate = useTransform(progress, [0, 1], [-8, 8]);

  return (
    <motion.svg
      viewBox="0 0 420 420"
      className="w-full"
      fill="none"
      aria-hidden="true"
      style={reduced ? {} : { rotate }}
    >
      <circle cx="210" cy="210" r="150" stroke="var(--hairline)" />
      <circle cx="210" cy="210" r="96" stroke="var(--hairline)" />
      <motion.circle
        cx="210"
        cy="210"
        r="150"
        stroke="var(--signal)"
        strokeWidth="1.5"
        strokeLinecap="round"
        transform="rotate(-90 210 210)"
        style={reduced ? { pathLength: 1 } : { pathLength: draw }}
      />
      {stages.map((s, i) => {
        const angle = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
        const x = 210 + Math.cos(angle) * 150;
        const y = 210 + Math.sin(angle) * 150;
        return (
          <g key={s.key}>
            <circle cx={x} cy={y} r="5" fill="var(--ink)" stroke="var(--signal)" />
            <text
              x={210 + Math.cos(angle) * 182}
              y={210 + Math.sin(angle) * 182 + 4}
              textAnchor="middle"
              fill="var(--paper)"
              fillOpacity="0.7"
              fontSize="11"
              fontFamily="var(--font-mono)"
              letterSpacing="1.5"
            >
              {s.key.toUpperCase()}
            </text>
          </g>
        );
      })}
      <text
        x="210"
        y="206"
        textAnchor="middle"
        fill="var(--paper)"
        fontSize="15"
        fontFamily="var(--font-display)"
      >
        CareerOS
      </text>
      <text
        x="210"
        y="228"
        textAnchor="middle"
        fill="var(--paper)"
        fillOpacity="0.5"
        fontSize="10"
        letterSpacing="2"
        fontFamily="var(--font-mono)"
      >
        PROGRESSION LOOP
      </text>
    </motion.svg>
  );
}
