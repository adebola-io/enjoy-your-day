import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './sparkles.module.css';
import SparkleIcon from '../icons/sparkle';

type DivProps = Omit<JSX.IntrinsicElements['div'], 'children'>;
export interface SparkleProps extends DivProps {
  children?: unknown;
}

export function Sparkles(props: SparkleProps) {
  const { children, ...rest } = props;
  return (
    <div {...rest} class={[classes.container, props.class]}>
      <SparkleIcon class={classes.sparkleLeft} inert />
      {props.children}
      <SparkleIcon class={classes.sparkleRight} inert />
    </div>
  );
}
