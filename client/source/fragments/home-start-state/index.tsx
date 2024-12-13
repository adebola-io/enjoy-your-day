import { Button } from '#/components/button';
import { CalendarIcon } from '#/components/icons/calendar';
import { SparkleIcon } from '#/components/icons/sparkle';
import classes from './home-start-state.module.css';

export default function InitialHome() {
  return (
    <div class={classes.noGoalsContainer}>
      <CalendarIcon class={classes.calendarIcon} />
      <h2 class={classes.noGoalsHeading}>What will we do today?</h2>
      <p class={classes.noGoalsText}>
        Set the tone for an interesting day. Choose goals that inspire you, and
        let's make today memorable!
      </p>
      <Button
        href="/app/auto-select"
        class={classes.autoSelectLink}
        variant="secondary"
        vibrateOnClick
      >
        <SparkleIcon class={classes.sparkleIcon} />
        Select for me
      </Button>
      <Button
        href="/app/main/goals"
        class={classes.goalsPageLink}
        variant="primary"
      >
        Go to Goals
      </Button>
    </div>
  );
}
