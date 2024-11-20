import { defineRoutes, lazy } from '@adbl/unfinished/router';

export const startRoutes = defineRoutes([
  {
    name: 'Start View',
    path: '/start',
    component: lazy(() => import('./index')),
  },
]);