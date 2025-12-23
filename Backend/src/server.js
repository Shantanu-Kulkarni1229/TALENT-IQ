import express from 'express';
import { ENV } from "./lib/env.js";
import { connectDB } from './lib/db.js';
import cors from 'cors';
import {serve} from 'inngest/express';
import { inngest } from './lib/inngest.js';

const app = express();

//Middlewares
app.use(express.json());
// CREDENTIAL TRUE = ALLOWS COOKIES TO BE SENT
app.use(cors({origin: ENV.CLIENT_URL , credentials: true}));

app.use("/api/inngest" , serve({
    client: inngest,
    functions
}));

//Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" });
})



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