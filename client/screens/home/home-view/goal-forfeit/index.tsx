import { BottomDrawer } from '#/components/bottom-drawer';
import type { GoalPropsSerialized } from '#/data/entities';
import { getGoalByUuid } from '#/services/database';
import { Cell } from '@adbl/cells';
import {
  getRouteQueryValue,
  removeRouteQuery,
  useRouteQuery,
} from '@adbl/iota/utils/router';
import classes from './goal-forfeit.module.css';
import { Button } from '#/components/button';
import { dailyGoals } from '#/data/state';
import { vibrate } from '#/library/utils';
import { drawerQuery } from '#/screens/extra-goals/goal-details';

export const goalForfeitDrawerQuery = 'goal-forfeit';
export default function GoalForfeitDrawer() {
  const isOpen = useRouteQuery(goalForfeitDrawerQuery);
  const goalUuid = getRouteQueryValue(goalForfeitDrawerQuery);
  const drawerRef = Cell.source<HTMLDialogElement | null>(null);
  const goal = Cell.source<GoalPropsSerialized | null>(null);
  const goalInstruction = Cell.derived(() => goal.value?.instruction);

  const toggleNestedDrawerAttribute = (value: boolean) => {
    document.body.toggleAttribute('data-nested-drawer-is-open', value);
  };

  const handleDrawerClose = async () => {
    await removeRouteQuery(goalForfeitDrawerQuery);
  };

  const completeForfeit = async () => {
    const goalState = dailyGoals.value.find(
      (goal) => goal.goal.uuid === goalUuid.value
    );
    if (!goalState) return;
    goalState.state = 'forfeited';

    vibrate([100, 500, 100]);

    // TODO: using router.navigate('/home') leads to a bug where
    // the browser goes back more than expected.
    await handleDrawerClose();
    await removeRouteQuery(drawerQuery);
  };

  isOpen.runAndListen(toggleNestedDrawerAttribute);
  goalUuid.runAndListen(async (uuid) => {
    if (!uuid) return;
    goal.value = await getGoalByUuid(uuid);
    // The drawer content is meant to automatically scroll into view,
    // but the goal data may not have loaded before that happens.
    drawerRef.value?.firstElementChild?.scrollIntoView();
  });

  return (
    <BottomDrawer
      class={classes.container}
      open={isOpen}
      onClose={handleDrawerClose}
      shrinkTarget="#goalDetailsDrawer"
      data-uuid={goalUuid}
      onBeforeClose={toggleNestedDrawerAttribute}
    >
      <h2 class={classes.heading}>Forfeit Goal.</h2>
      <p class={classes.text}>
        You are about to forfeit this goal: {goalInstruction}
      </p>
      <Button
        class={classes.cancelBtn}
        variant="primary"
        rounded
        onClick={handleDrawerClose}
      >
        Cancel
      </Button>
      <Button
        variant="secondary"
        class={classes.forfeitBtn}
        rounded
        onClick={completeForfeit}
      >
        Forfeit
      </Button>
    </BottomDrawer>
  );
}
