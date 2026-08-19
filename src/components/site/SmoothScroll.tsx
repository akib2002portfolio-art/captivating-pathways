import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Inertia scrolling via Lenis. Skipped entirely when the user prefers reduced
 * motion (no instance created, native scrolling untouched).
 *
 * Lenis drives window.scrollY directly, so motion's `useScroll` in
 * ModelSection / ProgressionSection / ProblemSection / EvidenceSection stays in
 * sync — we just re-measure on Lenis' rAF tick so scroll-linked values are read
 * from the eased position within the same frame.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });

    // Keep motion's scroll listeners reading the eased position each tick.
    const onScroll = () => window.dispatchEvent(new Event("scroll"));
    lenis.on("scroll", onScroll);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anchor links (legal page TOC) should ride the eased scroll too.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.('a[href^="#"]');
      const href = anchor?.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -120 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  return null;
}
