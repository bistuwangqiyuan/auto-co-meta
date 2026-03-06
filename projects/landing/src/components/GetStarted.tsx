"use client";

export default function GetStarted() {
  return (
    <section id="waitlist" className="px-6 py-24 max-w-4xl mx-auto">
      {/* Waitlist */}
      <div className="border border-[#00ff88]/20 bg-[#00ff88]/5 rounded-2xl p-10 text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Get early access.
        </h2>
        <p className="text-[#999] max-w-lg mx-auto mb-8 leading-relaxed">
          The hosted version is coming soon. Join the waitlist and we&apos;ll
          notify you when it&apos;s ready — plus early-bird pricing.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-[#0a0a0a] border border-[#222] text-white placeholder-[#555] px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#00ff88]/50"
          />
          <button
            type="submit"
            className="bg-[#00ff88] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00e07a] transition-colors text-sm whitespace-nowrap"
          >
            Join waitlist
          </button>
        </form>
        <p className="mt-4 text-xs text-[#555]">No spam. Unsubscribe anytime.</p>
      </div>

      {/* Developer path */}
      <div className="border border-[#1a1a1a] rounded-xl p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-white font-bold mb-2">
              Developer? Self-host for free.
            </h3>
            <p className="text-[#666] text-sm max-w-md leading-relaxed">
              The full source code is on GitHub under MIT license. Clone it,
              customize the agents, and run it on your own infrastructure.
            </p>
          </div>
          <a
            href="https://github.com/NikitaDmitrieff/auto-co-meta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#333] text-[#999] px-5 py-2.5 rounded-lg hover:border-[#555] hover:text-white transition-colors text-sm whitespace-nowrap"
          >
            View on GitHub
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
