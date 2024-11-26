import { defineRoute } from '@adbl/unfinished/router';
import Onboarding from '.';
import EnterUsername from './EnterUsername';
import SelectCategories from './SelectCategories';
import Loading from './Loading';

export const onboardingRoute = defineRoute({
  name: 'Onboarding View',
  path: 'onboarding',
  component: Onboarding,
  redirect: '/onboarding/enter-name',
  children: [
    {
      name: 'Onboarding - Enter Username',
      path: 'enter-name',
      component: EnterUsername,
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
