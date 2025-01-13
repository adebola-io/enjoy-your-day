import { BottomDrawer } from '#/components/bottom-drawer';
import { Cell } from '@adbl/cells';
import { For, If, useObserver } from '@adbl/unfinished';
import classes from './install-prompt-drawer.module.css';
import { PhoneMockup } from '#/components/phone-mockup';
import { Logo } from '#/components/logo';
import { Button } from '#/components/button';
import { installDetails } from '#/library/utils';

export default function InstallPromptDrawer() {
  const observer = useObserver();
  const drawerRef = Cell.source<HTMLDialogElement | null>(null);
  const drawerIsOpen = Cell.source(false);
  const apps = Array(10);
  const isSafari = Boolean(
    navigator.vendor &&
      navigator.vendor.indexOf('Apple') > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf('CriOS') == -1 &&
      navigator.userAgent.indexOf('FxiOS') == -1
  );
  const nestedDrawerIsOpenSource = Cell.source(false);
  const nestedDrawerIsOpen = Cell.derived(() => {
    return nestedDrawerIsOpenSource.value && drawerIsOpen.value;
  });

  const listener = (event: MediaQueryListEvent) => {
    drawerIsOpen.value = !event.matches;
  };

  const promptInstall = () => {
    if (!installDetails.deferredPrompt) {
      nestedDrawerIsOpenSource.value = true;
      return;
    }
    installDetails.deferredPrompt.prompt?.().then?.((result) => {
      if (result.outcome === 'accepted') {
        installDetails.deferredPrompt = undefined;
        drawerIsOpen.value = false;
      } else {
        nestedDrawerIsOpenSource.value = true;
      }
    });
  };

  const closeNestedDrawer = () => {
    nestedDrawerIsOpenSource.value = false;
  };

  nestedDrawerIsOpen.listen((nestedDrawerIsOpen) => {
    document.body.toggleAttribute(
      'data-nested-drawer-is-open',
      nestedDrawerIsOpen
    );
  });

  observer.onConnected(drawerRef, () => {
    const isStandaloneQuery = matchMedia('(display-mode: standalone)');
    isStandaloneQuery.addEventListener('change', listener);

    setTimeout(() => {
      drawerIsOpen.value = !isStandaloneQuery.matches;
    }, 300);

    return () => {
      isStandaloneQuery.removeEventListener('change', listener);
    };
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
            {For(apps, () => (
              <li class={classes.app}></li>
            ))}
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
      {If(!isSafari, () => (
        <Button
          class={classes.installButton}
          rounded
          vibrate
          variant="secondary"
          onClick={promptInstall}
        >
          Install
        </Button>
      ))}
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
      shrinkTarget="#installPromptDrawer"
      open={isOpen}
      onClose={closeDrawer}
    >
      DHDJ
    </BottomDrawer>
  );
}
