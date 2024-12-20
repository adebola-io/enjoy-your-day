import { BottomDrawer } from '#/components/bottom-drawer';
import { PadLockIcon } from '#/components/icons/padlock';
import { Switch } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import { Cell, type SourceCell } from '@adbl/cells';
import classes from './confirm-drawer.module.css';
import { Button } from '#/components/button';
import type { GoalProps } from '#/data/entities';
import { getResourceState } from '#/library/utils';
import { Loader } from '#/components/loader';
import { dailyGoals } from '#/data/state';

function transformToGoalState(goal: GoalProps) {
  return {
    state: 'scheduled' as const,
    goal,
  };
}

async function saveGoalsForToday(goals: GoalProps[]) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  dailyGoals.value = goals.map(transformToGoalState);
  return true;
}

export interface ConfirmDrawerProps {
  goals: SourceCell<GoalProps[]>;
}

export function ConfirmDrawer(props: ConfirmDrawerProps) {
  const router = useRouter();
  const route = router.getCurrentRoute();
  const { goals } = props;
  const drawerIsOpen = Cell.derived(() => {
    return route.value.query.has('confirm');
  });
  const resource = Cell.async(saveGoalsForToday);
  const state = getResourceState(resource);
  const drawerClosable = Cell.derived(() => !resource.pending.value);

  const handleDrawerClose = async () => {
    const searchParams = new URLSearchParams(route.value.query);
    searchParams.delete('confirm');
    await router.navigate(`/home?${searchParams}`);
  };

  const saveGoals = async () => {
    await resource.run(goals.value);
    router.navigate('/home');
  };

  const Prompt = () => {
    return (
      <>
        <PadLockIcon class={classes.padlock} />
        <h2 class={classes.heading}>Get Started?</h2>
        <p class={classes.text}>
          Once set, these goals cannot be changed until the day is over. Are you
          ready?
        </p>
        <Button variant="secondary" rounded onClick={saveGoals}>
          Yes
        </Button>
      </>
    );
  };

  const Pending = () => {
    return (
      <>
        <Loader class={classes.loader} />
        <p class={classes.loadingText}>Saving your goals...</p>
      </>
    );
  };

  const NoOp = () => <></>;

  return (
    <BottomDrawer
      class={classes.container}
      open={drawerIsOpen}
      closable={drawerClosable}
      onClose={handleDrawerClose}
      rootContainerSelector="#autoSelectionView"
      data-dialog-state={state}
    >
      {Switch(state, {
        inert: Prompt,
        pending: Pending,
        error: NoOp,
        success: NoOp,
      })}
    </BottomDrawer>
  );
}
