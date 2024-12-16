/// <reference types="vite/client" />
import { initializeDatabase } from '#/data/db';
import { createRouter } from './router';

function disableContextMenu() {
  const listener = (event: Event) => {
    const target = event.target as Element;
    if (target.tagName === 'A') {
      // Prevents long press opening context menu popup on mobile.
      event.preventDefault();
    }
  };
  document.addEventListener('contextmenu', listener, { passive: false });
}

export default async function main() {
  disableContextMenu();
  initializeDatabase();

  const router = createRouter();
  router.window = window;
  router.attachWindowListeners();
  document.body.prepend(router.Outlet());

  return router.replace('/onboarding/enter-name').then(() => {
    document.querySelector('#waiting-screen')?.remove();
    document.querySelector('#start-screen')?.remove();
    document.querySelector('html')?.removeAttribute('data-view');
    // Setting this in the configuration will interfere with the transitions
    // from the start screen.
    router.useViewTransitions = true;
  });
}

export async function resumeApp() {
  disableContextMenu();
  initializeDatabase();

  const router = createRouter();
  router.window = window;
  router.attachWindowListeners();
  document.body.prepend(router.Outlet());

  const waitingScreen = document.querySelector('#waiting-screen');
  waitingScreen?.classList.add('loading');
  const fullCurrentPath =
    window.location.pathname + window.location.search + window.location.hash;

  return router.replace(fullCurrentPath).then(async () => {
    const circle = waitingScreen?.querySelector('.waiting-screen__circle');
    if (!circle) return;
    await Promise.all(
      circle.getAnimations().map((animation) => animation.finished)
    );
    waitingScreen?.remove();
    document.querySelector('#start-screen')?.remove();
    router.useViewTransitions = true;
  });
}
