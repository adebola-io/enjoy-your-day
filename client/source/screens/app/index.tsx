import { appLoadingState } from '#/data';
import { useRouter } from '@adbl/unfinished/router';

export default async function App() {
  const router = useRouter();
  if (appLoadingState.value !== 'done') {
    await router.replace('/onboarding/enter-name');
    return;
  }

  return <router.Outlet />;
}
