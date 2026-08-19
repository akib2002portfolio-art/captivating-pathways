import { createFileRoute } from "@tanstack/react-router";

import { AuthShell } from "@/components/site/AuthShell";

const title = "Create your CareerOS account";
const description =
  "Join the CareerOS student beta: set your direction, run missions and turn your work into evidence.";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/signup" },
    ],
    links: [{ rel: "canonical", href: "/signup" }],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <AuthShell
      mode="signup"
      title="Create your career file."
      subtitle="Two minutes to set a starting point. The rest is work you were going to do anyway — just pointed somewhere."
      aside={
        <p className="display-md">
          Every mission you finish leaves something behind you can show someone.
        </p>
      }
    />
  );
}
