import { BottomDrawer } from '#/components/bottom-drawer';
import { Button } from '#/components/button';
import WarningIcon from '#/components/icons/warning';
import { resetAllData } from '#/data/state';
import { defer, removeRouteQuery, useRouteQuery } from '#/library/utils';
import { Cell } from '@adbl/cells';
import classes from './reset.module.css';

export default function ResetDataDrawer() {
  const isOpen = useRouteQuery('level-one', 'reset');
  const goBack = () => removeRouteQuery('level-one');
  const drawerRef = Cell.source<HTMLDialogElement | null>(null);

  const reset = async () => {
    await goBack();
    defer(async () => {
      if (!drawerRef.value) return;
      await Promise.all(drawerRef.value.getAnimations().map((a) => a.finished));
      await new Promise((r) => setTimeout(r, 200));
      await resetAllData();
      window.location.reload();
    });
  };

  return (
    <BottomDrawer
      ref={drawerRef}
      class={classes.drawer}
      open={isOpen}
      onClose={goBack}
      shrinkTarget="#settingsView"
      data-stagger-children={isOpen}
    >
      <div class={classes.iconContainer}>
        <WarningIcon class={classes.icon} />
      </div>
      <h2 class={classes.heading}>Delete all data?</h2>
      <p class={classes.paragraph}>
        You are about to reset all your data. This will delete your progress,
        daily goals, notification settings and insights.{' '}
        <b class={classes.emphasis}>This action cannot be undone.</b> Are you
        sure?
      </p>
      <Button
        class={classes.cancelBtn}
        variant="outlined"
        rounded
        vibrate
        onClick={goBack}
      >
        Cancel
      </Button>
      <Button
        class={classes.actionBtn}
        variant="secondary"
        rounded
        vibrate
        onClick={reset}
      >
        Delete
      </Button>
    </BottomDrawer>
  );
}
