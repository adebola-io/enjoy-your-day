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
      const addedGoalObjects = retrieveCategoryIdentifiers(
        assignGoalUuids(goals.added),
        categories
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

/**
 * Assigns a unique UUID to each goal in the provided array.
 * @param goals - An array of GoalProps objects to assign UUIDs to.
 * @returns The input goals array with UUIDs assigned to each goal.
 */
function assignGoalUuids(goals: GoalProps[]) {
  for (const goal of goals) {
    goal.uuid = crypto.randomUUID();
  }
  return goals;
}

/**
 * Retrieves the category identifiers for the provided goals, matching them to the
 * corresponding categories in the provided categories map.
 *
 * @param goals - An array of GoalProps objects, each with a `categories` property
 *   containing a string or array of category names.
 * @param categories - A Map of category names to Category objects, used to look up
 *   the UUID for each category.
 * @returns The input goals array with the `categories` property updated to contain
 *   an array of category UUIDs instead of names.
 */
function retrieveCategoryIdentifiers(
  goals: Array<GoalProps & { categories: string | string[] }>,
  categories: Map<string, SendableCategory>
) {
  for (const goal of goals) {
    const categoryNames = (goal.categories as string)
      .split(',')
      .filter(Boolean);
    const categoryUuids = [];
    for (const categoryName of categoryNames) {
      const categoryObj = categories.get(categoryName);
      if (categoryObj) {
        categoryUuids.push(categoryObj.uuid);
        continue;
      }
      console.error(
        'Error matching uuids, category not found locally:',
        categoryName
      );
      goal.categories = categoryUuids;
    }
  }
  return goals;
}
