import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

import { ActionButton } from "./ActionButton";
import { Wordmark } from "./Wordmark";

const field =
  "w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-signal focus:outline-none";

type Props = {
  mode: "signin" | "signup";
  title: string;
  subtitle: string;
  aside: ReactNode;
};

export function AuthShell({ mode, title, subtitle, aside }: Props) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <aside className="relative hidden overflow-hidden border-r border-border p-12 lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="grid-guides pointer-events-none absolute inset-0 opacity-50"
        />
        <Wordmark className="relative" />
        <div className="relative max-w-[34ch]">{aside}</div>
        <p className="label-mono relative">Student beta · CareerOS</p>
      </aside>

      <main className="flex items-center justify-center px-5 py-20 sm:px-8">
        <div className="w-full max-w-md">
          <Wordmark className="lg:hidden" />

          <h1 className="display-lg mt-10 lg:mt-0">{title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>

          <form
            className="mt-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            {mode === "signup" && (
              <div>
                <label htmlFor="name" className="label-mono">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className={`${field} mt-3`}
                  placeholder="Ada Lovelace"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="label-mono">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`${field} mt-3`}
                placeholder="you@university.edu"
              />
            </div>
            <div>
              <label htmlFor="password" className="label-mono">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                className={`${field} mt-3`}
                placeholder="At least 8 characters"
              />
            </div>

            <ActionButton type="submit" size="lg" className="w-full">
              {mode === "signup" ? "Create account" : "Sign in"}
            </ActionButton>

            <p aria-live="polite" className="min-h-5 text-xs text-signal">
              {submitted
                ? "Accounts open when the beta does — you're on the list for the next intake."
                : ""}
            </p>
          </form>

          <p className="mt-8 text-sm text-muted-foreground">
            {mode === "signup" ? "Already have an account? " : "No account yet? "}
            <Link
              to={mode === "signup" ? "/signin" : "/signup"}
              className="link-underline text-foreground"
            >
              {mode === "signup" ? "Sign in" : "Create one"}
            </Link>
          </p>

          <p className="mt-10 text-xs text-muted-foreground">
            By continuing you agree to our{" "}
            <Link to="/terms" className="link-underline text-foreground">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="link-underline text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
