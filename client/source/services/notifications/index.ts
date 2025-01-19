import { getLogoDataUrl } from '#/components/logo';
import { FIREBASE_MESSAGING_VAPID_KEY } from '#/data/constants';
import { notificationsEnabled } from '#/data/state';
import { Cell } from '@adbl/cells';
import workerUrl from './notifications.worker?worker&url';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

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
const firebaseConfig = {
  apiKey: 'AIzaSyA7vYoPHtPE841wGcECSN2nE7sV2NB2MJQ',
  authDomain: 'enjoy-your-day-cb467.firebaseapp.com',
  projectId: 'enjoy-your-day-cb467',
  storageBucket: 'enjoy-your-day-cb467.firebasestorage.app',
  messagingSenderId: '643320215252',
  appId: '1:643320215252:web:89b9597ea15ec4e7692d41',
  measurementId: 'G-PSVB87DW1W',
};

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
    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);
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
};
