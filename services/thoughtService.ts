import type { Thought } from '@/types'

interface ThoughtContext {
  location: string;
  timeOfDay: string;
  previousThought?: string;
  mood?: string;
}

export async function generateThought(context: ThoughtContext): Promise<string> {
  try {
    const response = await fetch('/api/generate-thought', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(context),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const errorMessage = errorData?.error?.message || 'Failed to generate thought'
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorMessage
      })
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data.thought
  } catch (error) {
    console.error('Error generating thought:', error)
    // Return a fallback thought instead of throwing
    return "I'm having trouble thinking right now. Let me try again later."
  }
}

export function getNextLocation(currentLocation: string): string {
  // Define possible locations and their connections
  const locations = {
    'hallway': ['gym', 'locker_room', 'football_field'],
    'gym': ['hallway', 'locker_room', 'football_field'],
    'locker_room': ['hallway', 'gym', 'football_field'],
    'football_field': ['hallway', 'gym', 'locker_room'],
  }

  const possibleNextLocations = locations[currentLocation as keyof typeof locations] || ['hallway']
  return possibleNextLocations[Math.floor(Math.random() * possibleNextLocations.length)]
}

export function getNextTimeOfDay(currentTimeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'): 'morning' | 'afternoon' | 'evening' | 'night' {
  const timesOfDay = ['morning', 'afternoon', 'evening', 'night'] as const
  const currentIndex = timesOfDay.indexOf(currentTimeOfDay)
  const nextIndex = (currentIndex + 1) % timesOfDay.length
  return timesOfDay[nextIndex]
} 