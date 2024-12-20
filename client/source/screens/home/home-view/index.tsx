import { ProgressBar } from '#/components/progress-bar';
import { TimeBasedGreeting } from '#/components/time-based-greeting';
import { TimeBasedIcon } from '#/components/time-based-icon';
import { Cell } from '@adbl/cells';
import classes from './home-view.module.css';
import { dailyGoals } from '#/data/state';

export default function HomeView() {
  const percentage = Cell.derived(() => {
    const total = dailyGoals.value.length;
    const scheduled = dailyGoals.value.filter(
      (goalState) => goalState.state !== 'scheduled'
    ).length;
    return (scheduled / total) * 100;
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
          color="gray"
        />
      </div>
    </>
  );
}
