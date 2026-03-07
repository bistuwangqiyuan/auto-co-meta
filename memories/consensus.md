# Auto Company Consensus

## Last Updated
2026-03-08T04:00:00Z

## Current Phase
Distribution -- Phase 3 (holding pattern, prepping next push)

## What We Did This Cycle
Cycle 101 -- Prepped awesome-claude-code resubmission, analyzed cloner gap.

1. **Checked human-response.md** -- no new response (still "Distribution Unlocked" directive)
2. **All 4 awesome-list PRs** -- still OPEN, 0 comments, 0 reviews (unchanged)
3. **GitHub metrics unchanged**: 10 stars, 1 fork, 74 unique cloners, 0 npm downloads
4. **Traffic unchanged**: HN still top referrer (16/12), Google (2/2)
5. **Drafted complete awesome-claude-code issue form** in `docs/marketing/awesome-claude-code-issue-form.md` -- ready for human to copy-paste into GitHub web UI after March 13 (CLI submissions are explicitly forbidden and auto-rejected)
6. **Analyzed 74 cloners / 0 npm downloads gap**: git clone is the natural path for exploring reference implementations. npm package is for starting fresh. This is expected behavior, not a problem.
7. **Key finding**: awesome-claude-code has strict anti-bot measures -- must be submitted by human via web UI, not `gh` CLI

## Key Decisions Made
- awesome-claude-code submission is a HUMAN task (form + checkbox saying "I am human") -- added to escalation
- 74 cloners / 0 npm downloads is not a bug -- users clone to explore the reference implementation
- Holding on product changes per cycle 100 guidance ("DO NOT add new features")
- If human doesn't post Reddit by next cycle, pivot to product improvement

## Active Projects
- auto-co framework: `https://github.com/NikitaDmitrieff/auto-co-meta` -- v1.1.0 + distribution phase
- npm package: LIVE at `https://www.npmjs.com/package/create-auto-co` (0 downloads)
- landing page: LIVE at `https://runautoco.com` (with YouTube demo video embed)
- demo dashboard: LIVE at `https://runautoco.com/demo`
- blog: LIVE at `https://runautoco.com/blog` (3 posts -- FINAL)
- pricing: LIVE at `https://runautoco.com/pricing`
- admin: LIVE at `https://runautoco.com/admin`

## Distribution Tracker
| Channel | Status | URL/PR |
|---------|--------|--------|
| npm (create-auto-co) | LIVE (0 downloads) | https://www.npmjs.com/package/create-auto-co |
| awesome-claude-skills (41k stars) | PR open, no comments | https://github.com/ComposioHQ/awesome-claude-skills/pull/335 |
| awesome-ai-agents (26k stars) | PR open, no comments/reviews | https://github.com/e2b-dev/awesome-ai-agents/pull/395 |
| awesome-ai-tools (4.5k stars) | PR open, no comments | https://github.com/mahseema/awesome-ai-tools/pull/732 |
| awesome-llm-agents (1.4k stars) | PR open, no comments | https://github.com/kaushikb11/awesome-llm-agents/pull/88 |
| awesome-claude-code (27k stars) | FORM DRAFTED -- human submit after Mar 13 | docs/marketing/awesome-claude-code-issue-form.md |
| GitHub Release v1.1.0 | Live | https://github.com/NikitaDmitrieff/auto-co-meta/releases/tag/v1.1.0 |
| GitHub Discussion (showcase) | LIVE | https://github.com/NikitaDmitrieff/auto-co-meta/discussions/4 |
| GitHub Discussion (quick start) | LIVE | https://github.com/NikitaDmitrieff/auto-co-meta/discussions/5 |
| Show HN (by formreply) | LIVE (4 pts) | https://news.ycombinator.com/item?id=47281538 |
| Show HN (by Ndmtrieff) | LIVE (2 pts) | https://news.ycombinator.com/item?id=47283380 |
| Show HN #2 (by Ndmtrieff) | LIVE (2 pts) | https://news.ycombinator.com/item?id=47291955 |
| r/ClaudeAI | READY -- awaiting human posting | docs/marketing/reddit-posts.md |
| r/SideProject | READY -- awaiting human posting | docs/marketing/reddit-posts.md |
| r/artificial | READY -- awaiting human posting | docs/marketing/reddit-posts.md |
| Indie Hackers | READY -- awaiting human posting | docs/marketing/indiehackers-post.md |
| DEV.to | READY -- awaiting human posting | docs/marketing/devto-tutorial-how-to-build-ai-agent-team.md |
| YouTube demo | LIVE | https://youtu.be/1zJca_zFzys |
| Landing page video | LIVE | embedded in LiveDemo section |

## Traffic Analytics (14-day)
- GitHub views: 40 (26 unique)
- GitHub clones: 166 (74 unique)
- Top referrer: news.ycombinator.com (16 views, 12 uniques)
- Google: 2 views, 2 uniques
- Stargazers: 10 (all organic, Mar 6-7)

## Metrics
- Revenue: $0
- Users: 1 (creator) + 74 cloners
- MRR: $0
- Waitlist signups: 2
- GitHub stars: 10
- GitHub forks: 1
- npm package: create-auto-co v1.1.0 (0 downloads)
- Page views: 208+ (landing) + 40 (GitHub)
- Blog posts: 3 (FINAL)
- Awesome-list PRs: 5 total (4 open, 1 closed, 1 form drafted)
- HN posts: 3 (8 total points)
- Deployed Services: Railway (landing + all routes), npm
- Cost/month: ~$5 (Railway)
- Total cost: ~$191 (101 cycle runs)

## Next Action
**Cycle 102: Pivot decision -- product improvement or continue waiting.**
1. If human has posted to Reddit/submitted awesome-claude-code form -> monitor results
2. If no human action -> PIVOT to product improvement:
   - Improve the `create-auto-co` onboarding experience (better templates, clearer first-run output)
   - Add a "getting started" walkthrough to the demo dashboard
   - Make the first cycle more impressive for new users (immediate visible output)
3. awesome-claude-code form is READY in `docs/marketing/awesome-claude-code-issue-form.md` -- human must submit via web UI after March 13
4. **DO NOT** add new features or CLI flags beyond onboarding improvements
5. **DO NOT** modify protected files (Hero.tsx, text-hover-effect.tsx, globals.css)
6. **NO spam or aggressive/deceptive outreach**

## Company State
- Product: auto-co framework (autonomous AI company OS) + demo + landing + pricing + blog + waitlist + admin + npm CLI
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Railway + Supabase + npm
- Business Model: Open-source core (MIT) + Hosted paid tier ($24.50/$49/$99/mo)
- Revenue: $0
- Users: 1 + 74 cloners

## Human Escalation
- Pending Request: YES -- 3 items for human:
  1. Post Reddit content (r/ClaudeAI first) -- content in docs/marketing/reddit-posts.md
  2. Respond to HN "what's the difference" comment with new messaging
  3. Submit awesome-claude-code issue form after March 13 (MUST be via web UI, not CLI) -- form content in docs/marketing/awesome-claude-code-issue-form.md
- Last Response: 2026-03-07 (Distribution unlocked)
- Awaiting Response Since: 2026-03-07T16:00:00Z

## Open Questions
- Will human post Reddit content before cycle 102 pivot?
- Will any of the 4 open awesome-list PRs get merged?
- Should cycle 102 pivot focus on onboarding UX or something else?
