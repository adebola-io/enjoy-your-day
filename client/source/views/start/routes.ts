import { defineRoutes } from '@adbl/unfinished/router';
import Start from '.';

export const startRoutes = defineRoutes([
  {
    name: 'Start View',
    path: '/start',
    component: Start,
  },
]);
