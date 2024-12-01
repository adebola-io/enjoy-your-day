/// <reference types="vite/client" />
import { createRouter } from './router';

function attachListeners() {
  document.addEventListener(
    'contextmenu',
    (event) => {
      const target = event.target as Element;
      if (target.tagName === 'A') {
        // Prevents long press opening context menu popup on mobile.
        event.preventDefault();
      }
    },
    { passive: false }
  );
}

export default async function main() {
  attachListeners();
  const router = createRouter();
  router.window = window;
  router.attachWindowListeners();

  document.querySelector('#waiting-screen')?.remove();
  document.querySelector('#start-screen')?.remove();

  document.body.prepend(router.Outlet());
  return router.replace('/onboarding/enter-name').then(() => {
    document.querySelector('html')?.removeAttribute('data-view');
    // Setting this in the configuration will interfere with the transitions
    // from the start screen.
    router.useViewTransitions = true;
  });
}

export async function resumeApp() {
  attachListeners();
  const router = createRouter();
  router.window = window;
  router.attachWindowListeners();

  document.querySelector('#start-screen')?.remove();
  document.body.prepend(router.Outlet());

  return router.replace(window.location.pathname).then(() => {
    document.querySelector('html')?.removeAttribute('data-view');
    document.querySelector('#waiting-screen')?.remove();
    // Setting this in the configuration will interfere with the transitions
    // from the html waiting screen.
    router.useViewTransitions = true;
  });
}
