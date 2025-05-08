import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
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

    // Make a simple call to test the connection
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello!" }
      ],
    });

    console.log('\n=== OpenAI Response ===')
    console.log('Status: Success')
    console.log('Message:', completion.choices[0].message.content)
    console.log('=====================\n')

    return NextResponse.json({ 
      message: 'API connection successful',
      response: completion.choices[0].message.content
    }, { status: 200 });

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
        error: 'Failed to communicate with OpenAI',
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    )
  }
} 