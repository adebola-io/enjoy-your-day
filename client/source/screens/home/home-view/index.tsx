import { ProgressBar } from '#/components/progress-bar';
import { TimeBasedGreeting } from '#/components/time-based-greeting';
import { TimeBasedIcon } from '#/components/time-based-icon';
import { GoalChecklistItem } from '#/components/goal-checklist-item';
import {
  dailyGoals,
  goalsCompleted,
  shouldShowCompletionScreen,
  timeOfDay,
} from '#/data/state';
import { vibrate } from '#/library/utils';
import { Cell } from '@adbl/cells';
import { For } from '@adbl/unfinished';
import classes from './home-view.module.css';

export default function HomeView() {
  const listChanged = Cell.source(false);
  const stickyAreaRef = Cell.source<HTMLElement | null>(null);
  const numberOfScheduledGoals = Cell.derived(() => {
    return dailyGoals.value.filter((s) => s.state === 'scheduled').length;
  });

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
  const formStyles = {
    '--total': Cell.derived(() => goals.value.length),
    '--list-changed': Cell.derived(() => +listChanged.value),
  };

  const percentage = Cell.derived(() => {
    const otherGoals = dailyGoals.value.length - numberOfScheduledGoals.value;
    return (otherGoals / dailyGoals.value.length) * 100;
  });

  const progressColor = Cell.derived(() => {
    if (timeOfDay.value === 'evening' && percentage.value < 60)
      return '#9f2f2f';
    if (percentage.value > 90) return 'var(--fern-green-400)';
    if (percentage.value > 80) return 'var(--fern-green-600)';
    if (percentage.value > 60) return '#0e473f';
    return 'var(--space-cadet-500)';
  });

  const handleGoalChecked = () => {
    if (!goalsCompleted.value) return;
    vibrate([100, 75, 50, 75, 100]);
    const stickyArea = stickyAreaRef.value;
    if (!stickyArea) return;
    stickyArea.ontransitionend = (event) => {
      if (event.target !== event.currentTarget) return;
      shouldShowCompletionScreen.value = true;
      stickyArea.ontransitionend = null;
    };
  };

  return (
    <>
      <TimeBasedIcon
        class={classes.timeIcon}
        data-time-of-day={timeOfDay}
        data-element-set="home"
        inert={goalsCompleted}
      />
      <TimeBasedGreeting
        class={classes.timeGreeting}
        data-element-set="home"
        inert={goalsCompleted}
      />
      <div
        ref={stickyAreaRef}
        class={classes.stickyArea}
        data-element-set="home"
        inert={goalsCompleted}
      >
        <p class={classes.encouragement}>
          There are only 5 goals left for today. Don't give up, you're almost
          there!
        </p>
        <ProgressBar
          class={classes.progressBar}
          percent={percentage}
          color={progressColor}
        />
      </div>
      <form
        class={classes.goals}
        style={formStyles}
        data-element-set="home"
        inert={goalsCompleted}
      >
        {For(goals, (state, index) => {
          return (
            <GoalChecklistItem
              goalState={state}
              index={index}
              listChanged={listChanged}
              onCheck={handleGoalChecked}
            />
          );
        })}
      </form>
    </>
  );
}
