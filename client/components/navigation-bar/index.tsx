import { navigationBarLinks, type NavigationLink } from '#/data';
import { vibrate } from '#/library/utils';
import { For } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import classes from './navigation-bar.module.css';
import { useRouteQuery } from '@adbl/iota/utils/router';

export function NavigationBar() {
  const autoSelectIsOpen = useRouteQuery('auto-select');
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
  const { path, name, Icon } = props;
  const router = useRouter();
  return (
    <router.Link class={classes.item} href={path} onClick={() => vibrate()}>
      <Icon data-name={name} class={classes.icon} />
      {name}
    </router.Link>
  );
}
