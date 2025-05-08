import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Enhanced debugging information
  console.clear()
  console.log('\n=== Environment Variable Debug Info ===')
  console.log('1. Process ENV Keys:', Object.keys(process.env).filter(key => key.includes('OPENAI')))
  console.log('2. API Key Details:')
  console.log('   - Type:', typeof process.env.OPENAI_API_KEY)
  console.log('   - Exists:', process.env.OPENAI_API_KEY ? 'YES' : 'NO')
  console.log('   - Length:', process.env.OPENAI_API_KEY?.length || 0)
  console.log('   - First 10 chars:', process.env.OPENAI_API_KEY?.substring(0, 10))
  console.log('   - Key Format:', process.env.OPENAI_API_KEY?.startsWith('sk-admin-') ? 'admin' : 
              process.env.OPENAI_API_KEY?.startsWith('sk-proj-') ? 'project' : 'unknown')
  console.log('3. NODE_ENV:', process.env.NODE_ENV)
  console.log('4. NEXT_RUNTIME:', process.env.NEXT_RUNTIME)
  console.log('================================\n')

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('OpenAI API key not found in environment variables.');
    return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
  }

  try {
    // Initialize OpenAI client with explicit configuration
    const openai = new OpenAI({ 
      apiKey: apiKey,
      organization: process.env.OPENAI_ORGANIZATION_ID
    });

    console.log('\n=== OpenAI Client Configuration ===')
    console.log('API Key Format:', apiKey.startsWith('sk-admin-') ? 'admin' : 
                apiKey.startsWith('sk-proj-') ? 'project' : 'unknown')
    console.log('Organization ID:', process.env.OPENAI_ORGANIZATION_ID || 'Not set')
    console.log('================================\n')

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

    console.log('\n=== OpenAI Response ===')
    console.log('Status: Success')
    console.log('Message:', completion.choices[0].message.content)
    console.log('=====================\n')

    return NextResponse.json({ thought: completion.choices[0].message.content })
  } catch (error: any) {
    console.error("\n=== Error Details ===")
    console.error('Error Type:', error.constructor.name)
    console.error('Error Message:', error.message)
    
    // Enhanced error logging
    if (error.response) {
      console.error('Response Status:', error.response.status)
      console.error('Response Data:', error.response.data)
      console.error('Response Headers:', error.response.headers)
    } else if (error.request) {
      console.error('Request Details:', error.request)
    }
    
    // Log the full error stack for debugging
    console.error('Stack Trace:', error.stack)
    console.error("===================\n")

    return NextResponse.json(
      { 
        error: 'Failed to generate thought',
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    )
  }
} 