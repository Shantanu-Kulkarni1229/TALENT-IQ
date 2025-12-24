import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "../lib/inngest.js";
import { ENV } from "../lib/env.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true,
}));

app.use("/api/inngest", serve({
  client: inngest,
  functions,
}));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

export default app;
