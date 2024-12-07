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
  const waitingScreenCircle = document.querySelector('.waiting-screen__circle');
  const startScreen = document.querySelector('#start-screen');
  waitingScreen?.classList.add('loading');
  if (!waitingScreenCircle) return;

  router.replace(window.location.pathname).then(async () => {
    await Promise.all(
      waitingScreenCircle.getAnimations().map((animation) => animation.finished)
    );
    waitingScreen?.remove();
    startScreen?.remove();
    // Setting this in the configuration will interfere with the transitions
    // from the html waiting screen.
    router.useViewTransitions = true;
  });
}
