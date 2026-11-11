import {
  BookOpen,
  Briefcase,
  Clock,
  Compass,
  FileText,
  Fingerprint,
  GraduationCap,
  Hammer,
  HandHeart,
  HeartHandshake,
  Home,
  Key,
  LifeBuoy,
  Lock,
  MapPin,
  Megaphone,
  MessageCircle,
  Phone,
  Shield,
  Sofa,
  Sparkles,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "cn";
import type { IconName } from "@/content/types";

const icons: Record<IconName, LucideIcon> = {
  home: Home,
  key: Key,
  shield: Shield,
  sofa: Sofa,
  "life-buoy": LifeBuoy,
  users: Users,
  sprout: Sprout,
  hammer: Hammer,
  "book-open": BookOpen,
  briefcase: Briefcase,
  "message-circle": MessageCircle,
  compass: Compass,
  "heart-handshake": HeartHandshake,
  sparkles: Sparkles,
  "hand-heart": HandHeart,
  lock: Lock,
  megaphone: Megaphone,
  fingerprint: Fingerprint,
  "graduation-cap": GraduationCap,
  "map-pin": MapPin,
  clock: Clock,
  "file-text": FileText,
  phone: Phone,
};

/** Decorative icon in a soft tinted disc. Always pair with visible text. */
export function IconBadge({
  name,
  tone = "mist",
  className,
}: {
  name: IconName;
  tone?: "mist" | "orange" | "dark";
  className?: string;
}) {
  const Icon = icons[name];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid size-12 shrink-0 place-items-center rounded-full transition-transform duration-300 ease-(--ease-out-soft)",
        tone === "mist" && "bg-mist text-teal-600",
        tone === "orange" && "bg-orange-100 text-orange-700",
        tone === "dark" && "bg-paper/10 text-orange",
        className
      )}
    >
      <Icon className="size-[22px]" strokeWidth={1.75} />
    </span>
  );
}
