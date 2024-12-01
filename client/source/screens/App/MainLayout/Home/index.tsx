import { CupIcon } from '#/components/icons/cup';
import { MoonAndStartsIcon } from '#/components/icons/moon-and-starts';
import { SunIcon } from '#/components/icons/sun';
import { CalendarIcon } from '#/components/icons/calendar';
import { SparkleIcon } from '#/components/icons/sparkle';
import { Button } from '#/components/Button';
import type { IconProps } from '#/components/icons/props';
import { goalsForTheDay, timeOfDay } from '#/data';
import { Cell } from '@adbl/cells';
import { If } from '@adbl/unfinished';
import styles from './Home.module.css';

export default function Home() {
  const hasAssignedGoals = Cell.derived(() => {
    return goalsForTheDay.value.length > 0;
  });
  return If(hasAssignedGoals, HomeView, GoalsWelcomeView);
}

function GoalsWelcomeView() {
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
        href="/app/user/goals"
        class={styles.goalsPageLink}
        variant="primary"
      >
        Go to Goals
      </Button>
    </div>
  );
}

function HomeView() {
  return (
    <div class={styles.container}>
      <TimeBasedIcon class={styles.timeIcon} />
      <TimeBasedGreeting />
    </div>
  );
}

function TimeBasedIcon(props: IconProps) {
  const Icon = Cell.derived(() => {
    switch (timeOfDay.value) {
      case 'morning':
        return CupIcon;
      case 'afternoon':
        return SunIcon;
      case 'evening':
        return MoonAndStartsIcon;
    }
  });

  return <Icon.value {...props} />;
}

function TimeBasedGreeting() {
  const greeting = Cell.derived(() => {
    switch (timeOfDay.value) {
      case 'morning':
        return 'Good morning';
      case 'afternoon':
        return 'Good afternoon';
      case 'evening':
        return 'Good evening';
    }
  });

  return <span class={styles.timeGreeting}>{greeting}</span>;
}
