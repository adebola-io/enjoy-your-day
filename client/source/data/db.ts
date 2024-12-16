import { sendToWorker } from './worker';

export async function createUser(name: string) {
  name;
}

export async function initializeDatabase() {}

export async function getAutoRecommendations(_: never) {
  const response = await sendToWorker({ type: 'goals.today' });
  return response;
}

export async function getExampleGoalInstruction(
  alreadySelected: string[] = []
) {
  const response = await sendToWorker({
    type: 'goals.search-example',
    alreadySelected,
  });
  return response;
}

export async function getAutoCompleteSuggestions(query: string) {
  if (!query) return [];
  const response = await sendToWorker({
    type: 'goals.autocomplete',
    query,
  });
  return response;
}
