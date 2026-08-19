import { createFileRoute } from "@tanstack/react-router";

import { AuthShell } from "@/components/site/AuthShell";

const title = "Sign in — CareerOS";
const description = "Sign in to your CareerOS career file to continue your missions and evidence.";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/signin" },
    ],
    links: [{ rel: "canonical", href: "/signin" }],
  }),
  component: SignInPage,
});

function SignInPage() {
  return (
    <AuthShell
      mode="signin"
      title="Welcome back."
      subtitle="Pick up where your last mission left off."
      aside={
        <p className="display-md">
          Progress is what happens between two sign-ins that both point the same direction.
        </p>
      }
    />
  );
}
