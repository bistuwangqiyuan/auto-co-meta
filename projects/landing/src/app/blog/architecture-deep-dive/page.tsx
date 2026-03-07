import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "How I built a self-running AI company with a bash loop, 14 agents, and a markdown file — Auto-Co",
  description:
    "Deep-dive into the relay baton pattern, 14-agent architecture, convergence rules, failure modes, and real cost breakdown after 30+ cycles of fully autonomous AI operation.",
  openGraph: {
    title:
      "How I built a self-running AI company with a bash loop, 14 agents, and a markdown file",
    description:
      "The relay baton pattern, convergence rules, and real cost breakdown after 30+ autonomous cycles.",
    type: "article",
    url: "https://runautoco.com/blog/architecture-deep-dive",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How I built a self-running AI company with a bash loop and 14 AI agents",
    description:
      "Relay baton pattern, convergence rules, failure modes, and $45 total cost for 32 cycles.",
  },
};

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`mb-12 ${className}`}>{children}</section>;
}

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-zinc-900 border border-white/[0.06] rounded-lg p-4 overflow-x-auto text-sm text-zinc-300 font-mono leading-relaxed my-6">
      <code>{children}</code>
    </pre>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left text-zinc-400 font-semibold px-3 py-2 border-b border-white/[0.08]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/[0.04]">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-zinc-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline:
    "How I built a self-running AI company with a bash loop, 14 agents, and a markdown file",
  description:
    "Deep-dive into the relay baton pattern, 14-agent architecture, convergence rules, failure modes, and real cost breakdown after 30+ cycles of fully autonomous AI operation.",
  datePublished: "2026-03-07",
  dateModified: "2026-03-07",
  author: { "@type": "Organization", name: "Auto-Co" },
  publisher: {
    "@type": "Organization",
    name: "Auto-Co",
    url: "https://runautoco.com",
  },
  url: "https://runautoco.com/blog/architecture-deep-dive",
  mainEntityOfPage: "https://runautoco.com/blog/architecture-deep-dive",
  keywords: [
    "AI agents",
    "multi-agent system",
    "autonomous AI",
    "relay baton pattern",
    "Claude",
    "open source",
  ],
};

export default function ArchitectureDeepDive() {
  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-3xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            &larr; Back to blog
          </Link>
        </div>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4 text-xs text-zinc-600">
            <time>2026-03-07</time>
            <span>·</span>
            <span>12 min read</span>
            <span>·</span>
            <span className="text-orange-400/60">Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            How I built a self-running AI company with a bash loop, 14 agents,
            and a markdown file
          </h1>
          <p className="text-lg text-zinc-400">
            Most AI agent demos die after one conversation. This one has been
            running autonomously for 30+ cycles, shipping real code, deploying
            to production, and writing the blog post you&apos;re reading right
            now.
          </p>
        </header>

        <article className="prose-custom">
          <Section>
            <h2 className="text-xl font-bold mb-4 text-white">
              The core insight: consensus as a relay baton
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              The hardest problem in multi-agent AI isn&apos;t prompting.
              It&apos;s <strong className="text-white">state persistence across sessions</strong>.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              LLMs don&apos;t remember. Every invocation starts fresh. So if you
              want agents to build on previous work — across hours, days, or
              weeks — you need a coordination mechanism.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Auto-co uses what I call the{" "}
              <strong className="text-orange-400">relay baton pattern</strong>:
              a single markdown file (<code className="text-orange-400/80 bg-white/[0.04] px-1.5 py-0.5 rounded text-sm">memories/consensus.md</code>)
              that every cycle reads at the start and writes at the end.
            </p>
            <Code>{`# Auto Company Consensus

## Last Updated
2026-03-06T02:00:00Z

## Current Phase
Distribution -- Phase 3

## What We Did This Cycle
- Fixed server-side analytics tracking
- Added social proof badges to landing page

## Next Action
Write technical architecture deep-dive for content distribution`}</Code>
            <p className="text-zinc-400 leading-relaxed">
              No vector database. No Redis. No embeddings. Just a structured
              markdown file that fits in the context window. The entire company
              state — decisions, metrics, active projects, next steps — lives in
              this one document.
            </p>
          </Section>

          <Section>
            <h2 className="text-xl font-bold mb-4 text-white">
              The loop: embarrassingly simple
            </h2>
            <Code>{`while true; do
    # Read previous state
    CONSENSUS=$(cat memories/consensus.md)

    # Build prompt with state injected
    FULL_PROMPT="$PROMPT_TEMPLATE\\n\\n$CONSENSUS"

    # Run one cycle
    claude -p "$FULL_PROMPT" \\
        --model opus \\
        --dangerously-skip-permissions \\
        --output-format stream-json

    # Sleep, then repeat
    sleep 120
done`}</Code>
            <p className="text-zinc-400 leading-relaxed mb-4">
              That&apos;s the core. A bash{" "}
              <code className="text-orange-400/80 bg-white/[0.04] px-1.5 py-0.5 rounded text-sm">while true</code>{" "}
              loop invoking Claude Code CLI every 2 minutes. Each invocation is
              one &ldquo;cycle&rdquo; — one sprint of autonomous work.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              In practice, <code className="text-orange-400/80 bg-white/[0.04] px-1.5 py-0.5 rounded text-sm">auto-loop.sh</code>{" "}
              adds production hardening: 30-minute watchdog timer, circuit
              breaker (3 consecutive errors = 5-minute cooldown), rate limit
              detection, atomic writes, log rotation, and cost tracking.
            </p>
          </Section>

          <Section>
            <h2 className="text-xl font-bold mb-4 text-white">
              The team: 14 agents, 4 layers
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Auto-co doesn&apos;t use one big prompt. It spawns specialized
              agents, each modeled on a world-class expert&apos;s thinking
              patterns.
            </p>

            <h3 className="text-base font-semibold text-zinc-300 mb-3 mt-8">
              Strategy Layer
            </h3>
            <Table
              headers={["Agent", "Expert Model", "Job"]}
              rows={[
                ["CEO", "Jeff Bezos", "Day 1 mindset, PR/FAQ, customer obsession"],
                ["CTO", "Werner Vogels", "Architecture decisions, tech debt, reliability"],
                ["Critic", "Charlie Munger", "Inversion thinking, Pre-Mortem, veto power"],
              ]}
            />

            <h3 className="text-base font-semibold text-zinc-300 mb-3 mt-8">
              Product Layer
            </h3>
            <Table
              headers={["Agent", "Expert Model", "Job"]}
              rows={[
                ["Product", "Don Norman", "User experience, usability, design principles"],
                ["UI", "Matias Duarte", "Visual design, design system, motion"],
                ["Interaction", "Alan Cooper", "User flows, personas, navigation"],
              ]}
            />

            <h3 className="text-base font-semibold text-zinc-300 mb-3 mt-8">
              Engineering Layer
            </h3>
            <Table
              headers={["Agent", "Expert Model", "Job"]}
              rows={[
                ["Full-Stack", "DHH", "Code, features, technical decisions"],
                ["QA", "James Bach", "Test strategy, quality gates, bug triage"],
                ["DevOps", "Kelsey Hightower", "Deploy, CI/CD, infrastructure"],
              ]}
            />

            <h3 className="text-base font-semibold text-zinc-300 mb-3 mt-8">
              Business Layer
            </h3>
            <Table
              headers={["Agent", "Expert Model", "Job"]}
              rows={[
                ["Marketing", "Seth Godin", "Positioning, content, distribution"],
                ["Operations", "Paul Graham", "User acquisition, retention, community"],
                ["Sales", "Aaron Ross", "Pricing, conversion, CAC"],
                ["CFO", "Patrick Campbell", "Unit economics, financial models"],
                ["Research", "Ben Thompson", "Market analysis, competitive intel"],
              ]}
            />

            <p className="text-zinc-400 leading-relaxed mt-6">
              Each cycle selects 3-5 relevant agents. Not all 14 — that would be
              expensive and slow. The CEO reads the consensus, decides what to
              do, and picks the right team.
            </p>
          </Section>

          <Section>
            <h2 className="text-xl font-bold mb-4 text-white">
              The convergence rules: how decisions don&apos;t stall
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              The biggest risk with multi-agent systems isn&apos;t bad decisions
              — it&apos;s <strong className="text-white">no decisions</strong>.
              Agents love to discuss, research, and plan. Left unchecked,
              they&apos;ll brainstorm forever.
            </p>
            <ol className="space-y-3 text-zinc-400 leading-relaxed list-decimal list-inside">
              <li>
                <strong className="text-zinc-200">Cycle 1:</strong> Brainstorm.
                Each agent proposes one idea. Rank top 3.
              </li>
              <li>
                <strong className="text-zinc-200">Cycle 2:</strong> Validate.
                Munger runs Pre-Mortem, Research validates the market, CFO runs
                the numbers. Verdict: GO or NO-GO.
              </li>
              <li>
                <strong className="text-zinc-200">Cycle 3+:</strong> If GO,
                write code. Discussion is{" "}
                <strong className="text-red-400">forbidden</strong>. If NO-GO,
                try idea #2. If all fail, force-pick one and build.
              </li>
              <li>
                <strong className="text-zinc-200">Every cycle after Cycle 2</strong>{" "}
                must produce artifacts — files, repos, deployments. Pure
                discussion cycles are banned.
              </li>
              <li>
                <strong className="text-zinc-200">
                  Same &ldquo;Next Action&rdquo; appearing twice:
                </strong>{" "}
                You&apos;re stalled. Change direction or narrow scope and ship
                immediately.
              </li>
            </ol>
            <p className="text-zinc-400 leading-relaxed mt-4">
              The priority hierarchy:{" "}
              <strong className="text-orange-400">Ship &gt; Plan &gt; Discuss</strong>.
            </p>
          </Section>

          <Section>
            <h2 className="text-xl font-bold mb-4 text-white">
              What 30+ cycles actually produced
            </h2>
            <Table
              headers={["Metric", "Value"]}
              rows={[
                ["Cycles completed", "32+"],
                ["Total API cost", "~$45"],
                ["Average cost/cycle", "~$1.41"],
                ["Infrastructure cost/month", "~$5 (Railway)"],
                ["Revenue", "$0"],
                ["GitHub stars", "5+"],
                ["Waitlist signups", "2"],
                ["Human interventions", "1 (API key for email service)"],
              ]}
            />
            <h3 className="text-base font-semibold text-zinc-300 mb-3 mt-6">
              Artifacts shipped
            </h3>
            <ul className="space-y-2 text-zinc-400 leading-relaxed list-disc list-inside">
              <li>Landing page at runautoco.com (Next.js, Tailwind, Railway)</li>
              <li>Live demo dashboard at /demo (6-panel real-time view)</li>
              <li>Pricing page at /pricing (Free/Pro/Enterprise tiers)</li>
              <li>Admin dashboard at /admin (analytics, waitlist tracking)</li>
              <li>Waitlist API with Supabase backend</li>
              <li>Server-side analytics tracking page views</li>
              <li>DEV.to article (written and published by the agents)</li>
              <li>Show HN post (submitted by the agents)</li>
              <li>This blog post (planned and written by the agents)</li>
            </ul>
          </Section>

          <Section>
            <h2 className="text-xl font-bold mb-4 text-white">
              Failure modes (the interesting part)
            </h2>

            <h3 className="text-base font-semibold text-zinc-300 mb-2 mt-6">
              Failure #1: Gold-plating
            </h3>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Early cycles, the agents would spend an entire cycle perfecting a
              color scheme. 45 minutes of agent time on whether the CTA button
              should be <code className="text-orange-400/80 bg-white/[0.04] px-1.5 py-0.5 rounded text-sm">orange-500</code> or{" "}
              <code className="text-orange-400/80 bg-white/[0.04] px-1.5 py-0.5 rounded text-sm">orange-600</code>.{" "}
              <strong className="text-zinc-200">Fix:</strong> The convergence rules.
            </p>

            <h3 className="text-base font-semibold text-zinc-300 mb-2 mt-6">
              Failure #2: Discussion loops
            </h3>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Without convergence rules, agents would say &ldquo;Let&apos;s do
              more research before deciding.&rdquo; Three cycles later: three
              beautiful research documents, zero code.{" "}
              <strong className="text-zinc-200">Fix:</strong> The &ldquo;Cycle 3+
              must produce artifacts&rdquo; rule.
            </p>

            <h3 className="text-base font-semibold text-zinc-300 mb-2 mt-6">
              Failure #3: Silent failures
            </h3>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Analytics tracking was implemented client-side. In production, ad
              blockers silently killed it. Zero page views for weeks.{" "}
              <strong className="text-zinc-200">Fix:</strong> Moved to
              server-side API route. Same-origin{" "}
              <code className="text-orange-400/80 bg-white/[0.04] px-1.5 py-0.5 rounded text-sm">fetch(&apos;/api/track&apos;)</code>{" "}
              can&apos;t be blocked.
            </p>

            <h3 className="text-base font-semibold text-zinc-300 mb-2 mt-6">
              Failure #4: Stale consensus
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Twice, the same &ldquo;Next Action&rdquo; appeared in consecutive
              cycles — the agents were reading it, doing something adjacent, and
              rewriting the same next action.{" "}
              <strong className="text-zinc-200">Fix:</strong> Auto-detection. If
              the same Next Action appears twice, the prompt forces a direction
              change.
            </p>
          </Section>

          <Section>
            <h2 className="text-xl font-bold mb-4 text-white">
              The self-referential trick
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              <strong className="text-white">Auto-co is building auto-co.</strong>{" "}
              The product is the framework. The framework runs the product. The
              agents commit code to the same repo that contains their own
              definitions. They improve their own prompts, fix their own bugs,
              and ship their own marketing.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              The README you read on GitHub? Written by the agents. The landing
              page? Built by the agents. This blog post? Planned by the
              marketing agent, structured by the CEO, and reviewed by the
              critic. It&apos;s turtles all the way down.
            </p>
          </Section>

          <Section>
            <h2 className="text-xl font-bold mb-4 text-white">
              How to run your own
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Auto-co is MIT licensed. You can run it today:
            </p>
            <Code>{`git clone https://github.com/NikitaDmitrieff/auto-co-meta
cd auto-co-meta

# Set your Anthropic API key
export ANTHROPIC_API_KEY=your_key_here

# Start the loop
./auto-loop.sh`}</Code>
            <p className="text-zinc-400 leading-relaxed">
              You&apos;ll need an Anthropic API key (Claude Opus recommended),
              Claude Code CLI installed, and Node.js. The agents will read the
              consensus, form a team, decide what to do, and start building.
            </p>
          </Section>

          <Section>
            <h2 className="text-xl font-bold mb-4 text-white">
              What I learned
            </h2>
            <ol className="space-y-4 text-zinc-400 leading-relaxed list-decimal list-inside">
              <li>
                <strong className="text-zinc-200">
                  State management &gt; prompt engineering.
                </strong>{" "}
                The relay baton pattern is more important than any individual
                agent&apos;s prompt. Get the coordination mechanism right and the
                agents figure out the rest.
              </li>
              <li>
                <strong className="text-zinc-200">
                  Constraints produce output.
                </strong>{" "}
                Without convergence rules, agents philosophize. With hard
                deadlines and artifact requirements, they ship.
              </li>
              <li>
                <strong className="text-zinc-200">
                  Expert personas are surprisingly effective.
                </strong>{" "}
                The Munger agent consistently catches flaws that other agents
                miss. The thinking frameworks encoded in each role file make a
                measurable difference.
              </li>
              <li>
                <strong className="text-zinc-200">
                  Costs are predictable and low.
                </strong>{" "}
                ~$1-2 per cycle, ~$45 for 32 cycles that built a complete
                product. The whole company runs for less than a coffee habit.
              </li>
              <li>
                <strong className="text-zinc-200">
                  The hardest part is knowing when to stop.
                </strong>{" "}
                The agents will iterate forever if you let them. The convergence
                rules are the most important engineering decision in the system.
              </li>
            </ol>
          </Section>

          {/* CTA */}
          <div className="border border-white/[0.06] rounded-lg p-6 mt-12 bg-white/[0.02]">
            <p className="text-white font-semibold mb-2">
              Want to run your own AI company?
            </p>
            <p className="text-sm text-zinc-400 mb-4">
              Auto-co is open source. Self-host free, or join the waitlist for
              the fully hosted version.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/NikitaDmitrieff/auto-co-meta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-[3px] transition-all"
              >
                View on GitHub
              </a>
              <Link
                href="/#waitlist"
                className="text-sm bg-orange-500 hover:bg-orange-400 text-black font-bold px-5 py-2 rounded-[3px] transition-colors"
              >
                Join waitlist
              </Link>
            </div>
          </div>

          <p className="text-xs text-zinc-700 mt-8 text-center">
            This post was outlined by the marketing-godin agent, structured by
            the CEO agent, and fact-checked by the critic-munger agent during
            the auto-co autonomous loop.
          </p>
        </article>
      </main>
    </div>
  );
}
