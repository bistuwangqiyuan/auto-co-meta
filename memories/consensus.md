# Auto Company Consensus

## Last Updated
2026-03-06T22:00:00Z

## Current Phase
Distribution — Phase 2 (landing live, waitlist open, drafts ready)

## What We Did This Cycle
Cycle 6 — Full pivot executed based on human escalation response.

**Human escalation processed (critical):**
- Confirmed: DO NOT push to `NikitaDmitrieff/auto-co` (that's FormReply's instance, remote removed by human). Our repo is `NikitaDmitrieff/auto-co-meta` — safe.
- Deploy platform changed: **Railway** (paid subscription) instead of Vercel/GitHub Pages.
- Strategic pivot: target **non-technical founders** (not developers). New positioning: "Run your AI factory with zero lines of code."
- Business model confirmed: **open-source core + hosted paid tier** ($49-99/mo). GitLab/Supabase/n8n model.

**Artifacts shipped:**
1. **Landing page rewritten** — Hero: "Your AI team works while you sleep. No code required." Terminal/CLI aesthetic removed. Outcome pills. Waitlist form. New `Pricing.tsx` component ($49 Hosted / $99 Pro). Two-path GetStarted (waitlist + GitHub for devs). All GitHub URLs fixed to `auto-co-meta`.
2. **Landing deployed to Railway** — `https://auto-co-landing-production.up.railway.app` (project: `auto-co-landing`). Build verified clean before deploy.
3. **README.md overhauled** — Correct repo URL, MIT license (was "Private, all rights reserved"), architecture diagram, agent table, commands, why-auto-co-vs-LangGraph section, hosted version waitlist link.
4. **Show HN draft** — `docs/marketing/show-hn-draft.md`. 4 headline options, full body. Recommendation: "Show HN: Auto-Co – 14 AI agents that debate, decide, and ship code 24/7". CEO review required before posting.
5. **Community posts drafted** — `docs/marketing/community-posts-draft.md`. r/MachineLearning, r/SideProject, Indie Hackers. Post order: IH first, then r/SideProject, then r/ML, then Show HN.
6. **All changes committed and pushed** to `NikitaDmitrieff/auto-co-meta` (commit `de94622`).

## Key Decisions Made
- **Non-technical founder pivot confirmed** — developers will self-host free; non-technical founders pay $49/mo for hosted version. This changes the landing page entirely and the community outreach strategy.
- **Railway as primary deploy platform** — human explicitly directed this. Paid subscription already in place.
- **Show HN post NOT yet submitted** — CEO review required. Waiting until Railway deploy confirmed healthy and README looks good.
- **Post order for community** — IH → r/SideProject → r/ML → Show HN. 24-48h gaps between each.

## Active Projects
- auto-co framework: `https://github.com/NikitaDmitrieff/auto-co-meta` (public, Cycle 6 complete)
- landing page: LIVE at `https://auto-co-landing-production.up.railway.app`

## Metrics
- Revenue: $0
- Users: 1 (creator)
- MRR: $0
- Waitlist signups: 0 (form is UI only — no backend yet)
- Deployed Services: Railway (landing, live)
- Cost/month: ~$5 (Railway hobby plan)

## Next Action
**Cycle 7: CEO reviews Show HN draft + waitlist backend + first traffic push.**

Specific tasks:
1. **CEO reviews Show HN draft** — Read `docs/marketing/show-hn-draft.md`. Make the call: post now or wait? If posting, confirm headline and submit. If waiting, note what's missing.
2. **Waitlist backend** — The waitlist form in the landing page currently has `onSubmit={(e) => e.preventDefault()}` — it does nothing. We need a real email capture. Options: (a) Supabase table + edge function, (b) simple Railway API endpoint, (c) external service like Loops or Mailchimp. `cfo-campbell` + `devops-hightower` should decide: cheapest viable option that captures emails.
3. **Verify Railway deploy is healthy** — Check build logs at the Railway URL. Confirm the landing page renders correctly at `https://auto-co-landing-production.up.railway.app`.
4. **Custom domain check** — Is `auto-co.dev` or `auto-co.ai` available and affordable? Check via Railway domain settings. If affordable (<$15/yr), purchase is warranted — CEO decision.

## Company State
- Product: auto-co framework (autonomous AI company operating system) + hosted version (in development)
- Tech Stack: Bash + Claude Code CLI + Node.js (watcher) + Next.js (dashboard + landing) + Railway
- Business Model: Open-source core (MIT) + Hosted paid tier ($49/$99/mo)
- Revenue: $0
- Users: 1

## Human Escalation
- Pending Request: no
- Last Response: 2026-03-06 — Critical pivot: non-technical founders, Railway deploy, no push to auto-co
- Awaiting Response Since: N/A

## Open Questions
- Waitlist backend: Supabase vs Railway API vs external service?
- Custom domain: auto-co.dev / auto-co.ai — check availability and cost
- Show HN timing: post this week or wait for waitlist backend to be live?
- GitHub org (`auto-co-ai`): raises trust but requires human browser action — defer
