import type { GoalProps } from '#/data/entities';

export async function createUser(name: string) {
  name;
}

export async function initializeDatabase() {}

export async function getAutoRecommendations(_: never): Promise<GoalProps[]> {
  return [
    {
      title: 'Hydrate Regularly',
      instruction: 'Drink 8 glasses of water.',
      info: 'Staying hydrated improves energy levels, concentration, and overall health. Keep a water bottle handy!',
      color: '#003f5c', // Dark blue
      icon: 'cup',
    },
    {
      title: 'Mindful Moments',
      instruction: 'Practice 5 minutes of mindfulness.',
      info: 'Take a break to breathe deeply and focus on the present. This can reduce stress and improve focus.',
      color: '#444e86', // Deep indigo
      icon: 'self-care',
    },
    {
      title: 'Step It Up',
      instruction: 'Take at least 7,000 steps.',
      info: 'Walking is a great way to stay active. Track your steps with a phone or fitness tracker.',
      color: '#9a0007', // Dark red
      icon: 'fitness',
    },
    {
      title: 'Stretch & Flex',
      instruction: 'Do 10 minutes of stretching.',
      info: 'Stretching improves flexibility, posture, and can relieve muscle tension. Perfect for a morning routine!',
      color: '#004d40', // Dark teal
      icon: 'bar-chart',
    },
    {
      title: 'Read & Learn',
      instruction: 'Read for 20 minutes.',
      info: 'Expand your knowledge or escape into a story. Reading is a fantastic way to stimulate your mind.',
      color: '#3e2723', // Dark brown
      icon: 'learning',
    },
    {
      title: 'Healthy Plate',
      instruction: 'Eat at least one serving of fruits or vegetables.',
      info: 'Boost your intake of vitamins and minerals. Add some color to your meal with fresh produce.',
      color: '#00600f', // Deep green
      icon: 'growth',
    },
  ];
}
