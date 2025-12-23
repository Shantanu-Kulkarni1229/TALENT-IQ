import { serve } from "inngest/netlify";
import { inngest, functions } from "../../Backend/src/lib/inngest.js";

export const handler = serve({
  client: inngest,
  functions,
});
