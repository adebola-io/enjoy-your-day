import { BottomDrawer } from '#/components/bottom-drawer';
import { removeRouteQuery } from '#/library/utils';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import { notificationsEnabled } from '#/data/state';
import classes from './notification-prompt-drawer.module.css';
import { Button } from '#/components/button';
import { PhoneMockup } from '#/components/phone-mockup';

export default function NotificationPromptDrawer() {
  const router = useRouter();
  const route = router.getCurrentRoute();

  const drawerIsOpen = Cell.derived(() =>
    route.value.query.has('notifications-prompt-drawer')
  );

  const handleDrawerClose = async () => {
    notificationsEnabled.value = Notification.permission === 'granted';
    await removeRouteQuery('notifications-prompt-drawer', drawerIsOpen);
  };

  return (
    <BottomDrawer
      class={classes.drawer}
      open={drawerIsOpen}
      shrinkTarget="#settingsView"
      onClose={handleDrawerClose}
      data-stagger-children={drawerIsOpen}
    >
      <div class={classes.phoneContainer}>
        <PhoneMockup
          class={classes.phone}
          phoneWidth="min(170px, 50dvw)"
          phoneColor="white"
          notchColor="white"
          contentClasses={classes.phoneContent}
        >
          heje
        </PhoneMockup>
      </div>
      <h2 class={classes.heading}>Enable Notifications.</h2>
      <p class={classes.text}>
        Notifications are used to inform you about new messages, updates, and
        other events.
      </p>
      <Button
        class={classes.closeButton}
        rounded
        variant="outlined"
        onClick={handleDrawerClose}
      >
        Close
      </Button>
      <Button class={classes.enableButton} rounded>
        Enable
      </Button>
    </BottomDrawer>
  );
}
