import { goalsForTheDay } from '#/data/state';
import HomeView from '#/fragments/home-view';
import InitialHome from '#/fragments/home-start-state';
import { Cell } from '@adbl/cells';
import { If } from '@adbl/unfinished';

export default async function Home() {
  const hasAssignedGoals = Cell.derived(() => {
    return goalsForTheDay.value.length > 0;
  });
  return If(hasAssignedGoals, HomeView, InitialHome);
}
