"use client";

import { motion } from "framer-motion";
import {
  Radio,
  Brain,
  Database,
  Monitor,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

const layers = [
  {
    label: "Data Sources",
    items: [
      { icon: Radio, name: "IoT Sensors" },
      { icon: Radio, name: "Fleet GPS" },
      { icon: Radio, name: "SCADA" },
      { icon: Radio, name: "Threat Feeds" },
    ],
    color: "border-zinc-700/60",
    iconColor: "text-zinc-500",
  },
  {
    label: "Aegiscore Agent",
    items: [
      { icon: Brain, name: "Detection Engine" },
      { icon: Brain, name: "Analysis Core" },
      { icon: Brain, name: "Decision Model" },
      { icon: Brain, name: "Response Generator" },
    ],
    color: "border-indigo-500/30",
    iconColor: "text-indigo-400",
    highlight: true,
  },
  {
    label: "Outputs",
    items: [
      { icon: Monitor, name: "Dashboard" },
      { icon: Database, name: "Audit Log" },
      { icon: Monitor, name: "Notifications" },
      { icon: Database, name: "Compliance" },
    ],
    color: "border-zinc-700/60",
    iconColor: "text-zinc-500",
  },
];

export function Architecture() {
  return (
    <section className="py-24 px-6 border-t border-zinc-800/40">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">
            Architecture
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            System Overview
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto">
            A modular, event-driven architecture designed for high-throughput
            operational environments.
          </p>
        </motion.div>

        <div className="space-y-6">
          {layers.map((layer, layerIndex) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: layerIndex * 0.15, duration: 0.4 }}
            >
              <div
                className={`rounded-xl border ${layer.color} p-5 ${
                  layer.highlight ? "bg-indigo-500/[0.03]" : "bg-zinc-900/30"
                }`}
              >
                <p
                  className={`text-[10px] font-semibold uppercase tracking-wider mb-4 ${
                    layer.highlight ? "text-indigo-400" : "text-zinc-500"
                  }`}
                >
                  {layer.label}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {layer.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="flex items-center gap-2.5 rounded-lg border border-zinc-800/40 bg-zinc-900/50 px-3.5 py-2.5"
                      >
                        <Icon
                          className={`w-3.5 h-3.5 ${layer.iconColor} shrink-0`}
                        />
                        <span className="text-xs text-zinc-400">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {layerIndex < layers.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="w-4 h-4 text-zinc-700" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
