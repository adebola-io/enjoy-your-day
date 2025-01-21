import type { FirebaseOptions } from 'firebase/app';

export const ONBOARDING_LOADING_DELAY = 2000;
export const LATEST_DATA_CHUNK = 14;
export const MAX_USERNAME_LENGTH = 15;
export const FIREBASE_MESSAGING_VAPID_KEY: string = import.meta.env
  .VITE_FIREBASE_MESSAGING_VAPID_KEY;
export const FIREBASE_CONFIG: FirebaseOptions = JSON.parse(
  import.meta.env.VITE_FIREBASE_CONFIG
);
export const DEFAULT_LOCALE = navigator.languages[0];
export const DEFAULT_TIMEZONE =
  Intl.DateTimeFormat().resolvedOptions().timeZone;
