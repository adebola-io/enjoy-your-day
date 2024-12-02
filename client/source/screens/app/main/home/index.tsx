import { goalsForTheDay } from '#/data';
import { HomeView } from '#/fragments/HomeView';
import { InitialHome } from '#/fragments/InitialHome';
import { Cell } from '@adbl/cells';
import { If } from '@adbl/unfinished';

export default function Home() {
  const hasAssignedGoals = Cell.derived(() => {
    return goalsForTheDay.value.length > 0;
  });
  return If(hasAssignedGoals, HomeView, InitialHome);
}
