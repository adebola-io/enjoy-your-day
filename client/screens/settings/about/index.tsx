import { SettingsItemList } from '#/components/settings-item';
import { StackLayerView } from '#/components/stack-layer-view';
import { useRouteQuery } from '#/library/utils';

export default function AboutLayer() {
  return (
    <StackLayerView
      open={useRouteQuery('level-one', 'about')}
      content={() => (
        <SettingsItemList heading="About" subList>
          <br />
          <p style={{ marginInline: 'var(--side-padding)' }}>
            This page is a work in progress. Please check back later.
          </p>
        </SettingsItemList>
      )}
    />
  );
}
