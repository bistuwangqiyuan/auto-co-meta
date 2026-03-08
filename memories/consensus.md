# Auto Company Consensus

## Last Updated
2026-03-07T13:00:00Z

## Current Phase
Building -- app.runautoco.com dashboard

## What We Did This Cycle
Cycle 118 -- Dashboard nav redesign (human directive).

1. **Floating collapsible nav** -- Replaced static white Sidebar with demo-pattern floating nav: dark bg (`bg-zinc-950`), collapses to 48px icon-only, expands to 170px on hover with `motion` animations
2. **Real logo** -- Ported `/logo-ac.png` from landing to dashboard, replacing plain "AC" text square
3. **Neo-brutalist styling** -- Sharp corners, `border-white/[0.1]`, `shadow-xl shadow-black/50`, orange active indicator (`border-l-2 border-l-orange-500` + `bg-orange-500/10 text-orange-400`)
4. **Mobile dark nav** -- Updated MobileNav with dark theme drawer (animated slide-in), matching floating nav styling
5. **Layout restructure** -- Removed fixed 56px sidebar layout, content now uses `lg:pl-16` to clear collapsed nav; TopBar is mobile-only with dark theme
6. **Installed motion** -- Added framer-motion (`motion/react`) for smooth nav animations

## Key Decisions Made
- Port demo nav pattern to dashboard per human directive -- floating collapsible nav is the gold standard
- Keep white content area -- dark nav floats over white pages for contrast
- TopBar becomes mobile-only -- desktop gets clean floating nav with no top bar
- Added ~31KB shared JS (motion library) -- worth it for the animation quality

## Active Projects
- **dashboard**: `projects/dashboard/` -- DEPLOYED to Railway, live at `app.runautoco.com`, nav redesigned to floating collapsible dark pattern
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
- Total cost: ~$228 (118 cycle runs)

## Next Action
**Cycle 119: Overview page refresh + polish.**
1. Refresh the Overview (home) page: add traffic sparkline, improve layout of recent activity sections, show latest metrics snapshot
2. Consider adding a Settings/Config page showing team roster, skill inventory, and auto-loop configuration
3. Consider a "Health" page with deployment status and system checks
4. Keep enriching metrics.jsonl each cycle with fresh GitHub traffic data

## Company State
- Product: auto-co framework + dashboard (floating nav, real data, JSONL-enriched, mobile-ready, Finance+Live+GitHub with traffic) + demo + landing + pricing + blog + waitlist + admin + npm CLI
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Tailwind + motion + Railway + npm + GitHub Actions
- Business Model: Open-source core (MIT) + Hosted paid tier ($24.50/$49/$99/mo)
- Revenue: $0
- Users: 1 + 74 cloners

## Human Escalation
- Pending Request: no
- Last Response: 2026-03-08 (Railway token added, dashboard nav redesign directive)
- Awaiting Response Since: N/A

## Open Questions
- When should we start pursuing first paying customer vs. continuing to polish?
- Should we add a Settings page showing team roster and skill inventory?
- Worth adding a Health page with deployment monitoring?
