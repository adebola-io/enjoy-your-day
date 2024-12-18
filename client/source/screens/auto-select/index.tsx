import { BackButton } from '#/components/back-button';
import { getAutoRecommendations } from '#/data/db';
import { GoalProps } from '#/data/entities';
import { finalTexts, headings } from '#/data/headings';
import { getResourceState, setMetaTheme } from '#/library/utils';
import { useObserver } from '#/library/useObserver';
import GoalCardList from './goal-cards-view';
import AutoSelectEdit from './auto-select-edit';
import { Cell, SourceCell } from '@adbl/cells';
import { Switch } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import { Loader } from '#/components/loader';
import classes from './auto-select.module.css';

type AutoSelectStage = 'cardList' | 'edit';

export default function AutoSelect() {
  const observer = useObserver();
  const router = useRouter();
  const route = router.getCurrentRoute();
  const currentStage = Cell.derived(() => {
    const stage = route.value.query.get('stage') ?? 'cardList';
    return stage as AutoSelectStage;
  });
  const confirmDrawerIsOpen = Cell.derived(() => {
    return route.value.query.has('confirm');
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
  const Error = () => <div>Error, {resource.error.value?.message}</div>;
  const Success = () => {
    const goals = resource.data as SourceCell<GoalProps[]>;
    return (
      <>
        {Switch(currentStage, {
          cardList: () => <GoalCardList goals={goals} />,
          edit: () => <AutoSelectEdit goals={goals} />,
        })}
        <dialog class={classes.confirmDrawer} open={confirmDrawerIsOpen}>
          Confirming...
        </dialog>
      </>
    );
  };

  observer.onConnected(buttonRef, () => {
    setMetaTheme('#0e0e1f');
    resource.run();

    return () => {
      setMetaTheme('white');
    };
  });

  return (
    <>
      <BackButton ref={buttonRef} class={classes.backButton} />
      {Switch(state, {
        inert: () => <></>,
        pending: Pending,
        error: Error,
        success: Success,
      })}
    </>
  );
}
