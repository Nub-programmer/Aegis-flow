"use client";

import { useState, useCallback, useRef } from "react";
import { Incident, mockIncidents, IncidentStatus, Severity } from "./data";

export interface DashboardStats {
  activeIncidents: number;
  resolvedIncidents: number;
  highSeverityAlerts: number;
  avgResponseTime: string;
}

export type SeverityFilter = Severity | "all";
export type StatusFilter = IncidentStatus | "all";

export function useIncidentStore() {
  const [incidents, setIncidents] = useState<Incident[]>(
    mockIncidents.map((inc) => ({ ...inc }))
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [currentLogIndex, setCurrentLogIndex] = useState<number>(0);
  const [currentWorkflowStep, setCurrentWorkflowStep] = useState<number>(0);
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const selectedIncident = incidents.find((inc) => inc.id === selectedId) || null;

  const stats: DashboardStats = {
    activeIncidents: incidents.filter((i) => i.status !== "resolved").length,
    resolvedIncidents: incidents.filter((i) => i.status === "resolved").length,
    highSeverityAlerts: incidents.filter(
      (i) => (i.severity === "critical" || i.severity === "high") && i.status !== "resolved"
    ).length,
    avgResponseTime:
      incidents.filter((i) => i.status === "resolved").length > 0
        ? (
            incidents
              .filter((i) => i.status === "resolved")
              .reduce((sum, i) => sum + i.metrics.responseTimeMs, 0) /
            incidents.filter((i) => i.status === "resolved").length /
            1000
          ).toFixed(1) + "s"
        : "—",
  };

  const filteredIncidents = incidents.filter((inc) => {
    if (severityFilter !== "all" && inc.severity !== severityFilter) return false;
    if (statusFilter !== "all" && inc.status !== statusFilter) return false;
    return true;
  });

  const updateIncidentStatus = useCallback(
    (id: string, status: IncidentStatus) => {
      setIncidents((prev) =>
        prev.map((inc) =>
          inc.id === id
            ? {
                ...inc,
                status,
                ...(status === "resolved"
                  ? { resolvedAt: new Date().toISOString() }
                  : {}),
              }
            : inc
        )
      );
    },
    []
  );

  const runAgent = useCallback(
    (id: string) => {
      if (processingId) return;

      const incident = incidents.find((i) => i.id === id);
      if (!incident || incident.status === "resolved") return;

      setSelectedId(id);
      setProcessingId(id);
      setCurrentLogIndex(0);
      setCurrentWorkflowStep(0);

      // Phase 1: Analyzing (after 800ms)
      setTimeout(() => {
        updateIncidentStatus(id, "analyzing");
        setCurrentWorkflowStep(1);
      }, 800);

      // Phase 2: Stream logs one by one
      const totalLogs = incident.agentLogs.length;
      let logIdx = 0;

      const logInterval = setInterval(() => {
        logIdx++;
        setCurrentLogIndex(logIdx);

        // Update workflow step based on log progress
        if (logIdx >= totalLogs * 0.3 && logIdx < totalLogs * 0.6) {
          setCurrentWorkflowStep(2);
        } else if (logIdx >= totalLogs * 0.6 && logIdx < totalLogs * 0.9) {
          setCurrentWorkflowStep(3);
        }

        if (logIdx >= totalLogs) {
          clearInterval(logInterval);

          // Phase 3: Resolve (after a short delay)
          setTimeout(() => {
            updateIncidentStatus(id, "resolved");
            setCurrentWorkflowStep(4);
            setProcessingId(null);
          }, 600);
        }
      }, 450);

      intervalRef.current = logInterval;
    },
    [incidents, processingId, updateIncidentStatus]
  );

  return {
    incidents,
    filteredIncidents,
    selectedIncident,
    selectedId,
    setSelectedId,
    processingId,
    currentLogIndex,
    currentWorkflowStep,
    stats,
    severityFilter,
    setSeverityFilter,
    statusFilter,
    setStatusFilter,
    runAgent,
  };
}
