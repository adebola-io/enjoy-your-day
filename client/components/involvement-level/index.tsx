import type { JSX } from '@adbl/unfinished/jsx-runtime';
import type { IconProps } from '#/components/icons/props';
import { involvementLevel } from '#/data/state';
import classes from './involvement-level.module.css';

type LabelProps = JSX.IntrinsicElements['label'];
interface InvolvementLevelProps extends LabelProps {
  value: number;
  title: string;
  description: string;
  color: string;
  checked?: JSX.ValueOrCell<boolean>;
  Icon: (props: IconProps) => JSX.Template;
}

export function InvolvementLevel(props: InvolvementLevelProps) {
  const { title, checked, Icon, description, color, value, ...rest } = props;
  const styles = { '--level-color': color, '--level-value': value };

  const handleCheck = function (this: HTMLInputElement) {
    if (!this.checked) return;
    involvementLevel.value = Number(this.value);
  };

  return (
    <label {...rest} class={classes.involvementLevel} style={styles}>
      <Icon class={classes.icon} />
      <input
        type="radio"
        name="involvementLevel"
        value={value}
        required
        checked={checked}
        onChange={handleCheck}
      />
      <h2 class={classes.title}>{title}</h2>
      <p class={classes.description}>{description}</p>
    </label>
  );
}
