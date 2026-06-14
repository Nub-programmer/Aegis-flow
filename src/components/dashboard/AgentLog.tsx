"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { AgentLogEntry } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const typeColors: Record<AgentLogEntry["type"], string> = {
  info: "text-zinc-400",
  analysis: "text-indigo-400",
  decision: "text-amber-400",
  action: "text-violet-400",
  success: "text-emerald-400",
  warning: "text-red-400",
};

const typeLabels: Record<AgentLogEntry["type"], string> = {
  info: "INFO",
  analysis: "ANLZ",
  decision: "DCSN",
  action: "EXEC",
  success: "DONE",
  warning: "WARN",
};

interface AgentLogProps {
  logs: AgentLogEntry[];
  visibleCount: number;
  isProcessing: boolean;
}

export function AgentLog({ logs, visibleCount, isProcessing }: AgentLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleCount]);

  const visibleLogs = logs.slice(0, visibleCount);

  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/60">
        <Terminal className="w-3.5 h-3.5 text-zinc-500" />
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Agent Activity Log
        </h4>
        {isProcessing && (
          <span className="ml-auto flex items-center gap-1.5 text-[10px] text-violet-400">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            LIVE
          </span>
        )}
      </div>
      <div
        ref={scrollRef}
        className="log-feed p-4 h-64 overflow-y-auto"
      >
        {visibleLogs.length === 0 && !isProcessing ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-zinc-600">
              Select an incident and run the agent to see activity
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {visibleLogs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3"
              >
                <span className="text-zinc-600 shrink-0 text-xs">
                  {log.timestamp}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider shrink-0 w-8",
                    typeColors[log.type]
                  )}
                >
                  {typeLabels[log.type]}
                </span>
                <span className="text-zinc-400 text-xs">{log.message}</span>
              </motion.div>
            ))}
            {isProcessing && visibleCount < logs.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-zinc-600 text-xs"
              >
                █
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
