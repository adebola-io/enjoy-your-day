import HomeView from '#/screens/home/home-view';
import InitialHome from '#/screens/home/home-start-state';
import { If } from '@adbl/unfinished';
import { dailyGoals } from '#/data/state';
import { Cell } from '@adbl/cells';

export default async function Home() {
  const hasAssignedGoals = Cell.derived(() => {
    return dailyGoals.value.length > 0;
  });

  return If(hasAssignedGoals, {
    true: HomeView,
    false: InitialHome,
  });
}
