import { Button } from '#/components/button';
import { GoalCard } from '#/components/goal-card';
import { StackLayerView } from '#/components/stack-layer-view';
import { initScrollTimeline } from '#/library/utils';
import { If, useObserver } from '@adbl/unfinished';
import type { GoalProps } from '#/data/entities';
import { Cell, type SourceCell } from '@adbl/cells';
import { For } from '@adbl/unfinished';
import { InlinedIcon } from '#/components/inlined-icon';
import { DoubleCheckIcon } from '#/components/icons/double-check';
import { CSS_VARS } from '#/styles/variables';
import { PencilIcon } from '#/components/icons/pencil';
import { BackButton } from '#/components/back-button';
import classes from './goal-cards-layer.module.css';
import { useMatchMedia } from '@adbl/iota/hooks/use-match-media';
import CaretRightIcon from '#/components/icons/caret-right';
import { useRouteQuery } from '@adbl/iota/utils/router';

interface GoalCardsLayerProps {
  goals: SourceCell<GoalProps[] | null>;
}

export default function GoalCardsLayer(props: GoalCardsLayerProps) {
  const goals = props.goals as SourceCell<GoalProps[]>;
  const ulRef = Cell.source<HTMLUListElement | null>(null);
  const observer = useObserver();
  const isLandscape = useMatchMedia('(orientation: landscape)');
  const totalGoals = Cell.derived(() => goals.value.length);
  const isOpen = useRouteQuery('cards-view');
  const ulStyles = { '--total': totalGoals };
  const confirmDrawerHref = '/home?auto-select&cards-view&confirm';
  const editStageHref = '/home?auto-select&cards-view&stage=edit';

  const getStep = () => {
    return innerWidth / 2;
  };

  const goForward = () => {
    if (!ulRef.value) return;
    const nextStep = ulRef.value.scrollLeft + getStep();
    const left = Math.min(nextStep, ulRef.value.scrollWidth);
    ulRef.value.scrollTo({ left, behavior: 'smooth' });
  };

  const goBack = () => {
    if (!ulRef.value) return;
    const previousStep = ulRef.value.scrollLeft - getStep();
    const left = Math.max(previousStep, 0);
    ulRef.value.scrollTo({ left, behavior: 'smooth' });
  };

  observer.onConnected(ulRef, (ul) => {
    ul.scrollTop = ul.scrollHeight;
    const scrollTimelinePolyfilled = initScrollTimeline(ul);
    return () => {
      if (scrollTimelinePolyfilled) {
        ul.getAnimations().at(0)?.finish();
      }
    };
  });

  return (
    <StackLayerView
      open={isOpen}
      class={classes.container}
      content={() => (
        <>
          <BackButton class={classes.backButton} />
          <ul
            id="goalCardsView"
            ref={ulRef}
            class={classes.goalCards}
            style={ulStyles}
          >
            {For(goals, (goal, index) => (
              <GoalCard {...goal} index={index} />
            ))}
            {If(isLandscape, () => (
              <>
                <button
                  type="button"
                  class={classes.previousButton}
                  onClick={goBack}
                >
                  <CaretRightIcon class={classes.previousButtonIcon} />
                </button>
                <button
                  type="button"
                  class={classes.nextButton}
                  onClick={goForward}
                >
                  <CaretRightIcon class={classes.nextButtonIcon} />
                </button>
              </>
            ))}
          </ul>
          <div class={classes.buttonRow}>
            <Button
              class={[classes.btn, classes.perfectBtn]}
              href={confirmDrawerHref}
              rounded
              vibrate
            >
              <InlinedIcon
                Icon={DoubleCheckIcon}
                class={classes.btnIcon}
                title="Submit Goals"
                color={CSS_VARS['--space-cadet-500']}
              />
              Perfect
            </Button>
            <Button
              class={[classes.btn, classes.editBtn]}
              href={editStageHref}
              rounded
              vibrate
            >
              <InlinedIcon
                Icon={PencilIcon}
                class={classes.btnIcon}
                title="Edit Goals"
                color={CSS_VARS['--space-cadet-500']}
              />
              Edit
            </Button>
          </div>
        </>
      )}
    />
  );
}
