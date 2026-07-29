import { spawn } from "child_process";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const nextProcess = spawn("npx", ["next", "dev"], { stdio: "inherit", shell: true });

const port = process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 3001;
const httpServer = createServer();
const wss = new WebSocketServer({ server: httpServer });

const streams = new Map();

wss.on("connection", (ws, req) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const channel = url.searchParams.get("channel") || "prices";

  ws.on("message", (data) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.type === "subscribe" && msg.symbol) {
        const k = `${req.socket.remotePort}`;
        const existing = streams.get(k);
        if (existing) clearInterval(existing);
        let price = { AAPL: 243.50, TSLA: 267.80, NVDA: 895.20, SPY: 548.30, MSFT: 472.40, AMZN: 198.50, GOOGL: 175.20, META: 512.40 }[msg.symbol] || 100;
        const interval = setInterval(() => {
          const change = (Math.random() - 0.5) * 0.8;
          price += change;
          ws.send(JSON.stringify({ type: "price", symbol: msg.symbol, price, bid: price - 0.02, ask: price + 0.02, change, timestamp: new Date().toISOString() }));
        }, 250);
        streams.set(k, interval);
      }
    } catch { /* ignore */ }
  });

  if (channel === "trades") {
    const symbols = ["AAPL", "TSLA", "NVDA", "SPY", "MSFT", "AMZN", "GOOGL", "META"];
    const k = `${req.socket.remotePort}`;
    const interval = setInterval(() => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      ws.send(JSON.stringify({ type: "trade", symbol, price: 100 + Math.random() * 800, volume: Math.floor(Math.random() * 50000) + 1000, side: Math.random() > 0.5 ? "buy" : "sell", timestamp: new Date().toISOString() }));
    }, 1000);
    streams.set(k, interval);
  } else {
    const k = `${req.socket.remotePort}`;
    let price = 243.50;
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.8;
      price += change;
      ws.send(JSON.stringify({ type: "price", symbol: "AAPL", price, bid: price - 0.02, ask: price + 0.02, change, timestamp: new Date().toISOString() }));
    }, 250);
    streams.set(k, interval);
  }

  ws.send(JSON.stringify({ type: "connected", channel, timestamp: new Date().toISOString() }));
  ws.on("close", () => { const k = `${req.socket.remotePort}`; const i = streams.get(k); if (i) clearInterval(i); streams.delete(k); });
});

httpServer.listen(port, () => console.log(`[ws] server on ws://localhost:${port}`));

process.on("SIGINT", () => { nextProcess.kill(); wss.close(); process.exit(); });
process.on("SIGTERM", () => { nextProcess.kill(); wss.close(); process.exit(); });
