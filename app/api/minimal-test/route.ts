import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('API Key format:', process.env.OPENAI_API_KEY ? 
      `${process.env.OPENAI_API_KEY.slice(0, 8)}...${process.env.OPENAI_API_KEY.slice(-4)}` : 
      'Not found'
    )

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Say 'Hello, this is a test!'"
        }
      ],
      max_tokens: 10
    })

    return NextResponse.json({ 
      success: true,
      message: completion.choices[0].message.content
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
} 