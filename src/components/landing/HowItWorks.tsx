"use client";

import { motion } from "framer-motion";
import { Scan, Brain, GitBranch, Zap, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Scan,
    title: "Detect",
    description:
      "Continuously ingests data from IoT sensors, fleet trackers, infrastructure monitors, and operational feeds. Anomalies trigger instant alerts.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    accent: "bg-indigo-500/40",
  },
  {
    icon: Brain,
    title: "Analyze",
    description:
      "Cross-references multiple data sources, applies pattern matching, and runs historical analysis to understand the full context of each incident.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    accent: "bg-violet-500/40",
  },
  {
    icon: GitBranch,
    title: "Decide",
    description:
      "Evaluates response options using risk models, SLA constraints, and confidence scoring. Surfaces the optimal action with full reasoning transparency.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    accent: "bg-amber-500/40",
  },
  {
    icon: Zap,
    title: "Respond",
    description:
      "Executes the recommended action, generates a human-readable response, notifies stakeholders, and logs the full decision trail for audit.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    accent: "bg-emerald-500/40",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">
            Pipeline
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            How Aegiscore Works
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto">
            A four-stage autonomous pipeline that transforms raw operational
            data into decisive, explainable action.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.45 }}
                className="relative"
              >
                <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 h-full hover:border-zinc-700/60 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-lg border ${step.bg}`}
                    >
                      <Icon className={`w-4 h-4 ${step.color}`} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-600 uppercase">
                        Step {index + 1}
                      </span>
                      <h3 className="text-sm font-semibold text-zinc-200">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {/* Connector arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-700" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
