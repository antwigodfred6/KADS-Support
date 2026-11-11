import type { Flagged } from "./types";

/** Organisation details. See AUDIT.md §4 for sources. */
export const site = {
  name: "KADS Support",
  tagline: "Supported accommodation, training and guidance for young people aged 16+",
  description:
    "KADS Support provides semi-independent supported accommodation, training and employment support, mentoring and advice for young people aged 16 and over in London.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kadssupport.com").replace(/\/$/, ""),

  legalName: {
    value: "KADS Support Services Ltd",
    status: "confirm",
    note: "Companies House lists KADS SUPPORT SERVICES LTD. The old site said 'KADS Support limited'.",
  } satisfies Flagged<string>,
  companyNumber: { value: "14819315", status: "verified" } satisfies Flagged<string>,
  registeredOffice: {
    value: ["The Mille", "1000 Great West Road", "Brentford", "TW8 9DW"],
    status: "verified",
    note: "Registered office. Confirm whether people can visit.",
  } satisfies Flagged<string[]>,
  established: {
    value: "2018",
    status: "confirm",
    note: "Old site: 'established since July 2018'. Company incorporated 21 April 2023.",
  } satisfies Flagged<string>,
  ageRange: {
    value: "16+",
    status: "confirm",
    source: "/about-dacs/",
  } satisfies Flagged<string>,
  area: {
    value: "London",
    status: "confirm",
    note: "Old site mentions London (mentoring). Which boroughs are served?",
  } satisfies Flagged<string>,
  staffed247: {
    value: true,
    status: "confirm",
    note: "Old site: 'KADS Support is staffed 24/7'. Confirm still true.",
  } satisfies Flagged<boolean>,

  phone: {
    display: "020 3657 5651",
    href: "tel:+442036575651",
  },
  email: {
    display: "info@kadssupport.com",
    href: "mailto:info@kadssupport.com",
  },
} as const;
