/// <reference types="vite/client" />
import { render } from '@adbl/unfinished/render';
import { createRouter } from './router';

function createRoot() {
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

  const root = document.createElement('div');
  root.id = 'app';
  document.body.prepend(root);
  return root;
}

export default async function main() {
  const root = createRoot();
  const router = createRouter();
  router.window = window;
  router.attachWindowListeners();

  document.querySelector('#start-screen')?.remove();

  if (root !== null) {
    render(root, router.Outlet(), window);
    router.replace('/onboarding').then(() => {
      document.querySelector('html')?.removeAttribute('data-view');
      // Setting this in the configuration will interfere with the transitions
      // from the start screen.
      router.useViewTransitions = true;
    });
  }
}

export async function resumeApp() {
  const root = createRoot();

  const router = createRouter();
  router.window = window;
  router.attachWindowListeners();

  document.querySelector('#start-screen')?.remove();

  if (root !== null) {
    render(root, router.Outlet(), window);
    router.replace('/app').then(() => {
      document.querySelector('html')?.removeAttribute('data-view');
      // Setting this in the configuration will interfere with the transitions
      // from the html waiting screen.
      router.useViewTransitions = true;
    });
  }
}
