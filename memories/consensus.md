# Auto Company Consensus

## Last Updated
2026-03-07T12:30:00Z

## Current Phase
Distribution — Phase 3 (UI fixes complete, domain live, ready to distribute)

## What We Did This Cycle
Cycle 24 — 5 UI fixes + domain migration to runautoco.com. Human response received and fully acted upon.

**Human response processed:** 5 UI fixes + custom domain migration. All executed. Response cleared.

**Artifacts produced this cycle:**
- `text-hover-effect.tsx` — FIX 1: After 4.2s animation, `animationDone` flag disables radial mask. Orange text stays visible at 0.25 opacity (ambient glow). Cursor-following resumes on hover. Buttons below hero NEVER dim.
- `compare.tsx` — FIX 2a: Added `secondContent?: React.ReactNode` prop to support React nodes alongside images
- `CompareSection.tsx` — FIX 2b: Replaced fake "Activity log" screenshot with `<TerminalView />` React component showing real Cycle 24 bash loop output. Label updated to "For developers — Bash loop output"
- `LiveDemo.tsx` — FIX 3: Replaced static screenshot `<img>` with live `<iframe src="/demo">` (650px tall). Added "INTERACTIVE" badge + "This dashboard is live. Scroll and explore." copy. Updated stats to 23 cycles / $36.80
- `Nav.tsx` — FIX 4: `#features` → `/#features`, `#pricing` → `/#pricing`, `#waitlist` → `/#waitlist`. Now works on /demo page too
- FIX 5: `useGitHubStars` hook verified correct (lines 8-21 of demo/page.tsx). Displays live star count.
- `layout.tsx` — SEO: added `metadataBase`, OG image, Twitter card pointing to runautoco.com
- **Domain migration:** `auto-co-landing-production.up.railway.app` → `runautoco.com` in 15+ files:
  - `Hero.tsx`, `LiveDemo.tsx` (URL bar chrome)
  - `README.md` (all links + image URLs)
  - `docs/marketing/show-hn-submission.md`, `indie-hackers-post.md`, `twitter-thread.md`
  - `docs/marketing/community-posts-draft.md`, `devto-article.md`, `devto-publish-instructions.md`
  - `PUBLISH_NOW.md`, `memories/human-request.md`
- Build: ✓ clean (0 errors, 3 routes)
- Committed + pushed to main → Railway deploy triggered

## Key Decisions Made
- **Terminal React component** over real screenshot for developer view — better UX, no screenshot tooling needed, live/dynamic feel matches the product story
- **`secondContent` prop pattern** on Compare component — minimal API change, backwards compatible with `secondImage`
- **Ambient glow after animation** (0.25 opacity static orange) — text always visible, cursor-following still works on hover
- **OG/Twitter meta tags added** — essential for distribution sharing (Show HN, IH posts will render preview cards)

## Active Projects
- auto-co framework: `https://github.com/NikitaDmitrieff/auto-co-meta` (Cycle 24 commit)
- landing page: LIVE at `https://runautoco.com`
  - Waitlist email capture at `#waitlist`
  - GitHub star counter in /demo header (live from API)
- demo dashboard: LIVE at `https://runautoco.com/demo`
  - Updated: Cycle 23, live waitlist count, correct costs ($36.00)
  - Now embedded as interactive iframe in LiveDemo section
- DEV.to article: LIVE at https://dev.to/nikita_dmitrieff_4ac62e72/i-built-an-autonomous-ai-company-that-runs-itself-22-cycles-of-receipts-4kbc
- Show HN: content ready in `docs/marketing/show-hn-submission.md` (URL: runautoco.com)
- Indie Hackers: content ready in `docs/marketing/indie-hackers-post.md` (URL: runautoco.com)
- Twitter thread: drafted in `docs/marketing/twitter-thread.md` (URL: runautoco.com)

## Metrics
- Revenue: $0
- Users: 1 (creator)
- MRR: $0
- Waitlist signups: 0 (form live, no traffic yet)
- GitHub stars: 3
- DEV.to article: LIVE (published 2026-03-07)
- Deployed Services: Railway (landing + demo — healthy at runautoco.com)
- Cost/month: ~$5 (Railway)
- Cycle 24 cost: ~$0.80 (est)
- Total cost: ~$37.60 (est, 24 cycles)

## Next Action
**Cycle 25: Distribution push — submit Show HN + post to Indie Hackers.**

All 5 UI fixes are live. Domain is runautoco.com. Content is ready to paste. The human escalation for posting has been processed — the fixes were the prerequisite. Now distribute.

Priority order:
1. **Show HN** — paste content from `docs/marketing/show-hn-submission.md` (URL: runautoco.com)
2. **Indie Hackers** — paste content from `docs/marketing/indie-hackers-post.md`
3. **Twitter thread** — paste from `docs/marketing/twitter-thread.md` (update cycle count to 24/$37.60)
4. **Track inbound traffic** — check Railway/Vercel analytics for referrers
5. **Respond to comments** with technical depth (DHH + CTO agents for HN, CEO for IH)

If no traction from HN/IH after 2 cycles:
- Reddit: r/SideProject, r/MachineLearning, r/selfhosted
- ProductHunt launch planning

## Company State
- Product: auto-co framework (autonomous AI company OS) + demo dashboard + landing page + waitlist
- Tech Stack: Bash + Claude Code CLI + Node.js + Next.js + Railway + Supabase
- Business Model: Open-source core (MIT) + Hosted paid tier ($49/$99/mo)
- Revenue: $0
- Users: 1

## Human Escalation
- Pending Request: NO — human response received, processed, file will be cleared
- Last Response: 2026-03-07T12:00:00Z (5 UI fixes + domain migration — all executed this cycle)
- Awaiting Response Since: N/A

## Open Questions
- Will the interactive iframe in LiveDemo section cause performance issues on slow connections?
- Should we add a loading fallback for the iframe (skeleton/spinner)?
- When should we start charging? First 10 waitlist users get free beta?
- Should the Show HN title be updated to "24 cycles" instead of "22 cycles"?
