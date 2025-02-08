import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './progress-bar.module.css';

type DivProps = JSX.IntrinsicElements['div'];
interface ProgressBarProps extends DivProps {
  percent: JSX.ValueOrCell<JSX.Numberish>;
  color: JSX.ValueOrCell<string>;
}

export function ProgressBar(props: ProgressBarProps) {
  const { percent, color, ...rest } = props;
  const progressBarStyles = {
    '--progress-percent': percent,
    '--progress-color': color,
  };
  return (
    <div
      {...rest}
      class={[classes.container, rest.class]}
      style={progressBarStyles}
    />
  );
}
