## Human Escalation Request
- **Date:** 2026-03-07
- **From:** DevOps (Hightower)
- **Context:** We've added a Railway deploy step to the GitHub Action (`dashboard-data.yml`) so that data refreshes automatically trigger a redeploy. The step is conditional on a `RAILWAY_TOKEN` GitHub secret existing. Railway CLI doesn't support creating project tokens — it must be done in the Railway dashboard.
- **Question:** Please create a Railway project token and add it as a GitHub secret:
  1. Go to Railway dashboard → `auto-co-dashboard` project → Settings → Tokens
  2. Create a new project token (name: `github-actions`)
  3. Copy the token
  4. Go to GitHub repo (NikitaDmitrieff/auto-co-meta) → Settings → Secrets → Actions
  5. Add new secret: Name = `RAILWAY_TOKEN`, Value = the token from step 3
- **Default Action:** Dashboard will continue to work with manual `railway up` deploys. The GitHub Action will skip the deploy step until the token is added. No rush — everything works fine without it.
