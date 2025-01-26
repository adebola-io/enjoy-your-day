import { BottomDrawer } from '#/components/bottom-drawer';
import { Button } from '#/components/button';
import { Logo } from '#/components/logo';
import SimpleCheckIcon from '#/components/icons/simple-check';
import BellIcon from '#/components/icons/bell';
import { PhoneMockup } from '#/components/phone-mockup';
import {
  addRouteQuery,
  removeRouteQuery,
  useRouteQuery,
} from '#/library/utils';
import { Cell } from '@adbl/cells';
import { notificationsEnabled } from '#/data/state';
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from '#/data/constants';
import {
  PhoneNotification,
  type PhoneNotificationProps,
} from '#/components/phone-notification';
import { For } from '@adbl/unfinished';
import { Temporal } from 'temporal-polyfill';
import NotificationDeniedDrawer, {
  notificationDeniedDrawerQuery,
} from './notification-denied-drawer';
import {
  isMaybeMobileOrSafari,
  isRunningAsStandaloneApp,
} from '#/library/app-environment';
import {
  InstallationInstructionsDrawer,
  installInstructionsDrawerQuery,
} from '#/screens/onboarding/install-prompt-drawer/nested-drawer';
import classes from './notification-prompt-drawer.module.css';

export const notificationDrawerQuery = 'notifications-prompt-drawer';
export default function NotificationPromptDrawer() {
  const drawerIsOpen = useRouteQuery(notificationDrawerQuery);
  const today = Temporal.Now.zonedDateTimeISO().withTimeZone(DEFAULT_TIMEZONE);
  const currentDate = today.toLocaleString(DEFAULT_LOCALE, {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  const currentTime = today.toLocaleString(DEFAULT_LOCALE, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  const notificationListStyles = { '--total': mockNotifications.length };
  const checkRef = Cell.source<SVGElement | null>(null);

  const handleDrawerClose = async () => {
    await removeRouteQuery(notificationDrawerQuery, drawerIsOpen);
  };

  const finishAnimations = async () => {
    if (!checkRef.value) return;
    await Promise.all(checkRef.value.getAnimations().map((a) => a.finished));
  };

  const requestNotificationPermission = async () => {
    if (!isRunningAsStandaloneApp() && (await isMaybeMobileOrSafari())) {
      await addRouteQuery(installInstructionsDrawerQuery);
      return;
    }

    const result = await Notification.requestPermission();

    if (result === 'denied') {
      await addRouteQuery(notificationDeniedDrawerQuery);
      return;
    }

    if (result === 'granted') {
      notificationsEnabled.value = Notification.permission === 'granted';
      await finishAnimations().then(handleDrawerClose);
    }
  };

  return (
    <BottomDrawer
      id="notificationsPrompt"
      class={classes.drawer}
      open={drawerIsOpen}
      shrinkTarget="#notificationsView"
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
          inert
          data-notifications-enabled={notificationsEnabled}
        >
          <SimpleCheckIcon ref={checkRef} class={classes.check} />
          <BellIcon class={classes.bellIcon} />
          <span class={classes.todaysDate}>{currentDate}</span>
          <time class={classes.currentTime}>{currentTime}</time>
          <ul class={classes.notifications} style={notificationListStyles}>
            {For(mockNotifications, (notification, index) => (
              <PhoneNotification
                {...notification}
                class={classes.notification}
                style={{ '--index': index }}
              />
            ))}
          </ul>
        </PhoneMockup>
      </div>
      <h2 class={classes.heading}>Enable Notifications.</h2>
      <p class={classes.text}>
        Enable notifications to receive gentle reminders and updates tailored
        just for you.
      </p>
      <Button
        class={classes.closeButton}
        rounded
        variant="outlined"
        onClick={handleDrawerClose}
      >
        Close
      </Button>
      <Button
        class={classes.enableButton}
        rounded
        onClick={requestNotificationPermission}
      >
        Enable
      </Button>
      <NotificationDeniedDrawer />
      <InstallationInstructionsDrawer shrinkTarget="#notificationsPrompt">
        <p class={classes.addendum}>
          Enjoy Your Day must be installed to receive notifications.
        </p>
      </InstallationInstructionsDrawer>
    </BottomDrawer>
  );
}

const mockNotifications: PhoneNotificationProps[] = [
  {
    time: 'now',
    Icon: Logo,
    title: 'Almost there!',
    description: 'Just one goal left for today!',
  },
  {
    time: '2m ago',
    Icon: Logo,
    title: 'Final Goal',
    description: 'Make a budget for the week.',
  },
  {
    time: '1h ago',
    Icon: Logo,
    title: 'Bravo!',
    description: "You've completed your first goal of the day. Well done!",
  },
];
