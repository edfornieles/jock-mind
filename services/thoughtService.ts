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
      throw new Error('Failed to generate thought')
    }

    const data = await response.json()
    return data.thought
  } catch (error) {
    console.error('Error generating thought:', error)
    return 'Error generating thought. Please try again.'
  }
}

export function getNextLocation(currentLocation: string): string {
  // Define possible locations and their connections
  const locations = {
    'dorm': ['class', 'gym', 'library'],
    'class': ['dorm', 'gym', 'library'],
    'gym': ['dorm', 'class', 'library'],
    'library': ['dorm', 'class', 'gym'],
  }

  const possibleNextLocations = locations[currentLocation as keyof typeof locations] || ['dorm']
  return possibleNextLocations[Math.floor(Math.random() * possibleNextLocations.length)]
}

export function getNextTimeOfDay(currentTime: string): string {
  const timeSequence = ['morning', 'afternoon', 'evening', 'night']
  const currentIndex = timeSequence.indexOf(currentTime)
  const nextIndex = (currentIndex + 1) % timeSequence.length
  return timeSequence[nextIndex]
} 