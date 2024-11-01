import { createWebRouter } from '@adbl/dom/router';
import { homeRoutes } from './pages/home/routes';

export function createRouter() {
  const routes = [
    {
      name: 'App',
      path: '/',
      redirect: '/home',
      children: [
        ...homeRoutes,
      ],
    },
  ];
  return createWebRouter({ routes });
}