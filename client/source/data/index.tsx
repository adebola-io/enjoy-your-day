import { BarChartIcon } from '@/components/icons/bar-chart';
import { CreativityIcon } from '@/components/icons/creativity';
import { FitnessIcon } from '@/components/icons/fitness';
import { GrowthIcon } from '@/components/icons/growth';
import { HobbiesIcon } from '@/components/icons/hobbies';
import { HomeIcon } from '@/components/icons/home';
import { LearningIcon } from '@/components/icons/learning';
import { ProductivityIcon } from '@/components/icons/productivity';
import type { IconProps } from '@/components/icons/props';
import { SelfCareIcon } from '@/components/icons/self-care';
import { SettingsIcon } from '@/components/icons/settings';
import { StackIcon } from '@/components/icons/stack';
import { WellnessIcon } from '@/components/icons/wellness';
import { useLiveDate } from '@adbl/dom-cells/useDate';
import { useLocalStorage } from '@adbl/dom-cells/useLocalStorage';
import type { JSX } from '@adbl/unfinished/jsx-runtime';

/**
 * Reactive reference to the user's name.
 */
export const username = useLocalStorage<string>('username', '');

export type Category = {
  name: string;
  icon: (props: IconProps) => JSX.Template;
  theme: string;
};

export const categories: Category[] = [
  {
    name: 'Wellness',
    icon: WellnessIcon,
    theme: '#BACBB9',
  },
  {
    name: 'Self-care',
    icon: SelfCareIcon,
    theme: '#DBB2CB',
  },
  {
    name: 'Creativity',
    icon: CreativityIcon,
    theme: '#6BF2DC',
  },
  {
    name: 'Productivity',
    icon: ProductivityIcon,
    theme: '#FFD992',
  },
  {
    name: 'Fitness',
    icon: FitnessIcon,
    theme: '#7288D7',
  },
  {
    name: 'Learning',
    icon: LearningIcon,
    theme: '#FF87A2',
  },
  {
    name: 'Growth',
    icon: GrowthIcon,
    theme: '#96F396',
  },
  {
    name: 'Hobbies',
    icon: HobbiesIcon,
    theme: '#FF91ED',
  },
];

export const selectedCategories = useLocalStorage<string[]>(
  'selected-categories',
  []
);
export const appLoadingState = useLocalStorage(
  'app-loading-state',
  'setup' as 'setup' | 'done'
);
export const goalsForTheDay = useLocalStorage('goals-for-the-day', []);
export const liveDate = useLiveDate(1000 * 60 * 5); // updates every 5 minutes.

export interface NavigationLink {
  name: string;
  path: string;
  icon: (props: IconProps) => JSX.Template;
}

export const navigationBarLinks: NavigationLink[] = [
  {
    name: 'Home',
    path: '/app/user/home',
    icon: HomeIcon,
  },
  {
    name: 'Goals',
    path: '/app/user/goals',
    icon: StackIcon,
  },
  {
    name: 'Insights',
    path: '/app/user/insights',
    icon: BarChartIcon,
  },
  {
    name: 'Settings',
    path: '/app/user/settings',
    icon: SettingsIcon,
  },
];