import { StackLayerView } from '#/components/stack-layer-view';
import { useRouteQuery } from '#/library/utils';

export default function ExtraGoalsLayer() {
  return (
    <StackLayerView
      open={useRouteQuery('extra-goals-screen')}
      content={() => <div>Extra Goals Screen</div>}
    />
  );
}
