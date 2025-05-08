import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY
  
  // Log the raw key (first 20 chars only) for debugging
  console.log('Raw API Key (first 20 chars):', apiKey?.slice(0, 20))
  
  return NextResponse.json({ 
    success: true,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      keyExists: !!apiKey,
      keyLength: apiKey?.length || 0,
      keyPrefix: apiKey?.slice(0, 10) || 'Not found',
      keySuffix: apiKey?.slice(-4) || 'Not found'
    }
  })
} 