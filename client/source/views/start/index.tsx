import { Button } from '@/components/button';
import styles from './styles.module.css';
import { Logo } from '@/components/logo';

export default function Start() {
  return (
    <main class={styles.startView}>
      <Logo
        class={styles.logo}
        style={{
          viewTransitionName: 'start-logo',
        }}
      />
      <h1
        class={styles.heading}
        style={{
          viewTransitionName: 'start-heading',
        }}
      >
        Enjoy your day.
      </h1>
      <div class={styles.buttonRow}>
        <Button
          class={styles.button}
          style={{
            viewTransitionName: 'start-button',
          }}
        >
          Continue with Google
        </Button>
        <Button class={styles.button}>Continue with GitHub</Button>
      </div>
    </main>
  );
}
