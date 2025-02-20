import BinIcon from '#/components/icons/bin';
import DownloadIcon from '#/components/icons/download';
import InfoIcon from '#/components/icons/info';
import ShareIcon from '#/components/icons/share';
import StackIcon from '#/components/icons/stack';
import { SettingsItem, SettingsItemList } from '#/components/settings-item';
import { StackLayerView } from '#/components/stack-layer-view';
import { LATEST_DATA_CHUNK } from '#/data/constants';
import { lastLoadedChunk } from '#/data/state';
import { Cell } from '@adbl/cells';
import { addRouteQuery, useRouteQuery } from '@adbl/iota/utils/router';

export default function DataSettingsLayer() {
  const goalsUpdated = Cell.source(lastLoadedChunk.value === LATEST_DATA_CHUNK);
  const updateGoalsDescription = Cell.derived(() => {
    if (goalsUpdated.value) return 'You have the latest goals.';
    return 'Update the list of supported goals.';
  });

  const openDataExport = () => {
    addRouteQuery('level-two', 'export');
  };

  const updateGoals = () => {
    //
  };
  return (
    <StackLayerView
      open={useRouteQuery('level-one', 'data')}
      content={() => (
        <SettingsItemList subList heading="Data">
          <SettingsItem
            type="button"
            title="Export Data"
            description="Export your data to a supported format."
            onClick={openDataExport}
            Icon={ShareIcon}
          />
          <SettingsItem
            link="/settings?level-one=notifications"
            title="Load Data"
            description="Import data from a supported format."
            Icon={DownloadIcon}
          />
          <SettingsItem
            link="/settings?level-one=data"
            title="Reset"
            description="Reset all data to its default, empty state."
            Icon={BinIcon}
          />
          <SettingsItem
            link="/about?level-one=about"
            title="About"
            description="Learn more about this app."
            Icon={InfoIcon}
          />
          <SettingsItem
            type="button"
            title="Update Goals"
            description={updateGoalsDescription}
            disabled={goalsUpdated}
            onClick={updateGoals}
            Icon={StackIcon}
          />
        </SettingsItemList>
      )}
    />
  );
}
