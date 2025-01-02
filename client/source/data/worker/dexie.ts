import Dexie from 'dexie';
import type { GoalProps, HistoryRecord } from '../entities';

export const dexie = new Dexie('enjoy-your-day') as Dexie & {
  goals: Dexie.Table<GoalProps, string>;
  history: Dexie.Table<HistoryRecord, string>;
};

dexie.version(1).stores({
  goals:
    'uuid, dateAdded, title, instruction, recommendability, involvement, *categories',
  history: 'uuid, date, goalSets',
});
