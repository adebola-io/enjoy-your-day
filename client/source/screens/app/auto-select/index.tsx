import { BackButton } from '#/components/back-button';
import RecommendedGoals from '#/fragments/recommended-goals';
import AutoSelectionPending from '#/fragments/auto-selection-pending';
import { getResourceState, setMetaThemeColor } from '#/library/utils';
import { Cell } from '@adbl/cells';
import { Switch } from '@adbl/unfinished';
import classes from './auto-select.module.css';
import { getAutoRecommendations } from '#/data/db';

export default function AutoSelect() {
  const resource = Cell.async(getAutoRecommendations);
  const state = getResourceState(resource);
  resource.run();
  setMetaThemeColor('#0e0e1f');

  return (
    <div class={classes.autoSelectionView} data-state={state}>
      <BackButton class={classes.backButton} />
      {Switch(state, {
        pending: AutoSelectionPending,
        error: () => <div>Error, {resource.error.value?.message}</div>,
        success: () => <RecommendedGoals goals={resource.data.value} />,
      })}
    </div>
  );
}
