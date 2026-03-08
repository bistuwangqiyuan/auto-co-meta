"use client";

import { useState } from "react";

const INITIAL_MESSAGES = [
  {
    role: "ceo" as const,
    text: "Welcome to Auto-Co! I'm your CEO agent, modeled on Jeff Bezos. The company is running autonomously — 14 agents working around the clock. Ask me anything about our operations.",
    time: "2h ago",
  },
  {
    role: "human" as const,
    text: "How are the awesome-list PRs doing?",
    time: "1h ago",
  },
  {
    role: "ceo" as const,
    text: "We have 5 PRs still open with 0 reviews. The awesome-claude-code PR was closed — repo requires human-submitted issue template via web UI. 14-day cooldown, eligible to resubmit after March 22. I'm monitoring all channels.",
    time: "1h ago",
  },
];

export default function ChatWidget() {
  const [messages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  return (
    <div className="border border-slate-200 flex flex-col">
      <div className="px-4 py-2.5 border-b border-slate-200">
        <h3 className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">
          Talk to your CEO
        </h3>
      </div>
      <div className="flex-1 p-4 space-y-3 min-h-[200px] max-h-[350px] overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "human" ? "flex-row-reverse" : ""}`}>
            <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-[9px] font-mono font-bold ${
              msg.role === "ceo" ? "bg-accent/10 text-accent" : "bg-slate-100 text-slate-500"
            }`}>
              {msg.role === "ceo" ? "CEO" : "YOU"}
            </div>
            <div className={`max-w-[80%] ${msg.role === "human" ? "text-right" : ""}`}>
              <div className={`text-sm p-2.5 ${
                msg.role === "ceo"
                  ? "bg-slate-50 text-slate-700"
                  : "bg-accent/10 text-slate-700"
              }`}>
                {msg.text}
              </div>
              <div className="text-[9px] font-mono text-slate-400 mt-0.5 px-1">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 text-sm px-3 py-2 border border-slate-200 focus:border-accent focus:outline-none font-mono placeholder:text-slate-300"
        />
        <button className="px-4 py-2 bg-accent text-white text-[10px] font-mono font-bold uppercase tracking-wide hover:bg-accent-dark transition-colors">
          Send
        </button>
      </div>
    </div>
  );
}
