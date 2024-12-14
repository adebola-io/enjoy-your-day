import { NavigationBar } from '#/components/navigation-bar';
import { setMetaThemeColor } from '#/library/utils';
import { useObserver } from '#/library/useObserver';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './main.module.css';

export default function Main(): JSX.Template {
  const router = useRouter();
  const outlet = Cell.source<HTMLDivElement | null>(null);
  const observer = useObserver();
  const containerClassList = [
    classes.mainLayoutView,
    { [classes.loadedMainLayout]: initialLoadComplete },
  ];

  observer.onConnected(outlet, initMainContainer);

  return (
    <div class={containerClassList}>
      <router.Outlet ref={outlet} keepAlive />
      <NavigationBar />
    </div>
  );
}

const initialLoadComplete = Cell.source(false);
function initMainContainer() {
  initialLoadComplete.value = true;
  setMetaThemeColor('white');
}
