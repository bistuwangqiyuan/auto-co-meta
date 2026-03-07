# I let AI agents run a company for 96 cycles. Total cost: $181.

I'm a solo dev. A few weeks ago I built a framework that lets a team of 14 AI agents operate as an autonomous company -- making decisions, writing code, deploying to production, and iterating on their own product. Then I stepped back and let it run.

96 autonomous cycles later, here's what happened.

## What it built (without me)

- A full landing page with pricing, blog, demo dashboard, and waitlist
- Deployed to Railway ($5/month)
- A CLI with 38 flags for monitoring, health checks, and cycle management
- Its own marketing content (including the DEV.to tutorial about how to build it)
- Submitted itself to 5 awesome-lists on GitHub

I didn't write most of this. I set the direction, defined the agent personas, and occasionally answered escalation questions via Telegram. The agents handled everything else.

## The real numbers

| Metric | Value |
|--------|-------|
| Total cycles | 96 |
| Total cost (API + infra) | ~$181 |
| Cost per cycle | ~$1.88 |
| Monthly infra | $5 (Railway) |
| Revenue | $0 |
| GitHub stars | 5 |
| Waitlist signups | 2 |
| Time to first deploy | Cycle 3 |

Yes, revenue is zero. I'm being transparent about that. The product is the framework itself -- it's MIT licensed and free to self-host. The paid tier (managed hosting) hasn't launched yet.

## How it works

The architecture is almost embarrassingly simple:

1. A bash loop reads a shared state file (consensus.md)
2. A decision-maker agent reads the state and picks 3-5 specialist agents for the task
3. The specialists execute (write code, deploy, write content, whatever is needed)
4. They update the state file with what they did and what's next
5. Sleep 2 minutes, repeat

Each agent is modeled on a real expert's thinking patterns -- not just a job title. The "CTO" thinks like Werner Vogels (design for failure). The "Critic" thinks like Charlie Munger (inversion, find what would guarantee failure). The "CEO" thinks like Bezos (work backwards from the customer).

The coordination mechanism is a single markdown file. No vector database, no complex orchestration framework. Just a text file that fits in the context window.

## What I learned

**Convergence rules matter more than agent quality.** Without hard constraints ("after cycle 2, you must produce artifacts, not plans"), agents will research and discuss forever. Beautiful documents, zero code. Adding a rule that says "ship > plan > discuss" changed everything.

**The relay baton pattern works.** One file, read at the start, written at the end. Every cycle picks up exactly where the last one left off. No embeddings, no RAG, no database.

**Costs stay low if you limit team size per cycle.** 14 agents available, but most cycles only need 2-3. A deployment needs DevOps + QA. A blog post needs Marketing + Builder. Selecting the right subset keeps each cycle under $2.

**Solo dev + AI agents is a real multiplier.** I could not have built all of this -- landing page, pricing, blog, CLI, demo, monitoring -- in the same timeframe by myself. The agents don't get tired, don't context-switch, and don't procrastinate.

## The honest downsides

- Agents gold-plate. They'll spend a whole cycle perfecting a button color if you let them.
- They get stuck in discussion loops without convergence rules.
- Quality is uneven. Some cycles produce great work, others produce nothing useful.
- You still need a human setting direction. Fully autonomous doesn't mean fully unsupervised.
- $181 for what's essentially a side project is cheap, but it's not free.

## Try it yourself

The whole thing is MIT licensed:

```
npx create-auto-co init my-company
cd my-company
export ANTHROPIC_API_KEY=your_key_here
./auto-loop.sh
```

Or clone the repo directly: `git clone https://github.com/NikitaDmitrieff/auto-co-meta`

You need Claude Code CLI, an Anthropic API key, Node.js, and git. Within 3 cycles your agent team will have brainstormed an idea, validated it, and started building.

Demo video: https://youtu.be/1zJca_zFzys
GitHub: https://github.com/NikitaDmitrieff/auto-co-meta
Live site: https://runautoco.com

Happy to answer questions about the architecture, costs, or failure modes. This is a real experiment with real numbers -- nothing inflated.
