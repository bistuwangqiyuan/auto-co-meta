import state from "@/data";

export default function SettingsPage() {
  const { cycle, deployments, agentActivity } = state;

  const activeAgentCount = Object.values(agentActivity).filter(
    (a) => a.lastCycle >= cycle - 1
  ).length;

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Settings</h2>
        <p className="text-sm text-slate-400 mt-0.5">
          Team roster, skills inventory, and loop configuration
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="border border-slate-200 px-4 py-3">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">
            Agents
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">14</div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {activeAgentCount} recently active
          </div>
        </div>
        <div className="border border-slate-200 px-4 py-3">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">
            Skills
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">35</div>
          <div className="text-[10px] text-slate-400 mt-0.5">9 categories</div>
        </div>
        <div className="border border-slate-200 px-4 py-3">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">
            Deployments
          </div>
          <div className="text-xl font-bold font-mono text-accent">
            {deployments.length}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">all live</div>
        </div>
        <div className="border border-slate-200 px-4 py-3">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">
            Config Vars
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">10</div>
          <div className="text-[10px] text-slate-400 mt-0.5">auto-loop.sh</div>
        </div>
      </div>

      {/* Team Roster (compact) */}
      <div className="border border-slate-200 p-5 mb-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Team Roster
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] text-slate-400 uppercase tracking-wide border-b border-slate-100">
                <th className="text-left py-2 pr-4">Agent</th>
                <th className="text-left py-2 pr-4">Role</th>
                <th className="text-left py-2 pr-4">Expert</th>
                <th className="text-left py-2 pr-4">Layer</th>
                <th className="text-right py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {TEAM.map((agent) => {
                const activity = agentActivity[agent.id];
                const active = activity && activity.lastCycle >= cycle - 1;
                return (
                  <tr
                    key={agent.id}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-2 pr-4">
                      <span className="text-xs font-mono text-slate-500">
                        {agent.id}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-sm font-medium text-slate-900">
                      {agent.role}
                    </td>
                    <td className="py-2 pr-4 text-sm text-slate-500">
                      {agent.expert}
                    </td>
                    <td className="py-2 pr-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] ${agent.layerColor} text-white px-1.5 py-0.5`}
                      >
                        {agent.layer}
                      </span>
                    </td>
                    <td className="py-2 text-right">
                      {active ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-accent font-medium">
                          <span className="w-1.5 h-1.5 bg-accent" />
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-300">Idle</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skills Inventory */}
      <div className="border border-slate-200 p-5 mb-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Skills Inventory
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.name} className="border border-slate-100 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700">
                  {cat.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {cat.skills.length}
                </span>
              </div>
              <div className="space-y-1">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-slate-300 mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-slate-600">
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1.5">
                        {skill.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loop Configuration */}
      <div className="border border-slate-200 p-5 mb-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Loop Configuration
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] text-slate-400 uppercase tracking-wide border-b border-slate-100">
                <th className="text-left py-2 pr-4">Variable</th>
                <th className="text-left py-2 pr-4">Default</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {LOOP_CONFIG.map((c) => (
                <tr
                  key={c.name}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-2 pr-4">
                    <span className="text-xs font-mono text-accent">
                      {c.name}
                    </span>
                  </td>
                  <td className="py-2 pr-4">
                    <span className="text-xs font-mono text-slate-700 bg-slate-50 px-1.5 py-0.5">
                      {c.value}
                    </span>
                  </td>
                  <td className="py-2 text-xs text-slate-500">{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deployments */}
      <div className="border border-slate-200 p-5">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Deployments
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {deployments.map((d) => (
            <div
              key={d.service}
              className="flex items-center justify-between border border-slate-100 px-3 py-2"
            >
              <div>
                <div className="text-sm font-medium text-slate-900">
                  {d.service}
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {d.url}
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-medium ${
                  d.status === "live"
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 ${
                    d.status === "live" ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                {d.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Static data ─────────────────────────────────────────────────────

const TEAM = [
  { id: "ceo-bezos", role: "CEO", expert: "Jeff Bezos", layer: "Strategy", layerColor: "bg-violet-500" },
  { id: "cto-vogels", role: "CTO", expert: "Werner Vogels", layer: "Strategy", layerColor: "bg-violet-500" },
  { id: "critic-munger", role: "Critic", expert: "Charlie Munger", layer: "Strategy", layerColor: "bg-violet-500" },
  { id: "product-norman", role: "Product", expert: "Don Norman", layer: "Product", layerColor: "bg-blue-500" },
  { id: "ui-duarte", role: "Design", expert: "Matias Duarte", layer: "Product", layerColor: "bg-blue-500" },
  { id: "interaction-cooper", role: "Interaction", expert: "Alan Cooper", layer: "Product", layerColor: "bg-blue-500" },
  { id: "fullstack-dhh", role: "Engineering", expert: "DHH", layer: "Engineering", layerColor: "bg-emerald-500" },
  { id: "qa-bach", role: "QA", expert: "James Bach", layer: "Engineering", layerColor: "bg-emerald-500" },
  { id: "devops-hightower", role: "DevOps", expert: "Kelsey Hightower", layer: "Engineering", layerColor: "bg-emerald-500" },
  { id: "marketing-godin", role: "Marketing", expert: "Seth Godin", layer: "Business", layerColor: "bg-amber-500" },
  { id: "operations-pg", role: "Operations", expert: "Paul Graham", layer: "Business", layerColor: "bg-amber-500" },
  { id: "sales-ross", role: "Sales", expert: "Aaron Ross", layer: "Business", layerColor: "bg-amber-500" },
  { id: "cfo-campbell", role: "CFO", expert: "Patrick Campbell", layer: "Business", layerColor: "bg-amber-500" },
  { id: "research-thompson", role: "Research", expert: "Ben Thompson", layer: "Intelligence", layerColor: "bg-rose-500" },
];

const SKILL_CATEGORIES = [
  {
    name: "Research & Intelligence",
    skills: [
      { name: "deep-research", desc: "Multi-stage research pipeline" },
      { name: "web-scraping", desc: "3-tier waterfall scraper" },
      { name: "websh", desc: "Browse web like filesystem" },
      { name: "deep-reading-analyst", desc: "10+ thinking frameworks" },
      { name: "competitive-intelligence", desc: "8-step CI workflow" },
      { name: "github-explorer", desc: "Deep GitHub analysis" },
    ],
  },
  {
    name: "Strategy & Business",
    skills: [
      { name: "product-strategist", desc: "TAM/SAM/SOM, GTM" },
      { name: "market-sizing", desc: "3 sizing methods" },
      { name: "startup-models", desc: "Business model analysis" },
      { name: "micro-saas-launcher", desc: "Cold start framework" },
    ],
  },
  {
    name: "Finance & Pricing",
    skills: [
      { name: "financial-modeling", desc: "3-5yr projections" },
      { name: "unit-economics", desc: "CAC/LTV analysis" },
      { name: "pricing-strategy", desc: "Pricing frameworks" },
    ],
  },
  {
    name: "Critique & Risk",
    skills: [
      { name: "premortem", desc: "Failure mode analysis" },
      { name: "scientific-thinking", desc: "Methodology critique" },
      { name: "deep-analysis", desc: "Code + security audit" },
    ],
  },
  {
    name: "Engineering & Security",
    skills: [
      { name: "code-review-security", desc: "Combined review + audit" },
      { name: "security-audit", desc: "Security framework" },
      { name: "devops", desc: "DevOps operations" },
      { name: "tailwind-v4-shadcn", desc: "TW4 + shadcn setup" },
    ],
  },
  {
    name: "Design & Experience",
    skills: [
      { name: "ux-audit-rethink", desc: "7-factor UX audit" },
      { name: "user-persona", desc: "Persona creation" },
      { name: "user-research", desc: "Research synthesis" },
    ],
  },
  {
    name: "Marketing & Growth",
    skills: [
      { name: "seo-content", desc: "SEO content flywheel" },
      { name: "content-strategy", desc: "Content planning" },
      { name: "seo-audit", desc: "Technical SEO audit" },
      { name: "email-sequence", desc: "Email marketing" },
      { name: "ph-outreach", desc: "Product Hunt launch" },
      { name: "community-growth", desc: "Community-led growth" },
      { name: "cold-email", desc: "Cold email generator" },
    ],
  },
  {
    name: "Quality Assurance",
    skills: [{ name: "senior-qa", desc: "Senior QA strategy" }],
  },
  {
    name: "Internal Tools",
    skills: [
      { name: "team", desc: "Team formation" },
      { name: "find-skills", desc: "Discover new skills" },
      { name: "skill-creator", desc: "Create custom skills" },
      { name: "agent-browser", desc: "Browser automation" },
    ],
  },
];

const LOOP_CONFIG = [
  { name: "MODEL", value: "opus", desc: "Claude model for cycle execution" },
  { name: "LOOP_INTERVAL", value: "120", desc: "Seconds between cycles" },
  { name: "CYCLE_TIMEOUT_SECONDS", value: "1800", desc: "Max seconds per cycle before force-kill" },
  { name: "MAX_CONSECUTIVE_ERRORS", value: "3", desc: "Circuit breaker threshold" },
  { name: "COOLDOWN_SECONDS", value: "300", desc: "Cooldown after circuit break" },
  { name: "LIMIT_WAIT_SECONDS", value: "3600", desc: "Wait on usage limit" },
  { name: "MAX_LOGS", value: "200", desc: "Max cycle logs to keep" },
  { name: "RETRY_BASE_SECONDS", value: "30", desc: "Initial backoff on transient failure" },
  { name: "RETRY_MAX_SECONDS", value: "600", desc: "Max backoff cap" },
  { name: "MAX_CYCLES", value: "0", desc: "Max cycles before exit (0 = unlimited)" },
];
