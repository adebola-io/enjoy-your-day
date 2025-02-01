import { dexie } from './dexie';
import type { Db } from './types';

type RecordUserMetadataHandler = Db.Handler<Db.Requests.RecordMetadata>;
type UpdateUsernameHandler = Db.Handler<Db.Requests.UpdateUsername>;
type GetUserUuidHandler = Db.Handler<Db.Requests.GetUserUuid>;
type StoreDeviceTokenHandler = Db.Handler<Db.Requests.StoreDeviceToken>;
type GetDeviceTokenHandler = Db.Handler<Db.Requests.GetDeviceToken>;
type ResetDataHandler = Db.Handler<Db.Requests.ResetAllData>;

export const storeDeviceToken: StoreDeviceTokenHandler = async (data) => {
  const metadata = await dexie.userMetadata.toArray();
  await dexie.userMetadata.update(metadata[0].uuid, {
    deviceToken: data.message.deviceToken,
  });
  return true;
};

export const getDeviceToken: GetDeviceTokenHandler = async () => {
  const metadata = await dexie.userMetadata.toArray();
  if (metadata.length === 0) return null;
  return metadata[0].deviceToken;
};

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

export const getUserUuid: GetUserUuidHandler = async () => {
  const metadata = await dexie.userMetadata.toArray();
  if (metadata.length === 0) return '';
  return metadata[0].uuid;
};

export const resetAllData: ResetDataHandler = async () => {
  await dexie.goals.clear();
  await dexie.userMetadata.clear();
  await dexie.history.clear();
  return true;
};
