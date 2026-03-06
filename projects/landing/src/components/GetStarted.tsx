const steps = [
  {
    step: "01",
    title: "Clone the repo",
    code: "git clone https://github.com/auto-co/auto-co\ncd auto-co",
  },
  {
    step: "02",
    title: "Configure your API key",
    code: "cp .env.example .env\n# Add ANTHROPIC_API_KEY to .env",
  },
  {
    step: "03",
    title: "Start the loop",
    code: "make start\n# Or with Docker:\nmake docker-start",
  },
  {
    step: "04",
    title: "Watch it run",
    code: "make monitor\n# Tail live cycle logs",
  },
];

export default function GetStarted() {
  return (
    <section id="get-started" className="px-6 py-24 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
        Get started in 5 minutes.
      </h2>
      <p className="text-[#666] mb-16 max-w-xl">
        You need: an Anthropic API key, Node.js 20+, and git. That&apos;s it.
      </p>

      <div className="space-y-6">
        {steps.map((s) => (
          <div key={s.step} className="flex gap-6 items-start">
            <div className="text-[#00ff88] font-bold text-sm w-8 shrink-0 pt-1">
              {s.step}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-sm mb-3">{s.title}</h3>
              <pre className="bg-[#111] border border-[#1a1a1a] rounded-lg p-4 text-[#888] text-sm overflow-x-auto whitespace-pre">
                {s.code}
              </pre>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 border border-[#1a1a1a] rounded-xl p-8 text-center">
        <h3 className="text-white font-bold mb-3">Ready to run your AI company?</h3>
        <p className="text-[#666] text-sm mb-6">
          Star the repo, fork it, and start shipping.
        </p>
        <a
          href="https://github.com/auto-co/auto-co"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#00ff88] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00e07a] transition-colors text-sm"
        >
          View on GitHub
        </a>
      </div>
    </section>
  );
}
