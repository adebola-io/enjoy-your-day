import { appLoadingState } from '#/data';
import { setMetaThemeColor } from '#/library';
import { useRouter } from '@adbl/unfinished/router';

import styles from './MainLayout.module.css';
import { Header } from '#/components/Header';
import { NavigationBar } from '#/components/NavigationBar';

export default async function MainLayout() {
  const router = useRouter();
  setMetaThemeColor('white');

  if (appLoadingState.value !== 'done') {
    await router.replace('/onboarding/enter-name');
    return;
  }

  return (
    <div class={styles.mainLayoutView}>
      <Header />
      <router.Outlet keepAlive />
      <NavigationBar />
    </div>
  );
}
