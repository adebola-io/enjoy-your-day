import { Input } from '#/components/input';
import { ProgressBar } from '#/components/progress-bar';
import { TimeBasedGreeting } from '#/components/time-based-greeting';
import { TimeBasedIcon } from '#/components/time-based-icon';
import { Cell } from '@adbl/cells';
import classes from './home-view.module.css';

export default function HomeView() {
  const percentage = Cell.source('50');
  const percentageParsed = Cell.derived(() => Number(percentage.value));
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
          percent={percentageParsed}
          color="gray"
        />
        <Input type="number" model={percentage} />
      </div>
    </>
  );
}
