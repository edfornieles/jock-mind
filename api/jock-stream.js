const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
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
        content: "You are a 20-year-old jock at Berkeley. Your perception is a stream of sensory impressions—what you see, hear, smell, and feel in the moment. These impressions are often fragmented, jumping between tasks, people, feelings, and the environment around you. Please categorize the following types of perception: environmental observations (blue), social thoughts about people (red), and internal thoughts such as dreams, hopes, fears, and anxieties (yellow)."
      }],
      max_tokens: 150,
      temperature: 0.85
    })
  });

  const data = await response.json();
  const perception = data.choices?.[0]?.message?.content?.trim();

  // Categorize perception and return with the category included
  let category = "yellow"; // Default to yellow if not categorized
  if (perception.includes("environmental")) {
    category = "blue"; // Environmental
  } else if (perception.includes("social")) {
    category = "red"; // Social thoughts
  } else if (perception.includes("internal")) {
    category = "yellow"; // Internal thoughts
  }

  res.status(200).json({ perception, category });
}
