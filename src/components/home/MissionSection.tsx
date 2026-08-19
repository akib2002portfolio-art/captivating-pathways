import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, GitBranch, Globe, MonitorPlay, RotateCcw } from "lucide-react";

import { SectionLabel } from "../site/Reveal";
import { cn } from "@/lib/utils";

const states = ["Not started", "In progress", "Completed"] as const;

const deliverables = [
  { label: "Working application", icon: MonitorPlay },
  { label: "GitHub repository", icon: GitBranch },
  { label: "Live deployment", icon: Globe },
];

export function MissionSection() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !played.current) {
          played.current = true;
          setRunning(true);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    if (reduced) {
      setStep(2);
      setRunning(false);
      return;
    }
    if (step >= 2) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 1100 : 1800);
    return () => clearTimeout(t);
  }, [running, step, reduced]);

  const replay = () => {
    setStep(0);
    setRunning(true);
  };

  return (
    <section className="border-t border-border" aria-label="Missions">
      <div className="section-y mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-24">
          <div>
            <SectionLabel>Missions</SectionLabel>
            <h2 className="display-lg mt-6">
              Don't just learn.
              <br />
              <span className="text-signal">Do.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              A gap is only useful once it becomes an action. CareerOS converts each missing piece
              of your career into a mission with a defined outcome — something you finish, ship and
              can point at afterwards.
            </p>
            <button
              type="button"
              onClick={replay}
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-signal"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Replay the mission
            </button>
          </div>

          <div ref={ref}>
            <div className="surface rounded-xl p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="label-mono">Mission</span>
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors duration-500",
                    step === 2
                      ? "border-signal text-signal"
                      : step === 1
                        ? "border-border text-foreground"
                        : "border-border text-muted-foreground",
                  )}
                  aria-live="polite"
                >
                  {states[step]}
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl leading-tight sm:text-3xl">
                Build and deploy your first production React project.
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                <span className="label-mono mr-2">Why</span>
                Employers need evidence that you can build and ship real software.
              </p>

              <div className="mt-7 space-y-3">
                {deliverables.map((d, i) => {
                  const done = step === 2 || (step === 1 && i === 0);
                  return (
                    <div key={d.label} className="flex items-center gap-3">
                      <motion.span
                        animate={{
                          borderColor: done ? "var(--signal)" : "var(--border)",
                          backgroundColor: done ? "var(--signal)" : "transparent",
                        }}
                        transition={{ duration: 0.4, delay: done ? i * 0.18 : 0 }}
                        className="flex h-5 w-5 items-center justify-center rounded-[4px] border"
                      >
                        {done && (
                          <Check
                            className="h-3.5 w-3.5 text-primary-foreground"
                            aria-hidden="true"
                          />
                        )}
                      </motion.span>
                      <span
                        className={cn(
                          "flex items-center gap-2 text-sm transition-colors duration-500",
                          done ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        <d.icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {d.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 h-px w-full bg-border">
                <motion.span
                  className="block h-px bg-signal"
                  animate={{ width: `${step * 50}%` }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <AnimatePresence>
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-7 rounded-lg border border-signal/40 bg-signal-soft p-5"
                  >
                    <span className="label-mono">Result</span>
                    <ul className="mt-3 space-y-2 text-sm">
                      {[
                        "Evidence attached: repository + deployment",
                        "React capability moves from developing to practised",
                        "Next mission unlocked: ship a feature under review",
                      ].map((line, i) => (
                        <motion.li
                          key={line}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + i * 0.16 }}
                          className="flex items-start gap-2.5"
                        >
                          <ArrowRight
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal"
                            aria-hidden="true"
                          />
                          {line}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
