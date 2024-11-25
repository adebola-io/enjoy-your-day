import { createWebRouter } from '@adbl/unfinished/router';
import { startRoute } from '@/views/start/start.routes';
import { appRoute } from './views/app/app.routes';

export function createRouter() {
  const routes = [
    {
      name: 'App',
      path: '/',
      redirect: '/start',
      children: [startRoute, appRoute],
    },
  ];
  return createWebRouter({ routes, stackMode: true });
}
