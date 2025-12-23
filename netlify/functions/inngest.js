const { serve } = require("inngest/netlify");
const { inngest, functions } = require("../../Backend/src/lib/inngest.cjs");

exports.handler = serve({
  client: inngest,
  functions,
});
