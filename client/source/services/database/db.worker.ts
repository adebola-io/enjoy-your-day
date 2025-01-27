import { insightsHistory, insightsOverview } from './insights';
import {
  autoCompleteGoals,
  getSearchExample,
  recommendGoals,
  recordGoalState,
  updateGoalsList,
} from './goals';
import {
  getDeviceToken,
  getUserUuid,
  recordUserMetadata,
  storeDeviceToken,
  updateUsername,
} from './settings';
import { Bridge } from '#/library/bridge';

console.log('[db] Initializing');

Bridge.receiver('db', {
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
  'metadata.uuid': getUserUuid,
  'metadata.store.deviceToken': storeDeviceToken,
  'metadata.get.deviceToken': getDeviceToken,
});
