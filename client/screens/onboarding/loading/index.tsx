import { Loader } from '#/components/loader';
import { appLoadingState, username } from '#/data/state';
import { createUser } from '#/services/database';
import { ONBOARDING_LOADING_DELAY } from '#/data/constants';
import { useRouter } from '@adbl/unfinished/router';
import { setMetaTheme } from '#/library/utils';
import { CSS_VARS } from '#/styles/variables';
import classes from './loading.module.css';

export default function Loading() {
  const router = useRouter();

  const handleAnimationStart = (event: AnimationEvent) => {
    document.body.style.backgroundColor = 'Canvas';
    if (event.animationName.includes('fade-to-white')) {
      setMetaTheme('#ffffff');
    } else if (event.animationName.includes('fade-to-finn')) {
      setMetaTheme(CSS_VARS['--finn-900']);
    } else if (event.animationName.includes('fade-to-fern')) {
      setMetaTheme(CSS_VARS['--fern-green-800']);
    }
  };

  const handleAnimationEnd = async (event: AnimationEvent) => {
    if (!event.animationName.includes('fade-to-white')) return;
    await createUser(username.value);
    await new Promise((r) => setTimeout(r, ONBOARDING_LOADING_DELAY));
    appLoadingState.value = 'done';
    router.useViewTransitions = false;
    await router.replace('/home');
  };

  return (
    <div
      class={classes.onboardingViewFinalLoaderContainer}
      onAnimationStart--self={handleAnimationStart}
      onAnimationEnd--self={handleAnimationEnd}
    >
      <Loader class={classes.onboardingViewFinalLoader} />
    </div>
  );
}
