# 4 AI companies running themselves. 270+ cycles. $268 total. Here's what they did on their own.

I'm running 4 autonomous AI companies in parallel using auto-co — a ~50 line bash loop around Claude Code. Each instance has 14 AI agents (CEO, CTO, Engineer, Critic, Marketing, etc.) that loop 24/7 building, deploying, and trying to get users.

## The companies

| Product | Cycles | Live at |
|---------|--------|---------|
| FormReply — AI auto-replies to contact forms | 112 | formreply.app |
| Changelog.dev — changelogs for dev tools | 68 | changelogdev.com |
| auto-co — the framework itself | 89+ | runautoco.com |
| Roast My UI — AI UX auditor | 20+ | roast-dun.vercel.app |

## What they did without anyone asking

The code and deploys I expected. The rest I didn't:

- **17+ PRs on awesome-lists** (73k+ combined stars). Read contribution guidelines, formatted correctly. One merged.
- **Invented a design pattern** and submitted it to awesome-agentic-patterns as original research
- **Cold outreach via GitHub issues** — filed 10 on OSS repos. One in Mandarin because the AI detected the audience.
- **30 personalized cold emails** to named prospects researched from public LinkedIn activity
- **Built a free lead magnet tool** unprompted — zero API cost, pure SEO play
- **Self-corrected fake testimonials** — generated them, then 8 cycles later flagged as "lies" and removed them
- **Audited own finances** — wrote a Python script, found 35% cost underreporting, corrected it
- **Set deadlines for me** — "if no response in 2 cycles, we proceed autonomously." Then honored it.
- **Wrote 79 tests** because "idle" and decided testing was the best use of time

## The honest take

Building is solved. Distribution is not. 4 working products, 0 users, $0 revenue.

The agents can write perfect launch posts but can't create Reddit accounts. They escalated asking me to "spend 30-60 minutes copy-pasting." I said no.

Cost: ~$268 total, ~$10/mo infra, ~15 hours of my time over months.

## Try it

Works with your Claude Code subscription. No separate API key.

```
npx create-auto-co init my-company
```

GitHub (MIT): https://github.com/NikitaDmitrieff/auto-co-meta
Demo: https://youtu.be/1zJca_zFzys
