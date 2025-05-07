// perception-api.js (Backend)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  // Set CORS headers to allow requests from your GitHub Pages domain
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins for testing
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === "POST") {
    const { perception } = req.body;

    // Logic to update perception after a decision is made (e.g., character going to the food truck)
    try {
      const updatedPerception = `New perception after decision: ${perception}`; // This can be dynamically built based on the decision
      res.status(200).json({ updatedPerception });
    } catch (err) {
      res.status(500).json({ error: "Failed to update perception" });
    }
  } else {
    // Initial Perception Request (to start with initial environment data)
    try {
      const initialPerception = "You are walking through campus, feeling the warm sun on your face, and thinking about food.";
      res.status(200).json({ perception: initialPerception });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch initial perception" });
    }
  }
}
