import { motion, useReducedMotion } from "motion/react";

const nodes = [
  { x: 60, y: 470, r: 7, label: "now", solid: true },
  { x: 175, y: 388, r: 4.5 },
  { x: 262, y: 300, r: 5.5 },
  { x: 200, y: 205, r: 4 },
  { x: 350, y: 236, r: 5 },
  { x: 430, y: 150, r: 6 },
  { x: 330, y: 82, r: 4.5 },
  { x: 505, y: 60, r: 9, label: "goal", target: true },
];

const path =
  "M60 470 C 120 430, 150 420, 175 388 S 240 340, 262 300 S 320 268, 350 236 S 410 190, 430 150 S 480 100, 505 60";

/**
 * The CareerOS hero mark: a single ascending route through a sparse field of
 * career states. Communicates movement from a known current point to a chosen goal.
 */
export function CareerMap() {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 560 540"
      className="h-auto w-full"
      aria-hidden="true"
      fill="none"
      role="presentation"
    >
      {/* ambient field of unrealised states */}
      {Array.from({ length: 26 }).map((_, i) => {
        const x = 40 + ((i * 97) % 480);
        const y = 40 + ((i * 173) % 460);
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={1.4}
            fill="var(--paper)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.16 }}
            transition={{ delay: 0.4 + i * 0.03, duration: 0.8 }}
          />
        );
      })}

      <motion.path
        d={path}
        stroke="var(--hairline)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.path
        d={path}
        stroke="var(--signal)"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {nodes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.22, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          {n.target && (
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.r + 10}
              stroke="var(--signal)"
              strokeOpacity="0.4"
              strokeWidth="1"
              animate={reduced ? {} : { r: [n.r + 8, n.r + 20], opacity: [0.45, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 2.4 }}
            />
          )}
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.solid || n.target ? "var(--signal)" : "var(--ink)"}
            stroke={n.solid || n.target ? "var(--signal)" : "var(--paper)"}
            strokeOpacity={n.solid || n.target ? 1 : 0.5}
            strokeWidth="1.2"
          />
          {n.label && (
            <text
              x={n.x + n.r + 12}
              y={n.y + 4}
              fill="var(--paper)"
              fillOpacity="0.65"
              fontSize="11"
              letterSpacing="2.4"
              fontFamily="var(--font-mono)"
            >
              {n.label.toUpperCase()}
            </text>
          )}
        </motion.g>
      ))}
    </svg>
  );
}
