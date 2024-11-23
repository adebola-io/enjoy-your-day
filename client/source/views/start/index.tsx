import { Input } from '@/components/input';
import styles from './styles.module.css';
import { Logo } from '@/components/logo';
import { Cell } from '@adbl/cells';
import { Button } from '@/components/button';

export default function Start() {
  const name = Cell.source('');

  return (
    <main class={styles.startView}>
      <div class={styles.startViewContent}>
        <Logo class={styles.logo} />
        <h2 class={styles.heading}>What's your name?</h2>
        <p class={styles.subheading}>
          What should I call you to make this more personal?
        </p>
        <Input class={styles.nameInput} model={name} />
      </div>

      <Button class={styles.button} vibrateOnClick>
        Continue
      </Button>
    </main>
  );
}
