export type Nullable<T> = T | null;
export type Id<T extends Entity> = T['uuid'];

export interface Entity {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal extends Entity {
  title: string;
  instruction: string;
  description: string;
  themeColor: string;
  iconName: string;
  categories: Array<Id<Category>>;
  isRecommendable: boolean;
  involvementLevel: number;
  weekDayAffinity: Nullable<number>;
  repeatRate: 'daily' | 'weekly' | 'monthly' | 'yearly';
  creator: System | User;
}

export interface Category extends Entity {
  name: string;
  iconName: string;
  themeColor: string;
  goals: Array<Id<Goal>>;
  creator: Id<System | User>;
}

export interface Journey extends Entity {
  description: string;
  iconName: string;
  themeColors: string[];
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
  isAdministrator: true;
}

export interface User extends Entity {
  name: string;
  image: Nullable<string>;
  email: Nullable<string>;
  isAdministrator: false;
  preferredCategories: Array<Id<Category>>;
  favoriteGoals: Array<Id<Goal>>;
  goalsSets: Array<Id<GoalSet>>;
  badges: Array<Id<Badge>>;
}
