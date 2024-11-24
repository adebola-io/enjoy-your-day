import { createWebRouter } from '@adbl/unfinished/router';
import { startRoute } from '@/views/start/routes';

export function createRouter() {
  const routes = [
    {
      name: 'App',
      path: '/',
      redirect: '/start',
      children: [startRoute],
    },
  ];
  return createWebRouter({ routes });
}
