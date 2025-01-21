import { BottomDrawer } from '#/components/bottom-drawer';
import XIcon from '#/components/icons/x';
import { Button } from '#/components/button';
import { removeRouteQuery, useRouteQueryPresence } from '#/library/utils';
import classes from './notification-denied-drawer.module.css';

export const notificationDeniedDrawerQuery = 'notifications-denied-drawer';
export default function NotificationDeniedDrawer() {
  const drawerIsOpen = useRouteQueryPresence(notificationDeniedDrawerQuery);
  const handleDrawerClose = async () => {
    await removeRouteQuery(notificationDeniedDrawerQuery, drawerIsOpen);
  };

  const toggleNestedDrawerAttribute = (value: boolean) => {
    document.body.toggleAttribute('data-nested-drawer-is-open', value);
  };

  drawerIsOpen.listen(toggleNestedDrawerAttribute);

  return (
    <BottomDrawer
      class={classes.drawer}
      shrinkTarget="#notificationsPrompt"
      open={drawerIsOpen}
      onClose={handleDrawerClose}
      onBeforeClose={toggleNestedDrawerAttribute}
    >
      <XIcon class={classes.icon} />
      <h3 class={classes.heading}>Permission Denied.</h3>
      <p class={classes.text}>
        Notifications have been blocked by your browser. Please check your
        privacy settings to enable them.
      </p>
      <Button
        class={classes.button}
        rounded
        variant="secondary"
        onClick={handleDrawerClose}
      >
        Close
      </Button>
    </BottomDrawer>
  );
}
