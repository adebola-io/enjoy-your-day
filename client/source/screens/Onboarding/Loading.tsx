import { Loader } from '@/components/Loader';
import { useRouter } from '@adbl/unfinished/router';
import { appLoadingState } from '@/data';
import styles from './Onboarding.module.css';
import { setMetaThemeColor } from '@/library';

export default function Loading() {
  const router = useRouter();

  const goToApp = () => {
    setTimeout(() => {
      appLoadingState.value = 'done';
      router.replace('/app');
    }, 2000);
  };

  const changeThemeColor = () => {
    setMetaThemeColor('white');
  };

  const transitionListenerOptions = {
    once: true,
  };

  document.body.addEventListener(
    'transitionstart',
    changeThemeColor,
    transitionListenerOptions
  );
  document.body.addEventListener(
    'transitionend',
    goToApp,
    transitionListenerOptions
  );
  return <Loader class={styles.onboardingViewFinalLoader} />;
}
