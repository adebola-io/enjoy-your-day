import { Bridge } from '#/library/bridge';
import {
  API_URL,
  DEFAULT_TIMEZONE,
  NOTIFICATION_SCHEDULE_INTERVAL,
} from '#/data/constants';
import type { Notifications, ScheduledNotification } from './types';

type StartScheduleLoopHandler =
  Notifications.Handler<Notifications.Requests.StartScheduleLoop>;
type StopScheduleLoopHandler =
  Notifications.Handler<Notifications.Requests.StopScheduleLoop>;
type UpdateScheduledNotificationsHandler =
  Notifications.Handler<Notifications.Requests.UpdateScheduledNotifications>;

let intervalId: ReturnType<typeof setInterval>;
const toDbWorker = Bridge.sender('db');
const scheduled_notifications: ScheduledNotification[] = [];

export const startScheduleLoop: StartScheduleLoopHandler = async (data) => {
  const { device_token } = data.message;
  const uuid = await toDbWorker({ type: 'metadata.uuid' });
  await sendUpdateToServer(uuid, device_token);

  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(
    () => sendUpdateToServer(uuid, device_token),
    NOTIFICATION_SCHEDULE_INTERVAL
  );

  return 'ok';
};

async function sendUpdateToServer(uuid: string, device_token: string) {
  const timezone = DEFAULT_TIMEZONE;

  await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      uuid,
      data: { timezone, device_token, scheduled_notifications },
    }),
  });
}

export const stopScheduleLoop: StopScheduleLoopHandler = async () => {
  const uuid = await toDbWorker({ type: 'metadata.uuid' });

  if (intervalId) clearInterval(intervalId);

  await fetch(`${API_URL}/delete`, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uuid }),
  });
  return 'ok';
};

export const updateScheduledNotifications: UpdateScheduledNotificationsHandler =
  async (data) => {
    scheduled_notifications.length = 0;
    for (const notification of data.message.scheduled_notifications) {
      scheduled_notifications.push(notification);
    }
    const uuid = await toDbWorker({ type: 'metadata.uuid' });
    const device_token = await toDbWorker({ type: 'metadata.get.deviceToken' });
    if (!device_token) return 'ok';
    sendUpdateToServer(uuid, device_token);
    return 'ok';
  };
