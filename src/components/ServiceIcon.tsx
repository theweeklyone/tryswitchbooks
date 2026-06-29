import { Receipt, FileText, Calculator, Users, TrendingUp, ClipboardCheck } from "lucide-react";

// Maps a service's `icon` string to a lucide icon component. Falls back to a
// neutral clipboard so a typo never crashes the build.
const ICONS: Record<string, typeof Receipt> = {
  Receipt,
  FileText,
  Calculator,
  Users,
  TrendingUp,
  ClipboardCheck,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? ClipboardCheck;
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}
