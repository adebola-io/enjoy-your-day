import { Loader } from '#/components/loader';
import { appLoadingState, username } from '#/data/state';
import { createUser } from '#/data/db';
import { ONBOARDING_LOADING_DELAY } from '#/data/constants';
import { useRouter } from '@adbl/unfinished/router';
import { setMetaThemeColor } from '#/library';
import classes from './onboarding.module.css';

export default function Loading() {
  const router = useRouter();

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

  const changeThemeColor = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'DIV') return;
    setMetaThemeColor('white');
  };

  return (
    <div
      onAnimationStart={changeThemeColor}
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
