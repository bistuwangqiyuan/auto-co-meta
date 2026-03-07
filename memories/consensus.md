# Auto Company Consensus

## Last Updated
2026-03-07T19:00:00Z

## Current Phase
Distribution — Phase 3 (content distribution, not creation)

## What We Did This Cycle
Cycle 36 — Distribution push, deployment fix, human response processing

**Processed human response (from memories/human-response.md):**
- Human confirmed: STOP writing blog posts. 3 is enough. Focus on distribution.
- Human will handle GSC manually — don't waste cycles on it.
- Human said "cross-post to DEV.to, you have the API key" — but API key NOT found in env or Railway. Need clarification.
- Human said: focus outward (distribution), not inward (optimization).
- Human fixed hero dimming issue manually (commit a57e3c5). DO NOT modify text-hover-effect.tsx or Hero.tsx.

**Fixed critical deployment gap:**
- Tutorial blog post (/blog/how-to-build-ai-agent-team) was returning 404!
- Root cause: Railway's last successful deploy (10:46 UTC) was built from a commit BEFORE the tutorial was added (11:04 UTC)
- Triggered manual Railway redeploy + pushed new commit to trigger git-based deploy
- Also: metrics API was serving stale data (Cycle 33 instead of 35) for the same reason

**Created distribution-ready content:**
- DEV.to tutorial article: `docs/marketing/devto-tutorial-how-to-build-ai-agent-team.md` — full markdown with front matter, canonical URL pointing to runautoco.com
- Updated Reddit posts: `docs/marketing/reddit-posts-cycle36.md` — 4 subreddit-specific posts (r/SideProject, r/LLMDevs, r/MachineLearning, r/selfhosted) with current numbers

**Updated all references to Cycle 36:**
- Metrics API: 36 cycles, $51.50 total, $1.43 avg
- Hero badge: "14 agents running — Cycle 36"
- Demo dashboard: all references updated
- Blog post cost reference updated

**Deployment:**
- Build verified: 14 routes pass (including tutorial)
- Commit d5094d3 pushed to main, Railway deploy triggered
- Previous manual deploy also triggered via Railway CLI

## Key Decisions Made
- **Distribution over creation** — Human directive: stop writing blog posts. 3 is enough with 0 traffic. Focus on getting existing content in front of people.
- **DEV.to cross-post is highest priority** — Tutorial with canonical URL is the best backlink + traffic play. Article is ready, just needs API key or manual posting.
- **Reddit posts ready** — 4 posts updated to current numbers, all linking back to tutorial on runautoco.com.

## Active Projects
- auto-co framework: `https://github.com/NikitaDmitrieff/auto-co-meta` (Cycle 36 commit d5094d3)
- landing page: LIVE at `https://runautoco.com`
  - Waitlist: `/api/waitlist` -> Supabase + Resend (email pending — RESEND_API_KEY still placeholder)
  - Page tracking: `/api/track` -> Supabase (WORKING)
  - Live metrics: `/api/metrics` -> Supabase (updated to Cycle 36)
  - Admin: `/api/admin` -> Supabase (WORKING)
  - GitHub star counter in /demo header (live from API)
  - Waitlist with live social proof + founding member urgency
- blog: LIVE at `https://runautoco.com/blog` (3 posts — NO MORE POSTS per human directive)
  - How to Build an AI Agent Team: `/blog/how-to-build-ai-agent-team` (was 404, now deploying)
  - 5 Lessons from 33 Cycles: `/blog/lessons-from-33-cycles`
  - Architecture deep-dive: `/blog/architecture-deep-dive`
- SEO: robots.txt + sitemap.xml (7 URLs) + JSON-LD structured data (human handling GSC)
- demo dashboard: LIVE at `https://runautoco.com/demo` (live data, updated to Cycle 36)
- pricing page: LIVE at `https://runautoco.com/pricing`
- admin dashboard: LIVE at `https://runautoco.com/admin`

## Metrics
- Revenue: $0
- Users: 1 (creator)
- MRR: $0
- Waitlist signups: 2 (1 real + 1 test)
- GitHub stars: 5
- Page views: 208+
- Blog views: ~0 (no distribution yet)
- Blog posts: 3 (FINAL — no more per human directive)
- Deployed Services: Railway (landing + all routes)
- Cost/month: ~$5 (Railway)
- Cycle 36 cost: ~$1.50 (est)
- Total cost: ~$51.50 (est, 36 cycles)

## Next Action
**Cycle 37: Cross-post tutorial to DEV.to and submit Reddit posts.**
1. **DEV.to** — If API key is available, publish `docs/marketing/devto-tutorial-how-to-build-ai-agent-team.md` via DEV.to API. If not, escalate again with specific request for the key.
2. **Reddit** — Posts are ready at `docs/marketing/reddit-posts-cycle36.md`. Human needs to submit these (Reddit blocks automated posting). Escalate with clear instructions.
3. **Verify deployment** — Confirm the tutorial blog post is live (was 404 this cycle). Confirm metrics API returns Cycle 36 data.
4. **DO NOT** write more blog posts, do more SEO work, or optimize the landing page. The human was clear: focus outward.

## Company State
- Product: auto-co framework (autonomous AI company OS) + demo + landing + pricing + blog (3 posts) + waitlist + admin
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Railway + Supabase + Resend (pending)
- Business Model: Open-source core (MIT) + Hosted paid tier ($24.50-$49/$99/mo)
- Revenue: $0
- Users: 1

## Human Escalation
- Pending Request: YES — DEV.to API key (not found in env), Reddit post submission, Resend API key
- Last Response: 2026-03-07 (processed this cycle — stop blog posts, focus distribution, GSC manual)
- Awaiting Response Since: 2026-03-07T19:00:00Z
- Default Action: If no DEV.to API key by Cycle 38, explore Hashnode/Medium cross-posting or ask human to manually paste the article.

## Open Questions
- Where is the DEV.to API key? Human said "you have it" but it's not in env vars or Railway.
- Can we automate Reddit posting or does human need to submit manually?
- When will the Railway deploy complete and the tutorial page go live?
- Should we explore other distribution channels (Hashnode, Medium, Indie Hackers)?
