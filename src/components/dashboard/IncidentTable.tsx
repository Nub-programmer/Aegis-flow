"use client";

import { motion } from "framer-motion";
import { Play, Radio, MapPin, Droplets, Server } from "lucide-react";
import { Incident } from "@/lib/data";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

const sourceIcons: Record<string, React.ElementType> = {
  "Campus IoT Network": Server,
  "Logistics Fleet Tracker": MapPin,
  "Municipal Water System": Droplets,
};

interface IncidentTableProps {
  incidents: Incident[];
  selectedId: string | null;
  processingId: string | null;
  onSelect: (id: string) => void;
  onRunAgent: (id: string) => void;
}

export function IncidentTable({
  incidents,
  selectedId,
  processingId,
  onSelect,
  onRunAgent,
}: IncidentTableProps) {
  if (incidents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Radio className="w-10 h-10 text-zinc-700 mb-3" />
        <p className="text-sm text-zinc-500">No incidents match the current filters</p>
        <p className="text-xs text-zinc-600 mt-1">Try adjusting your filter criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {incidents.map((incident, index) => {
        const SourceIcon = sourceIcons[incident.source] || Server;
        const isSelected = selectedId === incident.id;
        const isProcessing = processingId === incident.id;

        return (
          <motion.div
            key={incident.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.35 }}
            onClick={() => onSelect(incident.id)}
            className={cn(
              "relative rounded-xl border p-5 cursor-pointer transition-all duration-200",
              isSelected
                ? "border-indigo-500/30 bg-indigo-500/5"
                : "border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700/60 hover:bg-zinc-900/50"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800/60 border border-zinc-700/40 mt-0.5 shrink-0">
                  <SourceIcon className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="text-xs font-mono text-zinc-500">
                      {incident.id}
                    </span>
                    <SeverityBadge severity={incident.severity} />
                    <StatusBadge status={incident.status} />
                  </div>
                  <h3 className="text-sm font-medium text-zinc-200 mb-1 truncate">
                    {incident.issueType}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {incident.source} · Detected{" "}
                    {new Date(incident.detectedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRunAgent(incident.id);
                }}
                disabled={isProcessing || incident.status === "resolved" || (processingId !== null && processingId !== incident.id)}
                className={cn(
                  "shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all",
                  incident.status === "resolved"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default"
                    : isProcessing
                    ? "bg-violet-500/10 text-violet-400 border border-violet-500/20 cursor-wait"
                    : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/30"
                )}
              >
                {incident.status === "resolved" ? (
                  "Resolved"
                ) : isProcessing ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    Processing
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    Run Agent
                  </>
                )}
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
