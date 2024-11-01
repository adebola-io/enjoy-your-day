import { Logo } from '../../../components/logo';

import styles from './styles.module.scss';

export default function Home() {
  return (
    <div class={styles.homeView}>
      <Logo />
      <h1 class={styles.headingText}>enjoy your day!</h1>
    </div>
  );
}
