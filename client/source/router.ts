import { createWebRouter } from '@adbl/unfinished/router';
import { startRoutes } from './views/start/routes';

export function createRouter() {
  const routes = [
    {
      name: 'App',
      path: '/',
      redirect: '/start',
      children: [
        ...startRoutes,
      ],
    },
  ];
  return createWebRouter({ routes });
}