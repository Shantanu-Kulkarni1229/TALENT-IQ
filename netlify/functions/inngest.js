const { serve } = require("inngest/netlify");
const { inngest, functions } = require("../../src/lib/inngest.cjs");

exports.handler = serve({
  client: inngest,
  functions,
});
