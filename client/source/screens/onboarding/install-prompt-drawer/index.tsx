import { BottomDrawer } from '#/components/bottom-drawer';
import { Cell } from '@adbl/cells';
import { For, useObserver } from '@adbl/unfinished';
import { PhoneMockup } from '#/components/phone-mockup';
import { Logo } from '#/components/logo';
import { Button } from '#/components/button';
import { installDetails } from '#/library/utils';
import classes from './install-prompt-drawer.module.css';

export default function InstallPromptDrawer() {
  const observer = useObserver();
  const drawerRef = Cell.source<HTMLDialogElement | null>(null);
  const drawerIsOpen = Cell.source(false);
  const apps = Array(10);
  const fillerApps = For(apps, () => <li class={classes.app}></li>);
  const nestedDrawerIsOpenHandle = Cell.source(false);
  const nestedDrawerIsOpen = Cell.derived(() => {
    return nestedDrawerIsOpenHandle.value && drawerIsOpen.value;
  });

  const openDrawerListener = (event: MediaQueryListEvent) => {
    drawerIsOpen.value = !event.matches;
  };

  const closeNestedDrawer = () => {
    nestedDrawerIsOpenHandle.value = false;
  };

  const promptInstall = () => {
    if (!installDetails.deferredPrompt) {
      nestedDrawerIsOpenHandle.value = true;
      return;
    }
    installDetails.deferredPrompt.prompt?.().then?.((result) => {
      if (result.outcome === 'accepted') {
        installDetails.deferredPrompt = undefined;
        drawerIsOpen.value = false;
      } else {
        nestedDrawerIsOpenHandle.value = true;
      }
    });
  };

  nestedDrawerIsOpen.listen((innerDrawerIsOpen) => {
    console.log('innerDrawerIsOpen', innerDrawerIsOpen);
    document.body.toggleAttribute(
      'data-nested-drawer-is-open',
      innerDrawerIsOpen
    );
  });

  observer.onConnected(drawerRef, () => {
    const isStandalone = matchMedia('(display-mode: standalone)');
    isStandalone.addEventListener('change', openDrawerListener);

    setTimeout(() => {
      drawerIsOpen.value = !isStandalone.matches;
    }, 300);

    return () => isStandalone.removeEventListener('change', openDrawerListener);
  });

  return (
    <BottomDrawer
      id="installPromptDrawer"
      class={classes.drawer}
      ref={drawerRef}
      open={drawerIsOpen}
      shrinkTarget="#onboardingNameForm"
      data-stagger-children={drawerIsOpen}
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
        access, faster performance, and everything a tap away.
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
      <NestedDrawer isOpen={nestedDrawerIsOpen} onClose={closeNestedDrawer} />
    </BottomDrawer>
  );
}

interface NestedDrawerProps {
  isOpen: Cell<boolean>;
  onClose?: () => void;
}

function NestedDrawer(props: NestedDrawerProps) {
  const { isOpen } = props;

  const closeDrawer = () => {
    props.onClose?.();
  };

  return (
    <BottomDrawer
      class={classes.nestedDrawer}
      shrinkTarget="#installPromptDrawer"
      open={isOpen}
      onClose={closeDrawer}
    >
      DHDJ
    </BottomDrawer>
  );
}
