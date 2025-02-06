import { BottomDrawer } from '#/components/bottom-drawer';
import { PadLockIcon } from '#/components/icons/padlock';
import { Loader } from '#/components/loader';
import { Button } from '#/components/button';
import { dailyGoals, dailyGoalsDateStamp } from '#/data/state';
import type {
  GoalProps,
  GoalState,
  GoalStateSerialized,
} from '#/data/entities';
import {
  getResourceState,
  NoOp,
  removeRouteQuery,
  useRouteQuery,
} from '#/library/utils';
import { Cell, type SourceCell } from '@adbl/cells';
import { Switch } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import { Temporal } from 'temporal-polyfill';
import classes from './confirm-drawer.module.css';
import { triggerNotification } from '#/services/notifications';

function transformToGoalState(goal: GoalProps): GoalStateSerialized {
  const dateAdded = new Date(goal.dateAdded).toISOString();
  return {
    goal: { ...goal, categories: Array.from(goal.categories), dateAdded },
    state: 'scheduled',
    updatedAt: null,
  };
}

async function saveGoalsForToday(goals: GoalProps[]) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  dailyGoals.value = goals.map(transformToGoalState);
  dailyGoalsDateStamp.value = Temporal.Now.plainDateISO().toString();
  return true;
}

export interface ConfirmDrawerProps {
  goals: SourceCell<GoalProps[] | null>;
}

export function ConfirmDrawer(props: ConfirmDrawerProps) {
  const router = useRouter();
  const drawerIsOpen = useRouteQuery('confirm');
  const goals = Cell.derived(() => props.goals.value ?? []);
  const resource = Cell.async(saveGoalsForToday);
  const state = getResourceState(resource);
  const drawerClosable = Cell.derived(() => !resource.pending.value);
  const shouldStaggerChildren = Cell.derived(() => {
    const resourceIsPending = resource.pending.value;
    const drawerOpen = drawerIsOpen.value;
    return drawerOpen && !resourceIsPending;
  });

  const handleDrawerClose = async () => {
    await removeRouteQuery('confirm', drawerIsOpen);
  };

  const saveGoals = async () => {
    await resource.run(goals.value);
    await handleDrawerClose();
    await new Promise((r) => setTimeout(r, 200)); // TODO: remove this
    triggerNotification({
      title: 'Godspeed! ✨',
      body: 'Your goals for today have been set. Good luck.',
    });
    router.navigate('/home');
  };

  resource.pending.listen((isPending) => {
    document.body.toggleAttribute('data-dialog-is-pending', isPending);
  });

  const Prompt = () => {
    return (
      <>
        <PadLockIcon class={classes.padlock} />
        <h2 class={classes.heading}>Almost There...</h2>
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

  const ErrorOccurred = () => (
    <>
      <h2 class={classes.heading}>An Error Occurred.</h2>
      <p class={classes.text}>{resource.error.value?.message}</p>
      <Button variant="secondary" rounded onClick={saveGoals}>
        Try Again
      </Button>
    </>
  );

  return (
    <BottomDrawer
      class={classes.container}
      open={drawerIsOpen}
      closable={drawerClosable}
      onClose={handleDrawerClose}
      shrinkTarget="#goalCardsView, #autoSelectEdit"
      data-dialog-state={state}
      data-stagger-children={shouldStaggerChildren}
    >
      {Switch(state, {
        inert: Prompt,
        pending: Pending,
        error: ErrorOccurred,
        success: NoOp,
      })}
    </BottomDrawer>
  );
}
