import { useRouter } from '@adbl/unfinished/router';

export default async function App() {
  const router = useRouter();

  return <router.Outlet />;
}
