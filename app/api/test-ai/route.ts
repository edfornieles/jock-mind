import { NextResponse } from 'next/server'
import { openai, getApiKeyInfo } from '@/config/openai'

export async function GET() {
  try {
    // Log API key info for debugging
    console.log('API Key info:', getApiKeyInfo())

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a college athlete at UC Berkeley. Generate a single, authentic thought."
        },
        {
          role: "user",
          content: "Generate a single thought about being in the gym during the afternoon."
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    })

    return NextResponse.json({ 
      success: true,
      thought: completion.choices[0].message.content,
      model: completion.model,
      usage: completion.usage
    })
  } catch (error) {
    console.error('Error testing AI:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        errorDetails: error
      },
      { status: 500 }
    )
  }
} 