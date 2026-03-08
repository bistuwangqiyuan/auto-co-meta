import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auto-Co Dashboard",
  description: "Control and monitor your autonomous AI company.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        <nav className="h-12 border-b border-slate-200 flex items-center justify-between px-4 lg:px-6">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo-ac.png" alt="Auto-Co" className="h-5" />
            <span className="text-sm font-semibold text-slate-900">auto-co</span>
          </a>
          <div className="relative group">
            <button className="text-xs font-mono text-slate-500 hover:text-slate-700 uppercase tracking-wide px-3 py-1.5 border border-slate-200 hover:border-slate-300 transition-colors">
              Menu
            </button>
            <div className="hidden group-hover:block absolute right-0 top-full mt-1 w-40 bg-white border border-slate-200 shadow-sm z-50">
              <a href="/" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Portfolio</a>
              <a href="/company" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Dashboard</a>
              <a href="https://runautoco.com" target="_blank" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Website</a>
              <a href="https://github.com/NikitaDmitrieff/auto-co-meta" target="_blank" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">GitHub</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
