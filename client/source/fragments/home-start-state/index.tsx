import { Button } from '#/components/button';
import { CalendarIcon } from '#/components/icons/calendar';
import { SparkleIcon } from '#/components/icons/sparkle';
import styles from './home-start-state.module.css';

export default function InitialHome() {
  return (
    <div class={styles.noGoalsContainer}>
      <CalendarIcon class={styles.calendarIcon} />
      <h2 class={styles.noGoalsHeading}>What will we do today?</h2>
      <p class={styles.noGoalsText}>
        Set the tone for an interesting day. Choose goals that inspire you, and
        let's make today memorable!
      </p>
      <Button
        href="/app/auto-select"
        class={styles.autoSelectLink}
        variant="secondary"
        vibrateOnClick
      >
        <SparkleIcon class={styles.sparkleIcon} />
        Select for me
      </Button>
      <Button
        href="/app/main/goals"
        class={styles.goalsPageLink}
        variant="primary"
      >
        Go to Goals
      </Button>
    </div>
  );
}
