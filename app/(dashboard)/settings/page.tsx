"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SettingsNav } from "@/components/settings/settings-nav";
import { SettingsHelpPanel } from "@/components/settings/settings-help-panel";
import { SettingsProfile } from "@/components/settings/settings-profile";
import { SettingsWorkspace } from "@/components/settings/settings-workspace";
import { SettingsAppearance } from "@/components/settings/settings-appearance";
import { SettingsNotifications } from "@/components/settings/settings-notifications";
import { SettingsBrokerConnections } from "@/components/settings/settings-broker-connections";
import { SettingsAiPreferences } from "@/components/settings/settings-ai-preferences";
import { SettingsSecurity } from "@/components/settings/settings-security";
import { SettingsPrivacy } from "@/components/settings/settings-privacy";
import { SettingsApiKeys } from "@/components/settings/settings-api-keys";
import { SettingsIntegrations } from "@/components/settings/settings-integrations";
import { SettingsBilling } from "@/components/settings/settings-billing";
import { SettingsKeyboardShortcuts } from "@/components/settings/settings-keyboard-shortcuts";
import { SettingsAbout } from "@/components/settings/settings-about";
import { useSettingsStore } from "@/lib/settings/store";
import { NAV_ITEMS } from "@/lib/settings/types";

const SECTION_MAP: Record<string, React.ReactNode> = {
  "profile": <SettingsProfile />,
  "workspace": <SettingsWorkspace />,
  "appearance": <SettingsAppearance />,
  "notifications": <SettingsNotifications />,
  "broker-connections": <SettingsBrokerConnections />,
  "ai-preferences": <SettingsAiPreferences />,
  "security": <SettingsSecurity />,
  "privacy": <SettingsPrivacy />,
  "api-keys": <SettingsApiKeys />,
  "integrations": <SettingsIntegrations />,
  "billing": <SettingsBilling />,
  "keyboard-shortcuts": <SettingsKeyboardShortcuts />,
  "about": <SettingsAbout />,
};

export default function SettingsPage() {
  const { activeNav } = useSettingsStore();
  const currentItem = NAV_ITEMS.find((n) => n.id === activeNav);

  return (
    <div className="h-full flex overflow-hidden">
      <SettingsNav />
      <main className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNav}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {currentItem && (
              <div className="mb-6">
                <h1 className="text-lg font-semibold text-foreground">{currentItem.label}</h1>
              </div>
            )}
            {SECTION_MAP[activeNav]}
          </motion.div>
        </AnimatePresence>
      </main>
      <SettingsHelpPanel />
    </div>
  );
}
