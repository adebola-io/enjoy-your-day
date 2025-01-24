import type { NotificationPayload } from 'firebase/messaging';
import type { ExtraNotificationOptions } from '.';

interface ServiceWorkerScope extends Window {
  registration: ServiceWorkerRegistration;
  pushManager: PushManager;
  notifications: Notification;
}

interface NotificationData {
  notification: NotificationPayload;
  data: Partial<ExtraNotificationOptions>;
}

interface NotificationEvent extends Event {
  notification?: Notification;
  action?: string;
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

  const payload = event.data.json();
  const { notification, data } = payload;
  console.log('Payload', payload);
  const title = notification.title ?? 'Enjoy Your Day';
  const body =
    notification.body ?? 'This is a push message from Enjoy Your Day.';
  const icon = notification.icon ?? data?.icon;
  const image = notification.image ?? data?.image;
  const actions = data?.actions ?? [];

  const options: Partial<ExtraNotificationOptions> = {
    body,
    icon,
    image,
    badge,
    actions,
  };
  await worker.registration.showNotification(title, options);
}

async function handleNotificationClick(event: NotificationEvent) {
  if (!event.notification) return;
  console.log('Clicked notification', event.notification);
  const { data } = event.notification;
  event.notification.close?.();
  if (!data) return;

  // if (data.url) {
  // event.waitUntil(worker.clients.openWindow(data.url));
  // }

  if (!event.action) return;
}

function setBadgeUrl(event: MessageEvent<BadgeSetRequest>) {
  if (event.data.type !== 'setBadgeUrl') return;
  badge = event.data.badgeUrl;
}

console.log('[notifications] Initializing');
addEventListener('push', handlePushNotification);
addEventListener('message', setBadgeUrl);
addEventListener('notificationclick', handleNotificationClick);
