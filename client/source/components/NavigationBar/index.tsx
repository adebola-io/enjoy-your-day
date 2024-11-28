import { navigationBarLinks, type NavigationLink } from '@/data';
import { For } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import styles from './NavigationBar.module.css';
import { vibrate } from '@/library';

export function NavigationBar() {
  return (
    <nav class={styles.container}>
      {For(navigationBarLinks, NavigationItem)}
    </nav>
  );
}

function NavigationItem(props: NavigationLink) {
  const router = useRouter();
  return (
    <router.Link class={styles.item} href={props.path} onClick={vibrate}>
      <props.icon class={styles.icon} />
      {props.name}
    </router.Link>
  );
}