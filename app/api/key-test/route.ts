import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    
    // Log the raw key (first 20 chars only) for debugging
    console.log('Raw API Key (first 20 chars):', apiKey?.slice(0, 20))
    
    if (!apiKey) {
      throw new Error('API key is not configured')
    }

    // Create a new OpenAI instance with the key
    const openai = new OpenAI({
      apiKey: apiKey
    })

    // Make a minimal API call
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Say 'test'"
        }
      ],
      max_tokens: 5
    })

    return NextResponse.json({ 
      success: true,
      message: completion.choices[0].message.content,
      keyInfo: {
        length: apiKey.length,
        prefix: apiKey.slice(0, 10),
        suffix: apiKey.slice(-4)
      }
    })
  } catch (error) {
    console.error('Error in key test:', error)
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