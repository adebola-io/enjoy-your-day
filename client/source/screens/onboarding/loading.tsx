import { Loader } from '#/components/Loader';
import { appLoadingState, ONBOARDING_LOADING_DELAY } from '#/data';
import { useRouter } from '@adbl/unfinished/router';
import { setMetaThemeColor } from '#/library';
import styles from './onboarding.module.css';

export default function Loading() {
  const router = useRouter();

  const goToApp = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'DIV') return;

    setTimeout(() => {
      appLoadingState.value = 'done';
      router.replace('/app/main/home');
    }, ONBOARDING_LOADING_DELAY);
  };

  const changeThemeColor = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'DIV') return;
    setMetaThemeColor('white');
  };

  return (
    <div
      onAnimationStart={changeThemeColor}
      onAnimationEnd={goToApp}
      class={styles.onboardingViewFinalLoaderContainer}
    >
      <Loader class={styles.onboardingViewFinalLoader} />
    </div>
  );
}
