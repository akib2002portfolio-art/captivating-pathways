import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ActionButton } from "@/components/site/ActionButton";
import { FieldError, fieldClass } from "@/components/site/Field";
import { Reveal, RevealWords, SectionLabel } from "@/components/site/Reveal";
import {
  email as emailRule,
  maxLength,
  required,
  useFormValidation,
  type Rule,
} from "@/lib/use-form-validation";

const title = "Contact CareerOS — talk to the team";
const description =
  "Questions about the student beta, partnerships with universities, or feedback on the career progression model? Send the CareerOS team a message.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const schema = useMemo<Record<string, Rule[]>>(
    () => ({
      name: [required("Name"), maxLength(100, "Name")],
      email: [required("Email"), emailRule, maxLength(255, "Email")],
      message: [required("Message"), maxLength(1000, "Message")],
    }),
    [],
  );

  const { errors, blur, clear, validateAll } = useFormValidation(schema);

  return (
    <section className="section-y-top relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-guides pointer-events-none absolute inset-0 opacity-50"
      />
      <div className="relative mx-auto grid max-w-[1400px] gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
          </Reveal>
          <h1 className="display-xl mt-8 max-w-[12ch]">
            <RevealWords text="Say something useful." />
          </h1>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[44ch] text-base leading-relaxed text-muted-foreground">
              Beta access, university partnerships, or a sharp critique of how we model career
              progression — all equally welcome.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-12 space-y-6">
              <div>
                <dt className="label-mono">Email</dt>
                <dd className="mt-2 text-sm text-foreground">hello@careeros.app</dd>
              </div>
              <div>
                <dt className="label-mono">Response time</dt>
                <dd className="mt-2 text-sm text-foreground">Usually within two working days</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            noValidate
            className="surface rounded-xl p-8 sm:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(false);
              if (!validateAll(e.currentTarget)) return;
              setSent(true);
            }}
          >
            <div className="space-y-2">
              <div>
                <label htmlFor="name" className="label-mono">
                  Name
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
                  placeholder="Your name"
                />
                <FieldError id="name-error" message={errors["name"]} />
              </div>
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
                <label htmlFor="message" className="label-mono">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={1000}
                  aria-invalid={!!errors["message"]}
                  aria-describedby="message-error"
                  onChange={() => clear("message")}
                  onBlur={(e) => blur("message", e.currentTarget.value)}
                  className={`${fieldClass(!!errors["message"])} mt-3 resize-none`}
                  placeholder="What's on your mind?"
                />
                <FieldError id="message-error" message={errors["message"]} />
              </div>
            </div>

            <ActionButton type="submit" size="lg" className="mt-6 w-full">
              Send message
            </ActionButton>

            <p aria-live="polite" className="mt-4 min-h-5 text-xs text-signal">
              {sent ? "Thanks — your message is queued. We'll be in touch." : ""}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
