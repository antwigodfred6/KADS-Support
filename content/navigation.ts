import { routes } from "@/lib/routes";

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink | { label: string; children: NavLink[] };

export const mainNav: NavItem[] = [
  { label: "Accommodation", href: routes.accommodation },
  { label: "Employment & Training", href: routes.employment },
  { label: "Advice & Support", href: routes.advice },
  {
    label: "About",
    children: [
      { label: "About us", href: routes.about, description: "Who we are and how we work" },
      { label: "Our objectives", href: routes.objectives, description: "The values behind our support" },
      { label: "Referrals", href: routes.referrals, description: "How professionals refer a young person" },
    ],
  },
  { label: "Contact", href: routes.contact },
];

export const footerNav = {
  services: [
    { label: "Accommodation", href: routes.accommodation },
    { label: "Employment & Training", href: routes.employment },
    { label: "Advice & Support", href: routes.advice },
  ],
  organisation: [
    { label: "About us", href: routes.about },
    { label: "Our objectives", href: routes.objectives },
    { label: "Referrals", href: routes.referrals },
    { label: "Contact", href: routes.contact },
  ],
  legal: [
    { label: "Privacy", href: routes.privacy },
    { label: "Cookies", href: routes.cookies },
    { label: "Accessibility", href: routes.accessibility },
    { label: "Safeguarding", href: routes.safeguarding },
  ],
} satisfies Record<string, NavLink[]>;
