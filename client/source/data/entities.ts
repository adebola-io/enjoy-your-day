import type { Cell } from '@adbl/cells';
import type { IconName } from '#/library/icon-name';
import type { GoalColor } from '#/library/goal-color';

export type Nullable<T> = T | null;
export type Id<T> = T & string;

export interface Goal {
  goal_uuid: string;
  title: string;
  instruction: string;
  info: string;
  theme_color: string;
  icon_name: string;
  categories: Array<Id<Category>>;
  is_recommendable: boolean;
  involvement_level: number;
  week_day_affinity: Nullable<number>;
  repeat_rate: 'daily' | 'weekly' | 'monthly' | 'yearly';
  creator: User;
}

export interface GoalProps {
  dateAdded: Date;
  uuid: string;
  title: string;
  instruction: string;
  info: string;
  color: GoalColor;
  icon: IconName;
  index?: Cell<number>;
  total?: Cell<number>;
  categories: Array<string>;
}

export interface GoalListingUpdate {
  addedGoalObjects: Array<GoalProps>;
  removedGoalUuids: Array<string>;
  updatedGoals: Array<Partial<GoalProps> & { uuid: string }>;
}

export interface Category {
  name: string;
  icon_name: string;
  theme_color: string;
  goals: Array<Id<Goal>>;
  creator: Id<User>;
}

export interface Journey {
  description: string;
  icon_name: string;
  theme_colors: string[];
  goals: Array<Id<Goal>>;
  creator: Id<User>;
}

type DateString = string;

export interface GoalState {
  goal: GoalProps;
  state: 'forfeited' | 'completed' | 'scheduled';
  updatedAt: DateString | null;
}

export interface GoalSet {
  date: Date;
  user: Id<User>;
  goals: Array<Id<GoalState>>;
}

export interface Badge {
  name: string;
  description: string;
  color: string;
}

export interface User {
  user_uuid: string;
  name: string;
  image: Nullable<string>;
  email: Nullable<string>;
  is_administrator: boolean;
  preferred_categories: Array<Id<Category>>;
  favorite_goals: Array<Id<Goal>>;
  goals_sets: Array<Id<GoalSet>>;
  badges: Array<Id<Badge>>;
}

export interface MigrationObject {
  name: string;
  up: string;
  down: string;
}

export interface Migration {
  name: string;
  date_applied: Date;
}
