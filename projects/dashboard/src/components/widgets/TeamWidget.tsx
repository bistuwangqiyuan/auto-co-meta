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

export default function TeamWidget() {
  const { agentActivity, cycle } = state;

  return (
    <div className="border border-slate-200">
      <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">
          Team
        </h3>
        <span className="text-[10px] font-mono text-slate-400">14 agents</span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {AGENTS.map((agent) => {
            const activity = agentActivity[agent.id];
            const isRecent = activity && (cycle - activity.lastCycle) <= 2;

            return (
              <div
                key={agent.id}
                className={`flex items-center gap-3 p-2.5 border ${
                  isRecent ? "border-accent/30 bg-accent/5" : "border-slate-100"
                }`}
              >
                <span className={`w-1.5 h-1.5 flex-shrink-0 ${isRecent ? "bg-accent" : "bg-slate-300"}`} />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono text-slate-700 truncate">{agent.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{agent.expert}</div>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 ${LAYER_COLORS[agent.layer]}`}>
                    {agent.layer}
                  </span>
                  {activity && (
                    <span className="text-[9px] font-mono text-slate-400 mt-0.5">
                      c{activity.lastCycle}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
