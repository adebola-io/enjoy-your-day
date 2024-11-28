import { useRouter } from '@adbl/unfinished/router';
import { appLoadingState } from '#/data';

import styles from './Onboarding.module.css';
import { Cell } from '@adbl/cells';
import { BackButton } from '#/components/BackButton';

export default async function Onboarding() {
  const router = useRouter();
  const mainElement = Cell.source<HTMLElement | null>(null);

  if (appLoadingState.value === 'done') {
    await router.replace('/app/user/home');
    return;
  }

  return (
    <main ref={mainElement} class={styles.onboardingView}>
      <BackButton class={styles.backButton} />
      <router.Outlet class={styles.startOutlet} />
    </main>
  );
}
