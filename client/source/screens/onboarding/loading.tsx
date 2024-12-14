import { Loader } from '#/components/loader';
import { appLoadingState, username } from '#/data/state';
import { createUser } from '#/data/db';
import { ONBOARDING_LOADING_DELAY } from '#/data/constants';
import { useRouter } from '@adbl/unfinished/router';
import { setMetaThemeColor } from '#/library/utils';
import classes from './onboarding.module.css';

export default function Loading() {
  const router = useRouter();

  const goToApp = async () => {
    await Promise.all([
      createUser(username.value),
      new Promise<void>(onboardingPromiseCallback),
    ]);
    router.replace('/app/main/home');
  };

  return (
    <div
      onAnimationStart:self={() => setMetaThemeColor('white')}
      onAnimationEnd:self={goToApp}
      class={classes.onboardingViewFinalLoaderContainer}
    >
      <Loader class={classes.onboardingViewFinalLoader} />
    </div>
  );
}

function onboardingPromiseCallback(resolve: () => void) {
  setTimeout(() => {
    appLoadingState.value = 'done';
    resolve();
  }, ONBOARDING_LOADING_DELAY);
}
