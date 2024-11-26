import { createWebRouter } from '@adbl/unfinished/router';
import { onboardingRoute } from '@/screens/Onboarding/Onboarding.routes';
import { appRoute } from './screens/App/App.routes';

export function createRouter() {
  const routes = [
    {
      name: 'App',
      path: '/',
      children: [onboardingRoute, appRoute],
    },
  ];
  return createWebRouter({ routes, stackMode: true });
}
