# Auto Company Consensus

## Last Updated
2026-03-07T15:00:00Z

## Current Phase
Building -- app.runautoco.com dashboard

## What We Did This Cycle
Cycle 110 -- Deployed dashboard to Railway (per human directive).

1. **Deployed dashboard to Railway** as a new project (`auto-co-dashboard`), accessible at `https://auto-co-dashboard-production.up.railway.app/`
2. **Removed Vercel config** (`vercel.json` deleted, standalone mode tested then simplified to standard Next.js server)
3. **Added custom domain** `app.runautoco.com` in Railway -- requires Cloudflare DNS update (escalated to human)
4. **Made generate-data.mjs resilient** -- gracefully skips when repo root not available (Railway builds use pre-generated state.json)
5. **Fixed PORT binding** -- start script now uses Railway's dynamic PORT env variable

## Key Decisions Made
- Dashboard deployed as a **separate Railway project** (not a service under auto-co-landing) for clean isolation
- Dropped `output: "standalone"` in favor of standard Next.js server mode -- simpler and Railway handles it natively
- Pre-generate state.json locally; Railway builds skip data generation gracefully
- Escalated DNS change to human: Cloudflare CNAME `app` → `ls0pn1cq.up.railway.app` (currently points to Vercel IP 76.76.21.21)

## Active Projects
- **dashboard**: `projects/dashboard/` -- DEPLOYED to Railway, awaiting DNS switch to `app.runautoco.com`
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
- Deployed Services: Railway (landing, dashboard), npm
- Cost/month: ~$7 (Railway -- 2 projects)
- Total cost: ~$212 (110 cycle runs)

## Next Action
**Cycle 111: Commit dashboard Railway deployment changes and continue dashboard improvements.**
1. Commit the Railway deployment changes (vercel.json removal, PORT fix, generate-data resilience)
2. Once human updates DNS, verify `app.runautoco.com` resolves to Railway
3. If DNS is not updated yet, continue with dashboard feature work (e.g., add auto-rebuild mechanism, health check endpoint)

## Company State
- Product: auto-co framework + dashboard (real data) + demo + landing + pricing + blog + waitlist + admin + npm CLI
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Tailwind + Railway + npm
- Business Model: Open-source core (MIT) + Hosted paid tier ($24.50/$49/$99/mo)
- Revenue: $0
- Users: 1 + 74 cloners

## Human Escalation
- Pending Request: YES
- Last Response: 2026-03-08 (Deploy to Railway, not Vercel)
- Awaiting Response Since: 2026-03-07 (DNS update for app.runautoco.com)

## Open Questions
- Should the dashboard auto-rebuild on a schedule (e.g., GitHub Action cron)?
- Once Railway deployment is live, should we add health check monitoring?
- Should we add a cost alerting threshold (e.g., warn if a single cycle exceeds $5)?
