import { Cell } from '@adbl/cells';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { If } from '@adbl/unfinished';
import { defer } from '#/library/utils';
import { updatePillPositions } from '../pill-radio-list';
import classes from './stack-layer-view.module.css';

type DivProps = JSX.IntrinsicElements['div'];
interface StackLayerViewProps extends DivProps {
  ref?: Cell<HTMLDivElement | null>;
  open?: JSX.ValueOrCell<boolean>;
  content?: () => JSX.Template;
}

export function StackLayerView(props: StackLayerViewProps) {
  const {
    open: isOpenRaw = true,
    ref = Cell.source<HTMLDivElement | null>(null),
    content: lazyContent,
    ...rest
  } = props;
  const isOpen = Cell.derived(() =>
    Cell.isCell(isOpenRaw)
      ? isOpenRaw.value
      : isOpenRaw === undefined
      ? true
      : isOpenRaw
  );
  const isNotOpen = Cell.derived(() => !isOpen.value);
  const contentLoaded = Cell.source(isOpen.value);

  const afterLayerTransition = (callback: () => void) => {
    defer(async () => {
      if (!ref.value) return;
      await Promise.all(
        ref.value
          .getAnimations()
          .filter((a) => a instanceof CSSTransition)
          .map((a) => a.finished)
      );

      callback();
    });
  };

  isOpen.listen((slideIsOpen) => {
    if (slideIsOpen) {
      contentLoaded.value = true;
      afterLayerTransition(updatePillPositions);
      return;
    }

    afterLayerTransition(() => {
      contentLoaded.value = false;
      updatePillPositions();
    });
  });

  return (
    <div
      ref={ref}
      {...rest}
      class={[rest.class, classes.stackLayerView]}
      inert={isNotOpen}
      data-is-open={isOpen}
    >
      {If(contentLoaded, () => (
        <>
          {lazyContent?.()}
          {props.children}
        </>
      ))}
    </div>
  );
}
