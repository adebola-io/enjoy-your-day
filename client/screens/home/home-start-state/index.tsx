import { Button } from '#/components/button';
import { CalendarIcon } from '#/components/icons/calendar';
import { SparkleIcon } from '#/components/icons/sparkle';
import classes from './home-start-state.module.css';
import MicrochipIcon from '#/components/icons/microchip';

export default function InitialHome() {
  return (
    <div class={classes.noGoalsContainer} data-stagger-children>
      <CalendarIcon class={classes.calendarIcon} />
      <h2 class={classes.noGoalsHeading}>What should we do today?</h2>
      <p class={classes.noGoalsText}>
        Set the tone for an interesting day. Choose goals that inspire you, and
        let's make today memorable!
      </p>
      <Button
        href="/home?auto-select"
        class={classes.button}
        variant="secondary"
        vibrate
        rounded
      >
        <SparkleIcon class={classes.sparkleIcon} />
        Select for me
      </Button>
      <Button
        class={classes.button}
        href="/home?auto-select&stage=edit"
        variant="primary"
        rounded
      >
        <MicrochipIcon class={classes.sparkleIcon} />
        Create a plan
      </Button>
    </div>
  );
}
