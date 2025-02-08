import { ViewLike, type ViewLikeProps } from '../view-like';
import classes from './immersive-view.module.css';

export function ImmersiveView(props: ViewLikeProps) {
  return <ViewLike {...props} class={[classes.immersiveView, props.class]} />;
}
