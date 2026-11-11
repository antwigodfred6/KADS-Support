import { AwaitingContent } from "@/components/sections/awaiting-content";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

// AWAITING CLIENT CONTENT: approved privacy notice (UK GDPR). Do not draft legal text here.
export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "How KADS Support collects and uses personal information.",
  path: routes.privacy,
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <AwaitingContent
      eyebrow="Legal"
      title="Privacy policy"
      intro="Our privacy policy explains how we collect, use and protect personal information, including anything you send us through this website. If you have a question about your data in the meantime, please contact us."
    />
  );
}
