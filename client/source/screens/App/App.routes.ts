import { defineRoute } from '@adbl/unfinished/router';
import App from '.';
import Home from './Home';
import Goals from './Goals';
import Insights from './Insights';
import Settings from './Settings';

export const appRoute = defineRoute({
  name: 'App View',
  path: 'app',
  component: App,
  redirect: '/app/home',
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
