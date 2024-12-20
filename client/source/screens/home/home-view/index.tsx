import { ProgressBar } from '#/components/progress-bar';
import { TimeBasedGreeting } from '#/components/time-based-greeting';
import { TimeBasedIcon } from '#/components/time-based-icon';
import { Cell } from '@adbl/cells';
import classes from './home-view.module.css';
import { dailyGoals, timeOfDay } from '#/data/state';
import { CSS_VARS } from '#/styles/variables';
import { For } from '@adbl/unfinished';
import { GoalChecklistItem } from '#/components/goal-checklist-item';

export default function HomeView() {
  const scheduledGoals = Cell.derived(() => {
    return dailyGoals.value.filter(
      (goalState) => goalState.state === 'scheduled'
    );
  });

  const percentage = Cell.derived(() => {
    return (
      ((dailyGoals.value.length - scheduledGoals.value.length) /
        dailyGoals.value.length) *
      100
    );
  });

  const progressColor = Cell.derived(() => {
    if (timeOfDay.value === 'evening' && percentage.value < 80) {
      return 'red';
    }
    if (percentage.value > 80) {
      return 'green';
    }
    if (percentage.value > 60) {
      return 'yellow';
    }

    return CSS_VARS['--space-cadet-500'];
  });

  return (
    <>
      <div class={classes.headingText}>
        <TimeBasedIcon class={classes.timeIcon} />
        <TimeBasedGreeting class={classes.timeGreeting} />
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
      <form class={classes.goals} onSubmit--prevent={() => {}}>
        {For(scheduledGoals, (state, index) => {
          return <GoalChecklistItem goalState={state} index={index} />;
        })}
      </form>
    </>
  );
}
