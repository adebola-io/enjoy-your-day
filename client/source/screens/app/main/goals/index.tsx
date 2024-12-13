import { SearchIcon } from '#/components/icons/search';
import { Input } from '#/components/input';
import { Logo } from '#/components/logo';
import classes from './goals.module.css';

export default function Goals() {
  return (
    <div class={classes.goalsTabContainer}>
      <Logo thick class={classes.logo} />
      <form class={classes.searchForm}>
        <SearchIcon class={classes.searchIcon} />
        <Input class={classes.searchBar} type="search" />
      </form>
      <ul class={classes.carousels}>
        <li>Hello world.</li>
      </ul>
    </div>
  );
}
