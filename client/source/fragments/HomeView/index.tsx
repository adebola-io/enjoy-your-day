import { TimeBasedGreeting } from '#/components/TimeBasedGreeting';
import { TimeBasedIcon } from '#/components/TimeBasedIcon';
import styles from './HomeView.module.css';

export default function HomeView() {
  return (
    <div class={styles.container}>
      <TimeBasedIcon class={styles.timeIcon} />
      <TimeBasedGreeting class={styles.timeGreeting} />
    </div>
  );
}
