// API Keys Configuration
export const API_KEYS = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''
} as const

// Validate API key format
export function validateApiKey(key: string): boolean {
  return key.startsWith('sk-proj-') || key.startsWith('sk-') || key.startsWith('org-') || key.startsWith('sk-admin-')
} 