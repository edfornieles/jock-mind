import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
  }

  try {
    const openai = new OpenAI({ 
      apiKey: apiKey,
      organization: process.env.OPENAI_ORGANIZATION_ID
    });

    const { location, timeOfDay, previousThought, mood } = await request.json()

    const prompt = `
      You are a college athlete at UC Berkeley. Generate a single, natural thought that:
      - Is in first person
      - Reflects your current location: ${location}
      - Takes place during: ${timeOfDay}
      - Maintains context from your previous thought: ${previousThought || 'none'}
      - Matches your current mood: ${mood || 'neutral'}
      - Is authentic to a college athlete's perspective
      - Is concise (1-2 sentences)
      - Shows personality and character
      
      Previous thought: ${previousThought || 'none'}
      Current location: ${location}
      Time of day: ${timeOfDay}
      Mood: ${mood || 'neutral'}
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a college athlete at UC Berkeley. Generate authentic, first-person thoughts that reflect your experiences and personality."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    })

    return NextResponse.json({ thought: completion.choices[0].message.content })
  } catch (error: any) {
    console.error('Error generating thought:', error.message);
    return NextResponse.json(
      { error: 'Failed to generate thought' },
      { status: 500 }
    )
  }
} 