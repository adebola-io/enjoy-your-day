import { dexie } from './dexie';
import type { DbWorkerProtocol } from './types';

type RecordUserMetadataHandler =
  DbWorkerProtocol.Handler<DbWorkerProtocol.Requests.RecordMetadata>;

type UpdateUsernameHandler =
  DbWorkerProtocol.Handler<DbWorkerProtocol.Requests.UpdateUsername>;

export const recordUserMetadata: RecordUserMetadataHandler = async (data) => {
  await dexie.userMetadata.add(data.message.metadata);
  return true;
};

export const updateUsername: UpdateUsernameHandler = async (data) => {
  const metadata = await dexie.userMetadata.toArray();
  if (metadata.length === 0) return false;
  await dexie.userMetadata.update(metadata[0].uuid, {
    name: data.message.username,
  });
  return true;
};
