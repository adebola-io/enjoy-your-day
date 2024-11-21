import styles from './styles.module.css';

import { Button } from '@/components/button';
import { Logo } from '@/components/logo';
import { GoogleLogo } from '@/components/google-logo';
import { GithubLogo } from '@/components/github-logo';

export default function Start() {
  return (
    <main class={styles.startView}>
      <Logo class={styles.logo} />
      <h1 class={styles.heading}>Enjoy your day.</h1>
      <div class={styles.buttonRow}>
        <Button class={styles.button}>
          <GoogleLogo class={styles.buttonLogo} />
          Continue with Google
        </Button>
        <Button class={[styles.button, styles.secondaryButton]}>
          <GithubLogo class={styles.buttonLogo} />
          Continue with GitHub
        </Button>
      </div>
    </main>
  );
}
