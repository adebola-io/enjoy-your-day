import { getAutoRecommendations } from '#/services/database';
import { finalTexts, headings } from '#/data/headings';
import {
  addRouteQuery,
  getResourceState,
  NoOp,
  useRouteQuery,
} from '#/library/utils';
import { useObserver } from '@adbl/unfinished';
import GoalCardsSlideView from './goal-cards-layer';
import { Cell } from '@adbl/cells';
import { Switch } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import { Loader } from '#/components/loader';
import { ViewLayer, ViewLayerGroup } from '#/components/view-layer';
import { involvementLevel, selectedCategories } from '#/data/state';
import AutoSelectEditLayer from './auto-select-edit-layer';
import { BackButton } from '#/components/back-button';
import { ConfirmDrawer } from './confirm-drawer';
import classes from './auto-select.module.css';

export default function AutoSelectLayer() {
  return (
    <ViewLayer
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
  const state = getResourceState(resource);

  observer.onConnected(containerRef, async () => {
    if (currentStage.value != 'edit') {
      await addRouteQuery('cards-view');
      await resource.run({
        categories: selectedCategories.value,
        preferredInvolvementLevel: involvementLevel.value,
      });
    } else {
      resource.data.value = [];
    }
  });

  return (
    <ViewLayerGroup ref={containerRef}>
      {Switch(state, {
        inert: NoOp,
        pending: Pending,
        error: () => <div>Error, {resource.error.value?.message}</div>,
        success: () => (
          <>
            <GoalCardsSlideView goals={resource.data} />
            <AutoSelectEditLayer goals={resource.data} />
            <ConfirmDrawer goals={resource.data} />
          </>
        ),
      })}
    </ViewLayerGroup>
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
