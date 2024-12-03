import { Cell } from '@adbl/cells';
import { useLiveDate } from '@adbl/dom-cells/useDate';
import { useLocalStorage } from '@adbl/dom-cells/useLocalStorage';

export const DATE_UPDATE_INTERVAL = 1000 * 60 * 5; // updates every 5 minutes.
export const LOCALSTORAGE_KEYS = {
  selectedCategories: 'selected-categories',
  appLoadingState: 'app-loading-state',
  goalsForTheDay: 'goals-for-the-day',
  username: 'username',
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
export const goalsForTheDay = useLocalStorage(
  LOCALSTORAGE_KEYS.goalsForTheDay,
  []
);
export const liveDate = useLiveDate(DATE_UPDATE_INTERVAL);
export const timeOfDay = Cell.derived(() => {
  const hours = liveDate.value.getHours();
  if (hours < 12) {
    return 'morning';
  }
  if (hours > 18) {
    return 'afternoon';
  }
  return 'evening';
});
export const username = useLocalStorage<string>(LOCALSTORAGE_KEYS.username, '');
