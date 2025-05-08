import OpenAI from 'openai'
import { API_KEYS } from './keys'

// Create OpenAI instance with direct API key
export const openai = new OpenAI({
  apiKey: API_KEYS.OPENAI,
  dangerouslyAllowBrowser: true
})

// Debug function to check API key
export function debugApiKey() {
  console.log('API Key (first 20 chars):', API_KEYS.OPENAI.slice(0, 20))
  console.log('API Key length:', API_KEYS.OPENAI.length)
} 