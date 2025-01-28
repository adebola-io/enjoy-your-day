import { Button } from '#/components/button';
import { GoalCard } from '#/components/goal-card';
import { ViewLayer } from '#/components/view-layer';
import { initScrollTimeline, useRouteQuery } from '#/library/utils';
import { useObserver } from '@adbl/unfinished';
import type { GoalProps } from '#/data/entities';
import { Cell, type SourceCell } from '@adbl/cells';
import { For } from '@adbl/unfinished';
import { InlinedIcon } from '#/components/inlined-icon';
import { DoubleCheckIcon } from '#/components/icons/double-check';
import { CSS_VARS } from '#/styles/variables';
import { PencilIcon } from '#/components/icons/pencil';
import { ElasticView } from '#/components/elastic-view';
import { BackButton } from '#/components/back-button';
import classes from './goal-cards-layer.module.css';

interface GoalCardsLayerProps {
  goals: SourceCell<GoalProps[] | null>;
}

export default function GoalCardsLayer(props: GoalCardsLayerProps) {
  const goals = props.goals as SourceCell<GoalProps[]>;
  const ulRef = Cell.source<HTMLUListElement | null>(null);

  const observer = useObserver();
  const totalGoals = Cell.derived(() => goals.value.length);
  const isOpen = useRouteQuery('cards-view');
  const ulStyles = { '--total': totalGoals };
  const confirmDrawerHref = '/home?auto-select&cards-view&confirm';
  const editStageHref = '/home?auto-select&cards-view&stage=edit';

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
    <ViewLayer
      open={isOpen}
      class={classes.container}
      content={() => (
        <>
          <BackButton class={classes.backButton} />
          <ElasticView
            id="goalCardsView"
            yAxis
            as="ul"
            ref={ulRef}
            class={classes.goalCards}
            style={ulStyles}
          >
            {For(goals, (goal, index) => {
              return <GoalCard {...goal} index={index} />;
            })}
          </ElasticView>
          <div class={classes.buttonRow}>
            <Button
              class={classes.btn}
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
            <Button class={classes.btn} href={editStageHref} rounded vibrate>
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
