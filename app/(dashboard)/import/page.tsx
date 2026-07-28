"use client";

import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/lib/icons";
import { QuickImportCard } from "@/components/import/quick-import-card";
import { ImportWizard } from "@/components/import/import-wizard";
import { ImportHistory } from "@/components/import/import-history";
import { BROKER_PLATFORMS, type BrokerPlatform } from "@/lib/import/types";
import { useImportStore } from "@/lib/import/store";

export default function ImportPage() {
  const { source, setSource, setStep, history, loadHistory, deleteHistoryItem, reimportHistoryItem } = useImportStore();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleQuickConnect = (platformId: BrokerPlatform) => {
    setSource(platformId);
    setStep(2);
  };

  return (
    <DashboardLayout title="Import Center">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Import Center</h2>
            <p className="text-sm text-muted-foreground">
              Import your trades from brokers, platforms or files.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm">
              <Icons.Upload className="mr-1.5 h-4 w-4" /> Import Trades
            </Button>
            <Button variant="outline" size="sm">
              <Icons.Link className="mr-1.5 h-4 w-4" /> Connect Broker
            </Button>
            <Button variant="ghost" size="sm">
              <Icons.Clock className="mr-1.5 h-4 w-4" /> History
            </Button>
          </div>
        </div>

        <Tabs defaultValue="quick-import">
          <TabsList>
            <TabsTrigger value="quick-import">Quick Import</TabsTrigger>
            <TabsTrigger value="wizard">Import Wizard</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="quick-import" className="space-y-6 mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {BROKER_PLATFORMS.map((platform, i) => (
                <QuickImportCard
                  key={platform.id}
                  platform={platform}
                  onConnect={handleQuickConnect}
                  disabled={false}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wizard" className="mt-4">
            {source ? (
              <ImportWizard />
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                  <Icons.Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Start Your Import</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
                  Select a broker from Quick Import or choose a file to begin the guided import wizard.
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => (document.querySelector('[data-value="quick-import"]') as HTMLElement)?.click()}>
                    Browse Brokers
                  </Button>
                  <Button variant="outline">
                    <Icons.Upload className="mr-1.5 h-4 w-4" /> Upload File
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <ImportHistory
              items={history}
              onDelete={deleteHistoryItem}
              onReimport={reimportHistoryItem}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
