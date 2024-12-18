import { NavigationBar } from '#/components/navigation-bar';
import AutoSelect from './auto-select';
import { appLoadingState } from '#/data/state';
import { Cell } from '@adbl/cells';
import { setMetaTheme } from '#/library/utils';
import { useRouter } from '@adbl/unfinished/router';
import { If } from '@adbl/unfinished';

export default async function App() {
  const router = useRouter();
  const route = router.getCurrentRoute();
  setMetaTheme('white');

  const appIsLoaded = Cell.derived(() => {
    return appLoadingState.value === 'done';
  });

  const autoSelectionIsOpen = Cell.derived(() => {
    return route.value.query.has('auto-select');
  });

  return (
    <>
      <router.Outlet
        id="mainOutlet"
        data-auto-select-is-open={autoSelectionIsOpen}
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
