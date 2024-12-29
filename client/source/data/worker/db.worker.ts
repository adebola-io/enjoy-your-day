import type { WorkerProtocol } from './types';
import type { GoalProps } from '../entities';
import { getNewData } from './update';

// const testData: GoalProps[] = [
//   {
//     uuid: crypto.randomUUID(),
//     title: 'Hydrate Regularly',
//     instruction: 'Drink 8 glasses of water.',
//     info: 'Staying hydrated improves energy levels, concentration, and overall health. Keep a water bottle handy!',
//     color: '#003f5c', // Dark blue
//     icon: 'cup',
//   },
//   {
//     uuid: crypto.randomUUID(),
//     title: 'Mindful Moments',
//     instruction: 'Practice 5 minutes of mindfulness.',
//     info: 'Take a break to breathe deeply and focus on the present. This can reduce stress and improve focus.',
//     color: '#444e86', // Deep indigo
//     icon: 'self-care',
//   },
//   {
//     uuid: crypto.randomUUID(),
//     title: 'Step It Up',
//     instruction: 'Take at least 7,000 steps.',
//     info: 'Walking is a great way to stay active. Track your steps with a phone or fitness tracker.',
//     color: '#9a0007', // Dark red
//     icon: 'fitness',
//   },
//   {
//     uuid: crypto.randomUUID(),
//     title: 'Stretch & Flex',
//     instruction: 'Do 10 minutes of stretching.',
//     info: 'Stretching improves flexibility, posture, and can relieve muscle tension. Perfect for a morning routine!',
//     color: '#004d40', // Dark teal
//     icon: 'bar-chart',
//   },
//   {
//     uuid: crypto.randomUUID(),
//     title: 'Read & Learn',
//     instruction: 'Read for 20 minutes.',
//     info: 'Expand your knowledge or escape into a story. Reading is a fantastic way to stimulate your mind.',
//     color: '#3e2723', // Dark brown
//     icon: 'learning',
//   },
//   {
//     uuid: crypto.randomUUID(),
//     title: 'Healthy Plate',
//     instruction: 'Eat at least one serving of fruits or vegetables.',
//     info: 'Boost your intake of vitamins and minerals. Add some color to your meal with fresh produce.',
//     color: '#00600f', // Deep green
//     icon: 'growth',
//   },
// ];
const goals: GoalProps[] = [];
let isUpdatingGoals = false;

const messageHandlers: WorkerProtocol.MessageHandlerMap = {
  async ping() {
    return 'pong';
  },

  async echo(data) {
    return data.message;
  },

  async 'goals.today'() {
    const todaysGoals: GoalProps[] = [];
    let i = 0;
    while (i++ < 6) {
      let index = Math.floor(Math.random() * goals.length);
      while (todaysGoals.includes(goals[index])) {
        index = Math.floor(Math.random() * goals.length);
      }
      todaysGoals.push(goals[index]);
    }
    return todaysGoals;
  },

  async 'goals.autocomplete'(data) {
    const { query, addedUuids } = data.message;
    const queryLower = query.trim().toLowerCase();
    const results = [];

    for (const goal of goals) {
      const isMatch =
        goal.instruction.toLowerCase().includes(queryLower) ||
        goal.title.toLowerCase().includes(queryLower);
      if (!isMatch || addedUuids.includes(goal.uuid)) continue;
      results.push(goal);
      if (results.length === 5) break;
    }
    return results;
  },

  async 'goals.search-example'(data) {
    const { selected } = data.message;
    // todo: ignore already recommended goals.
    let example = Math.floor(Math.random() * goals.length);
    let i = 0;
    while (selected.includes(goals[example].uuid) && i < goals.length) {
      example = Math.floor(Math.random() * goals.length);
      i++;
    }
    return goals[example].instruction.toLowerCase();
  },

  async 'goals.update'(data) {
    if (isUpdatingGoals) return null;
    isUpdatingGoals = true;
    const { lastLoadedChunk, latestChunk, categoryList } = data.message;
    const reloader = getNewData(lastLoadedChunk, latestChunk, categoryList);
    try {
      for await (const update of reloader) {
        // Update IndexedDB here.
        goals.push(...update.addedGoalObjects);
      }
      console.log('Goals updated successfully', goals);
      return true;
    } catch (error) {
      console.error('Error updating goals', error);
      console.error(error);
      return false;
    }
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
