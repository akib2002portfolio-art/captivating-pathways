import { Link } from "@tanstack/react-router";

import { Wordmark } from "./Wordmark";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Home", to: "/" },
      { label: "How It Works", to: "/how-it-works" },
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign In", to: "/signin" },
      { label: "Get Started", to: "/signup" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_2fr]">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            A career progression system for students and fresh graduates entering technology.
            Understand where you are, decide where you're going, and turn effort into evidence.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="label-mono">{col.title}</h2>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 border-t border-border px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} CareerOS. Building in the open.</p>
        <p className="label-mono">Early access · Student beta</p>
      </div>
    </footer>
  );
}
