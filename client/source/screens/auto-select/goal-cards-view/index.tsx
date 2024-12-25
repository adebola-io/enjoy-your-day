import { Button } from '#/components/button';
import { GoalCard } from '#/components/goal-card';
import {
  initScrollTimeline,
  setAutoSelectStage,
  setMetaTheme,
} from '#/library/utils';
import { useObserver } from '@adbl/unfinished';
import type { GoalProps } from '#/data/entities';
import { Cell, type SourceCell } from '@adbl/cells';
import { For } from '@adbl/unfinished';
import classes from './goals-card-view.module.css';
import { InlinedIcon } from '#/components/inlined-icon';
import { DoubleCheckIcon } from '#/components/icons/double-check';
import { CSS_VARS } from '#/styles/variables';
import { PencilIcon } from '#/components/icons/pencil';

interface GoalCardsViewProps {
  goals: SourceCell<GoalProps[]>;
}

export default function GoalCardList(props: GoalCardsViewProps) {
  const ulRef = Cell.source<HTMLUListElement | null>(null);
  const { goals } = props;
  const observer = useObserver();
  const totalGoals = Cell.derived(() => goals.value.length);
  const ulStyles = { '--total': totalGoals };
  const confirmDrawerHref = '/home?auto-select&confirm';
  const editStageHref = '/home?auto-select&stage=edit';

  observer.onConnected(ulRef, (ul) => {
    setAutoSelectStage(1);
    setMetaTheme('#0e0e1f');
    ul.scrollTop = ul.scrollHeight;
    const scrollTimelinePolyfilled = initScrollTimeline(ul);
    return () => {
      if (scrollTimelinePolyfilled) {
        ul.getAnimations().at(0)?.finish();
      }
    };
  });

  return (
    <>
      <ul ref={ulRef} class={classes.goalCards} style={ulStyles}>
        {For(goals, (goal, index) => {
          return <GoalCard {...goal} index={index} />;
        })}
      </ul>
      <div class={classes.buttonRow}>
        <Button class={classes.btn} href={confirmDrawerHref} vibrate>
          <InlinedIcon
            Icon={DoubleCheckIcon}
            class={classes.btnIcon}
            title="Submit Goals"
            color={CSS_VARS['--space-cadet-500']}
          />
          Perfect
        </Button>
        <Button class={classes.btn} href={editStageHref} vibrate>
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
  );
}
