import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const pieces = [
  { label: "Courses", from: { x: -34, y: -30, r: -9 } },
  { label: "Projects", from: { x: 26, y: -36, r: 7 } },
  { label: "GitHub", from: { x: -14, y: 22, r: 5 } },
  { label: "LeetCode", from: { x: 34, y: 8, r: -6 } },
  { label: "CV", from: { x: -38, y: 6, r: 11 } },
  { label: "LinkedIn", from: { x: 12, y: 34, r: -10 } },
  { label: "Applications", from: { x: -24, y: -6, r: 4 } },
  { label: "Certifications", from: { x: 38, y: -12, r: -4 } },
  { label: "Skills", from: { x: 0, y: -20, r: 8 } },
];

function Piece({
  label,
  from,
  index,
  progress,
}: {
  label: string;
  from: { x: number; y: number; r: number };
  index: number;
  progress: MotionValue<number>;
}) {
  const column = index % 3;
  const row = Math.floor(index / 3);
  const targetX = (column - 1) * 30;
  const targetY = (row - 1) * 16;

  const x = useTransform(progress, [0.05, 0.62], [from.x, targetX]);
  const y = useTransform(progress, [0.05, 0.62], [from.y, targetY]);
  const rotate = useTransform(progress, [0.05, 0.62], [from.r, 0]);
  const borderOpacity = useTransform(progress, [0.5, 0.8], [0.35, 1]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        x: useTransform(x, (v) => `calc(-50% + ${v}vw)`),
        y: useTransform(y, (v) => `calc(-50% + ${v}vh)`),
        rotate,
      }}
    >
      <motion.span
        style={{ opacity: borderOpacity }}
        className="surface inline-flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-xs sm:px-4 sm:text-sm"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
        {label}
      </motion.span>
    </motion.div>
  );
}

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.18, 0.4], [1, 1, 0]);
  const resolveOpacity = useTransform(scrollYProgress, [0.62, 0.8], [0, 1]);
  const resolveY = useTransform(scrollYProgress, [0.62, 0.85], [24, 0]);
  const lineScale = useTransform(scrollYProgress, [0.45, 0.85], [0, 1]);

  if (reduced) {
    return (
      <section className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8">
        <h2 className="display-lg max-w-[18ch]">
          You are doing a lot. But are you moving forward?
        </h2>
        <ul className="mt-10 flex flex-wrap gap-3">
          {pieces.map((p) => (
            <li key={p.label} className="surface rounded-md px-4 py-2 text-sm">
              {p.label}
            </li>
          ))}
        </ul>
        <p className="mt-10 display-md text-signal">CareerOS connects the pieces.</p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[320vh]" aria-label="The career problem">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          {pieces.map((p, i) => (
            <Piece key={p.label} {...p} index={i} progress={scrollYProgress} />
          ))}
        </div>

        <motion.div
          style={{ opacity: headlineOpacity }}
          className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8"
        >
          <h2 className="display-lg max-w-[16ch]">
            You are doing a lot.
            <br />
            <span className="text-muted-foreground">But are you moving forward?</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: resolveOpacity, y: resolveY }}
          className="pointer-events-none absolute inset-x-0 bottom-14 mx-auto max-w-[1400px] px-5 text-center sm:px-8"
        >
          <motion.span
            style={{ scaleX: lineScale }}
            className="mx-auto mb-8 block h-px w-full max-w-3xl origin-left bg-signal"
            aria-hidden="true"
          />
          <p className="display-md">
            CareerOS <span className="text-signal">connects the pieces.</span>
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            One system that reads your effort as a single trajectory instead of nine unrelated
            tabs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
