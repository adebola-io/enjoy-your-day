import { ViewLike, type ViewLikeProps } from '../view-like';
import classes from './stack-layer-view.module.css';

export function StackLayerView(props: ViewLikeProps) {
  return <ViewLike {...props} class={[classes.stackLayerView, props.class]} />;
}
