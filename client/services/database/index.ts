import { categories } from '../../data/categories';
import { LATEST_DATA_CHUNK } from '../../data/constants';
import type { GoalStateSerialized } from '../../data/entities';
import {
  dailyGoals,
  dailyGoalsCache,
  dailyGoalsDateStamp,
  lastLoadedChunk,
  liveDate,
} from '../../data/state';
import { Temporal } from 'temporal-polyfill';
import dbWorkerUrl from './db.worker?worker&url';
import { Bridge } from '#/library/bridge';

new Worker(dbWorkerUrl, { type: 'module' });
const toDbWorker = Bridge.sender('db', () => {
  liveDate.listen(trackDateChange);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') trackDateChange();
  });
  trackDateChange();
});

async function trackDateChange() {
  const today = Temporal.Now.plainDateISO().toString();
  if (!dailyGoalsDateStamp.value || today === dailyGoalsDateStamp.value) {
    return;
  }

  if (dailyGoals.value.length > 0) {
    dailyGoalsCache.value = JSON.parse(JSON.stringify(dailyGoals.value));
    dailyGoals.value = [];
  }

  try {
    await saveGoalState(dailyGoalsCache.value, dailyGoalsDateStamp.value);
    dailyGoalsCache.value = [];
    dailyGoalsDateStamp.value = null;
  } catch (error) {
    console.error(error);
  }
}

export async function echo<T>(value: T): Promise<T> {
  return await toDbWorker({ type: 'echo', value });
}

export async function createUser(name: string) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const uuid = crypto.randomUUID();
  const startDate = Temporal.Now.zonedDateTimeISO()
    .withTimeZone(timezone)
    .toString();

  const response = await toDbWorker({
    type: 'metadata.record',
    metadata: { uuid, name, startDate, deviceToken: null },
  });
  return response;
}

export async function getUserUuid() {
  const response = await toDbWorker({ type: 'metadata.uuid' });
  return response;
}

export async function storeDeviceToken(deviceToken: string) {
  const response = await toDbWorker({
    type: 'metadata.store.deviceToken',
    deviceToken,
  });
  return response;
}

export async function updateUsername(username: string) {
  const response = await toDbWorker({
    type: 'metadata.update.username',
    username,
  });
  return response;
}

export async function initializeDatabase() {
  const testDataUpdated = await toDbWorker({
    type: 'goals.update',
    categoryList: categories.map((c) => ({ ...c, icon: undefined })),
    lastLoadedChunk: lastLoadedChunk.value,
    latestChunk: LATEST_DATA_CHUNK,
  });
  if (testDataUpdated === true) lastLoadedChunk.value = LATEST_DATA_CHUNK;
  else {
    lastLoadedChunk.value = testDataUpdated.updateFailedAtChunk - 1;
    throw new Error(testDataUpdated.error);
  }
  return testDataUpdated;
}

type AutoRecommendationRequest = {
  categories: string[];
  preferredInvolvementLevel: number;
};
export async function getAutoRecommendations(
  details: AutoRecommendationRequest
) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await toDbWorker({
    type: 'goals.today',
    ...details,
  });
  return response;
}

export async function getExampleGoalInstruction(
  selected: string[],
  categories: string[]
) {
  const response = await toDbWorker({
    type: 'goals.search-example',
    selected,
    categories,
  });
  return response;
}

export async function getAutoCompleteSuggestions(
  query: string,
  addedUuids: string[],
  maxResults = 5
) {
  if (!query.trim()) return [];
  const response = await toDbWorker({
    type: 'goals.autocomplete',
    query,
    addedUuids,
    maxResults,
  });
  return response;
}

export async function saveGoalState(
  goalStates: GoalStateSerialized[],
  date: string
) {
  const response = await toDbWorker({
    type: 'goals.record',
    goalStates,
    date,
  });
  if (!response) console.error('Error saving goal state');
  return response;
}

export async function getGoalByUuid(uuid: string) {
  const response = await toDbWorker({ type: 'goals.get', uuid });
  return response;
}

export async function getInsightsOverview(todaysData: GoalStateSerialized[]) {
  return toDbWorker({ type: 'insights.overview', todaysData });
}

export async function resetDbData() {
  return toDbWorker({ type: 'metadata.reset' });
}

type InsightHistoryRequest = { start: string; end: string };
export async function getInsightsHistory(details: InsightHistoryRequest) {
  const response = await toDbWorker({
    type: 'insights.history',
    ...details,
  });
  return response;
}
