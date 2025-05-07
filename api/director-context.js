const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  try {
    // Make sure OPENAI_API_KEY is present
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is missing!');
    }

    // OpenAI API request
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
          content: "You are the director at Berkeley. You are managing the environment, tracking where people are, their activities, and maintaining the context of their thoughts and perceptions."
        }],
        max_tokens: 150,
        temperature: 0.85
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const context = data.choices?.[0]?.message?.content?.trim();

    if (context) {
      res.status(200).json({ context });
    } else {
      throw new Error("Failed to retrieve context from OpenAI");
    }
  } catch (error) {
    console.error("Error in director-context:", error);
    res.status(500).json({ error: error.message });
  }
}
