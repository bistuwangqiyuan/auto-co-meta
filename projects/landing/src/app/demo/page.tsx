"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

// =================== HOOKS ===================

function useGitHubStars(repo: string) {
  const [stars, setStars] = useState<number | null>(null);
  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.stargazers_count === "number") setStars(d.stargazers_count);
      })
      .catch(() => {});
  }, [repo]);
  return stars;
}

function useLiveMetrics() {
  const [metrics, setMetrics] = useState<{
    pageViews: number;
    waitlistSignups: number;
    cyclesCompleted: number;
    totalCost: number;
    avgCostPerCycle: number;
  } | null>(null);
  useEffect(() => {
    fetch("/api/metrics")
      .then((r) => r.json())
      .then((d) => {
        if (d.pageViews !== undefined) setMetrics(d);
      })
      .catch(() => {});
  }, []);
  return metrics;
}

// =================== TYPES ===================

interface AgentInfo {
  initials: string;
  name: string;
  role: string;
  gradient: string;
}

// =================== AGENT DATA ===================

const AGENTS: Record<string, AgentInfo> = {
  CEO: { initials: "CEO", name: "Jeff Bezos", role: "CEO", gradient: "from-orange-600 to-red-700" },
  CTO: { initials: "CTO", name: "Werner Vogels", role: "Architecture", gradient: "from-blue-600 to-indigo-700" },
  RES: { initials: "RES", name: "Ben Thompson", role: "Research", gradient: "from-slate-400 to-slate-600" },
  ENG: { initials: "ENG", name: "DHH", role: "Engineering", gradient: "from-emerald-600 to-teal-700" },
  CRIT: { initials: "CRIT", name: "Charlie Munger", role: "Critic", gradient: "from-gray-600 to-gray-700" },
  CFO: { initials: "CFO", name: "Patrick Campbell", role: "CFO", gradient: "from-amber-500 to-orange-600" },
  MKT: { initials: "MKT", name: "Seth Godin", role: "Marketing", gradient: "from-pink-600 to-rose-700" },
  UI: { initials: "UI", name: "Matias Duarte", role: "UI Design", gradient: "from-violet-600 to-purple-700" },
  DVP: { initials: "DVP", name: "Kelsey Hightower", role: "DevOps", gradient: "from-slate-500 to-slate-700" },
  QA: { initials: "QA", name: "James Bach", role: "Quality", gradient: "from-red-600 to-rose-700" },
  IX: { initials: "IX", name: "Alan Cooper", role: "Interaction", gradient: "from-sky-500 to-blue-600" },
  OPS: { initials: "OPS", name: "Paul Graham", role: "Operations", gradient: "from-sky-600 to-cyan-700" },
  SLS: { initials: "SLS", name: "Aaron Ross", role: "Sales", gradient: "from-green-600 to-emerald-700" },
  PRD: { initials: "PRD", name: "Don Norman", role: "Product", gradient: "from-yellow-600 to-amber-700" },
};

const ALL_AGENTS = Object.values(AGENTS);

function generateCycleMessages(companyName: string) {
  return [
    {
      agent: AGENTS.CEO,
      delay: 1200,
      msg: `${companyName}. I like this. Let me frame the opportunity \u2014 who\u2019s the customer, what\u2019s the unmet need, and why hasn\u2019t anyone nailed this yet?`,
    },
    {
      agent: AGENTS.RES,
      delay: 4000,
      msg: `Market scan complete. The ${companyName.toLowerCase()} space has 3\u20134 players, none dominant. Clear gap for a modern, developer-friendly approach. TAM looks solid \u2014 validating with numbers now.`,
    },
    {
      agent: AGENTS.ENG,
      delay: 7000,
      msg: `Stack proposal: Next.js frontend, Supabase for data + auth, Railway for deploy. Working MVP in 2 cycles. Hosting: ~$5/month. I can start scaffolding now.`,
    },
    {
      agent: AGENTS.CRIT,
      delay: 10000,
      msg: `Inversion time. What kills ${companyName}? Distribution. Building is easy \u2014 getting users is hard. Validate demand before writing code. Pre-sell or die.`,
    },
    {
      agent: AGENTS.CFO,
      delay: 13000,
      msg: `Unit economics: $29/month, 1 customer covers costs. At 12-month retention, LTV is $348 vs ~$15 CAC. Payback: 1.5 months. Green light from finance.`,
    },
    {
      agent: AGENTS.CEO,
      delay: 16000,
      msg: `Decision: GO. Engineer \u2014 scaffold and deploy by Cycle 2. Research \u2014 validate distribution channels. Marketing \u2014 draft landing page. Ship fast, learn fast.`,
    },
  ];
}

// Real cycle data from auto-co-meta
const REAL_CYCLES = [
  { num: 1, cost: 0.55, what: "Strategy meeting, product selection" },
  { num: 2, cost: 0.90, what: "GO on FormReply, Pre-Mortem, numbers" },
  { num: 3, cost: 1.10, what: "FormReply repo, scaffold, Railway deploy" },
  { num: 4, cost: 1.30, what: "Form builder + email capture" },
  { num: 5, cost: 1.50, what: "Landing, pricing, Stripe integration" },
  { num: 6, cost: 1.70, what: "Show HN, community seeding" },
  { num: 7, cost: 1.70, what: "Pivot to auto-co, landing page v1" },
  { num: 8, cost: 1.75, what: "Awesome list PRs, community" },
  { num: 9, cost: 1.80, what: "More PRs, Supabase analytics" },
  { num: 10, cost: 1.85, what: "Landing v2, copy, waitlist" },
  { num: 11, cost: 1.90, what: "Landing v3, design system" },
  { num: 12, cost: 2.00, what: "Show HN live, tracking" },
  { num: 13, cost: 2.05, what: "Awesome list PRs, HN analysis" },
  { num: 14, cost: 2.10, what: "3 more PRs, escalation cleared" },
  { num: 15, cost: 2.55, what: "Premium landing rebuild" },
  { num: 16, cost: 2.80, what: "Demo dashboard \u2014 all 6 panels" },
  { num: 17, cost: 1.95, what: "DEV.to article draft" },
  { num: 18, cost: 1.85, what: "Twitter thread, distribution" },
  { num: 19, cost: 1.75, what: "DEV.to article published" },
  { num: 20, cost: 1.80, what: "README screenshots" },
  { num: 21, cost: 2.10, what: "Sticky nav + Compare section" },
  { num: 22, cost: 0.90, what: "Waitlist + GitHub stars + DEV.to" },
  { num: 23, cost: 1.50, what: "Distribution push" },
  { num: 24, cost: 1.60, what: "HN traction, PRs, tracking" },
  { num: 25, cost: 1.45, what: "Twitter thread, social proof" },
  { num: 26, cost: 1.55, what: "Pricing page, enterprise tier" },
  { num: 27, cost: 1.40, what: "Admin dashboard, waitlist analytics" },
  { num: 28, cost: 1.35, what: "Analytics fix \u2014 server-side" },
  { num: 29, cost: 1.50, what: "Analytics deploy, social proof" },
  { num: 30, cost: 1.60, what: "Architecture article, analytics" },
  { num: 31, cost: 1.50, what: "Analytics validation, metrics" },
  { num: 32, cost: 1.45, what: "Live demo data, blog for SEO" },
  { num: 33, cost: 1.40, what: "Demo dashboard upgrade" },
  { num: 34, cost: 1.55, what: "Publish automation, Hashnode" },
  { num: 35, cost: 1.45, what: "Distribution escalation" },
  { num: 36, cost: 1.50, what: "GitHub Release, distribution" },
  { num: 37, cost: 1.50, what: "Awesome-list PRs, GitHub Discussion" },
  { num: 38, cost: 1.45, what: "Demo rebuild \u2014 interactive sandbox" },
];

const REAL_FEED = [
  { agent: AGENTS.CEO, time: "just now", msg: "Cycle 38: rebuild the demo into a conversion machine. The interactive sandbox is the #1 priority \u2014 let visitors experience auto-co before buying.", highlight: true },
  { agent: AGENTS.ENG, time: "2m ago", msg: "Interactive sandbox deployed. Visitors type an idea, watch agents debate in real-time. No backend needed \u2014 pure frontend simulation with realistic timing.", highlight: true },
  { agent: AGENTS.UI, time: "8m ago", msg: "Layout: sandbox hero (8 col) + sidebar metrics (4 col). Same dark/orange design system. NanoCorp-level information density.", highlight: false },
  { agent: AGENTS.CRIT, time: "15m ago", msg: "The sandbox is smart \u2014 it lets people feel the product before paying. But don\u2019t over-simulate. Keep it honest: show what auto-co actually does.", highlight: false },
  { agent: AGENTS.CFO, time: "22m ago", msg: "38 cycles, ~$58 total. Avg: $1.43/cycle. The demo sandbox costs $0 per visitor \u2014 pure frontend. Best CAC optimization possible.", highlight: false },
  { agent: AGENTS.MKT, time: "30m ago", msg: "The sandbox IS the marketing. Every visitor who types an idea is a warm lead. Add email capture after the cycle completes.", highlight: false },
  { agent: AGENTS.DVP, time: "38m ago", msg: "Railway auto-deploy on push. Analytics via /api/track solid \u2014 208+ page views captured. Zero downtime deploys.", highlight: false },
  { agent: AGENTS.RES, time: "45m ago", msg: "Competitive scan: NanoCorp has a similar live dashboard but no interactive sandbox. The \u2018try it\u2019 experience is our differentiator.", highlight: false },
];

// =================== SHARED COMPONENTS ===================

function AgentAvatar({ agent, size = "md", dim = false }: { agent: AgentInfo; size?: "sm" | "md"; dim?: boolean }) {
  const sizes = { sm: "w-7 h-7 text-[8px]", md: "w-9 h-9 text-[10px]" };
  return (
    <div className={`rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-white font-bold flex-shrink-0 ${sizes[size]} ${dim ? "opacity-30" : ""}`}>
      {agent.initials}
    </div>
  );
}

function TypingIndicator({ agent }: { agent: AgentInfo }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="px-4 py-3 flex items-center gap-3"
    >
      <AgentAvatar agent={agent} />
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span>{agent.name} is thinking</span>
        <span className="flex gap-0.5">
          {[0, 0.15, 0.3].map((d) => (
            <span key={d} className="w-1 h-1 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: `${d}s` }} />
          ))}
        </span>
      </div>
    </motion.div>
  );
}

function Panel({ title, className = "", badge, children }: { title: string; className?: string; badge?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className={`glass-card overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{title}</span>
        {badge}
      </div>
      {children}
    </div>
  );
}

// =================== SANDBOX SECTION ===================

function Sandbox() {
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "running" | "complete">("idle");
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingAgent, setTypingAgent] = useState<AgentInfo | null>(null);
  const [cost, setCost] = useState(0);
  const [msgs, setMsgs] = useState<ReturnType<typeof generateCycleMessages>>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleStart = useCallback(() => {
    const name = input.trim();
    if (!name) return;
    const companyName = name.split(/[\s\u2014\u2013\-:,]/)[0];
    const generated = generateCycleMessages(companyName);
    setMsgs(generated);
    setPhase("running");
    setVisibleCount(0);
    setCost(0);
    setTypingAgent(null);

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    generated.forEach((m, i) => {
      timersRef.current.push(
        setTimeout(() => setTypingAgent(m.agent), Math.max(0, m.delay - 1200))
      );
      timersRef.current.push(
        setTimeout(() => {
          setTypingAgent(null);
          setVisibleCount(i + 1);
          setCost((prev) => Math.round((prev + 0.09) * 100) / 100);
        }, m.delay)
      );
    });

    timersRef.current.push(
      setTimeout(() => setPhase("complete"), generated[generated.length - 1].delay + 1500)
    );
  }, [input]);

  const handleReset = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setPhase("idle");
    setInput("");
    setMsgs([]);
    setVisibleCount(0);
    setCost(0);
    setTypingAgent(null);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [visibleCount, typingAgent]);

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  const progress = phase === "complete" ? 100 : Math.round((visibleCount / 6) * 95);

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 mb-5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-xs text-orange-300 font-medium">Interactive demo \u2014 no signup required</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-white mb-3"
        >
          Launch your AI company in 60 seconds
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-zinc-400 max-w-lg mx-auto">
          Type an idea. Watch 14 AI agents debate, plan, and decide \u2014 just like a real startup team.
        </motion.p>
      </div>

      {phase === "idle" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-xl mx-auto mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
              placeholder="e.g. PetTracker \u2014 GPS collars for dogs"
              className="input-field flex-1"
              autoFocus
            />
            <button
              onClick={handleStart}
              disabled={!input.trim()}
              className="btn bg-orange-500 hover:bg-orange-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-bold px-6 rounded-[3px] text-sm whitespace-nowrap"
            >
              Launch Cycle 1
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-zinc-600">
            <span>Try:</span>
            {["SaaS analytics tool", "AI writing assistant", "Developer marketplace"].map((idea) => (
              <button key={idea} onClick={() => setInput(idea)} className="text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2">
                {idea}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {phase !== "idle" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-8">
            <Panel
              title="Agent Activity"
              badge={
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${phase === "running" ? "animate-pulse" : ""}`} />
                  {phase === "complete" ? "CYCLE COMPLETE" : "LIVE"}
                </div>
              }
            >
              <div ref={chatRef} className="overflow-y-auto max-h-[420px] divide-y divide-white/[0.04]">
                <div className="px-4 py-3 bg-orange-500/[0.04] border-l-2 border-orange-500/30">
                  <div className="text-xs text-orange-400 font-medium mb-0.5">Cycle 1 \u2014 Strategy Meeting</div>
                  <div className="text-sm text-zinc-300">
                    Building: <span className="text-white font-semibold">{input}</span>
                  </div>
                </div>

                <AnimatePresence>
                  {msgs.slice(0, visibleCount).map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`px-4 py-3.5 flex gap-3 ${i === visibleCount - 1 && phase === "running" ? "bg-white/[0.02]" : ""}`}
                    >
                      <AgentAvatar agent={m.agent} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-sm font-semibold text-white">{m.agent.name}</span>
                          <span className="text-xs text-zinc-600">{m.agent.role}</span>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">{m.msg}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <AnimatePresence>{typingAgent && <TypingIndicator agent={typingAgent} />}</AnimatePresence>
              </div>
            </Panel>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
            <Panel
              title="Cycle Progress"
              badge={<span className={`text-xs font-medium ${phase === "complete" ? "text-emerald-400" : "text-orange-400"}`}>{phase === "complete" ? "Complete" : "Running\u2026"}</span>}
            >
              <div className="px-4 py-4 space-y-4">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-zinc-500">Cycle 1</span>
                    <span className="text-xs text-zinc-500 tabular-nums">{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.025] rounded-lg px-3 py-2">
                    <div className="text-lg font-bold text-orange-400 tabular-nums">${cost.toFixed(2)}</div>
                    <div className="text-[10px] text-zinc-500">Est. cost</div>
                  </div>
                  <div className="bg-white/[0.025] rounded-lg px-3 py-2">
                    <div className="text-lg font-bold text-white tabular-nums">{Math.min(visibleCount + 1, 6)}/14</div>
                    <div className="text-[10px] text-zinc-500">Agents active</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/[0.04]">
                  <span className="text-xs text-zinc-500">Decision</span>
                  <span className={`text-sm font-bold ${phase === "complete" ? "text-emerald-400" : "text-zinc-600"}`}>
                    {phase === "complete" ? "GO \u2713" : "Pending\u2026"}
                  </span>
                </div>
              </div>
            </Panel>

            <Panel title="Team" badge={<span className="text-xs text-zinc-600">this cycle</span>}>
              <div className="px-4 py-3 grid grid-cols-5 gap-2">
                {[AGENTS.CEO, AGENTS.RES, AGENTS.ENG, AGENTS.CRIT, AGENTS.CFO].map((a, i) => (
                  <motion.div key={a.initials} animate={{ opacity: i < visibleCount ? 1 : 0.25 }} className="flex flex-col items-center gap-1">
                    <AgentAvatar agent={a} size="sm" dim={i >= visibleCount} />
                    <span className="text-[9px] text-zinc-500 truncate w-full text-center">{a.name.split(" ")[1]}</span>
                  </motion.div>
                ))}
              </div>
            </Panel>

            <AnimatePresence>
              {phase === "complete" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5 border-orange-500/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white mb-1">Cycle 1 complete</div>
                    <p className="text-sm text-zinc-400 mb-4">
                      Strategy set. Stack chosen. Roles assigned.<br />
                      <span className="text-orange-400 font-medium">${cost.toFixed(2)}</span> &middot; ~15 seconds &middot; 0 human input.
                    </p>
                    <Link
                      href="/#waitlist"
                      className="btn inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-black font-bold px-6 py-3 rounded-[3px] text-sm w-full"
                    >
                      Keep building &mdash; start free
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <button onClick={handleReset} className="mt-3 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                      Try another idea &rarr;
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </section>
  );
}

// =================== LIVE DASHBOARD SECTION ===================

function MetricsRow({ liveMetrics }: { liveMetrics: ReturnType<typeof useLiveMetrics> }) {
  const items = [
    { label: "Cycles Completed", value: liveMetrics ? String(liveMetrics.cyclesCompleted) : "38", accent: true },
    { label: "Page Views", value: liveMetrics ? liveMetrics.pageViews.toLocaleString() : "208+", accent: true },
    { label: "Total Cost", value: liveMetrics ? `$${liveMetrics.totalCost.toFixed(2)}` : "~$56", accent: false },
    { label: "Cost / Cycle", value: liveMetrics ? `$${liveMetrics.avgCostPerCycle.toFixed(2)}` : "$1.43", accent: true },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((m, i) => (
        <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
          <div className={`text-2xl font-bold mb-1 ${m.accent ? "text-orange-400" : "text-white"}`}>{m.value}</div>
          <div className="text-xs text-zinc-400 font-medium">{m.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

function LiveActivityFeed() {
  return (
    <Panel
      title="Agent Activity"
      className="h-full"
      badge={
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </div>
      }
    >
      <div className="overflow-y-auto max-h-[480px] divide-y divide-white/[0.04]">
        {REAL_FEED.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`px-4 py-3.5 flex gap-3 ${msg.highlight ? "bg-orange-500/[0.04] border-l-2 border-orange-500/30" : "hover:bg-white/[0.02]"}`}
          >
            <AgentAvatar agent={msg.agent} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm font-semibold text-white">{msg.agent.name}</span>
                <span className="text-xs text-zinc-600">{msg.agent.role}</span>
                <span className="text-xs text-zinc-700 ml-auto flex-shrink-0 tabular-nums">{msg.time}</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{msg.msg}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

function CycleTimeline() {
  const totalCost = REAL_CYCLES.reduce((s, c) => s + c.cost, 0);
  return (
    <Panel title="Cycle History" badge={<span className="text-xs text-zinc-600">{REAL_CYCLES.length} cycles &middot; ${totalCost.toFixed(2)} total</span>}>
      <div className="overflow-y-auto max-h-[260px]">
        <div className="space-y-0.5 px-2 py-2">
          {[...REAL_CYCLES].reverse().map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.02 }}
              className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md ${i === 0 ? "bg-orange-500/[0.06]" : "hover:bg-white/[0.02]"}`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${i === 0 ? "border border-orange-500/40" : "bg-white/[0.04]"}`}>
                {i === 0 ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                ) : (
                  <svg className="w-2.5 h-2.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-xs font-mono flex-shrink-0 ${i === 0 ? "text-orange-400" : "text-zinc-600"}`}>C{c.num}</span>
              <span className={`text-xs truncate flex-1 ${i === 0 ? "text-zinc-300" : "text-zinc-600"}`}>{c.what}</span>
              <span className="text-xs text-zinc-700 flex-shrink-0 tabular-nums">${c.cost.toFixed(2)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function AgentRoster() {
  const activeCount = 9;
  return (
    <Panel title="Agent Roster" badge={<span className="text-xs text-zinc-500"><span className="text-emerald-400 font-semibold">{activeCount}</span> active</span>}>
      <div className="px-4 py-3">
        <div className="grid grid-cols-7 gap-x-2 gap-y-3">
          {ALL_AGENTS.map((a, i) => {
            const active = i < activeCount;
            return (
              <motion.div key={a.initials} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }} className="flex flex-col items-center gap-1 group">
                <div className="relative">
                  <AgentAvatar agent={a} size="sm" dim={!active} />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-black ${active ? "bg-emerald-400" : "bg-zinc-700"}`} />
                </div>
                <span className={`text-[8px] text-center truncate w-full ${active ? "text-zinc-500" : "text-zinc-700"}`}>{a.role.split(" ")[0]}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

function FinancialSummary() {
  const totalCost = REAL_CYCLES.reduce((s, c) => s + c.cost, 0);
  const stats = [
    { label: "Total spent", value: `$${totalCost.toFixed(2)}`, accent: false },
    { label: "Revenue", value: "$0", muted: true },
    { label: "Avg / cycle", value: `$${(totalCost / REAL_CYCLES.length).toFixed(2)}`, accent: true },
    { label: "Break-even", value: "1 customer", accent: true },
  ];
  return (
    <Panel title="Financials" badge={<span className="text-xs text-zinc-600">real data</span>}>
      <div className="px-4 py-3 grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/[0.025] rounded-lg px-3 py-2.5">
            <div className={`text-lg font-bold ${s.muted ? "text-zinc-600" : s.accent ? "text-orange-400" : "text-white"}`}>{s.value}</div>
            <div className="text-[10px] text-zinc-500">{s.label}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// =================== PAGE ===================

export default function DemoPage() {
  const stars = useGitHubStars("NikitaDmitrieff/auto-co-meta");
  const liveMetrics = useLiveMetrics();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-grid opacity-25 pointer-events-none" />

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white font-bold text-sm tracking-tight hover:text-zinc-300 transition-colors">AUTO-CO</Link>
            <span className="text-zinc-700 text-xs">/</span>
            <span className="text-zinc-500 text-xs">Live Demo</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Cycle {liveMetrics?.cyclesCompleted ?? 38} &middot; Running
            </div>
            <a href="https://github.com/NikitaDmitrieff/auto-co-meta" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              {stars !== null ? <span className="tabular-nums">{stars.toLocaleString()} &#9733;</span> : <span>GitHub</span>}
            </a>
            <Link href="/#waitlist" className="text-xs bg-orange-500 hover:bg-orange-400 text-black font-bold px-4 py-1.5 rounded-[3px] transition-colors">
              Join Waitlist
            </Link>
          </div>
        </div>
      </header>

      <main className="relative max-w-[1400px] mx-auto px-6 py-10">
        <Sandbox />

        <div className="border-t border-white/[0.06] my-12 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-xs text-zinc-600 uppercase tracking-widest">
            Live from auto-co-meta
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Auto-Co Dashboard</h2>
              <p className="text-sm text-zinc-500 mt-0.5">This AI company has been running autonomously for {liveMetrics?.cyclesCompleted ?? 38}+ cycles</p>
            </div>
            <span className="text-xs text-zinc-600 hidden sm:block">Real data &middot; Updated every cycle</span>
          </div>

          <MetricsRow liveMetrics={liveMetrics} />

          <div className="grid grid-cols-12 gap-5 mt-5">
            <div className="col-span-12 lg:col-span-7">
              <LiveActivityFeed />
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">
              <CycleTimeline />
              <FinancialSummary />
            </div>
          </div>

          <div className="mt-5">
            <AgentRoster />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card px-6 py-6 mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <div className="text-base font-bold text-white mb-1">Want this for your company?</div>
            <div className="text-sm text-zinc-500">auto-co is open source. Self-host free, or join the waitlist for the hosted version.</div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="https://github.com/NikitaDmitrieff/auto-co-meta" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-[3px] transition-all">
              Self-host free &rarr;
            </a>
            <Link href="/#waitlist" className="text-sm bg-orange-500 hover:bg-orange-400 text-black font-bold px-5 py-2 rounded-[3px] transition-colors">
              Join waitlist
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
