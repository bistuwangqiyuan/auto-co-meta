# Auto Company Consensus

## Last Updated
2026-03-08T07:00:00Z

## Current Phase
Building -- dashboard Round 2 refinements

## What We Did This Cycle
Cycle 125 -- Dashboard mobile polish + Round 2 refinements per human directive.

### Part 1: Deploy verification + mobile polish
1. **Railway deploy verified** -- app.runautoco.com returns 200, served via Railway edge through Cloudflare proxy
2. **Mobile responsive polish** -- 4 widget fixes (CompanyHeader, ActivityWidget, CycleStatusWidget, DocumentsWidget)
3. **Dev.to cross-post prepared** -- Markdown article at `docs/marketing/devto-120-cycles.md`, escalated for API key

### Part 2: Human directive — Dashboard Round 2 (received mid-cycle)
4. **Widget reorder** -- Activity (full-width hero, top) → GitHub (#2) → Cycle Status + Team → Finance → Documents + Tasks (bottom, collapsed)
5. **Activity widget enhanced** -- Full agent names shown (ceo-bezos, fullstack-dhh), "Live Activity" header with pulse indicator, expanded to 20 visible entries
6. **Chat persistent side panel** -- Right sidebar on desktop (360px, sticky), bottom drawer on mobile. Always accessible, never scrolled past
7. **Status banner cost transparency** -- Now shows "Last: $X.XX" AND "Total: $XXX.XX" in the dark top banner. Radical transparency vs NanoCorp's hidden credits
8. **Clone This Company button** -- Portfolio card now shows "Clone · 74" button with honest metric: "74 GitHub clones (14d)"
9. **Documents + Tasks collapsed by default** -- Click to expand, show count in collapsed header. Users see AI activity first, docs later
10. **Team widget interactions** -- Shows recent agent activity feed below compact roster: who did what, which cycle
11. **Honest metrics labeling** -- "GitHub clones (14d)" not "cloners"
12. **Build passes** -- 6/6 static pages generated

## Key Decisions Made
- Executed ALL human Round 2 directives in a single cycle — ship fast
- Chat as persistent side panel (not a scrollable widget) — major layout change
- Activity as full-width hero — most impactful visual change
- GitHub elevated to #2 — proves the AI does real work
- Documents/Tasks collapsed — "watch first, read later" UX

## Active Projects
- **dashboard**: `projects/dashboard/` -- ROUND 2 COMPLETE, deploying to Railway at `app.runautoco.com`, 2 routes + persistent chat panel
- auto-co framework: `https://github.com/NikitaDmitrieff/auto-co-meta` -- v1.1.1
- npm package: LIVE at `https://www.npmjs.com/package/create-auto-co` v1.1.1
- landing page: LIVE at `https://runautoco.com`
- demo dashboard: LIVE at `https://runautoco.com/demo`

## Distribution Tracker
| Channel | Status | URL/PR |
|---------|--------|--------|
| npm (create-auto-co) | LIVE v1.1.1 | https://www.npmjs.com/package/create-auto-co |
| dev.to | ARTICLE READY (awaiting API key) | docs/marketing/devto-120-cycles.md |
| awesome-claude-code | CLOSED (resubmit via issue after Mar 22) | https://github.com/hesreallyhim/awesome-claude-code/pull/942 |
| awesome-claude-skills | PR open (0 reviews) | https://github.com/ComposioHQ/awesome-claude-skills/pull/335 |
| awesome-ai-agents (e2b) | PR open (0 reviews) | https://github.com/e2b-dev/awesome-ai-agents/pull/395 |
| awesome-ai-agents (slava) | PR open (0 reviews) | https://github.com/slavakurilyak/awesome-ai-agents/pull/94 |
| awesome-ai-tools | PR open (0 reviews) | https://github.com/mahseema/awesome-ai-tools/pull/732 |
| awesome-llm-agents | PR open (0 reviews) | https://github.com/kaushikb11/awesome-llm-agents/pull/88 |

## Metrics
- Revenue: $0
- Users: 1 (creator) + 74 GitHub clones (14d)
- MRR: $0
- Waitlist signups: 2
- GitHub stars: 13
- GitHub forks: 1
- GitHub views (14d): 40 (26 unique)
- GitHub clones (14d): 166 total (74 unique)
- npm package: create-auto-co v1.1.1
- Blog posts: 4
- Deployed Services: Railway (landing, dashboard), npm
- Cost/month: ~$7 (Railway -- 2 services)
- Total cost: ~$242 (125 cycle runs)

## Next Action
**Cycle 126: Push Round 2 to Railway + dev.to publish + awesome-list follow-up.**
1. Git commit and push Round 2 dashboard changes to trigger Railway deploy
2. If dev.to API key received, publish the article
3. Check awesome-list PR statuses (5 PRs open with 0 reviews — comment on stale ones)
4. Consider SWR real-time data refresh for Activity and GitHub widgets
5. awesome-claude-code resubmission (eligible after Mar 22)

## Company State
- Product: auto-co framework + dashboard (persistent chat panel, 7 widgets + chat, Activity hero, collapsed docs/tasks) + demo + landing + pricing + blog (4 posts) + waitlist + admin + npm CLI
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Tailwind + motion + Railway + npm + GitHub Actions
- Business Model: Open-source core (MIT) + Hosted paid tier ($24.50/$49/$99/mo)
- Revenue: $0
- Users: 1 + 74 GitHub clones

## Human Escalation
- Pending Request: yes (dev.to API key)
- Last Response: 2026-03-08 (Dashboard Round 2 directive — EXECUTED this cycle)
- Awaiting Response Since: 2026-03-08T06:30:00Z (dev.to API key)

## Open Questions
- Should Chat widget connect to human-response.md backend in a future cycle?
- When to add SWR real-time data refresh?
- When to follow up on stale awesome-list PRs?
