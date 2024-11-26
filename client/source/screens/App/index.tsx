import { useRouter } from '@adbl/unfinished/router';
import { appLoadingState } from '@/data';
import styles from './App.module.css';
import { NavigationBar } from '@/components/NavigationBar';
import { Header } from '@/components/Header';
import { setMetaThemeColor } from '@/library';

export default async function App() {
  const router = useRouter();
  setMetaThemeColor('white');

  if (appLoadingState.value !== 'done') {
    await router.replace('/onboarding');
    return;
  }

  return (
    <div class={styles.appView}>
      <Header />
      <router.Outlet />

      <NavigationBar />
    </div>
  );
}
