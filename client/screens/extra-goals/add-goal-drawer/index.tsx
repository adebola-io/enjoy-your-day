import { BottomDrawer } from '#/components/bottom-drawer';
import { removeRouteQuery, useRouteQuery } from '#/library/utils';
import { useRouter } from '@adbl/unfinished/router';
import { Cell } from '@adbl/cells';
import { If } from '@adbl/unfinished';
import type { GoalPropsSerialized, GoalStateSerialized } from '#/data/entities';
import { getGoalByUuid } from '#/services/database';
import { Icon } from '#/components/icon';
import { Button } from '#/components/button';
import { dailyGoals } from '#/data/state';
import classes from './add-goal-drawer.module.css';

interface AddGoalDrawerProps {
  onBeforeGoalAdded?: () => Promise<void>;
}

export const drawerQuery = 'open-goal-card';
export default function AddGoalDrawer(props: AddGoalDrawerProps) {
  const { onBeforeGoalAdded } = props;
  const router = useRouter();
  const isOpen = useRouteQuery(drawerQuery);
  const route = router.getCurrentRoute();
  const goalUuid = Cell.derived(() => route.value.query.get(drawerQuery));
  const drawerRef = Cell.source<HTMLDialogElement | null>(null);
  const goal = Cell.source<GoalPropsSerialized | null>(null);
  const goalIconName = Cell.derived(() => goal.value?.icon);
  const goalTitle = Cell.derived(() => goal.value?.title);
  const goalInstruction = Cell.derived(() => goal.value?.instruction);
  const goalInfo = Cell.derived(() => goal.value?.info);
  const goalTheme = Cell.derived(() => goal.value?.color);
  const drawerStyle = { backgroundColor: goalTheme };

  const handleDrawerClose = async () => {
    await removeRouteQuery(drawerQuery);
  };

  const addGoal = async () => {
    if (!goal.value) return;
    removeRouteQuery(drawerQuery);
    await new Promise((r) => setTimeout(r, 200));
    await onBeforeGoalAdded?.();
    await new Promise((r) => setTimeout(r, 200));
    const dateAdded = new Date(goal.value.dateAdded).toISOString();
    const goalState: GoalStateSerialized = {
      state: 'scheduled',
      goal: { ...goal.value, dateAdded },
      updatedAt: null,
    };
    dailyGoals.value.push(goalState);
  };

  goalUuid.runAndListen(async (uuid) => {
    if (!uuid) return;
    goal.value = await getGoalByUuid(uuid);
    // The drawer content is meant to automatically scroll into view,
    // but the goal data may not have loaded before that happens.
    drawerRef.value?.firstElementChild?.scrollIntoView();
  });

  return (
    <BottomDrawer
      ref={drawerRef}
      open={isOpen}
      class={classes.container}
      shrinkTarget="#extraGoalsView"
      onClose={handleDrawerClose}
      data-uuid={goalUuid}
      style={drawerStyle}
    >
      {If(goalIconName, (iconName) => (
        <div class={classes.goalIconContainer}>
          <Icon name={iconName} class={classes.goalIcon} />
        </div>
      ))}
      <h2 class={classes.heading}>{goalTitle}</h2>
      <p class={classes.instruction}>{goalInstruction}</p>
      <p class={classes.info}>{goalInfo}</p>
      <Button
        rounded
        variant="outlined"
        class={classes.closeBtn}
        onClick={handleDrawerClose}
      >
        Close
      </Button>
      <Button rounded class={classes.addBtn} onClick={addGoal}>
        Add
      </Button>
    </BottomDrawer>
  );
}
