import { ProgressBar } from '#/components/progress-bar';
import { TimeBasedGreeting } from '#/components/time-based-greeting';
import { TimeBasedIcon } from '#/components/time-based-icon';
import { GoalChecklistItem } from '#/components/goal-checklist-item';
import { Cell } from '@adbl/cells';
import { dailyGoals, timeOfDay } from '#/data/state';
import { For } from '@adbl/unfinished';
import classes from './home-view.module.css';

export default function HomeView() {
  const listChanged = Cell.source(false);
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

  return (
    <>
      <TimeBasedIcon class={classes.timeIcon} data-time-of-day={timeOfDay} />
      <TimeBasedGreeting class={classes.timeGreeting} />
      <div class={classes.stickyArea}>
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
      <form class={classes.goals} style={formStyles}>
        {For(goals, (state, index) => {
          return (
            <GoalChecklistItem
              goalState={state}
              index={index}
              listChanged={listChanged}
            />
          );
        })}
      </form>
    </>
  );
}
