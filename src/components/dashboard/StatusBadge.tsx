import { cn } from "@/lib/utils";
import { IncidentStatus } from "@/lib/data";

const statusConfig: Record<
  IncidentStatus,
  { label: string; dotClass: string; bgClass: string }
> = {
  pending: {
    label: "Pending",
    dotClass: "bg-zinc-400",
    bgClass: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  },
  analyzing: {
    label: "Analyzing",
    dotClass: "bg-violet-400 animate-pulse",
    bgClass: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  resolved: {
    label: "Resolved",
    dotClass: "bg-emerald-400",
    bgClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
};

export function StatusBadge({ status }: { status: IncidentStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.bgClass
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dotClass)} />
      {config.label}
    </span>
  );
}
