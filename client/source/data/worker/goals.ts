import { dexie } from './dexie';
import { WorkerProtocol } from './types';
import { getNewData } from './update';
import { shuffleArray } from './utils';

type GenerateGoalsForTodayHandler =
  WorkerProtocol.Handler<WorkerProtocol.Requests.GetRecommendedGoals>;
type AutoCompleteGoalsHandler =
  WorkerProtocol.Handler<WorkerProtocol.Requests.GetAutoCompleteSuggestions>;
type RecordGoalsHandler =
  WorkerProtocol.Handler<WorkerProtocol.Requests.RecordGoalState>;
type GetSearchExampleHandler =
  WorkerProtocol.Handler<WorkerProtocol.Requests.GetExampleSearchGoalInstruction>;
type UpdateGoalsListHandler =
  WorkerProtocol.Handler<WorkerProtocol.Requests.UpdateGoals>;

export const recommendGoals: GenerateGoalsForTodayHandler = async (data) => {
  const { categories } = data.message;

  const yesterdaysRecord = await dexie.history
    .where('date')
    .below(new Date())
    .last();
  const yesterdaysGoals = yesterdaysRecord?.goalStates.map((g) => g.goal) ?? [];
  const goalsInCategories = dexie.goals
    .where('categories')
    .anyOf(categories)
    .filter((g) => !yesterdaysGoals.includes(g));

  return shuffleArray(await goalsInCategories.toArray()).slice(0, 6);
};

export const autoCompleteGoals: AutoCompleteGoalsHandler = async (data) => {
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
};

export const recordGoalState: RecordGoalsHandler = async (data) => {
  const { goalStates } = data.message;
  await dexie.history.add({
    uuid: crypto.randomUUID(),
    date: new Date(data.message.date),
    goalStates,
  });
  return true;
};

export const getSearchExample: GetSearchExampleHandler = async (data) => {
  const { selected, categories } = data.message;

  return shuffleArray(
    await dexie.goals
      .where('categories')
      .anyOf(categories)
      .filter((g) => !selected.includes(g.uuid))
      .toArray()
  )[0].instruction.toLowerCase();
};

let isUpdatingGoals = false;
export const updateGoalsList: UpdateGoalsListHandler = async (data) => {
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
};
