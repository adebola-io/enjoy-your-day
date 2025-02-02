import { BottomDrawer } from '#/components/bottom-drawer';
import { Button } from '#/components/button';
import { resetAllData } from '#/data/state';
import { removeRouteQuery, useRouteQuery } from '#/library/utils';
import classes from './reset.module.css';

export default function ResetDataDrawer() {
  const goBack = () => removeRouteQuery('level-one');

  const reset = async () => {
    await goBack();
    setTimeout(async () => {
      await resetAllData();
      window.location.reload();
    }, 300);
  };

  return (
    <BottomDrawer
      class={classes.drawer}
      open={useRouteQuery('level-one', 'reset')}
      onClose={goBack}
      shrinkTarget="#settingsView"
    >
      <h2 class={classes.heading}>Delete all data?</h2>
      <p class={classes.paragraph}>
        You are attempting to reset all your user data. This will delete your
        progress, current daily goals, notification settings and insights. Are
        you sure you want to continue?
      </p>
      <b class={classes.emphasis}>This action cannot be undone.</b>
      <Button variant="outlined" rounded vibrate onClick={reset}>
        Delete
      </Button>
      <Button variant="secondary" rounded vibrate onClick={goBack}>
        Cancel
      </Button>
    </BottomDrawer>
  );
}
