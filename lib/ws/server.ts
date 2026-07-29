import { WebSocketServer, WebSocket } from "ws";
import { createServer, IncomingMessage } from "http";

let wss: WebSocketServer | null = null;

const streams = new Map<string, NodeJS.Timeout>();

function simulatePriceStream(ws: WebSocket, symbol: string) {
  let price = symbol === "AAPL" ? 243.50 : symbol === "TSLA" ? 267.80 : symbol === "NVDA" ? 895.20 : symbol === "SPY" ? 548.30 : symbol === "MSFT" ? 472.40 : symbol === "AMZN" ? 198.50 : symbol === "GOOGL" ? 175.20 : symbol === "META" ? 512.40 : 100.00;
  const interval = setInterval(() => {
    const change = (Math.random() - 0.5) * 0.8;
    price += change;
    const bid = price - 0.02;
    const ask = price + 0.02;
    ws.send(JSON.stringify({ type: "price", symbol, price, bid, ask, change, timestamp: new Date().toISOString() }));
  }, 250);
  return interval;
}

function simulateTradeStream(ws: WebSocket) {
  const symbols = ["AAPL", "TSLA", "NVDA", "SPY", "MSFT", "AMZN", "GOOGL", "META"];
  const interval = setInterval(() => {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const volume = Math.floor(Math.random() * 50000) + 1000;
    const side = Math.random() > 0.5 ? "buy" : "sell";
    const price = 100 + Math.random() * 800;
    ws.send(JSON.stringify({ type: "trade", symbol, price, volume, side, timestamp: new Date().toISOString() }));
  }, 1000);
  return interval;
}

export function startWSServer(port = 3001) {
  if (wss) return;

  const server = createServer();
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    const channel = url.searchParams.get("channel") || "prices";

    ws.on("message", (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === "subscribe" && msg.symbol) {
          const existing = streams.get(ws.url || "");
          if (existing) clearInterval(existing);
          const interval = simulatePriceStream(ws, msg.symbol);
          streams.set(ws.url || "", interval);
        }
      } catch { /* ignore invalid messages */ }
    });

    if (channel === "trades") {
      streams.set(ws.url || "", simulateTradeStream(ws));
    } else {
      streams.set(ws.url || "", simulatePriceStream(ws, "AAPL"));
    }

    ws.send(JSON.stringify({ type: "connected", channel, timestamp: new Date().toISOString() }));

    ws.on("close", () => {
      const interval = streams.get(ws.url || "");
      if (interval) clearInterval(interval);
      streams.delete(ws.url || "");
    });
  });

  server.listen(port, () => {
    console.log(`[WS] WebSocket server running on ws://localhost:${port}`);
  });
}

export function stopWSServer() {
  streams.forEach((interval) => clearInterval(interval));
  streams.clear();
  wss?.close();
  wss = null;
}
