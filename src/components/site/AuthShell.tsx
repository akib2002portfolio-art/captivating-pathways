import { Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";

import { ActionButton } from "./ActionButton";
import { FieldError, fieldClass } from "./Field";
import { Wordmark } from "./Wordmark";
import {
  email as emailRule,
  maxLength,
  minLength,
  required,
  useFormValidation,
  type Rule,
} from "@/lib/use-form-validation";

type Props = {
  mode: "signin" | "signup";
  title: string;
  subtitle: string;
  aside: ReactNode;
};

export function AuthShell({ mode, title, subtitle, aside }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const schema = useMemo(() => {
    const s: Record<string, Rule[]> = {
      email: [required("Email"), emailRule, maxLength(255, "Email")],
      password: [required("Password"), minLength(8, "Password"), maxLength(72, "Password")],
    };
    if (mode === "signup") s["name"] = [required("Full name"), maxLength(100, "Full name")];
    return s;
  }, [mode]);

  const { errors, blur, clear, validateAll } = useFormValidation(schema);

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
            noValidate
            className="mt-10 space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(false);
              if (!validateAll(e.currentTarget)) return;
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
                  maxLength={100}
                  aria-invalid={!!errors["name"]}
                  aria-describedby="name-error"
                  onChange={() => clear("name")}
                  onBlur={(e) => blur("name", e.currentTarget.value)}
                  className={`${fieldClass(!!errors["name"])} mt-3`}
                  placeholder="Ada Lovelace"
                />
                <FieldError id="name-error" message={errors["name"]} />
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
                maxLength={255}
                aria-invalid={!!errors["email"]}
                aria-describedby="email-error"
                onChange={() => clear("email")}
                onBlur={(e) => blur("email", e.currentTarget.value)}
                className={`${fieldClass(!!errors["email"])} mt-3`}
                placeholder="you@university.edu"
              />
              <FieldError id="email-error" message={errors["email"]} />
            </div>
            <div>
              <label htmlFor="password" className="label-mono">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                maxLength={72}
                aria-invalid={!!errors["password"]}
                aria-describedby="password-error"
                onChange={() => clear("password")}
                onBlur={(e) => blur("password", e.currentTarget.value)}
                className={`${fieldClass(!!errors["password"])} mt-3`}
                placeholder="At least 8 characters"
              />
              <FieldError id="password-error" message={errors["password"]} />
            </div>

            <ActionButton type="submit" size="lg" className="mt-4 w-full">
              {mode === "signup" ? "Create account" : "Sign in"}
            </ActionButton>

            <p aria-live="polite" className="min-h-5 pt-2 text-xs text-signal">
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
