import { defineRoute } from '@adbl/unfinished/router';
import AutoSelection from '.';

export const autoSelectionRoute = defineRoute({
  name: 'Auto Selection for Goals',
  path: 'auto-select',
  transitionType: 'app-root',
  component: AutoSelection,
});
