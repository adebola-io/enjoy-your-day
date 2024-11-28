import { Loader } from '#/components/Loader';
import styles from './Onboarding.module.css';
import { appLoadingState } from '#/data';
import { useRouter } from '@adbl/unfinished/router';
import { setMetaThemeColor } from '#/library';

export default function Loading() {
  const router = useRouter();

  const goToApp = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'DIV') return;

    setTimeout(() => {
      appLoadingState.value = 'done';
      router.replace('/app/user/home');
    }, 2000);
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
