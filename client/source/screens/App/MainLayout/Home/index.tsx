import { CupIcon } from '@/components/icons/cup';
import styles from './Home.module.css';
import { SunIcon } from '@/components/icons/sun';
import { MoonAndStartsIcon } from '@/components/icons/moon-and-starts';
import type { IconProps } from '@/components/icons/props';
import { goalsForTheDay } from '@/data';
import { CalendarIcon } from '@/components/icons/calendar';
import { Button } from '@/components/Button';
import { SparkleIcon } from '@/components/icons/sparkle';

export default function Home() {
  // No Goals selected.
  if (goalsForTheDay.value.length === 0) {
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
        >
          <SparkleIcon class={styles.sparkleIcon} />
          Select for me
        </Button>
        <Button
          href="/app/user/goals"
          class={styles.goalsPageLink}
          variant="primary"
        >
          Go to Goals
        </Button>
      </div>
    );
  }

  return (
    <div class={styles.container}>
      <TimeBasedIcon class={styles.timeIcon} />
      <TimeBasedGreeting />
    </div>
  );
}

function TimeBasedIcon(props: IconProps) {
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    return <CupIcon {...props} />;
  }

  if (hours < 18) {
    return <SunIcon {...props} />;
  }

  return <MoonAndStartsIcon {...props} />;
}

function TimeBasedGreeting() {
  const date = new Date();
  const hours = date.getHours();

  const greeting =
    hours < 12
      ? 'Good morning.'
      : hours < 18
      ? 'Good afternoon.'
      : 'Good evening.';

  return <span class={styles.timeGreeting}>{greeting}</span>;
}
