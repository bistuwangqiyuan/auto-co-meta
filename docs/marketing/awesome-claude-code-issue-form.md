# Awesome Claude Code Issue Form Submission

**Submit at:** https://github.com/hesreallyhim/awesome-claude-code/issues/new?template=recommend-resource.yml
**Earliest date:** March 13, 2026 (one week after first public commit)
**Must be submitted via GitHub web UI** (CLI submissions are auto-rejected)

---

## Form Fields

### Title
`[Resource]: auto-co`

### Display Name
`auto-co`

### Category
`Tooling`

### Sub-Category
`Tooling: Orchestrators`

### Primary Link
`https://github.com/NikitaDmitrieff/auto-co-meta`

### Author Name
`NikitaDmitrieff`

### Author Link
`https://github.com/NikitaDmitrieff`

### License
`MIT`

### Description
A ~50-line bash loop that runs Claude Code autonomously with a team of 14 AI agents (CEO, CTO, Designer, Engineer, QA, Marketing, CFO). State lives in markdown files. Give it a mission, it builds, ships, and deploys -- no human in the loop. Has produced two live SaaS products (FormReply, Changelog.dev) running on Railway and Supabase.

### Validate Claims
Clone the repo and run `make start` with a Claude Code subscription. Within one cycle (~2 minutes), auto-co will read its consensus file, assemble a team of agents, execute a task, and update the consensus with what it did and what to do next. You can watch the full loop in the demo video: https://youtu.be/1zJca_zFzys

### Specific Task(s)
Run `make start` and observe one complete cycle. Check `memories/consensus.md` before and after to see the state change. The loop will pick agents, make decisions, and produce artifacts (code, docs, deployments) autonomously.

### Specific Prompt(s)
No prompt needed -- auto-co runs autonomously. Just `make start`. To customize the mission, edit the one-liner in `CLAUDE.md` under "Mission". For a fresh project: `npx create-auto-co init my-company && cd my-company && make start`.

### Additional Comments
auto-co is intentionally minimal -- the core is a bash while-true loop calling `claude -p`. No SDK, no DAGs, no YAML. The insight is that Claude Code already handles tool use, code gen, and multi-step reasoning; you just need a loop and shared state in markdown files. Three live products have been built entirely by auto-co instances running in parallel, with ~$1.80 per cycle cost.

### Checklist
- [x] I have checked that this resource hasn't already been submitted
- [x] It has been over one week since the first public commit to the repo I am recommending
- [x] All provided links are working and publicly accessible
- [x] I do NOT have any other open issues in this repository
- [x] I am primarily composed of human-y stuff and not electrical circuits

---

## Pre-submission notes

1. The "one week" checkbox will only be truthful after March 13
2. The "human-y stuff" checkbox requires the HUMAN to submit, not the bot
3. Run `claude -p` with `.claude/commands/evaluate-repository.md` prompt against our repo beforehand to anticipate review feedback
4. No other open issues in that repo from our account (previous PR was closed, not an issue)
