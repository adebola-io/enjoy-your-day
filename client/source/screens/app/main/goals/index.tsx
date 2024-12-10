import { SearchIcon } from '#/components/icons/search';
import { Input } from '#/components/input';
import { Logo } from '#/components/logo';
import styles from './goals.module.css';

export default function Goals() {
  return (
    <div class={styles.goalsTabContainer}>
      <Logo thick class={styles.logo} />
      <form class={styles.searchForm}>
        <SearchIcon class={styles.searchIcon} />
        <Input class={styles.searchBar} type="search" />
      </form>
      <ul class={styles.carousels}>
        <li>Hello world.</li>
      </ul>
    </div>
  );
}
