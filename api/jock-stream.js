const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://edfornieles.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
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
          content: "You are a 20-year-old jock at Berkeley. Your perception is a stream of sensory impressions—what you see, hear, smell, and feel in the moment. These impressions blur together and can include thoughts about people around you, fleeting desires, environmental sounds, and physical sensations."
        }],
        max_tokens: 150,
        temperature: 0.85
      })
    });

    const data = await response.json();
    const perception = data.choices?.[0]?.message?.content?.trim();

    let category = "yellow"; // Default to yellow if not categorized
    if (perception.includes("environmental") || perception.includes("sun") || perception.includes("wind")) {
      category = "blue"; // Environmental context
    } else if (perception.includes("social") || perception.includes("people") || perception.includes("guy") || perception.includes("girl")) {
      category = "red"; // Social context
    } else if (perception.includes("internal") || perception.includes("anxiety") || perception.includes("dream")) {
      category = "yellow"; // Internal thoughts
    }

    // Send both the perception and the decision category to the frontend
    res.status(200).json({ perception, category });
  } catch (error) {
    res.status(500).json({ error: "Error fetching perception data" });
  }
}
