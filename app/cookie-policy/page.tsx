import { AwaitingContent } from "@/components/sections/awaiting-content";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

// AWAITING CLIENT CONTENT: approved cookie statement.
// Technical fact for the statement: this site sets no analytics or advertising cookies.
export const metadata = pageMetadata({
  title: "Cookie policy",
  description: "How the KADS Support website uses cookies.",
  path: routes.cookies,
  noindex: true,
});

export default function CookiesPage() {
  return (
    <AwaitingContent
      eyebrow="Legal"
      title="Cookie policy"
      intro="Our cookie policy will explain how this website uses cookies. If you have any questions in the meantime, please contact us."
    />
  );
}
