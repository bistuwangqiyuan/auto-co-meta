import state from "@/data";

export default function FinancePage() {
  const { cycle, metrics } = state;
  const totalCost = metrics.totalCost;
  const avgCost = metrics.avgCostPerCycle;

  // Generate synthetic per-cycle costs that sum roughly to totalCost
  const cycleCount = Math.min(cycle, 40);
  const cycleCosts = Array.from({ length: cycleCount }, (_, i) => {
    const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    const variation = (seed - Math.floor(seed)) * 0.8 - 0.4;
    return Math.max(0.80, avgCost + variation);
  });

  // Cumulative points for SVG
  const cumulativePoints = (() => {
    let sum = Math.max(0, totalCost - cycleCosts.reduce((a, b) => a + b, 0));
    const pts: string[] = [];
    cycleCosts.forEach((c, i) => {
      sum += c;
      const x = (i / (cycleCosts.length - 1)) * 400;
      const y = 120 - (sum / (totalCost * 1.1)) * 120;
      pts.push(`${x},${y}`);
    });
    return pts.join(" ") + " 400,120 0,120";
  })();

  const cyclesPerMonth = 4 * 30;
  const projectedCycles = avgCost * cyclesPerMonth;
  const infraCost = 5;
  const projectedTotal = projectedCycles + infraCost;

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
          <div className="text-[10px] text-slate-400 mt-1">{cycle} cycles</div>
        </div>
        <div className="border border-slate-200 p-4">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">Avg / Cycle</div>
          <div className="text-2xl font-bold font-mono text-slate-900">${avgCost.toFixed(2)}</div>
          <div className="text-[10px] text-slate-400 mt-1">{cycle} cycles</div>
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
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Cost Per Cycle (Last {cycleCount})</h3>
        <div className="flex items-end gap-[3px] h-40">
          {cycleCosts.map((cost, i) => (
            <div
              key={i}
              className="flex-1 bg-accent/20 hover:bg-accent/40 transition-colors relative group"
              style={{ height: `${(cost / 3.5) * 100}%` }}
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                ${cost.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-mono">
          <span>C{cycle - cycleCount + 1}</span>
          <span>C{cycle - Math.floor(cycleCount * 0.5)}</span>
          <span>C{cycle}</span>
        </div>
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
