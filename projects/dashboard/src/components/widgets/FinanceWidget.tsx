"use client";

import state from "@/data";

export default function FinanceWidget() {
  const { metrics, cycleHistory, cycle } = state;
  const costs = cycleHistory.map((c) => c.cost);
  const totalCosts = cycleHistory.map((c) => c.totalCost);

  // Cost per cycle sparkline
  const sparkline = (() => {
    if (costs.length < 2) return null;
    const max = Math.max(...costs, 0.1);
    const w = 200;
    const h = 40;
    const points = costs
      .map((cost, i) => {
        const x = (i / (costs.length - 1)) * w;
        const y = h - (cost / (max * 1.1)) * h;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
    return { points, w, h };
  })();

  // Cumulative spend area chart
  const areaChart = (() => {
    if (totalCosts.length < 2) return null;
    const max = Math.max(...totalCosts, 1);
    const w = 200;
    const h = 40;
    const linePoints = totalCosts
      .map((cost, i) => {
        const x = (i / (totalCosts.length - 1)) * w;
        const y = h - (cost / (max * 1.1)) * h;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
    const areaPoints = `0,${h} ${linePoints} ${w},${h}`;
    return { linePoints, areaPoints, w, h };
  })();

  const projectedMonthly = metrics.avgCostPerCycle * 30; // ~1 cycle/day

  return (
    <div className="border border-slate-200">
      <div className="px-4 py-2.5 border-b border-slate-200">
        <h3 className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">
          Finance
        </h3>
      </div>
      <div className="p-4 space-y-5">
        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-0.5">Total Spend</div>
            <div className="text-xl font-bold font-mono text-slate-900">${metrics.totalCost.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-0.5">Avg/Cycle</div>
            <div className="text-xl font-bold font-mono text-slate-900">${metrics.avgCostPerCycle.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-0.5">Projected/Month</div>
            <div className="text-lg font-bold font-mono text-slate-900">${projectedMonthly.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-0.5">Revenue</div>
            <div className="text-lg font-bold font-mono text-slate-900">{metrics.revenue}</div>
          </div>
        </div>

        {/* Cost per cycle sparkline */}
        {sparkline && (
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-2">Cost per Cycle</div>
            <svg viewBox={`0 0 ${sparkline.w} ${sparkline.h}`} className="w-full h-10" preserveAspectRatio="none">
              <polyline
                points={sparkline.points}
                fill="none"
                stroke="#f97316"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* Cumulative spend */}
        {areaChart && (
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-2">Cumulative Spend</div>
            <svg viewBox={`0 0 ${areaChart.w} ${areaChart.h}`} className="w-full h-10" preserveAspectRatio="none">
              <polygon points={areaChart.areaPoints} fill="#f97316" fillOpacity="0.1" />
              <polyline
                points={areaChart.linePoints}
                fill="none"
                stroke="#f97316"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
              <span>c{cycleHistory[0]?.cycle || 1}</span>
              <span>c{cycle}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
