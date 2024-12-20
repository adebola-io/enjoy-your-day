import { navigationBarLinks, type NavigationLink } from '#/data';
import { vibrate } from '#/library/utils';
import { For } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import { Cell } from '@adbl/cells';
import classes from './navigation-bar.module.css';

export function NavigationBar() {
  const router = useRouter();
  const route = router.getCurrentRoute();
  const autoSelectIsOpen = Cell.derived(() => {
    return route.value.query.has('auto-select');
  });
  return (
    <nav
      id="mainNavbar"
      class={classes.container}
      data-auto-select-is-open={autoSelectIsOpen}
      inert={autoSelectIsOpen}
    >
      {For(navigationBarLinks, NavigationItem)}
    </nav>
  );
}

function NavigationItem(props: NavigationLink) {
  const router = useRouter();
  return (
    <router.Link
      class={classes.item}
      href={props.path}
      onClick={() => vibrate()}
    >
      <props.icon data-name={props.name} class={classes.icon} />
      {props.name}
    </router.Link>
  );
}
