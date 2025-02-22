import NotificationPromptDrawer, {
  notificationDrawerQuery,
} from './notification-prompt-drawer';
import { SettingsItem, SettingsItemList } from '#/components/settings-item';
import TvIcon from '#/components/icons/tv';
import WifiIcon from '#/components/icons/wifi';
import BellIcon from '#/components/icons/bell';
import { StackLayerView } from '#/components/stack-layer-view';
import { notificationsEnabled } from '#/data/state';
import { loadIconDataUrl } from '#/components/icon';
import {
  triggerNotification,
  subscribeToPushNotifications,
  disableNotifications,
  refreshNotificationsServiceWorker,
} from '#/services/notifications';
import { CSS_VARS } from '#/styles/variables';
import { Cell } from '@adbl/cells';
import { useObserver } from '@adbl/unfinished';
import classes from './notifications.module.css';
import { addRouteQuery, useRouteQuery } from '@adbl/iota/utils/router';

export default function NotificationsLayer() {
  const observer = useObserver();
  const notificationsPageIsOpen = useRouteQuery('level-one', 'notifications');
  const inputRef = Cell.source<HTMLInputElement | null>(null);
  const itemsDisabled = Cell.derived(() => !notificationsEnabled.value);

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
    const color = CSS_VARS['--space-cadet-200'];
    await triggerNotification({
      title: 'Testing...',
      body: 'This is a test notification from Enjoy Your Day.',
      icon: await loadIconDataUrl('bell', { color }),
      vibrate: [100, 50, 100],
    });
  };

  const notificationChangeListener = (notificationsEnabled: boolean) => {
    if (!inputRef.value) return;
    inputRef.value.checked = notificationsEnabled;
    if (notificationsEnabled) subscribeToPushNotifications();
    else disableNotifications();
  };

  observer.onConnected(inputRef, () => {
    notificationsEnabled.listen(notificationChangeListener);
    return () => notificationsEnabled.ignore(notificationChangeListener);
  });

  return (
    <StackLayerView
      open={notificationsPageIsOpen}
      content={() => (
        <SettingsItemList
          subList
          id="notificationsView"
          class={classes.shrinkWrapper}
          heading="Notifications"
        >
          <SettingsItem
            type="toggle"
            inputRef={inputRef}
            title="Enable Notifications"
            description="Allow notifications to be displayed."
            Icon={BellIcon}
            onChange={handleNotificationsChange}
            checked={notificationsEnabled}
          />
          <SettingsItem
            type="button"
            title="Test Notification"
            description="Sends a test notification to your device."
            Icon={WifiIcon}
            onClick={sendTestNotification}
            disabled={itemsDisabled}
          />
          <SettingsItem
            type="button"
            title="Refresh Service"
            description="Reregisters the service for handling notifications."
            Icon={TvIcon}
            onClick={refreshNotificationsServiceWorker}
            disabled={itemsDisabled}
          />
          <NotificationPromptDrawer />
        </SettingsItemList>
      )}
    />
  );
}
