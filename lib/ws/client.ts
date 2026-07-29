"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export type WsMessage =
  | { type: "price"; symbol: string; price: number; bid: number; ask: number; change: number; timestamp: string }
  | { type: "trade"; symbol: string; price: number; volume: number; side: "buy" | "sell"; timestamp: string }
  | { type: "connected"; channel: string; timestamp: string };

type WsOptions = {
  url?: string;
  channel?: string;
  onMessage?: (msg: WsMessage) => void;
  reconnect?: boolean;
};

export function useWebSocket({ url = "ws://localhost:3001", channel = "prices", onMessage, reconnect = true }: WsOptions = {}) {
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [lastMessage, setLastMessage] = useState<WsMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef(reconnect);
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
        setLastMessage(msg);
        onMessageRef.current?.(msg);
      } catch { /* ignore */ }
    };

    ws.onclose = () => {
      setStatus("disconnected");
      if (reconnectRef.current) {
        setTimeout(connect, 2000);
      }
    };

    ws.onerror = () => ws.close();
  }, [url, channel]);

  const subscribe = useCallback((symbol: string) => {
    wsRef.current?.send(JSON.stringify({ type: "subscribe", symbol }));
  }, []);

  const disconnect = useCallback(() => {
    reconnectRef.current = false;
    wsRef.current?.close();
    wsRef.current = null;
  }, []);

  useEffect(() => {
    connect();
    return () => { reconnectRef.current = false; wsRef.current?.close(); };
  }, [connect]);

  return { status, lastMessage, subscribe, disconnect, connect };
}
