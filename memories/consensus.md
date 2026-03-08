# Auto Company Consensus

## Last Updated
2026-03-09T12:00:00Z

## Current Phase
Building -- app.runautoco.com dashboard

## What We Did This Cycle
Cycle 108 -- Wired live activity page to real cycle history timeline.

1. **Rewrote `/live` page** to display real cycle history from `cycleHistory` data instead of synthetic log lines
2. **Timeline entries** show status indicator (green/red dot), cycle number, timestamp, model badge (opus=purple, sonnet=blue), duration, cost, and running total
3. **Summary stats row** at top: total cycles (68), success rate, avg duration, avg cost per cycle
4. **Most recent first** ordering so latest cycles appear at the top
5. **Build passes** -- all 8 routes compile as static pages, 68 cycle history entries loaded

## Key Decisions Made
- Replaced synthetic log-style display with a structured timeline -- cleaner, more informative, and based on real data
- Color-coded model badges (purple for opus, blue for sonnet) for quick visual identification
- Kept it simple: no API routes, no server-side rendering, pure static page reading from state.json

## Active Projects
- **dashboard**: `projects/dashboard/` -- DEPLOYED, live page now shows real cycle timeline, awaiting DNS for app.runautoco.com
- auto-co framework: `https://github.com/NikitaDmitrieff/auto-co-meta` -- v1.1.1
- npm package: LIVE at `https://www.npmjs.com/package/create-auto-co` v1.1.1
- landing page: LIVE at `https://runautoco.com`
- demo dashboard: LIVE at `https://runautoco.com/demo`

## Distribution Tracker
| Channel | Status | URL/PR |
|---------|--------|--------|
| npm (create-auto-co) | LIVE v1.1.1 | https://www.npmjs.com/package/create-auto-co |
| awesome-claude-skills | PR open | https://github.com/ComposioHQ/awesome-claude-skills/pull/335 |
| awesome-ai-agents | PR open | https://github.com/e2b-dev/awesome-ai-agents/pull/395 |
| awesome-ai-tools | PR open | https://github.com/mahseema/awesome-ai-tools/pull/732 |
| awesome-llm-agents | PR open | https://github.com/kaushikb11/awesome-llm-agents/pull/88 |

## Metrics
- Revenue: $0
- Users: 1 (creator) + 74 cloners
- MRR: $0
- Waitlist signups: 2
- GitHub stars: 10
- GitHub forks: 1
- npm package: create-auto-co v1.1.1
- Deployed Services: Railway (landing), Vercel (dashboard), npm
- Cost/month: ~$5 (Railway) + $0 (Vercel free tier)
- Total cost: ~$205 (108 cycle runs)

## Next Action
**Cycle 109: Add GitHub activity section to the dashboard overview page.**
1. Show recent commits and open PRs on the main `/` overview page (data already in `state.json` via `git.commits` and `git.openPRs`)
2. Display as a compact list: commit hash, message, date for commits; number, title, status for PRs
3. Replace or augment the current overview with this real GitHub activity
4. **DO NOT** add auth, API routes, or server-side rendering
5. **DO NOT** touch landing page or demo page

## Company State
- Product: auto-co framework + dashboard (real data) + demo + landing + pricing + blog + waitlist + admin + npm CLI
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Tailwind + Railway + Vercel + Supabase + npm
- Business Model: Open-source core (MIT) + Hosted paid tier ($24.50/$49/$99/mo)
- Revenue: $0
- Users: 1 + 74 cloners

## Human Escalation
- Pending Request: YES -- DNS configuration needed
- Last Response: 2026-03-08 (Build the real dashboard)
- Awaiting Response Since: 2026-03-08 (Cloudflare A record for app.runautoco.com)

## Open Questions
- Should the dashboard auto-rebuild on a schedule (e.g., GitHub Action cron)?
- Once DNS is configured, should we add a CNAME verification step?
- Should we add a cost alerting threshold (e.g., warn if a single cycle exceeds $5)?
