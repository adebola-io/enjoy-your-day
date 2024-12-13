import { BackButton } from '#/components/back-button';
import { appLoadingState } from '#/data/state';
import { useRouter } from '@adbl/unfinished/router';
import classes from './onboarding.module.css';

export default async function Onboarding() {
  const router = useRouter();

  if (appLoadingState.value === 'done') {
    await router.replace('/app/main/home');
    return;
  }

  return (
    <main class={classes.onboardingView}>
      <router.Outlet class={classes.startOutlet} />
      <BackButton class={classes.backButton} />
    </main>
  );
}
