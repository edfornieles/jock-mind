const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  // Set CORS headers to allow requests from your GitHub Pages domain
  res.setHeader('Access-Control-Allow-Origin', 'https://edfornieles.github.io');
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
        content: "You are a 20-year-old jock at Berkeley. Your perception is an ongoing stream of sensory impressions. These impressions are fleeting and may include environmental, social, internal (psychological), or physical sensations. Categorize and color-code them as blue (environmental), red (social), yellow (internal), or green (physical)."
      }],
      max_tokens: 200, // Allow a bit more content for the stream
      temperature: 0.85
    })
  });

  const data = await response.json();
  const perception = data.choices?.[0]?.message?.content?.trim();

  // Categorize the perception and add color code
  let category = "yellow"; // Default to yellow if not categorized
  if (perception.includes("environmental") || perception.includes("sun") || perception.includes("wind")) {
    category = "blue"; // Environmental context
  } else if (perception.includes("social") || perception.includes("people")) {
    category = "red"; // Social context
  } else if (perception.includes("internal") || perception.includes("dream") || perception.includes("fear")) {
    category = "yellow"; // Internal thoughts
  } else if (perception.includes("physical") || perception.includes("muscle")) {
    category = "green"; // Physical context
  }

  // Return perception with category
  res.status(200).json({ perception, category });
}
