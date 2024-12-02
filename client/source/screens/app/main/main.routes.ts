import { defineRoute } from '@adbl/unfinished/router';
import Main from '.';
import Home from './home';
import Goals from './goals';
import Insights from './insights';
import Settings from './settings';

export const mainRoute = defineRoute({
  name: 'App - Main Layout',
  path: 'main',
  component: Main,
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
