import { serve } from "inngest/express";
import { inngest, functions } from "../src/lib/inngest.js";

// Inngest endpoint handler for Vercel
export default serve({
  client: inngest,
  functions,
});
