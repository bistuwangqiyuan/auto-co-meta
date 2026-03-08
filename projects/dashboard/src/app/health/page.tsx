import state from "@/data";

export default function HealthPage() {
  const { health, generatedAt, cycle } = state;
  const { checks, loopHealth } = health;

  const healthyCount = checks.filter((c) => c.status === "healthy").length;
  const degradedCount = checks.filter((c) => c.status === "degraded").length;
  const unreachableCount = checks.filter((c) => c.status === "unreachable").length;
  const avgResponseMs =
    checks.length > 0
      ? Math.round(
          checks.reduce((sum, c) => sum + c.responseMs, 0) / checks.length
        )
      : 0;

  const overallStatus =
    unreachableCount > 0
      ? "degraded"
      : degradedCount > 0
        ? "warning"
        : "operational";

  const dataAge = (() => {
    const diff = Date.now() - new Date(generatedAt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  })();

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Health</h2>
        <p className="text-sm text-slate-400 mt-0.5">
          Service status, loop diagnostics, and system health
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="border border-slate-200 px-4 py-3">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">
            Status
          </div>
          <div
            className={`text-xl font-bold font-mono ${
              overallStatus === "operational"
                ? "text-emerald-600"
                : overallStatus === "warning"
                  ? "text-amber-600"
                  : "text-red-600"
            }`}
          >
            {overallStatus === "operational"
              ? "ALL OK"
              : overallStatus === "warning"
                ? "WARNING"
                : "DEGRADED"}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {healthyCount}/{checks.length} services up
          </div>
        </div>
        <div className="border border-slate-200 px-4 py-3">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">
            Loop Uptime
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {loopHealth.successRate}%
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {loopHealth.totalCycles} cycles total
          </div>
        </div>
        <div className="border border-slate-200 px-4 py-3">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">
            Avg Response
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {avgResponseMs}ms
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            across {checks.length} endpoints
          </div>
        </div>
        <div className="border border-slate-200 px-4 py-3">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">
            Data Freshness
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {dataAge}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            cycle {cycle}
          </div>
        </div>
      </div>

      {/* Service Health */}
      <div className="border border-slate-200 p-5 mb-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Service Health
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] text-slate-400 uppercase tracking-wide border-b border-slate-100">
                <th className="text-left py-2 pr-4">Service</th>
                <th className="text-left py-2 pr-4">URL</th>
                <th className="text-left py-2 pr-4">Status</th>
                <th className="text-right py-2 pr-4">Code</th>
                <th className="text-right py-2">Response</th>
              </tr>
            </thead>
            <tbody>
              {checks.map((check) => (
                <tr
                  key={check.service}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-2 pr-4 text-sm font-medium text-slate-900">
                    {check.service}
                  </td>
                  <td className="py-2 pr-4">
                    <a
                      href={`https://${check.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-accent transition-colors"
                    >
                      {check.url}
                    </a>
                  </td>
                  <td className="py-2 pr-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-medium ${
                        check.status === "healthy"
                          ? "text-emerald-600"
                          : check.status === "degraded"
                            ? "text-amber-600"
                            : "text-red-500"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 ${
                          check.status === "healthy"
                            ? "bg-emerald-500"
                            : check.status === "degraded"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                      />
                      {check.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-right">
                    <span className="text-xs font-mono text-slate-500">
                      {check.statusCode || "---"}
                    </span>
                  </td>
                  <td className="py-2 text-right">
                    <span
                      className={`text-xs font-mono ${
                        check.responseMs < 500
                          ? "text-emerald-600"
                          : check.responseMs < 2000
                            ? "text-amber-600"
                            : "text-red-500"
                      }`}
                    >
                      {check.responseMs}ms
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-[10px] text-slate-300 font-mono">
          Last checked:{" "}
          {checks[0]?.checkedAt
            ? new Date(checks[0].checkedAt).toLocaleString()
            : "N/A"}
        </div>
      </div>

      {/* Loop Health */}
      <div className="border border-slate-200 p-5 mb-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Loop Health
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">
              Success Rate
            </div>
            <div
              className={`text-lg font-bold font-mono ${
                loopHealth.successRate >= 95
                  ? "text-emerald-600"
                  : loopHealth.successRate >= 80
                    ? "text-amber-600"
                    : "text-red-600"
              }`}
            >
              {loopHealth.successRate}%
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">
              Avg Duration
            </div>
            <div className="text-lg font-bold font-mono text-slate-900">
              {loopHealth.avgDuration > 60
                ? `${Math.floor(loopHealth.avgDuration / 60)}m ${loopHealth.avgDuration % 60}s`
                : `${loopHealth.avgDuration}s`}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">
              Avg Cost/Cycle
            </div>
            <div className="text-lg font-bold font-mono text-slate-900">
              ${loopHealth.avgCost.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">
              Recent Failures
            </div>
            <div
              className={`text-lg font-bold font-mono ${
                loopHealth.recentFailures === 0
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {loopHealth.recentFailures}/10
            </div>
          </div>
        </div>

        {/* Last Cycle */}
        {loopHealth.lastCycle && (
          <div className="border-t border-slate-100 pt-3">
            <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-2">
              Last Cycle
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
              <span className="text-slate-500">
                <span className="text-slate-900 font-mono font-medium">
                  #{loopHealth.lastCycle.number}
                </span>
              </span>
              <span className="text-slate-500">
                Status:{" "}
                <span
                  className={`font-medium ${
                    loopHealth.lastCycle.status === "success"
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {loopHealth.lastCycle.status}
                </span>
              </span>
              <span className="text-slate-500">
                Duration:{" "}
                <span className="text-slate-900 font-mono">
                  {loopHealth.lastCycle.duration > 60
                    ? `${Math.floor(loopHealth.lastCycle.duration / 60)}m ${loopHealth.lastCycle.duration % 60}s`
                    : `${loopHealth.lastCycle.duration}s`}
                </span>
              </span>
              <span className="text-slate-500">
                Cost:{" "}
                <span className="text-slate-900 font-mono">
                  ${loopHealth.lastCycle.cost.toFixed(2)}
                </span>
              </span>
              <span className="text-slate-500">
                At:{" "}
                <span className="text-slate-900 font-mono text-xs">
                  {new Date(loopHealth.lastCycle.timestamp).toLocaleString()}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Recent Cycle Timeline (last 20) */}
      <div className="border border-slate-200 p-5">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Recent Cycles
        </h3>
        <div className="flex gap-1 flex-wrap">
          {state.cycleHistory.slice(-30).map((c) => (
            <div
              key={c.cycle}
              className={`w-6 h-6 flex items-center justify-center text-[8px] font-mono ${
                c.status === "success"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
              title={`Cycle ${c.cycle}: ${c.status} (${c.duration}s, $${c.cost?.toFixed(2)})`}
            >
              {c.cycle}
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-4 text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-emerald-100" /> Success
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-red-100" /> Failed
          </span>
        </div>
      </div>
    </div>
  );
}
