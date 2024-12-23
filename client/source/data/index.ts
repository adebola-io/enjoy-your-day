import { BarChartIcon } from '#/components/icons/bar-chart';
import { CreativityIcon } from '#/components/icons/creativity';
import { FitnessIcon } from '#/components/icons/fitness';
import { GrowthIcon } from '#/components/icons/growth';
import { HobbiesIcon } from '#/components/icons/hobbies';
import { HomeIcon } from '#/components/icons/home';
import { LearningIcon } from '#/components/icons/learning';
import { ProductivityIcon } from '#/components/icons/productivity';
import { ProfileIcon } from '#/components/icons/profile';
import type { IconProps } from '#/components/icons/props';
import { SelfCareIcon } from '#/components/icons/self-care';
import { WellnessIcon } from '#/components/icons/wellness';
import type { JSX } from '@adbl/unfinished/jsx-runtime';

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

export interface NavigationLink {
  name: string;
  path: string;
  icon: (props: IconProps) => JSX.Template;
}

export const navigationBarLinks: NavigationLink[] = [
  {
    name: 'Home',
    path: '/home',
    icon: HomeIcon,
  },
  {
    name: 'Insights',
    path: '/insights',
    icon: BarChartIcon,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: ProfileIcon,
  },
];
