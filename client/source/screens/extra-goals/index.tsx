import { ImmersiveView } from '#/components/immersive-view';
import { useRouteQuery } from '#/library/utils';
import classes from './extra-goals.module.css';

export default function ExtraGoalsLayer() {
  return (
    <ImmersiveView
      class={classes.container}
      open={useRouteQuery('extra-goals-screen')}
      content={() => <div>Extra Goals Screen</div>}
    />
  );
}
