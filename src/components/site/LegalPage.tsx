import { useEffect, useRef, useState } from "react";

import { Reveal, SectionLabel } from "./Reveal";

export type LegalBlock = { h: string; p: string };

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function LegalPage({
  label,
  heading,
  intro,
  blocks,
}: {
  label: string;
  heading: string;
  intro: string;
  blocks: LegalBlock[];
}) {
  const [active, setActive] = useState(blocks[0] ? slug(blocks[0].h) : "");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>("[data-legal-section]") ?? [],
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target instanceof HTMLElement) {
          setActive(visible.target.dataset["legalSection"] ?? "");
        }
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [blocks]);

  return (
    <section className="section-y-top relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-guides pointer-events-none absolute inset-0 opacity-40"
      />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display-lg mt-8 max-w-[16ch]">{heading}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[56ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
            {intro}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,66ch)_minmax(0,1fr)] lg:gap-20">
          <div ref={containerRef} className="space-y-px">
            {blocks.map((b, i) => (
              <Reveal key={b.h} delay={i * 0.04}>
                <div
                  id={slug(b.h)}
                  data-legal-section={slug(b.h)}
                  className="scroll-mt-32 border-t border-border py-8"
                >
                  <h2 className="display-md">{b.h}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {b.p}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-32">
              <p className="label-mono">On this page</p>
              <ul className="mt-6 space-y-1 border-l border-border">
                {blocks.map((b) => {
                  const id = slug(b.h);
                  const isActive = active === id;
                  return (
                    <li key={b.h}>
                      <a
                        href={`#${id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`-ml-px block border-l py-2 pl-5 text-sm transition-colors duration-300 ${
                          isActive
                            ? "border-signal text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {b.h}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
