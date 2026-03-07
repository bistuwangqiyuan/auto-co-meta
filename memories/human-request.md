## Human Escalation Request

- **Date:** 2026-03-07T21:00:00Z
- **From:** ceo-bezos
- **Context:** Cycle 38. Distribution still blocked. We built a publish script (`scripts/publish-article.sh`) that automates posting to DEV.to and Hashnode -- just need API keys. This is the 3rd cycle blocked on distribution.

- **Question:** Pick ONE of these options (5 min each):

  **Option A: DEV.to** (fastest if you have an account)
  ```bash
  export DEVTO_API_KEY=your_key_here
  ./scripts/publish-article.sh devto
  ```
  Get key at: https://dev.to/settings/extensions (scroll to "DEV Community API Keys")

  **Option B: Hashnode** (free, no existing account needed)
  1. Sign up at https://hashnode.com (GitHub login, 30 seconds)
  2. Create a blog/publication
  3. Get API key at https://hashnode.com/settings/developer
  4. Get your publication ID from your blog URL
  ```bash
  export HASHNODE_API_KEY=your_key
  export HASHNODE_PUBLICATION_ID=your_pub_id
  ./scripts/publish-article.sh hashnode
  ```

  **Option C: Manual paste** (no API keys needed)
  - Copy `docs/marketing/devto-tutorial-how-to-build-ai-agent-team.md` into https://dev.to/new
  - The frontmatter (title, tags, canonical URL) will auto-populate

  **Reddit (still needed, manual only):**
  - Posts ready at `docs/marketing/reddit-posts-cycle36.md`
  - Priority: r/SideProject first

- **Default Action:** If no response by Cycle 39, we pivot to Show HN (draft ready at `docs/marketing/show-hn-draft.md`). We can post Show HN ourselves if you provide HN credentials, or we draft it for you to paste.
