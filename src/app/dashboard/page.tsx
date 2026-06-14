"use client";

import React, { useState, useEffect, useRef } from "react";

// lowkey typings for our data layer
type Severity = "critical" | "high" | "medium" | "low";
type IncidentStatus = "pending" | "analyzing" | "resolved";

interface AgentLogEntry {
  timestamp: string;
  message: string;
  type: "info" | "analysis" | "decision" | "action" | "success" | "warning";
}

interface Incident {
  id: string;
  source: string;
  issueType: string;
  severity: Severity;
  status: IncidentStatus;
  detectedAt: string;
  resolvedAt?: string;
  reasoning: string[];
  recommendedAction: string;
  responseMessage: string;
  metrics: {
    confidence: number;
    responseTimeMs: number;
    dataPointsAnalyzed: number;
  };
  agentLogs: AgentLogEntry[];
}

// mock incidents fresh out of the oven fr fr
const initialIncidents: Incident[] = [
  {
    id: "INC-2024-001",
    source: "Campus IoT Network",
    issueType: "Unauthorized Access Pattern",
    severity: "critical",
    status: "pending",
    detectedAt: "2024-12-14T09:23:41Z",
    reasoning: [
      "Detected 847 anomalous authentication requests from subnet 10.0.3.x within a 4-minute window.",
      "Pattern matches credential-stuffing signature with 94.2% confidence based on request timing and entropy analysis.",
      "Cross-referenced with threat intelligence feeds — source IPs flagged in 3 known breach databases.",
      "No matching authorized maintenance window or penetration test scheduled for this period.",
      "Lateral movement indicators suggest potential escalation if not contained within the next 12 minutes.",
    ],
    recommendedAction:
      "Immediately isolate subnet 10.0.3.x, rotate all service account credentials for affected zone, deploy enhanced monitoring on adjacent segments, and notify the security operations team for manual review.",
    responseMessage:
      "Critical security incident contained. Subnet 10.0.3.x has been isolated. 847 malicious authentication attempts blocked. Service credentials rotated for 23 affected accounts. Enhanced monitoring deployed across 4 adjacent network segments. SOC team notified for forensic analysis.",
    metrics: {
      confidence: 94.2,
      responseTimeMs: 3420,
      dataPointsAnalyzed: 12847,
    },
    agentLogs: [
      { timestamp: "09:23:41", message: "Anomaly detected: unusual auth request volume on subnet 10.0.3.x", type: "warning" },
      { timestamp: "09:23:42", message: "Initiating pattern analysis across 12,847 data points...", type: "info" },
      { timestamp: "09:23:44", message: "Pattern match: credential-stuffing signature (94.2% confidence)", type: "analysis" },
      { timestamp: "09:23:45", message: "Cross-referencing threat intelligence feeds...", type: "info" },
      { timestamp: "09:23:46", message: "Source IPs found in 3 known breach databases", type: "analysis" },
      { timestamp: "09:23:47", message: "No authorized maintenance window detected for this period", type: "analysis" },
      { timestamp: "09:23:48", message: "Risk assessment: HIGH — lateral movement indicators present", type: "warning" },
      { timestamp: "09:23:49", message: "Decision: Isolate subnet, rotate credentials, deploy monitoring", type: "decision" },
      { timestamp: "09:23:50", message: "Executing containment protocol...", type: "action" },
      { timestamp: "09:23:53", message: "Subnet isolated. 23 credentials rotated. SOC notified.", type: "success" },
    ],
  },
  {
    id: "INC-2024-002",
    source: "Logistics Fleet Tracker",
    issueType: "Route Deviation & Delayed Delivery",
    severity: "high",
    status: "pending",
    detectedAt: "2024-12-14T11:07:15Z",
    reasoning: [
      "Vehicle FL-2847 deviated 23km from optimal route at checkpoint Delta-7, causing a projected 47-minute delay.",
      "Weather telemetry indicates localized flooding on the planned route segment — deviation appears intentional.",
      "Cargo manifest shows temperature-sensitive pharmaceuticals with a 6-hour delivery window constraint.",
      "Three alternative routes analyzed: Route B adds 12 min but avoids all reported hazards.",
      "Customer SLA breach threshold is T+4h — current ETA with reroute keeps delivery within SLA.",
    ],
    recommendedAction:
      "Reroute vehicle FL-2847 to Route B via checkpoint Echo-3. Send proactive delay notification to the recipient with updated ETA. Flag cargo for priority unloading upon arrival.",
    responseMessage:
      "Fleet reroute executed. Vehicle FL-2847 redirected to Route B, avoiding flood zone. Updated ETA: 14:23 (within SLA). Customer notified with tracking link. Priority unloading flagged at destination hub.",
    metrics: {
      confidence: 91.7,
      responseTimeMs: 2180,
      dataPointsAnalyzed: 4521,
    },
    agentLogs: [
      { timestamp: "11:07:15", message: "Alert: Vehicle FL-2847 deviation detected at checkpoint Delta-7", type: "warning" },
      { timestamp: "11:07:16", message: "Calculating deviation magnitude: 23km off optimal route", type: "info" },
      { timestamp: "11:07:17", message: "Pulling weather telemetry for route segment...", type: "info" },
      { timestamp: "11:07:18", message: "Confirmed: localized flooding on planned route — deviation is justified", type: "analysis" },
      { timestamp: "11:07:19", message: "Checking cargo manifest: temperature-sensitive pharmaceuticals", type: "analysis" },
      { timestamp: "11:07:20", message: "SLA constraint: 6-hour delivery window, current status within bounds", type: "analysis" },
      { timestamp: "11:07:21", message: "Evaluating 3 alternative routes...", type: "info" },
      { timestamp: "11:07:22", message: "Route B selected: +12 min, avoids all hazards", type: "decision" },
      { timestamp: "11:07:23", message: "Executing reroute and customer notification...", type: "action" },
      { timestamp: "11:07:24", message: "Reroute confirmed. ETA updated. Customer notified.", type: "success" },
    ],
  },
  {
    id: "INC-2024-003",
    source: "Municipal Water System",
    issueType: "Pressure Anomaly in Distribution",
    severity: "medium",
    status: "pending",
    detectedAt: "2024-12-14T14:32:08Z",
    reasoning: [
      "Pressure reading at station WS-14 dropped 18% below the 24-hour rolling average — outside normal variance band.",
      "No scheduled maintenance or valve operations logged for this distribution zone.",
      "Correlated sensor data from 6 adjacent stations shows stable readings, suggesting a localized issue.",
      "Historical pattern analysis indicates 73% probability of a minor pipe joint leak at this pressure profile.",
      "No immediate service disruption risk — estimated 48-hour window before potential impact to residential supply.",
    ],
    recommendedAction:
      "Dispatch field inspection team to station WS-14 within 4 hours. Deploy portable pressure monitoring equipment. Pre-stage repair materials for pipe joint maintenance. Schedule customer advisory if confirmed.",
    responseMessage:
      "Pressure anomaly logged and classified. Field inspection team dispatched to WS-14 (ETA: 2 hours). Portable monitoring equipment deployed. Repair materials pre-staged at nearest depot. Monitoring continues at 5-minute intervals.",
    metrics: {
      confidence: 73.4,
      responseTimeMs: 1850,
      dataPointsAnalyzed: 2934,
    },
    agentLogs: [
      { timestamp: "14:32:08", message: "Pressure anomaly detected at station WS-14: -18% from rolling avg", type: "warning" },
      { timestamp: "14:32:09", message: "Checking maintenance logs for distribution zone...", type: "info" },
      { timestamp: "14:32:10", message: "No scheduled maintenance found — anomaly is unplanned", type: "analysis" },
      { timestamp: "14:32:11", message: "Correlating with 6 adjacent sensor stations...", type: "info" },
      { timestamp: "14:32:12", message: "Adjacent stations stable — issue is localized to WS-14", type: "analysis" },
      { timestamp: "14:32:13", message: "Historical analysis: 73% probability of minor pipe joint leak", type: "analysis" },
      { timestamp: "14:32:14", message: "Risk window: 48 hours before potential residential impact", type: "analysis" },
      { timestamp: "14:32:15", message: "Decision: Dispatch inspection, deploy monitoring, pre-stage repairs", type: "decision" },
      { timestamp: "14:32:16", message: "Executing dispatch and resource allocation...", type: "action" },
      { timestamp: "14:32:17", message: "Team dispatched. Monitoring active. Materials staged.", type: "success" },
    ],
  },
];

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [selectedId, setSelectedId] = useState<string>("INC-2024-001");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [currentLogIndex, setCurrentLogIndex] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0); // 0=Detect, 1=Analyze, 2=Decide, 3=Respond, 4=Resolved
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all");
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | "all">("all");

  const logConsoleEndRef = useRef<HTMLDivElement>(null);

  const selectedIncident = incidents.find((inc) => inc.id === selectedId) || incidents[0];

  // lowkey stats calculation W
  const activeCount = incidents.filter((i) => i.status !== "resolved").length;
  const resolvedCount = incidents.filter((i) => i.status === "resolved").length;
  const criticalCount = incidents.filter((i) => i.severity === "critical" && i.status !== "resolved").length;
  const avgResponseTime =
    incidents.filter((i) => i.status === "resolved").length > 0
      ? (
          incidents
            .filter((i) => i.status === "resolved")
            .reduce((sum, i) => sum + i.metrics.responseTimeMs, 0) /
          incidents.filter((i) => i.status === "resolved").length /
          1000
        ).toFixed(1) + "s"
      : "—";

  // filter down the noise
  const filteredIncidents = incidents.filter((inc) => {
    if (severityFilter !== "all" && inc.severity !== severityFilter) return false;
    if (statusFilter !== "all" && inc.status !== statusFilter) return false;
    return true;
  });

  // auto-scroll live logs feed fr fr
  useEffect(() => {
    if (logConsoleEndRef.current) {
      logConsoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentLogIndex, processingId]);

  // no cap the entire agent simulation engine state machine
  const handleRunAgent = (id: string) => {
    if (processingId) return; // ignore duplicate clicks fr fr

    setProcessingId(id);
    setSelectedId(id);
    setCurrentLogIndex(0);
    setActiveStep(0);

    // update state to analyzing
    setTimeout(() => {
      setIncidents((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "analyzing" } : i))
      );
      setActiveStep(1);
    }, 600);

    const targetIncident = incidents.find((i) => i.id === id);
    if (!targetIncident) return;

    const totalLogs = targetIncident.agentLogs.length;
    let logCount = 0;

    const interval = setInterval(() => {
      logCount++;
      setCurrentLogIndex(logCount);

      // cooking the simulation steps right here
      if (logCount >= totalLogs * 0.3 && logCount < totalLogs * 0.6) {
        setActiveStep(2); // Decide phase
      } else if (logCount >= totalLogs * 0.6 && logCount < totalLogs * 0.9) {
        setActiveStep(3); // Respond phase
      }

      if (logCount >= totalLogs) {
        clearInterval(interval);
        setTimeout(() => {
          setIncidents((prev) =>
            prev.map((i) =>
              i.id === id
                ? { ...i, status: "resolved", resolvedAt: new Date().toISOString() }
                : i
            )
          );
          setActiveStep(4); // Finished
          setProcessingId(null);
        }, 500);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#fcfcf9] text-black pb-12 selection:bg-[#d0ff8a] selection:text-black">
      {/* brutalist header */}
      <header className="border-b-[3px] border-black bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#d0ff8a] border-2 border-black flex items-center justify-center font-bold text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Æ
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight uppercase">
                Aegiscore <span className="bg-[#d0ff8a] px-1.5 border border-black text-xs font-bold rounded-sm ml-1">AI</span>
              </h1>
              <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                Ops Decision Copilot // Hackathon MVP
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-none border-2 border-black bg-[#d0ff8a] text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-black animate-ping" />
              SYSTEM ACTIVE
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        
        {/* W dashboard stats cards strip */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[
            { label: "Active Incidents", val: activeCount, color: "bg-amber-100" },
            { label: "Resolved Incidents", val: resolvedCount, color: "bg-emerald-100" },
            { label: "Critical Priority Alerts", val: criticalCount, color: "bg-red-100" },
            { label: "Avg Execution Speed", val: avgResponseTime, color: "bg-[#d0ff8a]" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`border-[3px] border-black p-5 ${stat.color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between`}
            >
              <span className="text-xs uppercase font-extrabold tracking-wider text-black/70">
                {stat.label}
              </span>
              <span className="text-3xl font-black mt-2 tracking-tight">
                {stat.val}
              </span>
            </div>
          ))}
        </section>

        {/* control deck filter tools */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border-[3px] border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase font-black tracking-wider mr-2">Severity:</span>
            {(["all", "critical", "high", "medium", "low"] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1 text-xs font-bold border-2 border-black uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] ${
                  severityFilter === sev
                    ? "bg-[#d0ff8a] text-black"
                    : "bg-white text-black hover:bg-zinc-50"
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase font-black tracking-wider mr-2">Status:</span>
            {(["all", "pending", "analyzing", "resolved"] as const).map((stat) => (
              <button
                key={stat}
                onClick={() => setStatusFilter(stat)}
                className={`px-3 py-1 text-xs font-bold border-2 border-black uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] ${
                  statusFilter === stat
                    ? "bg-[#d0ff8a] text-black"
                    : "bg-white text-black hover:bg-zinc-50"
                }`}
              >
                {stat}
              </button>
            ))}
          </div>
        </section>

        {/* dashboard core double col grid */}
        <section className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* left col: feed + timeline */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-[3px] border-black bg-zinc-100 p-4 flex items-center justify-between">
                <h2 className="font-extrabold text-sm uppercase tracking-wide">
                  Live Operations Stream ({filteredIncidents.length})
                </h2>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-black animate-ping" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">INBOUND ENGINE FEED</span>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {filteredIncidents.length === 0 ? (
                  <div className="p-8 text-center border-2 border-dashed border-black/30 font-bold text-zinc-500">
                    No incidents matching selected filters. We chillin.
                  </div>
                ) : (
                  filteredIncidents.map((inc) => {
                    const isSelected = selectedId === inc.id;
                    const isRunning = processingId === inc.id;
                    
                    return (
                      <div
                        key={inc.id}
                        onClick={() => setSelectedId(inc.id)}
                        className={`border-[3px] border-black p-4 transition-all cursor-pointer relative ${
                          isSelected ? "bg-[#d0ff8a]/20 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : "bg-white hover:bg-zinc-50 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className="text-[11px] font-mono font-bold bg-zinc-200 border border-black px-1.5 py-0.5 rounded-sm">
                                {inc.id}
                              </span>
                              
                              {/* brutalist badges */}
                              <span className={`text-[10px] uppercase font-black px-2 py-0.5 border border-black ${
                                inc.severity === "critical" ? "bg-red-300" :
                                inc.severity === "high" ? "bg-amber-300" :
                                inc.severity === "medium" ? "bg-blue-300" : "bg-zinc-300"
                              }`}>
                                {inc.severity}
                              </span>

                              <span className={`text-[10px] uppercase font-black px-2 py-0.5 border border-black ${
                                inc.status === "resolved" ? "bg-emerald-300" :
                                inc.status === "analyzing" ? "bg-violet-300" : "bg-yellow-300"
                              }`}>
                                {inc.status}
                              </span>
                            </div>
                            <h3 className="font-extrabold text-sm text-black uppercase">
                              {inc.issueType}
                            </h3>
                            <p className="text-xs text-zinc-600 mt-1 font-bold">
                              Source: {inc.source} // Detected {new Date(inc.detectedAt).toLocaleTimeString()}
                            </p>
                          </div>

                          <div className="sm:text-right shrink-0 mt-2 sm:mt-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRunAgent(inc.id);
                              }}
                              disabled={!!processingId || inc.status === "resolved"}
                              className={`w-full sm:w-auto px-4 py-2 text-xs font-black uppercase border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[3px] active:translate-x-[3px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all ${
                                inc.status === "resolved"
                                  ? "bg-zinc-200 text-zinc-500 cursor-not-allowed shadow-none translate-x-[3px] translate-y-[3px]"
                                  : isRunning
                                  ? "bg-violet-300 text-black cursor-wait"
                                  : "bg-[#d0ff8a] text-black hover:bg-[#bce975]"
                              }`}
                            >
                              {inc.status === "resolved" ? "Resolved W" : isRunning ? "Processing..." : "Run Agent //"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* active incident workflow timeline */}
            {selectedIncident && (
              <div className="bg-white border-[3px] border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-black text-sm uppercase tracking-wide mb-4">
                  Simulated Agent State Pipeline: {selectedIncident.id}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Detect", idx: 0, color: "bg-blue-200" },
                    { label: "Analyze", idx: 1, color: "bg-violet-200" },
                    { label: "Decide", idx: 2, color: "bg-amber-200" },
                    { label: "Respond", idx: 3, color: "bg-emerald-200" },
                  ].map((step) => {
                    const isProcessingThisSelected = processingId === selectedIncident.id;
                    const stepStatus = selectedIncident.status;
                    
                    let active = false;
                    let done = false;

                    if (stepStatus === "resolved") {
                      done = true;
                    } else if (stepStatus === "analyzing" && isProcessingThisSelected) {
                      if (activeStep >= step.idx) {
                        if (activeStep === step.idx) active = true;
                        else done = true;
                      }
                    } else if (stepStatus === "pending") {
                      if (step.idx === 0) active = true;
                    }

                    return (
                      <div
                        key={step.label}
                        className={`border-2 border-black p-3 text-center transition-all ${
                          done
                            ? "bg-emerald-300 text-black"
                            : active
                            ? "bg-[#d0ff8a] text-black ring-2 ring-black"
                            : "bg-zinc-50 text-zinc-400"
                        }`}
                      >
                        <div className="font-black text-xs uppercase">{step.label}</div>
                        <div className="text-[9px] font-bold uppercase mt-1">
                          {done ? "Done ✓" : active ? "Active..." : "Idle"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* right col: live logs + detail reasoning */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* real-time agent console log console */}
            <div className="bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-[3px] border-black bg-zinc-900 text-[#d0ff8a] p-4 flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  &gt;_ agent_audit_logger.sh
                </span>
                {processingId && (
                  <span className="text-[10px] font-mono bg-red-600 text-white px-2 py-0.5 border border-black uppercase font-bold animate-pulse">
                    Streaming
                  </span>
                )}
              </div>

              <div className="bg-zinc-950 p-4 h-64 overflow-y-auto font-mono text-xs text-white space-y-1.5 log-feed">
                {selectedIncident.agentLogs.length === 0 ? (
                  <span className="text-zinc-600">// Select and run agent to initialize feed.</span>
                ) : (
                  <>
                    {/* slice logs to render during processing */}
                    {selectedIncident.agentLogs
                      .slice(
                        0,
                        processingId === selectedIncident.id
                          ? currentLogIndex
                          : selectedIncident.status === "resolved"
                          ? selectedIncident.agentLogs.length
                          : 1 // default to showing first log
                      )
                      .map((log, index) => (
                        <div key={index} className="flex gap-2">
                          <span className="text-zinc-600">[{log.timestamp}]</span>
                          <span className={`font-bold ${
                            log.type === "warning" ? "text-red-400" :
                            log.type === "analysis" ? "text-violet-400" :
                            log.type === "decision" ? "text-amber-400" :
                            log.type === "success" ? "text-emerald-400" : "text-sky-400"
                          }`}>
                            {log.type.toUpperCase()}
                          </span>
                          <span className="text-zinc-300">{log.message}</span>
                        </div>
                      ))}
                    {processingId === selectedIncident.id &&
                      currentLogIndex < selectedIncident.agentLogs.length && (
                        <div className="text-[#d0ff8a] animate-pulse">▋ System typing...</div>
                      )}
                  </>
                )}
                <div ref={logConsoleEndRef} />
              </div>
            </div>

            {/* agent context detail inspect card */}
            {selectedIncident && (
              <div className="bg-white border-[3px] border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-6">
                <div className="border-b-2 border-black pb-3">
                  <span className="text-[10px] font-mono font-bold bg-zinc-200 border border-black px-1.5 py-0.5 rounded-sm">
                    {selectedIncident.id}
                  </span>
                  <h3 className="font-extrabold text-base uppercase mt-2">
                    Incident Context & Execution Reason
                  </h3>
                </div>

                {/* reasoning points */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-zinc-500">// Reasoning Protocol Step-By-Step</h4>
                  <div className="space-y-2">
                    {selectedIncident.reasoning.map((step, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs text-black">
                        <span className="font-mono text-zinc-500 shrink-0">0{idx + 1}.</span>
                        <p className="font-medium leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* recommended action */}
                <div className="bg-amber-100 border-2 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="text-xs font-black uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    💡 Recomended Action Protocol
                  </h4>
                  <p className="text-xs font-bold leading-relaxed">
                    {selectedIncident.recommendedAction}
                  </p>
                </div>

                {/* operational resolved statement */}
                {selectedIncident.status === "resolved" && (
                  <div className="bg-emerald-100 border-2 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
                    <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-1">
                      ✅ Automated Broadcast Delivered
                    </h4>
                    <p className="text-xs font-bold text-emerald-950 leading-relaxed">
                      {selectedIncident.responseMessage}
                    </p>
                  </div>
                )}

                {/* speed metrics grid */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="border-2 border-black p-2.5 bg-zinc-50 text-center">
                    <div className="text-base font-black tracking-tight">{selectedIncident.metrics.confidence}%</div>
                    <div className="text-[8px] uppercase font-bold text-zinc-500">Confidence</div>
                  </div>
                  <div className="border-2 border-black p-2.5 bg-zinc-50 text-center">
                    <div className="text-base font-black tracking-tight">{(selectedIncident.metrics.responseTimeMs / 1000).toFixed(1)}s</div>
                    <div className="text-[8px] uppercase font-bold text-zinc-500">Speed</div>
                  </div>
                  <div className="border-2 border-black p-2.5 bg-zinc-50 text-center">
                    <div className="text-base font-black tracking-tight">{selectedIncident.metrics.dataPointsAnalyzed.toLocaleString()}</div>
                    <div className="text-[8px] uppercase font-bold text-zinc-500">Data pts</div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </section>

      </main>
    </div>
  );
}
