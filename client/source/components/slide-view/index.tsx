import { Cell } from '@adbl/cells';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './slide.module.css';
import { If } from '@adbl/unfinished';
import { defer } from '#/library/utils';

type DivProps = JSX.IntrinsicElements['div'];
interface SlideProps extends DivProps {
  ref?: Cell<HTMLDivElement | null>;
  open: JSX.ValueOrCell<boolean>;
  lazyContent?: () => JSX.Template;
}

export function SlideView(props: SlideProps) {
  const {
    open: isOpenRaw = true,
    ref = Cell.source<HTMLDivElement | null>(null),
    lazyContent,
    ...rest
  } = props;
  const isOpen = Cell.derived(() =>
    Cell.isCell(isOpenRaw) ? isOpenRaw.value : isOpenRaw
  );
  const isNotOpen = Cell.derived(() => !isOpen.value);
  const contentLoaded = Cell.source(isOpen.value);
  const containerRef = Cell.source<HTMLDivElement | null>(null);

  isOpen.listen((slideIsOpen) => {
    if (slideIsOpen) {
      contentLoaded.value = true;
      return;
    }
    defer(async () => {
      if (!containerRef.value) return;
      await Promise.all(
        containerRef.value
          .getAnimations()
          .filter((a) => a instanceof CSSTransition)
          .map((a) => a.finished)
      );
      contentLoaded.value = false;
    });
  });

  return (
    <div
      ref={containerRef}
      {...rest}
      class={[rest.class, classes.slide]}
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

export function SlideViews(props: DivProps) {
  return (
    <div {...props} class={[classes.slideContainer, props.class]}>
      {props.children}
    </div>
  );
}
