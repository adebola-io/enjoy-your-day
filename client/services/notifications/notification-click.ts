import type { NotificationEvent } from './types';

export async function handleNotificationClick(event: NotificationEvent) {
  const { notification } = event;
  if (!notification) return;

  const { url } = notification.data ?? {};
  if (url) {
    const promiseChain = self.clients.openWindow(url);
    event.waitUntil?.(promiseChain);
    return;
  }

  notification.close?.();
}
