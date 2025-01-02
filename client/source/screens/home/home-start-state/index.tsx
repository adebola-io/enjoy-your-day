import { Button } from '#/components/button';
import { InlinedIcon } from '#/components/inlined-icon';
import { CalendarIcon } from '#/components/icons/calendar';
import { SparkleIcon } from '#/components/icons/sparkle';
import { CSS_VARS } from '#/styles/variables';
import classes from './home-start-state.module.css';
import AddIcon from '#/components/icons/add';
import MicrochipIcon from '#/components/icons/microchip';

export default function InitialHome() {
  return (
    <div class={classes.noGoalsContainer} data-stagger-children>
      <InlinedIcon
        Icon={CalendarIcon}
        class={classes.calendarIcon}
        color={CSS_VARS['--space-cadet-500']}
        title="Calendar Icon"
      />
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
        <InlinedIcon
          Icon={SparkleIcon}
          class={classes.sparkleIcon}
          color="white"
          title="Sparkle Icon"
        />
        Select for me
      </Button>
      <Button
        class={classes.button}
        href="/home?auto-select&stage=edit"
        variant="primary"
        rounded
      >
        <InlinedIcon
          Icon={MicrochipIcon}
          class={classes.sparkleIcon}
          color={CSS_VARS['--space-cadet-500']}
          title="Sparkle Icon"
        />
        Create a plan
      </Button>
    </div>
  );
}
