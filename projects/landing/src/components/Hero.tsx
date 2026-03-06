"use client";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-24 max-w-4xl mx-auto">
      {/* Badge */}
      <div className="mb-8">
        <span className="text-xs font-medium text-[#00ff88] border border-[#00ff88]/30 px-3 py-1 rounded-full">
          Early Access — Join the waitlist
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
        Your AI team works
        <br />
        <span className="text-[#00ff88]">while you sleep.</span>
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-[#999] max-w-2xl mb-8 leading-relaxed">
        14 AI agents — CEO, CTO, engineer, marketer, and more — autonomously
        build, deploy, and grow your digital product. No code required.
      </p>

      {/* Outcome pills */}
      <div className="flex flex-wrap gap-3 mb-12">
        {[
          "Wake up to a deployed website",
          "10 blog posts written overnight",
          "Marketing plan ready by morning",
          "Bugs fixed while you were at dinner",
        ].map((outcome) => (
          <span
            key={outcome}
            className="text-xs text-[#888] border border-[#222] px-3 py-1.5 rounded-full"
          >
            {outcome}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="#waitlist"
          className="inline-flex items-center justify-center gap-2 bg-[#00ff88] text-black font-bold px-8 py-3.5 rounded-lg hover:bg-[#00e07a] transition-colors text-sm"
        >
          Launch your AI company
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
        <a
          href="#how-it-works"
          className="inline-flex items-center justify-center gap-2 border border-[#333] text-[#999] px-8 py-3.5 rounded-lg hover:border-[#555] hover:text-white transition-colors text-sm"
        >
          See how it works
        </a>
      </div>

      {/* Social proof */}
      <p className="mt-8 text-xs text-[#555]">
        Open-source core · Self-host free or use the hosted version · $49/mo
      </p>
    </section>
  );
}
