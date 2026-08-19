import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, type LegalBlock } from "@/components/site/LegalPage";

const title = "Privacy Policy — CareerOS";
const description =
  "How CareerOS collects, uses and protects the information in your career file during the student beta.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

const blocks: LegalBlock[] = [
  {
    h: "What we collect",
    p: "During the beta we collect the details you enter into your career file — background, skills, goals, missions and the evidence you attach — plus basic account and usage information needed to run the product.",
  },
  {
    h: "How we use it",
    p: "Your information is used to generate your gap analysis, missions and progress view, and to improve how CareerOS models career progression. We do not sell personal data.",
  },
  {
    h: "Sharing",
    p: "Nothing in your career file is public unless you choose to share it. Service providers who help us operate CareerOS access data only as needed to provide their service.",
  },
  {
    h: "Your control",
    p: "You can request a copy of your data or ask us to delete your account and its contents at any time by emailing hello@careeros.app.",
  },
  {
    h: "Changes",
    p: "This policy will evolve as CareerOS moves out of beta. Material changes will be announced in-product before they take effect.",
  },
];

function PrivacyPage() {
  return (
    <LegalPage
      label="Legal"
      heading="Privacy Policy"
      intro="A plain-language summary of what CareerOS stores and why. This is a beta placeholder document and not legal advice."
      blocks={blocks}
    />
  );
}
