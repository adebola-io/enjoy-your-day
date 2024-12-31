import { Cell } from '@adbl/cells';
import { useLiveDate } from '@adbl/dom-cells/useDate';
import { useLocalStorage } from '@adbl/dom-cells/useLocalStorage';
import type { GoalState } from '#/data/entities';
import { Temporal } from 'temporal-polyfill';
import { saveGoalState } from './db';

export const DATE_UPDATE_INTERVAL = 1000 * 30; // updates every 30 seconds.
export const LOCALSTORAGE_KEYS = {
  selectedCategories: 'selected-categories',
  appLoadingState: 'app-loading-state',
  goalsForTheDay: 'goals-for-the-day',
  username: 'username',
  goalsForTheDayDateStamp: 'goals-for-the-day-date-stamp',
};

export const selectedCategories = useLocalStorage<string[]>(
  LOCALSTORAGE_KEYS.selectedCategories,
  []
);
export type AppSetupState = 'setup' | 'done';
export const appLoadingState = useLocalStorage<AppSetupState>(
  LOCALSTORAGE_KEYS.appLoadingState,
  'setup'
);
export const dailyGoals = useLocalStorage<GoalState[]>(
  LOCALSTORAGE_KEYS.goalsForTheDay,
  []
);
export const dailyGoalsDateStamp = useLocalStorage<string | null>(
  LOCALSTORAGE_KEYS.goalsForTheDayDateStamp,
  null
);
export const goalsCompleted = Cell.derived(() => {
  return (
    dailyGoals.value.length > 0 &&
    dailyGoals.value.every((s) => s.state === 'completed')
  );
});
export const shouldShowCompletionScreen = Cell.source(goalsCompleted.value);
export const liveDate = useLiveDate(DATE_UPDATE_INTERVAL);
export const timeOfDay = Cell.derived(() => {
  const hours = liveDate.value.getHours();
  if (hours < 12) return 'morning';
  if (hours < 18) return 'afternoon';
  return 'evening';
});
export const username = useLocalStorage<string>(LOCALSTORAGE_KEYS.username, '');

async function trackDateChange() {
  const today = Temporal.Now.plainDateISO().toString();
  if (!dailyGoalsDateStamp.value || today === dailyGoalsDateStamp.value) {
    return;
  }
  await saveGoalState(dailyGoals.value, dailyGoalsDateStamp.value);
  dailyGoals.value = [];
  dailyGoalsDateStamp.value = null;
}

liveDate.runAndListen(trackDateChange);
