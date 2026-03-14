import state from "@/data";

export default function PortfolioPage() {
  const { cycle, metrics, phase, traffic } = state;
  const cloneCount = traffic?.clones?.unique ?? 0;

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">你的公司</h1>
        <p className="text-sm text-slate-400 mt-1 font-mono uppercase tracking-wide">1 家公司运行中</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active company card */}
        <a
          href="/company"
          className="block border border-slate-200 p-6 hover:border-accent transition-colors group"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-accent transition-colors">
                microai
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-0.5">@microai</p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-green-50 text-green-600 uppercase tracking-wide">
              运行中
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            通过 AI 无人公司实现全自动在线盈利。14 位 AI 代理协同运营。
          </p>
          <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400">
            <span>周期 {cycle}</span>
            <span>&middot;</span>
            <span>累计花费 ${metrics.totalCost.toFixed(2)}</span>
            <span>&middot;</span>
            <span>{phase}</span>
          </div>

          {/* Clone button */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400">
              GitHub 克隆 {cloneCount} 次（14 天）
            </span>
            <span className="text-[10px] font-mono font-bold px-3 py-1 bg-slate-100 text-slate-600 hover:bg-accent hover:text-white transition-colors uppercase tracking-wide">
              克隆 &middot; {cloneCount}
            </span>
          </div>
        </a>

        {/* New company card */}
        <div className="border-2 border-dashed border-slate-200 p-6 flex items-center justify-center min-h-[160px] cursor-pointer hover:border-slate-300 transition-colors">
          <div className="text-center">
            <div className="text-3xl text-slate-300 mb-2">+</div>
            <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">新建公司</div>
          </div>
        </div>
      </div>
    </div>
  );
}
