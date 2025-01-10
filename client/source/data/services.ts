import { categories } from './categories';
import { toWorker } from './worker';
import { LATEST_DATA_CHUNK } from './constants';
import type { GoalState } from './entities';
import { Temporal } from 'temporal-polyfill';
import { lastLoadedChunk } from './state';

export async function createUser(name: string) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const uuid = crypto.randomUUID();
  const startDate = Temporal.Now.zonedDateTimeISO()
    .withTimeZone(timezone)
    .toString();

  return await toWorker({
    type: 'metadata.record',
    metadata: { uuid, name, startDate },
  });
}

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

type AutoRecommendationRequest = {
  categories: string[];
  preferredInvolvementLevel: number;
};
export async function getAutoRecommendations(
  details: AutoRecommendationRequest
) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const response = await toWorker({ type: 'goals.today', ...details });
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

type InsightHistoryRequest = { start: string; end: string };
export async function getInsightsHistory(details: InsightHistoryRequest) {
  const response = await toWorker({ type: 'insights.history', ...details });
  return response;
}
