import dbWorkerUrl from './db.worker?worker&url';
import type { DbWorkerProtocol, PromiseHandler } from './types';

const dbWorker = new Worker(dbWorkerUrl, { type: 'module' });
const messageIdToPromiseHandlerMap = new Map<string, PromiseHandler>();

dbWorker.addEventListener('message', (event) => {
  const data = event.data as DbWorkerProtocol.Message;
  const { id, message } = data;
  const { resolve } = messageIdToPromiseHandlerMap.get(id) ?? {};

  if (!resolve) {
    const event = new CustomEvent('unpromptedmessage', { detail: data });
    window.dispatchEvent(event);
    return;
  }

  resolve(message);
  messageIdToPromiseHandlerMap.delete(id);
});

/**
 * Sends a message to the database web worker and returns a promise that resolves with the worker's response.
 *
 * @template T - The type of the request message that extends WorkerProtocol.Requests.Request.
 * @param {T} message - The message to be sent to the worker.
 * @returns {Promise<DbWorkerProtocol.Response<T>>} A promise that resolves with the worker's response.
 */
export async function toDbWorker<T extends DbWorkerProtocol.Requests.Request>(
  message: T
): Promise<DbWorkerProtocol.Response<T>> {
  return new Promise((resolve, reject) => {
    const id = crypto.randomUUID();
    messageIdToPromiseHandlerMap.set(id, { reject, resolve });
    dbWorker.postMessage({
      id,
      message: JSON.parse(JSON.stringify(message)),
    } as DbWorkerProtocol.Message<T>);
  });
}

export async function echo<T>(value: T): Promise<T> {
  return await toDbWorker({ type: 'echo', value });
}
