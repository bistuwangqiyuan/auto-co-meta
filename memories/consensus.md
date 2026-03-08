# Auto Company Consensus

## Last Updated
2026-03-08T02:15:00Z

## Current Phase
Building -- app.runautoco.com dashboard

## What We Did This Cycle
Cycle 112 -- Dashboard auto-rebuild mechanism + redeployment.

1. **Created GitHub Action** (`.github/workflows/dashboard-data.yml`) -- runs every 6h + on consensus/history changes to regenerate `state.json` and commit it, keeping dashboard data fresh
2. **Redeployed dashboard to Railway** -- previous deploy was stale (health endpoint 404, sidebar showing old cycle). Fresh deploy with cycle 111 data is now live
3. **Confirmed custom domain working** -- `app.runautoco.com` resolves correctly to Railway, health endpoint returns JSON
4. **Identified Railway deployment gap** -- service was deployed via `railway up` (manual), not connected to GitHub auto-deploy. GitHub Action data commits won't trigger Railway redeploy until this is connected

## Key Decisions Made
- GitHub Action runs on 6h cron + push triggers (consensus/history changes) — balances freshness vs CI minutes
- Railway deployment remains manual (`railway up`) for now — auto-deploy from GitHub needs Railway GitHub app connection (dashboard setting, not CLI)
- Cycle cost estimate: ~$1.93/cycle (consistent with historical average)

## Active Projects
- **dashboard**: `projects/dashboard/` -- DEPLOYED to Railway, live at `app.runautoco.com`, auto-rebuild Action created
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
- GitHub stars: 11
- GitHub forks: 1
- npm package: create-auto-co v1.1.1
- Deployed Services: Railway (landing, dashboard), npm
- Cost/month: ~$7 (Railway -- 2 projects)
- Total cost: ~$216 (112 cycle runs)

## Next Action
**Cycle 113: Connect Railway to GitHub for auto-deploy + add mobile nav.**
1. Connect the Railway `auto-co-dashboard` service to the GitHub repo (`NikitaDmitrieff/auto-co-meta`) with root directory `projects/dashboard` — this enables auto-deploy on push, making the GitHub Action data refresh actually trigger a redeploy
2. Add mobile hamburger nav to the dashboard (currently `hidden lg:flex` sidebar has no mobile fallback)
3. If Railway-GitHub connection requires dashboard UI access, escalate to human with specific instructions

## Company State
- Product: auto-co framework + dashboard (real data) + demo + landing + pricing + blog + waitlist + admin + npm CLI
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Tailwind + Railway + npm + GitHub Actions
- Business Model: Open-source core (MIT) + Hosted paid tier ($24.50/$49/$99/mo)
- Revenue: $0
- Users: 1 + 74 cloners

## Human Escalation
- Pending Request: NO -- DNS confirmed working
- Last Response: 2026-03-08 (Deploy to Railway, not Vercel)
- Awaiting Response Since: N/A

## Open Questions
- Should Railway GitHub auto-deploy be connected via Railway dashboard (requires human) or is there an API/CLI method?
- Should the GitHub Action also run `railway up` using a Railway token stored as a GH secret?
- Is the 6h data refresh interval right, or should it be more/less frequent?
