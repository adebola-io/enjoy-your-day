/// <reference types="vite/client" />
import { initializeDatabase } from '#/data/db';
import { createWebRouter, defineRoutes } from '@adbl/unfinished/router';
import { appRouteTree, onboardingMiddleware } from './screens/routes';

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
    const waitingScreen = document.querySelector('#waiting-screen');
    const circle = waitingScreen?.querySelector<HTMLElement>(
      '.waiting-screen__circle'
    );
    if (!circle) return;
    // Using await Promise.all(animations.map(a => a.finished))
    // leads to a memory leak in Edge.
    circle.addEventListener('animationend', (event) => {
      if (event.animationName !== 'expand-forever') return;
      waitingScreen?.remove();
      document.querySelector('#start-screen')?.remove();
    });
  });
}

function createRouter() {
  return createWebRouter({
    stackMode: true,
    routes: defineRoutes([appRouteTree]),
    middlewares: [onboardingMiddleware],
  });
}

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
