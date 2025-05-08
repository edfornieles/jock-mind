export interface Scene {
  id: string;
  background: string;
  thoughts: string[];
  duration: number;
}

export const scenes: Scene[] = [
  {
    id: 'gym-morning',
    background: '/images/gym-morning.jpg',
    thoughts: [
      'Just crushed it in the weight room. That new protein shake is hitting different.',
      'Should\'ve done legs today, but the bench was calling my name.',
      'Need to hit the dining hall after this. Maybe eggs and oatmeal?',
      'Coach would be proud of these gains.'
    ],
    duration: 45
  },
  {
    id: 'library-afternoon',
    background: '/images/library.jpg',
    thoughts: [
      'Can\'t believe I\'m actually studying. Mom would be shocked.',
      'This econ test is going to be brutal. Should\'ve started earlier.',
      'At least the library has good AC. Better than the dorms.',
      'Maybe I\'ll grab a coffee after this. Need the energy for practice later.'
    ],
    duration: 60
  },
  {
    id: 'stadium-evening',
    background: '/images/stadium.jpg',
    thoughts: [
      'Nothing beats the view from the top of the stadium.',
      'Remember when I first stepped on this field? Feels like yesterday.',
      'Need to work on my footwork before the next game.',
      'The sunset hits different up here.'
    ],
    duration: 30
  }
]; 