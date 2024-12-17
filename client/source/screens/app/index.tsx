import { appLoadingState } from '#/data/state';
import { useRouter } from '@adbl/unfinished/router';
import classes from './app.module.css';

export default async function App() {
  const router = useRouter();
  if (appLoadingState.value !== 'done') {
    await router.replace('/onboarding/enter-name');
    return;
  }

  return <router.Outlet class={classes.appOutlet} />;
}
