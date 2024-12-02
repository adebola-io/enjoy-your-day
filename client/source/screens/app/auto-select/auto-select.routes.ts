import { defineRoute } from '@adbl/unfinished/router';
import AutoSelect from '.';

export const autoSelectRoute = defineRoute({
  name: 'Auto Selection for Goals',
  path: 'auto-select',
  transitionType: 'app-root',
  component: AutoSelect,
});
