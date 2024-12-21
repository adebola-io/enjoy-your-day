import { BackButton } from '#/components/back-button';
import { getAutoRecommendations } from '#/data/db';
import type { GoalProps } from '#/data/entities';
import { finalTexts, headings } from '#/data/headings';
import {
  getResourceState,
  NoOp,
  setAutoSelectStage,
  setMetaTheme,
} from '#/library/utils';
import { useObserver } from '@adbl/unfinished';
import GoalCardList from './goal-cards-view';
import AutoSelectEdit from './auto-select-edit';
import { Cell, type SourceCell } from '@adbl/cells';
import { Switch } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import { Loader } from '#/components/loader';
import classes from './auto-select.module.css';
import { ConfirmDrawer } from './confirm-drawer';

type AutoSelectStage = 'cardList' | 'edit';

export default function AutoSelect() {
  const observer = useObserver();
  const router = useRouter();
  const route = router.getCurrentRoute();
  const currentStage = Cell.derived(() => {
    const stage = route.value.query.get('stage') ?? 'cardList';
    return stage as AutoSelectStage;
  });
  const buttonRef = Cell.source<HTMLButtonElement | null>(null);
  const headingIndex = Cell.source(0);
  const headingSetIndex = Math.floor(Math.random() * headings.length);
  const headingSet = headings[headingSetIndex].concat(finalTexts);
  const heading = Cell.derived(() => headingSet[headingIndex.value]);
  const resource = Cell.async(getAutoRecommendations);
  const state = getResourceState(resource);

  const changeHeading = () => headingIndex.value++;

  const Pending = () => (
    <>
      <Loader class={classes.autoSelectionLoader} />
      <h2 class={classes.heading} onAnimationIteration={changeHeading}>
        {heading}
      </h2>
    </>
  );
  const ErrorOccurred = () => <div>Error, {resource.error.value?.message}</div>;
  const Success = () => {
    const goals = resource.data as SourceCell<GoalProps[]>;
    return (
      <>
        {Switch(currentStage, {
          cardList: () => <GoalCardList goals={goals} />,
          edit: () => <AutoSelectEdit goals={goals} />,
        })}
        <ConfirmDrawer goals={goals} />
      </>
    );
  };

  observer.onConnected(buttonRef, () => {
    setMetaTheme('#0e0e1f');
    setAutoSelectStage(1);
    resource.run();
    return () => setMetaTheme('#ffffff');
  });

  return (
    <>
      <BackButton ref={buttonRef} class={classes.backButton} />
      {Switch(state, {
        inert: NoOp,
        pending: Pending,
        error: ErrorOccurred,
        success: Success,
      })}
    </>
  );
}
