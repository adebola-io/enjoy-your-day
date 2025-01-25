import { handlePushNotification } from './push';
import {
  startScheduleLoop,
  stopScheduleLoop,
  updateScheduledNotifications,
} from './schedule';
import { Bridge } from '#/library/bridge';

console.log('[notifications] Initializing');

self.addEventListener('push', handlePushNotification);
Bridge.receiver('notifications', {
  ping: async () => 'pong',
  startScheduleLoop,
  stopScheduleLoop,
  updateScheduledNotifications,
});
