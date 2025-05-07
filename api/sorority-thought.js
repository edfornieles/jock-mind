const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://edfornieles.github.io'); // This allows the request from GitHub Pages
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OpenAI API request setup for Sorority Girl's Thought
  const prompt = `
  You are a 20-year-old sorority girl at Berkeley. You are in the middle of an event, a social gathering, or something happening in the sorority house. 
  Your thoughts are brief and focused on what’s happening in the moment, like a self-talk. These could include thoughts about yourself, others, or the situation around you.
  Keep your thoughts relevant to the moment and internally focused. 
  Make your thoughts sound like something you'd say to yourself in real life.
  `;

  try {
    // Call OpenAI API to generate sorority girl's thought
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: prompt }],
        max_tokens: 50,
        temperature: 0.9,
      }),
    });

    const data = await response.json();
    const thought = data.choices?.[0]?.message?.content?.trim();

    if (thought) {
      res.status(200).json({ thought });
    } else {
      res.status(500).json({ error: "Failed to retrieve content from OpenAI" });
    }
  } catch (error) {
    console.error("Error during OpenAI API request:", error);
    res.status(500).json({ error: "Error fetching data from OpenAI API" });
  }
}
