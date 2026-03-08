"use client";

import state from "@/data";
import MobileNav from "./MobileNav";

export default function TopBar() {
  const { cycle, metrics } = state;

  return (
    <header className="lg:hidden h-12 bg-zinc-950 border-b border-white/[0.1] flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center gap-3">
        <MobileNav />
        <span className="text-[11px] font-bold text-white">
          C{cycle}
        </span>
        <span className="text-[10px] text-zinc-600">&middot; running</span>
      </div>
      <span className="text-[10px] text-zinc-500 font-mono">
        ${metrics.totalCost.toFixed(2)}
      </span>
    </header>
  );
}
