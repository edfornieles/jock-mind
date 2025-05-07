const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  // Set CORS headers to allow requests from your GitHub Pages domain
  res.setHeader('Access-Control-Allow-Origin', 'https://edfornieles.github.io'); // This allows the request from GitHub Pages
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OpenAI API call for Jock's Perception
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "You are a 20-year-old jock at Berkeley. Your perception is a stream of sensory impressions—what you see, hear, smell, and feel in the moment. These impressions may blur together and include thoughts about people around you, fleeting desires, environmental sounds, and physical sensations. The impressions are fast-paced and sometimes fragmented."
      }],
      max_tokens: 150,
      temperature: 0.85
    })
  });

  const data = await response.json();
  const perception = data.choices?.[0]?.message?.content?.trim();

  // Categorize the perception (blue = environmental, red = social, yellow = internal)
  let category = "yellow"; // Default to yellow if not categorized
  if (perception.includes("environmental") || perception.includes("sun") || perception.includes("wind") || perception.includes("gym")) {
    category = "blue"; // Environmental context
  } else if (perception.includes("social") || perception.includes("people") || perception.includes("guy") || perception.includes("girl")) {
    category = "red"; // Social context
  } else if (perception.includes("dream") || perception.includes("fear") || perception.includes("anxiety") || perception.includes("internal")) {
    category = "yellow"; // Internal thoughts
  }

  // Send both the perception data and its category back to the frontend
  if (perception) {
    res.status(200).json({ perception, category });
  } else {
    res.status(500).json({ error: "Failed to retrieve perception data" });
  }
}
