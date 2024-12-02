import { defineRoute } from '@adbl/unfinished/router';
import App from '.';
import { mainRoute } from './main/main.routes';
import { autoSelectRoute } from './auto-select/auto-select.routes';

export const appRoute = defineRoute({
  name: 'App View',
  path: 'app',
  component: App,
  children: [mainRoute, autoSelectRoute],
});
