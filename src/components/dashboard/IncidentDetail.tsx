"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Target,
  MessageSquare,
  TrendingUp,
  X,
  ChevronRight,
} from "lucide-react";
import { Incident } from "@/lib/data";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";

interface IncidentDetailProps {
  incident: Incident | null;
  onClose: () => void;
}

export function IncidentDetail({ incident, onClose }: IncidentDetailProps) {
  return (
    <AnimatePresence mode="wait">
      {incident && (
        <motion.div
          key={incident.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/60">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-zinc-500">
                  {incident.id}
                </span>
                <SeverityBadge severity={incident.severity} />
                <StatusBadge status={incident.status} />
              </div>
              <h3 className="text-sm font-medium text-zinc-200">
                {incident.issueType}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 space-y-5 max-h-[calc(100vh-320px)] overflow-y-auto">
            {/* Agent Reasoning */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Agent Reasoning
                </h4>
              </div>
              <div className="space-y-2">
                {incident.reasoning.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-2.5"
                  >
                    <div className="flex flex-col items-center mt-1.5 shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
                      {i < incident.reasoning.length - 1 && (
                        <div className="w-px h-full bg-zinc-800 mt-1" />
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed pb-2">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Recommended Action */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Recommended Action
                </h4>
              </div>
              <div className="rounded-lg border border-zinc-800/60 bg-zinc-800/20 p-4">
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {incident.recommendedAction}
                </p>
              </div>
            </section>

            {/* Response Message */}
            {incident.status === "resolved" && (
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Response Delivered
                  </h4>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <p className="text-xs text-emerald-300/90 leading-relaxed">
                    {incident.responseMessage}
                  </p>
                </div>
              </motion.section>
            )}

            {/* Metrics */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-zinc-500" />
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Agent Metrics
                </h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-zinc-800/60 bg-zinc-800/20 p-3 text-center">
                  <p className="text-lg font-semibold text-zinc-200">
                    {incident.metrics.confidence}%
                  </p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
                    Confidence
                  </p>
                </div>
                <div className="rounded-lg border border-zinc-800/60 bg-zinc-800/20 p-3 text-center">
                  <p className="text-lg font-semibold text-zinc-200">
                    {(incident.metrics.responseTimeMs / 1000).toFixed(1)}s
                  </p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
                    Response
                  </p>
                </div>
                <div className="rounded-lg border border-zinc-800/60 bg-zinc-800/20 p-3 text-center">
                  <p className="text-lg font-semibold text-zinc-200">
                    {incident.metrics.dataPointsAnalyzed.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
                    Data Points
                  </p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
