import { BADGE_URL } from '#/data/constants';
import type {
  FullNotificationOptions,
  NotificationData,
  PushEvent,
} from './types';

declare global {
  interface Window {
    registration: ServiceWorkerRegistration;
    pushManager: PushManager;
    notifications: Notification;
  }
}

export async function handlePushNotification(
  event: PushEvent<NotificationData>
) {
  if (!event.data) return;

  const payload = event.data.json();
  const { notification, data } = payload;
  if (!notification) return;

  const title = notification.title ?? 'Enjoy Your Day';
  const body =
    notification.body ?? 'This is a push message from Enjoy Your Day.';
  const icon = notification.icon ?? data?.icon;
  const image = notification.image ?? data?.image;
  const actions = data?.actions ?? [];
  const badge = BADGE_URL;

  const options: Partial<FullNotificationOptions> = {
    body,
    icon,
    image,
    actions,
    badge,
  };
  await self.registration.showNotification(title, options);
}
