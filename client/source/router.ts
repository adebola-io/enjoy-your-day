import { createWebRouter, defineRoutes } from '@adbl/unfinished/router';
import { onboardingRoute } from '#/screens/Onboarding/Onboarding.routes';
import { appRoute } from './screens/App/App.routes';

export function createRouter() {
  const routes = defineRoutes([
    {
      name: 'App',
      path: '/',
      redirect: '/app/user/home',
      children: [onboardingRoute, appRoute],
    },
  ]);
  return createWebRouter({ routes, stackMode: true });
}
