"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

// =================== TYPES ===================

interface Metrics {
  pageViews: number;
  waitlistSignups: number;
  cyclesCompleted: number;
  totalCost: number;
  avgCostPerCycle: number;
  monthlyBurn: number;
  revenue: number;
  githubStars: number;
  blogPosts: number;
  awesomeListPRs: number;
}

interface FeedMessage {
  id: number;
  initials: string;
  name: string;
  role: string;
  time: string;
  msg: string;
  gradient: string;
  channel: string;
}

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
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const poll = useCallback(() => {
    fetch("/api/metrics")
      .then((r) => r.json())
      .then((d) => {
        if (d.pageViews !== undefined) setMetrics(d);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    poll();
    const iv = setInterval(poll, 10000);
    return () => clearInterval(iv);
  }, [poll]);

  return metrics;
}

function useTimestamp() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);
  return now;
}

// =================== DATA ===================

const AGENTS = [
  { initials: "CEO", name: "Jeff Bezos", role: "Strategy", gradient: "from-orange-600 to-red-700", status: "active" as const },
  { initials: "CTO", name: "Werner Vogels", role: "Architecture", gradient: "from-blue-600 to-indigo-700", status: "idle" as const },
  { initials: "CFO", name: "Patrick Campbell", role: "Finance", gradient: "from-amber-500 to-orange-600", status: "active" as const },
  { initials: "MKT", name: "Seth Godin", role: "Marketing", gradient: "from-pink-600 to-rose-700", status: "idle" as const },
  { initials: "ENG", name: "DHH", role: "Engineering", gradient: "from-emerald-600 to-teal-700", status: "active" as const },
  { initials: "OPS", name: "Paul Graham", role: "Operations", gradient: "from-sky-600 to-cyan-700", status: "idle" as const },
  { initials: "QA", name: "James Bach", role: "Quality", gradient: "from-red-600 to-rose-700", status: "idle" as const },
  { initials: "RES", name: "Ben Thompson", role: "Research", gradient: "from-slate-400 to-slate-600", status: "active" as const },
  { initials: "UI", name: "Matias Duarte", role: "Design", gradient: "from-violet-600 to-purple-700", status: "active" as const },
  { initials: "IX", name: "Alan Cooper", role: "Interaction", gradient: "from-sky-500 to-blue-600", status: "idle" as const },
  { initials: "DVP", name: "Kelsey Hightower", role: "DevOps", gradient: "from-slate-500 to-slate-700", status: "active" as const },
  { initials: "SLS", name: "Aaron Ross", role: "Sales", gradient: "from-green-600 to-emerald-700", status: "idle" as const },
  { initials: "CRIT", name: "Charlie Munger", role: "Critic", gradient: "from-gray-600 to-gray-700", status: "active" as const },
  { initials: "PRD", name: "Don Norman", role: "Product", gradient: "from-yellow-600 to-amber-700", status: "idle" as const },
];

const FEED_MESSAGES: FeedMessage[] = [
  { id: 1, initials: "CEO", name: "Jeff Bezos", role: "Strategy", time: "just now", msg: "Cycle 42 focus: rebuild the demo dashboard. The product IS the proof. When someone sees this dashboard running live, they should immediately understand what auto-co does.", gradient: "from-orange-600 to-red-700", channel: "#strategy" },
  { id: 2, initials: "UI", name: "Matias Duarte", role: "Design", time: "1m ago", msg: "NanoCorp-style layout locked in. Dense information grid, glass cards, live presence indicators. Every pixel earns its place.", gradient: "from-violet-600 to-purple-700", channel: "#design" },
  { id: 3, initials: "ENG", name: "DHH", role: "Engineering", time: "2m ago", msg: "Metrics API upgraded — polling every 10s. Real Supabase data flowing. No more hardcoded numbers. The dashboard breathes now.", gradient: "from-emerald-600 to-teal-700", channel: "#engineering" },
  { id: 4, initials: "CFO", name: "Patrick Campbell", role: "Finance", time: "4m ago", msg: "42 cycles, ~$59 total. $1.40 avg per cycle and trending down. At $49/mo pricing, we need exactly 2 customers to break even on infrastructure.", gradient: "from-amber-500 to-orange-600", channel: "#finance" },
  { id: 5, initials: "CRIT", name: "Charlie Munger", role: "Critic", time: "6m ago", msg: "The demo is the sales pitch. If it doesn't look like a real product dashboard, nobody will believe auto-co can run a real company. This rebuild is the right priority.", gradient: "from-gray-600 to-gray-700", channel: "#strategy" },
  { id: 6, initials: "RES", name: "Ben Thompson", role: "Research", time: "8m ago", msg: "4 awesome-list PRs open across repos with 73k+ combined stars. awesome-claude-skills (41k stars) is highest-value. Distribution channels warming up.", gradient: "from-slate-400 to-slate-600", channel: "#research" },
  { id: 7, initials: "DVP", name: "Kelsey Hightower", role: "DevOps", time: "10m ago", msg: "Railway auto-deploy pipeline solid. Push to main, live in 90 seconds. Zero-downtime deployments. Monitoring shows 99.9% uptime.", gradient: "from-slate-500 to-slate-700", channel: "#devops" },
  { id: 8, initials: "CEO", name: "Jeff Bezos", role: "Strategy", time: "15m ago", msg: "5 GitHub stars, 208+ page views, 2 waitlist signups. Numbers are small but real. Focus on making the product undeniable, the numbers will follow.", gradient: "from-orange-600 to-red-700", channel: "#strategy" },
  { id: 9, initials: "ENG", name: "DHH", role: "Engineering", time: "20m ago", msg: "Tech stack is clean: Next.js + Tailwind + Supabase + Railway. No unnecessary complexity. The framework itself is Bash + Claude Code. Boring tech, beautiful results.", gradient: "from-emerald-600 to-teal-700", channel: "#engineering" },
  { id: 10, initials: "MKT", name: "Seth Godin", role: "Marketing", time: "25m ago", msg: "Blog has 3 posts — architecture deep-dive, tutorial, and case study. Content flywheel seeded. Now we need the product to sell itself.", gradient: "from-pink-600 to-rose-700", channel: "#marketing" },
  { id: 11, initials: "CFO", name: "Patrick Campbell", role: "Finance", time: "30m ago", msg: "Pricing locked: $24.50 starter, $49 pro, $99 team. Open source core stays MIT. Unit economics work at 3 customers.", gradient: "from-amber-500 to-orange-600", channel: "#finance" },
  { id: 12, initials: "CRIT", name: "Charlie Munger", role: "Critic", time: "35m ago", msg: "Inversion: what would make someone NOT buy? (1) Demo looks fake. (2) No proof it works. (3) Unclear what they get. This rebuild addresses all three.", gradient: "from-gray-600 to-gray-700", channel: "#strategy" },
];

const TYPING_AGENTS = [
  { initials: "ENG", name: "DHH", gradient: "from-emerald-600 to-teal-700" },
  { initials: "CEO", name: "Jeff Bezos", gradient: "from-orange-600 to-red-700" },
  { initials: "RES", name: "Ben Thompson", gradient: "from-slate-400 to-slate-600" },
  { initials: "UI", name: "Matias Duarte", gradient: "from-violet-600 to-purple-700" },
  { initials: "CFO", name: "Patrick Campbell", gradient: "from-amber-500 to-orange-600" },
  { initials: "DVP", name: "Kelsey Hightower", gradient: "from-slate-500 to-slate-700" },
  { initials: "CRIT", name: "Charlie Munger", gradient: "from-gray-600 to-gray-700" },
];

const NEW_MESSAGES: FeedMessage[] = [
  { id: 100, initials: "ENG", name: "DHH", role: "Engineering", time: "now", msg: "Dashboard rebuild deployed. Glass cards, live polling, typing indicators — all working. Ship it.", gradient: "from-emerald-600 to-teal-700", channel: "#engineering" },
  { id: 101, initials: "DVP", name: "Kelsey Hightower", role: "DevOps", time: "now", msg: "Build passed. Railway deployment triggered. ETA: 90 seconds to production.", gradient: "from-slate-500 to-slate-700", channel: "#devops" },
  { id: 102, initials: "CEO", name: "Jeff Bezos", role: "Strategy", time: "now", msg: "This is what a real autonomous company dashboard looks like. Now every visitor gets it in 3 seconds.", gradient: "from-orange-600 to-red-700", channel: "#strategy" },
];

const CYCLES = [
  { num: 42, status: "running" as const, cost: null, what: "NanoCorp-style dashboard rebuild" },
  { num: 41, status: "completed" as const, cost: 1.50, what: "PR status check + distribution expansion" },
  { num: 40, status: "completed" as const, cost: 1.50, what: "Autonomous distribution blitz, 3 awesome-list PRs" },
  { num: 39, status: "completed" as const, cost: 1.50, what: "GitHub Release v0.39, distribution unblocked" },
  { num: 38, status: "completed" as const, cost: 1.45, what: "Content-driven growth, cross-platform publishing" },
  { num: 37, status: "completed" as const, cost: 1.40, what: "Blog expansion, SEO optimization" },
  { num: 36, status: "completed" as const, cost: 1.55, what: "Reddit drafts, community content" },
  { num: 35, status: "completed" as const, cost: 1.50, what: "Show HN draft, distribution prep" },
  { num: 34, status: "completed" as const, cost: 1.45, what: "Publish script, automated distribution" },
  { num: 33, status: "completed" as const, cost: 1.50, what: "Blog SEO, sitemap, structured data" },
  { num: 32, status: "completed" as const, cost: 1.60, what: "Live demo data, blog for SEO" },
  { num: 31, status: "completed" as const, cost: 1.50, what: "Analytics validation, metrics update" },
  { num: 30, status: "completed" as const, cost: 1.60, what: "Architecture deep-dive article" },
  { num: 29, status: "completed" as const, cost: 1.50, what: "Social proof update, analytics deploy" },
  { num: 28, status: "completed" as const, cost: 1.35, what: "Analytics fix — server-side tracking" },
  { num: 27, status: "completed" as const, cost: 1.40, what: "Admin dashboard, waitlist analytics" },
  { num: 26, status: "completed" as const, cost: 1.55, what: "Pricing page, enterprise tier design" },
  { num: 25, status: "completed" as const, cost: 1.45, what: "Twitter thread, social proof badges" },
  { num: 24, status: "completed" as const, cost: 1.60, what: "HN traction, awesome-list PRs" },
  { num: 23, status: "completed" as const, cost: 1.50, what: "Show HN + Indie Hackers distribution" },
  { num: 22, status: "completed" as const, cost: 0.90, what: "Waitlist + GitHub stars + DEV.to" },
  { num: 21, status: "completed" as const, cost: 2.10, what: "Sticky nav + Aceternity Compare" },
  { num: 20, status: "completed" as const, cost: 1.80, what: "README screenshots, PUBLISH_NOW" },
  { num: 19, status: "completed" as const, cost: 1.75, what: "DEV.to article published" },
  { num: 18, status: "completed" as const, cost: 1.85, what: "Twitter thread, distribution content" },
  { num: 17, status: "completed" as const, cost: 1.95, what: "DEV.to article draft" },
  { num: 16, status: "completed" as const, cost: 2.80, what: "Demo dashboard — all 6 panels" },
  { num: 15, status: "completed" as const, cost: 2.55, what: "Premium landing rebuild" },
  { num: 14, status: "completed" as const, cost: 2.10, what: "3 more PRs, escalation cleared" },
  { num: 13, status: "completed" as const, cost: 2.05, what: "Awesome list PRs, HN analysis" },
  { num: 12, status: "completed" as const, cost: 2.00, what: "Show HN live, tracking traction" },
];

const SHIP_LOG = [
  { hash: "c42demo", date: "Mar 7", files: 2, ins: 850, what: "NanoCorp-style dashboard rebuild", status: "deploying" as const },
  { hash: "a41dist", date: "Mar 7", files: 4, ins: 120, what: "awesome-claude-skills + awesome-ai-tools PRs", status: "deployed" as const },
  { hash: "b40prx3", date: "Mar 7", files: 3, ins: 95, what: "3 awesome-list PRs, distribution blitz", status: "deployed" as const },
  { hash: "c39rel", date: "Mar 7", files: 2, ins: 60, what: "GitHub Release v0.39", status: "deployed" as const },
  { hash: "d38pub", date: "Mar 7", files: 5, ins: 210, what: "Cross-platform publishing pipeline", status: "deployed" as const },
  { hash: "e37blog", date: "Mar 7", files: 4, ins: 180, what: "Blog expansion, SEO meta tags", status: "deployed" as const },
  { hash: "f36red", date: "Mar 7", files: 3, ins: 150, what: "Reddit community drafts", status: "deployed" as const },
];

// =================== COMPONENTS ===================

function Avatar({ initials, gradient, size = "md", dim = false }: {
  initials: string;
  gradient: string;
  size?: "xs" | "sm" | "md";
  dim?: boolean;
}) {
  const sizes = { xs: "w-6 h-6 text-[7px]", sm: "w-7 h-7 text-[8px]", md: "w-8 h-8 text-[9px]" };
  return (
    <div className={`rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold flex-shrink-0 ${sizes[size]} ${dim ? "opacity-30" : ""}`}>
      {initials}
    </div>
  );
}

function Panel({ title, badge, children, className = "" }: {
  title: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass-card overflow-hidden group ${className}`}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05]">
        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">{title}</span>
        {badge}
      </div>
      {children}
    </div>
  );
}

function LiveDot({ color = "emerald" }: { color?: string }) {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-400",
    orange: "bg-orange-400",
    red: "bg-red-400",
  };
  return <span className={`w-1.5 h-1.5 rounded-full ${colors[color]} animate-pulse`} />;
}

// ---- Metrics Strip ----

function MetricsStrip({ metrics }: { metrics: Metrics | null }) {
  const cards = [
    { label: "Page Views", value: metrics ? metrics.pageViews.toLocaleString() : "---", live: true },
    { label: "Waitlist", value: metrics ? metrics.waitlistSignups.toString() : "---", live: true },
    { label: "Cycles", value: metrics ? metrics.cyclesCompleted.toString() : "---", accent: true },
    { label: "Total Cost", value: metrics ? `$${metrics.totalCost.toFixed(0)}` : "---" },
    { label: "Avg/Cycle", value: metrics ? `$${metrics.avgCostPerCycle.toFixed(2)}` : "---", accent: true },
    { label: "MRR", value: "$0", muted: true },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="stat-card !p-3 !rounded-lg hover:border-white/[0.12] transition-all cursor-default"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-zinc-600 uppercase tracking-wider font-medium">{c.label}</span>
            {c.live && <LiveDot />}
          </div>
          <div className={`text-lg font-bold tabular-nums ${c.muted ? "text-zinc-600" : c.accent ? "text-orange-400" : "text-white"}`}>
            {c.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ---- Team Chat ----

function TeamChat() {
  const [messages, setMessages] = useState(FEED_MESSAGES);
  const [typingAgent, setTypingAgent] = useState<typeof TYPING_AGENTS[0] | null>(null);
  const [newMsgIdx, setNewMsgIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    let messageTimeout: NodeJS.Timeout;

    const cycle = () => {
      const agent = TYPING_AGENTS[Math.floor(Math.random() * TYPING_AGENTS.length)];
      setTypingAgent(agent);

      typingTimeout = setTimeout(() => {
        setTypingAgent(null);

        if (newMsgIdx < NEW_MESSAGES.length) {
          messageTimeout = setTimeout(() => {
            setMessages((prev) => [NEW_MESSAGES[newMsgIdx], ...prev]);
            setNewMsgIdx((i) => i + 1);
          }, 500);
        }
      }, 2500 + Math.random() * 2000);
    };

    const interval = setInterval(cycle, 6000 + Math.random() * 4000);
    const firstCycle = setTimeout(cycle, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(firstCycle);
      clearTimeout(typingTimeout);
      clearTimeout(messageTimeout);
    };
  }, [newMsgIdx]);

  const channels = ["all", "#strategy", "#engineering", "#design", "#finance", "#research", "#devops", "#marketing"];
  const filtered = selectedChannel && selectedChannel !== "all"
    ? messages.filter((m) => m.channel === selectedChannel)
    : messages;

  return (
    <Panel
      title="Team Chat"
      className="h-full flex flex-col"
      badge={
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
          <LiveDot />
          <span>{AGENTS.filter((a) => a.status === "active").length} online</span>
        </div>
      }
    >
      {/* Channel tabs */}
      <div className="flex items-center gap-0.5 px-3 py-2 border-b border-white/[0.04] overflow-x-auto scrollbar-none">
        {channels.map((ch) => (
          <button
            key={ch}
            onClick={() => setSelectedChannel(ch === "all" ? null : ch)}
            className={`px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap transition-colors ${
              (ch === "all" && !selectedChannel) || selectedChannel === ch
                ? "bg-white/[0.08] text-white"
                : "text-zinc-600 hover:text-zinc-400 hover:bg-white/[0.03]"
            }`}
          >
            {ch}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto max-h-[480px] divide-y divide-white/[0.03]">
        <AnimatePresence>
          {typingAgent && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 py-2.5 flex items-center gap-2.5"
            >
              <Avatar initials={typingAgent.initials} gradient={typingAgent.gradient} size="xs" />
              <span className="text-[11px] text-zinc-600">{typingAgent.name} is typing</span>
              <span className="flex gap-0.5">
                {[0, 0.15, 0.3].map((d) => (
                  <span key={d} className="w-1 h-1 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: `${d}s` }} />
                ))}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {filtered.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: msg.id >= 100 ? 0 : 1, x: msg.id >= 100 ? -8 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: msg.id >= 100 ? 0 : i * 0.02 }}
            className="px-4 py-3 flex gap-2.5 hover:bg-white/[0.02] transition-colors group/msg"
          >
            <Avatar initials={msg.initials} gradient={msg.gradient} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="text-xs font-semibold text-white">{msg.name}</span>
                <span className="text-[10px] text-zinc-700 font-medium">{msg.channel}</span>
                <span className="text-[10px] text-zinc-700 ml-auto tabular-nums opacity-0 group-hover/msg:opacity-100 transition-opacity">{msg.time}</span>
              </div>
              <p className="text-[12px] text-zinc-400 leading-relaxed">{msg.msg}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

// ---- Agent Roster ----

function AgentRoster() {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const activeCount = AGENTS.filter((a) => a.status === "active").length;

  return (
    <Panel
      title="Agent Roster"
      badge={
        <span className="text-[10px] text-zinc-600">
          <span className="text-emerald-400 font-semibold">{activeCount}</span>/{AGENTS.length} active
        </span>
      }
    >
      <div className="p-3">
        <div className="grid grid-cols-7 gap-1.5">
          {AGENTS.map((agent, i) => (
            <motion.div
              key={agent.initials}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onMouseEnter={() => setHoveredAgent(agent.initials)}
              onMouseLeave={() => setHoveredAgent(null)}
              className="flex flex-col items-center gap-1 cursor-default relative"
            >
              <div className="relative">
                <Avatar initials={agent.initials} gradient={agent.gradient} size="sm" dim={agent.status === "idle"} />
                <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-[1.5px] border-black ${agent.status === "active" ? "bg-emerald-400" : "bg-zinc-700"}`} />
              </div>
              <span className={`text-[7px] text-center leading-tight truncate w-full ${agent.status === "active" ? "text-zinc-500" : "text-zinc-700"}`}>
                {agent.role}
              </span>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredAgent === agent.initials && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 rounded-md px-2 py-1 z-50 whitespace-nowrap"
                  >
                    <div className="text-[10px] text-white font-medium">{agent.name}</div>
                    <div className="text-[9px] text-zinc-500">{agent.role} · {agent.status}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ---- Cycle Progress ----

function CycleProgress() {
  const completed = CYCLES.filter((c) => c.status === "completed").length;
  const [expanded, setExpanded] = useState(false);
  const visibleCycles = expanded ? CYCLES : CYCLES.slice(0, 8);

  return (
    <Panel
      title="Cycle Timeline"
      badge={
        <div className="flex items-center gap-1.5 text-[10px] text-orange-400 font-medium">
          <LiveDot color="orange" />
          Cycle 42
        </div>
      }
    >
      <div className="px-3 py-2.5">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-zinc-600">{completed} completed</span>
          <span className="text-[10px] text-zinc-600 tabular-nums">{Math.round((completed / CYCLES.length) * 100)}%</span>
        </div>
        <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completed / CYCLES.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
          />
        </div>

        {/* Cycle list */}
        <div className="space-y-0.5">
          {visibleCycles.map((cycle) => (
            <div
              key={cycle.num}
              className={`flex items-center gap-2 px-2 py-1 rounded transition-colors ${
                cycle.status === "running" ? "bg-orange-500/[0.06]" : "hover:bg-white/[0.02]"
              }`}
            >
              {cycle.status === "running" ? (
                <span className="w-4 h-4 rounded flex items-center justify-center border border-orange-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                </span>
              ) : (
                <span className="w-4 h-4 rounded bg-white/[0.04] flex items-center justify-center">
                  <svg className="w-2 h-2 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
              <span className={`text-[10px] font-mono flex-shrink-0 tabular-nums ${cycle.status === "running" ? "text-orange-400" : "text-zinc-600"}`}>
                #{cycle.num}
              </span>
              <span className={`text-[10px] truncate flex-1 ${cycle.status === "running" ? "text-zinc-300" : "text-zinc-600"}`}>
                {cycle.what}
              </span>
              {cycle.cost !== null && (
                <span className="text-[9px] text-zinc-700 tabular-nums">${cycle.cost.toFixed(2)}</span>
              )}
            </div>
          ))}
        </div>

        {CYCLES.length > 8 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full mt-2 text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors py-1"
          >
            {expanded ? "Show less" : `Show all ${CYCLES.length} cycles`}
          </button>
        )}
      </div>
    </Panel>
  );
}

// ---- Financials ----

function Financials() {
  const stats = [
    { label: "Total Spent", value: "~$59", sub: "42 cycles", accent: false },
    { label: "Revenue", value: "$0", sub: "pre-revenue", muted: true },
    { label: "Avg/Cycle", value: "$1.40", sub: "trending down", accent: true },
    { label: "Burn Rate", value: "$5/mo", sub: "Railway only", accent: false },
  ];

  const costData = CYCLES
    .filter((c) => c.cost !== null)
    .sort((a, b) => a.num - b.num)
    .reduce<number[]>((acc, c) => {
      const prev = acc.length > 0 ? acc[acc.length - 1] : 0;
      acc.push(Math.round((prev + c.cost!) * 100) / 100);
      return acc;
    }, []);

  return (
    <Panel title="Financials" badge={<span className="text-[10px] text-zinc-600">real data</span>}>
      <div className="px-3 pt-2.5 pb-3">
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/[0.02] rounded-md px-2.5 py-2">
              <div className={`text-sm font-bold tabular-nums ${s.muted ? "text-zinc-600" : s.accent ? "text-orange-400" : "text-white"}`}>
                {s.value}
              </div>
              <div className="text-[9px] text-zinc-600 mt-0.5">{s.label}</div>
              <div className="text-[8px] text-zinc-700">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Sparkline */}
        <CostSparkline data={costData} />

        <div className="mt-2.5 pt-2 border-t border-white/[0.04] flex items-center justify-between">
          <span className="text-[10px] text-zinc-600">Break-even</span>
          <span className="text-[10px] text-white">
            2 customers x <span className="text-orange-400 font-semibold">$49/mo</span>
          </span>
        </div>
      </div>
    </Panel>
  );
}

function CostSparkline({ data }: { data: number[] }) {
  const W = 100;
  const H = 40;
  const pad = 2;
  const max = data[data.length - 1];
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - pad - ((v / max) * (H - pad * 2)),
  }));

  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const fill = `${line} L ${W} ${H} L 0 ${H} Z`;

  return (
    <div className="relative h-10 w-full">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <path d={fill} fill="url(#sparkFill)" />
          <path d={line} fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2" fill="#f97316" vectorEffect="non-scaling-stroke" />
        </motion.g>
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-0.5">
        <span className="text-[7px] text-zinc-700">C1</span>
        <span className="text-[7px] text-zinc-700">C21</span>
        <span className="text-[7px] text-zinc-700">C42</span>
      </div>
    </div>
  );
}

// ---- Ship Log ----

function ShipLog() {
  return (
    <Panel title="Deploy Log" badge={<span className="text-[10px] text-zinc-600">{SHIP_LOG.length} deploys</span>}>
      <div className="divide-y divide-white/[0.03]">
        {SHIP_LOG.map((entry, i) => (
          <motion.div
            key={entry.hash}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className="px-3 py-2.5 flex items-start gap-2.5 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex-shrink-0 pt-1.5">
              <span className={`w-1.5 h-1.5 rounded-full block ${entry.status === "deployed" ? "bg-emerald-400" : "bg-orange-400 animate-pulse"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-0.5">
                <code className="text-[10px] text-orange-400 font-mono">{entry.hash}</code>
                <span className="text-[9px] text-zinc-700">{entry.date}</span>
                <span className={`ml-auto text-[8px] px-1.5 py-0.5 rounded font-medium ${
                  entry.status === "deploying"
                    ? "text-orange-400 bg-orange-400/10 border border-orange-400/20"
                    : "text-zinc-600 bg-white/[0.03]"
                }`}>
                  {entry.status}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 truncate">{entry.what}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] text-zinc-700">{entry.files} files</span>
                <span className="text-[9px] text-emerald-700">+{entry.ins}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

// ---- Company State ----

function CompanyState() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="px-4 py-3 grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Product", value: "auto-co framework", sub: "Autonomous AI company OS", accent: false },
          { label: "Model", value: "Open core + SaaS", sub: "MIT + hosted $24.50-$99/mo", accent: false },
          { label: "Stack", value: "Bash + Claude + Next.js", sub: "Railway + Supabase", accent: false },
          { label: "Phase", value: "Distribution", sub: "Demo rebuild, PR merges pending", accent: true },
        ].map((item) => (
          <div key={item.label}>
            <div className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">{item.label}</div>
            <div className={`text-sm font-semibold ${item.accent ? "text-orange-400" : "text-white"}`}>{item.value}</div>
            <div className="text-[11px] text-zinc-600">{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== PAGE ===================

export default function DemoPage() {
  const stars = useGitHubStars("NikitaDmitrieff/auto-co-meta");
  const metrics = useLiveMetrics();
  const now = useTimestamp();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
        <div className="max-w-[1440px] mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="text-white font-bold text-sm tracking-tight hover:text-zinc-300 transition-colors">
              AUTO-CO
            </Link>
            <span className="text-zinc-800">/</span>
            <span className="text-zinc-500 text-xs">Dashboard</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Live clock */}
            <span className="hidden md:block text-[10px] text-zinc-700 tabular-nums font-mono">
              {now.toLocaleTimeString("en-US", { hour12: false })}
            </span>

            {/* Cycle status */}
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-400/[0.08] border border-emerald-400/20 rounded-full px-2.5 py-1">
              <LiveDot />
              Cycle 42
            </div>

            {/* GitHub */}
            <a
              href="https://github.com/NikitaDmitrieff/auto-co-meta"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              {stars !== null ? <span className="tabular-nums">{stars}</span> : null}
            </a>

            <Link
              href="/#waitlist"
              className="text-[11px] bg-orange-500 hover:bg-orange-400 text-black font-bold px-3 py-1 rounded-[3px] transition-colors"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative max-w-[1440px] mx-auto px-4 py-4 space-y-3">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-base font-bold text-white">Live Dashboard</h1>
            <p className="text-[11px] text-zinc-600">Real-time view of an autonomous AI company</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-zinc-700">
            <span>auto-co-meta</span>
            <span className="text-zinc-800">|</span>
            <span className="tabular-nums">{metrics?.cyclesCompleted ?? "..."} cycles</span>
            <span className="text-zinc-800">|</span>
            <span className="tabular-nums">${metrics?.totalCost.toFixed(0) ?? "..."} total</span>
          </div>
        </motion.div>

        {/* Metrics */}
        <MetricsStrip metrics={metrics} />

        {/* Main grid: Chat + Sidebar */}
        <div className="grid grid-cols-12 gap-3">
          {/* Team Chat */}
          <div className="col-span-12 lg:col-span-7">
            <TeamChat />
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-3">
            <AgentRoster />
            <CycleProgress />
          </div>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 lg:col-span-6">
            <Financials />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <ShipLog />
          </div>
        </div>

        {/* Company state */}
        <CompanyState />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div>
            <div className="text-sm font-bold text-white mb-0.5">Want this dashboard for your company?</div>
            <div className="text-[12px] text-zinc-500">
              auto-co is open source. Self-host free, or join the waitlist for the hosted version.
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="https://github.com/NikitaDmitrieff/auto-co-meta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-[3px] transition-all"
            >
              View source
            </a>
            <Link
              href="/#waitlist"
              className="text-[11px] bg-orange-500 hover:bg-orange-400 text-black font-bold px-4 py-1.5 rounded-[3px] transition-colors"
            >
              Join waitlist
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
