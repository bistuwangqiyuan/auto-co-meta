"use client";

import state from "@/data";

export default function GitHubWidget() {
  const { git, deployments, metrics } = state;

  return (
    <div className="border border-slate-200">
      <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">
          GitHub
        </h3>
        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
          <span>{metrics.stars} stars</span>
          <span>{metrics.forks} forks</span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {/* Deploy status */}
        {deployments.length > 0 && (
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-2">Deployments</div>
            <div className="space-y-1.5">
              {deployments.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 flex-shrink-0 ${
                    d.status === "live" ? "bg-green-500" : "bg-amber-500"
                  }`} />
                  <span className="text-xs font-mono text-slate-700">{d.service}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 ml-auto ${
                    d.status === "live" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                  }`}>
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Open PRs */}
        {git.openPRs.length > 0 && (
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-2">
              Open PRs ({git.openPRs.length})
            </div>
            <div className="space-y-1.5">
              {git.openPRs.slice(0, 5).map((pr, i) => (
                <div key={i} className="flex items-center gap-2 py-1 border-b border-slate-50 last:border-0">
                  <span className="text-[10px] font-mono font-bold text-accent flex-shrink-0">
                    #{pr.number}
                  </span>
                  <span className="text-xs text-slate-700 truncate">{pr.title}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-accent/10 text-accent flex-shrink-0 ml-auto">
                    {pr.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent commits */}
        <div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-2">Recent Commits</div>
          <div className="space-y-2">
            {git.commits.slice(0, 5).map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className={`text-[10px] font-mono font-bold flex-shrink-0 w-8 text-center py-0.5 ${
                  i === 0 ? "bg-accent/10 text-accent" : "bg-slate-100 text-slate-400"
                }`}>
                  {c.hash.slice(0, 4)}
                </span>
                <div className="min-w-0">
                  <div className="text-xs text-slate-700 truncate">{c.msg}</div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {formatDate(c.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}
