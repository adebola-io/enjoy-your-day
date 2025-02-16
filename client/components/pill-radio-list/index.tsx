import type { IconProps } from '../icons/props';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { For, useObserver } from '@adbl/unfinished';
import { Cell, type SourceCell } from '@adbl/cells';
import classes from './pill-radio-list.module.css';

type FieldsetProps = Omit<
  JSX.IntrinsicElements['fieldset'],
  'onChange' | 'style'
>;
interface PillRadioListProps<T> extends FieldsetProps {
  name: string;
  heading: string;
  model: SourceCell<T>;
  items: T[];
  ref?: SourceCell<HTMLFieldSetElement | null>;
  Icon?: (props: IconProps) => JSX.Template;
  Template?: (value: T) => JSX.Template;
  onValueChange?: (value: T) => void;
}

// The trackings of rects in the pill radio lists
// are done on element resize and window resize events. These do
// not account for the fact that the pill radio list may be part of
// an animated context, which would lead to incorrect rect calculations.
//
// To account for this, the position updaters are stored in a semi-global
// array so that parent components can trigger updates externally.
const positionUpdaters: Array<() => void> = [];

export function updatePillPositions() {
  for (const updater of positionUpdaters) updater();
}

export function PillRadioList<T extends string>(props: PillRadioListProps<T>) {
  const {
    heading,
    Icon,
    children,
    items,
    model,
    Template,
    name,
    ref = Cell.source(null),
    ...rest
  } = props;
  const observer = useObserver();
  const selector = 'input[type="radio"]:checked';
  const translateX = Cell.source('0px');
  const scaleX = Cell.source(1);

  const fieldsetStyle = {
    '--total-items': items.length,
    '--selected-item': Cell.derived(() => {
      const index = items.findIndex((item) => item === model.value);
      return index === -1 ? undefined : index;
    }),
    '--highlighter-translate-x': translateX,
    '--highlighter-scale-x': scaleX,
  };

  const handleChange = function (this: HTMLFieldSetElement) {
    const input = this.querySelector<HTMLInputElement>(selector);
    if (!input) return;
    const value = input.value as T;
    if (!value) return;
    model.value = value;
    props.onValueChange?.(value);
    relocateHighlighter(this, input);
  };

  const relocateHighlighter = (
    fieldset: HTMLFieldSetElement,
    input: HTMLInputElement
  ) => {
    const firstLabel = fieldset.querySelector(`.${classes.pillItem}`);
    const firstItemRect = firstLabel?.getBoundingClientRect();
    if (!firstItemRect) return;
    const newRect = input.parentElement?.getBoundingClientRect();
    if (!newRect) return;
    scaleX.value = newRect.width / firstItemRect.width;
    translateX.value = `calc(${newRect.left - firstItemRect.left}px)`;
  };

  observer.onConnected(ref, (fieldset) => {
    const updateHighlighterPosition = () => {
      const checkedInput = fieldset.querySelector<HTMLInputElement>(selector);
      if (!checkedInput) return;
      relocateHighlighter(fieldset, checkedInput);
    };
    positionUpdaters.push(updateHighlighterPosition);
    updateHighlighterPosition();

    const resizeObserver = new ResizeObserver(updateHighlighterPosition);
    window.addEventListener('resize', updateHighlighterPosition);
    resizeObserver.observe(fieldset);
    return () => {
      window.removeEventListener('resize', updateHighlighterPosition);
      resizeObserver.disconnect();
      positionUpdaters.splice(
        positionUpdaters.indexOf(updateHighlighterPosition),
        1
      );
    };
  });

  return (
    <fieldset
      {...rest}
      ref={ref}
      class={[classes.pillRadioList, rest.class]}
      style={fieldsetStyle}
      onChange={handleChange}
    >
      <legend class={classes.pillRadioListHeading}>
        {Icon && <Icon class={classes.listIcon} />}
        <span>{heading}</span>
      </legend>
      <div class={classes.items}>
        {For(items, (item, index) => (
          <label class={classes.pillItem} style={{ '--index': index }}>
            <input
              class={classes.pillItemInput}
              type="radio"
              name={name}
              value={item}
              checked={Cell.derived(() => model.value === item)}
            />
            {Template?.(item) ?? item}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
