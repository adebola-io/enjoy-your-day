import { defineRoute } from '@adbl/unfinished/router';
import Home from './Home';
import Goals from './Goals';
import Insights from './Insights';
import Settings from './Settings';
import MainLayout from '.';

export const mainLayoutRoute = defineRoute({
  name: 'App - Main Layout',
  path: 'user',
  component: MainLayout,
  transitionType: 'app-root',
  children: [
    {
      name: 'App - Home',
      path: 'home',
      component: Home,
    },
    {
      name: 'App - Goals',
      path: 'goals',
      component: Goals,
    },
    {
      name: 'App - Insights',
      path: 'insights',
      component: Insights,
    },
    {
      name: 'App - Settings',
      path: 'settings',
      component: Settings,
    },
  ],
});
