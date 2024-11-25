import { defineRoute } from '@adbl/unfinished/router';
import App from '.';

export const appRoute = defineRoute({
  name: 'App View',
  path: 'app',
  component: App,
});
