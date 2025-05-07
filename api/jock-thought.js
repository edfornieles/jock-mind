const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://edfornieles.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Fetch Perception Data for Jock
    const perceptionResponse = await fetch("https://jock-mind-api.vercel.app/api/jock-stream");
    const perceptionData = await perceptionResponse.json();
    const perception = perceptionData.perception || "No perception data available.";
    
    // Use Perception Data to form a decision
    let decision;
    if (perception.includes("hunger")) {
      decision = "Head to the food truck for a burrito.";
    } else if (perception.includes("sunny") && perception.includes("people")) {
      decision = "Walk to the quad to meet some friends.";
    } else {
      decision = "Head to class and start reviewing notes.";
    }

    // OpenAI API call for Jock’s thought
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
          content: `You are a 20-year-old jock at Berkeley. Your thoughts are fleeting, one line at a time, based on the perception of the environment. Here's your current thought: ${decision}`
        }],
        max_tokens: 50,
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
  } catch (error) {
    res.status(500).json({ error: "Error with OpenAI API" });
  }
}
