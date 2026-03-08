"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import state from "@/data";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/live", label: "Live" },
  { href: "/team", label: "Team" },
  { href: "/finance", label: "Finance" },
  { href: "/github", label: "GitHub" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 -ml-2 text-slate-500 hover:text-slate-900"
        aria-label="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="4" width="16" height="1.5" fill="currentColor" />
          <rect x="2" y="9.25" width="16" height="1.5" fill="currentColor" />
          <rect x="2" y="14.5" width="16" height="1.5" fill="currentColor" />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-slate-200 z-50 flex flex-col">
            {/* Header */}
            <div className="px-5 py-5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-accent flex items-center justify-center">
                  <span className="text-white text-xs font-bold font-mono">AC</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">auto-co</div>
                  <div className="text-[10px] text-slate-400 font-mono">v1.1.1</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-900"
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-3 px-3">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors mb-0.5 ${
                      isActive
                        ? "bg-accent/10 text-accent border-l-2 border-accent -ml-px"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-l-2 border-transparent -ml-px"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-slate-200">
              <div className="text-[10px] text-slate-400 font-mono">Cycle #{state.cycle}</div>
              <div className="text-[10px] text-slate-400">Running</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
