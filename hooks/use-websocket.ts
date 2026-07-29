"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export type WsMessage =
  | { type: "price"; symbol: string; price: number; bid: number; ask: number; change: number; timestamp: string }
  | { type: "trade"; symbol: string; price: number; volume: number; side: "buy" | "sell"; timestamp: string }
  | { type: "connected"; channel: string; timestamp: string };

interface UseWsOptions {
  url?: string;
  channel?: string;
  onMessage?: (msg: WsMessage) => void;
  autoConnect?: boolean;
}

export function useWebSocket({ url = "ws://localhost:3001", channel = "prices", onMessage, autoConnect = true }: UseWsOptions = {}) {
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const wsRef = useRef<WebSocket | null>(null);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;
    setStatus("connecting");
    const ws = new WebSocket(`${url}?channel=${channel}`);
    wsRef.current = ws;
    ws.onopen = () => setStatus("connected");
    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data) as WsMessage;
        onMessageRef.current?.(msg);
      } catch { /* ignore */ }
    };
    ws.onclose = () => {
      setStatus("disconnected");
    };
    ws.onerror = () => ws.close();
  }, [url, channel]);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
    setStatus("disconnected");
  }, []);

  const subscribe = useCallback((symbol: string) => {
    wsRef.current?.send(JSON.stringify({ type: "subscribe", symbol }));
  }, []);

  useEffect(() => {
    if (autoConnect) connect();
    return disconnect;
  }, [autoConnect, connect, disconnect]);

  return { status, connect, disconnect, subscribe };
}
