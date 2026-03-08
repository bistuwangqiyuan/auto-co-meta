export interface DashboardState {
  generatedAt: string;
  cycle: number;
  phase: string;
  metrics: {
    totalCost: number;
    avgCostPerCycle: number;
    revenue: string;
    users: string;
    stars: number;
    forks: number;
    cloners: number;
    openIssues: number;
  };
  nextAction: string;
  whatWeDid: string[];
  projects: Array<{ name: string; status: string }>;
  pendingEscalation: boolean;
  distribution: Array<{ channel: string; status: string; url: string }>;
  git: {
    commits: Array<{ hash: string; msg: string; date: string }>;
    openPRs: Array<{ number: number; title: string; status: string; reviews: number; comments: number }>;
  };
  deployments: Array<{ service: string; url: string; status: string }>;
  cycleHistory: Array<{
    cycle: number;
    timestamp: string;
    status: string;
    cost: number;
    duration: number;
    model: string;
    totalCost: number;
  }>;
}
