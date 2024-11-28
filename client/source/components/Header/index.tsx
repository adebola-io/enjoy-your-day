import { HamburgerIcon } from '#/components/icons/hamburger';
import styles from './Header.module.css';

export function Header() {
  return (
    <header class={styles.container}>
      <HamburgerIcon class={styles.sidebarIcon} />
    </header>
  );
}
