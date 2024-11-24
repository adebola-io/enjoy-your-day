import styles from './styles.module.css';
import { useRouter } from '@adbl/unfinished/router';

export default function Start() {
  const { Outlet } = useRouter();

  return (
    <main class={styles.startView}>
      <Outlet keepAlive class={styles.startOutlet} />
    </main>
  );
}
