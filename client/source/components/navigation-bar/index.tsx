import { navigationBarLinks, type NavigationLink } from '#/data';
import { For } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import styles from './navigation-bar.module.css';
import { vibrate } from '#/library';

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
      <props.icon data-name={props.name} class={styles.icon} />
      {props.name}
    </router.Link>
  );
}
