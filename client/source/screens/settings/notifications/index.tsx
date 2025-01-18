import { BackButton } from '#/components/back-button';
import NotificationPromptDrawer from './notification-prompt-drawer';
import { SettingsItem } from '#/components/settings-item';
import BellIcon from '#/components/icons/bell';
import { addRouteQuery } from '#/library/utils';
import { notificationsEnabled } from '#/data/state';
import { Cell } from '@adbl/cells';
import { If } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import classes from './notifications.module.css';

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
  const showNotificationDrawer = async () => {
    await addRouteQuery('notifications-prompt-drawer', 'true');
  };

  const handleNotificationsChange = function (this: HTMLInputElement) {
    if (this.checked && !notificationsEnabled.value) showNotificationDrawer();
    this.checked = false;
  };

  notificationsEnabled.listen((notificationsEnabled) => {
    if (!inputRef.value) return;
    inputRef.value.checked = notificationsEnabled;
  });

  return (
    <div>
      <BackButton class={classes.backButton} />
      <h1 class={classes.heading}>Notifications</h1>
      <SettingsItem
        type="toggle"
        inputRef={inputRef}
        title="Enable Notifications"
        description="Allow notifications to be displayed on your device."
        Icon={BellIcon}
        onChange={handleNotificationsChange}
        checked={notificationsEnabled}
      />
      <NotificationPromptDrawer />
    </div>
  );
}
