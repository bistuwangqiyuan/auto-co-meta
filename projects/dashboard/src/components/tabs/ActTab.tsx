"use client";

import { useEffect, useState } from "react";
import {
  escalations,
  chatMessages,
  AGENTS,
  AGENT_COLORS,
  type Escalation,
  type ChatMessage,
  type AgentDef,
} from "@/data/dashboard";

// ── Types ────────────────────────────────────────────────────────

type Frequency = "PAUSED" | "SLOW" | "NORMAL" | "FAST" | "SURGE";

const FREQUENCIES: Frequency[] = ["PAUSED", "SLOW", "NORMAL", "FAST", "SURGE"];
const FREQUENCY_LABELS: Record<Frequency, string> = {
  PAUSED: "暂停",
  SLOW: "慢速",
  NORMAL: "正常",
  FAST: "快速",
  SURGE: "冲刺",
};

// ── Helpers ──────────────────────────────────────────────────────

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// ── Section header ───────────────────────────────────────────────

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-2 mb-4">
      {children}
    </h3>
  );
}

// ── Escalation card ──────────────────────────────────────────────

function EscalationCard({
  esc,
  resolved,
}: {
  esc: Escalation;
  resolved?: boolean;
}) {
  const color = AGENT_COLORS[esc.from] || "#64748b";

  if (resolved) {
    return (
      <div className="border border-slate-100 p-3 opacity-60">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-1">
          <span>{esc.date}</span>
          <span>来自</span>
          <span style={{ color }}>{esc.from}</span>
          <span className="ml-auto text-green-500 font-semibold">已解决</span>
        </div>
        <p className="text-sm text-slate-500">{esc.question}</p>
        {esc.response && (
          <p className="text-xs text-slate-400 mt-1 italic">
            回复: {esc.response}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="border border-orange-200 bg-orange-50/30 p-4">
      <div className="flex items-center gap-2 text-xs font-mono mb-2">
        <span className="text-slate-500">{esc.date}</span>
        <span className="text-slate-400">来自</span>
        <span className="font-medium" style={{ color }}>
          {esc.from}
        </span>
      </div>
      <p className="text-sm text-slate-600 mb-2">{esc.context}</p>
      <p className="text-sm font-semibold text-slate-900 mb-2">
        {esc.question}
      </p>
      <p className="text-xs text-slate-500 italic mb-3">
        默认动作: {esc.defaultAction}
      </p>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-colors">
          回复
        </button>
        <button className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-colors">
          忽略
        </button>
      </div>
    </div>
  );
}

// ── Pending escalations ──────────────────────────────────────────

function PendingEscalations() {
  const pending = escalations.filter((e) => !e.resolved);
  const resolved = escalations.filter((e) => e.resolved);

  return (
    <div>
      <SectionHeader>待处理升级请求</SectionHeader>

      {pending.length === 0 ? (
        <div className="flex items-center gap-2 text-sm text-slate-500 py-4">
          <svg
            className="w-4 h-4 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M5 13l4 4L19 7"
            />
          </svg>
          暂无待处理升级请求
        </div>
      ) : (
        <div className="space-y-3">
          {pending.map((esc) => (
            <EscalationCard key={esc.id} esc={esc} />
          ))}
        </div>
      )}

      {resolved.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            已解决（{resolved.length}）
          </p>
          {resolved.map((esc) => (
            <EscalationCard key={esc.id} esc={esc} resolved />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Agent toggle ─────────────────────────────────────────────────

function AgentToggle({
  enabled,
  disabled,
  onToggle,
}: {
  enabled: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`w-8 h-4 relative shrink-0 transition-colors ${
        enabled ? "bg-orange-500" : "bg-slate-300"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <span
        className={`absolute top-0.5 w-3 h-3 bg-white transition-all ${
          enabled ? "right-0.5" : "left-0.5"
        }`}
      />
    </button>
  );
}

// ── Agent card ───────────────────────────────────────────────────

function AgentCard({
  agent,
  enabled,
  disabled,
  onToggle,
}: {
  agent: AgentDef;
  enabled: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border border-slate-200 p-3 transition-opacity ${
        enabled ? "opacity-100" : "opacity-50"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2 h-2 shrink-0"
            style={{ backgroundColor: agent.color }}
          />
          <span className="font-mono text-sm text-slate-900 truncate">
            {agent.name}
          </span>
        </div>
        <AgentToggle enabled={enabled} disabled={disabled} onToggle={onToggle} />
      </div>
      <div className="ml-4">
        <span className="text-xs text-slate-500 block">{agent.role}</span>
        <span className="text-xs text-slate-400 italic block">
          {agent.expert}
        </span>
        <span className="text-xs text-slate-400 font-mono mt-1 block">
          {enabled ? "周期 125" : "空闲"}
        </span>
      </div>
    </div>
  );
}

// ── Agent controls ───────────────────────────────────────────────

function AgentControls({
  agents,
  busy,
  onToggle,
  onEnableAll,
  onDisableAll,
}: {
  agents: AgentDef[];
  busy: boolean;
  onToggle: (name: string) => void;
  onEnableAll: () => void;
  onDisableAll: () => void;
}) {
  return (
    <div>
      <SectionHeader>代理控制</SectionHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        {agents.map((agent) => (
          <AgentCard
            key={agent.name}
            agent={agent}
            enabled={agent.enabled}
            disabled={busy}
            onToggle={() => onToggle(agent.name)}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onEnableAll}
          disabled={busy}
          className="px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider border border-slate-200 text-slate-600 hover:border-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          全部启用
        </button>
        <button
          onClick={onDisableAll}
          disabled={busy}
          className="px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider border border-slate-200 text-slate-600 hover:border-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          全部停用
        </button>
      </div>
    </div>
  );
}

// ── Chat message bubble ──────────────────────────────────────────

function ChatBubble({ msg }: { msg: ChatMessage }) {
  if (msg.from === "human") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%]">
          <div className="bg-orange-50 border border-orange-200 px-3 py-2">
            <p className="text-sm text-slate-800">{msg.content}</p>
          </div>
          <p className="text-xs text-slate-400 mt-1 text-right">
            {formatTime(msg.timestamp)}
          </p>
        </div>
      </div>
    );
  }

  const color = msg.agent ? AGENT_COLORS[msg.agent] || "#64748b" : "#64748b";

  return (
    <div className="flex justify-start">
      <div className="max-w-[80%]">
        {msg.agent && (
          <span
            className="inline-block text-xs font-mono font-medium px-1.5 py-0.5 mb-1"
            style={{ color, backgroundColor: `${color}15` }}
          >
            {msg.agent}
          </span>
        )}
        <div className="border border-slate-200 px-3 py-2">
          <p className="text-sm font-mono text-slate-700">{msg.content}</p>
        </div>
        <p className="text-xs text-slate-400 mt-1">{formatTime(msg.timestamp)}</p>
      </div>
    </div>
  );
}

// ── Chat interface ───────────────────────────────────────────────

function ChatInterface() {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-slate-200 px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500">
            与 CEO 对话
          </h3>
          <span className="w-2 h-2 bg-orange-500 animate-pulse" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {chatMessages.map((msg) => (
          <ChatBubble key={msg.id} msg={msg} />
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 p-3 shrink-0">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入要发送给 AI CEO 的消息..."
            rows={2}
            className="flex-1 border border-slate-200 px-3 py-2 text-sm resize-none focus:outline-none focus:border-orange-500 transition-colors font-mono placeholder:text-slate-400"
          />
          <button className="self-end px-4 py-2 bg-orange-500 text-white text-xs font-mono font-semibold uppercase tracking-wider hover:bg-orange-600 transition-colors shrink-0">
            发送
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ActTab ───────────────────────────────────────────────────────

export default function ActTab() {
  const [agents, setAgents] = useState<AgentDef[]>(AGENTS);
  const [isBusy, setIsBusy] = useState(false);
  const [actionMessage, setActionMessage] = useState("后端动作已接入，可直接控制运行。");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const response = await fetch("/api/agents");
        if (!response.ok) return;
        const data = (await response.json()) as { agents?: AgentDef[] };
        if (mounted && data.agents) {
          setAgents(data.agents);
        }
      } catch {
        // Keep UI functional with local defaults.
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const syncAgents = async (updates: Array<{ name: string; enabled: boolean }>) => {
    setIsBusy(true);
    try {
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      if (!response.ok) {
        throw new Error("agent update failed");
      }
      const data = (await response.json()) as { agents: AgentDef[] };
      setAgents(data.agents);
      setActionMessage("代理配置已持久化保存。");
    } catch {
      setActionMessage("代理配置保存失败，请重试。");
    } finally {
      setIsBusy(false);
    }
  };

  const toggleAgent = (name: string) => {
    const target = agents.find((agent) => agent.name === name);
    if (!target) return;
    setAgents((prev) =>
      prev.map((agent) =>
        agent.name === name ? { ...agent, enabled: !agent.enabled } : agent
      )
    );
    void syncAgents([{ name, enabled: !target.enabled }]);
  };

  const enableAll = () => {
    setAgents((prev) => prev.map((agent) => ({ ...agent, enabled: true })));
    void syncAgents(agents.map((agent) => ({ name: agent.name, enabled: true })));
  };

  const disableAll = () => {
    setAgents((prev) => prev.map((agent) => ({ ...agent, enabled: false })));
    void syncAgents(agents.map((agent) => ({ name: agent.name, enabled: false })));
  };

  const runSingleCycle = async () => {
    setIsBusy(true);
    try {
      const response = await fetch("/api/control/run-cycle", { method: "POST" });
      const data = (await response.json()) as { message?: string };
      setActionMessage(data.message || "已触发执行。");
    } catch {
      setActionMessage("触发单轮运行失败，请检查后端服务。");
    } finally {
      setIsBusy(false);
    }
  };

  const emergencyStop = async () => {
    setIsBusy(true);
    try {
      const response = await fetch("/api/control/emergency-stop", { method: "POST" });
      const data = (await response.json()) as { message?: string };
      setActionMessage(data.message || "已发送紧急停止请求。");
    } catch {
      setActionMessage("紧急停止失败，请稍后重试。");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-7.5rem)]">
      {/* Left: Action center — 50% */}
      <div className="w-full lg:w-1/2 overflow-y-auto p-6 space-y-6">
        <PendingEscalations />
        <div>
          <SectionHeader>周期控制</SectionHeader>
          <div className="flex gap-0 mb-4">
            {FREQUENCIES.map((freq) => (
              <button
                key={freq}
                className="flex-1 py-2 text-xs font-mono font-semibold uppercase tracking-wider border border-slate-200 text-slate-600"
                disabled
              >
                {FREQUENCY_LABELS[freq]}
              </button>
            ))}
          </div>
          <button
            onClick={runSingleCycle}
            disabled={isBusy}
            className="w-full bg-orange-500 text-white font-semibold py-3 text-sm font-mono uppercase tracking-wider hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            运行一轮周期
          </button>
          <button
            onClick={emergencyStop}
            disabled={isBusy}
            className="w-full bg-red-600 text-white font-semibold py-3 text-sm font-mono uppercase tracking-wider mt-2 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            紧急停止
          </button>
          <p className="mt-3 text-xs text-slate-500">{actionMessage}</p>
        </div>
        <AgentControls
          agents={agents}
          busy={isBusy}
          onToggle={toggleAgent}
          onEnableAll={enableAll}
          onDisableAll={disableAll}
        />
      </div>

      {/* Right: Chat — 50% */}
      <div className="w-full lg:w-1/2 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col min-h-[300px] lg:min-h-0">
        <ChatInterface />
      </div>
    </div>
  );
}
