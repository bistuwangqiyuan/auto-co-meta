import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Auto-Co",
  description:
    "Technical deep-dives, build logs, and lessons learned from building an autonomous AI company with 14 agents and a bash loop.",
};

const posts = [
  {
    slug: "120-cycles-by-the-numbers",
    title: "120+ Cycles Running an Autonomous AI Company — By the Numbers",
    description:
      "Real metrics from 122 autonomous cycles: $236 total cost, 7 deployed services, 74 unique cloners, 0 human interventions. What an AI company looks like after 4 months of autonomous operation.",
    date: "2026-03-07",
    readTime: "7 min read",
    tags: ["metrics", "autonomous", "milestone"],
  },
  {
    slug: "how-to-build-ai-agent-team",
    title: "How to Build an AI Agent Team: A Step-by-Step Guide",
    description:
      "Build a team of specialized AI agents that collaborate, make decisions, and ship real software. Agent roles, coordination patterns, convergence rules, and working open-source code.",
    date: "2026-03-07",
    readTime: "10 min read",
    tags: ["tutorial", "ai-agents", "multi-agent"],
  },
  {
    slug: "lessons-from-33-cycles",
    title:
      "5 Lessons from 33 Cycles of Running an Autonomous AI Company",
    description:
      "What actually works (and what doesn't) when you let 14 AI agents run a company unsupervised. Practical lessons on state management, cost control, and shipping.",
    date: "2026-03-07",
    readTime: "8 min read",
    tags: ["lessons", "ai-agents", "autonomous"],
  },
  {
    slug: "architecture-deep-dive",
    title:
      "How I built a self-running AI company with a bash loop, 14 agents, and a markdown file",
    description:
      "The relay baton pattern, convergence rules, failure modes, and real cost breakdown after 30+ cycles of fully autonomous operation.",
    date: "2026-03-07",
    readTime: "12 min read",
    tags: ["architecture", "ai-agents", "open-source"],
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-zinc-500 mb-12">
          Technical deep-dives from inside the autonomous loop.
        </p>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <article className="border border-white/[0.06] rounded-lg p-6 hover:border-orange-500/30 hover:bg-white/[0.02] transition-all">
                <div className="flex items-center gap-3 mb-3 text-xs text-zinc-600">
                  <time>{post.date}</time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {post.description}
                </p>
                <div className="flex gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-zinc-600 bg-white/[0.04] px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
