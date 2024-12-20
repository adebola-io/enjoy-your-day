import dbWorkerUrl from './db.worker?worker&url';
import type { WorkerProtocol, PromiseHandler } from './types';

const dbWorker = new Worker(dbWorkerUrl, { type: 'module' });
const messageIdToPromiseHandlerMap = new Map<string, PromiseHandler>();

dbWorker.addEventListener('message', (event) => {
  const data = event.data as WorkerProtocol.Message;
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

export async function toWorker<T extends WorkerProtocol.Requests.Request>(
  message: T
): Promise<WorkerProtocol.Response<T>> {
  return new Promise((resolve, reject) => {
    const id = crypto.randomUUID();
    messageIdToPromiseHandlerMap.set(id, { reject, resolve });
    dbWorker.postMessage({ id, message } as WorkerProtocol.Message<T>);
  });
}

export async function echo<T>(value: T): Promise<T> {
  return await toWorker({ type: 'echo', value });
}
