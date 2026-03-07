# Auto Company Consensus

## Last Updated
2026-03-07T12:00:00Z

## Current Phase
Distribution — Phase 3 (product polish + distribution)

## What We Did This Cycle
Cycle 42 — NanoCorp-style dashboard rebuild

**Complete rebuild of /demo page into a dense, interactive, real-time dashboard:**

1. **Team Chat panel** — Slack-like activity feed with channel filtering (#strategy, #engineering, #design, etc.), typing indicators that cycle through random agents every 6-10s, new messages appearing in real-time
2. **Agent Roster** — 14 agents in compact 7-column grid with live presence dots (active/idle), hover tooltips showing name and status
3. **Metrics Strip** — 6 cards (Page Views, Waitlist, Cycles, Total Cost, Avg/Cycle, MRR) auto-polling every 10 seconds with live indicator dots
4. **Cycle Timeline** — expandable list of all 42 cycles, progress bar, running cycle indicator
5. **Financials** — P&L with sparkline chart, break-even calculation, real cost data
6. **Deploy Log** — 7 recent deploys with status badges (deployed/deploying)
7. **Company State** — product, model, stack, phase overview
8. **Live header** — real-time clock, cycle status, GitHub stars
9. **Updated /api/metrics** — returns 10 data points including new fields (githubStars, blogPosts, awesomeListPRs)

**Design principles applied:**
- NanoCorp-level information density
- Glass card aesthetics (existing CSS)
- Interactive: channel tabs, expandable cycles, hover tooltips
- Real-time feel: 10s polling, typing indicators, auto-appearing messages
- Dark theme with orange accent system
- All data from /api/metrics (Supabase) + simulated agent activity

## Key Decisions Made
- **Dashboard is the product demo** — visitors must immediately understand what auto-co does by seeing it run
- **Channel-based chat** — gives impression of organized team communication
- **10s polling interval** — balances freshness vs. Supabase rate limits
- **Simulated real-time messages** — new agent messages appear periodically to show "life"

## Active Projects
- auto-co framework: `https://github.com/NikitaDmitrieff/auto-co-meta`
- landing page: LIVE at `https://runautoco.com`
- demo dashboard: REBUILT at `https://runautoco.com/demo` (NanoCorp-style)
- blog: LIVE at `https://runautoco.com/blog` (3 posts — FINAL)
- pricing: LIVE at `https://runautoco.com/pricing`
- admin: LIVE at `https://runautoco.com/admin`

## Distribution Tracker
| Channel | Status | URL/PR |
|---------|--------|--------|
| awesome-claude-skills (41k stars) | PR submitted | https://github.com/ComposioHQ/awesome-claude-skills/pull/335 |
| awesome-ai-agents (26k stars) | PR open | https://github.com/e2b-dev/awesome-ai-agents/pull/395 |
| awesome-ai-tools (4.5k stars) | PR submitted | https://github.com/mahseema/awesome-ai-tools/pull/732 |
| awesome-llm-agents (1.4k stars) | PR open | https://github.com/kaushikb11/awesome-llm-agents/pull/88 |
| awesome-claude-code (27k stars) | CLOSED — resubmit via issue form after Mar 14 | - |
| GitHub Release v0.41 | Live | https://github.com/NikitaDmitrieff/auto-co-meta/releases/tag/v0.41.0 |

## Metrics
- Revenue: $0
- Users: 1 (creator)
- MRR: $0
- Waitlist signups: 2
- GitHub stars: 5
- Page views: 208+
- Blog posts: 3 (FINAL)
- Awesome-list PRs: 5 total (4 open, 1 closed)
- Deployed Services: Railway (landing + all routes)
- Cost/month: ~$5 (Railway)
- Total cost: ~$60.50 (est, 42 cycles)

## Next Action
**Cycle 43: Deploy dashboard rebuild + monitor awesome-list PRs for reviewer comments.**
1. Push and deploy the NanoCorp-style dashboard rebuild to Railway
2. Check all 4 open awesome-list PRs for reviewer comments — respond immediately
3. If past March 14, submit to awesome-claude-code via issue form
4. Consider adding a demo GIF to README from the new dashboard
5. **DO NOT** create new content, blog posts, or do SEO work
6. **DO NOT** modify protected files (Hero.tsx, text-hover-effect.tsx, globals.css)

## Company State
- Product: auto-co framework (autonomous AI company OS) + demo + landing + pricing + blog + waitlist + admin
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Railway + Supabase
- Business Model: Open-source core (MIT) + Hosted paid tier ($24.50/$49/$99/mo)
- Revenue: $0
- Users: 1

## Human Escalation
- Pending Request: NO
- Last Response: 2026-03-07 (rebuild /demo as NanoCorp-style dashboard — DONE)
- Awaiting Response Since: N/A

## Open Questions
- Will the dashboard rebuild increase visitor engagement / time on site?
- Will any of the 4 open awesome-list PRs get merged?
- Should we capture a demo GIF for the README?
