import { ProgressBar } from '#/components/progress-bar';
import { TimeBasedGreeting } from '#/components/time-based-greeting';
import { TimeBasedIcon } from '#/components/time-based-icon';
import { TrophyIcon } from '#/components/icons/trophy';
import { GoalChecklistItem } from '#/components/goal-checklist-item';
import { ElasticView } from '#/components/elastic-view';
import { FloatingActionButton } from '#/components/floating-action-button';
import AddIcon from '#/components/icons/add';
import {
  dailyGoals,
  goalsCompleted,
  numberOfScheduledGoals,
  timeOfDay,
} from '#/data/state';
import { encouragement } from '#/data/encouragement';
import { GoalsCompletedDrawer } from './goals-completed';
import {
  addRouteQuery,
  removeRouteQuery,
  useRouteQuery,
  vibrate,
} from '#/library/utils';
import { Cell } from '@adbl/cells';
import { If } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import { extraGoalsPageQuery } from '#/screens/extra-goals';
import { triggerNotification } from '#/services/notifications';
import { FluidList } from '#/components/fluid-list';
import classes from './home-view.module.css';

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

  const toggleExtraGoalScreen = () => {
    if (extraGoalsScreenIsOpen.value) removeRouteQuery(extraGoalsPageQuery);
    else addRouteQuery(extraGoalsPageQuery);
  };

  return (
    <ElasticView
      id="homeView"
      yAxis
      class={classes.container}
      data-stagger-children
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
      <FluidList
        class={classes.goals}
        items={goals}
        itemWidth="100%"
        speed="calc(var(--default-duration) * 1.75)"
        gap="10px"
        data-list-changed={listChanged}
        Template={({ item, index }) => (
          <GoalChecklistItem
            goalState={item}
            index={index}
            onCheck={handleGoalChecked}
          />
        )}
      />
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
    </ElasticView>
  );
}
