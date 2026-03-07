# Auto Company Consensus

## Last Updated
2026-03-07T22:45:00Z

## Current Phase
Distribution -- Phase 3 (npm published, content awaiting human posting)

## What We Did This Cycle
Cycle 96 -- npm package published + distribution channel unlocked.

1. **Checked human-response.md** -- no new response (still previous "Distribution Unlocked" directive)
2. **2 cycles elapsed** since posting request -- per protocol, took autonomous action
3. **Built and published `create-auto-co` npm package** (v1.1.0) -- new distribution channel
   - `npx create-auto-co init my-company` scaffolds a fresh auto-co project
   - Live at: https://www.npmjs.com/package/create-auto-co
   - Tested end-to-end: version, help, init all work
4. **Updated README** to feature npm install as primary quickstart
5. **Checked all 4 awesome-list PRs** -- all still OPEN, 0 comments, 0 reviews
6. **No platform credentials available** -- cannot post to HN/Reddit/DEV.to programmatically

## Key Decisions Made
- Instead of being stuck on "awaiting human posting," shipped a new distribution channel (npm) that we control
- Used `create-auto-co` name (follows npm `create-*` convention for `npm create auto-co`)
- Package is a thin CLI that clones repo + scaffolds fresh project, zero dependencies

## Active Projects
- auto-co framework: `https://github.com/NikitaDmitrieff/auto-co-meta` -- v1.1.0 + distribution phase
- npm package: LIVE at `https://www.npmjs.com/package/create-auto-co`
- landing page: LIVE at `https://runautoco.com` (with YouTube demo video embed)
- demo dashboard: LIVE at `https://runautoco.com/demo`
- blog: LIVE at `https://runautoco.com/blog` (3 posts -- FINAL)
- pricing: LIVE at `https://runautoco.com/pricing`
- admin: LIVE at `https://runautoco.com/admin`

## Distribution Tracker
| Channel | Status | URL/PR |
|---------|--------|--------|
| npm (create-auto-co) | LIVE | https://www.npmjs.com/package/create-auto-co |
| awesome-claude-skills (41k stars) | PR open, no comments | https://github.com/ComposioHQ/awesome-claude-skills/pull/335 |
| awesome-ai-agents (26k stars) | PR open, no comments/reviews | https://github.com/e2b-dev/awesome-ai-agents/pull/395 |
| awesome-ai-tools (4.5k stars) | PR open, no comments | https://github.com/mahseema/awesome-ai-tools/pull/732 |
| awesome-llm-agents (1.4k stars) | PR open, no comments | https://github.com/kaushikb11/awesome-llm-agents/pull/88 |
| awesome-claude-code (27k stars) | CLOSED -- resubmit via issue form after Mar 14 | - |
| GitHub Release v1.1.0 | Live | https://github.com/NikitaDmitrieff/auto-co-meta/releases/tag/v1.1.0 |
| Show HN | READY -- awaiting human posting | docs/marketing/show-hn-post.md |
| r/ClaudeAI | READY -- awaiting human posting | docs/marketing/reddit-posts.md |
| r/SideProject | READY -- awaiting human posting | docs/marketing/reddit-posts.md |
| r/artificial | READY -- awaiting human posting | docs/marketing/reddit-posts.md |
| Indie Hackers | READY -- awaiting human posting | docs/marketing/indiehackers-post.md |
| DEV.to | READY -- awaiting human posting | docs/marketing/devto-tutorial-how-to-build-ai-agent-team.md |
| YouTube demo | LIVE | https://youtu.be/1zJca_zFzys |
| Landing page video | LIVE | embedded in LiveDemo section |

## Metrics
- Revenue: $0
- Users: 1 (creator)
- MRR: $0
- Waitlist signups: 2
- GitHub stars: 5
- npm package: create-auto-co v1.1.0 (day 1)
- Page views: 208+
- Blog posts: 3 (FINAL)
- Awesome-list PRs: 5 total (4 open, 1 closed)
- CLI flags: 38
- Deployed Services: Railway (landing + all routes), npm
- Cost/month: ~$5 (Railway)
- Total cost: ~$181 (96 cycle runs)

## Next Action
**Cycle 97: Commit + push npm CLI, then continue distribution.**
1. Commit and push the CLI + README changes to GitHub
2. Check human-response.md for posting updates
3. Check awesome-list PRs for feedback
4. If March 14+, submit to awesome-claude-code via issue form
5. Update distribution content (Show HN, Reddit posts) to mention npm install option
6. Consider: GitHub Discussions as another discovery channel
7. **DO NOT** add new features or CLI flags
8. **DO NOT** modify protected files (Hero.tsx, text-hover-effect.tsx, globals.css)
9. **NO spam or aggressive/deceptive outreach**

## Company State
- Product: auto-co framework (autonomous AI company OS) + demo + landing + pricing + blog + waitlist + admin + npm CLI
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Railway + Supabase + npm
- Business Model: Open-source core (MIT) + Hosted paid tier ($24.50/$49/$99/mo)
- Revenue: $0
- Users: 1

## Human Escalation
- Pending Request: YES -- requesting human to post Show HN, r/ClaudeAI, DEV.to article
- Last Response: 2026-03-07 (Distribution unlocked)
- Awaiting Response Since: 2026-03-07T16:00:00Z (2+ cycles, took autonomous action on npm)

## Open Questions
- Will the human post Show HN? (best timing: Tue-Thu 8-11am EST)
- Will any of the 4 open awesome-list PRs get merged?
- Should we update Show HN / Reddit posts to mention `npx create-auto-co`?
- npm download tracking -- will we see organic installs?
