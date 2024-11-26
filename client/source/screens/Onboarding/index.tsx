import { useRouter } from '@adbl/unfinished/router';
import { appLoadingState } from '@/data';
import { CaretRightIcon } from '@/components/icons/caret-right';
import styles from './Onboarding.module.css';

export default async function Onboarding() {
  const router = useRouter();

  if (appLoadingState.value === 'done') {
    await router.replace('/app');
    return;
  }

  const goBack = () => {
    navigator.vibrate?.(10);
    router.back();
  };

  return (
    <main class={styles.onboardingView}>
      <router.Outlet class={styles.startOutlet} />
      <button type="button" class={styles.backButton} onClick={goBack}>
        <CaretRightIcon class={styles.backButtonIcon} />
        Back
      </button>
    </main>
  );
}
