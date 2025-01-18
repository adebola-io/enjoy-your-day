import { BottomDrawer } from '#/components/bottom-drawer';
import { Logo } from '#/components/logo';
import { Button } from '#/components/button';
import { Cell } from '@adbl/cells';
import { For, If, useObserver } from '@adbl/unfinished';
import { PhoneMockup } from '#/components/phone-mockup';
import { NestedDrawer, nestedDrawerQuery } from './nested-drawer';
import { addRouteQuery, installDetails } from '#/library/utils';
import {
  getInstallInstructions,
  type InstallInstructions,
} from '#/data/install-instructions';
import { useRouter } from '@adbl/unfinished/router';
import classes from './install-prompt-drawer.module.css';

export default function InstallPromptDrawer() {
  const observer = useObserver();
  const router = useRouter();
  const drawerRef = Cell.source<HTMLDialogElement | null>(null);
  const drawerIsOpen = Cell.source(false);
  const apps = Array(10);
  const fillerApps = For(apps, () => <li class={classes.app} />);
  const instructions = Cell.source<InstallInstructions | undefined>(undefined);

  const matchListener = (event: MediaQueryListEvent) => {
    drawerIsOpen.value = !event.matches;
  };
  const closeDrawer = () => {
    drawerIsOpen.value = false;
  };

  const openNestedDrawer = async () => {
    await addRouteQuery(nestedDrawerQuery, 'true');
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
    instructions.value = await getInstallInstructions();
    if (instructions.value === undefined) return () => {};
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
      {If(instructions, (instructions) => (
        <NestedDrawer instructions={instructions} />
      ))}
    </BottomDrawer>
  );
}
