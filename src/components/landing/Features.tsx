"use client";

import { motion } from "framer-motion";
import { Scan, Brain, GitBranch, Zap, Radio, Shield, BarChart3, Clock } from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Real-Time Anomaly Detection",
    description:
      "Continuously monitors data streams across your operational infrastructure, flagging deviations before they escalate.",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: Brain,
    title: "Multi-Source Analysis",
    description:
      "Correlates signals from IoT sensors, fleet trackers, infrastructure monitors, and threat feeds for contextual understanding.",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: GitBranch,
    title: "Risk-Weighted Decisions",
    description:
      "Evaluates multiple response strategies, weighing confidence levels, SLA constraints, and operational risk before recommending action.",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Zap,
    title: "Automated Response",
    description:
      "Executes approved actions with human-readable explanations, maintaining a complete audit trail for compliance and review.",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
];

export function Features() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">
            Capabilities
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Intelligence at Every Stage
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto">
            From detection to response, Aegiscore AI provides end-to-end
            autonomous decision support for your critical operations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6 hover:border-zinc-700/60 transition-colors group"
              >
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${feature.iconBg} mb-4 group-hover:scale-105 transition-transform`}
                >
                  <Icon className={`w-5 h-5 ${feature.iconColor}`} />
                </div>
                <h3 className="text-sm font-semibold text-zinc-200 mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
