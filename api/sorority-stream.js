const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://edfornieles.github.io'); // This allows the request from GitHub Pages
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OpenAI API request setup for Sorority Girl's Perception Stream
  const prompt = `
  Describe in vivid, continuous prose what a 20-year-old sorority girl at Berkeley is experiencing right now. 
  Include sensory details: her outfit, perfume, background sounds, emotional cues, movement, and brief snatches of conversation or internal dialogue. 
  Make it immersive, cinematic, and emotionally aware — like a film scene from inside her senses.
  `;

  try {
    // Call OpenAI API to generate sorority girl's perception stream
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: prompt }],
        max_tokens: 250,
        temperature: 0.95,
      }),
    });

    const data = await response.json();
    const stream = data.choices?.[0]?.message?.content?.trim();

    if (stream) {
      res.status(200).json({ stream });
    } else {
      res.status(500).json({ error: "Failed to retrieve content from OpenAI" });
    }
  } catch (error) {
    console.error("Error during OpenAI API request:", error);
    res.status(500).json({ error: "Error fetching data from OpenAI API" });
  }
}
