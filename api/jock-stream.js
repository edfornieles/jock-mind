const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins for testing
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
          content: "You are a 20-year-old jock at Berkeley. You perceive the world around you, and your perception is a stream of sensory impressions that influence your decisions."
        }],
        max_tokens: 150,
        temperature: 0.85
      })
    });

    const data = await response.json();
    const perception = data.choices?.[0]?.message?.content?.trim();
    
    // Categorize the perception
    let category = "yellow"; // Default to yellow (internal)
    if (perception.includes("environmental")) {
      category = "blue"; // Environmental context
    } else if (perception.includes("social")) {
      category = "red"; // Social context
    }

    if (perception) {
      res.status(200).json({ perception, category });
    } else {
      res.status(500).json({ error: "No perception data returned" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error with OpenAI API" });
  }
}
