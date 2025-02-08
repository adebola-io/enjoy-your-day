import type { GoalProps, GoalListingUpdate } from '#/data/entities';
import { TaskQueue } from '#/library/task-queue';
import { LookupMap } from '#/library/lookup-map';
import type { SendableCategory } from '../../data/categories';

export const updateDataQueue = new TaskQueue<GoalListingUpdate>();
export async function startGoalUpdateProcess(
  lastLoadedChunk: number,
  latestChunk: number,
  categoryList: Array<SendableCategory>
) {
  const categories = new LookupMap(categoryList, 'name');
  const errored = false;

  let i = 0;
  while (i < latestChunk) {
    updateDataQueue.insertAtIndex(i, {
      chunk: i + 1,
      addedGoalObjects: [],
      removedGoalUuids: [],
      updatedGoals: [],
    });
    i++;
  }

  for (let i = lastLoadedChunk + 1; i <= latestChunk; i++) {
    fetch(`/json/${i}.json`)
      .then((response) => response.json())
      .then((data) => {
        if (errored) return;
        const goals = data.goals;
        const addedGoalObjects = setDates(
          getCategoryIdentifiers(goals.added, categories)
        );
        const update: GoalListingUpdate = {
          chunk: data.chunk,
          addedGoalObjects,
          removedGoalUuids: goals.removed,
          updatedGoals: goals.updated,
        };
        updateDataQueue.insertAtIndex(i - 1, update);
      })
      .catch((error) => {
        console.error('Error loading goals. Stopping load at chunk', i);
        console.error(error);
      });
  }
}

function setDates(goals: Array<GoalProps>) {
  for (const goal of goals) {
    goal.dateAdded = new Date(goal.dateAdded);
  }
  return goals;
}

function getCategoryIdentifiers(
  goals: Array<GoalProps>,
  categories: LookupMap<'name', SendableCategory>
) {
  for (const goal of goals) {
    const categoryNames = goal.categories;
    goal.categories = new Set(categoryNames);
    for (const categoryName of categoryNames) {
      const categoryObj = categories.get(categoryName);
      if (categoryObj) continue;
      console.error(
        'Error matching uuids, category not found locally:',
        categoryName
      );
    }
  }
  return goals;
}
