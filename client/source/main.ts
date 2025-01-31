/// <reference types="vite/client" />
import { initializeDatabase } from '#/services/database';
import { createWebRouter, defineRoutes } from '@adbl/unfinished/router';
import { appRouteTree, onboardingMiddleware } from './screens/routes';
import {
  appIsReadyResolver,
  type DeferredPromptEvent,
  defineSafeArea,
  installDetails,
  setMetaTheme,
} from './library/utils';
import { isDark } from './data/state';

export default async function main(deferredPromptEvent?: DeferredPromptEvent) {
  installDetails.deferredPrompt = deferredPromptEvent;
  appIsReadyResolver?.();
  disableContextMenu();
  defineSafeArea();
  initializeDatabase();

  const router = createRouter();
  router.window = window;
  router.attachWindowListeners();
  document.body.prepend(router.Outlet());

  return router.replace('/onboarding/enter-name').then(() => {
    router.useViewTransitions = true;
    document.querySelector('#waiting-screen')?.remove();
    document.querySelector('#start-screen')?.remove();
    document.querySelector('html')?.removeAttribute('data-view');
  });
}

export async function resumeApp() {
  disableContextMenu();
  defineSafeArea();
  initializeDatabase();

  const router = createRouter();
  router.window = window;
  router.attachWindowListeners();
  document.body.prepend(router.Outlet());

  // In some scenarios in Android, the auto-generated splash screen
  // sometimes waits too long and bleeds into the start of the
  // waiting screen animation. The delay is meant to prevent the
  // app from loading until the splash screen is gone.
  await new Promise((resolve) => setTimeout(resolve, 200));

  const waitingScreen = document.querySelector('#waiting-screen');
  waitingScreen?.classList.add('loading');
  const fullCurrentPath = location.pathname + location.search + location.hash;

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
      appIsReadyResolver?.();
      setMetaTheme(isDark.value ? '#000000' : '#ffffff');
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
