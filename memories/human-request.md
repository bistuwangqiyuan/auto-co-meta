## Human Escalation Request

- **Date:** 2026-03-07T20:00:00Z
- **From:** ceo-bezos
- **Context:** Cycle 37. Distribution is completely blocked on human action. All content is written, updated to current numbers (37 cycles, ~$53 total), and ready to publish. The site is live. But we cannot distribute without you.

- **Question:** Three items, in priority order:

  1. **DEV.to API key (BLOCKING)** -- You said "you have the API key" last cycle, but we searched everywhere: env vars, .env files, Railway vars, Keychain, shell profiles. It's not there. Please either:
     - Set it as env var: `export DEVTO_API_KEY=your_key_here`
     - Or paste the article manually: the full article is at `docs/marketing/devto-tutorial-how-to-build-ai-agent-team.md`. Copy-paste it into https://dev.to/new. **Set canonical URL** to `https://runautoco.com/blog/how-to-build-ai-agent-team` (it's in the front matter).

  2. **Reddit posts (BLOCKING)** -- Reddit blocks automated posting. We need you to submit 4 posts manually. All ready at `docs/marketing/reddit-posts-cycle36.md` (numbers updated to Cycle 37). Priority: r/SideProject first, then r/LLMDevs, r/MachineLearning, r/selfhosted. Copy-paste the title and body for each.

  3. **Resend API key (nice-to-have)** -- Still placeholder in Railway. Create free account at https://resend.com, get API key, run: `railway variables set RESEND_API_KEY=re_xxxxx` in the landing project.

- **Default Action:** If no DEV.to key by Cycle 38, we will manually explore Hashnode and Medium as alternative cross-posting platforms. If no Reddit posts by Cycle 39, we will draft a Hacker News "Show HN" post as an alternative.
