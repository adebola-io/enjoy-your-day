import { Loader } from '#/components/loader';
import { appLoadingState, username } from '#/data/state';
import { createUser } from '#/data/db';
import { ONBOARDING_LOADING_DELAY } from '#/data/constants';
import { useRouter } from '@adbl/unfinished/router';
import { setMetaThemeColor } from '#/library/utils';
import { useObserver } from '#/library/useObserver';
import classes from './onboarding.module.css';
import { Cell } from '@adbl/cells';

export default function Loading() {
  const router = useRouter();
  const observer = useObserver();
  const container = Cell.source<HTMLDivElement | null>(null);

  const goToApp = async (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'DIV') return;

    await Promise.all([
      createUser(username.value).catch((error) => {
        window.alert(JSON.stringify(error.message || error));
      }),
      new Promise<void>(onboardingPromiseCallback),
    ]);
    router.replace('/app/main/home');
  };

  observer.onConnected(container, () => {
    setMetaThemeColor('white');
  });

  return (
    <div
      ref={container}
      onAnimationEnd={goToApp}
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
