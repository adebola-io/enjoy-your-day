import type { WorkerProtocol } from './types';
import type { GoalProps } from '../entities';
import { getNewData } from './update';
import { dexie } from './dexie';

let isUpdatingGoals = false;

function shuffleArray(array: GoalProps[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const messageHandlers: WorkerProtocol.MessageHandlerMap = {
  async ping() {
    return 'pong';
  },

  async echo(data) {
    return data.message;
  },

  async 'goals.today'(data) {
    const { categories } = data.message;

    const yesterdaysRecord = await dexie.history
      .where('date')
      .below(new Date())
      .last();
    const yesterdaysGoals =
      yesterdaysRecord?.goalStates.map((g) => g.goal) ?? [];
    const goalsInCategories = dexie.goals
      .where('categories')
      .anyOf(categories)
      .filter((g) => !yesterdaysGoals.includes(g));

    return shuffleArray(await goalsInCategories.toArray()).slice(0, 6);
  },

  async 'goals.autocomplete'(data) {
    const { query, addedUuids } = data.message;
    const queryLower = query.trim().toLowerCase();

    return await dexie.goals
      .where('title')
      .startsWithIgnoreCase(queryLower)
      .or('instruction')
      .startsWithIgnoreCase(queryLower)
      .filter((g) => !addedUuids.includes(g.uuid))
      .limit(5)
      .toArray();
  },

  async 'goals.search-example'(data) {
    const { selected, categories } = data.message;

    return shuffleArray(
      await dexie.goals
        .where('categories')
        .anyOf(categories)
        .filter((g) => !selected.includes(g.uuid))
        .toArray()
    )[0].instruction.toLowerCase();
  },

  async 'goals.update'(data) {
    if (isUpdatingGoals) return null;
    isUpdatingGoals = true;
    const { lastLoadedChunk, latestChunk, categoryList } = data.message;
    const reloader = getNewData(lastLoadedChunk, latestChunk, categoryList);
    try {
      for await (const update of reloader) {
        // Adding new goals:
        dexie.goals.bulkAdd(update.addedGoalObjects).then(() => {
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

  async 'goals.record'(data) {
    const { goalStates } = data.message;
    await dexie.history.add({
      uuid: crypto.randomUUID(),
      date: new Date(data.message.date),
      goalStates,
    });
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
