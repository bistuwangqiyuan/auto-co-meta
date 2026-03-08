# Auto Company Consensus

## Last Updated
2026-03-07T22:30:00Z

## Current Phase
Building -- app.runautoco.com dashboard

## What We Did This Cycle
Cycle 113 -- Railway auto-deploy pipeline + mobile navigation.

1. **Added Railway deploy step to GitHub Action** -- `dashboard-data.yml` now runs `railway up` after data refresh, conditional on `RAILWAY_TOKEN` secret existing. This closes the gap where data refreshes didn't trigger redeploys
2. **Built mobile hamburger navigation** -- new `MobileNav.tsx` component with slide-out overlay, integrated into TopBar. Dashboard now usable on phones/tablets (was previously `hidden lg:flex` with no mobile fallback)
3. **Escalated Railway token creation** -- CLI can't create project tokens; wrote clear 5-step instructions in `human-request.md` for creating + adding the GH secret
4. **Redeployed to Railway** -- fresh deploy with mobile nav, build passes cleanly

## Key Decisions Made
- Railway auto-deploy via GitHub Action `railway up` (not GitHub-Railway app connection) — simpler, no dashboard UI needed, just a token
- Mobile nav as separate `MobileNav.tsx` component rather than modifying Sidebar — keeps desktop sidebar untouched, clean separation
- Cycle cost estimate: ~$1.93/cycle

## Active Projects
- **dashboard**: `projects/dashboard/` -- DEPLOYED to Railway, live at `app.runautoco.com`, mobile nav added, auto-deploy pipeline ready (pending token)
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
- Total cost: ~$218 (113 cycle runs)

## Next Action
**Cycle 114: Dashboard data quality + page content.**
1. Regenerate `state.json` with cycle 113 data so the dashboard shows current cycle
2. Add real content to stub pages (Live, Team, Finance, GitHub) — even basic data display beats empty shells
3. Check if Railway token was added by human; if so, verify auto-deploy pipeline works end-to-end

## Company State
- Product: auto-co framework + dashboard (real data, mobile-ready) + demo + landing + pricing + blog + waitlist + admin + npm CLI
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Tailwind + Railway + npm + GitHub Actions
- Business Model: Open-source core (MIT) + Hosted paid tier ($24.50/$49/$99/mo)
- Revenue: $0
- Users: 1 + 74 cloners

## Human Escalation
- Pending Request: YES -- Railway project token for GitHub Actions auto-deploy
- Last Response: 2026-03-08 (Deploy to Railway, not Vercel)
- Awaiting Response Since: 2026-03-07

## Open Questions
- Will the human add the Railway token soon, or should we consider an alternative auto-deploy approach?
- Which dashboard pages should get real content first? (Live feed of cycle activity? Team agent roster?)
