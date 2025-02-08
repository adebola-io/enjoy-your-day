import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './stepper.module.css';
import CaretRightIcon from '../icons/caret-right';

type DivProps = Omit<JSX.IntrinsicElements['div'], 'children'>;
export interface StepperProps extends DivProps {
  children?: unknown;
  forwardsEnabled?: JSX.ValueOrCell<boolean>;
  backwardsEnabled?: JSX.ValueOrCell<boolean>;
  onBackwards?: () => void;
  onForwards?: () => void;
}

export function Stepper(props: StepperProps) {
  const {
    children,
    onBackwards,
    onForwards,
    forwardsEnabled = true,
    backwardsEnabled = true,
    class: className,
    ...rest
  } = props;
  return (
    <div
      {...rest}
      class={[classes.stepper, className]}
      data-forwards-enabled={forwardsEnabled}
      data-backwards-enabled={backwardsEnabled}
    >
      <button class={classes.button} type="button" onClick={onBackwards}>
        <CaretRightIcon class={classes.icon} />
      </button>
      {children}
      <button class={classes.button} type="button" onClick={onForwards}>
        <CaretRightIcon class={[classes.icon, classes.buttonRightIcon]} />
      </button>
    </div>
  );
}
