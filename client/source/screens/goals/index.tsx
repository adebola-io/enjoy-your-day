import { SearchInput } from '#/components/search-input';
import { Logo } from '#/components/logo';
import classes from './goals.module.css';

export default function Goals() {
  return (
    <>
      <Logo thick class={classes.logo} />
      <SearchInput class={classes.searchInput} />
      <ul class={classes.carousels}>
        <li>Hello world.</li>
      </ul>
    </>
  );
}
