import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

import { ActionLink } from "../site/ActionButton";
import { CareerMap } from "./CareerMap";

export function Hero() {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  // Heavier damping / mass so the parallax feels viscous rather than snappy.
  const sx = useSpring(px, { stiffness: 34, damping: 42, mass: 1.4 });
  const sy = useSpring(py, { stiffness: 34, damping: 42, mass: 1.4 });

  const mapX = useTransform(sx, [-1, 1], [34, -34]);
  const mapY = useTransform(sy, [-1, 1], [26, -26]);
  const gridX = useTransform(sx, [-1, 1], [-8, 8]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduced]);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-32 sm:pb-20">
      <span aria-hidden="true" className="grain z-[1]" />

      <motion.div
        aria-hidden="true"
        style={{ x: gridX }}
        className="grid-guides pointer-events-none absolute inset-y-0 left-0 right-0 opacity-60"
      />


      <motion.div
        aria-hidden="true"
        style={{ x: mapX, y: mapY }}
        className="pointer-events-none absolute right-[-14%] top-[6%] w-[115%] max-w-[900px] opacity-70 sm:right-[-6%] sm:w-[70%] lg:right-[2%] lg:top-[8%] lg:w-[48%] lg:opacity-100"
      >
        <CareerMap />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="label-mono mb-8"
        >
          Career progression system — v0.1
        </motion.p>

        <h1 className="display-xl max-w-[16ch]">
          {["Build the career", "you're becoming."].map((line, li) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduced ? { opacity: 0 } : { y: "110%" }}
                animate={reduced ? { opacity: 1 } : { y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: 0.15 + li * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {li === 1 ? (
                  <>
                    you're <span className="text-signal">becoming.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-8 border-t border-border pt-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            CareerOS turns your goals, skills and experience into a clear path of meaningful action.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ActionLink to="/signup" size="lg" variant="signal">
              Start Building Your Career
            </ActionLink>
            <ActionLink to="/how-it-works" size="lg" variant="outline">
              Explore CareerOS
            </ActionLink>
          </div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative mx-auto mt-12 flex w-full max-w-[1400px] items-center gap-3 px-5 sm:px-8"
      >
        <span className="label-mono">Scroll</span>
        <span className="relative h-px flex-1 overflow-hidden bg-border">
          <motion.span
            className="absolute inset-y-0 left-0 w-24 bg-signal"
            animate={reduced ? {} : { x: ["-100%", "600%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
