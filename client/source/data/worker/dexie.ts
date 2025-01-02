import Dexie from 'dexie';
import type { GoalProps } from '../entities';

export const dexie = new Dexie('enjoy-your-day') as Dexie & {
  goals: Dexie.Table<GoalProps, string>;
};

dexie.version(1).stores({
  goals:
    'uuid, dateAdded, title, instruction, info, color, icon, recommendability, involvement, categories',
});
