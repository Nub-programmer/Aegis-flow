"use client";

import { motion } from "framer-motion";
import { Scan, Brain, GitBranch, Zap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: "detect", label: "Detect", icon: Scan, description: "Anomaly detected" },
  { id: "analyze", label: "Analyze", icon: Brain, description: "Pattern analysis" },
  { id: "decide", label: "Decide", icon: GitBranch, description: "Action selection" },
  { id: "respond", label: "Respond", icon: Zap, description: "Execute response" },
];

interface WorkflowTimelineProps {
  currentStep: number; // 0-4, where 4 = all complete
}

export function WorkflowTimeline({ currentStep }: WorkflowTimelineProps) {
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5">
      <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
        Agent Workflow
      </h4>
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <div key={step.id} className="flex items-center gap-2 flex-1">
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    borderColor: isComplete
                      ? "rgba(52, 211, 153, 0.4)"
                      : isActive
                      ? "rgba(99, 102, 241, 0.5)"
                      : "rgba(39, 39, 42, 0.6)",
                    backgroundColor: isComplete
                      ? "rgba(52, 211, 153, 0.1)"
                      : isActive
                      ? "rgba(99, 102, 241, 0.1)"
                      : "rgba(24, 24, 27, 0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center w-10 h-10 rounded-xl border"
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
                  ) : (
                    <Icon
                      className={cn(
                        "w-4 h-4",
                        isActive ? "text-indigo-400" : "text-zinc-600"
                      )}
                    />
                  )}
                </motion.div>
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    isComplete
                      ? "text-emerald-400"
                      : isActive
                      ? "text-indigo-400"
                      : "text-zinc-600"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-px relative -mt-5">
                  <div className="absolute inset-0 bg-zinc-800" />
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: isComplete ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-emerald-500/40 origin-left"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
