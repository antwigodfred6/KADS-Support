/**
 * Every piece of copy that makes a factual claim carries a status:
 *  - verified:    on the live site and/or a public record, and not in doubt
 *  - confirm:     on the live site, but may be out of date. Needs client sign-off
 *  - placeholder: written for the new site; must be replaced or approved
 *
 * Items that are not "verified" show a small review flag when
 * NEXT_PUBLIC_SHOW_CONTENT_FLAGS=true (dev and client-review previews).
 */
export type ContentStatus = "verified" | "confirm" | "placeholder";

export type Flagged<T> = {
  value: T;
  status: ContentStatus;
  /** Why it needs review, shown in the flag tooltip and the QA report. */
  note?: string;
  /** Where the wording came from on the old site. */
  source?: string;
};

export type IconName =
  | "home"
  | "key"
  | "shield"
  | "sofa"
  | "life-buoy"
  | "users"
  | "sprout"
  | "hammer"
  | "book-open"
  | "briefcase"
  | "message-circle"
  | "compass"
  | "heart-handshake"
  | "sparkles"
  | "hand-heart"
  | "lock"
  | "megaphone"
  | "fingerprint"
  | "graduation-cap"
  | "map-pin"
  | "clock"
  | "file-text"
  | "phone";
