import { useLocalStorage } from '@adbl/dom-cells/useLocalStorage';
import { categories } from './categories';
import { toWorker } from './worker';
import { LATEST_DATA_CHUNK } from './constants';
import type { GoalState } from './entities';

export async function createUser(name: string) {
  const uuid = crypto.randomUUID();
  const startDate = new Date().toISOString();
  return await toWorker({
    type: 'metadata.record',
    metadata: { uuid, name, startDate },
  });
}

const lastLoadedChunk = useLocalStorage<number>('last-loaded-chunk', 0);

export async function initializeDatabase() {
  const testData = await toWorker({
    type: 'goals.update',
    categoryList: categories.map((c) => ({ ...c, icon: undefined })),
    lastLoadedChunk: lastLoadedChunk.value,
    latestChunk: LATEST_DATA_CHUNK,
  });
  lastLoadedChunk.value = LATEST_DATA_CHUNK;
  return testData;
}

export async function getAutoRecommendations(categories: string[]) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const response = await toWorker({ type: 'goals.today', categories });
  return response;
}

export async function getExampleGoalInstruction(
  selected: string[],
  categories: string[]
) {
  const response = await toWorker({
    type: 'goals.search-example',
    selected,
    categories,
  });
  return response;
}

export async function getAutoCompleteSuggestions(
  query: string,
  addedUuids: string[]
) {
  if (!query.trim()) return [];
  const response = await toWorker({
    type: 'goals.autocomplete',
    query,
    addedUuids,
  });
  return response;
}

export async function saveGoalState(goalStates: GoalState[], date: string) {
  const response = await toWorker({ type: 'goals.record', goalStates, date });
  if (!response) console.error('Error saving goal state');
  return response;
}

export async function getInsightsOverview(todaysData: GoalState[]) {
  return toWorker({ type: 'insights.overview', todaysData });
}

export async function getInsightsHistory(todaysData: GoalState[]) {
  return toWorker({ type: 'insights.history', todaysData });
}
