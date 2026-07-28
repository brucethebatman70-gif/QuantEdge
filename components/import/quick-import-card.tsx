"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/lib/icons";
import { BROKER_PLATFORMS, type BrokerPlatform } from "@/lib/import/types";
import { platformLogos } from "@/lib/import/logotypes";

interface QuickImportCardProps {
  platform: (typeof BROKER_PLATFORMS)[number];
  onConnect: (id: BrokerPlatform) => void;
  disabled?: boolean;
}

export function QuickImportCard({ platform, onConnect, disabled }: QuickImportCardProps) {
  const logo = platformLogos[platform.id];
  const LogoComponent = logo?.component;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-xl border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div className="h-10 w-10 overflow-hidden rounded-lg shadow-sm">
            {LogoComponent && <LogoComponent className="h-10 w-10" />}
          </div>
          <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
            {platform.formats.join(" · ")}
          </Badge>
        </div>

        <h3 className="text-sm font-semibold mb-1">{platform.name}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {platform.description}
        </p>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onConnect(platform.id)}
            disabled={disabled}
          >
            <Icons.Link className="mr-1.5 h-3.5 w-3.5" />
            Connect
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            disabled={disabled}
            aria-label="Upload file"
          >
            <Icons.Upload className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}
