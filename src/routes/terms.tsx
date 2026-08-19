import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, type LegalBlock } from "@/components/site/LegalPage";

const title = "Terms of Service — CareerOS";
const description =
  "The terms that apply while using the CareerOS student beta, including acceptable use and content ownership.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

const blocks: LegalBlock[] = [
  {
    h: "Beta software",
    p: "CareerOS is in active development. Features may change or break, and guidance produced by the system is informational — it is not a guarantee of employment outcomes.",
  },
  {
    h: "Your account",
    p: "You're responsible for keeping your login details secure and for the accuracy of the information you record in your career file.",
  },
  {
    h: "Your content",
    p: "You own the evidence, projects and writing you add to CareerOS. You grant us the limited permission needed to store and display it back to you and anyone you share it with.",
  },
  {
    h: "Acceptable use",
    p: "Don't misrepresent evidence, upload content you don't have rights to, or attempt to disrupt the service for other users.",
  },
  {
    h: "Ending use",
    p: "You can stop using CareerOS and delete your account at any time. We may suspend accounts that breach these terms.",
  },
];

function TermsPage() {
  return (
    <LegalPage
      label="Legal"
      heading="Terms of Service"
      intro="The ground rules for using CareerOS during the student beta. This is a beta placeholder document and not legal advice."
      blocks={blocks}
    />
  );
}
