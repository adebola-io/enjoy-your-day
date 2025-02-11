import { defer } from '#/library/utils';
import { Cell } from '@adbl/cells';
import { For } from '@adbl/unfinished';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './fluid-list.module.css';

type UlListProps = Omit<JSX.IntrinsicElements['ul'], 'style'>;
/**
 *  Props passed to the `Template` component rendered for each item in the `FluidList`.
 */
interface ListTemplateProps<T> {
  /**
   * The data for the current item being rendered in the list.
   */
  item: T;
  /**
   * A `Cell` containing the current index of the item in the list.  Because this is a `Cell`, it automatically updates when the list order changes, allowing for dynamic styling or calculations based on the item's position.
   */
  index: Cell<number>;
  /**
   * A `Cell` containing the entire array of items in the list. Useful if the template needs to access other items in the list or perform calculations based on the entire data set.
   */
  list: Cell<T[]>;
}

/**
 * Configuration options for the `FluidList` component.  This interface defines the properties that control the layout, animation, and rendering of the list items.  It allows for highly customizable and performant lists with dynamic sizing and transitions.
 *
 * @typeParam U - The type of the data contained within each item in the list.
 */
export interface FluidListProps<U> extends UlListProps {
  /**
   * A `Cell` that will hold a reference to the `HTMLUListElement` representing the list. This allows for direct manipulation of the list element via the DOM API, which can be useful for advanced use cases such as triggering animations or measuring layout.
   *
   * @defaultValue `Cell.source(null)`
   *
   * @example
   * ```tsx
   * const listRef = Cell.source<HTMLUListElement | null>(null);
   *
   * <FluidList ref={listRef} items={myItems} Template={MyItemTemplate} />
   *
   * // Later, access the list element:
   * if (listRef.value) {
   *   console.log("List element:", listRef.value);
   * }
   * ```
   */
  ref?: Cell<HTMLUListElement | null>;
  /**
   * CSS styles to be applied directly to the `<ul>` element.  Styles defined here override the default styles provided by the `FluidList` component.  Use this to customize the appearance of the list container.
   */
  style?: JSX.StyleValue;
  /**
   * The direction in which the list items are arranged.  Can be either `'row'` (horizontal) or `'column'` (vertical).  This property influences the layout and sizing of the list items.
   *
   * @defaultValue `'row'`
   *
   * @example
   * ```tsx
   * <FluidList direction="column" items={myItems} Template={MyItemTemplate} />
   * ```
   */
  direction?: JSX.ValueOrCell<'row' | 'column'>;
  /**
   * A string representing the delay applied to the transition of each list item, creating a staggered animation effect.  The delay is applied sequentially to each item in the list.
   *
   * @defaultValue `'0ms'`
   *
   * @example
   * ```tsx
   * <FluidList staggeredDelay="50ms" items={myItems} Template={MyItemTemplate} />
   * ```
   */
  staggeredDelay?: JSX.ValueOrCell<string>;
  /**
   * A `Cell` containing the array of data items to be rendered in the list. The `FluidList` component observes this `Cell` and automatically updates the list when the array changes.
   */
  items: Cell<U[]>;
  /**
   * A string representing the fixed height of each list item. If not provided, the height will be determined by the content of the item.  This value should include a CSS unit (e.g., `'50px'`, `'2em'`, `'10vh'`).
   *
   * @example
   * ```tsx
   * <FluidList itemHeight="50px" items={myItems} Template={MyItemTemplate} />
   * ```
   */
  itemHeight?: JSX.ValueOrCell<string>;
  /**
   * A string representing the fixed width of each list item. If not provided, the width will be determined by the content of the item.  This value should include a CSS unit (e.g., `'100px'`, `'5em'`, `'20vw'`).
   *
   * @example
   * ```tsx
   * <FluidList itemWidth="100px" items={myItems} Template={MyItemTemplate} />
   * ```
   */
  itemWidth?: JSX.ValueOrCell<string>;
  /**
   * A string representing the duration of the transition applied when the list items change size or position.  This value should include a CSS time unit (e.g., `'0.2s'`, `'500ms'`).
   *
   * @defaultValue `'0.2s'`
   *
   * @example
   * ```tsx
   * <FluidList speed="0.5s" items={myItems} Template={MyItemTemplate} />
   * ```
   */
  speed?: JSX.ValueOrCell<string>;
  /**
   * A string representing the easing function applied to the transition of list items.  Common values include `'ease'`, `'linear'`, `'ease-in'`, `'ease-out'`, and `'ease-in-out'`.  You can also use custom cubic-bezier functions.
   *
   * @defaultValue `'ease'`
   *
   * @example
   * ```tsx
   * <FluidList easing="ease-out" items={myItems} Template={MyItemTemplate} />
   * ```
   */
  easing?: JSX.ValueOrCell<string>;
  /**
   * A string representing the gap between list items.  This value should include a CSS unit (e.g., `'10px'`, `'0.5em'`, `'2vh'`).
   *
   * @defaultValue `'0px'`
   *
   * @example
   * ```tsx
   * <FluidList gap="10px" items={myItems} Template={MyItemTemplate} />
   * ```
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
   *
   * @example
   * ```tsx
   * <FluidList animateSizing={true} items={myItems} Template={MyItemTemplate} />
   * ```
   */
  animateSizing?: JSX.ValueOrCell<boolean>;
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
}

/**
 * A customizable list that supports dynamic sizing, staggered animations, and flexible layouts.
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
 *       direction="column"
 *       Template={MyItemTemplate}
 *     />
 *   );
 * }
 * ```
 */
export function FluidList<T>(props: FluidListProps<T>) {
  const {
    ref = Cell.source(null),
    items,
    itemKey,
    itemHeight: itemHeightProp,
    itemWidth: itemWidthProp,
    direction: directionProp = 'row',
    animateSizing,
    staggeredDelay = '0ms',
    speed = '0.2s',
    easing = 'ease',
    gap = '0px',
    Template,
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

  const ItemRenderer = (item: T, idx: Cell<number>) => {
    const previousIdx = Cell.source(idx.value);
    const liRef = Cell.source<HTMLLIElement | null>(null);
    const styles: JSX.StyleValue = {
      '--prev': previousIdx,
      '--curr': idx,
      translate: itemTranslation,
    };

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
        <Template item={item} index={idx} list={items} />
      </li>
    );
  };

  if (rest.style) Object.assign(ulStyles, rest.style);

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
