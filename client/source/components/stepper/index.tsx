import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './stepper.module.css';
import CaretRightIcon from '../icons/caret-right';

type DivProps = Omit<JSX.IntrinsicElements['div'], 'children'>;
export interface StepperProps extends DivProps {
  children?: unknown;
  onBackwards?: () => void;
  onForwards?: () => void;
}

export function Stepper(props: StepperProps) {
  const { onBackwards, onForwards, children, ...rest } = props;
  return (
    <div {...rest} class={[props.class, classes.stepper]}>
      <button class={classes.button} type="button">
        <CaretRightIcon class={classes.icon} />
      </button>
      {props.children}
      <button class={classes.button} type="button">
        <CaretRightIcon class={[classes.icon, classes.buttonRightIcon]} />
      </button>
    </div>
  );
}
