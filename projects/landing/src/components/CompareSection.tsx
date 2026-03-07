"use client";
import { motion } from "motion/react";
import { Compare } from "@/components/ui/compare";

export default function CompareSection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 mb-6">
            <span className="text-xs text-orange-300 font-medium">One product. Two audiences.</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built for founders <span className="text-zinc-500">&</span> developers
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            Founders get a live AI company dashboard. Developers get raw logs, agent outputs, and full source control.
            Drag to compare.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {/* Labels */}
          <div className="flex justify-between text-xs text-zinc-500 mb-3 px-2">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              <span>For founders — Dashboard view</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>For developers — Activity log</span>
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            </div>
          </div>

          {/* Compare widget */}
          <div className="rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-black/60" style={{ height: "420px" }}>
            <Compare
              firstImage="/screenshots/demo-full.png"
              secondImage="/screenshots/demo-activity.png"
              firstImageClassName="object-cover object-left-top"
              secondImageClassname="object-cover object-left-top"
              className="w-full h-full"
              slideMode="hover"
              autoplay={true}
            />
          </div>

          {/* Sub-caption */}
          <p className="mt-4 text-center text-xs text-zinc-600">
            Hover or drag to compare views &middot; <a href="/demo" className="text-zinc-500 hover:text-zinc-300 transition-colors">Open live dashboard &rarr;</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
