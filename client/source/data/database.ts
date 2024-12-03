import { Dexie, type EntityTable } from 'dexie';
type Nullable<T> = T | null;

export interface ThemeColor {
  id: number;
  value: string;
}

export interface IconName {
  id: number;
  value: string;
}

export interface Goal {
  id: number;
  title: string;
  instruction: string;
  description: string;
  themeColor: ThemeColor;
  iconName: IconName;
  categories: Category[];
  isRecommendable: boolean;
  involvementLevel: 'low' | 'medium' | 'high';
  repeatRate: 'daily' | 'weekly' | 'monthly' | 'yearly';
  creator: System | User;
  updated: Date;
}

export interface Category {
  id: number;
  name: string;
  iconName: IconName;
  themeColor: ThemeColor;
  goals: Goal[];
  creator: System | User;
  updated: Date;
}

export interface Journey {
  id: number;
  description: string;
  iconName: IconName;
  themeColors: ThemeColor[];
  goals: Goal[];
  updated: Date;
  creator: System | User;
}

export interface GoalSet {
  id: number;
  date: Date;
  user: User;
  goals: Goal[];
  forfeitedGoals: Goal[];
  completedGoals: Goal[];
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  color: string;
  updated: Date;
}

export interface System {
  id: number;
  uuid: string;
  isAdministrator: true;
  updated: Date;
}

export interface User {
  id: number;
  uuid: string;
  image: Nullable<string>;
  email: Nullable<string>;
  isAdministrator: false;
  name: string;
  preferredCategories: Category[];
  favoriteGoals: Goal[];
  updated: Date;
  goalsSets: GoalSet[];
  badges: Badge[];
}

export type Database = Dexie & {
  goals: EntityTable<Goal, 'id'>;
  categories: EntityTable<Category, 'id'>;
  journeys: EntityTable<Journey, 'id'>;
  users: EntityTable<User, 'id'>;
  badges: EntityTable<Badge, 'id'>;
  goalSets: EntityTable<GoalSet, 'id'>;
};

export const database = new Dexie('enjoyYourDayDB') as Database;
database.version(1).stores({
  goals: '++id, instruction, title, category',
});
