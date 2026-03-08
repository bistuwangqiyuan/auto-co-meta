import state from "@/data";

export default function FinancePage() {
  const { cycle, metrics, cycleHistory } = state;
  const totalCost = metrics.totalCost;
  const avgCost = metrics.avgCostPerCycle;

  // Use real per-cycle costs from cycle-history.jsonl, show last 40
  const recentCycles = cycleHistory.slice(-40);
  const cycleCosts = recentCycles.map((c) => c.cost);
  const maxCost = Math.max(...cycleCosts, 1);

  // Cumulative points for SVG from real data
  const cumulativePoints = (() => {
    if (recentCycles.length === 0) return "0,120 400,120";
    const maxTotal = recentCycles[recentCycles.length - 1].totalCost || totalCost;
    const pts: string[] = [];
    recentCycles.forEach((c, i) => {
      const x = (i / (recentCycles.length - 1 || 1)) * 400;
      const y = 120 - ((c.totalCost || 0) / (maxTotal * 1.1)) * 120;
      pts.push(`${x},${y}`);
    });
    return pts.join(" ") + " 400,120 0,120";
  })();

  // Model breakdown
  const modelCounts: Record<string, { count: number; cost: number }> = {};
  cycleHistory.forEach((c) => {
    const m = c.model || "unknown";
    if (!modelCounts[m]) modelCounts[m] = { count: 0, cost: 0 };
    modelCounts[m].count++;
    modelCounts[m].cost += c.cost;
  });

  const cyclesPerMonth = 4 * 30;
  const projectedCycles = avgCost * cyclesPerMonth;
  const infraCost = 5;
  const projectedTotal = projectedCycles + infraCost;

  const successRate = cycleHistory.length
    ? Math.round((cycleHistory.filter((c) => c.status === "ok").length / cycleHistory.length) * 100)
    : 0;

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Finance</h2>
        <p className="text-sm text-slate-400 mt-0.5">Cost tracking and financial overview</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border border-slate-200 p-4">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">Total Spend</div>
          <div className="text-2xl font-bold font-mono text-slate-900">${totalCost.toFixed(2)}</div>
          <div className="text-[10px] text-slate-400 mt-1">{cycleHistory.length} cycles tracked</div>
        </div>
        <div className="border border-slate-200 p-4">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">Avg / Cycle</div>
          <div className="text-2xl font-bold font-mono text-slate-900">${avgCost.toFixed(2)}</div>
          <div className="text-[10px] text-slate-400 mt-1">{successRate}% success rate</div>
        </div>
        <div className="border border-slate-200 p-4">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">Infra / Month</div>
          <div className="text-2xl font-bold font-mono text-slate-900">${infraCost.toFixed(2)}</div>
          <div className="text-[10px] text-slate-400 mt-1">Railway hosting</div>
        </div>
        <div className="border border-slate-200 p-4">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">Revenue</div>
          <div className="text-2xl font-bold font-mono text-accent">{metrics.revenue}</div>
          <div className="text-[10px] text-slate-400 mt-1">Pre-revenue</div>
        </div>
      </div>

      {/* Cost per cycle chart */}
      <div className="border border-slate-200 p-5 mb-6">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Cost Per Cycle (Last {recentCycles.length})
        </h3>
        {recentCycles.length > 0 ? (
          <>
            <div className="flex items-end gap-[3px] h-40">
              {cycleCosts.map((cost, i) => (
                <div
                  key={recentCycles[i].cycle}
                  className={`flex-1 transition-colors relative group ${
                    recentCycles[i].status === "ok"
                      ? "bg-accent/20 hover:bg-accent/40"
                      : "bg-red-200 hover:bg-red-300"
                  }`}
                  style={{ height: `${(cost / maxCost) * 100}%` }}
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    ${cost.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-mono">
              <span>C{recentCycles[0].cycle}</span>
              <span>C{recentCycles[Math.floor(recentCycles.length / 2)]?.cycle}</span>
              <span>C{recentCycles[recentCycles.length - 1].cycle}</span>
            </div>
          </>
        ) : (
          <div className="text-sm text-slate-400 text-center py-10">No cycle history data available</div>
        )}
      </div>

      {/* Cumulative spend */}
      <div className="border border-slate-200 p-5 mb-6">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Cumulative Spend</h3>
        <div className="relative h-32">
          <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
            <polyline
              points={cumulativePoints}
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              points={cumulativePoints}
              fill="url(#grad)"
              stroke="none"
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-400 font-mono">
            <span>$0</span>
            <span>${Math.round(totalCost * 0.25)}</span>
            <span>${Math.round(totalCost * 0.5)}</span>
            <span>${Math.round(totalCost * 0.75)}</span>
            <span>${Math.round(totalCost)}</span>
          </div>
        </div>
      </div>

      {/* Model breakdown */}
      {Object.keys(modelCounts).length > 0 && (
        <div className="border border-slate-200 p-5 mb-6">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Cost by Model</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(modelCounts)
              .sort((a, b) => b[1].cost - a[1].cost)
              .map(([model, data]) => (
                <div key={model} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-sm font-mono font-semibold text-slate-900">{model}</div>
                    <div className="text-[10px] text-slate-400">
                      {data.count} cycles &middot; ${data.cost.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    ${(data.cost / data.count).toFixed(2)}/cycle
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Projected monthly */}
      <div className="border border-slate-200 p-5">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Monthly Projection</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="text-[10px] text-slate-400 mb-1">At current rate (4 cycles/day)</div>
            <div className="text-lg font-bold font-mono text-slate-900">${Math.round(projectedCycles)}/mo</div>
            <div className="text-[10px] text-slate-400">Claude Code cycles</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 mb-1">Infrastructure</div>
            <div className="text-lg font-bold font-mono text-slate-900">${infraCost}/mo</div>
            <div className="text-[10px] text-slate-400">Railway hosting</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 mb-1">Total projected</div>
            <div className="text-lg font-bold font-mono text-accent">${Math.round(projectedTotal)}/mo</div>
            <div className="text-[10px] text-slate-400">All-in operating cost</div>
          </div>
        </div>
      </div>
    </div>
  );
}
