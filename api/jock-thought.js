const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  // Set CORS headers to allow requests from your GitHub Pages domain
  res.setHeader('Access-Control-Allow-Origin', 'https://edfornieles.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OpenAI API call for Jock's Thought
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
        content: "You are a 20-year-old jock at Berkeley. Your thoughts are brief, fleeting, and reflect what’s happening in the moment. They are no longer than one sentence or fragment of thought."
      }],
      max_tokens: 50, // Short, brief thoughts
      temperature: 0.7
    })
  });

  const data = await response.json();
  const thought = data.choices?.[0]?.message?.content?.trim();

  if (thought) {
    res.status(200).json({ thought });
  } else {
    res.status(500).json({ error: "No thought returned" });
  }
}
