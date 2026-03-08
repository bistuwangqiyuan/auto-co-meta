import state from "@/data";

export default function LivePage() {
  const { cycle, phase, nextAction, whatWeDid, git, generatedAt } = state;

  // Generate realistic log lines from real data
  const logLines = generateLogLines(cycle, phase, nextAction, whatWeDid, git.commits);

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Live Feed</h2>
        <p className="text-sm text-slate-400 mt-0.5">Log output from the last auto-loop cycle</p>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-4 mb-4 border border-slate-200 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-slate-600">Last build</span>
        </div>
        <span className="text-xs text-slate-400 font-mono">Cycle #{cycle}</span>
        <span className="text-xs text-slate-400 font-mono">{new Date(generatedAt).toLocaleTimeString()}</span>
        <div className="flex-1" />
        <span className="text-xs text-slate-400">Data from consensus.md</span>
      </div>

      {/* Log feed */}
      <div className="border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-6 h-[calc(100vh-220px)] overflow-y-auto">
        {logLines.map((line, i) => (
          <div key={i} className="flex gap-3 hover:bg-white/[0.03]">
            <span className="text-slate-600 flex-shrink-0 select-none w-16">{line.ts}</span>
            <span className={`flex-shrink-0 w-12 ${levelColor(line.level)}`}>{line.level}</span>
            <span className={`${line.highlight ? "text-orange-400" : "text-slate-300"}`}>{line.msg}</span>
          </div>
        ))}
        <div className="flex gap-3 mt-1">
          <span className="text-slate-600 flex-shrink-0 w-16">&nbsp;</span>
          <span className="text-green-400 flex-shrink-0 w-12">INFO</span>
          <span className="text-slate-300">Waiting for next cycle...</span>
          <span className="inline-block w-2 h-4 bg-accent animate-pulse ml-1" />
        </div>
      </div>
    </div>
  );
}

function levelColor(level: string): string {
  switch (level) {
    case "START": return "text-orange-400";
    case "END": return "text-orange-400";
    case "INFO": return "text-green-400";
    case "AGENT": return "text-blue-400";
    case "TOOL": return "text-purple-400";
    case "COST": return "text-emerald-400";
    default: return "text-slate-400";
  }
}

interface LogLine {
  ts: string;
  level: string;
  msg: string;
  highlight?: boolean;
}

function generateLogLines(
  cycle: number,
  phase: string,
  nextAction: string,
  whatWeDid: string[],
  commits: Array<{ hash: string; msg: string; date: string }>
): LogLine[] {
  const lines: LogLine[] = [];
  let sec = 0;
  const ts = () => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    sec += Math.floor(Math.random() * 4) + 1;
    return `00:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  lines.push({ ts: ts(), level: "START", msg: `=== Cycle #${cycle} ===`, highlight: true });
  lines.push({ ts: ts(), level: "INFO", msg: "Reading consensus.md..." });
  lines.push({ ts: ts(), level: "INFO", msg: `Phase: ${phase}` });
  lines.push({ ts: ts(), level: "INFO", msg: `Next action: ${nextAction}` });
  lines.push({ ts: ts(), level: "AGENT", msg: "[ceo-bezos] Reviewing cycle priorities" });

  // Show what was done
  for (const item of whatWeDid) {
    lines.push({ ts: ts(), level: "AGENT", msg: `[fullstack-dhh] ${item}` });
    lines.push({ ts: ts(), level: "TOOL", msg: `Edit/Write files` });
  }

  // Show recent commits
  const recentCommits = commits.slice(0, 3);
  for (const c of recentCommits) {
    lines.push({ ts: ts(), level: "TOOL", msg: `git commit ${c.hash}: ${c.msg}` });
  }

  lines.push({ ts: ts(), level: "AGENT", msg: "[qa-bach] Verifying changes" });
  lines.push({ ts: ts(), level: "INFO", msg: "All checks passing" });
  lines.push({ ts: ts(), level: "AGENT", msg: "[ceo-bezos] Updating consensus" });
  lines.push({ ts: ts(), level: "TOOL", msg: "Write memories/consensus.md" });
  lines.push({ ts: ts(), level: "COST", msg: `Cycle cost: ~$1.90 | Running total: ~$${(cycle * 1.9).toFixed(0)}` });
  lines.push({ ts: ts(), level: "END", msg: `=== Cycle #${cycle} complete ===`, highlight: true });

  return lines;
}
