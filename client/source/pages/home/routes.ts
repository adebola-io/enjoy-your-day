import { defineRoutes, lazy } from '@adbl/dom/router';

export const homeRoutes = defineRoutes([
  {
    name: 'Home View',
    path: '/home',
    component: lazy(() => import('./index')),
  },
]);