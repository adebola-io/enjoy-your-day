import type { JSX } from '@adbl/unfinished/jsx-dev-runtime';
import { defer } from '#/library/utils';
import { useObserver } from '@adbl/unfinished';
import { Teleport } from '@adbl/unfinished/teleport';
import { Cell, type SourceCell } from '@adbl/cells';
import { type RouteChangeEvent, useRouter } from '@adbl/unfinished/router';
import classes from './bottom-drawer.module.css';
import XIcon from '../icons/x';

type DialogProps = Omit<JSX.IntrinsicElements['div'], 'children'>;
interface BottomDrawerProps extends DialogProps {
  ref?: SourceCell<HTMLDialogElement | null>;
  open?: JSX.ValueOrCell<boolean>;
  closable?: JSX.ValueOrCell<boolean>;
  onClose?: () => void;
  onBeforeClose?: (value: false) => void;
  onClosePrevented?: () => void;
  shrinkTarget?: string;
  children?: unknown;
}

export function BottomDrawer(props: BottomDrawerProps) {
  const {
    open,
    onClose,
    onClosePrevented,
    onBeforeClose,
    class: className,
    children,
    shrinkTarget = 'body',
    closable = Cell.source(true),
    ref = Cell.source<HTMLDialogElement | null>(null),
    ...rest
  } = props;
  const observer = useObserver();
  const router = useRouter();

  const isOpen = Cell.derived(() =>
    Cell.isCell(open) ? open.value : Boolean(open)
  );
  const isClosed = Cell.derived(() => !isOpen.value);
  const isClosable = Cell.derived(() =>
    Cell.isCell(closable) ? closable.value : Boolean(closable)
  );

  const toggle = async (isOpen: boolean) => {
    const dialog = ref.value;
    if (!dialog || !dialog.isConnected) return;
    const shouldOpen = isOpen && !dialog.open;
    const shrinkTargets = document.querySelectorAll<HTMLElement>(shrinkTarget);
    for (const element of shrinkTargets) {
      element.toggleAttribute('data-dialog-is-open', isOpen);
    }
    const dialogContent = dialog.firstElementChild as HTMLElement;
    if (shouldOpen) {
      dialog.showModal();
      dialogContent.scrollIntoView();
    } else if (dialog.open && isClosable.value) {
      // Explicitly remove the open attribute to prevent
      // z-index and top layering issues.
      dialog.removeAttribute('data-open');
      onBeforeClose?.(false);
      await Promise.all(dialogContent.getAnimations().map((a) => a.finished));
      dialog.close();
    }
  };

  const handleRouteChange = (event: RouteChangeEvent) => {
    if (!isOpen.value || isClosable.value || !ref.value?.open) return;
    event.preventDefault();
    onClosePrevented?.();
    window.history.pushState(null, '', event.detail.from);
  };

  const handleOutsideClick = () => {
    if (!isClosable.value) {
      onClosePrevented?.();
      return;
    }
    toggle(false);
  };

  const handleCancel = (event: Event) => {
    if (isClosable.value) return;
    event.preventDefault();
    onClosePrevented?.();
    return;
  };

  const handleClose = () => {
    onClose?.();
  };

  isOpen.listen(toggle);
  observer.onConnected(ref, () => {
    // Intersection Observer doesn't work on cell values directly
    // because they are proxies.
    const dialog = ref.deproxy();
    const div = dialog.firstElementChild as HTMLDivElement;
    const callback: IntersectionObserverCallback = ([{ isIntersecting }]) => {
      const canClose =
        !isIntersecting &&
        isOpen.value &&
        isClosable.value &&
        div.checkVisibility();
      if (canClose) toggle(false);
    };
    const options = { root: dialog, threshold: 0.3 };
    const intersectObserver = new IntersectionObserver(callback, options);
    defer(() => intersectObserver.observe(div));
    router.addEventListener('routechange', handleRouteChange);
    toggle(isOpen.value);

    return () => {
      router.removeEventListener('routechange', handleRouteChange);
      intersectObserver.disconnect();
    };
  });

  return (
    <Teleport to="body">
      <dialog
        ref={ref}
        class={classes.drawer}
        data-open={isOpen}
        inert={isClosed}
        data-closable={isClosable}
        onClick--self={handleOutsideClick}
        onCancel={handleCancel}
        onClose={handleClose}
      >
        <div {...rest} class={[classes.drawerContent, className]}>
          {children}
        </div>
      </dialog>
    </Teleport>
  );
}
