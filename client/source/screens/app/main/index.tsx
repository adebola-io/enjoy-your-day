import { NavigationBar } from '#/components/navigation-bar';
import { setMetaTheme } from '#/library/utils';
import { useObserver } from '#/library/useObserver';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import type { JSX } from '@adbl/unfinished/jsx-runtime';

export default function Main(): JSX.Template {
  const router = useRouter();
  const outlet = Cell.source<HTMLDivElement | null>(null);
  const observer = useObserver();

  observer.onConnected(outlet, () => {
    setMetaTheme('white');
  });

  return (
    <>
      <router.Outlet ref={outlet} />
      <NavigationBar />
    </>
  );
}
