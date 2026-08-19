import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { SectionLabel } from "../site/Reveal";

const evidence = [
  { label: "Deployed React app", x: 90, y: 90 },
  { label: "Open-source fix merged", x: 330, y: 60 },
  { label: "Internship deliverable", x: 470, y: 170 },
  { label: "Technical write-up", x: 130, y: 250 },
  { label: "Reviewed code", x: 350, y: 300 },
];

const CENTER = { x: 280, y: 185 };

export function EvidenceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "center 40%"],
  });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="border-t border-border" aria-label="Evidence">
      <div ref={ref} className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div>
            <SectionLabel>Evidence</SectionLabel>
            <h2 className="display-lg mt-6 max-w-[12ch]">Your work becomes your proof.</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Projects, skills, experience, completed missions and professional work stop being a
              list of things you did. Each one attaches to a capability and becomes something you
              can stand behind in a room with an employer.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              {[
                "Every claim points at something real.",
                "Every artefact strengthens a specific capability.",
                "Together they form one coherent professional record.",
              ].map((l) => (
                <li key={l} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <svg viewBox="0 0 560 370" className="w-full" fill="none" aria-hidden="true">
            {evidence.map((e, i) => (
              <motion.line
                key={`l-${i}`}
                x1={e.x}
                y1={e.y}
                x2={CENTER.x}
                y2={CENTER.y}
                stroke="var(--signal)"
                strokeWidth="1"
                strokeOpacity="0.7"
                style={reduced ? { pathLength: 1 } : { pathLength: draw }}
              />
            ))}

            <circle cx={CENTER.x} cy={CENTER.y} r="62" stroke="var(--hairline)" />
            <motion.circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="46"
              fill="var(--ink-raised)"
              stroke="var(--signal)"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            />
            <text
              x={CENTER.x}
              y={CENTER.y - 2}
              textAnchor="middle"
              fill="var(--paper)"
              fontSize="13"
              fontFamily="var(--font-display)"
            >
              Capability
            </text>
            <text
              x={CENTER.x}
              y={CENTER.y + 16}
              textAnchor="middle"
              fill="var(--paper)"
              fillOpacity="0.55"
              fontSize="9"
              letterSpacing="1.6"
              fontFamily="var(--font-mono)"
            >
              PROVEN
            </text>

            {evidence.map((e, i) => (
              <motion.g
                key={e.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${e.x}px ${e.y}px` }}
              >
                <circle cx={e.x} cy={e.y} r="5" fill="var(--signal)" />
                <text
                  x={e.x}
                  y={e.y - 14}
                  textAnchor="middle"
                  fill="var(--paper)"
                  fillOpacity="0.8"
                  fontSize="11"
                  fontFamily="var(--font-sans)"
                >
                  {e.label}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
