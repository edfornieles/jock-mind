'use client'

import { useState, useEffect } from 'react'
import BackgroundImage from '@/components/BackgroundImage'
import ThoughtDisplay from '@/components/ThoughtDisplay'
import { generateThought, getNextLocation, getNextTimeOfDay } from '@/services/thoughtService'
import type { Thought } from '@/types'
import { SceneManager } from '@/components/SceneManager'
import { scenes } from '@/data/scenes'

// Original implementation (commented out for easy rollback)
/*
export default function Home() {
  const [currentThought, setCurrentThought] = useState<Thought>({
    id: 'initial',
    content: 'Just woke up in my dorm...',
    background: '/images/hallway.jpg',
    timeOfDay: 'morning',
    mood: 'neutral',
    location: 'hallway'
  })

  useEffect(() => {
    const interval = setInterval(async () => {
      const nextLocation = getNextLocation(currentThought.location)
      const nextTimeOfDay = getNextTimeOfDay(currentThought.timeOfDay)
      
      const newContent = await generateThought({
        location: nextLocation,
        timeOfDay: nextTimeOfDay,
        previousThought: currentThought.content,
        mood: currentThought.mood
      })

      setCurrentThought({
        id: Date.now().toString(),
        content: newContent,
        background: `/images/${nextLocation}.jpg`,
        timeOfDay: nextTimeOfDay,
        mood: currentThought.mood,
        location: nextLocation
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [currentThought])

  return (
    <main className="relative min-h-screen">
      <BackgroundImage
        image={currentThought.background}
        alt={`Background for ${currentThought.location}`}
        priority={true}
      />
      <ThoughtDisplay
        thought={currentThought}
      />
    </main>
  )
}
*/

// New scene-based implementation
export default function Home() {
  return (
    <main className="min-h-screen">
      <SceneManager scenes={scenes} />
    </main>
  )
} 