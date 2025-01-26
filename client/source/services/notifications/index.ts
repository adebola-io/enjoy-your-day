import { API_URL, BADGE_URL } from '#/data/constants';
import { morningTime, notificationsEnabled } from '#/data/state';
import workerUrl from './notifications.worker?worker&url';
import type { FullNotificationOptions, ScheduledNotification } from './types';
import { Bridge } from '#/library/bridge';
import { Cell } from '@adbl/cells';
// import { storeDeviceToken } from '../database';

let serviceWorkerRegistration: ServiceWorkerRegistration | null = null;

let toNotificationsWorker = Bridge.sender('notifications');
export const fcmToken = Cell.source<string | null>(null);
export const scheduledNotifications = Cell.source<ScheduledNotification[]>([]);

scheduledNotifications.listen(async (scheduled_notifications) => {
  await toNotificationsWorker({
    type: 'updateScheduledNotifications',
    scheduled_notifications,
  });
});

export async function triggerNotification(options: FullNotificationOptions) {
  if (!serviceWorkerRegistration) {
    console.warn('Service worker is not registered.');
    return;
  }
  if (notificationsEnabled.value === false) return;
  const { title, ...rest } = options;
  try {
    await serviceWorkerRegistration.showNotification(title, {
      badge: BADGE_URL,
      ...rest,
    });
  } catch (error) {
    console.error('Unable to show notification:', error);
  }
}

export async function subscribeToPushNotifications() {
  // if (!serviceWorkerRegistration) {
  //   console.warn('Service worker is not registered.');
  //   return;
  // }
  // try {
  //   const device_token = 'test-token';
  //   await storeDeviceToken(device_token);
  //   await toNotificationsWorker({ type: 'startScheduleLoop', device_token });
  //   await setDefaultNotifications();
  // } catch (error) {
  //   console.error('An error occurred while retrieving token. ', error);
  // }
}

export const disableNotifications = async () => {
  fcmToken.value = null;
  toNotificationsWorker({ type: 'stopScheduleLoop', apiUrl: API_URL });
};

export const registerNotificationServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported in this browser.');
    return;
  }

  const options: RegistrationOptions = { type: 'module' };
  const registration = await navigator.serviceWorker.register(
    workerUrl,
    options
  );
  serviceWorkerRegistration = registration;
  if (notificationsEnabled.value) await subscribeToPushNotifications();
  else await disableNotifications();
};

export const refreshNotificationsServiceWorker = async () => {
  if (!serviceWorkerRegistration) {
    console.warn('Service worker is not registered.');
    return;
  }

  await serviceWorkerRegistration.unregister();
  await disableNotifications();
  await registerNotificationServiceWorker();
  toNotificationsWorker = Bridge.sender('notifications');
};

export const setDefaultNotifications = async () => {
  const defaultNotifications: ScheduledNotification[] = [
    // Default Morning Notification.
    {
      hours: morningTime.value.hours,
      minutes: morningTime.value.minutes,
      notification_data: {
        title: 'Good Morning.',
        body: 'What will you do today? ✨',
        url: window.location.href,
      },
    },
  ];

  await toNotificationsWorker({
    type: 'updateScheduledNotifications',
    scheduled_notifications: defaultNotifications,
  });
};
