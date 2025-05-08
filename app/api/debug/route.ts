import { NextResponse } from 'next/server'
import { API_KEYS } from '@/config/keys'

export async function GET() {
  try {
    const key = API_KEYS.OPENAI_API_KEY
    return NextResponse.json({
      keyExists: !!key,
      keyLength: key?.length || 0,
      keyPrefix: key?.substring(0, 8) || '',
      envVar: process.env.OPENAI_API_KEY?.substring(0, 8) || '',
      nextPublicEnvVar: process.env.NEXT_PUBLIC_OPENAI_API_KEY?.substring(0, 8) || ''
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
} 