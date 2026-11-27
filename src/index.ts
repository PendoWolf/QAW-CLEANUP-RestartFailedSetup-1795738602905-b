import * as pendo from "pendo-server-sdk";
import { createApp } from "./app.js";

// Pendo Agent Analytics for the Tripwise Assistant. Set PENDO_DISABLED=true to turn it off.
pendo.init({
  apiKey: "507528fa-6974-44a0-8777-8e6c48a82254",
  agentId: "IR6_0MBq7BL03jEf6jw98lpA4O0",
  endpoint: "https://app.pendo-dev.pendo-dev.com",
  autoPatch: true,
});

const port = Number(process.env.PORT) || 3001;
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

const server = createApp(corsOrigin).listen(port, () => {
  console.log(`Tripwise API on port ${port}, allowing ${corsOrigin}`);
});

// Sends Pendo's last buffered events before the process exits.
async function stop(): Promise<void> {
  server.close();
  await pendo.shutdown();
  process.exit(0);
}
process.on("SIGINT", () => void stop());
process.on("SIGTERM", () => void stop());
