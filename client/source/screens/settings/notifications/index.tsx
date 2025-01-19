import { BackButton } from '#/components/back-button';
import NotificationPromptDrawer, {
  notificationDrawerQuery,
} from './notification-prompt-drawer';
import { SettingsItem } from '#/components/settings-item';
import BellIcon from '#/components/icons/bell';
import { addRouteQuery } from '#/library/utils';
import { notificationsEnabled } from '#/data/state';
import { Cell } from '@adbl/cells';
import { If, useObserver } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import classes from './notifications.module.css';
import WifiIcon from '#/components/icons/wifi';
import { loadIconDataUrl } from '#/components/icon';
import { CSS_VARS } from '#/styles/variables';

export default function Notifications() {
  const router = useRouter();
  const route = router.getCurrentRoute();
  const containerRef = Cell.source<HTMLElement | null>(null);

  const notificationsPageIsOpen = Cell.derived(() => {
    return route.value.query.get('level-one') === 'notifications';
  });
  let loaded = false;
  const contentLoaded = Cell.derived(() => {
    if (notificationsPageIsOpen.value) loaded = true;
    return loaded;
  });

  return (
    <div
      ref={containerRef}
      class={classes.container}
      data-page-is-open={notificationsPageIsOpen}
    >
      {If(contentLoaded, NotificationsPageContent)}
    </div>
  );
}

function NotificationsPageContent() {
  const inputRef = Cell.source<HTMLInputElement | null>(null);
  const observer = useObserver();

  const showNotificationDrawer = async () => {
    await addRouteQuery(notificationDrawerQuery, 'true');
  };

  const handleNotificationsChange = function (this: HTMLInputElement) {
    if (notificationsEnabled.value && !this.checked) {
      notificationsEnabled.value = false;
      return;
    }
    if (this.checked && !notificationsEnabled.value) showNotificationDrawer();
    this.checked = false;
  };

  const sendTestNotification = async () => {
    const icon = await loadIconDataUrl('notification', {
      color: CSS_VARS['--space-cadet-200'],
    });
    new Notification('Testing...', {
      icon,
      body: 'This is a test notification from Enjoy Your Day.',
    });
  };

  const notificationChangeListener = (notificationsEnabled: boolean) => {
    if (!inputRef.value) return;
    inputRef.value.checked = notificationsEnabled;
  };

  observer.onConnected(inputRef, () => {
    notificationsEnabled.listen(notificationChangeListener);
    return () => notificationsEnabled.ignore(notificationChangeListener);
  });

  return (
    <>
      <BackButton class={classes.backButton} />
      <h2 class={classes.heading}>Notifications</h2>
      <SettingsItem
        type="toggle"
        inputRef={inputRef}
        title="Enable Notifications"
        description="Allow notifications to be displayed on your device."
        Icon={BellIcon}
        onChange={handleNotificationsChange}
        checked={notificationsEnabled}
      />
      <SettingsItem
        type="button"
        title="Test Notification"
        description="Triggers a test notification sent to your device."
        Icon={WifiIcon}
        onClick={sendTestNotification}
        disabled={Cell.derived(() => !notificationsEnabled.value)}
      />
      <NotificationPromptDrawer />
    </>
  );
}
