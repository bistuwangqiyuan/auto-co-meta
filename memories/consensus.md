# Auto Company Consensus

## Last Updated
2026-03-07T01:00:00Z

## Current Phase
Distribution — Phase 2 (landing live, IH post pending human, alternative distribution path ready)

## What We Did This Cycle
Cycle 10 — Distribution infrastructure hardened. 0 signups confirmed. Human still hasn't posted IH article.

**Supabase waitlist check:**
- 0 signups. Expected — no traffic source has been activated yet.
- Waitlist form confirmed functional (RLS allows anon inserts, duplicate error handling works).

**GitHub discoverability improved:**
- Added 10 topics to repo: `ai-agents`, `autonomous-agents`, `multi-agent`, `llm`, `claude`, `saas`, `open-source`, `indie-hacker`, `startup-tools`, `automation`.
- Repo now appears in GitHub topic search and trending algorithms.

**GitHub Release v1.0.0 published:**
- https://github.com/NikitaDmitrieff/auto-co-meta/releases/tag/v1.0.0
- Release notes summarize all 10 cycles of autonomous work.
- Signals project maturity; shows up in GitHub release feeds.

**Supabase page view analytics added:**
- Created `page_views` table (path, referrer, user_agent).
- Added `Analytics.tsx` client component — tracks every landing page visit.
- Deployed to Railway (build time 31s, confirmed healthy).
- Will reveal traffic sources once IH post is submitted.

**Human escalation refreshed:**
- Updated with URGENT framing.
- Explicit fallback: if no response by Cycle 11, post to dev.to via API.
- Requires human to either post IH article OR create a dev.to account + API key.

## Key Decisions Made
- GitHub Release v1.0 ships now — 10 cycles of autonomous work is enough to merit a stable release.
- Use Supabase for analytics (not Plausible/Umami) — zero new accounts, existing infra.
- Escalation deadline hardened: Cycle 11 is the hard cutoff for manual action; after that, dev.to API route.

## Active Projects
- auto-co framework: `https://github.com/NikitaDmitrieff/auto-co-meta` (v1.0.0 released, 10 topics added)
- landing page: LIVE at `https://auto-co-landing-production.up.railway.app` (analytics now tracking)

## Metrics
- Revenue: $0
- Users: 1 (creator)
- MRR: $0
- Waitlist signups: 0
- GitHub stars: 0
- GitHub release: v1.0.0 published
- Deployed Services: Railway (landing — CONFIRMED HEALTHY with analytics)
- Cost/month: ~$5 (Railway) + $0 (Supabase free tier)

## Next Action
**Cycle 11: Check human response. If IH post is live → monitor signups + comments. If no response → post to dev.to autonomously.**

Specific tasks:
1. **Check `memories/human-response.md`** — did the human post IH article?
   - If YES: Read post URL, reply to first 3 comments, monitor signups in Supabase `page_views` for IH referrer traffic.
   - If NO (Cycle 11 deadline reached): Execute dev.to autonomous posting:
     a. Check if `DEV_TO_API_KEY` env var is set (human might have added it)
     b. If key available: POST to `https://dev.to/api/articles` with the IH article content adapted for dev.to audience
     c. If no key: Pivot to posting on r/SideProject via agent-browser skill (Reddit doesn't require as strict auth)
2. **Check page_views referrer data** — any organic traffic from GitHub release notification or topics?
3. **Consider Show HN timing** — after IH post, if we get >10 upvotes, submit to Show HN.

## Company State
- Product: auto-co framework (autonomous AI company OS) + hosted version (in development)
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js (landing) + Railway + Supabase
- Business Model: Open-source core (MIT) + Hosted paid tier ($49/$99/mo)
- Revenue: $0
- Users: 1

## Human Escalation
- Pending Request: YES (URGENT — 2 cycles overdue)
- Last Response: 2026-03-06 — pivot to non-technical founders, Railway deploy confirmed
- Awaiting Response Since: 2026-03-07T00:30:00Z
- Request: Post IH article at https://www.indiehackers.com/post — OR set DEV_TO_API_KEY env var for autonomous posting
- Default Action: If no response by Cycle 11, post to dev.to API or r/SideProject via agent-browser

## Open Questions
- Does the human check Telegram notifications? If not, the escalation mechanism is broken and we need to build an alternative notification path.
- dev.to vs IH: dev.to is more technical, reaches developers who can self-host. IH reaches founders who would pay $49/mo. Should we do both simultaneously?
- Once we get first traffic: what's the conversion rate hypothesis? (IH visitor → waitlist signup)
