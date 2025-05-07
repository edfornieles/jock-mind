  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://edfornieles.github.io'); // Allow GitHub Pages
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  }
  const prompt = `
You are the invisible narrator of a college drama set at Berkeley. 
Describe in 1–2 poetic sentences what’s happening in the world of a 20-year-old college athlete today. 
Mention light, weather, sound, social energy, or the rhythm of campus life.
Keep it moody, vivid, and present-tense.
`;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${OPENAI_API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 80,
      temperature: 0.85
    })
  });

  const data = await response.json();
  const context = data.choices?.[0]?.text?.trim();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ context });
}
