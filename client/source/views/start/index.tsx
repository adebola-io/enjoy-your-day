import styles from './styles.module.css';

export default function Start() {
  return (
    <div class={styles.startView}>
      <main class={styles.content}>
        <h1 class={styles.heading}>
          <span class={styles.headingText}>frontend.</span>
        </h1>
        <p class={styles.paragraph}>You're viewing the Start page.</p>
        <p class={styles.readTheDocs}>
          Check out the{' '}
          <a
            href="https://github.com/adebola-io/unfinished"
            target="_blank"
            rel="noopener noreferrer"
            class={styles.link}
          >
            documentation
          </a>{' '}
          to learn more.
        </p>
      </main>
    </div>
  );
}
