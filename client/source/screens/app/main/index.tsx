import { NavigationBar } from '#/components/navigation-bar';
import { setMetaThemeColor } from '#/library';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './main.module.css';

export default function Main(): JSX.Template {
  const router = useRouter();
  setMetaThemeColor('white');

  return (
    <div
      class={[
        classes.mainLayoutView,
        { [classes.rootViewTransition]: initialLoadComplete },
      ]}
    >
      <router.Outlet keepAlive onAnimationStart={addViewTransition} />
      <NavigationBar />
    </div>
  );
}

const initialLoadComplete = Cell.source(false);
function addViewTransition() {
  initialLoadComplete.value = true;
}
