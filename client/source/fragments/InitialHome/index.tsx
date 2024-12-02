import { Button } from '#/components/Button';
import { CalendarIcon } from '#/components/icons/calendar';
import { SparkleIcon } from '#/components/icons/sparkle';
import styles from './InitialHome.module.css';

export function InitialHome() {
  return (
    <div class={[styles.container, styles.noGoalsContainer]}>
      <CalendarIcon class={styles.calendarIcon} />
      <h2 class={styles.noGoalsHeading}>What are today's goals?</h2>
      <p class={styles.noGoalsText}>
        Set the tone for a productive day. Choose goals that inspire you, and
        let's make today interesting!
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
