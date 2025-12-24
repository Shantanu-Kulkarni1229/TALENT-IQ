import express from 'express';
import { ENV } from "./lib/env.js";
import { connectDB } from './lib/db.js';
import cors from 'cors';
import {serve} from 'inngest/express';
import { inngest , functions } from './lib/inngest.js';
import path from "path";

const app = express();
const __dirname = path.resolve();
const __dirname = path.resolve();
//Middlewares
app.use(express.json());
// CREDENTIAL TRUE = ALLOWS COOKIES TO BE SENT
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({
    client: inngest,
    functions
}));

//Routes
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "this is the books endpoint" });
});

// Test endpoint to check Inngest webhook
app.post("/api/test-inngest", async (req, res) => {
  try {
    await inngest.send({
      name: "clerk/user.created",
      data: req.body
    });
    res.status(200).json({ msg: "Event sent to Inngest", data: req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => {
            console.log(`Server is running on port ${ENV.PORT}`);

        });

    } catch (error) {
        console.error(`Error Starting Server: ${error.message}`);
        process.exit(1);
    }

}

startServer();