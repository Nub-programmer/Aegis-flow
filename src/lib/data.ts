export type Severity = "critical" | "high" | "medium" | "low";
export type IncidentStatus = "pending" | "analyzing" | "resolved";

export interface AgentLogEntry {
  timestamp: string;
  message: string;
  type: "info" | "analysis" | "decision" | "action" | "success" | "warning";
}

export interface Incident {
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

export const mockIncidents: Incident[] = [
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

export const workflowSteps = [
  {
    id: "detect",
    label: "Detect",
    description: "Real-time anomaly detection across data streams",
    icon: "scan",
  },
  {
    id: "analyze",
    label: "Analyze",
    description: "Multi-source correlation and pattern matching",
    icon: "brain",
  },
  {
    id: "decide",
    label: "Decide",
    description: "Risk-weighted action recommendation",
    icon: "git-branch",
  },
  {
    id: "respond",
    label: "Respond",
    description: "Automated execution with human oversight",
    icon: "zap",
  },
] as const;

export type WorkflowStep = (typeof workflowSteps)[number]["id"];

export function getActiveWorkflowStep(status: IncidentStatus): number {
  switch (status) {
    case "pending":
      return 0;
    case "analyzing":
      return 1;
    case "resolved":
      return 3;
  }
}
