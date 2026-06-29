import { clsx } from "@/lib/utils";

// Marks a content block for the scroll reveal handled by RevealController.
// A plain wrapper, so it is safe around cards (its transform does not clash
// with a card's own hover lift). Siblings stagger automatically.
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("reveal", className)}>{children}</div>;
}
