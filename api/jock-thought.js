export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Fetch from OpenAI API
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
        content: "You are the sensory perception of a 20-year-old jock at Berkeley. Describe in vivid, sensory-rich prose what he’s experiencing right now."
      }],
      max_tokens: 200,
      temperature: 0.9
    })
  });

  const data = await response.json();
  console.log("OpenAI response data:", data); // Log the OpenAI response

  const thought = data.choices?.[0]?.message?.content?.trim();

  // Return thought
  if (thought) {
    res.status(200).json({ thought });
  } else {
    console.error("No thought returned from OpenAI API");
    res.status(500).json({ error: "No thought returned from OpenAI API" });
  }
}
