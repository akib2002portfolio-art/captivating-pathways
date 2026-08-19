import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Custom cursor: small dot with spring lag, scales up and inverts over
 * interactive elements via mix-blend-mode: difference.
 * Fully disabled (never mounted, no listeners) on coarse pointers and when
 * the user prefers reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hot, setHot] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHot(
        !!target?.closest?.(
          'a, button, [role="button"], input, textarea, select, summary, [data-cursor="hot"]',
        ),
      );
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-difference"
    >
      <motion.span
        className="block rounded-full bg-white"
        initial={false}
        animate={{
          width: hot ? 44 : 10,
          height: hot ? 44 : 10,
          opacity: visible ? 1 : 0,
          x: hot ? -22 : -5,
          y: hot ? -22 : -5,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.6 }}
      />
    </motion.div>
  );
}
