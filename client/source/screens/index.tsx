import { NavigationBar } from '#/components/navigation-bar';
import { ViewLayer, ViewLayerGroup } from '#/components/view-layer';
import { appLoadingState, dailyGoals } from '#/data/state';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import { If } from '@adbl/unfinished';
import { registerNotificationServiceWorker } from '#/services/notifications';
import AutoSelectLayer from './auto-select';
import classes from './app.module.css';

export default function App() {
  const { Outlet } = useRouter();

  const appIsLoaded = Cell.derived(() => {
    return appLoadingState.value === 'done';
  });

  appIsLoaded.runAndListen((appIsLoaded) => {
    if (appIsLoaded) registerNotificationServiceWorker();
  });

  const dailyGoalsLoaded = Cell.derived(() => {
    return dailyGoals.value.length > 0;
  });

  return (
    <ViewLayerGroup>
      <ViewLayer class={classes.appContent} open data-app-loaded={appIsLoaded}>
        <Outlet class={classes.outlet} data-goals-loaded={dailyGoalsLoaded} />
        {If(appIsLoaded, NavigationBar)}
      </ViewLayer>
      <AutoSelectLayer />
    </ViewLayerGroup>
  );
}
