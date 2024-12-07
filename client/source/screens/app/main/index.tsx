import { Header } from '#/components/header';
import { NavigationBar } from '#/components/navigation-bar';
import { setMetaThemeColor } from '#/library';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import styles from './main.module.css';

export default async function Main() {
  const router = useRouter();
  setMetaThemeColor('white');

  const animationClass = Cell.derived(() => {
    return initialLoadComplete.value
      ? styles.rootViewTransition
      : styles.stretchIntoView;
  });

  return (
    <div class={[styles.mainLayoutView, animationClass]}>
      <Header />
      <router.Outlet keepAlive onAnimationStart={addViewTransition} />
      <NavigationBar />
    </div>
  );
}

const initialLoadComplete = Cell.source(false);
function addViewTransition() {
  initialLoadComplete.value = true;
}
