import { getLogoDataUrl } from '#/components/logo';
import {
  FIREBASE_CONFIG,
  FIREBASE_MESSAGING_VAPID_KEY,
} from '#/data/constants';
import { notificationsEnabled } from '#/data/state';
import { Cell } from '@adbl/cells';
import workerUrl from './notifications.worker?worker&url';
import { initializeApp } from 'firebase/app';
import {
  deleteToken,
  getMessaging,
  getToken,
  type Messaging,
} from 'firebase/messaging';

export type NotificationAction = {
  actions: string;
  title: string;
  icon: string;
};

export interface ExtraNotificationOptions extends NotificationOptions {
  title: string;
  actions?: NotificationAction[];
  vibrate?: VibratePattern;
  silent?: boolean;
  requireInteraction?: boolean;
  renotify?: boolean;
}

export const fcmToken = Cell.source<string | null>(null);
let serviceWorkerRegistration: ServiceWorkerRegistration | null = null;
let firebaseInitialized = false;
let messaging: Messaging | null = null;

export async function triggerNotification(options: ExtraNotificationOptions) {
  if (!serviceWorkerRegistration) {
    console.warn('Service worker is not registered.');
    return;
  }

  const { title, ...rest } = options;
  try {
    await serviceWorkerRegistration.showNotification(title, rest);
  } catch (error) {
    console.error('Unable to show notification:', error);
  }
}

export async function subscribeToPushNotifications() {
  if (firebaseInitialized) return;
  if (!serviceWorkerRegistration) {
    console.warn('Service worker is not registered.');
    return;
  }

  try {
    const firebaseApp = initializeApp(FIREBASE_CONFIG);
    messaging = getMessaging(firebaseApp);
    const token = await getToken(messaging, {
      vapidKey: FIREBASE_MESSAGING_VAPID_KEY,
      serviceWorkerRegistration,
    });
    fcmToken.value = token;

    if (!token) {
      console.warn('No FCM token available.');
      return;
    }
  } catch (error) {
    console.error('An error occurred while retrieving token. ', error);
  }
  firebaseInitialized = true;
}

export const disableNotifications = async () => {
  if (!messaging) return;
  firebaseInitialized = false;
  await deleteToken(messaging);
  fcmToken.value = null;
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
  serviceWorkerRegistration.active?.postMessage({
    type: 'setBadgeUrl',
    badgeUrl: getLogoDataUrl(),
  });
  if (notificationsEnabled.value) await subscribeToPushNotifications();
  else await disableNotifications();
};
