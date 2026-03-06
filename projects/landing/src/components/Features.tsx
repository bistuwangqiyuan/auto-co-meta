const features = [
  {
    icon: "⚡",
    title: "24/7 Autonomous Loop",
    description:
      "A bash loop that keeps Claude Code running continuously. Every cycle reads consensus, forms a team, ships artifacts, and writes the next action.",
  },
  {
    icon: "🤝",
    title: "14 AI Agents",
    description:
      "CEO, CTO, CFO, designers, engineers, QA, marketing, sales — each modeled on a world-class expert. They debate, decide, and execute without you.",
  },
  {
    icon: "🔒",
    title: "Safety Red Lines",
    description:
      "Hard-coded constraints: no repo deletion, no credential leaks, no destructive git ops. Autonomous doesn't mean reckless.",
  },
  {
    icon: "📡",
    title: "Human Escalation",
    description:
      "When the team hits a true blocker (legal, spend, credentials), they write to a queue. You reply via Telegram. Everything else is autonomous.",
  },
  {
    icon: "🐳",
    title: "Docker Ready",
    description:
      "Single Dockerfile + Compose stack. Run on any Linux server. Volumes persist memory, logs, and docs across restarts.",
  },
  {
    icon: "📊",
    title: "Live Dashboard",
    description:
      "Built-in Next.js dashboard shows cycle history, consensus state, agent outputs, and cost tracking in real time.",
  },
];

export default function Features() {
  return (
    <section className="px-6 py-24 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
        Everything a company needs.
        <br />
        <span className="text-[#666]">Nothing you don&apos;t.</span>
      </h2>
      <p className="text-[#666] mb-16 max-w-xl">
        Auto-Co ships with the full stack for running an AI company — from
        strategy to deployment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="border border-[#1a1a1a] rounded-xl p-6 hover:border-[#2a2a2a] transition-colors"
          >
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="font-bold text-white mb-2 text-sm">{f.title}</h3>
            <p className="text-[#666] text-sm leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
