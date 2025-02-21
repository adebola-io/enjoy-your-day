import { ProgressBar } from '#/components/progress-bar';
import { TimeBasedGreeting } from '#/components/time-based-greeting';
import { TimeBasedIcon } from '#/components/time-based-icon';
import { TrophyIcon } from '#/components/icons/trophy';
import { GoalChecklistItem } from '#/components/goal-checklist-item';
import { FloatingActionButton } from '#/components/floating-action-button';
import AddIcon from '#/components/icons/add';
import {
  dailyGoals,
  goalsCompleted,
  numberOfScheduledGoals,
  timeOfDay,
} from '#/data/state';
import type { GoalPropsSerialized, GoalStateSerialized } from '#/data/entities';
import { encouragement } from '#/data/encouragement';
import { GoalsCompletedDrawer } from './goals-completed';
import { vibrate } from '#/library/utils';
import { Cell } from '@adbl/cells';
import { If } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import { extraGoalsPageQuery } from '#/screens/extra-goals';
import { triggerNotification } from '#/services/notifications';
import GoalDetailsDrawer, {
  drawerQuery,
} from '#/screens/extra-goals/goal-details';
import classes from './home-view.module.css';
import { Button } from '#/components/button';
import { InlinedIcon } from '#/components/inlined-icon';
import DoubleCheckIcon from '#/components/icons/double-check';
import { CSS_VARS } from '#/styles/variables';
import XIcon from '#/components/icons/x';
import {
  addRouteQuery,
  removeRouteQuery,
  useRouteQuery,
} from '@adbl/iota/utils/router';
import { ElasticArea } from '@adbl/iota/components/elastic-area';
import { FluidList } from '@adbl/iota/components/fluid-list';
import GoalForfeitDrawer, { goalForfeitDrawerQuery } from './goal-forfeit';

export default function HomeView() {
  const router = useRouter();
  const initialGoalLength = dailyGoals.value.length;
  const listChanged = Cell.derived(() => {
    return initialGoalLength !== dailyGoals.value.length;
  });
  const extraGoalsScreenIsOpen = useRouteQuery(extraGoalsPageQuery);

  const goals = Cell.derived(() => {
    const scheduled = [];
    const finished = [];
    const forfeited = [];
    for (const goalState of dailyGoals.value) {
      if (goalState.state === 'scheduled') scheduled.push(goalState);
      else if (goalState.state === 'completed') finished.push(goalState);
      else forfeited.push(goalState);
    }
    return [...scheduled, ...finished, ...forfeited];
  });

  const percentage = Cell.derived(() => {
    const otherGoals = dailyGoals.value.length - numberOfScheduledGoals.value;
    return (otherGoals / dailyGoals.value.length) * 100;
  });

  const progressColor = Cell.derived(() => {
    if (timeOfDay.value === 'evening' && percentage.value < 60)
      return '#9f2f2f';
    if (percentage.value > 90) return '#2c612c';
    if (percentage.value > 80) return 'var(--fern-green-600)';
    if (percentage.value > 60) return '#0e473f';
    return 'light-dark(var(--space-cadet-500), var(--space-cadet-300))';
  });

  const handleGoalChecked = () => {
    if (!goalsCompleted.value) return;
    vibrate([100, 75, 50, 75, 100]);
    triggerNotification({
      title: 'Excellent! 😍',
      body: 'You have completed all your goals for today.',
    });
    setTimeout(() => addRouteQuery('goals-completed'), 400);
  };

  const handleLongPress = (item: GoalStateSerialized) => {
    vibrate();
    if (item.state === 'forfeited') return;
    addRouteQuery(drawerQuery, item.goal.uuid);
  };

  const toggleExtraGoalScreen = () => {
    if (extraGoalsScreenIsOpen.value) removeRouteQuery(extraGoalsPageQuery);
    else addRouteQuery(extraGoalsPageQuery);
  };

  return (
    <ElasticArea
      id="homeView"
      yAxis
      class={classes.container}
      data-goals-completed={goalsCompleted}
      data-extra-goals-screen-is-open={extraGoalsScreenIsOpen}
    >
      <TimeBasedIcon class={classes.timeIcon} data-time-of-day={timeOfDay} />
      <TimeBasedGreeting class={classes.timeGreeting} />
      <div class={classes.stickyArea}>
        <p class={classes.encouragement}>{encouragement}</p>
        <ProgressBar
          class={classes.progressBar}
          percent={percentage}
          color={progressColor}
        />
      </div>
      {If(goalsCompleted, () => (
        <router.Link
          class={classes.goalsCompletedBadge}
          href="/home?goals-completed"
        >
          <TrophyIcon class={classes.trophyIcon} />
          Goals completed!
        </router.Link>
      ))}
      <div class={classes.goalsContainer}>
        <FluidList
          class={classes.goals}
          items={goals}
          itemWidth="100%"
          itemHeight="var(--goal-card-suggestive-size)"
          speed="calc(var(--default-duration) * 1.75)"
          gap="3px"
          data-list-changed={listChanged}
          Template={({ item, index }) => (
            <GoalChecklistItem
              goalState={item}
              index={index}
              onCheck={handleGoalChecked}
              onLongPress={() => handleLongPress(item)}
            />
          )}
        />
      </div>
      <FloatingActionButton
        class={classes.addGoalButton}
        block="end"
        inline="end"
        data-open={extraGoalsScreenIsOpen}
        onClick={toggleExtraGoalScreen}
      >
        <AddIcon class={classes.addIcon} />
      </FloatingActionButton>
      <GoalsCompletedDrawer />
      <GoalDetailsDrawer
        shrinkTarget="#homeView"
        buttons={GoalDetailsButtons}
      />
      <GoalForfeitDrawer />
    </ElasticArea>
  );
}

function GoalDetailsButtons(goal: GoalPropsSerialized) {
  const state = Cell.derived(() =>
    dailyGoals.value.find((g) => g.goal.uuid === goal.uuid)
  );
  const completed = Cell.derived(() => state.value?.state === 'completed');
  const forfeited = Cell.derived(() => state.value?.state === 'forfeited');
  const notForfeited = Cell.derived(() => !forfeited.value);
  const notCompleted = Cell.derived(() => !completed.value);

  const handleCheck = () => {
    if (!state.value) return;

    const next = state.value.state === 'completed' ? 'scheduled' : 'completed';
    state.value.state = next;
    const selector = `[data-goal-uuid='${state.value.goal.uuid}'] input`;
    const goalItem = document.querySelector<HTMLInputElement>(selector);

    if (goalItem) goalItem.checked = next === 'completed';

    removeRouteQuery(drawerQuery);
  };

  const forfeitGoal = () => {
    addRouteQuery(goalForfeitDrawerQuery, goal.uuid);
  };

  return (
    <>
      {If(notCompleted, () => (
        <Button
          class={classes.forfeitButton}
          variant="outlined"
          rounded
          data-forfeited={forfeited}
          onClick={forfeitGoal}
        >
          <InlinedIcon
            class={classes.buttonIcon}
            Icon={XIcon}
            color="white"
            title="Forfeit goal icon"
          />
          Forfeit
        </Button>
      ))}
      {If(notForfeited, () => (
        <Button
          class={classes.completeButton}
          rounded
          data-checked={completed}
          onClick={handleCheck}
        >
          <InlinedIcon
            class={classes.buttonIcon}
            Icon={DoubleCheckIcon}
            color={CSS_VARS['--space-cadet-500']}
            title="Double check icon"
          />
          {If(completed, {
            true: () => 'Completed',
            false: () => 'Complete',
          })}
        </Button>
      ))}
    </>
  );
}
