import HomeIcon from '#/components/icons/home';
import BarChartIcon from '#/components/icons/bar-chart';

import type { IconProps } from '#/components/icons/props';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import SettingsIcon from '#/components/icons/settings';

export interface NavigationLink {
  name: string;
  path: string;
  Icon: (props: IconProps) => JSX.Template;
}

export const navigationBarLinks: NavigationLink[] = [
  {
    name: 'Home',
    path: '/home',
    Icon: HomeIcon,
  },
  {
    name: 'Insights',
    path: '/insights',
    Icon: BarChartIcon,
  },
  {
    name: 'Settings',
    path: '/settings',
    Icon: SettingsIcon,
  },
];
