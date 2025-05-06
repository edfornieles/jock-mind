export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const prompt = `
Describe in vivid, continuous prose what a 20-year-old sorority girl at Berkeley is experiencing right now. 
Include sensory details: how her outfit feels, the scent of her perfume, ambient noise, snippets of gossip or internal dialogue, and how she moves through space. 
Make it immersive and emotionally aware — like a film scene from inside her senses.
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
      max_tokens: 250,
      temperature: 0.95
    })
  });

  const data = await response.json();
  const stream = data.choices?.[0]?.message?.content?.trim();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ stream });
}
