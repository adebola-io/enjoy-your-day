import { If } from '@adbl/unfinished';
import styles from './start.module.css';
import { useRouter } from '@adbl/unfinished/router';
import { Cell } from '@adbl/cells';
import { appLoadingState } from '@/data';
import { CaretRightIcon } from '@/components/icons/caret-right';
import { Loader } from '@/components/loader';

export default function Start() {
  const { Outlet, getCurrentRoute, back } = useRouter();

  const currentRoute = getCurrentRoute();
  const canGoBack = Cell.derived(() => {
    return (
      currentRoute.value.fullPath !== '/start/name' && !appLoadingState.value
    );
  });

  const appIsLoadingOrFinishing = Cell.derived(() => {
    return (
      appLoadingState.value === 'loading' ||
      appLoadingState.value === 'finishing'
    );
  });

  const goBack = () => {
    navigator.vibrate?.(10);
    back();
  };

  return (
    <main class={styles.startView} data-load-state={appLoadingState}>
      {If(appIsLoadingOrFinishing, {
        true: () => <Loader class={styles.startViewFinalLoader} />,
        false: () => <Outlet class={styles.startOutlet} />,
      })}
      {If(canGoBack, () => {
        return (
          <button type="button" class={styles.backButton} onClick={goBack}>
            <CaretRightIcon class={styles.backButtonIcon} />
            Back
          </button>
        );
      })}
    </main>
  );
}
