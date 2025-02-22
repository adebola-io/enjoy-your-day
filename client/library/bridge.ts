import type { Db } from '#/services/database/types';
import type { Notifications } from '#/services/notifications/types';

type ChannelName = 'db' | 'notifications';
interface ChannelSenders {
  db: Db.Fn;
  notifications: Notifications.Fn;
}
interface ChannelMessageMaps {
  db: Db.MessageHandlerMap;
  notifications: Notifications.MessageHandlerMap;
}

export interface PromiseHandler {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  resolve: Function;
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  reject: Function;
}

export const Bridge = {
  /**
   * Creates an async sender function for communication with a different worker.
   * @param name - The name of the BroadcastChannel to use for communication.
   * @param then - A callback that should fire once a stable connection has been established.
   * @returns A sender function that can be used to send messages to the receiver.
   */
  sender<C extends ChannelName>(name: C, then?: () => void): ChannelSenders[C] {
    let receiverReady = false;
    let callbackFired = false;
    const idToPromiseMap = new Map<string, PromiseHandler>();
    const messageQueue: Array<{ id: string; message: unknown }> = [];
    const channel = new BroadcastChannel(name);

    const handleSend = (data: unknown) => {
      return new Promise((resolve, reject) => {
        const id = crypto.randomUUID();
        const message = JSON.parse(JSON.stringify(data));

        idToPromiseMap.set(id, { reject, resolve });

        if (receiverReady) {
          channel.postMessage({ id, message });
        } else {
          messageQueue.push({ id, message });
        }
      });
    };

    const handleResponse = (event: MessageEvent) => {
      const { id, message } = event.data;

      if (message === 'RECEIVER_READY') {
        receiverReady = true;
        while (messageQueue.length > 0) {
          channel.postMessage(messageQueue.shift());
        }
        if (!callbackFired) {
          then?.();
          callbackFired = true;
        }
        return;
      }

      const { resolve } = idToPromiseMap.get(id) ?? {};
      if (!resolve) {
        const detail = { data: { id, message }, channel };
        dispatchEvent(new CustomEvent('unpromptedmessage', { detail }));
        return;
      }
      resolve(message);
      idToPromiseMap.delete(id);
    };

    channel.addEventListener('message', handleResponse);
    channel.postMessage({ id: crypto.randomUUID(), message: 'SENDER_READY' });

    return handleSend as ChannelSenders[C];
  },

  /**
   * Initializes a handler for messages that are received through a broadcast channel.
   * @param name - The name of the BroadcastChannel to use for communication.
   * @param handlers - An object that maps message types to handler functions.
   * @returns A receiver function that can be used to handle messages from the sender.
   */
  receiver<C extends ChannelName>(name: C, handlers: ChannelMessageMaps[C]) {
    const channel = new BroadcastChannel(name);
    channel.onmessage = async (event: MessageEvent) => {
      const data = event.data;
      const { id } = data;

      if (data.message === 'SENDER_READY') {
        channel.postMessage({ id, message: 'RECEIVER_READY' });
        return;
      }

      if (data.message === 'RECEIVER_READY') return;
      if (data.message?.type && data.message.type in handlers) {
        // @ts-ignore: The type of the message is checked in the messageHandlers map.
        const response = await handlers[data.message.type]?.(data);
        channel.postMessage({ id, message: response });
      }
    };
    channel.postMessage({ id: crypto.randomUUID(), message: 'RECEIVER_READY' });
  },
};
