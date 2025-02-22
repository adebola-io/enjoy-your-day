import { getAutoRecommendations } from '#/services/database';
import { finalTexts, headings } from '#/data/headings';
import { NoOp } from '#/library/utils';
import { useObserver } from '@adbl/unfinished';
import GoalCardsLayer from './goal-cards-layer';
import { Cell } from '@adbl/cells';
import { Switch } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import { Loader } from '#/components/loader';
import { StackLayerView } from '#/components/stack-layer-view';
import { ViewGroup } from '#/components/view-group';
import { dailyGoals, involvementLevel, selectedCategories } from '#/data/state';
import AutoSelectEditLayer from './auto-select-edit-layer';
import { BackButton } from '#/components/back-button';
import { ConfirmDrawer } from './confirm-drawer';
import classes from './auto-select.module.css';
import { addRouteQuery, useRouteQuery } from '@adbl/iota/utils/router';
import { useResourceState } from '@adbl/iota/hooks/use-resource-state';

export default async function AutoSelectLayer() {
  return (
    <StackLayerView
      class={classes.slide}
      open={useRouteQuery('auto-select')}
      content={AutoSelectSlideContent}
    />
  );
}

function AutoSelectSlideContent() {
  const observer = useObserver();
  const router = useRouter();
  const route = router.getCurrentRoute();
  const currentStage = Cell.derived(() => route.value.query.get('stage'));
  const containerRef = Cell.source<HTMLButtonElement | null>(null);
  const resource = Cell.async(getAutoRecommendations);
  const state = useResourceState(resource);

  if (dailyGoals.value.length > 0) {
    router.replace('/home');
    return;
  }

  observer.onConnected(containerRef, async () => {
    if (currentStage.value === 'edit') {
      resource.data.value = [];
      return;
    }
    await addRouteQuery('cards-view');
    const categories = selectedCategories.value;
    const preferredInvolvementLevel = involvementLevel.value;
    await resource.run({ categories, preferredInvolvementLevel });
  });

  const ErrorOccurred = () => <div>Error, {resource.error.value?.message}</div>;

  const Success = () => (
    <>
      <GoalCardsLayer goals={resource.data} />
      <AutoSelectEditLayer goals={resource.data} />
      <ConfirmDrawer goals={resource.data} />
    </>
  );

  return (
    <ViewGroup ref={containerRef}>
      {Switch(state, {
        inert: NoOp,
        pending: Pending,
        error: ErrorOccurred,
        success: Success,
      })}
    </ViewGroup>
  );
}

function Pending() {
  const headingIndex = Cell.source(0);
  const headingSetIndex = Math.floor(Math.random() * headings.length);
  const headingSet = headings[headingSetIndex].concat(finalTexts);
  const heading = Cell.derived(() => headingSet[headingIndex.value]);
  const changeHeading = () => headingIndex.value++;

  return (
    <div class={classes.pendingContainer}>
      <BackButton class={classes.backButton} />
      <Loader class={classes.autoSelectionLoader} />
      <h2 class={classes.heading} onAnimationIteration={changeHeading}>
        {heading}
      </h2>
    </div>
  );
}
