module.exports = async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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
        content: "You are the sensory perception of a 20-year-old jock at Berkeley. Describe in vivid, sensory-rich prose what he’s experiencing right now. Include what he sees, hears, tastes, feels, and brief bits of conversation or ambient noise. Keep it immediate and real-time."
      }],
      max_tokens: 200,
      temperature: 0.9
    })
  });

  const data = await response.json();
  const stream = data.choices?.[0]?.message?.content?.trim();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ stream });
}
