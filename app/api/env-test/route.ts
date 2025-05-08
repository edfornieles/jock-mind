import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  // Get all environment variables
  const envVars = {
    OPENAI_API_KEY: apiKey ? 
      `${apiKey.slice(0, 8)}...${apiKey.slice(-4)}` : 
      'Not found',
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    KEY_LENGTH: apiKey?.length || 0,
    KEY_START: apiKey?.slice(0, 10) || 'Not found',
    KEY_END: apiKey?.slice(-4) || 'Not found',
    // Add raw key for debugging (first 20 chars only)
    KEY_RAW_START: apiKey?.slice(0, 20) || 'Not found'
  }

  return NextResponse.json({ 
    success: true,
    environment: envVars,
    note: 'This endpoint reads from .env.local file'
  })
} 