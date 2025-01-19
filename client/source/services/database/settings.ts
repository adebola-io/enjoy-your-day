import { dexie } from './dexie';
import type { WorkerProtocol } from './types';

type RecordUserMetadataHandler =
  WorkerProtocol.Handler<WorkerProtocol.Requests.RecordMetadata>;

export const recordUserMetadata: RecordUserMetadataHandler = async (data) => {
  await dexie.userMetadata.add(data.message.metadata);
  return true;
};
