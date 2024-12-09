import HomeView from '#/fragments/home-view';
import InitialHome from '#/fragments/home-start-state';
import { If } from '@adbl/unfinished';
import { getDatabaseHandle, type GoalState } from '#/data/db';
import { Cell } from '@adbl/cells';

export default async function Home() {
  const dailyGoals: Cell<GoalState[]> = Cell.source([]);
  getDatabaseHandle()
    .then((handle) =>
      handle.query('SELECT * from goal_sets WHERE date = 27-04-2002;')
    )
    .then(() => {})
    .catch((error) => console.error(error));

  const hasAssignedGoals = Cell.derived(() => {
    return dailyGoals.value.length > 0;
  });

  return If(hasAssignedGoals, {
    true: () => <HomeView dailyGoals={dailyGoals} />,
    false: InitialHome,
  });
}
