export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const prompt = `
You are the internal voice of a 20-year-old sorority girl at UC Berkeley. Your voice is upbeat, emotionally tuned, sharp, and occasionally chaotic. 
Write a brief, private thought from her perspective. It can reflect social anxiety, attraction, ambition, or sensory experience. 
Keep it casual, poetic, and believable — like a flash of consciousness while walking through her day.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${OPENAI_API_KEY}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 100,
      temperature: 0.9
    })
  });

  const data = await response.json();
  const thought = data.choices?.[0]?.message?.content?.trim();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ thought });
}
