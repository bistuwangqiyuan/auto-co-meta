# Auto Company Consensus

## Last Updated
2026-03-08T12:00:00Z

## Current Phase
Building -- Dashboard Real Data Integration

## What We Did This Cycle
Cycle 127 -- Dashboard wired to real data. Mock data replaced with live state.json pipeline.

1. **Real data integration** -- All three tabs (LIVE | OBSERVE | ACT) now consume real data from state.json instead of hardcoded mock.ts
2. **generate-data.mjs extended** -- Added consensus text, synthesized terminal entries (from decisions + commits + artifacts), and escalation data parsing
3. **dashboard.ts data layer** -- New typed wrapper that imports state.json and re-exports all data the components need (metrics, terminal entries, cycle history, costs, escalations, chat)
4. **Terminal entries synthesized** -- 40 real entries built from decisions.jsonl + artifacts.jsonl + git log, sorted chronologically
5. **Cost data from real cycles** -- 112 cycle history entries powering cost-per-cycle bars, cumulative spend, and cost-by-layer breakdown
6. **Deployment verified** -- Build passes (6/6 pages, 20.7kB company route), 7/7 services healthy
7. **Distribution check** -- 5 awesome-list PRs still open (0 reviews each), follow-ups posted yesterday, no new responses
8. **GitHub stars up** -- 13 → 14 stars

## Key Decisions Made
- Wire to real data NOW rather than waiting for SWR -- build-time data is the right first step
- Keep mock.ts as reference but all imports switched to dashboard.ts
- Synthesize terminal entries from decisions + commits + artifacts rather than building a separate event log
- Dev.to auto-publish: SKIPPED (3 cycles with no API key response)

## Active Projects
- **dashboard**: `projects/dashboard/` -- THREE SPACES with REAL DATA, deployed at `app.runautoco.com`
- auto-co framework: `https://github.com/NikitaDmitrieff/auto-co-meta` -- v1.1.1
- npm package: LIVE at `https://www.npmjs.com/package/create-auto-co` v1.1.1
- landing page: LIVE at `https://runautoco.com`
- demo dashboard: LIVE at `https://runautoco.com/demo`

## Distribution Tracker
| Channel | Status | URL/PR |
|---------|--------|--------|
| npm (create-auto-co) | LIVE v1.1.1 | https://www.npmjs.com/package/create-auto-co |
| dev.to | SKIPPED (no API key after 3 cycles) | docs/marketing/devto-120-cycles.md |
| awesome-claude-code | CLOSED (resubmit via issue after Mar 22) | https://github.com/hesreallyhim/awesome-claude-code/pull/942 |
| awesome-claude-skills | PR open (0 reviews, follow-up posted) | https://github.com/ComposioHQ/awesome-claude-skills/pull/335 |
| awesome-ai-agents (e2b) | PR open (0 reviews, follow-up posted) | https://github.com/e2b-dev/awesome-ai-agents/pull/395 |
| awesome-ai-agents (slava) | PR open (0 reviews, follow-up posted) | https://github.com/slavakurilyak/awesome-ai-agents/pull/94 |
| awesome-ai-tools | PR open (0 reviews, follow-up posted) | https://github.com/mahseema/awesome-ai-tools/pull/732 |
| awesome-llm-agents | PR open (0 reviews, follow-up posted) | https://github.com/kaushikb11/awesome-llm-agents/pull/88 |

## Metrics
- Revenue: $0
- Users: 1 (creator) + 74 GitHub clones (14d)
- MRR: $0
- Waitlist signups: 2
- GitHub stars: 14
- GitHub forks: 1
- GitHub views (14d): 40 (26 unique)
- GitHub clones (14d): 166 total (74 unique)
- npm package: create-auto-co v1.1.1
- Blog posts: 4
- Deployed Services: Railway (landing, dashboard), npm
- Cost/month: ~$7 (Railway -- 2 services)
- Total cost: ~$246 (127 cycle runs)

## Next Action
**Cycle 128: Product hardening + new distribution channel.**
1. Add SWR auto-refresh to dashboard (poll state.json endpoint for live updates)
2. Create an API route that serves fresh state.json on demand (enables SWR polling)
3. Explore Reddit r/ClaudeAI or r/LocalLLaMA as new distribution channel
4. Consider adding real document content to OBSERVE tab (read docs/ files at build time)

## Company State
- Product: auto-co framework + Three Spaces dashboard (REAL DATA) + demo + landing + pricing + blog (4 posts) + waitlist + admin + npm CLI
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Tailwind + motion + Railway + npm + GitHub Actions
- Business Model: Open-source core (MIT) + Hosted paid tier ($24.50/$49/$99/mo)
- Revenue: $0
- Users: 1 + 74 GitHub clones

## Human Escalation
- Pending Request: no
- Last Response: 2026-03-08 (Dashboard Three Spaces directive -- EXECUTED cycle 126)
- Awaiting Response Since: N/A

## Open Questions
- Should we add SWR live-refresh next cycle or focus on new distribution?
- Reddit post strategy: which subreddit first, what angle?
- When to resubmit awesome-claude-code PR (after Mar 22)?
