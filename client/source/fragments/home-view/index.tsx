import { TimeBasedGreeting } from '#/components/time-based-greeting';
import { TimeBasedIcon } from '#/components/time-based-icon';
import styles from './home-view.module.css';

export default function HomeView() {
  return (
    <div class={styles.container}>
      <TimeBasedIcon class={styles.timeIcon} />
      <TimeBasedGreeting class={styles.timeGreeting} />
    </div>
  );
}
