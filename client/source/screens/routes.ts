import {
  defineRoute,
  defineRouterMiddleware,
  redirect,
} from '@adbl/unfinished/router';
import App from './app';
import Home from './home';
import Goals from './goals';
import Insights from './insights';
import Settings from './settings';
import { onboardingRouteTree } from './onboarding/onboarding.routes';
import { appLoadingState } from '#/data/state';

export const appRouteTree = defineRoute({
  name: 'App',
  path: '',
  component: App,
  redirect: '/home',
  children: [
    onboardingRouteTree,
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

export const onboardingMiddleware = defineRouterMiddleware((details) => {
  if (details.to.fullPath.startsWith('/onboarding')) return;

  if (appLoadingState.value !== 'done') {
    return redirect('/onboarding/enter-name');
  }
});
