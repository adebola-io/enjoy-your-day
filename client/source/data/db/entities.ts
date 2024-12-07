export type Nullable<T> = T | null;
export type Id<T extends Entity> = T['uuid'];

export interface Entity {
  uuid: string;
  created_at: Date;
  updated_at: Date;
}

export interface Goal extends Entity {
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
  creator: System | User;
}

export interface Category extends Entity {
  name: string;
  icon_name: string;
  theme_color: string;
  goals: Array<Id<Goal>>;
  creator: Id<System | User>;
}

export interface Journey extends Entity {
  description: string;
  icon_name: string;
  theme_colors: string[];
  goals: Array<Id<Goal>>;
  creator: Id<System | User>;
}

export interface GoalState extends Entity {
  goal: Id<Goal>;
  state: 'forfeited' | 'completed' | 'scheduled';
}

export interface GoalSet extends Entity {
  date: Date;
  user: Id<User>;
  goals: Array<Id<GoalState>>;
}

export interface Badge extends Entity {
  name: string;
  description: string;
  color: string;
}

export interface System extends Entity {
  is_administrator: true;
}

export interface User extends Entity {
  name: string;
  image: Nullable<string>;
  email: Nullable<string>;
  is_administrator: false;
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
