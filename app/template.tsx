/**
 * Subtle fade between pages. template.tsx re-mounts on every navigation, so a
 * short CSS fade runs each time. It's pure CSS: no hydration risk, runs before
 * JavaScript loads, and is disabled for prefers-reduced-motion (globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="motion-safe:animate-[page-in_0.28s_ease-out_both]">{children}</div>;
}
