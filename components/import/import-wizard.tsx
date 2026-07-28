"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { BROKER_PLATFORMS, type WizardStep, type BrokerPlatform, type ImportMethod } from "@/lib/import/types";
import { useImportStore } from "@/lib/import/store";
import { platformLogos } from "@/lib/import/logotypes";
import { UploadZone } from "./upload-zone";
import { TradePreviewTable } from "./trade-preview-table";
import { ValidationPanel } from "./validation-panel";
import { ImportProgress } from "./import-progress";
import { ErrorCenter } from "./error-center";

const steps: { num: WizardStep; label: string; description: string }[] = [
  { num: 1, label: "Choose Source", description: "Select a broker or upload method" },
  { num: 2, label: "Authenticate", description: "Connect your account securely" },
  { num: 3, label: "Select Account", description: "Choose the trading account" },
  { num: 4, label: "Date Range", description: "Set the import time period" },
  { num: 5, label: "Preview Trades", description: "Review trades before import" },
  { num: 6, label: "Validation", description: "AI-powered trade validation" },
  { num: 7, label: "Import Complete", description: "Import finished" },
];

const importMethods: { id: ImportMethod; label: string; icon: keyof typeof Icons; description: string }[] = [
  { id: "oauth", label: "OAuth", icon: "Fingerprint", description: "One-click secure login" },
  { id: "api", label: "API Key", icon: "Radio", description: "Connect via API credentials" },
  { id: "csv", label: "CSV", icon: "FileText", description: "Upload a CSV file" },
  { id: "xlsx", label: "Excel", icon: "File", description: "Upload an Excel file" },
  { id: "json", label: "JSON", icon: "File", description: "Upload a JSON file" },
];

export function ImportWizard() {
  const store = useImportStore();

  const canProceed = () => {
    switch (store.wizardStep) {
      case 1: return !!store.source;
      case 2: return store.method === "oauth" || store.method === "api" ? !!store.connection : !!store.trades.length;
      case 3: return !!store.account;
      case 4: return !!store.dateRange.start && !!store.dateRange.end;
      case 5: return store.trades.length > 0;
      case 6: return store.validatedTrades.length > 0;
      case 7: return true;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (store.wizardStep === 2 && store.method && ["oauth", "api"].includes(store.method) && !store.connection) {
      await store.connectBroker();
    }
    if (store.wizardStep === 5 && store.trades.length > 0 && store.validatedTrades.length === 0) {
      await store.runValidation();
      store.runAiInsights();
    }
    if (store.wizardStep === 6) {
      await store.startImport();
    }
    if (store.wizardStep < 7) store.setStep((store.wizardStep + 1) as WizardStep);
  };

  const handleBack = () => {
    if (store.wizardStep > 1) store.setStep((store.wizardStep - 1) as WizardStep);
  };

  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b border-border p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {steps.map((s, i) => {
              const num = s.num;
              const active = num === store.wizardStep;
              const done = num < store.wizardStep;
              return (
                <div key={num} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium transition-all duration-300",
                        active && "bg-primary text-primary-foreground scale-110 shadow-sm",
                        done && "bg-success/20 text-success",
                        !active && !done && "bg-muted text-muted-foreground"
                      )}
                    >
                      {done ? <Icons.Check className="h-3 w-3" /> : num}
                    </div>
                    <span className={cn(
                      "hidden sm:inline text-xs font-medium",
                      active && "text-foreground",
                      done && "text-success",
                      !active && !done && "text-muted-foreground"
                    )}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={cn("h-px w-4 sm:w-8", done ? "bg-success/50" : "bg-muted")} />
                  )}
                </div>
              );
            })}
          </div>
          <Button variant="ghost" size="icon-sm" onClick={store.resetWizard} aria-label="Reset wizard">
            <Icons.X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={store.wizardStep}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold">{steps[store.wizardStep - 1]?.label}</h2>
              <p className="text-sm text-muted-foreground mt-1">{steps[store.wizardStep - 1]?.description}</p>
            </div>

            {store.wizardStep === 1 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-3">Select a broker platform</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {BROKER_PLATFORMS.map((platform) => {
                    const logo = platformLogos[platform.id];
                    const LogoComponent = logo?.component;
                    return (
                    <button
                      key={platform.id}
                      onClick={() => store.setSource(platform.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 hover:border-primary/40 hover:bg-primary/[0.02]",
                        store.source === platform.id
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border bg-card"
                      )}
                    >
                      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg">
                        {LogoComponent && <LogoComponent className="h-9 w-9" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{platform.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{platform.formats.join(" · ")}</p>
                      </div>
                      {store.source === platform.id && (
                        <Icons.Check className="h-4 w-4 shrink-0 text-primary" />
                      )}
                    </button>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-card px-2 text-muted-foreground">or upload a file</span>
                    </div>
                  </div>
                  <UploadZone onFile={async (file) => {
                    store.setMethod(file.name.endsWith(".json") ? "json" : file.name.endsWith(".xlsx") || file.name.endsWith(".xls") ? "xlsx" : "csv");
                    await store.processFile(file);
                  }} />
                </div>
              </div>
            )}

            {store.wizardStep === 2 && store.source && (
              <div>
                {store.method && ["oauth", "api"].includes(store.method) ? (
                  <div className="space-y-4">
                    {store.isLoading ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <div className="relative mb-4">
                          <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icons.Radio className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <p className="text-sm font-medium">Connecting to {BROKER_PLATFORMS.find((p) => p.id === store.source)?.name}...</p>
                        <p className="text-xs text-muted-foreground mt-1">Establishing secure connection</p>
                      </div>
                    ) : store.connection ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 mb-4">
                          <Icons.CheckCircle2 className="h-7 w-7 text-success" />
                        </div>
                        <p className="text-sm font-medium text-success">Connected successfully</p>
                        <p className="text-xs text-muted-foreground mt-1">{store.connection.name}</p>
                      </div>
                    ) : store.error ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error/10 mb-4">
                          <Icons.XCircle className="h-7 w-7 text-error" />
                        </div>
                        <p className="text-sm font-medium text-error">Connection failed</p>
                        <p className="text-xs text-muted-foreground mt-1">{store.error}</p>
                        <Button variant="outline" size="sm" className="mt-4" onClick={() => store.connectBroker()}>
                          <Icons.RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Retry
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-4">
                          <Icons.Radio className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Ready to connect</p>
                        <p className="text-xs text-muted-foreground mt-1">Click continue to authenticate</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Choose authentication method</p>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {importMethods.map((m) => {
                        const IconComponent = Icons[m.icon as keyof typeof Icons];
                        return (
                        <button
                          key={m.id}
                          onClick={() => store.setMethod(m.id)}
                          className={cn(
                            "flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 hover:border-primary/40",
                            store.method === m.id ? "border-primary bg-primary/5" : "border-border"
                          )}
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                            {IconComponent && <IconComponent className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{m.label}</p>
                            <p className="text-[10px] text-muted-foreground">{m.description}</p>
                          </div>
                        </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {store.wizardStep === 3 && store.connection?.accounts && (
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground mb-2">Select an account to import from</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {store.connection.accounts.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => store.setAccount(acc)}
                      className={cn(
                        "rounded-xl border p-4 text-left transition-all duration-200 hover:border-primary/40",
                        store.account?.id === acc.id ? "border-primary bg-primary/5 shadow-sm" : "border-border"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={acc.type === "live" ? "default" : "secondary"} className="text-[9px] px-1.5">
                          {acc.type.toUpperCase()}
                        </Badge>
                        {store.account?.id === acc.id && <Icons.Check className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="text-sm font-medium">{acc.name}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">{acc.number}</p>
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <span className="text-muted-foreground">{acc.currency}</span>
                        <span className="font-medium">${acc.balance.toLocaleString()}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {store.wizardStep === 4 && (
              <div className="space-y-4 max-w-sm">
                <p className="text-xs font-medium text-muted-foreground mb-2">Select date range for trades</p>
                <div>
                  <label className="text-xs font-medium mb-1.5 block">Start date</label>
                  <input
                    type="date"
                    value={store.dateRange.start}
                    onChange={(e) => store.setDateRange({ ...store.dateRange, start: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block">End date</label>
                  <input
                    type="date"
                    value={store.dateRange.end}
                    onChange={(e) => store.setDateRange({ ...store.dateRange, end: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </div>
            )}

            {store.wizardStep === 5 && (
              <div>
                {store.trades.length > 0 ? (
                  <TradePreviewTable trades={
                    store.validatedTrades.length > 0 ? store.validatedTrades : store.trades.map((t) => ({ ...t, validationStatus: "valid" as const, validationMessages: [] }))
                  } />
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Icons.Database className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="text-sm font-medium">No trades loaded</p>
                    <p className="text-xs text-muted-foreground mt-1">Go back and select a source first</p>
                  </div>
                )}
              </div>
            )}

            {store.wizardStep === 6 && (
              <div>
                {store.isLoading && store.importStatus === "validating" ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary mb-4" />
                    <p className="text-sm font-medium">Validating {store.trades.length} trades...</p>
                    <p className="text-xs text-muted-foreground mt-1">Checking for duplicates, errors, and inconsistencies</p>
                  </div>
                ) : store.validatedTrades.length > 0 ? (
                  <div className="space-y-6">
                    <ValidationPanel
                      trades={store.validatedTrades}
                      issues={store.issues}
                      aiInsights={store.aiInsights}
                    />
                    <TradePreviewTable trades={store.validatedTrades} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Icons.AlertTriangle className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="text-sm font-medium">No validation data</p>
                    <p className="text-xs text-muted-foreground mt-1">Run validation first</p>
                  </div>
                )}
              </div>
            )}

            {store.wizardStep === 7 && (
              <div>
                {store.importStatus === "completed" ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                      className="relative mb-6"
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
                        <Icons.CheckCircle2 className="h-10 w-10 text-success" />
                      </div>
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                      >
                        <Icons.Sparkles className="h-3 w-3 text-white" />
                      </motion.div>
                    </motion.div>
                    <h3 className="text-xl font-bold">Import Complete</h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-6">Your trades have been imported successfully</p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { label: "Imported", value: store.importResults?.imported || 0, color: "text-success" },
                        { label: "Skipped", value: store.importResults?.skipped || 0, color: "text-warning" },
                        { label: "Failed", value: store.importResults?.failed || 0, color: "text-error" },
                      ].map((item) => (
                        <div key={item.label} className="flex flex-col items-center rounded-xl border border-border/50 p-4">
                          <span className={cn("text-2xl font-bold", item.color)}>{item.value}</span>
                          <span className="text-xs text-muted-foreground mt-1">{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="default" onClick={() => {}}>
                        <Icons.BookOpen className="mr-1.5 h-4 w-4" /> Open Journal
                      </Button>
                      <Button variant="outline" onClick={() => {}}>
                        <Icons.BarChart3 className="mr-1.5 h-4 w-4" /> View Analytics
                      </Button>
                      <Button variant="ghost" onClick={store.resetWizard}>
                        Import More
                      </Button>
                    </div>
                  </div>
                ) : store.importStatus === "importing" ? (
                  <ImportProgress
                    progress={store.importProgress}
                    total={store.validatedTrades.length}
                    imported={store.importResults?.imported || 0}
                    skipped={store.importResults?.skipped || 0}
                    failed={store.importResults?.failed || 0}
                    onCancel={store.cancelImport}
                  />
                ) : store.error ? (
                  <ErrorCenter
                    message={store.error}
                    details={store.issues}
                    onRetry={() => store.startImport()}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Icons.Rocket className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="text-sm font-medium">Ready to import</p>
                    <p className="text-xs text-muted-foreground mt-1">Click continue to start the import</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {store.wizardStep < 7 && (
          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={handleBack} disabled={store.wizardStep === 1}>
              <Icons.ChevronLeft className="mr-1.5 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleNext} disabled={!canProceed() || store.isLoading} size="lg">
              {store.isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  Continue <Icons.ChevronRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
