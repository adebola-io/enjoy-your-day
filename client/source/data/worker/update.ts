import type { GoalProps, GoalListingUpdate } from '#/data/entities';
import type { SendableCategory } from '../categories';

export async function* getNewData(
  lastLoadedChunk: number,
  latestChunk: number,
  categoryList: Array<SendableCategory>
): AsyncGenerator<GoalListingUpdate, void, unknown> {
  const categories = new Map<string, SendableCategory>();
  for (const category of categoryList) {
    categories.set(category.name, category);
  }

  for (let i = lastLoadedChunk + 1; i <= latestChunk; i++) {
    try {
      const data = (await import(`./json/${i}.json`)).default;
      const goals = data.goals;
      const addedGoalObjects = setDates(
        getCategoryIdentifiers(goals.added, categories)
      );
      yield {
        addedGoalObjects,
        removedGoalUuids: goals.removed,
        updatedGoals: goals.updated,
      };
    } catch (error) {
      console.error('Error loading goals. Stopping load at chunk', i);
      console.error(error);
      break;
    }
  }
}

function setDates(goals: Array<GoalProps>) {
  for (const goal of goals) {
    goal.dateAdded = new Date(goal.dateAdded);
  }
  return goals;
}

function getCategoryIdentifiers(
  goals: Array<GoalProps & { categories: string | string[] }>,
  categories: Map<string, SendableCategory>
) {
  for (const goal of goals) {
    const categoryNames = (goal.categories as string)
      .split(',')
      .filter(Boolean);
    goal.categories = categoryNames;
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
