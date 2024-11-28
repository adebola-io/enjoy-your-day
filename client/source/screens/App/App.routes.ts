import { defineRoute } from '@adbl/unfinished/router';
import App from '.';
import { mainLayoutRoute } from './MainLayout/MainLayout.routes';
import { autoSelectionRoute } from './AutoSelection/AutoSelection.routes';

export const appRoute = defineRoute({
  name: 'App View',
  path: 'app',
  component: App,
  children: [mainLayoutRoute, autoSelectionRoute],
});
