import { TimeBasedGreeting } from '#/components/time-based-greeting';
import { TimeBasedIcon } from '#/components/time-based-icon';
import type { GoalState } from '#/data/db';
import type { Cell } from '@adbl/cells';
import styles from './home-view.module.css';

interface HomeViewProps {
  dailyGoals: Cell<GoalState[]>;
}

export default function HomeView(props: HomeViewProps) {
  console.log(props.dailyGoals);
  return (
    <div class={styles.container}>
      <TimeBasedIcon class={styles.timeIcon} />
      <TimeBasedGreeting class={styles.timeGreeting} />
    </div>
  );
}
