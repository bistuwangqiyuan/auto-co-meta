# Reddit Distribution — auto-co Cycle 25

**Status:** Ready to post
**Drafted by:** marketing-godin + operations-pg
**Cycle:** 25
**Priority:** Secondary to HN/IH — post after HN goes live

---

## Target Subreddits (ranked by fit)

| Subreddit | Members | Why | Best post type |
|-----------|---------|-----|----------------|
| r/SideProject | 190k | Indie builders, honest P&L stories land well | Text with demo link |
| r/MachineLearning | 3M | Technical audience, loves novel architectures | Technical text post |
| r/selfhosted | 400k | DIY ethos, bash loop is a plus | Text with GitHub link |
| r/artificial | 1.2M | Broad AI audience | Text/link post |
| r/LLMDevs | 50k | LLM developer community, direct fit | Technical text post |

---

## Post 1 — r/SideProject

**Title:**
```
I let 14 AI agents run my startup for 24 cycles — $37.60 total cost, $0 revenue. Here's the honest P&L.
```

**Body:**
```
I've been building auto-co: a bash loop + Claude CLI that runs a 14-agent AI company autonomously.

24 cycles later:
- **Revenue:** $0 (not spinning it)
- **Total AI cost:** $37.60 (~$1.57/cycle)
- **Human interventions:** ~6 (credentials, direction, UI feedback)
- **Products shipped:** landing page, demo dashboard, DEV.to article, waitlist

The whole architecture is one bash loop:

```bash
while true; do
  claude -p "$PROMPT" --dangerously-skip-permissions
  sleep 120
done
```

14 agents (Jeff Bezos as CEO, DHH as engineering, Seth Godin as marketing, Charlie Munger as critic). They share a `memories/consensus.md` relay baton — a markdown file that keeps the company coherent across unlimited autonomous cycles.

The Munger rule: before any major decision, Munger runs a Pre-Mortem. He can veto, never delay.

**Links:**
- Landing: https://runautoco.com
- Demo dashboard: https://runautoco.com/demo
- GitHub (MIT): https://github.com/NikitaDmitrieff/auto-co-meta

Would love feedback — especially on pricing ($49/mo hosted tier math) and whether the "14 experts" framing resonates or feels gimmicky.
```

---

## Post 2 — r/MachineLearning

**Title:**
```
[Project] Auto-co: bash loop + Claude CLI running a 14-agent autonomous AI company — 24 cycles, $37.60 total, architecture notes
```

**Body:**
```
I've been running an experiment: can a bash loop + LLM CLI sustain autonomous company operations indefinitely?

**Architecture:**
- Single bash loop: `claude -p "$PROMPT" --dangerously-skip-permissions && sleep 120`
- 14 specialized agents, each with an expert persona (Bezos/CEO, DHH/Engineering, Munger/Critic, etc.)
- Shared state via `memories/consensus.md` — a markdown relay baton updated atomically each cycle
- No vector database, no Redis, no embeddings — the full context fits in Claude's window every time

**The relay baton pattern:**
Each cycle MUST: (1) read previous consensus, (2) do real work, (3) write updated consensus before ending. This is what keeps the company coherent across unlimited cycles without any external memory system.

**24 cycles of results:**
- Next.js landing page deployed to Railway
- Live demo dashboard with 6 panels (runautoco.com/demo)
- Waitlist email capture (Supabase)
- DEV.to article written and published by the agents themselves
- Custom domain runautoco.com

**Cost:** $37.60 total (~$1.57/cycle average, declining as prompts optimize)

**Interesting failure modes:**
- Cycle 6: loop ran same "Next Action" twice → added convergence detection rules
- Cycle 9: agents produced only strategy docs, zero code → added explicit "no pure discussion cycles" constraint
- Agents will gold-plate indefinitely if you don't force convergence deadlines

Open source (MIT): https://github.com/NikitaDmitrieff/auto-co-meta

Happy to discuss the architecture — especially the relay baton pattern vs alternatives.
```

---

## Post 3 — r/selfhosted

**Title:**
```
I built an autonomous AI company that runs on a bash loop — self-hostable, MIT licensed
```

**Body:**
```
auto-co is a self-hostable bash loop that runs a 14-agent AI company autonomously.

Setup:
```bash
git clone https://github.com/NikitaDmitrieff/auto-co-meta
cd auto-co-meta
cp .env.example .env  # add your Anthropic API key
./auto-loop.sh
```

That's it. No Docker (yet). No cloud dependencies except Anthropic API.

What it does autonomously:
- Strategy decisions (CEO/critic agents)
- Code generation and deployment
- Marketing content creation
- Financial modeling

After 24 cycles self-running: landing page live, demo dashboard, DEV.to article published, $37.60 total API cost.

MIT licensed. You own the loop, you own the data, you pay your own API costs.

GitHub: https://github.com/NikitaDmitrieff/auto-co-meta
Demo: https://runautoco.com/demo
```

---

## Posting Strategy

**Order:**
1. r/SideProject first (most accessible, drives waitlist)
2. r/LLMDevs (technical, engaged)
3. r/MachineLearning (slower, but high visibility if upvoted)
4. r/selfhosted (niche but very sticky audience)
5. r/artificial (broad, lower conversion)

**Timing:**
- Post all within 24h of HN submission going live
- Link to HN thread in each Reddit post ("also discussing on HN: [link]")
- Engage with all comments within 2 hours

**Cross-promotion:**
- After HN post goes live, add HN link to Reddit posts
- After Reddit posts, link back in IH milestones section

**What to watch:**
- r/SideProject posts can drive 20-50 waitlist signups if story resonates
- r/MachineLearning comments will be technical — DHH/CTO agents should draft responses
- Keep tone honest: $0 revenue, no BS, the transparent P&L is the hook
