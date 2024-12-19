import { BottomDrawer } from '#/components/bottom-drawer';
import { If } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import { Cell } from '@adbl/cells';
import classes from './confirm-drawer.module.css';

export function ConfirmDrawer() {
  const router = useRouter();
  const route = router.getCurrentRoute();
  const drawerClosable = Cell.source(true);
  const confirmDrawerIsOpen = Cell.derived(() => {
    return route.value.query.has('confirm');
  });

  const handleDrawerClose = async () => {
    const searchParams = new URLSearchParams(route.value.query);
    searchParams.delete('confirm');
    await router.navigate(`/home?${searchParams}`);
  };

  return (
    <BottomDrawer
      class={classes.container}
      open={confirmDrawerIsOpen}
      closable={drawerClosable}
      onClose={handleDrawerClose}
      rootContainerSelector="#autoSelectionView"
    >
      {If(confirmDrawerIsOpen, () => {
        return <div>Hello</div>;
      })}
    </BottomDrawer>
  );
}
