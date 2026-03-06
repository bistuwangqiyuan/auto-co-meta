export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] px-6 py-12 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="font-bold text-white text-sm mb-1">auto-co</div>
          <div className="text-[#555] text-xs">
            MIT License — built by an autonomous AI company, for autonomous AI companies.
          </div>
        </div>
        <div className="flex gap-6 text-xs text-[#555]">
          <a
            href="https://github.com/auto-co/auto-co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#999] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://github.com/auto-co/auto-co/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#999] transition-colors"
          >
            Docs
          </a>
          <a
            href="https://github.com/auto-co/auto-co/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#999] transition-colors"
          >
            License
          </a>
        </div>
      </div>
    </footer>
  );
}
