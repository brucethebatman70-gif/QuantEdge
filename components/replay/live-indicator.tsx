"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useReplayStore } from "@/lib/replay/store";

export function LiveIndicator() {
  const { isLiveConnected, livePrice, setLivePrice, setLiveConnected } = useReplayStore();

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout>;

    function connect() {
      ws = new WebSocket("ws://localhost:3001?channel=prices");
      ws.onopen = () => setLiveConnected(true);
      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === "price") {
            setLivePrice({ price: msg.price, bid: msg.bid, ask: msg.ask, change: msg.change, symbol: msg.symbol });
          }
        } catch { /* ignore */ }
      };
      ws.onclose = () => {
        setLiveConnected(false);
        reconnectTimer = setTimeout(connect, 3000);
      };
      ws.onerror = () => ws?.close();
    }

    connect();
    return () => { clearTimeout(reconnectTimer); ws?.close(); };
  }, []);

  if (!isLiveConnected) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/5 px-2.5 py-1.5">
      <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
      <span className="text-[10px] font-medium text-success">
        {livePrice?.symbol} ${livePrice?.price.toFixed(2)}
      </span>
      <Badge variant={livePrice && livePrice.change >= 0 ? "success" : "destructive"} className="text-[8px] px-1">
        {livePrice?.change ? (livePrice.change >= 0 ? "+" : "") + livePrice.change.toFixed(2) : "0.00"}
      </Badge>
    </div>
  );
}
