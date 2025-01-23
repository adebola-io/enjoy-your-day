import type { NotificationPayload } from 'firebase/messaging';

interface ServiceWorkerScope extends Window {
  registration: ServiceWorkerRegistration;
  pushManager: PushManager;
  notifications: Notification;
}

interface NotificationData {
  notification: NotificationPayload;
  data: unknown;
}

interface PushEvent<T> extends Event {
  data?: { json: () => T };
}

interface BadgeSetRequest {
  type: 'setBadgeUrl';
  badgeUrl: string;
}

const worker = self as unknown as ServiceWorkerScope;
let badge: string;

async function handlePushNotification(event: PushEvent<NotificationData>) {
  if (!event.data) return;

  const { notification } = event.data.json();
  const title = notification.title ?? 'Enjoy Your Day';
  const body =
    notification.body ?? 'This is a push message from Enjoy Your Day.';
  const icon = notification.icon;
  const image = notification.image;

  const options = {
    body,
    icon,
    image,
    badge,
  } as NotificationOptions;
  await worker.registration.showNotification(title, options);
}

async function handleNotificationClick(event: Event) {
  console.log('[notifications] Notification clicked', event);
}

function setBadgeUrl(event: MessageEvent<BadgeSetRequest>) {
  if (event.data.type !== 'setBadgeUrl') return;
  badge = event.data.badgeUrl;
}

console.log('[notifications] Initializing');
addEventListener('push', handlePushNotification);
addEventListener('message', setBadgeUrl);
addEventListener('notificationclick', handleNotificationClick);
