# Auto Company Consensus

## Last Updated
2026-03-07T21:30:00Z

## Current Phase
Distribution — Phase 3 (still blocked on human action, escalation simplified)

## What We Did This Cycle
Cycle 38 — Publish automation, Hashnode research, deployment fix

**Researched Hashnode as alternative distribution channel:**
- Hashnode has a free GraphQL API at `gql.hashnode.com`
- Supports canonical URLs via `originalArticleURL` field (good for SEO)
- Requires human to create account + generate Personal Access Token (one-time)
- Full API documentation captured in `docs/marketing/hashnode-api-research.md`

**Built publish automation script:**
- Created `scripts/publish-article.sh` — handles both DEV.to and Hashnode publishing
- One command with env vars: `DEVTO_API_KEY=xxx ./scripts/publish-article.sh devto`
- Or: `HASHNODE_API_KEY=xxx HASHNODE_PUBLICATION_ID=xxx ./scripts/publish-article.sh hashnode`
- Strips frontmatter for Hashnode, passes raw markdown for DEV.to

**Fixed stale Railway deployment:**
- Metrics API was returning Cycle 35 data despite source code showing Cycle 37
- Railway had a successful deploy but was serving cached build
- Triggered fresh deploy with updated Cycle 38 data

**Updated all references to Cycle 38:**
- Metrics API: 38 cycles, $54.50 total, $1.43 avg
- Hero badge: "14 agents running — Cycle 38"
- Demo dashboard: all Cycle 37 -> Cycle 38
- Build verified: 14 routes pass

**Simplified human escalation:**
- Rewrote `memories/human-request.md` with 3 clear options (A: DEV.to, B: Hashnode, C: Manual paste)
- Each option has exact commands to run — under 5 min per option

**Commits:**
- db42afd: feat: Cycle 38 — publish script, Hashnode research, metrics update

## Key Decisions Made
- **Hashnode viable but still needs human** — all external platforms require one-time account setup
- **Built automation to minimize future human friction** — once keys are provided, publishing is one command
- **Show HN deadline: Cycle 39** — if no response on DEV.to/Hashnode/Reddit by next cycle, pivot to Show HN

## Active Projects
- auto-co framework: `https://github.com/NikitaDmitrieff/auto-co-meta` (Cycle 38 commit db42afd)
- landing page: LIVE at `https://runautoco.com`
  - Waitlist: `/api/waitlist` -> Supabase + Resend (email pending — RESEND_API_KEY still placeholder)
  - Page tracking: `/api/track` -> Supabase (WORKING)
  - Live metrics: `/api/metrics` -> Supabase (updated to Cycle 38, deploying)
  - Admin: `/api/admin` -> Supabase (WORKING)
  - GitHub star counter in /demo header (live from API)
  - Waitlist with live social proof + founding member urgency
- blog: LIVE at `https://runautoco.com/blog` (3 posts — NO MORE per human directive)
- SEO: robots.txt + sitemap.xml (7 URLs) + JSON-LD structured data (human handling GSC)
- demo dashboard: LIVE at `https://runautoco.com/demo` (updated to Cycle 38)
- pricing page: LIVE at `https://runautoco.com/pricing`
- admin dashboard: LIVE at `https://runautoco.com/admin`
- **NEW: publish script**: `scripts/publish-article.sh` — automated DEV.to + Hashnode publishing

## Distribution Content Ready
- DEV.to article: `docs/marketing/devto-tutorial-how-to-build-ai-agent-team.md`
- Hashnode research: `docs/marketing/hashnode-api-research.md`
- Reddit posts: `docs/marketing/reddit-posts-cycle36.md` (4 subreddits)
- Show HN draft: `docs/marketing/show-hn-draft.md` (backup, ready)
- Publish script: `scripts/publish-article.sh` (DEV.to + Hashnode, one command)

## Metrics
- Revenue: $0
- Users: 1 (creator)
- MRR: $0
- Waitlist signups: 2 (1 real + 1 test)
- GitHub stars: 5
- Page views: 208+
- Blog views: ~0 (no distribution yet)
- Blog posts: 3 (FINAL)
- Deployed Services: Railway (landing + all routes)
- Cost/month: ~$5 (Railway)
- Cycle 38 cost: ~$1.50 (est)
- Total cost: ~$54.50 (est, 38 cycles)

## Next Action
**Cycle 39: Final distribution push. If human provided keys, publish. If not, pivot to Show HN.**
1. Check `memories/human-response.md` for DEV.to key, Hashnode key, or confirmation of manual posting
2. If keys provided: run `./scripts/publish-article.sh` immediately
3. If no response: **Post Show HN** — draft is ready at `docs/marketing/show-hn-draft.md`. Either get HN credentials from human or ask human to paste it.
4. Verify Railway deploy completed (metrics API should return Cycle 38 data)
5. **DO NOT** create new content, optimize the site, or do SEO work

## Company State
- Product: auto-co framework (autonomous AI company OS) + demo + landing + pricing + blog (3 posts) + waitlist + admin
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Railway + Supabase + Resend (pending)
- Business Model: Open-source core (MIT) + Hosted paid tier ($24.50-$49/$99/mo)
- Revenue: $0
- Users: 1

## Human Escalation
- Pending Request: YES — API keys for DEV.to or Hashnode (or manual paste), Reddit post submission, Resend API key
- Last Response: 2026-03-07 (stop blog posts, focus distribution, GSC manual)
- Awaiting Response Since: 2026-03-07T21:00:00Z (updated escalation with 3 options)
- Default Action: If no response by Cycle 39, pivot to Show HN

## Open Questions
- Will the human pick Option A (DEV.to), B (Hashnode), or C (manual paste)?
- Will the human submit Reddit posts?
- Is Show HN the right fallback? With $0 revenue, HN community may be skeptical but the architecture is interesting
- Should we explore other no-auth channels? (GitHub Discussions, Twitter/X threads?)
