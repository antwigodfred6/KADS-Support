import type { Flagged, IconName } from "./types";
import type { SiteImage } from "@/components/art/arch-frame";

/** AI-generated illustrative photos (Runway, 11 Nov 2026). Not KADS properties: each shows an "Illustrative image" label. */
const ai = (file: string, alt: string, width = 1600, height = 1200): SiteImage => ({
  src: `/images/accommodation/${file}`,
  alt,
  width,
  height,
  illustrative: true,
});

/**
 * Page copy. Rewritten from the old site for clarity; every factual claim is
 * traceable to the page named in `source` (see docs/source-content/).
 */

export const home = {
  hero: {
    eyebrow: "Supported living for young people 16+",
    title: "A steady place to find your own path.",
    lead: "We support young people with a personalised plan to build confidence, learn life skills and make the move into independence and adulthood.",
    source: "/ (hero quote)",
  },
  intro: {
    eyebrow: "Who we are",
    title: "Helping young people live independently.",
    body: [
      "KADS Support offers a safe, therapeutic, nurturing and empowering environment for young people aged 16 and over.",
      "Everyone at KADS works to make sure our service follows best practice and keeps up with current legislation and policy, guided by four core beliefs.",
    ],
    source: "/, /about-dacs/",
  },
  partners: {
    eyebrow: "Working together",
    title: "Part of a wider circle of support.",
    body: "We work with partners from local councils to private organisations, extending what we can offer in counselling and mentoring, employment, trade skills and accommodation.",
    source: "/ (Our Partners)",
  },
  cta: {
    title: "Talk to our management team.",
    body: "Whether you're a professional making a referral, a young person, or an organisation that wants to help, we'd like to hear from you.",
  },
};

export const accommodation = {
  hero: {
    eyebrow: "Accommodation",
    title: "Somewhere safe to settle, and to grow.",
    lead: "KADS Support offers a nurturing, therapeutic environment where young people can feel safe and comfortable in their surroundings.",
    source: "/our-services/",
    image: ai("hero-front-door.jpg", "The navy front door of a London terraced house, open onto a warmly lit hallway, with a key in the lock", 2400, 1340),
  },
  types: [
    {
      title: "Shared accommodation",
      icon: "users" as IconName,
      body: "A shared house with your own room, and a living room, kitchen and dining space in common.",
      image: ai("shared-living-room.jpg", "A bright shared living room with two sofas, a dining table and shelves of books and games"),
    },
    {
      title: "Stand-alone units",
      icon: "home" as IconName,
      body: "A self-contained space for young people ready for more independence, with support close by.",
      image: ai("studio-flat.jpg", "A compact studio flat with a small kitchenette, a table for two and a neatly made bed"),
      flag: { value: true, status: "placeholder", note: "Short description written for the new site. Client to confirm what a stand-alone unit includes." } satisfies Flagged<boolean>,
    },
    {
      title: "24-hour support units",
      icon: "clock" as IconName,
      body: "Accommodation with staff on hand around the clock, for young people who need more support.",
      image: ai("staff-office-evening.jpg", "A calm staff office in the evening, with a desk lamp, a notebook and a mug of tea"),
      flag: { value: true, status: "placeholder", note: "Short description written for the new site. Client to confirm how 24-hour support units work." } satisfies Flagged<boolean>,
    },
  ],
  features: [
    {
      title: "Their own space",
      image: ai("own-bedroom.jpg", "A personalised bedroom with a single bed, art prints, fairy lights, plants and a small desk"),
      icon: "sofa" as IconName,
      body: "Their own bedroom and storage, with a say in the décor so it can feel like theirs.",
    },
    {
      title: "Security and privacy",
      image: ai("key-in-door.jpg", "A hand turning a key in a bedroom door lock, with a small orange tag on the keyring"),
      icon: "lock" as IconName,
      body: "Every bedroom is secure, and each young person has their own key to keep their privacy and belongings safe.",
    },
    {
      title: "Shared amenities",
      image: ai("shared-kitchen.jpg", "A clean shared kitchen with a cooker and fruit bowl, and a washing machine and dryer in the utility area beyond"),
      icon: "home" as IconName,
      body: "A shared living room, a kitchen with food and full cooking facilities, a dining room, bathroom facilities, and a washing machine and tumble dryer.",
      flag: {
        value: true,
        status: "confirm",
        note: "Old site describes one specific property ('bathroom and 2 toilets'). Generalised here. Confirm it applies to all homes.",
      } satisfies Flagged<boolean>,
    },
    {
      title: "Support around the clock",
      icon: "clock" as IconName,
      body: "Staff are on hand 24/7 to offer guidance and support.",
      flag: {
        value: true,
        status: "confirm",
        note: "'Support 24/7' from the old site. Confirm still accurate.",
      } satisfies Flagged<boolean>,
    },
    {
      title: "Links with the community",
      icon: "map-pin" as IconName,
      body: "Staff help young people build a positive relationship with their local community.",
    },
    {
      title: "Skills for life",
      icon: "sparkles" as IconName,
      body: "Guidance with cooking, laundry and budgeting; encouragement to attend education or work; help finding information about health, benefits and housing.",
    },
  ],
  /**
   * The four homes, shown by AREA ONLY. Supplied by the site owner 11 Nov 2026.
   * SAFEGUARDING: never add house numbers, street names or full postcodes here
   * (this repository is public). Full addresses are shared with referring
   * professionals during the referral process.
   */
  homes: {
    eyebrow: "Our homes",
    title: "Four homes in West London and Surrey.",
    lead: "Three of our homes are in the London Borough of Hounslow and one is in Stanwell, Surrey, all close to transport links, colleges and local services.",
    areas: [
      { area: "Hounslow", council: "London Borough of Hounslow", district: "TW3" },
      { area: "Bedfont, Feltham", council: "London Borough of Hounslow", district: "TW14" },
      { area: "Isleworth", council: "London Borough of Hounslow", district: "TW7" },
      { area: "Stanwell", council: "Spelthorne Borough Council, Surrey", district: "TW19" },
    ],
    privacy:
      "To protect the young people who live with us, we don't publish our full addresses. We share them with referring professionals as part of the referral process.",
    lead_flag: {
      value: true,
      status: "placeholder",
      note: "'Close to transport links, colleges and local services' is new wording. Client to confirm or edit.",
    } satisfies Flagged<boolean>,
  },
  emergency: {
    title: "Emergency placements",
    body: "We can offer respite, or accommodate a young person in an emergency, if it's judged suitable for them. All paperwork and risk assessments need to be received on arrival, so we can confirm suitability and safeguard the other young people living with us.",
    source: "/our-services/ (Emergency Placements)",
  },
};

export const employment = {
  hero: {
    eyebrow: "Employment & Training",
    title: "From basic skills to a trade.",
    lead: "Knowledge, training and employment go hand in hand. We make sure young people can get the training they need to improve their job prospects and develop themselves.",
    source: "/employment-training/",
  },
  training: [
    {
      title: "Basic skills",
      icon: "book-open" as IconName,
      body: "Building strong foundations in literacy and numeracy, and the everyday knowledge young people need for life.",
    },
    {
      title: "Train & trade",
      icon: "hammer" as IconName,
      body: "Developing practical trade skills such as bricklaying, decorating, plumbing and carpentry.",
      flag: {
        value: true,
        status: "confirm",
        note: "Confirm whether delivered by KADS or partners, and whether any courses are accredited.",
      } satisfies Flagged<boolean>,
    },
    {
      title: "Gardening & horticulture",
      icon: "sprout" as IconName,
      body: "Learning new skills in gardening and horticulture through the Putting Down Roots for Young People project.",
      flag: {
        value: true,
        status: "confirm",
        note: "Old site: funded by the Big Lottery Fund through Our Bright Future. Both names have changed or ended. Is the project still running?",
      } satisfies Flagged<boolean>,
    },
  ],
  employment: [
    {
      title: "Spear employment programme",
      icon: "briefcase" as IconName,
      body: "Routes into work through Spear, one of our partner organisations.",
      flag: {
        value: true,
        status: "confirm",
        note: "Old site's Spear description was a copy-paste error. This wording is a placeholder. Please supply an accurate description.",
      } satisfies Flagged<boolean>,
    },
    {
      title: "Multiple disadvantage employment",
      icon: "compass" as IconName,
      body: "Practical support to help young people facing multiple disadvantages find employment.",
    },
  ],
  staff: {
    title: "How our staff help",
    body: "Staff work alongside each young person to build positive, effective relationships, aiming for the best outcomes. We also work in partnership with referring agencies, forming a professional and productive working relationship.",
    source: "/employment-training/ (How Our Staff Helps)",
  },
};

export const advice = {
  hero: {
    eyebrow: "Advice & Support",
    title: "Someone in your corner.",
    lead: "Constructive advice and support are the cornerstone of personal development. We make sure young people get professional advice, so they have the knowledge and support to grow.",
    source: "/support-programs/",
  },
  counselling: {
    title: "1:1 counselling",
    lead: "Our one-to-one counselling service aims to promote good mental health and wellbeing, in a confidential and safe setting.",
    topicsIntro: "Counselling can help people cope with things like:",
    topics: [
      "Mild to moderate depression",
      "Anxiety, stress and panic attacks",
      "Alcohol or drug use",
      "Anger and irritability",
      "Relationship and family difficulties",
      "Low self-esteem and confidence",
      "Loss, bereavement and separation",
      "Difficulties at work or in education",
      "Sex, sexuality and gender identity",
      "Difficult memories or past experiences",
    ],
    flag: {
      value: true,
      status: "confirm",
      note: "Confirm who delivers counselling and their qualifications/memberships before launch.",
    } satisfies Flagged<boolean>,
  },
  mentoring: {
    title: "Mentoring programme",
    lead: "We mentor young people aged 16 to 22 in London, helping them take steps towards a positive future and reach their short- and long-term goals.",
    intro:
      "Mentoring moves through roughly sequential stages: getting to know the young person and building rapport, discovering community opportunities together, making lasting links between the two, and finally stepping back while keeping a watching brief.",
    stages: [
      {
        title: "Research and connection",
        body: "Finding out what's available, from education to voluntary and community groups, family and friends, and connecting young people to a wider circle of support and a more varied life.",
      },
      {
        title: "Facilitation",
        body: "Developing a circle of support around the young person, built on their own interests and ideas.",
      },
      {
        title: "Negotiation and advocacy",
        body: "Helping young people speak up for themselves, or speaking up on their behalf where needed. For example, helping secure a role in a community group.",
      },
    ],
    source: "/support-programs/ (Mentoring Program)",
  },
};

export const objectives = {
  hero: {
    eyebrow: "Our objectives",
    quote: "A place to call home.",
    lead: "Our ethos and values shape everything we do. All staff work to make sure our service follows best practice and keeps up with current legislation and policy.",
    source: "/our-objectives/",
  },
  items: [
    {
      title: "Accommodation",
      body: "Stable accommodation for young people aged 16+ that meets their individual needs, encourages personal choice, and creates a sense of home.",
    },
    {
      title: "Safety",
      body: "A structured, stimulating, nurturing, therapeutic and safe environment, free from prejudice and discrimination.",
    },
    {
      title: "Freedom of expression",
      body: "An environment where young people feel listened to, and can express their wishes, needs and feelings.",
    },
    {
      title: "Identity",
      body: "Helping young people develop their own identity and a positive self-image by treating them with dignity and respect and reinforcing positive behaviour.",
    },
    {
      title: "Privacy",
      body: "Respecting young people's privacy and confidentiality.",
    },
    {
      title: "Development",
      body: "Supporting young people's health, education and personal development needs.",
    },
    {
      title: "Community",
      body: "Encouraging young people to keep and build positive relationships with their peers, family and community.",
    },
    {
      title: "Feedback & involvement",
      body: "Putting young people's needs at the heart of KADS Support, and involving them in decisions to promote independence.",
    },
  ],
  approach: {
    title: "A holistic approach",
    body: [
      "We make sure each young person's practical, physical, intellectual, social and cultural needs are met.",
      "Staff maintain a high quality of support by working alongside each young person's professional team, following KADS Support's policies and procedures.",
    ],
  },
};

export const about = {
  hero: {
    eyebrow: "About us",
    title: "A safe, nurturing start to adult life.",
    lead: "KADS Support is a private provider offering a safe, therapeutic, nurturing and empowering environment for young people aged 16 and over.",
    source: "/about-dacs/",
  },
  manager: {
    status: "confirm",
    note: "From the old About page. Confirm Doreen is still the manager, and approve the name and qualification wording before launch.",
    value: {
      name: "Doreen Kajura",
      role: "Manager",
      body: "Doreen is a qualified, registered social worker with extensive experience of both residential units and community services, working with young people living in semi-independent accommodation.",
    },
  } satisfies Flagged<{ name: string; role: string; body: string }>,
  policies: {
    title: "Policies and procedures",
    body: "We have comprehensive, up-to-date policies and procedures for all staff, designed to safeguard every young person we accommodate. These include robust safer recruitment and whistleblowing policies.",
  },
};

export const referrals = {
  hero: {
    eyebrow: "For professionals",
    title: "Making a referral.",
    lead: "Referrals are made through the local authority. Here's what happens, and what we'll need from you.",
    source: "/about-dacs/ (Referrals & Admissions)",
  },
  steps: [
    {
      title: "Get in touch",
      body: "Contact our team by phone or email to discuss the young person and check suitability.",
      icon: "phone" as IconName,
    },
    {
      title: "Send the referral",
      body: "The referral comes from the local authority and must include a copy of a recent risk assessment.",
      icon: "file-text" as IconName,
    },
    {
      title: "Visit and meet",
      body: "The young person visits with their allocated social worker or care manager to see the accommodation. We meet to discuss their support needs, any issues in their current accommodation, and their risk assessment.",
      icon: "users" as IconName,
    },
    {
      title: "Moving in",
      body: "The young person receives a welcome pack with a User's Guide covering the support we give, house rules, how to make a complaint, and useful numbers. We work to keep the move as smooth as possible.",
      icon: "key" as IconName,
    },
  ],
  awaiting: {
    status: "placeholder",
    note: "Eligibility criteria, areas served, referral email/form and response times are needed from the client.",
    value: [
      "Eligibility criteria and age range",
      "Boroughs and areas we cover",
      "Secure referral email or form",
      "Typical response time",
    ],
  } satisfies Flagged<string[]>,
};
