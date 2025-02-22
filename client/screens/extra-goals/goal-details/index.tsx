import { BottomDrawer } from '#/components/bottom-drawer';
import { useRouter } from '@adbl/unfinished/router';
import { Cell } from '@adbl/cells';
import { If } from '@adbl/unfinished';
import type { GoalPropsSerialized } from '#/data/entities';
import { getGoalByUuid } from '#/services/database';
import { Icon } from '#/components/icon';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './goal-details.module.css';
import { removeRouteQuery, useRouteQuery } from '@adbl/iota/utils/router';

interface AddGoalDrawerProps {
  shrinkTarget: string;
  buttons: (goal: GoalPropsSerialized) => JSX.Template;
}

export const drawerQuery = 'open-goal-card';
export default function GoalDetailsDrawer(props: AddGoalDrawerProps) {
  const { shrinkTarget, buttons } = props;
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

  goalUuid.runAndListen(async (uuid) => {
    if (!uuid) return;
    goal.value = await getGoalByUuid(uuid);
    // The drawer content is meant to automatically scroll into view,
    // but the goal data may not have loaded before that happens.
    drawerRef.value?.firstElementChild?.scrollIntoView();
  });

  return (
    <BottomDrawer
      id="goalDetailsDrawer"
      ref={drawerRef}
      open={isOpen}
      class={classes.container}
      shrinkTarget={shrinkTarget}
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
      {If(goal, buttons)}
    </BottomDrawer>
  );
}
