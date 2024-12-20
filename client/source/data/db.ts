import { toWorker } from './worker';

export async function createUser(name: string) {
  name;
}

export async function initializeDatabase() {}

export async function getAutoRecommendations(_: never) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const response = await toWorker({ type: 'goals.today' });
  return response;
}

export async function getExampleGoalInstruction(selected: string[] = []) {
  const response = await toWorker({ type: 'goals.search-example', selected });
  return response;
}

export async function getAutoCompleteSuggestions(query: string) {
  if (!query) return [];
  const response = await toWorker({ type: 'goals.autocomplete', query });
  return response;
}
