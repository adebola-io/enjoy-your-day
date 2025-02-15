import { Cell } from '@adbl/cells';
import { For, useObserver } from '@adbl/unfinished';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './fluid-list.module.css';
import { deriveProp, defer } from '#/library/utils';

type UlListProps = Omit<JSX.IntrinsicElements['ul'], 'style'>;
/**
 *  Props passed to the `Template` component rendered for each item in the `FluidList`.
 */
export interface ListTemplateProps<T> {
  /**
   * The data for the current item being rendered in the list.
   */
  item: T;
  /**
   * A `Cell` containing the current index of the item in the list.  Because this is a `Cell`, it automatically updates when the list order changes, allowing for dynamic styling or calculations based on the item's position.
   */
  index: Cell<number>;
  /**
   * A `Cell` containing the old index of the item in the list, before it started animating.  Once animations end, it will be
   * equal to `index`.
   */
  previousIndex: Cell<number>;
  /**
   * A `Cell` containing the entire array of items in the list. Useful if the template needs to access other items in the list or perform calculations based on the entire data set.
   */
  list: Cell<T[]>;
}

/**
 * Configuration options for the `FluidList` component.
 * @typeParam U - The type of the data contained within each item in the list.
 */
export interface FluidListProps<U> extends UlListProps {
  /**
   * A `Cell` that will hold a reference to the `HTMLUListElement` representing the list, allowing direct manipulation of the list element via the DOM API.
   */
  ref?: Cell<HTMLUListElement | null>;
  /**
   * CSS styles to be applied directly to the `<ul>` element.  Styles defined here override the default styles provided by the `FluidList` component.  Use this to customize the appearance of the list container.
   */
  style?: JSX.StyleValue;
  /**
   * The direction in which the list items are arranged.  Can be either `'block'` (horizontal) or `'inline'` (vertical).  This property influences the layout and sizing of the list items.
   *
   * @defaultValue `'block'`
   */
  direction?: JSX.ValueOrCell<'block' | 'inline'>;
  /**
   * A string representing the delay applied to the transition of each list item, creating a staggered animation effect.  The delay is applied sequentially to each item in the list.
   *
   * @defaultValue `'0ms'`
   */
  staggeredDelay?: JSX.ValueOrCell<string>;
  /**
   * A `Cell` containing the array of data items to be rendered in the list. The `FluidList` component observes this `Cell` and automatically updates the list when the array changes.
   */
  items: Cell<U[]>;
  /**
   * A string representing the fixed height of each list item. If not provided, the height will be determined by the content of the item.  This value should include a CSS unit (e.g., `'50px'`, `'2em'`, `'10vh'`).
   */
  itemHeight?: JSX.ValueOrCell<string>;
  /**
   * A string representing the fixed width of each list item. If not provided, the width will be determined by the content of the item.  This value should include a CSS unit (e.g., `'100px'`, `'5em'`, `'20vw'`).
   */
  itemWidth?: JSX.ValueOrCell<string>;
  /**
   * A string representing the duration of the transition applied when the list items change size or position.  This value should include a CSS time unit (e.g., `'0.2s'`, `'500ms'`).
   *
   * @defaultValue `'0.2s'`
   */
  speed?: JSX.ValueOrCell<string>;
  /**
   * A string representing the easing function applied to the transition of list items.
   *
   * @defaultValue `'ease'`
   */
  easing?: JSX.ValueOrCell<string>;
  /**
   * A string representing the gap between list items.  This value should include a CSS unit (e.g., `'10px'`, `'0.5em'`, `'2vh'`).
   *
   * @defaultValue `'0px'`
   */
  gap?: JSX.ValueOrCell<string>;
  /**
   *  The key of the `U` type to use as a marker for each rendered item.
   *  @remarks
   *  If `U` is not an object type, this parameter is `never` and should not be provided.
   *
   * @example
   * ```tsx
   * interface MyItem {
   *   id: number;
   *   name: string;
   * }
   *
   * const myItems = Cell.source<MyItem[]>([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
   *
   * <FluidList items={myItems} itemKey="id" Template={MyItemTemplate} />
   * ```
   */
  itemKey?: U extends object ? keyof U : never;
  /**
   * A boolean indicating whether the list items should animate their size (width and height) during transitions.  If `true`, the items will smoothly transition to their new size when the data changes.  If `false`, the size will change immediately.
   *
   * @defaultValue `false`
   */
  animateSizing?: JSX.ValueOrCell<boolean>;
  /**
   * A boolean indicating whether the list height and width should not be allowed to glitch during transitions. It requires reading and "freezing" the size of the list during transitions that do not change the overall number of items.
   *
   * @defaultValue `false`
   */
  preserveSizing?: JSX.ValueOrCell<boolean>;
  /**
   * A function that returns a JSX template to render for each item in the list. This function receives an object with the `item`, `index`, and `list` properties. Use this template to define the visual representation of each list item.
   *
   * @param props - An object containing the item data, its index, and the entire list.
   * @returns A JSX template to render for the list item.
   *
   * @example
   * ```tsx
   * function MyItemTemplate({ item, index, list }: ListTemplateProps<MyItem>) {
   *   return (
   *     <div>
   *       <h2>{item.name}</h2>
   *       <p>Index: {index.value}</p>
   *     </div>
   *   );
   * }
   *
   * <FluidList items={myItems} Template={MyItemTemplate} />
   * ```
   */
  Template: (props: ListTemplateProps<U>) => JSX.Template;
  /**
   * The maximum number of horizontal columns the list can have before wrapping
   * to the next row.
   *
   * **NOTE: This will only take effect when the `direction` is set to `'inline'`.**
   */
  maxColumns?: JSX.ValueOrCell<number>;
  /**
   * The maximum number of vertical rows the list can have before wrapping
   * to the next column.
   *
   * **NOTE: This will only take effect when the `direction` is set to `'block'`.**
   */
  maxRows?: JSX.ValueOrCell<number>;
}

/**
 * A list with support for dynamic sizing, staggered animations, and flexible layouts.
 *
 * @param props - The configuration options for the `FluidList` component. See {@link FluidListProps}.
 * @typeParam T - The type of the data contained within each item in the list.
 * @returns A JSX element representing the `FluidList` component.
 *
 * @example
 * ```tsx
 * import { Cell } from '@adbl/cells';
 * import { FluidList, ListTemplateProps } from './FluidList'; // Adjust path as needed
 *
 * interface MyItem {
 *   id: number;
 *   name: string;
 * }
 *
 * const myItems = Cell.source<MyItem[]>([
 *   { id: 1, name: 'Item 1' },
 *   { id: 2, name: 'Item 2' },
 *   { id: 3, name: 'Item 3' },
 * ]);
 *
 * function MyItemTemplate({ item, index, list }: ListTemplateProps<MyItem>) {
 *   return (
 *     <div>
 *       <h2>{item.name}</h2>
 *       <p>Index: {index.value}</p>
 *     </div>
 *   );
 * }
 *
 * function MyComponent() {
 *   return (
 *     <FluidList
 *       items={myItems}
 *       itemKey="id"
 *       itemHeight="100px"
 *       gap="5px"
 *       direction="inline"
 *       Template={MyItemTemplate}
 *     />
 *   );
 * }
 * ```
 */
export function FluidList<Item>(props: FluidListProps<Item>) {
  const {
    ref = Cell.source(null),
    items,
    itemKey,
    itemHeight: itemHeightProp,
    itemWidth: itemWidthProp,
    direction: directionProp = 'block',
    animateSizing: animateSizingProp,
    preserveSizing: preserveProp,
    maxColumns: maxColumnsProp,
    maxRows: maxRowsProp,
    staggeredDelay = '0ms',
    speed = '0.2s',
    easing = 'ease',
    gap = '0px',
    Template,
    ...rest
  } = props;

  const observer = useObserver();
  const direction = deriveProp(directionProp);
  const itemWidth = deriveProp(itemWidthProp);
  const itemHeight = deriveProp(itemHeightProp);
  const animateSizing = deriveProp(animateSizingProp);
  const preserveSizing = deriveProp(preserveProp);
  const maxCols = deriveProp(maxColumnsProp);
  const maxRows = deriveProp(maxRowsProp);

  const directionClass = Cell.derived(() => classes[direction.value]);
  const len = Cell.derived(() => items.value.length);

  const rows = Cell.derived(() =>
    direction.value === 'inline'
      ? maxCols.value
        ? Math.max(Math.ceil(len.value / maxCols.value), 1)
        : 1
      : maxRows.value
      ? Math.min(maxRows.value, len.value)
      : Math.max(len.value, 1)
  );
  const previousRows = Cell.source(rows.value);

  const cols = Cell.derived(() =>
    direction.value === 'block'
      ? maxRows.value
        ? Math.max(Math.ceil(len.value / maxRows.value), 1)
        : 1
      : maxCols.value
      ? Math.min(maxCols.value, len.value)
      : Math.max(len.value, 1)
  );
  const previousCols = Cell.source(cols.value);

  const gridTemplateColumns = Cell.derived(
    () => `repeat(${cols.value}, ${itemWidth.value ?? 'min-content'})`
  );

  const gridTemplateRows = Cell.derived(
    () => `repeat(${rows.value}, ${itemHeight.value ?? 'min-content'})`
  );

  const height = Cell.derived(() => {
    if (!itemHeight.value) return '100%';
    const itemsTotalHeight = `(${rows.value} * ${itemHeight.value})`;
    const gaps = `(var(--gap) * ${rows.value - 1})`;
    return `calc(${itemsTotalHeight} + ${gaps})`;
  });

  const width = Cell.derived(() => {
    if (!itemWidth.value) return '100%';
    const itemsTotalWidth = `${cols.value} * ${itemWidth.value}`;
    const gaps = `(var(--gap) * ${cols.value - 1})`;
    return `calc(${itemsTotalWidth} + ${gaps})`;
  });

  const listTransitionProperty = Cell.derived(() =>
    animateSizing.value ? 'width, height' : 'none'
  );

  const itemTransitionProperty = Cell.derived(() =>
    animateSizing.value ? 'width, height, translate' : 'translate'
  );

  const ulStyles: JSX.StyleValue = {
    '--gap': gap,
    '--list-change-duration': speed,
    '--list-change-easing': easing,
    '--list-item-height': itemHeight,
    '--list-item-width': itemWidth,
    '--list-item-transition-property': itemTransitionProperty,
    '--list-item-transition-delay': staggeredDelay,
    '--list-transition-property': listTransitionProperty,
    '--rows': rows,
    '--prev-rows': previousRows,
    '--cols': cols,
    '--prev-cols': previousCols,

    height,
    width,
    gridTemplateRows,
    gridTemplateColumns,
    transitionDuration: 'var(--list-change-duration)',
    transitionTimingFunction: 'var(--list-change-easing)',
  };

  const ItemRenderer = (item: Item, idx: Cell<number>) => {
    const previousIdx = Cell.source(idx.value);
    const liRef = Cell.source<HTMLLIElement | null>(null);
    const styles: JSX.StyleValue = { '--prev': previousIdx, '--curr': idx };

    idx.listen((newIndex) => {
      defer(async () => {
        if (!liRef.value) return;
        const li = liRef.value;
        const animation = li.getAnimations();
        await Promise.allSettled(animation.map((a) => a.finished));
        previousIdx.value = newIndex;
      });
    });

    return (
      <li ref={liRef} class={classes.dynamicListItem} style={styles}>
        <Template
          item={item}
          index={idx}
          list={items}
          previousIndex={previousIdx}
        />
      </li>
    );
  };

  const waitForAnimations = async () => {
    if (!ref.value) return;
    const ul = ref.value;
    const animations = ul.getAnimations();
    for (const child of ul.children) {
      animations.push(...child.getAnimations());
    }
    await Promise.allSettled(animations.map((a) => a.finished));
  };

  let previousItemCount = len.value;
  const handleItemsUpdate = (newItems: Item[]) => {
    if (!ref.value) return;
    if (previousItemCount === 0) {
      previousItemCount = newItems.length;
      return;
    }

    const ul = ref.value;
    const shouldPreserveDimensions =
      preserveSizing.value && newItems.length === previousItemCount;

    // Prevents the width and height of the list from glitching
    // during the animation as the list items change the grid areas.
    if (shouldPreserveDimensions) {
      const rect = ul.getBoundingClientRect();
      ul.style.width = `${rect.width}px`;
      ul.style.height = `${rect.height}px`;
    }

    ref.value.classList.add(classes.animated);
    waitForAnimations().then(() => {
      ref.value?.classList.remove(classes.animated);

      if (shouldPreserveDimensions) {
        ul.style.width = width.value;
        ul.style.height = height.value;
      } else {
        previousItemCount = newItems.length;
      }
    });
  };

  rows.listen(async (colCount) => {
    await waitForAnimations();
    previousRows.value = colCount;
  });

  cols.listen(async (colCount) => {
    await waitForAnimations();
    previousCols.value = colCount;
  });

  if (rest.style) Object.assign(ulStyles, rest.style);
  observer.onConnected(ref, () => {
    items.listen(handleItemsUpdate);
    return () => items.ignore(handleItemsUpdate);
  });

  return (
    <ul
      {...rest}
      ref={ref}
      class={[classes.dynamicList, directionClass, rest.class]}
      style={ulStyles}
    >
      {For(items, ItemRenderer, { key: itemKey })}
    </ul>
  );
}
