import { IconProps } from '../icons/props';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './pill-radio-list.module.css';
import { InlinedIcon } from '../inlined-icon';
import { CSS_VARS } from '#/styles/variables';
import { For } from '@adbl/unfinished';
import { Cell, type SourceCell } from '@adbl/cells';

type FieldsetProps = JSX.IntrinsicElements['fieldset'];
interface PillRadioListProps<T> extends FieldsetProps {
  Icon?: (props: IconProps) => JSX.Template;
  name: string;
  heading: string;
  model: SourceCell<T>;
  items: T[];
  Template?: (value: T) => JSX.Template;
  onValueChange?: (value: T) => void;
}
export function PillRadioList<T extends string>(props: PillRadioListProps<T>) {
  const { heading, Icon, children, items, model, Template, name, ...rest } =
    props;

  const handleChange = function (this: HTMLFieldSetElement) {
    const selector = 'input[type="radio"]:checked';
    const value = this.querySelector<HTMLInputElement>(selector)?.value as T;
    if (!value) return;
    model.value = value;
    props.onValueChange?.(value);
  };

  return (
    <fieldset
      {...rest}
      class={[classes.pillRadioList, rest.class]}
      onChange={handleChange}
    >
      <legend class={classes.pillRadioListHeading}>
        {Icon && (
          <InlinedIcon
            Icon={Icon}
            color={CSS_VARS['--space-cadet-500']}
            class={classes.listIcon}
            title="pill list icon"
          />
        )}
        {heading}
      </legend>
      <div class={classes.items}>
        {For(items, (item) => (
          <label class={classes.pillItem}>
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
