# Auto Company Consensus

## Last Updated
2026-03-07T12:00:00Z

## Current Phase
Building -- app.runautoco.com dashboard

## What We Did This Cycle
Cycle 117 -- Live page UX overhaul + GitHub traffic integration.

1. **Live page UX overhaul** -- Converted to client component with collapsible cycle rows (click to expand/collapse), cycle duration bar chart (last 40 cycles), and search/filter controls (text search, status filter, agent filter with clear button)
2. **GitHub traffic integration** -- Added getGitHubTraffic() to data pipeline pulling views+clones from GitHub API; added traffic section to GitHub page with totals + daily breakdown chart; 40 views (26 unique), 166 clones (74 unique) in last 14 days
3. **Metrics enrichment** -- Appended cycle 117 entry to metrics.jsonl with page_views data (40)
4. **Deployed to Railway** -- Build passes cleanly (9 static pages), pushed to app.runautoco.com

## Key Decisions Made
- Convert Live page to client component for interactive filters + collapsible rows — worth the 3KB JS cost for dramatically better UX at 95+ cycles
- Add GitHub traffic API integration — real engagement data beyond vanity metrics
- Skip distribution PR follow-ups — human directive says no marketing/distribution work

## Active Projects
- **dashboard**: `projects/dashboard/` -- DEPLOYED to Railway, live at `app.runautoco.com`, Live page overhauled with filters+collapsible+duration chart, GitHub page has traffic section
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
- GitHub stars: 13
- GitHub forks: 1
- GitHub views (14d): 40 (26 unique)
- GitHub clones (14d): 166 (74 unique)
- npm package: create-auto-co v1.1.1
- Deployed Services: Railway (landing, dashboard), npm
- Cost/month: ~$7 (Railway -- 2 services)
- Total cost: ~$226 (117 cycle runs)

## Next Action
**Cycle 118: Overview page refresh + Settings/Config page.**
1. Refresh the Overview (home) page: add traffic sparkline, improve layout of recent activity sections, show latest metrics snapshot
2. Build a Settings/Config page showing current team roster (14 agents), skill inventory, and auto-loop configuration
3. Consider adding a "Health" page that shows deployment status, last deploy time, and system health checks
4. Keep enriching metrics.jsonl each cycle with fresh GitHub traffic data

## Company State
- Product: auto-co framework + dashboard (real data, JSONL-enriched, mobile-ready, Finance+Live+GitHub with traffic) + demo + landing + pricing + blog + waitlist + admin + npm CLI
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Tailwind + Railway + npm + GitHub Actions
- Business Model: Open-source core (MIT) + Hosted paid tier ($24.50/$49/$99/mo)
- Revenue: $0
- Users: 1 + 74 cloners

## Human Escalation
- Pending Request: YES -- Railway project token for GitHub Actions auto-deploy
- Last Response: 2026-03-08 (Deploy to Railway, not Vercel)
- Awaiting Response Since: 2026-03-07

## Open Questions
- When should we start pursuing first paying customer vs. continuing to polish?
- Should we add a "Health" page with deployment monitoring?
- Worth adding a Settings page showing team roster and skill inventory?
