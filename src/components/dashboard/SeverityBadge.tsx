import { cn } from "@/lib/utils";
import { Severity } from "@/lib/data";

const severityStyles: Record<Severity, string> = {
  critical:
    "bg-red-500/10 text-red-400 border-red-500/20",
  high:
    "bg-amber-500/10 text-amber-400 border-amber-500/20",
  medium:
    "bg-blue-500/10 text-blue-400 border-blue-500/20",
  low:
    "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        severityStyles[severity]
      )}
    >
      <span
        className={cn("w-1.5 h-1.5 rounded-full", {
          "bg-red-400": severity === "critical",
          "bg-amber-400": severity === "high",
          "bg-blue-400": severity === "medium",
          "bg-zinc-400": severity === "low",
        })}
      />
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
}
