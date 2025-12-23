import { serve } from "inngest/express";
import { inngest, functions } from "../Backend/src/lib/inngest.js";

// Inngest endpoint handler for Vercel
export default serve({
  client: inngest,
  functions,
});
