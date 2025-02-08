import { handlePushNotification } from './push';
import {
  startScheduleLoop,
  stopScheduleLoop,
  updateScheduledNotifications,
} from './schedule';
import { Bridge } from '#/library/bridge';
import { handleNotificationClick } from './notification-click';

console.log('[notifications] Initializing');

self.addEventListener('push', handlePushNotification);
self.addEventListener('notificationclick', handleNotificationClick);
Bridge.receiver('notifications', {
  ping: async () => 'pong',
  startScheduleLoop,
  stopScheduleLoop,
  updateScheduledNotifications,
});
