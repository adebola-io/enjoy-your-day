import { BackButton } from '#/components/back-button';
import { appLoadingState } from '#/data/state';
import { useRouter } from '@adbl/unfinished/router';
import { Cell } from '@adbl/cells';
import classes from './onboarding.module.css';

export default async function Onboarding() {
  const router = useRouter();
  const currentRoute = router.getCurrentRoute();

  if (appLoadingState.value === 'done') {
    await router.replace('/home');
    return;
  }

  const supplementaryClass = Cell.derived(() => {
    switch (currentRoute.value.fullPath) {
      case '/onboarding/enter-name':
        return classes.enteringName;
      case '/onboarding/select-categories':
        return classes.selectingCategories;
      default:
        return '';
    }
  });

  return (
    <main class={[classes.onboardingView, supplementaryClass]}>
      <router.Outlet class={classes.startOutlet} />
      <BackButton class={classes.backButton} />
    </main>
  );
}
