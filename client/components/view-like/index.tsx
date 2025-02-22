import { Cell } from '@adbl/cells';
import { If } from '@adbl/unfinished';
import { updatePillPositions } from '../pill-radio-list';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { defer } from '@adbl/iota/utils/misc';

type SectionProps = JSX.IntrinsicElements['section'];

export interface ViewLikeProps extends SectionProps {
  ref?: Cell<HTMLDivElement | null>;
  open?: JSX.ValueOrCell<boolean>;
  content?: () => JSX.Template;
}

export function ViewLike(props: ViewLikeProps) {
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
      await Promise.allSettled(
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
    <section ref={ref} {...rest} inert={isNotOpen} data-is-open={isOpen}>
      {If(contentLoaded, () => (
        <>
          {lazyContent?.()}
          {props.children}
        </>
      ))}
    </section>
  );
}
