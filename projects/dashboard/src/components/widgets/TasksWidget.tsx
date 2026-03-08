"use client";

import { useState } from "react";
import state from "@/data";

const PRIORITY_STYLES: Record<string, string> = {
  critical: "bg-red-50 text-red-600",
  high: "bg-accent/10 text-accent",
  medium: "bg-amber-50 text-amber-600",
  low: "bg-slate-100 text-slate-500",
};

const STATUS_STYLES: Record<string, string> = {
  todo: "bg-slate-100 text-slate-600",
  doing: "bg-accent/10 text-accent",
  done: "bg-green-50 text-green-600",
  blocked: "bg-red-50 text-red-600",
};

export default function TasksWidget() {
  const [showCompleted, setShowCompleted] = useState(false);
  const { tasks } = state;

  const activeTasks = tasks.filter((t) => t.status !== "done");
  const completedTasks = tasks.filter((t) => t.status === "done");
  const visibleTasks = showCompleted ? tasks : activeTasks;

  return (
    <div className="border border-slate-200">
      <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">
          Tasks
        </h3>
        <span className="text-[10px] font-mono text-slate-400">
          {activeTasks.length} active
        </span>
      </div>
      <div className="p-4 space-y-2">
        {visibleTasks.length === 0 && (
          <div className="text-sm text-slate-400 py-4 text-center">No tasks</div>
        )}
        {visibleTasks.map((task, i) => (
          <div key={task.id || i} className="border border-slate-100 p-3">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="text-sm text-slate-700 flex-1">{task.description}</div>
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 uppercase flex-shrink-0 ${
                PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium
              }`}>
                {task.priority}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 uppercase ${
                STATUS_STYLES[task.status] || STATUS_STYLES.todo
              }`}>
                {task.status === "doing" ? "In Progress" : task.status}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {task.owner}
              </span>
              <span className="text-[10px] font-mono text-slate-300 ml-auto">
                c{task.cycle}
              </span>
            </div>
          </div>
        ))}

        {completedTasks.length > 0 && !showCompleted && (
          <button
            onClick={() => setShowCompleted(true)}
            className="text-[10px] font-mono text-slate-400 hover:text-slate-600 pt-1"
          >
            + {completedTasks.length} completed
          </button>
        )}
        {showCompleted && completedTasks.length > 0 && (
          <button
            onClick={() => setShowCompleted(false)}
            className="text-[10px] font-mono text-slate-400 hover:text-slate-600 pt-1"
          >
            Hide completed
          </button>
        )}
      </div>
    </div>
  );
}
