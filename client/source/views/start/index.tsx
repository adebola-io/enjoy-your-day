import styles from './styles.module.css';
import { Logo } from '@/components/logo';

export default function Start() {
  return (
    <main class={styles.startView}>
      <Logo class={styles.logo} />
      <h1 class={styles.heading}>Enjoy your day.</h1>
      <div class={styles.buttonRow}>
        <button type="button" class={styles.card}>
          Import your data
        </button>
        <button class={[styles.card, styles.secondaryButton]}>
          Start afresh
        </button>
      </div>
    </main>
  );
}
