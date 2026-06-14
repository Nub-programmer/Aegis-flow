"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StatsStrip } from "@/components/dashboard/StatsStrip";
import { IncidentTable } from "@/components/dashboard/IncidentTable";
import { IncidentDetail } from "@/components/dashboard/IncidentDetail";
import { AgentLog } from "@/components/dashboard/AgentLog";
import { WorkflowTimeline } from "@/components/dashboard/WorkflowTimeline";
import { useIncidentStore } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Filter, LayoutGrid } from "lucide-react";
import type { Severity, IncidentStatus } from "@/lib/data";

const severityOptions: { value: string; label: string }[] = [
  { value: "all", label: "All Severity" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const statusOptions: { value: string; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "analyzing", label: "Analyzing" },
  { value: "resolved", label: "Resolved" },
];

export default function DashboardPage() {
  const store = useIncidentStore();

  const selectedIncident = store.selectedIncident;
  const isProcessing = store.processingId !== null;
  const processingIncident = store.incidents.find(
    (i) => i.id === store.processingId
  );

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2.5 mb-1">
            <LayoutGrid className="w-4 h-4 text-indigo-400" />
            <h1 className="text-xl font-semibold tracking-tight">
              Operations Dashboard
            </h1>
            <span className="ml-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>
          <p className="text-sm text-zinc-500">
            Monitor, analyze, and resolve operational incidents in real time
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-8">
          <StatsStrip stats={store.stats} />
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Filter className="w-3.5 h-3.5" />
            Filters
          </div>
          <div className="flex gap-2">
            {severityOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  store.setSeverityFilter(
                    opt.value as Severity | "all"
                  )
                }
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                  store.severityFilter === opt.value
                    ? "bg-zinc-800 border-zinc-700 text-zinc-200"
                    : "bg-transparent border-zinc-800/60 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="w-px h-5 bg-zinc-800" />
          <div className="flex gap-2">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  store.setStatusFilter(
                    opt.value as IncidentStatus | "all"
                  )
                }
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                  store.statusFilter === opt.value
                    ? "bg-zinc-800 border-zinc-700 text-zinc-200"
                    : "bg-transparent border-zinc-800/60 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Incident List — 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            <IncidentTable
              incidents={store.filteredIncidents}
              selectedId={store.selectedId}
              processingId={store.processingId}
              onSelect={(id) => store.setSelectedId(id)}
              onRunAgent={(id) => store.runAgent(id)}
            />

            {/* Workflow Timeline — below list */}
            {selectedIncident && (
              <WorkflowTimeline currentStep={store.currentWorkflowStep} />
            )}
          </div>

          {/* Right Panel — 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agent Log */}
            <AgentLog
              logs={processingIncident?.agentLogs || selectedIncident?.agentLogs || []}
              visibleCount={
                store.processingId
                  ? store.currentLogIndex
                  : selectedIncident?.status === "resolved"
                  ? selectedIncident.agentLogs.length
                  : 0
              }
              isProcessing={isProcessing}
            />

            {/* Incident Detail */}
            <IncidentDetail
              incident={selectedIncident}
              onClose={() => store.setSelectedId(null)}
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
