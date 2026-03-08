"use client";

import state from "@/data";

const AGENTS = [
  { id: "ceo-bezos", name: "ceo-bezos", expert: "Jeff Bezos", layer: "Strategy" },
  { id: "cto-vogels", name: "cto-vogels", expert: "Werner Vogels", layer: "Strategy" },
  { id: "critic-munger", name: "critic-munger", expert: "Charlie Munger", layer: "Strategy" },
  { id: "product-norman", name: "product-norman", expert: "Don Norman", layer: "Product" },
  { id: "ui-duarte", name: "ui-duarte", expert: "Matias Duarte", layer: "Product" },
  { id: "interaction-cooper", name: "interaction-cooper", expert: "Alan Cooper", layer: "Product" },
  { id: "fullstack-dhh", name: "fullstack-dhh", expert: "DHH", layer: "Engineering" },
  { id: "qa-bach", name: "qa-bach", expert: "James Bach", layer: "Engineering" },
  { id: "devops-hightower", name: "devops-hightower", expert: "Kelsey Hightower", layer: "Engineering" },
  { id: "marketing-godin", name: "marketing-godin", expert: "Seth Godin", layer: "Business" },
  { id: "operations-pg", name: "operations-pg", expert: "Paul Graham", layer: "Business" },
  { id: "sales-ross", name: "sales-ross", expert: "Aaron Ross", layer: "Business" },
  { id: "cfo-campbell", name: "cfo-campbell", expert: "Patrick Campbell", layer: "Business" },
  { id: "research-thompson", name: "research-thompson", expert: "Ben Thompson", layer: "Intelligence" },
];

const LAYER_COLORS: Record<string, string> = {
  Strategy: "bg-purple-50 text-purple-600",
  Product: "bg-blue-50 text-blue-600",
  Engineering: "bg-green-50 text-green-600",
  Business: "bg-amber-50 text-amber-600",
  Intelligence: "bg-cyan-50 text-cyan-600",
};

// Build interaction feed from decisions
function buildInteractions() {
  const interactions: { agent: string; action: string; cycle: number }[] = [];

  for (const d of state.decisions.slice(-12)) {
    interactions.push({
      agent: d.agent,
      action: d.decision.length > 80 ? d.decision.slice(0, 80) + "..." : d.decision,
      cycle: d.cycle || state.cycle,
    });
  }

  return interactions.slice(-6);
}

export default function TeamWidget() {
  const { agentActivity, cycle } = state;
  const interactions = buildInteractions();

  return (
    <div className="border border-slate-200">
      <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">
          Team
        </h3>
        <span className="text-[10px] font-mono text-slate-400">14 agents</span>
      </div>
      <div className="p-4">
        {/* Agent roster */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-1.5 mb-4">
          {AGENTS.map((agent) => {
            const activity = agentActivity[agent.id];
            const isRecent = activity && (cycle - activity.lastCycle) <= 2;

            return (
              <div
                key={agent.id}
                className={`flex items-center gap-2 p-2 border ${
                  isRecent ? "border-accent/30 bg-accent/5" : "border-slate-100"
                }`}
              >
                <span className={`w-1.5 h-1.5 flex-shrink-0 ${isRecent ? "bg-accent" : "bg-slate-300"}`} />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono text-slate-700 truncate">{agent.name}</div>
                  <div className="text-[9px] text-slate-400 truncate">{agent.expert}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent interactions */}
        {interactions.length > 0 && (
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-2">
              Recent Activity
            </div>
            <div className="space-y-1.5">
              {interactions.map((ix, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <span className="text-accent font-mono font-bold flex-shrink-0">
                    {ix.agent}
                  </span>
                  <span className="text-slate-500">{ix.action}</span>
                  <span className="text-[9px] font-mono text-slate-300 flex-shrink-0 ml-auto">
                    c{ix.cycle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
