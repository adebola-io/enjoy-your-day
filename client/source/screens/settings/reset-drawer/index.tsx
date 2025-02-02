import { BottomDrawer } from '#/components/bottom-drawer';
import { Button } from '#/components/button';
import { resetAllData } from '#/data/state';
import { removeRouteQuery, useRouteQuery } from '#/library/utils';
import classes from './reset.module.css';

export default function ResetDataDrawer() {
  return (
    <BottomDrawer
      class={classes.drawer}
      open={useRouteQuery('level-one', 'reset')}
      onClose={() => removeRouteQuery('level-one')}
      shrinkTarget="#settingsView"
    >
      <h2>Delete all data?</h2>
      <Button rounded vibrate onClick={resetAllData}>
        Delete
      </Button>
    </BottomDrawer>
  );
}
