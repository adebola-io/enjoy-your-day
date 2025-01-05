import type { WorkerProtocol } from './types';
import type { GoalProps } from '../entities';
import { getNewData } from './update';
import { dexie } from './dexie';
import { cardDescriptionGenerator as cardDesc } from './card-description';

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

  async 'insights.overview'(data) {
    const { todaysData } = data.message;
    const previousRecords = await dexie.history.orderBy('date').toArray();
    let totalGoalsCompleted = 0;
    let totalGoalsCommittedTo = 0;
    let longestDailyStreak = 0;
    let unfinishedGoals = 0;

    const users = await dexie.userMetadata.toArray();
    const user = users[0];
    const startDate = new Date(user.startDate).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    for (const record of previousRecords) {
      let completedDaily = 0;
      let totalDaily = 0;
      for (const goalState of record.goalStates) {
        totalDaily++;
        if (goalState.state === 'completed') completedDaily++;
        else unfinishedGoals++;
      }
      if (completedDaily === totalDaily) longestDailyStreak++;
      else longestDailyStreak = 0;
      totalGoalsCommittedTo += totalDaily;
      totalGoalsCompleted += completedDaily;
    }

    for (const goalState of todaysData) {
      totalGoalsCommittedTo++;
      if (goalState.state === 'completed') totalGoalsCompleted++;
    }

    return {
      userBadge: {
        icon: 'cookie',
        name: 'New Kid.',
        description:
          "You recently started your journey on this app. It's great to have you on board!",
      },
      cards: [
        {
          name: 'Total Completed',
          value: totalGoalsCompleted,
          suffix: totalGoalsCompleted === 1 ? 'goal' : 'goals',
          icon: 'bar-chart',
          color: '#013c3b',
          description: cardDesc.completed(totalGoalsCompleted, startDate),
        },
        {
          name: 'Committed To',
          value: totalGoalsCommittedTo,
          suffix: totalGoalsCommittedTo === 1 ? 'goal' : 'goals',
          icon: 'anchor',
          color: '#05688f',
          description: cardDesc.committed(totalGoalsCommittedTo, startDate),
        },
        {
          name: 'Longest Streak',
          value: String(longestDailyStreak),
          suffix: longestDailyStreak === 1 ? 'day' : 'days',
          icon: 'trophy',
          color: '#2d0a62',
          description:
            "You recently started your journey on this app. It's great to have you on board!",
        },
        {
          name: 'Average Completion Rate',
          value: '30',
          suffix: '%',
          icon: 'calendar',
          color: '#253a54',
          description:
            "You recently started your journey on this app. It's great to have you on board!",
        },
        {
          name: 'Unfinished Goals',
          value: unfinishedGoals,
          suffix: unfinishedGoals === 1 ? 'goal' : 'goals',
          icon: 'stack',
          color: '#b93200',
          description:
            "You recently started your journey on this app. It's great to have you on board!",
        },
      ],
    };
  },

  async 'metadata.record'(data) {
    await dexie.userMetadata.add(data.message.metadata);
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
