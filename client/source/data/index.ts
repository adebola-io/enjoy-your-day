import HomeIcon from '#/components/icons/home';
import BarChartIcon from '#/components/icons/bar-chart';
import ProfileIcon from '#/components/icons/profile';

import type { IconProps } from '#/components/icons/props';
import type { JSX } from '@adbl/unfinished/jsx-runtime';

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
    name: 'Settings',
    path: '/settings',
    icon: ProfileIcon,
  },
];
