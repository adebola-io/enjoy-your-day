import { defineRoute } from '@adbl/unfinished/router';
import Start from '.';
import { NameForm } from './name';
import CategoriesSelection from './categories';

export const startRoute = defineRoute({
  name: 'Start View',
  path: 'start',
  component: Start,
  redirect: '/start/name',
  children: [
    {
      name: 'Start -Name Form',
      path: 'name',
      component: NameForm,
    },
    {
      name: 'Start - Categories Selection',
      path: 'categories',
      component: CategoriesSelection,
    },
  ],
});
