import type { JSX } from '@adbl/unfinished/jsx-dev-runtime';
import { useObserver } from '#/library/useObserver';
import { Cell, type SourceCell } from '@adbl/cells';
import classes from './bottom-drawer.module.css';
import { useRouter } from '@adbl/unfinished/router';

type DialogProps = JSX.IntrinsicElements['dialog'];
interface BottomDrawerProps extends DialogProps {
  ref?: SourceCell<HTMLDialogElement | null>;
  visible?: JSX.ValueOrCell<boolean>;
  closable?: JSX.ValueOrCell<boolean>;
  onClose?: () => void;
  onClosePrevented?: () => void;
  rootContainerSelector?: string;
}

export function BottomDrawer(props: BottomDrawerProps) {
  const {
    rootContainerSelector = 'body',
    ref = Cell.source<HTMLDialogElement | null>(null),
    visible,
    closable = Cell.source(true),
    onClosePrevented,
    ...rest
  } = props;
  const observer = useObserver();
  const router = useRouter();

  const drawerIsVisible = Cell.derived(() => {
    return Cell.isCell(visible) ? visible.value : Boolean(visible);
  });
  const isClosable = Cell.derived(() => {
    return Cell.isCell(closable) ? closable.value : Boolean(closable);
  });

  const toggle = (isVisible: boolean) => {
    const dialog = ref.value;
    if (!dialog || !dialog.isConnected) return;
    const shouldOpen = isVisible && !dialog.open;
    if (shouldOpen) dialog.showModal();
    else dialog.close();

    document
      .querySelector(rootContainerSelector)
      ?.toggleAttribute('data-dialog-is-open', isVisible);
  };

  const handleRouteChange = (event: Event) => {
    const customEvent = event as CustomEvent<{ to: string; from: string }>;
    console.log(customEvent);
    // if (!drawerIsVisible.value) return;
    // if (!isClosable.value) {
    //   customEvent.preventDefault();
    //   onClosePrevented?.();
    // }
  };

  const handleOutsideClick = () => {
    if (!isClosable.value) {
      onClosePrevented?.();
      return;
    }
    if (props.onClose) props.onClose();
    else toggle(false);
  };

  const handleCancel = (event: Event) => {
    if (!isClosable.value) {
      event.preventDefault();
      onClosePrevented?.();
      return;
    }
  };

  observer.onConnected(ref, () => {
    toggle(drawerIsVisible.value);
    router.addEventListener('change', handleRouteChange);

    return () => {
      router.removeEventListener('change', handleRouteChange);
    };
  });
  drawerIsVisible.listen(toggle);

  return (
    <dialog
      {...rest}
      ref={ref}
      class={[classes.drawer, props.class]}
      data-open={drawerIsVisible}
      onClick--self={handleOutsideClick}
      onCancel={handleCancel}
    >
      <div class={classes.drawerContent}>{props.children}</div>
    </dialog>
  );
}
