import { NavigationBar } from '#/components/navigation-bar';
import { SlideView, SlideViews } from '#/components/slide-view';
import { appLoadingState, dailyGoals } from '#/data/state';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import { If } from '@adbl/unfinished';
import { registerNotificationServiceWorker } from '#/services/notifications';
import AutoSelectSlideView from './auto-select-slide-view';
import classes from './app.module.css';

export default function App() {
  const router = useRouter();

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
    <SlideViews>
      <SlideView class={classes.appContent} open data-app-loaded={appIsLoaded}>
        <router.Outlet
          class={classes.mainOutlet}
          data-goals-loaded={dailyGoalsLoaded}
        />
        {If(appIsLoaded, NavigationBar)}
      </SlideView>
      <AutoSelectSlideView />
    </SlideViews>
  );
}
