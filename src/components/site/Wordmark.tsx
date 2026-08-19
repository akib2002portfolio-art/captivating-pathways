import { Link } from "@tanstack/react-router";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${className ?? ""}`}
      aria-label="CareerOS home"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="overflow-visible"
      >
        <circle cx="4" cy="16" r="2.4" fill="var(--signal)" />
        <circle
          cx="16"
          cy="4"
          r="2.4"
          className="fill-none stroke-paper transition-all duration-500 group-hover:fill-[var(--signal)]"
          strokeWidth="1.4"
        />
        <path
          d="M4.4 15.6 C 8 12, 8 8, 15.6 4.4"
          stroke="var(--paper)"
          strokeWidth="1.2"
          strokeOpacity="0.55"
          fill="none"
          strokeDasharray="2 2.5"
        />
      </svg>
      <span className="font-display text-[0.95rem] font-medium tracking-tight">
        Career<span className="text-signal">OS</span>
      </span>
    </Link>
  );
}
