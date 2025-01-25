import { BottomDrawer } from '#/components/bottom-drawer';
import { Logo } from '#/components/logo';
import { Button } from '#/components/button';
import { Cell } from '@adbl/cells';
import { For, useObserver } from '@adbl/unfinished';
import { PhoneMockup } from '#/components/phone-mockup';
import {
  InstallationInstructionsDrawer,
  installInstructionsDrawerQuery,
} from './nested-drawer';
import { addRouteQuery, installDetails } from '#/library/utils';
import { useRouter } from '@adbl/unfinished/router';
import classes from './install-prompt-drawer.module.css';

export default function InstallPromptDrawer() {
  const observer = useObserver();
  const router = useRouter();
  const drawerRef = Cell.source<HTMLDialogElement | null>(null);
  const drawerIsOpen = Cell.source(false);
  const apps = Array(10);
  const fillerApps = For(apps, () => <li class={classes.app} />);

  const matchListener = (event: MediaQueryListEvent) => {
    drawerIsOpen.value = !event.matches;
  };
  const closeDrawer = () => {
    drawerIsOpen.value = false;
  };

  const openNestedDrawer = async () => {
    await addRouteQuery(installInstructionsDrawerQuery, 'true');
  };

  const promptInstall = async () => {
    if (!installDetails.deferredPrompt) {
      openNestedDrawer();
      return;
    }
    const result = await installDetails.deferredPrompt.prompt?.();
    if (result?.outcome === 'accepted') {
      installDetails.deferredPrompt = undefined;
      drawerIsOpen.value = false;
    } else {
      await openNestedDrawer();
    }
  };

  observer.onConnected(drawerRef, async () => {
    if (
      'getInstalledRelatedApps' in navigator &&
      typeof navigator.getInstalledRelatedApps === 'function' &&
      (!window.parent || window.parent === window)
    ) {
      try {
        const apps = await navigator.getInstalledRelatedApps();
        if (Array.isArray(apps) && apps.length > 0) {
          return () => {};
        }
      } catch (e) {
        console.error(e);
      }
    }

    const isStandalone = matchMedia('(display-mode: standalone)');
    isStandalone.addEventListener('change', matchListener);
    setTimeout(() => {
      drawerIsOpen.value = !isStandalone.matches;
    }, 300);
    return () => isStandalone.removeEventListener('change', matchListener);
  });

  drawerIsOpen.listen((drawerIsOpen) => {
    router.useViewTransitions = !drawerIsOpen;
  });

  return (
    <BottomDrawer
      id="installPromptDrawer"
      class={classes.drawer}
      ref={drawerRef}
      open={drawerIsOpen}
      shrinkTarget="#onboardingMain > unfinished-router-outlet > *"
      data-stagger-children={drawerIsOpen}
      onClose={closeDrawer}
    >
      <div class={classes.phoneContainer}>
        <PhoneMockup
          class={classes.phone}
          phoneWidth="min(170px, 50dvw)"
          contentClasses={classes.phoneContent}
        >
          <ul class={classes.appList}>
            {fillerApps}
            <li class={[classes.app, classes.eydApp]}>
              <Logo class={classes.logo} />
            </li>
          </ul>
        </PhoneMockup>
      </div>
      <p class={classes.text}>
        Enjoy Your Day works better as a web app - install it for offline
        access, faster performance, and everything else a tap away.
      </p>
      <Button
        class={classes.installButton}
        rounded
        vibrate
        variant="secondary"
        onClick={promptInstall}
      >
        Install
      </Button>
      <InstallationInstructionsDrawer shrinkTarget="#installPromptDrawer" />
    </BottomDrawer>
  );
}
