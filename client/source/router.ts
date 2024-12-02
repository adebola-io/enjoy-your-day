import { createWebRouter, defineRoutes } from '@adbl/unfinished/router';
import { onboardingRoute } from '#/screens/onboarding/onboarding.routes';
import { appRoute } from '#/screens/app/app.routes';

export function createRouter() {
  const routes = defineRoutes([
    {
      name: 'App',
      path: '/',
      redirect: '/app/main/home',
      children: [onboardingRoute, appRoute],
    },
  ]);
  return createWebRouter({ routes, stackMode: true });
}
