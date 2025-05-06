module.exports = async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const prompt = `
You are the inner monologue of a 20-year-old sorority girl at UC Berkeley. Write a short, vivid, emotionally perceptive thought — something she might think to herself in passing. 
It should be personal, sharp, and believable: a flash of vanity, anxiety, affection, ambition, or nostalgia. 
Keep it stylish, with natural cadence — like a line from a diary she doesn’t mean to keep.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + OPENAI_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 100,
      temperature: 0.95
    })
  });

  const data = await response.json();
  const thought = data.choices?.[0]?.message?.content?.trim();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ thought });
}
