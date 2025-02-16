import { BottomDrawer } from '#/components/bottom-drawer';
import type { GoalPropsSerialized } from '#/data/entities';
import { getRouteQueryValue, removeRouteQuery } from '#/library/utils';
import { getGoalByUuid } from '#/services/database';
import { If } from '@adbl/unfinished';
import { Cell } from '@adbl/cells';

export const drawerQuery = 'goal-details';
export function GoalDetailsDrawer() {
  const { data: goal, run: getGoal } = Cell.async(getGoalByUuid);
  const goalUuid = getRouteQueryValue(drawerQuery);
  const pageOpen = Cell.derived(() => goalUuid.value !== null);

  const closeDrawer = () => {
    removeRouteQuery(drawerQuery);
    goal.value = null;
  };

  goalUuid.listen((goalUuid) => {
    if (goalUuid) getGoal(goalUuid);
  });

  return (
    <BottomDrawer
      shrinkTarget="#homeView"
      open={pageOpen}
      onClose={closeDrawer}
    >
      {If(goal, GoalDetailsDrawerContent)}
    </BottomDrawer>
  );
}

function GoalDetailsDrawerContent(props: GoalPropsSerialized) {
  return <div>Goal details: {props.title}</div>;
}
