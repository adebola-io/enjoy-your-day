import { defineRoute } from '@adbl/unfinished/router';
import Onboarding from '.';
import EnterName from './enter-name';
import SelectCategories from './select-categories';
import Loading from './loading';

export const onboardingRouteTree = defineRoute({
  name: 'Onboarding View',
  path: 'onboarding',
  component: Onboarding,
  children: [
    {
      name: 'Onboarding - Enter Username',
      path: 'enter-name',
      component: EnterName,
    },
    {
      name: 'Onboarding - Select Categories',
      path: 'select-categories',
      component: SelectCategories,
    },
    {
      name: 'Onboarding - Loading',
      path: 'loading',
      component: Loading,
    },
  ],
});
