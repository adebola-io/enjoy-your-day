import type { WorkerProtocol } from './types';
import type { GoalProps } from '../entities';
import { getNewData } from './update';
import { dexie } from './dexie';

const goals: GoalProps[] = [];
let isUpdatingGoals = false;

const messageHandlers: WorkerProtocol.MessageHandlerMap = {
  async ping() {
    return 'pong';
  },

  async echo(data) {
    return data.message;
  },

  async 'goals.today'(data) {
    const todaysGoals: GoalProps[] = [];
    let i = 0;
    const goalsInCategories = goals.filter((g) =>
      data.message.categories.some((c) => g.categories.includes(c))
    );
    while (i++ < 6) {
      let index = Math.floor(Math.random() * goalsInCategories.length);
      while (todaysGoals.includes(goalsInCategories[index])) {
        index = Math.floor(Math.random() * goalsInCategories.length);
      }
      todaysGoals.push(goalsInCategories[index]);
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
    const { selected, categories } = data.message;
    const categoryGoals = goals.filter((g) =>
      categories.some((c) => g.categories.includes(c))
    );
    let example = Math.floor(Math.random() * categoryGoals.length);
    let i = 0;
    while (
      selected.includes(categoryGoals[example].uuid) &&
      i < categoryGoals.length
    ) {
      example = Math.floor(Math.random() * categoryGoals.length);
      i++;
    }
    return categoryGoals[example].instruction.toLowerCase();
  },

  async 'goals.update'(data) {
    if (isUpdatingGoals) return null;
    isUpdatingGoals = true;
    const { lastLoadedChunk, latestChunk, categoryList } = data.message;
    const reloader = getNewData(lastLoadedChunk, latestChunk, categoryList);
    try {
      for await (const update of reloader) {
        const newGoals = update.addedGoalObjects;
        goals.push(...newGoals);
        // Adding new goals:
        dexie.goals.bulkPut(update.addedGoalObjects).then(() => {
          // Removing goals:
          for (const goalUuid of update.removedGoalUuids) {
            dexie.goals.where('uuid').equals(goalUuid).delete();
          }
          // Updating goals:
          // TODO.
        });
      }
      return true;
    } catch (error) {
      console.error('Error updating goals', error);
      console.error(error);
      return false;
    }
  },

  async 'goals.record'() {
    // TODO: Update IndexedDB here.
    return true;
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
