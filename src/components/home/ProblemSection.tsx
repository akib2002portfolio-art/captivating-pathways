import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

/**
 * Badge choreography rules:
 * - The headline occupies a reserved centre band (vertical 32%-68% of the sticky
 *   viewport). No badge start position, and no point along a badge's motion path,
 *   may enter that band while the headline is visible.
 * - Start positions therefore live in two horizontal lanes: a top lane (6%-24%)
 *   and a bottom lane (72%-90%). Both are outside the reserved band at every
 *   breakpoint because they are expressed as percentages of the viewport.
 * - Convergence into the centre grid only begins at scroll progress 0.42, by
 *   which point the headline has fully faded out (it fades 0 -> 0.34).
 */
const SAFE_BAND = { top: 32, bottom: 68 };

const CONVERGE_START = 0.42;
const CONVERGE_END = 0.76;

type Piece = { label: string; x: number; y: number; r: number };

const pieces: Piece[] = [
  // top lane
  { label: "Courses", x: 10, y: 9, r: -7 },
  { label: "Projects", x: 38, y: 16, r: 5 },
  { label: "GitHub", x: 66, y: 8, r: -4 },
  { label: "LeetCode", x: 88, y: 20, r: 8 },
  { label: "Skills", x: 24, y: 23, r: 4 },
  // bottom lane
  { label: "CV", x: 12, y: 78, r: 9 },
  { label: "LinkedIn", x: 42, y: 88, r: -6 },
  { label: "Applications", x: 70, y: 75, r: 6 },
  { label: "Certifications", x: 90, y: 86, r: -9 },
];

function Badge({
  piece,
  index,
  progress,
}: {
  piece: Piece;
  index: number;
  progress: MotionValue<number>;
}) {
  const column = index % 3;
  const row = Math.floor(index / 3);
  // Centre grid target, kept inside the middle of the viewport.
  const targetX = 50 + (column - 1) * 24;
  const targetY = 50 + (row - 1) * 9;

  const x = useTransform(progress, [CONVERGE_START, CONVERGE_END], [piece.x, targetX]);
  const y = useTransform(progress, [CONVERGE_START, CONVERGE_END], [piece.y, targetY]);
  const rotate = useTransform(progress, [CONVERGE_START, CONVERGE_END], [piece.r, 0]);
  const opacity = useTransform(progress, [0, 0.06, 0.86, 0.96], [0, 1, 1, 0]);

  const left = useTransform(x, (v) => `${v}%`);
  const top = useTransform(y, (v) => `${v}%`);

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left, top, rotate, opacity }}
    >
      <span className="surface inline-flex items-center gap-2 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
        {piece.label}
      </span>
    </motion.div>
  );
}

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.16, 0.34], [1, 1, 0]);
  const resolveOpacity = useTransform(scrollYProgress, [0.76, 0.9], [0, 1]);
  const resolveY = useTransform(scrollYProgress, [0.76, 0.94], [24, 0]);
  const lineScale = useTransform(scrollYProgress, [0.7, 0.94], [0, 1]);

  if (reduced) {
    return (
      <section className="section-y mx-auto max-w-[1400px] px-5 sm:px-8">
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
        <p className="display-md mt-10 text-signal">CareerOS connects the pieces.</p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[320vh]" aria-label="The career problem">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          {pieces.map((p, i) => (
            <Badge key={p.label} piece={p} index={i} progress={scrollYProgress} />
          ))}
        </div>

        {/* Reserved headline box — badges never start or pass through here while visible. */}
        <motion.div
          style={{
            opacity: headlineOpacity,
            top: `${SAFE_BAND.top}%`,
            height: `${SAFE_BAND.bottom - SAFE_BAND.top}%`,
          }}
          className="absolute inset-x-0 flex items-center"
        >
          <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
            <h2 className="display-lg max-w-[16ch]">
              You are doing a lot.
              <br />
              <span className="text-muted-foreground">But are you moving forward?</span>
            </h2>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: resolveOpacity, y: resolveY }}
          className="pointer-events-none absolute inset-x-0 bottom-10 mx-auto max-w-[1400px] px-5 text-center sm:bottom-14 sm:px-8"
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
            One system that reads your effort as a single trajectory instead of nine unrelated tabs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
