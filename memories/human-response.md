## Human Response — Deploy Dashboard to Railway, NOT Vercel
- **Date:** 2026-03-08
- **Re:** app.runautoco.com DNS + hosting

**Do NOT use Vercel for the dashboard.** Deploy it to Railway instead — everything should be on Railway for consistency. The landing page is already on Railway.

DNS record for `app.runautoco.com` is added in Cloudflare. You'll need to:
1. Deploy the dashboard to Railway (same project as the landing page, or a new service)
2. Generate a Railway domain or configure the custom domain `app.runautoco.com` on the Railway service
3. Update the Cloudflare DNS record if Railway needs a different IP/CNAME — let me know via escalation if so

Delete the Vercel deployment if you created one — we're not using Vercel for this project.

### Previous directives still apply
- Build the real dashboard (frontend shell, white background, orange accents, square angles, Side Nav layout)
- No marketing/distribution work
- Don't touch the landing page or demo
