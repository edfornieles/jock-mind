import OpenAI from 'openai'
import { API_KEYS, validateApiKey } from './keys'

// Validate API key before creating instance
if (!validateApiKey(API_KEYS.OPENAI_API_KEY)) {
  console.error('Invalid OpenAI API key format. Please check your environment variables.')
}

// Create OpenAI instance with direct API key
export const openai = new OpenAI({
  apiKey: API_KEYS.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

// Debug function to check API key
export function debugApiKey() {
  if (!API_KEYS.OPENAI_API_KEY) {
    console.error('No API key found in environment variables')
    return
  }
  console.log('API Key format valid:', validateApiKey(API_KEYS.OPENAI_API_KEY))
  console.log('API Key (first 20 chars):', API_KEYS.OPENAI_API_KEY.slice(0, 20))
  console.log('API Key length:', API_KEYS.OPENAI_API_KEY.length)
} 