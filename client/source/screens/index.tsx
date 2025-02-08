import { NavigationBar } from '#/components/navigation-bar';
import { StackLayerView } from '#/components/stack-layer-view';
import ExtraGoals from './extra-goals';
import { ViewGroup } from '#/components/view-group';
import { appLoadingState } from '#/data/state';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import { If } from '@adbl/unfinished';
import { registerNotificationServiceWorker } from '#/services/notifications';
import AutoSelectLayer from './auto-select';
import classes from './app.module.css';

export default function App() {
  const { Outlet } = useRouter();
  const appIsLoaded = Cell.derived(() => appLoadingState.value === 'done');

  appIsLoaded.runAndListen((appIsLoaded) => {
    if (appIsLoaded) registerNotificationServiceWorker();
  });

  return (
    <ViewGroup>
      <StackLayerView class={classes.appContent} data-app-loaded={appIsLoaded}>
        <Outlet class={classes.outlet} />
        {If(appIsLoaded, NavigationBar)}
      </StackLayerView>
      <AutoSelectLayer />
      <ExtraGoals />
    </ViewGroup>
  );
}
