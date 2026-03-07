"use client";
import { useState } from "react";
import { motion } from "motion/react";

const plans = [
  {
    name: "Open Source",
    price: "Free",
    period: "forever",
    description: "Full source code, MIT license. Self-host on any server. No strings attached.",
    cta: "View on GitHub",
    ctaHref: "https://github.com/NikitaDmitrieff/auto-co-meta",
    ctaExternal: true,
    highlight: false,
    features: [
      "Full source code — MIT license",
      "All 14 AI agents included",
      "Run on your own server",
      "Bash loop + Claude Code CLI",
      "Telegram notifications (self-configured)",
      "Community support (GitHub Issues)",
    ],
  },
  {
    name: "Hosted",
    price: "$49",
    period: "/ month",
    description: "Zero setup. We run it for you. Your AI company, live in minutes.",
    cta: "Join the waitlist",
    ctaHref: "/#waitlist",
    ctaExternal: false,
    highlight: true,
    badge: "Most popular",
    features: [
      "No server setup required",
      "Telegram notifications built in",
      "Web dashboard + cycle history",
      "Automatic updates",
      "Managed Claude API billing",
      "Priority email support",
    ],
  },
  {
    name: "Pro",
    price: "$99",
    period: "/ month",
    description: "Run multiple AI companies with custom agents and deep integrations.",
    cta: "Join the waitlist",
    ctaHref: "/#waitlist",
    ctaExternal: false,
    highlight: false,
    features: [
      "Everything in Hosted",
      "Up to 5 AI companies",
      "Custom agent personas",
      "Webhook integrations",
      "White-label option",
      "Dedicated support + onboarding",
    ],
  },
];

const comparisonRows = [
  { feature: "Source code access", open: true, hosted: true, pro: true },
  { feature: "All 14 AI agents", open: true, hosted: true, pro: true },
  { feature: "Telegram notifications", open: "Self-configured", hosted: true, pro: true },
  { feature: "Web dashboard", open: false, hosted: true, pro: true },
  { feature: "Cycle history", open: false, hosted: true, pro: true },
  { feature: "Managed API billing", open: false, hosted: true, pro: true },
  { feature: "Automatic updates", open: false, hosted: true, pro: true },
  { feature: "Multiple companies", open: false, hosted: false, pro: "Up to 5" },
  { feature: "Custom agent personas", open: false, hosted: false, pro: true },
  { feature: "Webhook integrations", open: false, hosted: false, pro: true },
  { feature: "White-label option", open: false, hosted: false, pro: true },
  { feature: "Support", open: "Community", hosted: "Priority email", pro: "Dedicated" },
];

const faqs = [
  {
    q: "What is auto-co exactly?",
    a: "auto-co is a Bash loop that runs 14 AI agents (CEO, CTO, engineer, marketer, and more) on a recurring schedule. Each cycle, the agents collaborate, make decisions, and produce real artifacts — code, deployments, content, analysis. It's an autonomous AI company operating 24/7 with minimal human input.",
  },
  {
    q: "How much does it cost to run the AI agents?",
    a: "The open-source version runs on your Claude API account. We've run 24 cycles total for ~$38 in API costs — roughly $1.57/cycle. Typical cycles take 10-40 minutes and cost $0.30–$2.00 depending on agent depth. The hosted tier includes managed billing so you never get a surprise API invoice.",
  },
  {
    q: "Do I need to know how to code?",
    a: "For the open-source version, yes — you'll need basic terminal skills to clone, configure, and run the loop. The hosted tier is designed to be no-code: connect your Claude API key, describe your company's mission, and we handle everything else.",
  },
  {
    q: "What can auto-co actually build?",
    a: "In 24 cycles, this instance of auto-co built: a full landing page (runautoco.com), an interactive demo dashboard, a waitlist, distribution content for 4 channels, domain migration, UI fixes, and this pricing page. It shipped to Railway and GitHub every cycle. Real infrastructure, real deployments.",
  },
  {
    q: "When does the hosted tier launch?",
    a: "We're building it now. Join the waitlist to get early access and lock in beta pricing. The first 50 users get 3 months at 50% off.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no lock-in. Cancel from the dashboard and your cycle stops at end of billing period. Open-source is yours forever.",
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <svg className="w-4 h-4 text-orange-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    );
  if (value === false)
    return <span className="text-zinc-700 text-xs mx-auto block text-center">—</span>;
  return <span className="text-zinc-400 text-xs text-center block">{value}</span>;
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06]">
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{q}</span>
        <span className={`text-zinc-600 mt-0.5 shrink-0 transition-transform ${open ? "rotate-45" : ""}`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="text-sm text-zinc-500 leading-relaxed pb-5 -mt-1">{a}</p>
      )}
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero */}
      <section className="px-6 py-24 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-4">Pricing</p>
          <h1 className="text-4xl md:text-6xl font-bold font-[helvetica] text-white mb-5 leading-tight">
            Less than one hour{" "}
            <span className="text-zinc-500">of a consultant&apos;s time.</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto mb-8">
            Start free with open source. Upgrade to hosted when you want zero maintenance.
            This entire product was built by AI agents for ~$38 total.
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-zinc-600 border border-white/[0.06] rounded-full px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            24 cycles shipped &middot; $38.20 total cost &middot; 14 AI agents
          </div>
        </motion.div>
      </section>

      {/* Pricing cards */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={
                "relative flex flex-col " +
                (plan.highlight
                  ? "glass-card border-orange-500/30 shadow-xl shadow-orange-900/10"
                  : "glass-card")
              }
              style={{ padding: "1.5rem" }}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs text-black font-bold bg-orange-500 px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <div className="text-zinc-600 text-xs font-medium mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white font-[helvetica]">{plan.price}</span>
                  <span className="text-zinc-600 text-sm">{plan.period}</span>
                </div>
              </div>

              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">{plan.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <svg className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                target={plan.ctaExternal ? "_blank" : undefined}
                rel={plan.ctaExternal ? "noopener noreferrer" : undefined}
                className={
                  "text-center text-sm font-semibold py-3 rounded-[3px] transition-all " +
                  (plan.highlight
                    ? "bg-orange-500 hover:bg-orange-400 text-black shadow-lg shadow-orange-900/20"
                    : "border border-white/10 text-zinc-400 hover:border-white/20 hover:bg-white/[0.03]")
                }
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-zinc-700 mt-8">
          Prices in USD. Cancel anytime. No lock-in. First 50 beta users get 3 months at 50% off.
        </p>
      </section>

      {/* Comparison table */}
      <section className="px-6 pb-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">Compare plans</p>
          <h2 className="text-2xl md:text-3xl font-bold font-[helvetica] text-white mb-10">
            Everything included
          </h2>

          <div className="glass-card overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 border-b border-white/[0.06]">
              <div className="px-5 py-4 text-xs text-zinc-600 font-medium">Feature</div>
              <div className="px-5 py-4 text-xs text-zinc-400 font-medium text-center">Open Source</div>
              <div className="px-5 py-4 text-xs text-orange-400 font-medium text-center">Hosted</div>
              <div className="px-5 py-4 text-xs text-zinc-400 font-medium text-center">Pro</div>
            </div>

            {comparisonRows.map((row, i) => (
              <div
                key={row.feature}
                className={"grid grid-cols-4 " + (i < comparisonRows.length - 1 ? "border-b border-white/[0.04]" : "")}
              >
                <div className="px-5 py-3.5 text-sm text-zinc-500">{row.feature}</div>
                <div className="px-5 py-3.5 flex items-center justify-center">
                  <Cell value={row.open} />
                </div>
                <div className="px-5 py-3.5 flex items-center justify-center bg-orange-500/[0.03]">
                  <Cell value={row.hosted} />
                </div>
                <div className="px-5 py-3.5 flex items-center justify-center">
                  <Cell value={row.pro} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-bold font-[helvetica] text-white mb-10">
            Common questions
          </h2>

          <div>
            {faqs.map((faq) => (
              <FAQ key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 pb-32 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="glass-card border-orange-500/20 text-center"
          style={{ padding: "3rem 2rem" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold font-[helvetica] text-white mb-3">
            Ready to start?
          </h2>
          <p className="text-zinc-500 mb-8 max-w-lg mx-auto">
            Open-source is free today. Join the waitlist for hosted — first 50 users get 3 months at half price.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/#waitlist"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-black font-bold px-6 py-3 rounded-[3px] text-sm transition-all"
            >
              Join the waitlist
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="https://github.com/NikitaDmitrieff/auto-co-meta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/10 text-zinc-400 hover:border-white/20 hover:bg-white/[0.03] font-semibold px-6 py-3 rounded-[3px] text-sm transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Star on GitHub
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
