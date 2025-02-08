export namespace Notifications {
  export namespace Requests {
    export type Ping = {
      type: 'ping';
    };
    export interface StartScheduleLoop {
      type: 'startScheduleLoop';
      device_token: string;
    }
    export interface StopScheduleLoop {
      type: 'stopScheduleLoop';
    }
    export interface UpdateScheduledNotifications {
      type: 'updateScheduledNotifications';
      scheduled_notifications: ScheduledNotification[];
    }
    export type Request =
      | Ping
      | StartScheduleLoop
      | StopScheduleLoop
      | UpdateScheduledNotifications;
  }

  export type Response<T extends Requests.Request> = T extends Requests.Ping
    ? 'pong'
    : T extends Requests.StartScheduleLoop
    ? string
    : T extends Requests.StopScheduleLoop
    ? string
    : T extends Requests.UpdateScheduledNotifications
    ? string
    : unknown;

  export interface Message<T extends Requests.Request | unknown = unknown> {
    id: string;
    message: T;
  }

  export type Listener = <T extends Notifications.Requests.Request>(
    event: MessageEvent<Notifications.Message<T>>
  ) => void;

  export type Fn = <T extends Notifications.Requests.Request>(
    message: T
  ) => Promise<Notifications.Response<T>>;

  export type Handler<T extends Notifications.Requests.Request> = (
    data: Notifications.Message<T>
  ) => Promise<Notifications.Response<T>>;

  type RequestFromType<T> = Requests.Request extends infer V
    ? V extends Requests.Request
      ? T extends V['type']
        ? V
        : never
      : never
    : never;

  export type MessageHandlerMap = {
    [key in Requests.Request['type']]: (
      data: Message<RequestFromType<key>>
    ) => Promise<Response<RequestFromType<key>>>;
  };
}

export interface FullNotificationOptions extends NotificationOptions {
  title: string;
  actions?: NotificationAction[];
  vibrate?: VibratePattern;
  silent?: boolean;
  requireInteraction?: boolean;
  renotify?: boolean;
  image?: string;
}

export type NotificationAction = {
  action: string;
  title: string;
  type: string;
  icon: string;
};

export interface ScheduledNotification {
  hours: number;
  minutes: number;
  notification_data: FullNotificationOptions & CustomNotificationOptions;
}

export interface NotificationData {
  notification?: {
    /**
     * The notification's title.
     */
    title?: string;
    /**
     * The notification's body text.
     */
    body?: string;
    /**
     * The URL of an image that is downloaded on the device and displayed in the notification.
     */
    image?: string;
    /**
     * The URL to use for the notification's icon. If you don't send this key in the request,
     * FCM displays the launcher icon specified in your app manifest.
     */
    icon?: string;
  };
  data?: Partial<FullNotificationOptions & CustomNotificationOptions>;
}

export interface CustomNotificationOptions {
  url?: string;
}

export interface NotificationEvent extends Event {
  notification?: Notification;
  action?: string;
  waitUntil?: (promise: Promise<unknown>) => void;
}

export interface PushEvent<T> extends Event {
  data?: { json: () => T };
}
