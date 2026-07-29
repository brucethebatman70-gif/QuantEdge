"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PlaybookHeader } from "@/components/playbooks/playbook-header";
import { PlaybookSidebar } from "@/components/playbooks/playbook-sidebar";
import { PlaybookLibrary } from "@/components/playbooks/playbook-library";
import { PlaybookEditor } from "@/components/playbooks/playbook-editor";
import { usePlaybookStore } from "@/lib/playbooks/store";

export default function PlaybooksPage() {
  const { isLibraryView } = usePlaybookStore();

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <PlaybookHeader />
        <div className="flex flex-1 overflow-hidden">
          <PlaybookSidebar />
          {isLibraryView ? <PlaybookLibrary /> : <PlaybookEditor />}
        </div>
      </div>
    </DashboardLayout>
  );
}
