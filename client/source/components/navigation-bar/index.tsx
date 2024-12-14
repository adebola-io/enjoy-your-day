import { navigationBarLinks, type NavigationLink } from '#/data';
import { For } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import classes from './navigation-bar.module.css';
import { vibrate } from '#/library/utils';

export function NavigationBar() {
  return (
    <nav class={classes.container}>
      {For(navigationBarLinks, NavigationItem)}
    </nav>
  );
}

function NavigationItem(props: NavigationLink) {
  const router = useRouter();

  return (
    <router.Link class={classes.item} href={props.path} onClick={vibrate}>
      <props.icon data-name={props.name} class={classes.icon} />
      {props.name}
    </router.Link>
  );
}
