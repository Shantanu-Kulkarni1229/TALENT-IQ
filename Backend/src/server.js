import express from 'express';
import { ENV } from "./lib/env.js";
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { serve } from 'inngest/express';
import { inngest , functions } from './lib/inngest.cjs';
import path from 'path';
const app = express();
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
    res.status(200).json({ message: "Server is running" });
})
app.get("/books", (req, res) => {
    res.status(200).json({ message: "Server is running" });
})

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    }
    );
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