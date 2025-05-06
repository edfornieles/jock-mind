export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const prompt = `
You are a 20-year-old college athlete at Berkeley. Write a short, poetic inner thought. 
It should reflect your emotional state, sensory experience, or ego, shaped by college life.
Keep it vivid, casual, and believable as a private thought.
`;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 60,
      temperature: 0.85
    })
  });

  const data = await response.json();
  const thought = data.choices?.[0]?.text?.trim();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ thought });
}
