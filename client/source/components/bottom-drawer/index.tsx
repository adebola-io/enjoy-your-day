import type { JSX } from '@adbl/unfinished/jsx-dev-runtime';
import { useObserver } from '#/library/useObserver';
import { Cell, type SourceCell } from '@adbl/cells';
import { type RouteChangeEvent, useRouter } from '@adbl/unfinished/router';
import classes from './bottom-drawer.module.css';

type DialogProps = JSX.IntrinsicElements['div'];
interface BottomDrawerProps extends DialogProps {
  ref?: SourceCell<HTMLDialogElement | null>;
  open?: JSX.ValueOrCell<boolean>;
  closable?: JSX.ValueOrCell<boolean>;
  onClose?: () => void;
  onClosePrevented?: () => void;
  rootContainerSelector?: string;
}

export function BottomDrawer(props: BottomDrawerProps) {
  const {
    rootContainerSelector = 'body',
    ref = Cell.source<HTMLDialogElement | null>(null),
    open,
    closable = Cell.source(true),
    onClose,
    onClosePrevented,
    ...rest
  } = props;
  const observer = useObserver();
  const router = useRouter();

  const isOpen = Cell.derived(() => {
    return Cell.isCell(open) ? open.value : Boolean(open);
  });
  const isClosable = Cell.derived(() => {
    return Cell.isCell(closable) ? closable.value : Boolean(closable);
  });

  const toggle = (isOpen: boolean) => {
    const dialog = ref.value;
    if (!dialog || !dialog.isConnected) return;
    const shouldOpen = isOpen && !dialog.open;
    if (shouldOpen) dialog.showModal();
    else dialog.close();
    document
      .querySelector(rootContainerSelector)
      ?.toggleAttribute('data-dialog-is-open', isOpen);
  };

  const handleRouteChange = (event: RouteChangeEvent) => {
    if (!isOpen.value || isClosable.value) return;
    event.preventDefault();
    onClosePrevented?.();
    window.history.pushState(null, '', event.detail.from);
  };

  const handleOutsideClick = () => {
    if (!isClosable.value) {
      onClosePrevented?.();
      return;
    }
    if (onClose) onClose();
    else toggle(false);
  };

  const handleCancel = (event: Event) => {
    if (isClosable.value) return;
    event.preventDefault();
    onClosePrevented?.();
    return;
  };

  isOpen.listen(toggle);
  observer.onConnected(ref, () => {
    // Intersection Observer doesn't work on cell values directly
    // because they are proxies.
    const dialog = ref.deproxy();
    const div = dialog.firstElementChild as HTMLDivElement;

    const callback = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
      const canClose = !isIntersecting && isOpen.value && isClosable.value;
      if (canClose) {
        if (onClose) onClose();
        else toggle(false);
      }
    };
    const options = { root: dialog, threshold: 0.3 };
    const intersectObserver = new IntersectionObserver(callback, options);
    intersectObserver.observe(div);

    router.addEventListener('routechange', handleRouteChange);
    toggle(isOpen.value);

    return () => {
      router.removeEventListener('routechange', handleRouteChange);
      intersectObserver.disconnect();
    };
  });

  return (
    <dialog
      ref={ref}
      class={classes.drawer}
      data-open={isOpen}
      data-closable={isClosable}
      onClick--self={handleOutsideClick}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <div {...rest} class={classes.drawerContent}>
        {props.children}
      </div>
    </dialog>
  );
}
