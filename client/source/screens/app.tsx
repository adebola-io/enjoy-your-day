import { NavigationBar } from '#/components/navigation-bar';
import AutoSelect from './auto-select';
import { appLoadingState, dailyGoals } from '#/data/state';
import { Cell } from '@adbl/cells';
import { setMetaTheme } from '#/library/utils';
import { useRouter } from '@adbl/unfinished/router';
import { If } from '@adbl/unfinished';
import { CSS_VARS } from '#/styles/variables';

export default async function App() {
  const router = useRouter();
  const route = router.getCurrentRoute();

  const appIsLoaded = Cell.derived(() => {
    return appLoadingState.value === 'done';
  });

  if (appIsLoaded.value) {
    setMetaTheme('#ffffff');
  } else {
    setMetaTheme(CSS_VARS['--space-cadet-500']);
  }

  const autoSelectionIsOpen = Cell.derived(() => {
    return route.value.query.has('auto-select');
  });

  const dailyGoalsLoaded = Cell.derived(() => {
    return dailyGoals.value.length > 0;
  });

  return (
    <>
      <router.Outlet
        id="mainOutlet"
        data-auto-select-is-open={autoSelectionIsOpen}
        data-goals-loaded={dailyGoalsLoaded}
        inert={autoSelectionIsOpen}
      />
      {If(appIsLoaded, NavigationBar)}
      <div
        id="autoSelectionView"
        data-auto-select-is-open={autoSelectionIsOpen}
      >
        {If(autoSelectionIsOpen, AutoSelect)}
      </div>
    </>
  );
}
