import { NextResponse } from 'next/server'
import { openai, debugApiKey } from '@/config/openai'

export async function GET() {
  try {
    // Debug the API key
    debugApiKey()
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: "Say hello!"
        }
      ]
    })

    return NextResponse.json({ 
      success: true,
      message: response.choices[0].message.content
    })
  } catch (error: any) {
    console.error('Error testing AI:', error)
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 })
  }
} 