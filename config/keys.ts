// API Keys Configuration
export const API_KEYS = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''
} as const

// Validate API key format
export function validateApiKey(key: string): boolean {
  if (!key) return false
  // Remove any whitespace or newlines that might have been accidentally added
  const cleanKey = key.trim()
  // OpenAI API keys start with 'sk-' followed by random characters
  return cleanKey.startsWith('sk-')
}

// Get the API key with validation
export function getOpenAIKey(): string {
  const key = API_KEYS.OPENAI_API_KEY
  if (!key) {
    throw new Error('OpenAI API key not found in environment variables')
  }
  if (!validateApiKey(key)) {
    throw new Error('Invalid OpenAI API key format. The key should start with "sk-"')
  }
  return key.trim()
} 