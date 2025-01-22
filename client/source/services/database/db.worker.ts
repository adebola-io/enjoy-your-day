import type { DbWorkerProtocol } from './types';
import { insightsHistory, insightsOverview } from './insights';
import {
  autoCompleteGoals,
  getSearchExample,
  recommendGoals,
  recordGoalState,
  updateGoalsList,
} from './goals';
import { recordUserMetadata, updateUsername } from './settings';

const messageHandlers: DbWorkerProtocol.MessageHandlerMap = {
  echo: async (data) => data.message,
  ping: async () => 'pong',

  'goals.today': recommendGoals,
  'goals.autocomplete': autoCompleteGoals,
  'goals.record': recordGoalState,
  'goals.search-example': getSearchExample,
  'goals.update': updateGoalsList,

  'insights.overview': insightsOverview,
  'insights.history': insightsHistory,

  'metadata.record': recordUserMetadata,
  'metadata.update.username': updateUsername,
};

async function handleMessage<T extends DbWorkerProtocol.Requests.Request>(
  event: MessageEvent<DbWorkerProtocol.Message<T>>
) {
  const data = event.data;
  const { id } = data;
  // @ts-ignore: The type of the message is checked in the messageHandlers map.
  const response = await messageHandlers[data.message.type](data);
  self.postMessage({ id, message: response });
}

console.log('[database] Initializing');
self.addEventListener('message', handleMessage);
