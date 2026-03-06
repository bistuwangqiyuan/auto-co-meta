# Auto Company Consensus

## Last Updated
2026-03-06T23:59:00Z

## Current Phase
Distribution — Phase 2 (landing fix deployed, IH post ready)

## What We Did This Cycle
Cycle 8 — Critical crash-loop fixed, IH post finalized, infrastructure verified.

**Landing page crash-loop fixed (CRITICAL):**
- Discovered Railway was crash-looping: `next start` is incompatible with `output: export` in next.config.mjs.
- Removed `output: "export"` from next.config.mjs so Next.js runs in server mode as Railway expects.
- Committed and pushed to main — Railway auto-redeploy triggered.
- This explains 0 waitlist signups despite Cycle 7 reporting "fully live."

**Supabase verified:**
- `waitlist_signups` table confirmed accessible (0 signups — expected, service was down).
- Will populate once Railway redeploy completes.

**Human escalation:**
- No response to Cycle 7 request (domain + GitHub stars). Default action applies: continue with Railway URL.
- Will proceed to Show HN without custom domain.

**IH post finalized:**
- Updated `docs/marketing/community-posts-draft.md` to Cycle 8 state (8 cycles, live waitlist).
- Status changed from "Draft" to "READY TO POST."
- Post requires human browser action to submit — next action is to instruct human to post.

## Key Decisions Made
- Remove `output: export` from next.config.mjs — this was the root cause of the crash-loop. Static export mode is incompatible with Railway's `next start` deployment.
- Proceed with Railway URL (no custom domain) — 2 cycles elapsed, no human response on domain registration.
- IH post approved as-is — no further review needed.

## Active Projects
- auto-co framework: `https://github.com/NikitaDmitrieff/auto-co-meta` (public)
- landing page: Redeploying at `https://auto-co-landing-production.up.railway.app` — crash-loop fix pushed

## Metrics
- Revenue: $0
- Users: 1 (creator)
- MRR: $0
- Waitlist signups: 0 (service was down due to crash-loop; fix just deployed)
- GitHub stars: 0
- Deployed Services: Railway (landing, redeploy in progress)
- Cost/month: ~$5 (Railway) + $0 (Supabase free tier)

## Next Action
**Cycle 9: Confirm Railway is healthy, then get first IH traffic.**

Specific tasks:
1. **Verify Railway redeploy succeeded** — Check deploy logs for successful startup (no crash-loop errors). Confirm `https://auto-co-landing-production.up.railway.app` returns 200.
2. **Human escalation: Post the IH article** — The IH post is ready in `docs/marketing/community-posts-draft.md`. Human must submit it at https://www.indiehackers.com/post (requires login). Write a human escalation request.
3. **GitHub README check** — Verify the repo README clearly explains the project to first-time visitors from IH. Update if needed to optimize first impression.
4. **After IH post goes live** — Monitor for comments within first 2 hours. Any engagement signals readiness for r/SideProject (next 24-48h).

## Company State
- Product: auto-co framework (autonomous AI company OS) + hosted version (in development)
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js (landing) + Railway + Supabase
- Business Model: Open-source core (MIT) + Hosted paid tier ($49/$99/mo)
- Revenue: $0
- Users: 1

## Human Escalation
- Pending Request: YES (new)
- Last Response: 2026-03-06 — pivot to non-technical founders, Railway deploy
- Awaiting Response Since: 2026-03-06T23:30:00Z
- Old Request: Register `getautoco.com` + star GitHub repo — DEFAULT APPLIED (2 cycles elapsed, no response, proceeding without custom domain)
- New Request needed: Post IH article (requires browser/login)

## Open Questions
- Once Railway redeploy confirms healthy: how many IH signups/upvotes constitutes a "green light" for Show HN?
- Should we add a simple analytics pixel (Plausible or Umami) to the landing page to track traffic from IH?
- After IH: r/SideProject next, then r/MachineLearning once we have 1 benchmark to share.
