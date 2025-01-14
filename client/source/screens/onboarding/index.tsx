import { BackButton } from '#/components/back-button';
import { appLoadingState } from '#/data/state';
import { useRouter } from '@adbl/unfinished/router';
import { Cell } from '@adbl/cells';
import InstallPromptDrawer from './install-prompt-drawer';
import { useObserver } from '@adbl/unfinished';
import classes from './onboarding.module.css';
import { setMetaTheme } from '#/library/utils';
import { CSS_VARS } from '#/styles/variables';

export default async function Onboarding() {
  const router = useRouter();
  const currentRoute = router.getCurrentRoute();
  const observer = useObserver();
  const mainRef = Cell.source<HTMLElement | null>(null);

  if (appLoadingState.value === 'done') {
    await router.replace('/home');
    return;
  }

  const supplementaryClass = Cell.derived(() => {
    switch (currentRoute.value.path) {
      case '/onboarding/enter-name':
        return classes.enteringName;
      case '/onboarding/select-categories':
        return classes.selectingCategories;
      case '/onboarding/involvement':
        return classes.involvement;
      default:
        return '';
    }
  });

  observer.onConnected(mainRef, () => {
    setMetaTheme(CSS_VARS['--space-cadet-500']);
  });

  return (
    <main
      id="onboardingMain"
      ref={mainRef}
      class={[classes.onboardingView, supplementaryClass]}
    >
      <router.Outlet class={classes.startOutlet} />
      <BackButton class={classes.backButton} />
      <InstallPromptDrawer />
    </main>
  );
}
