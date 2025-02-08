import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './view-group.module.css';

type DivProps = JSX.IntrinsicElements['div'];
export interface ViewGroupProps extends DivProps {}
export function ViewGroup(props: ViewGroupProps) {
  return (
    <div {...props} class={[classes.viewGroup, props.class]}>
      {props.children}
    </div>
  );
}
