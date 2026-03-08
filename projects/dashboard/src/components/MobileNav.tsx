"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import state from "@/data";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/live", label: "Live" },
  { href: "/team", label: "Team" },
  { href: "/finance", label: "Finance" },
  { href: "/github", label: "GitHub" },
  { href: "/settings", label: "Settings" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      {/* Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 -ml-2 text-zinc-400 hover:text-white"
        aria-label="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="4" width="16" height="1.5" fill="currentColor" />
          <rect x="2" y="9.25" width="16" height="1.5" fill="currentColor" />
          <rect x="2" y="14.5" width="16" height="1.5" fill="currentColor" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-64 h-screen bg-zinc-950 border-r border-white/[0.1] z-50 flex flex-col shadow-xl shadow-black/50"
            >
              {/* Header */}
              <div className="px-4 py-4 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <Image src="/logo-ac.png" alt="AC" width={24} height={18} className="opacity-80" />
                  </div>
                  <span className="text-[11px] font-bold text-white">
                    C{state.cycle}{" "}
                    <span className="text-zinc-600 font-normal">&middot; running</span>
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 text-zinc-500 hover:text-white"
                  aria-label="Close menu"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>

              {/* Nav */}
              <nav className="flex-1 py-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center px-4 py-3 text-sm font-medium transition-all border-b border-white/[0.04] ${
                        isActive
                          ? "bg-orange-500/10 text-orange-400 border-l-2 border-l-orange-500"
                          : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03] border-l-2 border-l-transparent"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-white/[0.08]">
                <div className="text-[10px] text-zinc-500 font-mono">
                  ${state.metrics.totalCost.toFixed(2)} total
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
