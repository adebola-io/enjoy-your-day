import { Loader } from '#/components/loader';
import { appLoadingState, username } from '#/data/state';
import { createUser } from '#/services/database';
import { ONBOARDING_LOADING_DELAY } from '#/data/constants';
import { useRouter } from '@adbl/unfinished/router';
import { setMetaTheme } from '#/library/utils';
import classes from './loading.module.css';

export default function Loading() {
  const router = useRouter();

  const handleAnimationEnd = async (event: AnimationEvent) => {
    if (!event.animationName.includes('fade-to-white')) return;
    await Promise.all([
      createUser(username.value),
      new Promise<void>(onboardingPromiseCallback),
    ]);
    router.useViewTransitions = false;
    router.replace('/home');
  };

  return (
    <div
      onAnimationStart--self={() => setMetaTheme('#ffffff')}
      onAnimationEnd--self={handleAnimationEnd}
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
