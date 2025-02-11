import { Cell } from '@adbl/cells';
import { For } from '@adbl/unfinished';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './fluid-list.module.css';

type UlListProps = Omit<JSX.IntrinsicElements['ul'], 'style'>;
interface ListTemplateProps<T> {
  item: T;
  index: Cell<number>;
  list: Cell<T[]>;
}

interface FluidListProps<U> extends UlListProps {
  ref?: Cell<HTMLUListElement | null>;
  style?: JSX.StyleValue;
  direction?: JSX.ValueOrCell<'row' | 'column'>;
  staggeredDelay?: JSX.ValueOrCell<string>;
  items: Cell<U[]>;
  itemHeight?: JSX.ValueOrCell<string>;
  itemWidth?: JSX.ValueOrCell<string>;
  speed?: JSX.ValueOrCell<string>;
  easing?: JSX.ValueOrCell<string>;
  gap?: JSX.ValueOrCell<string>;
  itemKey?: U extends object ? keyof U : never;
  animateSizing?: JSX.ValueOrCell<boolean>;
  Template: (props: ListTemplateProps<U>) => JSX.Template;
}
export function FluidList<T>(props: FluidListProps<T>) {
  const {
    ref = Cell.source(null),
    items,
    itemKey,
    itemHeight: itemHeightProp,
    itemWidth: itemWidthProp,
    Template,
    direction: directionProp = 'row',
    staggeredDelay = '0ms',
    speed,
    easing,
    gap = '0px',
    animateSizing,
    ...rest
  } = props;

  const direction = Cell.derived(() => {
    return Cell.isCell(directionProp) ? directionProp.value : directionProp;
  });
  const itemWidth = Cell.derived(() => {
    return Cell.isCell(itemWidthProp) ? itemWidthProp.value : itemWidthProp;
  });
  const itemHeight = Cell.derived(() => {
    return Cell.isCell(itemHeightProp) ? itemHeightProp.value : itemHeightProp;
  });
  const shouldAnimateSizing = Cell.derived(() => {
    return Cell.isCell(animateSizing) ? animateSizing.value : animateSizing;
  });

  const directionClass = Cell.derived(() => {
    return direction.value === 'column' ? classes.column : classes.row;
  });

  const itemTranslation = Cell.derived(() => {
    const translation = 'calc(var(--curr) * (100% + var(--gap)))';
    return direction.value === 'column' ? translation : `0 ${translation}`;
  });

  const gridTemplateColumns = Cell.derived(() => {
    const width = itemWidth.value ?? 'min-content';
    return direction.value === 'column'
      ? `repeat(${items.value.length}, ${width})`
      : 'initial';
  });

  const gridTemplateRows = Cell.derived(() => {
    const height = itemHeight.value ?? 'min-content';
    return direction.value === 'column'
      ? 'initial'
      : `repeat(${items.value.length}, ${height})`;
  });

  const listHeight = Cell.derived(() => {
    if (!itemHeight.value) return '100%';
    if (direction.value === 'column') return itemHeight.value;
    const count = items.value.length;
    return `calc(${count} * ${itemHeight.value} + (var(--gap) * ${count - 1}))`;
  });

  const listWidth = Cell.derived(() => {
    if (!itemWidth.value) return '100%';
    if (direction.value === 'row') return itemWidth.value;
    const count = items.value.length;
    return `calc(${count} * ${itemWidth.value} + (var(--gap) * ${count - 1}))`;
  });

  const listTransitionProperty = Cell.derived(() => {
    return shouldAnimateSizing.value ? 'width, height' : 'none';
  });
  const itemTransitionProperty = Cell.derived(() => {
    return shouldAnimateSizing.value ? 'width, height, translate' : 'translate';
  });

  const ulStyles: JSX.StyleValue = {
    '--gap': gap,
    '--list-change-duration': speed,
    '--list-change-easing': easing,
    '--list-item-height': itemHeight,
    '--list-item-width': itemWidth,
    '--list-item-transition-property': itemTransitionProperty,
    '--list-item-transition-delay': staggeredDelay,

    height: listHeight,
    width: listWidth,
    gridTemplateRows,
    gridTemplateColumns,
    transitionProperty: listTransitionProperty,
    transitionDuration: 'var(--list-change-duration)',
    transitionTimingFunction: 'var(--list-change-easing)',
  };

  if (rest.style) Object.assign(ulStyles, rest.style);

  return (
    <ul
      {...rest}
      ref={ref}
      class={[classes.dynamicList, directionClass, rest.class]}
      style={ulStyles}
    >
      {For(
        items,
        (item, idx) => {
          const previousIdx = Cell.source(idx.value);
          const liRef = Cell.source<HTMLLIElement | null>(null);
          const styles: JSX.StyleValue = {
            '--prev': previousIdx,
            '--curr': idx,
            translate: itemTranslation,
          };

          idx.listen((newIndex) => {
            if (!liRef.value) return;
            const li = liRef.value;
            setTimeout(async () => {
              const animation = li.getAnimations();
              await Promise.allSettled(animation.map((a) => a.finished));
              previousIdx.value = newIndex;
            }, 0);
          });

          return (
            <li ref={liRef} class={classes.dynamicListItem} style={styles}>
              <Template item={item} index={idx} list={items} />
            </li>
          );
        },
        { key: itemKey }
      )}
    </ul>
  );
}
