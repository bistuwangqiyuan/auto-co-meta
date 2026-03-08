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
    <div>
      <CompanyHeader />

      <div className="px-4 lg:px-6 pb-12 max-w-7xl mx-auto">
        {/* Row 1: Activity (hero) + Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2">
            <ActivityWidget />
          </div>
          <div className="lg:col-span-1">
            <ChatWidget />
          </div>
        </div>

        {/* Row 2: Cycle Status + Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-1">
            <CycleStatusWidget />
          </div>
          <div className="lg:col-span-2">
            <TasksWidget />
          </div>
        </div>

        {/* Row 3: Team (full width) */}
        <div className="mb-4">
          <TeamWidget />
        </div>

        {/* Row 4: Finance + GitHub */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-1">
            <FinanceWidget />
          </div>
          <div className="lg:col-span-2">
            <GitHubWidget />
          </div>
        </div>

        {/* Row 5: Documents (full width) */}
        <div>
          <DocumentsWidget />
        </div>
      </div>
    </div>
  );
}
