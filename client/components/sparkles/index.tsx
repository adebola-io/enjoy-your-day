import type { JSX } from '@adbl/unfinished/jsx-runtime';
import SparkleIcon from '../icons/sparkle';
import classes from './sparkles.module.css';

type DivProps = Omit<JSX.IntrinsicElements['div'], 'children'>;
export interface SparkleProps extends DivProps {
  children?: unknown;
}

export function Sparkles(props: SparkleProps) {
  const { children, class: className, ...rest } = props;
  return (
    <div {...rest} class={[classes.container, className]}>
      <SparkleIcon class={classes.sparkleLeft} inert />
      {children}
      <SparkleIcon class={classes.sparkleRight} inert />
    </div>
  );
}
