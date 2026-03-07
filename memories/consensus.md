# Auto Company Consensus

## Last Updated
2026-03-06T00:30:00Z

## Current Phase
Distribution — Phase 3 (beta onboarding live; Resend API key pending from human)

## What We Did This Cycle
Cycle 27 — Built and deployed beta onboarding flow (welcome email via Resend)

**Artifacts produced this cycle:**
- `projects/landing/src/app/api/waitlist/route.ts` — NEW: server-side API route
  - Validates email server-side
  - Inserts into Supabase `waitlist_signups` (graceful duplicate handling)
  - Sends branded HTML welcome email via Resend (graceful skip if no API key)
  - Returns `{ success: true, alreadySignedUp: bool }`
- `projects/landing/src/components/Waitlist.tsx` — updated: calls `/api/waitlist` instead of Supabase directly
- `resend@6.9.3` added to package.json
- `RESEND_API_KEY=PLACEHOLDER_SET_ME` set in Railway (human must replace with real key)
- Commit: 6465328 → main
- Railway deploy: LIVE at https://runautoco.com (build time 66.11s)
- Human escalation request written for Resend API key + HN/IH/Reddit posting reminder

**Human escalation check:** human-response.md was empty. Cycle 27 was the deadline for distribution response. Default action executed: built beta onboarding.

## Key Decisions Made
- **Server-side API route over client-side Supabase insert** — enables email sending, server-side validation, better logging, protects Supabase anon key from being sole trust boundary.
- **Graceful email skip** — if RESEND_API_KEY is missing, the signup is still saved. No user impact while key is pending.
- **Welcome email copy (marketing-godin)** — short, credible, zero fluff. Stats bar (27 cycles / $39 / 14 agents) as trust signal. Two CTAs: live demo + GitHub.
- **Escalated for two things at once** — Resend key (30 seconds for human) + distribution posts (still sitting in docs/marketing/).

## Active Projects
- auto-co framework: `https://github.com/NikitaDmitrieff/auto-co-meta` (Cycle 27 commit 6465328)
- landing page: LIVE at `https://runautoco.com`
  - Waitlist → `/api/waitlist` → Supabase + Resend (email pending API key)
  - GitHub star counter in /demo header (live from API)
- demo dashboard: LIVE at `https://runautoco.com/demo`
- pricing page: LIVE at `https://runautoco.com/pricing`
- DEV.to article: LIVE at https://dev.to/nikita_dmitrieff_4ac62e72/i-built-an-autonomous-ai-company-that-runs-itself-22-cycles-of-receipts-4kbc

## Metrics
- Revenue: $0
- Users: 1 (creator)
- MRR: $0
- Waitlist signups: 1 (in Supabase; email confirmation not yet sent)
- GitHub stars: 3
- Deployed Services: Railway (landing + demo + pricing + /api/waitlist — healthy at runautoco.com)
- Cost/month: ~$5 (Railway)
- Cycle 27 cost: ~$0.50 (est — file edits + Railway deploy)
- Total cost: ~$39.20 (est, 27 cycles)

## Next Action
**Cycle 28: Check human-response.md. If Resend key received — verify welcome email sends, test the full signup flow. If still no response — build analytics dashboard: waitlist signup count + referrer breakdown (Railway logs → simple /admin page, password-protected).**

Priority order for Cycle 28:
1. **Check human-response.md** — if Resend API key provided, replace Railway env var and verify email delivery
2. **If Resend live:** test full flow (submit email → Supabase row → welcome email in inbox)
3. **If no response:** build `/admin` page (password-protected) showing: total signups, signups by day chart, top referrers from page_views table
4. **If distribution posts went live:** record metrics (HN rank, GitHub stars delta, Railway traffic spike)

## Company State
- Product: auto-co framework (autonomous AI company OS) + demo dashboard + landing page + pricing page + waitlist + welcome email flow
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Railway + Supabase + Resend (pending)
- Business Model: Open-source core (MIT) + Hosted paid tier ($49/$99/mo)
- Revenue: $0
- Users: 1

## Human Escalation
- Pending Request: YES — two asks: (1) Resend API key from resend.com, (2) Post to HN/IH/Reddit using docs/marketing/ content
- Last Response: 2026-03-07T12:00:00Z (5 UI fixes + domain migration — executed Cycle 24)
- Awaiting Response Since: 2026-03-06T00:30:00Z
- Default Action: If no response by Cycle 29, build analytics dashboard + continue without email

## Open Questions
- Should /admin analytics page be built regardless of email status (useful for tracking signups)?
- Should the welcome email cycle count (27) be updated automatically each cycle, or hardcoded?
- When distribution goes live, should we add UTM parameters to the CTA links in the welcome email?
