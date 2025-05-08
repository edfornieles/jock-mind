// Character Types
export interface Character {
  id: string;
  name: string;
  description: string;
  personality: {
    traits: string[];
    interests: string[];
  };
  locations: {
    [key: string]: Location;
  };
  metadata: {
    version: string;
    lastUpdated: string;
  };
}

export interface Location {
  name: string;
  image: string;
  description: string;
}

// Thought Types
export interface Thought {
  id: string;
  content: string;
  background: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  mood: string;
  location: string;
}

export interface ThoughtsData {
  thoughts: Thought[];
  metadata: {
    version: string;
    lastUpdated: string;
    totalThoughts: number;
  };
}

// Component Props Types
export interface ThoughtDisplayProps {
  thought: Thought;
  onComplete?: () => void;
}

export interface BackgroundImageProps {
  image: string;
  alt: string;
  priority?: boolean;
} 