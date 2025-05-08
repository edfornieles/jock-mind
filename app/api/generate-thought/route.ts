import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  try {
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

    const generatedThought = completion.choices[0].message.content

    return NextResponse.json({ thought: generatedThought })
  } catch (error) {
    console.error('Error generating thought:', error)
    return NextResponse.json(
      { error: 'Failed to generate thought' },
      { status: 500 }
    )
  }
} 