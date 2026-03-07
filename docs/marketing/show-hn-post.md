# Show HN Post -- auto-co

**Status:** Ready for human submission
**Drafted by:** marketing-godin
**Date:** 2026-03-07
**Numbers current as of:** Cycle 93

---

## Title

```
Show HN: Auto-Co -- Open-source framework that runs an autonomous AI company from a bash loop
```

## URL

```
https://github.com/NikitaDmitrieff/auto-co-meta
```

## Text

```
Auto-Co is a bash script that turns Claude Code into an autonomous AI company. You give it a mission, it assembles a team of 14 AI agents, and they loop 24/7 -- making decisions, writing code, deploying, and shipping real products.

The entire architecture is one bash loop calling Claude Code CLI. No framework, no dependencies, no orchestration layer. State persists across cycles through a single markdown file (memories/consensus.md) that acts as a relay baton -- every cycle reads it, does work, writes it back. No vector DB, no Redis, no embeddings.

This repo is the proof: auto-co is building and maintaining itself. Over 93 autonomous cycles (~$175 total API cost, ~$1.88/cycle), the agents have shipped:

- Next.js landing page, pricing page, blog, admin panel -- all live at runautoco.com
- 38 CLI flags (monitoring, snapshots, daemon mode, webhooks, parallel execution)
- Docker Compose stack, GitHub Actions CI/CD
- Business model and pricing decided by the CEO + CFO agents
- This post was drafted by the marketing agent

The 14 agents are modeled on real experts (Bezos/CEO, DHH/Engineering, Munger/Critic, Godin/Marketing, etc.). Each cycle picks 3-5 relevant agents. Munger has veto power and runs pre-mortems before major decisions.

What I learned:

1. Convergence rules matter more than prompts. Without "every cycle must produce artifacts," agents will strategize forever. We lost 3 early cycles to beautiful planning documents with zero code.

2. The relay baton pattern (single markdown file for all state) works better than complex memory systems. It's debuggable, atomic, and fits in the context window. Zero state corruption in 93 cycles.

3. Safety guardrails need to be absolute. No force push to main, no repo deletion, no DB resets, no credential leaks -- hard-coded, non-negotiable.

4. Cost is surprisingly low. ~$1.88/cycle, $5/mo infrastructure on Railway.

Infrastructure: $5/mo (Railway). Revenue: $0. Being honest about it.

Demo video (4 auto-co instances running in parallel): https://youtu.be/1zJca_zFzys
Live landing page: https://runautoco.com
GitHub (MIT): https://github.com/NikitaDmitrieff/auto-co-meta
```

---

## Posting Notes

- **Best timing:** Tuesday-Thursday, 8-11am EST
- **URL field:** Use GitHub repo (HN prefers repos over landing pages for Show HN)
- **Text field:** Paste the body above
- **Engage fast:** First 30 minutes of comments matter most for ranking
- **Expected pushback and honest answers:**
  - "This is just Claude Code with a bash loop" -- Yes. That is the point. The interesting part is what happens when you add convergence rules, safety guardrails, and let it run for 93 cycles.
  - "Revenue is $0" -- Correct. The product works. Distribution is the current problem, not the product.
  - "$175 is cheap but what does it actually produce?" -- Point to the repo history, the live site, and the demo video. Every commit after cycle 1 was autonomous.
  - "Why not LangGraph/CrewAI/AutoGen?" -- Those are libraries for building agent workflows. Auto-co is a running company. Clone, add API key, make start. The opinionated structure is the value.
