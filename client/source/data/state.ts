import { Cell } from '@adbl/cells';
import { useLiveDate } from '@adbl/dom-cells/useDate';
import { useLocalStorage } from '@adbl/dom-cells/useLocalStorage';
import type { GoalState } from '#/data/entities';
import { Temporal } from 'temporal-polyfill';
import { saveGoalState, updateUsername } from '../services/database';
import CompassIcon from '#/components/icons/compass';
import BullseyeIcon from '#/components/icons/bullseye';
import MountainIcon from '#/components/icons/mountain';
import { getRandomMorningTime, NoOp, setMetaTheme } from '#/library/utils';

export const DATE_UPDATE_INTERVAL = 1000 * 30; // updates every 30 seconds.
export const LOCALSTORAGE_KEYS = {
  selectedCategories: 'selected-categories',
  appLoadingState: 'app-loading-state',
  involvementLevel: 'involvement-level',
  goalsForTheDay: 'goals-for-the-day',
  lastLoadedChunk: 'last-loaded-chunk',
  username: 'username',
  goalsForTheDayDateStamp: 'goals-for-the-day-date-stamp',
  notificationsEnabled: 'notifications-enabled',
  morningTime: 'morning-time',
  themeColor: 'theme-color',
};

const notificationsPermissionGranted =
  window.Notification?.permission === 'granted';
export const notificationsEnabled = useLocalStorage<boolean>(
  LOCALSTORAGE_KEYS.notificationsEnabled,
  notificationsPermissionGranted
);
if (!notificationsPermissionGranted) {
  notificationsEnabled.value = false;
}
export const selectedCategories = useLocalStorage<string[]>(
  LOCALSTORAGE_KEYS.selectedCategories,
  []
);
export const involvementLevel = useLocalStorage<number>(
  LOCALSTORAGE_KEYS.involvementLevel,
  0
);

export const involvementLevelStr = Cell.derived(() => {
  switch (involvementLevel.value) {
    case 1:
      return 'Explorer';
    case 2:
      return 'Navigator';
    case 3:
      return 'Trailblazer';
  }
});
export const involvementLevelIcon = Cell.derived(() => {
  switch (involvementLevel.value) {
    case 1:
      return CompassIcon;
    case 2:
      return BullseyeIcon;
    case 3:
      return MountainIcon;
    default:
      return NoOp;
  }
});
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
export const lastLoadedChunk = useLocalStorage<number>(
  LOCALSTORAGE_KEYS.lastLoadedChunk,
  0
);
export type ThemeColor = 'Light' | 'Dark' | 'System';
const query = window.matchMedia('(prefers-color-scheme: dark)');
export const themeColor = useLocalStorage<ThemeColor>(
  LOCALSTORAGE_KEYS.themeColor,
  'Light'
);

themeColor.runAndListen((themeColor) => {
  document.documentElement.dataset.theme = themeColor;
});

export const isDark = Cell.derived(() => {
  return (
    themeColor.value === 'Dark' ||
    (themeColor.value === 'System' && query.matches)
  );
});
query.addEventListener('change', () => isDark.update());

isDark.runAndListen((isDark) => {
  const root = document.documentElement;
  root.toggleAttribute('data-is-dark', isDark);
});

isDark.listen((isDark) => {
  setMetaTheme(isDark ? '#000000' : '#ffffff');
});

export const morningTime = useLocalStorage<{ hours: number; minutes: number }>(
  LOCALSTORAGE_KEYS.morningTime,
  getRandomMorningTime()
);

export const goalsCompleted = Cell.derived(() => {
  return (
    dailyGoals.value.length > 0 &&
    dailyGoals.value.every((s) => s.state === 'completed')
  );
});
export const shouldShowCompletionScreen = Cell.source(goalsCompleted.value);
export const liveDate = useLiveDate(DATE_UPDATE_INTERVAL);
export const todayStr = Cell.derived(() => {
  liveDate.value;
  return Temporal.Now.plainDateISO().toString();
});
export const timeOfDay = Cell.derived(() => {
  const hours = liveDate.value.getHours();
  if (hours < 12) return 'morning';
  if (hours < 18) return 'afternoon';
  return 'evening';
});
export const username = useLocalStorage<string>(LOCALSTORAGE_KEYS.username, '');
appLoadingState.runAndListen((state) => {
  if (state === 'done') {
    username.listen(updateUsername);
  }
});

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
