import HomeView from '#/screens/home/home-view';
import InitialHome from '#/screens/home/home-start-state';
import { If } from '@adbl/unfinished';
import { Cell } from '@adbl/cells';
import { dailyGoals } from '#/data/state';

export default async function Home() {
  const hasAssignedGoals = Cell.derived(() => dailyGoals.value.length > 0);

  return If(hasAssignedGoals, {
    true: HomeView,
    false: InitialHome,
  });
}
