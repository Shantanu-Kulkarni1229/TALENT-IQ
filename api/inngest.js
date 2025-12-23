// Test if basic serverless function works
export default async function handler(req, res) {
  try {
    // Try importing
    const { serve } = await import("inngest/express");
    const { inngest, functions } = await import("../Backend/src/lib/inngest.js");
    
    // Create the Inngest handler
    const inngestHandler = serve({
      client: inngest,
      functions,
    });
    
    // Call the handler
    return inngestHandler(req, res);
  } catch (error) {
    console.error("Error in Inngest handler:", error);
    return res.status(500).json({ 
      error: error.message, 
      stack: error.stack,
      name: error.name 
    });
  }
}
