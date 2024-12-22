import HomeView from '#/screens/home/home-view';
import InitialHome from '#/screens/home/home-start-state';
import { If } from '@adbl/unfinished';
import { Cell } from '@adbl/cells';
import { dailyGoals, shouldShowCompletionScreen } from '#/data/state';
import { GoalsCompleted } from './goals-completed';

export default async function Home() {
  const hasAssignedGoals = Cell.derived(() => dailyGoals.value.length > 0);
  const shouldShowHomeScreen = Cell.derived(
    () => !shouldShowCompletionScreen.value
  );

  return (
    <>
      {If(shouldShowHomeScreen, () =>
        If(hasAssignedGoals, {
          true: HomeView,
          false: InitialHome,
        })
      )}
      {If(shouldShowCompletionScreen, GoalsCompleted)}
    </>
  );
}
