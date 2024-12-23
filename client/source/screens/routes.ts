import {
  defineRoute,
  defineRouterMiddleware,
  redirect,
} from '@adbl/unfinished/router';
import App from './app';
import Home from './home';
import Insights from './insights';
import Profile from './profile';
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
      name: 'App - Insights',
      path: 'insights',
      component: Insights,
    },
    {
      name: 'App - Profile',
      path: 'profile',
      component: Profile,
    },
  ],
});

export const onboardingMiddleware = defineRouterMiddleware((details) => {
  if (details.to.fullPath.startsWith('/onboarding')) return;

  if (appLoadingState.value !== 'done') {
    return redirect('/onboarding/enter-name');
  }
});
