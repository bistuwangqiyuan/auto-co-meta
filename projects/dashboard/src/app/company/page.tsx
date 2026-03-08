"use client";

import CompanyHeader from "@/components/CompanyHeader";
import ActivityWidget from "@/components/widgets/ActivityWidget";
import CycleStatusWidget from "@/components/widgets/CycleStatusWidget";
import TeamWidget from "@/components/widgets/TeamWidget";
import TasksWidget from "@/components/widgets/TasksWidget";
import FinanceWidget from "@/components/widgets/FinanceWidget";
import GitHubWidget from "@/components/widgets/GitHubWidget";
import DocumentsWidget from "@/components/widgets/DocumentsWidget";
import ChatWidget from "@/components/widgets/ChatWidget";

export default function CompanyDashboardPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <CompanyHeader />

        <div className="px-4 lg:px-6 pb-12 max-w-6xl mx-auto">
          {/* Row 1: Activity (hero — full width) */}
          <div className="mb-4">
            <ActivityWidget />
          </div>

          {/* Row 2: GitHub (killer feature — #2 priority) */}
          <div className="mb-4">
            <GitHubWidget />
          </div>

          {/* Row 3: Cycle Status + Team */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-1">
              <CycleStatusWidget />
            </div>
            <div className="lg:col-span-2">
              <TeamWidget />
            </div>
          </div>

          {/* Row 4: Finance (full width) */}
          <div className="mb-4">
            <FinanceWidget />
          </div>

          {/* Row 5: Documents + Tasks (collapsed by default) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DocumentsWidget />
            <TasksWidget />
          </div>
        </div>
      </div>

      {/* Chat — persistent side panel (desktop) / bottom drawer (mobile) */}
      <div className="lg:w-[360px] lg:border-l border-t lg:border-t-0 border-slate-200 flex-shrink-0 lg:sticky lg:top-0 lg:h-screen">
        <ChatWidget persistent />
      </div>
    </div>
  );
}
