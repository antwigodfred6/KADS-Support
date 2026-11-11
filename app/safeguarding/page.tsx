import { AwaitingContent } from "@/components/sections/awaiting-content";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

// AWAITING CLIENT CONTENT: approved safeguarding summary and Designated Safeguarding Lead contact.
export const metadata = pageMetadata({
  title: "Safeguarding",
  description: "How KADS Support keeps young people safe.",
  path: routes.safeguarding,
  noindex: true,
});

export default function SafeguardingPage() {
  return (
    <AwaitingContent
      eyebrow="Safeguarding"
      title="Keeping young people safe"
      intro="We are adding a summary of our safeguarding approach and who to contact with a concern. If you have a safeguarding concern now, please call us. If a young person is in immediate danger, call 999."
    />
  );
}
