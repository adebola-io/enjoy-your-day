import { NavigationBar } from '#/components/navigation-bar';
import AutoSelect from './auto-select';
import { appLoadingState, dailyGoals } from '#/data/state';
import { setMetaTheme, useRouteQuery } from '#/library/utils';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import { If } from '@adbl/unfinished';
import { CSS_VARS } from '#/styles/variables';

export default function App() {
  const router = useRouter();
  const autoSelectIsOpen = useRouteQuery('auto-select');
  const outletRef = Cell.source<HTMLElement | null>(null);

  const appIsLoaded = Cell.derived(() => {
    return appLoadingState.value === 'done';
  });

  const dailyGoalsLoaded = Cell.derived(() => {
    return dailyGoals.value.length > 0;
  });

  autoSelectIsOpen.listen((autoSelectIsOpen) => {
    setMetaTheme(autoSelectIsOpen ? CSS_VARS['--space-cadet-700'] : '#ffffff');
  });

  return (
    <>
      <router.Outlet
        ref={outletRef}
        id="mainOutlet"
        data-auto-select-is-open={autoSelectIsOpen}
        data-goals-loaded={dailyGoalsLoaded}
        inert={autoSelectIsOpen}
      />
      {If(appIsLoaded, NavigationBar)}
      <div id="autoSelectionView" data-auto-select-is-open={autoSelectIsOpen}>
        {If(autoSelectIsOpen, AutoSelect)}
      </div>
    </>
  );
}
