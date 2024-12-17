import { BackButton } from '#/components/back-button';
import { getAutoRecommendations } from '#/data/db';
import RecommendedGoals from '#/fragments/recommended-goals';
import AutoSelectionPending from '#/fragments/auto-selection-pending';
import { getResourceState } from '#/library/utils';
import { Cell } from '@adbl/cells';
import { Switch } from '@adbl/unfinished';
import classes from './auto-select.module.css';

export default function AutoSelect() {
  const resource = Cell.async(getAutoRecommendations);
  const state = getResourceState(resource);
  resource.run();

  return (
    <div
      id="autoSelectionView"
      class={classes.autoSelectionView}
      data-state={state}
    >
      <BackButton class={classes.backButton} />
      {Switch(state, {
        pending: AutoSelectionPending,
        error: () => <div>Error, {resource.error.value?.message}</div>,
        success: () => <RecommendedGoals goals={resource.data} />,
      })}
    </div>
  );
}
