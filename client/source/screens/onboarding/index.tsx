import { BackButton } from '#/components/back-button';
import { appLoadingState } from '#/data/state';
import { useRouter } from '@adbl/unfinished/router';
import styles from './onboarding.module.css';

export default async function Onboarding() {
  const router = useRouter();

  if (appLoadingState.value === 'done') {
    await router.replace('/app/main/home');
    return;
  }

  return (
    <main class={styles.onboardingView}>
      <router.Outlet class={styles.startOutlet} />
      <BackButton class={styles.backButton} />
    </main>
  );
}
