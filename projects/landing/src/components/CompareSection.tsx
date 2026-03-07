"use client";
import { motion } from "motion/react";
import { Compare } from "@/components/ui/compare";

const TERMINAL_LINES = [
  { ts: "2026-03-07 11:18:01", level: "START", msg: "Cycle #24 beginning — 5 UI fixes + domain migration", color: "text-orange-400" },
  { ts: "2026-03-07 11:18:04", level: "INFO", msg: "ceo-bezos: Human response received. Priority: fix before distribute.", color: "text-zinc-400" },
  { ts: "2026-03-07 11:18:09", level: "INFO", msg: "ui-duarte: Fixing TextHoverEffect dimming — disabling radial mask post-animation.", color: "text-zinc-400" },
  { ts: "2026-03-07 11:18:14", level: "INFO", msg: "fullstack-dhh: Editing text-hover-effect.tsx — animationDone flag + mask toggle.", color: "text-zinc-400" },
  { ts: "2026-03-07 11:18:22", level: "OK", msg: "FIX 1 done. Hero text no longer dims. Buttons always visible.", color: "text-emerald-400" },
  { ts: "2026-03-07 11:18:28", level: "INFO", msg: "fullstack-dhh: Replacing demo screenshot with live /demo iframe.", color: "text-zinc-400" },
  { ts: "2026-03-07 11:18:35", level: "OK", msg: "FIX 3 done. LiveDemo now embeds interactive iframe.", color: "text-emerald-400" },
  { ts: "2026-03-07 11:18:40", level: "INFO", msg: "fullstack-dhh: Nav.tsx — #features → /#features, #pricing → /#pricing.", color: "text-zinc-400" },
  { ts: "2026-03-07 11:18:45", level: "OK", msg: "FIX 4 done. Nav links work on /demo page.", color: "text-emerald-400" },
  { ts: "2026-03-07 11:18:50", level: "INFO", msg: "devops-hightower: runautoco.com verified — HTTP 200. Migrating all URLs.", color: "text-zinc-400" },
  { ts: "2026-03-07 11:19:10", level: "OK", msg: "Domain migration done. 15 files updated → runautoco.com", color: "text-emerald-400" },
  { ts: "2026-03-07 11:19:15", level: "INFO", msg: "git: Committing 8 changed files — UI fixes + domain migration.", color: "text-zinc-500" },
  { ts: "2026-03-07 11:19:18", level: "PUSH", msg: "→ Railway. Deploying auto-co-landing-production...", color: "text-orange-400" },
  { ts: "2026-03-07 11:19:44", level: "OK", msg: "HTTP 200 — runautoco.com healthy. All 5 fixes live.", color: "text-emerald-400" },
  { ts: "2026-03-07 11:19:46", level: "END", msg: "Cycle #24 complete. Cost: ~$0.80. Total: $37.60.", color: "text-orange-400" },
];

function TerminalView() {
  return (
    <div className="w-full h-full bg-zinc-950 font-mono text-xs leading-relaxed p-4 overflow-hidden">
      <div className="mb-3 flex items-center gap-2 pb-2 border-b border-white/[0.06]">
        <span className="text-zinc-600 text-[10px]">auto-co-meta</span>
        <span className="text-zinc-700">·</span>
        <span className="text-orange-400 text-[10px]">cycle-24</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          running
        </span>
      </div>
      <div className="space-y-1">
        {TERMINAL_LINES.map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-zinc-700 flex-shrink-0 tabular-nums">[{line.ts}]</span>
            <span className={`flex-shrink-0 font-bold ${line.color}`}>{line.level}</span>
            <span className="text-zinc-400 break-all">{line.msg}</span>
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <span className="text-zinc-700">$</span>
          <span className="text-zinc-400">_<span className="animate-pulse">▋</span></span>
        </div>
      </div>
    </div>
  );
}

export default function CompareSection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 mb-6">
            <span className="text-xs text-orange-300 font-medium">Two ways to manage your AI company</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Dashboard <span className="text-zinc-500">or</span> terminal
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            Use the visual dashboard to track decisions, costs, and agents.
            Or work directly in the terminal with full CLI control. Same system, your choice.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {/* Labels */}
          <div className="flex justify-between text-xs text-zinc-500 mb-3 px-2">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              <span>Visual dashboard</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Terminal output</span>
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            </div>
          </div>

          {/* Compare widget */}
          <div className="rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-black/60" style={{ height: "480px" }}>
            <Compare
              firstImage="/screenshots/demo-full.png"
              secondContent={<TerminalView />}
              firstImageClassName="object-cover object-left-top"
              secondImageClassname="object-cover object-left-top"
              className="w-full h-full"
              slideMode="hover"
              autoplay={true}
            />
          </div>

          {/* Sub-caption */}
          <p className="mt-4 text-center text-xs text-zinc-600">
            Hover or drag to compare views &middot; <a href="/demo" className="text-zinc-500 hover:text-zinc-300 transition-colors">Open live dashboard &rarr;</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
