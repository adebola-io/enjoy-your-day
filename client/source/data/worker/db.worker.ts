import type { WorkerProtocol } from './types';
import type { GoalProps } from '../entities';

const testData: GoalProps[] = [
  {
    uuid: crypto.randomUUID(),
    title: 'Hydrate Regularly',
    instruction: 'Drink 8 glasses of water.',
    info: 'Staying hydrated improves energy levels, concentration, and overall health. Keep a water bottle handy!',
    color: '#003f5c', // Dark blue
    icon: 'cup',
  },
  {
    uuid: crypto.randomUUID(),
    title: 'Mindful Moments',
    instruction: 'Practice 5 minutes of mindfulness.',
    info: 'Take a break to breathe deeply and focus on the present. This can reduce stress and improve focus.',
    color: '#444e86', // Deep indigo
    icon: 'self-care',
  },
  {
    uuid: crypto.randomUUID(),
    title: 'Step It Up',
    instruction: 'Take at least 7,000 steps.',
    info: 'Walking is a great way to stay active. Track your steps with a phone or fitness tracker.',
    color: '#9a0007', // Dark red
    icon: 'fitness',
  },
  {
    uuid: crypto.randomUUID(),
    title: 'Stretch & Flex',
    instruction: 'Do 10 minutes of stretching.',
    info: 'Stretching improves flexibility, posture, and can relieve muscle tension. Perfect for a morning routine!',
    color: '#004d40', // Dark teal
    icon: 'bar-chart',
  },
  {
    uuid: crypto.randomUUID(),
    title: 'Read & Learn',
    instruction: 'Read for 20 minutes.',
    info: 'Expand your knowledge or escape into a story. Reading is a fantastic way to stimulate your mind.',
    color: '#3e2723', // Dark brown
    icon: 'learning',
  },
  {
    uuid: crypto.randomUUID(),
    title: 'Healthy Plate',
    instruction: 'Eat at least one serving of fruits or vegetables.',
    info: 'Boost your intake of vitamins and minerals. Add some color to your meal with fresh produce.',
    color: '#00600f', // Deep green
    icon: 'growth',
  },
];

const messageHandlers: WorkerProtocol.MessageHandlerMap = {
  async ping() {
    return 'pong';
  },

  async echo(data) {
    return data.message;
  },

  async 'goals.today'() {
    return testData.slice(0, 3);
  },

  async 'goals.autocomplete'(data) {
    const { query } = data.message;
    const queryLower = query.toLowerCase();
    const results = [];

    for (const goal of testData.slice(3)) {
      if (goal.instruction.toLowerCase().includes(queryLower)) {
        results.push(goal);
        if (results.length === 5) break;
      }
    }
    return results;
  },

  async 'goals.search-example'() {
    // todo: ignore already recommended goals.
    const selected = Math.floor(Math.random() * testData.length);
    return testData[selected].instruction.toLowerCase();
  },
};

async function handleMessage<T extends WorkerProtocol.Requests.Request>(
  event: MessageEvent<WorkerProtocol.Message<T>>
) {
  const data = event.data;
  const { id } = data;
  // @ts-ignore: The type of the message is checked in the messageHandlers map.
  const response = await messageHandlers[data.message.type](data);
  self.postMessage({ id, message: response });
}

console.log('storage thread running.');
self.addEventListener('message', handleMessage);
