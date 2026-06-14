"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, Zap } from "lucide-react";
import { DashboardStats } from "@/lib/hooks";

const statCards = [
  {
    key: "activeIncidents" as const,
    label: "Active Incidents",
    icon: AlertTriangle,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
  {
    key: "resolvedIncidents" as const,
    label: "Resolved",
    icon: CheckCircle2,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
  {
    key: "highSeverityAlerts" as const,
    label: "High Severity",
    icon: Zap,
    iconColor: "text-red-400",
    iconBg: "bg-red-500/10",
  },
  {
    key: "avgResponseTime" as const,
    label: "Avg Response",
    icon: Clock,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/10",
  },
];

export function StatsStrip({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        const value = stats[card.key];
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="relative rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-5 hover:border-zinc-700/60 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                {card.label}
              </p>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-lg ${card.iconBg}`}
              >
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
