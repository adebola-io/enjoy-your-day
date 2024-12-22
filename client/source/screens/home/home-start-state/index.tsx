import { Button } from '#/components/button';
import { InlinedIcon } from '#/components/inlined-icon';
import { CalendarIcon } from '#/components/icons/calendar';
import { SparkleIcon } from '#/components/icons/sparkle';
import { CSS_VARS } from '#/styles/variables';
import classes from './home-start-state.module.css';

export default function InitialHome() {
  return (
    <div class={classes.noGoalsContainer} data-stagger-children>
      <InlinedIcon
        Icon={CalendarIcon}
        class={classes.calendarIcon}
        color={CSS_VARS['--space-cadet-500']}
        title="Calendar Icon"
      />
      <h2 class={classes.noGoalsHeading}>What will we do today?</h2>
      <p class={classes.noGoalsText}>
        Set the tone for an interesting day. Choose goals that inspire you, and
        let's make today memorable!
      </p>
      <Button
        href="/home?auto-select"
        class={classes.autoSelectLink}
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
        Get Started
      </Button>
    </div>
  );
}
