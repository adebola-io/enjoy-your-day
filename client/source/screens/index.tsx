import { NavigationBar } from '#/components/navigation-bar';
import { StackLayerView } from '#/components/stack-layer-view';
import { ViewGroup } from '#/components/view-group';
import { appLoadingState } from '#/data/state';
import { useRouteQuery } from '#/library/utils';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import { If } from '@adbl/unfinished';
import { registerNotificationServiceWorker } from '#/services/notifications';
import ExtraGoalsView, { extraGoalsPageQuery } from './extra-goals';
import AutoSelectLayer from './auto-select';
import classes from './app.module.css';

export default function App() {
  const { Outlet } = useRouter();
  const extraGoalsPageIsOpen = useRouteQuery(extraGoalsPageQuery);
  const appIsLoaded = Cell.derived(() => appLoadingState.value === 'done');

  appIsLoaded.runAndListen((appIsLoaded) => {
    if (appIsLoaded) registerNotificationServiceWorker();
  });

  const MainContent = () => (
    <StackLayerView
      class={classes.appContent}
      data-app-loaded={appIsLoaded}
      data-extra-goals-page-is-open={extraGoalsPageIsOpen}
    >
      <Outlet class={classes.outlet} />
      {If(appIsLoaded, NavigationBar)}
    </StackLayerView>
  );

  return (
    <ViewGroup>
      <MainContent />
      <AutoSelectLayer />
      <ExtraGoalsView />
    </ViewGroup>
  );
}
