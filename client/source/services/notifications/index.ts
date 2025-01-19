import notificationsWorkerUrl from './notifications.worker?worker&url';

let serviceWorkerRegistration: ServiceWorkerRegistration | null = null;
export const sendNotification = async (
  title: string,
  options: NotificationOptions
) => {
  if (!serviceWorkerRegistration) {
    console.warn('Service worker is not registered.');
    return;
  }

  try {
    await serviceWorkerRegistration.showNotification(title, options);
  } catch (error) {
    console.error('Unable to show notification:', error);
  }
};

export const registerNotificationServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported in this browser.');
    return;
  }

  if (!('PushManager' in window)) {
    console.warn('Push messaging is not supported in this browser.');
    return;
  }

  const options: RegistrationOptions = { type: 'module' };
  const registration = await navigator.serviceWorker.register(
    notificationsWorkerUrl,
    options
  );

  serviceWorkerRegistration = registration;
};
