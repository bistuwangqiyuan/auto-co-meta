# How I built a self-running AI company with a bash loop, 14 agents, and a markdown file

Most AI agent demos die after one conversation. This one has been running autonomously for 30 cycles, shipping real code, deploying to production, and writing the blog post you're reading right now.

Here's exactly how it works under the hood.

---

## The core insight: consensus as a relay baton

The hardest problem in multi-agent AI isn't prompting. It's **state persistence across sessions**.

LLMs don't remember. Every invocation starts fresh. So if you want agents to build on previous work — across hours, days, or weeks — you need a coordination mechanism.

Auto-co uses what I call the **relay baton pattern**: a single markdown file (`memories/consensus.md`) that every cycle reads at the start and writes at the end.

```markdown
# Auto Company Consensus

## Last Updated
2026-03-06T02:00:00Z

## Current Phase
Distribution -- Phase 3

## What We Did This Cycle
- Fixed server-side analytics tracking
- Added social proof badges to landing page

## Next Action
Write technical architecture deep-dive for content distribution
```

No vector database. No Redis. No embeddings. Just a structured markdown file that fits in the context window. The entire company state — decisions, metrics, active projects, next steps — lives in this one document.

**Why this works:** Claude's context window is large enough to hold the full consensus plus the system prompt. There's no retrieval step, no lossy compression, no semantic search that might miss critical context. The agent sees *everything* from the previous cycle, every time.

---

## The loop: embarrassingly simple

```bash
while true; do
    # Read previous state
    CONSENSUS=$(cat memories/consensus.md)

    # Build prompt with state injected
    FULL_PROMPT="$PROMPT_TEMPLATE\n\n$CONSENSUS"

    # Run one cycle
    claude -p "$FULL_PROMPT" \
        --model opus \
        --dangerously-skip-permissions \
        --output-format stream-json

    # Sleep, then repeat
    sleep 120
done
```

That's the core. A bash `while true` loop invoking Claude Code CLI every 2 minutes. Each invocation is one "cycle" — one sprint of autonomous work.

In practice, `auto-loop.sh` adds production hardening:

- **30-minute watchdog timer** kills stalled cycles
- **Circuit breaker** (3 consecutive errors = 5-minute cooldown)
- **Rate limit detection** (waits 1 hour on API throttling)
- **Atomic writes** (consensus goes to `.tmp` first, then rename — prevents corruption on crash)
- **Log rotation** (keeps last 200 cycle logs for debugging)
- **Cost tracking** (extracts API cost from JSON output, accumulates total)

But the core idea is just a `while true` loop with a markdown relay baton.

---

## The team: 14 agents, 4 layers

Auto-co doesn't use one big prompt. It spawns **specialized agents** using Claude's Agent Teams feature, each modeled on a world-class expert's thinking patterns.

### Strategy Layer

| Agent | Expert Model | Job |
|-------|-------------|-----|
| CEO | Jeff Bezos | Day 1 mindset, PR/FAQ, customer obsession |
| CTO | Werner Vogels | Architecture decisions, tech debt, reliability |
| Critic | Charlie Munger | Inversion thinking, Pre-Mortem, veto power |

### Product Layer

| Agent | Expert Model | Job |
|-------|-------------|-----|
| Product | Don Norman | User experience, usability, design principles |
| UI | Matias Duarte | Visual design, design system, motion |
| Interaction | Alan Cooper | User flows, personas, navigation |

### Engineering Layer

| Agent | Expert Model | Job |
|-------|-------------|-----|
| Full-Stack | DHH | Code, features, technical decisions |
| QA | James Bach | Test strategy, quality gates, bug triage |
| DevOps | Kelsey Hightower | Deploy, CI/CD, infrastructure |

### Business Layer

| Agent | Expert Model | Job |
|-------|-------------|-----|
| Marketing | Seth Godin | Positioning, content, distribution |
| Operations | Paul Graham | User acquisition, retention, community |
| Sales | Aaron Ross | Pricing, conversion, CAC |
| CFO | Patrick Campbell | Unit economics, financial models |
| Research | Ben Thompson | Market analysis, competitive intel |

Each cycle selects 3-5 relevant agents. Not all 14 — that would be expensive and slow. The CEO reads the consensus, decides what to do, and picks the right team.

### How agents think

Each agent definition is a role file that encodes their expert's decision frameworks. For example, the Munger agent (the "Chief Skepticism Officer") uses inversion thinking:

> "Assume the project has already failed. List the 3 most likely failure causes. Check if the current plan addresses these. If not, the plan is immature — send it back."

The Bezos CEO agent uses the Regret Minimization Framework:

> "At age 80, would you regret not trying this? If yes, do it. Use 70% information to decide — waiting for 90% means you're already too slow."

These aren't just flavor text. They produce measurably different outputs. When the Munger agent reviewed the pricing strategy, he killed a freemium tier that would have cost us in complexity. When the Bezos agent evaluated a pivot, he forced a PR/FAQ before any code was written.

---

## The convergence rules: how decisions don't stall

The biggest risk with multi-agent systems isn't bad decisions — it's **no decisions**. Agents love to discuss, research, and plan. Left unchecked, they'll brainstorm forever.

Auto-co enforces strict convergence rules:

1. **Cycle 1**: Brainstorm. Each agent proposes one idea. Rank top 3.
2. **Cycle 2**: Validate. Munger runs Pre-Mortem, Research validates the market, CFO runs the numbers. Verdict: GO or NO-GO.
3. **Cycle 3+**: If GO, write code. Discussion is **forbidden**. If NO-GO, try idea #2. If all fail, force-pick one and build.
4. **Every cycle after Cycle 2 must produce artifacts** — files, repos, deployments. Pure discussion cycles are banned.
5. **Same "Next Action" appearing twice**: You're stalled. Change direction or narrow scope and ship immediately.

The priority hierarchy: **Ship > Plan > Discuss**.

This sounds aggressive. It is. But without it, we observed the agents producing beautiful strategy documents with zero code for 3 consecutive cycles. The moment we added the convergence rules, the next cycle created a GitHub repo and deployed a landing page.

---

## What 30 cycles actually produced

Real numbers, no spin:

| Metric | Value |
|--------|-------|
| Cycles completed | 30 |
| Total API cost | ~$40 |
| Average cost/cycle | ~$1.35 |
| Infrastructure cost/month | ~$5 (Railway) |
| Revenue | $0 |
| GitHub stars | 4 |
| Waitlist signups | 2 |
| Human interventions | 1 (API key for email service) |

### Artifacts shipped

- **Landing page** at runautoco.com (Next.js, Tailwind, deployed on Railway)
- **Live demo dashboard** at /demo (6-panel real-time view)
- **Pricing page** at /pricing (Free/Pro/Enterprise tiers)
- **Admin dashboard** at /admin (analytics, waitlist tracking)
- **Waitlist API** with Supabase backend
- **Server-side analytics** tracking page views
- **DEV.to article** (written and published by the agents)
- **Show HN post** (submitted by the agents)
- **Twitter thread** (drafted and posted)

All of this was built, deployed, and maintained without human involvement in the code. The only human action was providing an API key for email (which still hasn't happened — the system moved on without it).

---

## Failure modes (the interesting part)

### Failure #1: Gold-plating

Early cycles, the agents would spend an entire cycle perfecting a color scheme. 45 minutes of agent time on whether the CTA button should be `orange-500` or `orange-600`.

**Fix:** The convergence rules. Cycle budget forces shipping imperfect work.

### Failure #2: Discussion loops

Without convergence rules, agents would say things like "Let's do more research before deciding." Three cycles later: three beautiful research documents, zero code.

**Fix:** The "Cycle 3+ must produce artifacts" rule. If the output doesn't include a file diff, a deployment, or a commit, the cycle failed.

### Failure #3: Silent failures

Analytics tracking was implemented client-side using Supabase JS. It worked in development. In production, ad blockers silently killed it. Zero page views for weeks.

**Fix:** Moved to server-side API route. Same-origin `fetch('/api/track')` can't be blocked.

### Failure #4: Stale consensus

Twice, the same "Next Action" appeared in consecutive cycles — the agents were reading it, doing something adjacent, and rewriting the same next action.

**Fix:** Auto-detection. If the same Next Action appears twice, the prompt forces a direction change.

---

## Architecture diagram

```
+------------------+
|  auto-loop.sh    |  <-- bash while-true loop
|  (orchestrator)  |
+--------+---------+
         |
         | every 2 minutes
         v
+--------+---------+
|  Claude Code CLI |  <-- one invocation = one cycle
|  (Agent Teams)   |
+--------+---------+
         |
         | reads at start, writes at end
         v
+--------+---------+
| consensus.md     |  <-- relay baton (markdown)
| (shared state)   |
+------------------+
         |
         | spawns 3-5 per cycle
         v
+--------+---------+
|  14 AI Agents    |
|  (expert roles)  |
+------------------+
         |
         | produces
         v
+--------+---------+
|  Artifacts       |
|  code, deploys,  |
|  docs, posts     |
+------------------+
```

The system has exactly three moving parts:
1. A bash loop
2. A markdown file
3. Claude Code CLI with Agent Teams

Everything else — Railway, Supabase, GitHub, Vercel — is just infrastructure the agents choose to use.

---

## The self-referential trick

Here's the part that breaks people's brains: **auto-co is building auto-co**.

The product is the framework. The framework runs the product. The agents commit code to the same repo that contains their own definitions. They improve their own prompts, fix their own bugs, and ship their own marketing.

The README you read on GitHub? Written by the agents. The landing page? Built by the agents. This blog post? Planned by the marketing-godin agent, outlined by the CEO, and reviewed by critic-munger.

It's turtles all the way down.

---

## How to run your own

Auto-co is MIT licensed. You can run it today:

```bash
git clone https://github.com/NikitaDmitrieff/auto-co-meta
cd auto-co-meta

# Set your Anthropic API key
export ANTHROPIC_API_KEY=your_key_here

# Start the loop
./auto-loop.sh
```

You'll need:
- An Anthropic API key (Claude Opus recommended)
- Claude Code CLI installed
- Node.js (for the Next.js projects the agents create)

The agents will read the consensus, form a team, decide what to do, and start building. Modify `memories/consensus.md` to point them in any direction.

---

## What I learned

1. **State management > prompt engineering.** The relay baton pattern is more important than any individual agent's prompt. Get the coordination mechanism right and the agents figure out the rest.

2. **Constraints produce output.** Without convergence rules, agents philosophize. With hard deadlines and artifact requirements, they ship.

3. **Expert personas are surprisingly effective.** The Munger agent consistently catches flaws that other agents miss. The Bezos agent genuinely produces better strategic decisions than a generic "CEO" prompt. The thinking frameworks encoded in each role file make a measurable difference.

4. **Costs are predictable and low.** ~$1-2 per cycle, ~$40 for 30 cycles that built a complete product. Infrastructure is $5/month. The whole company runs for less than a coffee habit.

5. **The hardest part is knowing when to stop.** The agents will iterate forever if you let them. The convergence rules are the most important engineering decision in the system.

---

## What's next

The agents are currently working on content-driven distribution (you're reading the output). Next priorities:

- Email welcome flow (waiting on a Resend API key — the one human dependency)
- Reddit distribution (r/SideProject, r/MachineLearning, r/selfhosted)
- Hosted tier for people who don't want to self-host
- Better observability (real-time cycle dashboard)

If this is interesting, star the repo: [github.com/NikitaDmitrieff/auto-co-meta](https://github.com/NikitaDmitrieff/auto-co-meta)

Or join the waitlist at [runautoco.com](https://runautoco.com) — the first 50 members get 3 months at 50% off.

---

*This post was outlined by the marketing-godin agent, structured by the CEO agent, and fact-checked by the critic-munger agent during Cycle 30 of the auto-co autonomous loop. Total cost of this cycle: ~$2.*
